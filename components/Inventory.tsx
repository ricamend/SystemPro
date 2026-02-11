
import React, { useState, useMemo, useEffect } from 'react';
import { 
  Package, 
  Search, 
  Plus, 
  AlertTriangle, 
  ArrowUpRight, 
  Edit2, 
  Trash2, 
  X, 
  CheckCircle,
  ChevronDown,
  ArrowRight,
  User,
  Activity,
  Truck,
  ClipboardCheck,
  ArrowDownLeft,
  Loader2,
  Clock
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const initialProducts = [
  { id: '1', name: 'Válvula Esfera 3/4', sku: 'HID-VAL-001', stock: 45, fieldStock: 15, minStock: 10, cost: 22.50, price: 45.00, category: 'Hidráulica' },
  { id: '2', name: 'Cabo Flexível 2.5mm (100m)', sku: 'ELE-CAB-025', stock: 12, fieldStock: 120, minStock: 5, cost: 180.00, price: 290.00, category: 'Elétrica' },
  { id: '3', name: 'Filtro Ar Condicionado Split', sku: 'REF-FIL-SPL', stock: 3, fieldStock: 0, minStock: 10, cost: 15.00, price: 35.00, category: 'Refrigeração' },
  { id: '4', name: 'Disjuntor Monofásico 20A', sku: 'ELE-DIS-020', stock: 85, fieldStock: 8, minStock: 20, cost: 12.00, price: 24.00, category: 'Elétrica' },
];

const Inventory: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'stock' | 'returns'>('stock');
  
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('servicopro_inventory_data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Migração: garante que SKUs existem nos dados salvos
        return parsed.length > 0 && parsed[0].sku ? parsed : initialProducts;
      } catch (e) {
        return initialProducts;
      }
    }
    return initialProducts;
  });

  const [isProcessingReturn, setIsProcessingReturn] = useState<string | null>(null);
  const [showToast, setShowToast] = useState<string | null>(null);
  const [columnFilters, setColumnFilters] = useState({ search: '', category: 'all' });

  useEffect(() => {
    localStorage.setItem('servicopro_inventory_data', JSON.stringify(products));
  }, [products]);

  const pendingReturns = useMemo(() => {
    const saved = localStorage.getItem('servicopro_tech_data');
    if (!saved) return [];
    try {
      const techs = JSON.parse(saved);
      return Object.values(techs)
        .filter((t: any) => t.status === 'discharging')
        .map((t: any) => ({
          id: t.id,
          techName: t.name,
          requestedAt: 'Há poucos min',
          items: t.items.map((i: any) => ({ name: i.name, sku: i.sku, qty: i.qty, unit: i.unit })),
          totalValue: t.items.reduce((acc: number, i: any) => acc + (Number(i.qty) * (Number(i.pricePerUnit) || 0)), 0)
        }));
    } catch (e) {
      return [];
    }
  }, [isProcessingReturn, activeTab]);

  const handleConfirmReturn = async (techId: string) => {
    setIsProcessingReturn(techId);
    
    const dbRaw = localStorage.getItem('servicopro_tech_data');
    if (!dbRaw) return;
    
    const allTechs = JSON.parse(dbRaw);
    const targetTech = allTechs[techId];
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    if (targetTech) {
      // 1. ATUALIZAÇÃO DO CD: Soma as devoluções aos saldos atuais
      setProducts((currentProducts: any) => {
        return currentProducts.map((p: any) => {
          const match = targetTech.items.find((ri: any) => ri.sku === p.sku);
          if (match) {
            return {
              ...p,
              stock: Number(p.stock) + Number(match.qty),
              fieldStock: Math.max(0, Number(p.fieldStock) - Number(match.qty))
            };
          }
          return p;
        });
      });

      // 2. LIMPEZA DO TÉCNICO
      allTechs[techId] = { ...targetTech, items: [], assets: [], status: 'regular' };
      localStorage.setItem('servicopro_tech_data', JSON.stringify(allTechs));
    }
    
    setIsProcessingReturn(null);
    setShowToast(`Saldo de ${targetTech?.name} reincorporado ao estoque central.`);
    setTimeout(() => {
        setShowToast(null);
        setActiveTab('stock');
    }, 3000);
  };

  const distributionData = useMemo(() => {
    const central = products.reduce((acc: number, p: any) => acc + (Number(p.stock) || 0), 0);
    const field = products.reduce((acc: number, p: any) => acc + (Number(p.fieldStock) || 0), 0);
    
    if (central === 0 && field === 0) return [];
    
    return [
      { name: 'CD Central', value: central, color: '#3b82f6' },
      { name: 'Em Campo', value: field, color: '#f59e0b' }
    ];
  }, [products]);

  const filteredProducts = products.filter((p: any) => {
    const matchesSearch = p.name.toLowerCase().includes(columnFilters.search.toLowerCase()) || 
                          p.sku.toLowerCase().includes(columnFilters.search.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      {showToast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[500] bg-gray-900 text-white px-8 py-5 rounded-[24px] shadow-2xl flex items-center gap-4 animate-in slide-in-from-top-10 border border-gray-800">
           <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white"><CheckCircle className="w-6 h-6" /></div>
           <p className="font-black text-xs uppercase tracking-widest">{showToast}</p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">Centro de Distribuição</h2>
          <p className="text-gray-500 font-medium mt-1">Gestão de saldos centralizados e em trânsito.</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 shadow-xl transition-all">
          <Plus className="w-4 h-4" /> Novo Item
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
           <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
              <div className="flex border-b border-gray-50 p-2 gap-2 bg-gray-50/50">
                 <button onClick={() => setActiveTab('stock')} className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest rounded-[20px] transition-all ${activeTab === 'stock' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400'}`}>Saldos em CD</button>
                 <button onClick={() => setActiveTab('returns')} className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest rounded-[20px] transition-all relative ${activeTab === 'returns' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400'}`}>
                   Receber Devoluções
                   {pendingReturns.length > 0 && <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse border-2 border-white"></span>}
                 </button>
              </div>

              {activeTab === 'returns' ? (
                <div className="p-8 space-y-6 animate-in slide-in-from-bottom-4">
                   {pendingReturns.length > 0 ? pendingReturns.map((ret: any) => (
                     <div key={ret.id} className="p-8 bg-gray-50/50 rounded-[40px] border border-gray-100 space-y-8 group hover:bg-white hover:shadow-2xl transition-all duration-500">
                        <div className="flex items-center justify-between">
                           <div className="flex items-center gap-4">
                              <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg">
                                 {ret.techName.substring(0,2).toUpperCase()}
                              </div>
                              <div>
                                 <p className="text-base font-black text-gray-900">{ret.techName}</p>
                                 <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Solicitado {ret.requestedAt}</span>
                              </div>
                           </div>
                           <div className="text-right">
                              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Valor a Reincorporar</p>
                              <p className="text-xl font-black text-gray-900">R$ {ret.totalValue.toFixed(2)}</p>
                           </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                           {ret.items.map((item: any, i: number) => (
                             <div key={i} className="px-5 py-4 bg-white rounded-2xl border border-gray-100 flex items-center justify-between">
                                <div className="flex flex-col">
                                   <span className="text-xs font-bold text-gray-700">{item.name}</span>
                                   <span className="text-[8px] font-mono text-gray-400">{item.sku}</span>
                                </div>
                                <span className="text-xs font-black text-blue-600">+{item.qty} {item.unit}</span>
                             </div>
                           ))}
                        </div>

                        <button 
                           onClick={() => handleConfirmReturn(ret.id)}
                           disabled={isProcessingReturn === ret.id}
                           className="w-full py-5 bg-emerald-600 text-white rounded-[24px] font-black text-xs uppercase tracking-widest shadow-2xl hover:bg-emerald-700 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                        >
                           {isProcessingReturn === ret.id ? <Loader2 className="w-5 h-5 animate-spin" /> : <ClipboardCheck className="w-5 h-5" />}
                           {isProcessingReturn === ret.id ? 'Processando Baixa...' : 'Confirmar Recebimento e Atualizar CD'}
                        </button>
                     </div>
                   )) : (
                     <div className="py-24 text-center space-y-4">
                        <ArrowDownLeft className="w-12 h-12 text-gray-200 mx-auto" />
                        <p className="text-sm font-black text-gray-300 uppercase tracking-[0.2em]">Nenhuma devolução pendente</p>
                     </div>
                   )}
                </div>
              ) : (
                <>
                  <div className="p-6 border-b border-gray-50 flex items-center gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 w-4 h-4" />
                        <input 
                          type="text" 
                          placeholder="Buscar SKU ou Produto..." 
                          className="w-full pl-11 pr-4 py-3 bg-gray-50 border-none rounded-2xl text-xs font-bold outline-none focus:ring-2 focus:ring-blue-500"
                          value={columnFilters.search}
                          onChange={(e) => setColumnFilters({...columnFilters, search: e.target.value})}
                        />
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                      <table className="w-full">
                          <thead className="bg-gray-50/50 border-b border-gray-100">
                            <tr>
                                <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Produto</th>
                                <th className="px-8 py-5 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest bg-blue-50/20">Saldo CD</th>
                                <th className="px-8 py-5 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest bg-amber-50/20">Em Campo</th>
                                <th className="px-8 py-5 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest">Preço</th>
                                <th className="px-8 py-5"></th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-50">
                            {filteredProducts.map((p: any) => (
                              <tr key={p.id} className="group hover:bg-blue-50/30 transition-all">
                                  <td className="px-8 py-6">
                                    <div className="flex flex-col">
                                       <span className="text-sm font-black text-gray-900">{p.name}</span>
                                       <span className="text-[9px] font-mono text-gray-400 uppercase tracking-tighter">SKU: {p.sku}</span>
                                    </div>
                                  </td>
                                  <td className="px-8 py-6 text-center font-black text-gray-900 bg-blue-50/5">{p.stock} un.</td>
                                  <td className="px-8 py-6 text-center font-black text-amber-600 bg-amber-50/5">{p.fieldStock} un.</td>
                                  <td className="px-8 py-6 text-right font-black text-gray-900">R$ {p.price.toFixed(2)}</td>
                                  <td className="px-8 py-6 text-right"><button className="p-2 text-gray-300 hover:text-blue-600"><Edit2 className="w-4 h-4" /></button></td>
                              </tr>
                            ))}
                          </tbody>
                      </table>
                  </div>
                </>
              )}
           </div>
        </div>

        <div className="space-y-6">
           <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
              <h3 className="text-[10px] font-black text-gray-800 uppercase tracking-[0.2em] mb-8">Distribuição de Saldo</h3>
              <div className="h-[300px] w-full">
                {distributionData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie 
                        data={distributionData} 
                        innerRadius={65} 
                        outerRadius={85} 
                        paddingAngle={10} 
                        dataKey="value"
                        nameKey="name"
                        stroke="none"
                      >
                        {distributionData.map((entry: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px rgba(0,0,0,0.1)' }}
                      />
                      <Legend verticalAlign="bottom" height={36} iconType="circle" />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-300 text-[10px] font-black uppercase">Sem Dados</div>
                )}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
