
import React, { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Search, 
  Calendar, 
  RefreshCcw, 
  ShieldCheck, 
  AlertCircle,
  MoreVertical,
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import ContractForm from './ContractForm';

const mockContracts = [
  { id: 'CTR-2024-001', client: 'Condomínio Solar', type: 'Manutenção Mensal', value: 2500.00, start: 'Jan 2024', end: 'Dez 2024', progress: 35, status: 'Ativo' },
  { id: 'CTR-2024-002', client: 'Hospital Santa Maria', type: 'SLA Crítico 24h', value: 8900.00, start: 'Mar 2024', end: 'Mar 2025', progress: 15, status: 'Ativo' },
  { id: 'CTR-2023-085', client: 'Escola Dom Bosco', type: 'Preventiva Semestral', value: 1200.00, start: 'Set 2023', end: 'Set 2024', progress: 75, status: 'Renovação' },
];

const ContractManagement: React.FC = () => {
  const [isCreating, setIsCreating] = useState(false);

  if (isCreating) {
    return (
      <div className="max-w-4xl mx-auto py-4">
        <ContractForm 
          onClose={() => setIsCreating(false)} 
          onSave={() => {
            setIsCreating(false);
            // Em um app real, aqui atualizaríamos a lista
          }} 
        />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">Contratos de Manutenção</h2>
          <p className="text-gray-500 font-medium">Gerencie recorrência, faturamento automático e SLAs.</p>
        </div>
        <button 
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all"
        >
          <Plus className="w-4 h-4" />
          Novo Contrato
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
           <div className="p-3 bg-blue-50 rounded-2xl text-blue-600 inline-block mb-4"><ShieldCheck className="w-6 h-6" /></div>
           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Receita Recorrente (MRR)</p>
           <p className="text-2xl font-black text-gray-900 mt-1">R$ 42.850,00</p>
        </div>
        <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
           <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600 inline-block mb-4"><RefreshCcw className="w-6 h-6" /></div>
           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Contratos Ativos</p>
           <p className="text-2xl font-black text-gray-900 mt-1">28</p>
        </div>
        <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
           <div className="p-3 bg-amber-50 rounded-2xl text-amber-600 inline-block mb-4"><AlertCircle className="w-6 h-6" /></div>
           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Próximos Vencimentos</p>
           <p className="text-2xl font-black text-amber-600 mt-1">04 <span className="text-xs text-gray-400 font-bold">em 30 dias</span></p>
        </div>
      </div>

      <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 w-4 h-4" />
            <input type="text" placeholder="Filtrar por cliente ou contrato..." className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-100 rounded-xl text-xs font-bold outline-none" />
          </div>
          <div className="flex gap-2">
            <button className="p-2.5 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-blue-600"><Calendar className="w-4 h-4" /></button>
            <button className="p-2.5 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-blue-600"><TrendingUp className="w-4 h-4" /></button>
          </div>
        </div>

        <div className="overflow-x-auto">
           <table className="w-full">
              <thead className="bg-gray-50/50">
                 <tr>
                    <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">ID / Cliente</th>
                    <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Plano / Serviço</th>
                    <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Vigência</th>
                    <th className="px-8 py-5 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest">Mensalidade</th>
                    <th className="px-8 py-5 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                    <th className="px-8 py-5"></th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                 {mockContracts.map(contract => (
                    <tr key={contract.id} className="hover:bg-blue-50/30 transition-all group cursor-pointer">
                       <td className="px-8 py-6">
                          <div className="flex flex-col">
                             <span className="text-xs font-black text-gray-900 group-hover:text-blue-600 transition-colors">{contract.client}</span>
                             <span className="text-[10px] font-bold text-gray-400 uppercase mt-0.5">{contract.id}</span>
                          </div>
                       </td>
                       <td className="px-8 py-6 text-xs font-bold text-gray-600">{contract.type}</td>
                       <td className="px-8 py-6">
                          <div className="flex flex-col w-32">
                             <div className="flex justify-between text-[9px] font-black text-gray-400 uppercase mb-1">
                                <span>{contract.start}</span>
                                <span>{contract.end}</span>
                             </div>
                             <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                <div className={`h-full ${contract.progress > 70 ? 'bg-amber-500' : 'bg-blue-500'}`} style={{ width: `${contract.progress}%` }}></div>
                             </div>
                          </div>
                       </td>
                       <td className="px-8 py-6 text-right">
                          <span className="text-sm font-black text-gray-900">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(contract.value)}</span>
                       </td>
                       <td className="px-8 py-6 text-center">
                          <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                             contract.status === 'Ativo' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                          }`}>
                             {contract.status}
                          </span>
                       </td>
                       <td className="px-8 py-6 text-right">
                          <button className="p-2 text-gray-300 hover:text-blue-600"><ChevronRight className="w-4 h-4" /></button>
                       </td>
                    </tr>
                 ))}
              </tbody>
           </table>
        </div>
      </div>
    </div>
  );
};

export default ContractManagement;
