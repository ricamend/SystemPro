
// MOCKED — In-memory Supabase client for AI Studio
export type Tables<T extends keyof any> = any;

const inMemoryStore: Record<string, any[]> = {
  service_orders: [
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
      total_value: 150.00,
      customer: { name: 'Empresa Alpha Ltda' },
      technician: { full_name: 'Carlos Oliveira' }
    },
    { 
      id: 'OS-5492', 
      tenant_id: 'tenant-1',
      customer_id: 'cust-2',
      os_number: 5492,
      title: 'Manutenção de Ar-Condicionado', 
      description: 'Limpeza de filtros e reposição de gás',
      status: 'pending', 
      priority: 'medium',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      total_value: 280.00,
      customer: { name: 'Residencial Bela Vista' },
      technician: { full_name: 'Mariana Costa' }
    }
  ],
  customers: [],
  profiles: []
};

class SupabaseQueryBuilder {
  private table: string;
  private filters: ((item: any) => boolean)[] = [];
  private currentOrder?: { column: string; ascending: boolean };
  private updatePayload?: any;
  private insertPayload?: any;

  constructor(table: string) {
    this.table = table;
    if (!inMemoryStore[table]) {
      inMemoryStore[table] = [];
    }
  }

  select(_columns: string = '*') {
    return this;
  }

  eq(column: string, value: any) {
    this.filters.push((item: any) => item[column] === value);
    return this;
  }

  order(column: string, options: { ascending?: boolean } = {}) {
    this.currentOrder = { column, ascending: options.ascending ?? true };
    return this;
  }

  single() {
    return this.execute().then(res => ({
      data: Array.isArray(res.data) ? (res.data[0] || null) : res.data,
      error: res.error
    }));
  }

  update(payload: any) {
    this.updatePayload = payload;
    return this;
  }

  insert(payload: any) {
    this.insertPayload = payload;
    return this;
  }

  async execute(): Promise<{ data: any; error: any }> {
    const list = inMemoryStore[this.table] || [];

    if (this.insertPayload) {
      const items = Array.isArray(this.insertPayload) ? this.insertPayload : [this.insertPayload];
      const inserted = items.map(item => ({
        id: item.id || `gen-${Math.random().toString(36).slice(2, 9)}`,
        created_at: new Date().toISOString(),
        ...item
      }));
      inMemoryStore[this.table].push(...inserted);
      return { data: Array.isArray(this.insertPayload) ? inserted : inserted[0], error: null };
    }

    if (this.updatePayload) {
      inMemoryStore[this.table] = list.map(item => {
        const matches = this.filters.every(f => f(item));
        if (matches) {
          return { ...item, ...this.updatePayload, updated_at: new Date().toISOString() };
        }
        return item;
      });
      return { data: null, error: null };
    }

    let result = list.filter(item => this.filters.every(f => f(item)));
    if (this.currentOrder) {
      const { column, ascending } = this.currentOrder;
      result = [...result].sort((a, b) => {
        const valA = a[column];
        const valB = b[column];
        if (valA < valB) return ascending ? -1 : 1;
        if (valA > valB) return ascending ? 1 : -1;
        return 0;
      });
    }

    return { data: result, error: null };
  }

  then(onfulfilled?: (value: { data: any; error: any }) => any) {
    return this.execute().then(onfulfilled);
  }
}

export const supabase = {
  from(table: string) {
    return new SupabaseQueryBuilder(table);
  },
  async rpc(funcName: string, params: any) {
    console.log(`[Supabase Mock RPC] Call: ${funcName}`, params);
    return { data: null, error: null };
  }
};

