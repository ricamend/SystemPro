
import { supabase } from '../lib/supabase';

export interface Product {
  id: string;
  name: string;
  sku: string;
  stock_quantity: number;
  sale_price: number;
  category: string;
}

export const inventoryService = {
  async searchProducts(query: string): Promise<Product[]> {
    // Simulação de busca no banco
    const mockProducts: Product[] = [
      { id: 'p1', name: 'Válvula Esfera 3/4', sku: 'HID-VAL-001', stock_quantity: 45, sale_price: 45.00, category: 'Hidráulica' },
      { id: 'p2', name: 'Cabo Flexível 2.5mm', sku: 'ELE-CAB-025', stock_quantity: 120, sale_price: 3.50, category: 'Elétrica' },
      { id: 'p3', name: 'Disjuntor 20A', sku: 'ELE-DIS-020', stock_quantity: 15, sale_price: 24.90, category: 'Elétrica' },
      { id: 'p4', name: 'Fita Isolante 20m', sku: 'ELE-FIT-020', stock_quantity: 30, sale_price: 8.50, category: 'Elétrica' },
    ];

    return mockProducts.filter(p => 
      p.name.toLowerCase().includes(query.toLowerCase()) || 
      p.sku.toLowerCase().includes(query.toLowerCase())
    );
  },

  async deductStock(productId: string, quantity: number) {
    console.log(`Baixando ${quantity} unidades do produto ${productId}`);
    // No Supabase: await supabase.rpc('deduct_inventory', { pid: productId, qty: quantity });
    return true;
  }
};
