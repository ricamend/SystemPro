
import { useState, useEffect } from 'react';
import { ServiceOrder, OSStatus } from '../types';

// Mock data centralizada para o hook
const initialMockOS: ServiceOrder[] = [
  { 
    id: 'OS-5491', 
    tenant_id: 'tenant-1',
    customer_id: 'cust-1',
    os_number: 5491,
    title: 'Reparo Hidráulico', 
    description: 'Vazamento no bloco B',
    status: 'in_progress', 
    priority: 'high',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    total_value: 150.00
  },
  // ... outros mocks
];

export const useServiceOrders = () => {
  const [orders, setOrders] = useState<ServiceOrder[]>(initialMockOS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      // Aqui entraria a chamada real ao Supabase:
      // const { data } = await supabase.from('service_orders').select('*');
      // setOrders(data);
      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: OSStatus) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
    // Chamada real: await supabase.from('service_orders').update({ status: newStatus }).eq('id', id);
  };

  const createOrder = async (orderData: Partial<ServiceOrder>) => {
    const newOrder = {
      ...orderData,
      id: `OS-${Math.floor(Math.random() * 10000)}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    } as ServiceOrder;
    setOrders(prev => [newOrder, ...prev]);
  };

  return {
    orders,
    loading,
    error,
    updateStatus,
    createOrder,
    refresh: fetchOrders
  };
};
