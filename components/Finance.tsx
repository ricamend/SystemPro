
import React, { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  CreditCard, 
  PieChart as PieIcon,
  Download,
  Calendar,
  ArrowUp,
  ArrowDown,
  Plus,
  FileText,
  Search,
  CheckCircle2,
  Clock,
  Zap,
  MoreVertical,
  ChevronRight,
  ShieldCheck,
  CheckCircle
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import QuoteForm from './QuoteForm';

const billingData = [
  { month: 'Jan', value: 8500 },
  { month: 'Fev', value: 9200 },
  { month: 'Mar', value: 7800 },
  { month: 'Abr', value: 12450 },
];

const mockQuotes = [
  { id: '102', client: 'Mercado Central', os: '5491', value: 1250.00, status: 'approved', date: '20 Abr' },
  { id: '103', client: 'Escola Dom Bosco', os: '5492', value: 480.00, status: 'pending', date: '21 Abr' },
  { id: '104', client: 'Residencial P.', os: '5493', value: 210.00, status: 'rejected', date: '19 Abr' },
];

const Finance: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'quotes' | 'payments'>('overview');
  const [isCreatingQuote, setIsCreatingQuote] = useState(false);
  const [billingSuccess, setBillingSuccess] = useState(false);

  if (isCreatingQuote) {
    return <QuoteForm onClose={() => setIsCreatingQuote(false)} onSave={() => setIsCreatingQuote(false)} />;
  }

  const handleBillOS = (id: string) => {
    setBillingSuccess(true);
    setTimeout(() => setBillingSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-left-4 duration-500 pb-20">
      {billingSuccess && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[300] bg-emerald-600 text-white px-8 py-4 rounded-3xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-top-8">
           <CheckCircle className="w-6 h-6" />
           <span className="font-black text-sm uppercase tracking-widest">Fatura gerada com sucesso!</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">Gestão Financeira</h2>
          <p className="text-gray-500 font-medium">Controle de faturamento, conciliação e fluxo de caixa.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-white border border-gray-200 px-5 py-2.5 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" />
            Conciliação Bancária
          </button>
          <button 
            onClick={() => setIsCreatingQuote(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-100"
          >
            <Plus className="w-4 h-4" />
            Novo Orçamento
          </button>
        </div>
      </div>

      <div className="flex border-b border-gray-100 gap-10">
        {[
          { id: 'overview', label: 'Dashboard', icon: PieIcon },
          { id: 'quotes', label: 'Propostas', icon: FileText },
          { id: 'payments', label: 'Contas a Receber', icon: CreditCard },
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2.5 pb-5 text-sm font-black uppercase tracking-widest transition-all relative ${
              activeTab === tab.id ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-blue-600' : 'text-gray-300'}`} />
            {tab.label}
            {activeTab === tab.id && <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 rounded-t-full"></div>}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-7 rounded-[32px] border border-gray-100 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600 shadow-sm">
                  <TrendingUp className="w-7 h-7" />
                </div>
                <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg uppercase tracking-widest">+15%</span>
              </div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Faturamento (Mês)</p>
              <p className="text-3xl font-black text-gray-900 mt-1 tracking-tighter">R$ 12.450</p>
            </div>
            
            <div className="bg-white p-7 rounded-[32px] border border-gray-100 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-amber-50 rounded-2xl text-amber-600 shadow-sm">
                  <CreditCard className="w-7 h-7" />
                </div>
              </div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Pendência de PGTO</p>
              <p className="text-3xl font-black text-gray-900 mt-1 tracking-tighter">R$ 4.200</p>
            </div>

            <div className="bg-white p-7 rounded-[32px] border border-gray-100 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-blue-50 rounded-2xl text-blue-600 shadow-sm">
                  <DollarSign className="w-7 h-7" />
                </div>
              </div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Comissões (Total)</p>
              <p className="text-3xl font-black text-gray-900 mt-1 tracking-tighter">R$ 2.150</p>
            </div>

            <div className="bg-white p-7 rounded-[32px] border border-gray-100 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600 shadow-sm">
                   <ShieldCheck className="w-7 h-7" />
                </div>
              </div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Lucro Operacional</p>
              <p className="text-3xl font-black text-indigo-600 mt-1 tracking-tighter">R$ 9.400</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white p-10 rounded-[48px] border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-10">
                <h3 className="font-black text-gray-800 uppercase text-xs tracking-[0.3em]">Curva de Receita Semestral</h3>
                <div className="flex gap-2">
                   <button className="p-2 hover:bg-gray-50 rounded-xl border border-gray-100 transition-colors"><Download className="w-4 h-4 text-gray-400" /></button>
                </div>
              </div>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={billingData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 800, fill: '#9ca3af'}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 800, fill: '#9ca3af'}} />
                    <Tooltip 
                      cursor={{fill: 'rgba(59, 130, 246, 0.05)'}} 
                      contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)'}}
                    />
                    <Bar dataKey="value" fill="#3b82f6" radius={[12, 12, 0, 0]} barSize={60}>
                      {billingData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 3 ? '#3b82f6' : '#e5e7eb'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[48px] border border-gray-100 shadow-sm flex flex-col h-full">
              <h3 className="font-black text-gray-800 mb-8 uppercase text-xs tracking-[0.3em]">Ações Rápidas</h3>
              <div className="space-y-4 flex-1">
                {[
                  { id: '1', label: 'Faturar OS #5495', client: 'Academia Fit', value: 450.00, type: 'action' },
                  { id: '2', label: 'Aprovar Orç. #103', client: 'Escola D. Bosco', value: 480.00, type: 'action' },
                ].map((t) => (
                  <div key={t.id} className="p-5 rounded-3xl bg-gray-50/50 border border-gray-100 hover:bg-white hover:shadow-xl transition-all group">
                    <div className="flex items-center justify-between mb-4">
                       <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{t.client}</span>
                       <span className="text-sm font-black text-gray-900">R$ {t.value.toFixed(2)}</span>
                    </div>
                    <button 
                      onClick={() => handleBillOS(t.id)}
                      className="w-full py-3 bg-white text-gray-800 border border-gray-200 rounded-2xl font-black text-[10px] uppercase tracking-widest group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all"
                    >
                       Executar Cobrança
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-8 p-6 bg-indigo-900 rounded-[32px] text-white relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-12 -mt-12"></div>
                 <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2">Total Pendente</p>
                 <p className="text-2xl font-black tracking-tight mb-4">R$ 5.480,00</p>
                 <button className="text-xs font-black uppercase tracking-widest text-indigo-300 hover:text-white transition-colors underline underline-offset-4">Ver Detalhes do Saldo</button>
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === 'quotes' && (
        <div className="bg-white rounded-[48px] border border-gray-100 shadow-sm overflow-hidden animate-in fade-in duration-300">
          <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row gap-6 items-center bg-gray-50/30">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input type="text" placeholder="Filtrar por cliente ou ID..." className="w-full pl-12 pr-6 py-4 bg-white border border-gray-100 rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-inner" />
            </div>
            <select className="px-6 py-4 bg-white border border-gray-100 rounded-2xl text-xs font-black uppercase tracking-widest outline-none">
              <option>Todos Status</option>
              <option>Aprovados</option>
              <option>Pendentes</option>
            </select>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50/50">
                <tr>
                  <th className="px-10 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Nº / Data</th>
                  <th className="px-10 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Cliente / Referência</th>
                  <th className="px-10 py-6 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest">Valor da Proposta</th>
                  <th className="px-10 py-6 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                  <th className="px-10 py-6"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {mockQuotes.map(quote => (
                  <tr key={quote.id} className="hover:bg-blue-50/30 transition-all cursor-pointer group">
                    <td className="px-10 py-6">
                      <div className="flex flex-col">
                        <span className="text-sm font-black text-gray-900 group-hover:text-blue-600 transition-colors tracking-tight">#{quote.id}</span>
                        <span className="text-[10px] font-bold text-gray-400 uppercase">{quote.date}</span>
                      </div>
                    </td>
                    <td className="px-10 py-6">
                      <div className="flex flex-col">
                        <span className="text-sm font-black text-gray-800">{quote.client}</span>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Ref. OS #{quote.os}</span>
                      </div>
                    </td>
                    <td className="px-10 py-6 text-right">
                      <span className="text-base font-black text-gray-900 tracking-tighter">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(quote.value)}
                      </span>
                    </td>
                    <td className="px-10 py-6 text-center">
                      <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                        quote.status === 'approved' ? 'bg-emerald-100 text-emerald-700' :
                        quote.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {quote.status === 'approved' ? 'Aprovado' : quote.status === 'rejected' ? 'Recusado' : 'Pendente'}
                      </span>
                    </td>
                    <td className="px-10 py-6 text-right">
                       <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-2 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-blue-600 shadow-sm"><FileText className="w-4 h-4" /></button>
                          <ChevronRight className="w-5 h-5 text-gray-300" />
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Finance;
