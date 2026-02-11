
export interface Expense {
  id: string;
  osId: string;
  category: 'parking' | 'fuel' | 'food' | 'material_extra' | 'others';
  amount: number;
  description: string;
  receiptUrl?: string;
  date: string;
}

export const expenseService = {
  async getByOS(osId: string): Promise<Expense[]> {
    return [
      { id: 'e1', osId, category: 'parking', amount: 15.00, description: 'Estacionamento Visita 1', date: '21 Abr' },
    ];
  },

  async addExpense(expense: Omit<Expense, 'id'>): Promise<Expense> {
    return { ...expense, id: Math.random().toString(36).substr(2, 9) };
  }
};
