import { supabase } from '../lib/supabase';
import { ServiceOrder, OSStatus } from '../types';

export const osService = {
  async getAll() {
    const { data, error } = await supabase
      .from('service_orders')
      .select('*, customer:customers(name), technician:profiles(full_name)')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as ServiceOrder[];
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('service_orders')
      .select('*, customer:customers(*), technician:profiles(*)')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data as ServiceOrder;
  },

  async updateStatus(id: string, status: OSStatus) {
    const { error } = await supabase
      .from('service_orders')
      .update({ status })
      .eq('id', id);
    
    if (error) throw error;
  },

  async updateLocation(id: string, latitude: number, longitude: number) {
    const { error } = await supabase
      .from('service_orders')
      .update({ latitude, longitude })
      .eq('id', id);
    
    if (error) throw error;
  },

  async create(os: any) {
    const { data, error } = await supabase
      .from('service_orders')
      .insert(os)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};