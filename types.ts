
export type UserRole = 'super_admin' | 'admin' | 'tech' | 'client';

export type OSStatus = 'open' | 'scheduled' | 'in_progress' | 'completed' | 'billed' | 'cancelled' | 'waiting_parts';
export type OSPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface AuditLog {
  id: string;
  target_id: string; // ID da OS ou do Cliente
  target_type: 'service_order' | 'customer';
  user_id: string;
  user_name: string;
  action: string;
  field?: string;
  old_value?: string;
  new_value?: string;
  type: 'system' | 'user' | 'attachment' | 'status' | 'comment' | 'edit';
  created_at: string;
}

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  logo_url?: string;
  subscription_status: 'trial' | 'active' | 'past_due' | 'canceled';
  plan: 'starter' | 'pro' | 'business' | 'enterprise';
  created_at: string;
}

export interface Profile {
  id: string;
  tenant_id: string;
  full_name: string;
  email: string;
  role: UserRole;
  avatar_url?: string;
  active: boolean;
}

export interface Customer {
  id: string;
  tenant_id: string;
  name: string;
  document?: string;
  email?: string;
  phone?: string;
  address: {
    street: string;
    number: string;
    city: string;
    state: string;
    zip: string;
    lat?: number;
    lng?: number;
  };
  latitude?: number;
  longitude?: number;
}

export interface ServiceOrder {
  id: string;
  tenant_id: string;
  customer_id: string;
  assigned_tech_id?: string;
  assigned_tech_ids?: string[];
  os_number: number;
  title: string;
  description: string;
  status: OSStatus;
  priority: OSPriority;
  scheduled_date?: string;
  latitude?: number;
  longitude?: number;
  total_value: number;
  created_at: string;
  updated_at: string;
  
  customer?: Customer;
  technicians?: Profile[];
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  created_at: string;
}

export interface DashboardStats {
  totalOS: number;
  pendingOS: number;
  completedOS: number;
  revenue: number;
  growth: number;
}
