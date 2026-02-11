-- Habilitar extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Tabelas de Multi-tenancy
CREATE TABLE tenants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  logo_url TEXT,
  subscription_status TEXT DEFAULT 'trial',
  stripe_customer_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Perfis de Usuário (Integrado com Auth.users)
CREATE TYPE user_role AS ENUM ('super_admin', 'admin', 'tech', 'client');

CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  tenant_id UUID REFERENCES tenants(id),
  full_name TEXT,
  email TEXT UNIQUE NOT NULL,
  role user_role DEFAULT 'tech',
  avatar_url TEXT,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. CRM: Clientes
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  name TEXT NOT NULL,
  document TEXT, -- CPF ou CNPJ
  email TEXT,
  phone TEXT,
  address JSONB, -- { street, number, city, state, zip, lat, lng }
  latitude FLOAT,
  longitude FLOAT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deleted_at TIMESTAMP WITH TIME ZONE
);

-- 4. Gestão de Ordens de Serviço (OS)
CREATE TYPE os_status AS ENUM ('open', 'scheduled', 'in_progress', 'completed', 'billed', 'cancelled');
CREATE TYPE os_priority AS ENUM ('low', 'medium', 'high', 'urgent');

CREATE TABLE service_orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  customer_id UUID NOT NULL REFERENCES customers(id),
  assigned_tech_id UUID REFERENCES profiles(id),
  os_number SERIAL,
  title TEXT NOT NULL,
  description TEXT,
  status os_status DEFAULT 'open',
  priority os_priority DEFAULT 'medium',
  scheduled_date TIMESTAMP WITH TIME ZONE,
  started_at TIMESTAMP WITH TIME ZONE,
  finished_at TIMESTAMP WITH TIME ZONE,
  location_start JSONB, -- { lat, lng }
  location_end JSONB, -- { lat, lng }
  latitude FLOAT,
  longitude FLOAT,
  checklists JSONB DEFAULT '[]',
  total_value DECIMAL(12,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deleted_at TIMESTAMP WITH TIME ZONE
);

-- 5. Financeiro & Estoque
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  sku TEXT,
  name TEXT NOT NULL,
  description TEXT,
  cost_price DECIMAL(12,2),
  sale_price DECIMAL(12,2),
  stock_quantity INTEGER DEFAULT 0,
  min_stock_alert INTEGER DEFAULT 5
);

-- 6. Row Level Security (RLS)
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Exemplo de Políticas RLS para multi-tenancy
CREATE POLICY "Users can only see data from their tenant" 
ON service_orders
FOR ALL
USING (tenant_id = (SELECT tenant_id FROM profiles WHERE id = auth.uid()));

CREATE POLICY "Admins can manage all customers in tenant"
ON customers
FOR ALL
USING (
  tenant_id = (SELECT tenant_id FROM profiles WHERE id = auth.uid()) 
  AND (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
);

-- Triggers para Updated At
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_tenants_updated_at BEFORE UPDATE ON tenants FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_service_orders_updated_at BEFORE UPDATE ON service_orders FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();