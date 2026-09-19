
import { z } from 'zod';

export const customerSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  document: z.string().optional(),
  email: z.string().email('Email inválido'),
  phone: z.string().min(10, 'Telefone inválido'),
  address: z.object({
    street: z.string().min(1, 'Rua é obrigatória'),
    number: z.string().min(1, 'Número é obrigatório'),
    city: z.string().min(1, 'Cidade é obrigatória'),
    state: z.string().length(2, 'Use a sigla do estado'),
    zip: z.string().min(8, 'CEP inválido'),
  }),
});

export const osSchema = z.object({
  customer_id: z.string().uuid('Selecione um cliente'),
  title: z.string().min(5, 'Título muito curto'),
  description: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high', 'urgent']),
  scheduled_date: z.string().optional(),
  assigned_tech_id: z.string().uuid().optional(),
});

export type CustomerInput = z.infer<typeof customerSchema>;
export type OSInput = z.infer<typeof osSchema>;
