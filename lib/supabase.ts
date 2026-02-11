
import { createClient } from 'https://esm.sh/@supabase/supabase-js@^2.48.1';

// Nota: Em um ambiente real, estas chaves viriam de process.env
const supabaseUrl = 'https://your-project-url.supabase.co';
const supabaseAnonKey = 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Tables<T extends keyof any> = any; // Simplificado para o exemplo
