
import React from 'react';
import { 
  Globe, 
  TrendingUp, 
  Users, 
  CreditCard, 
  Activity, 
  ShieldAlert, 
  ArrowUpRight,
  Server,
  Zap,
  MoreVertical,
  // Fix: Added missing Plus icon to imports
  Plus
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const mrrData = [
  { month: 'Nov', value: 45000 },
  { month: 'Dez', value: 52000 },
  { month: 'Jan', value: 48000 },
  { month: 'Fev', value: 61000 },
  { month: 'Mar', value: 75000 },
  { month: 'Abr', value: 89000 },
];

const SuperAdminDashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-indigo-100 text-indigo-700 text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest">SaaS Control</span>
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">Painel Global</h2>
          </div>
          <p className="text-gray-500 font-medium">Visão consolidada de todos os tenants e infraestrutura.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2.5 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 transition-all">
            <Server className="w-4 h-4" />
            Status API
          </button>
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all">
            <Plus className="w-4 h-4" />
            Novo Tenant
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
          <div className="flex justify-between mb-4">
            <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600"><TrendingUp className="w-6 h-6" /></div>
            <span className="text-emerald-500 text-xs font-bold flex items-center">+18% <ArrowUpRight className="w-3 h-3" /></span>
          </div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">MRR Global</p>
          <p className="text-3xl font-black text-gray-900 mt-1">R$ 89.4k</p>
        </div>
        <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
          <div className="flex justify-between mb-4">
            <div className="p-3 bg-blue-50 rounded-2xl text-blue-600"><Globe className="w-6 h-6" /></div>
          </div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Tenants Ativos</p>
          <p className="text-3xl font-black text-gray-900 mt-1">412</p>
        </div>
        <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
          <div className="flex justify-between mb-4">
            <div className="p-3 bg-purple-50 rounded-2xl text-purple-600"><Users className="w-6 h-6" /></div>
          </div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Usuários Totais</p>
          <p className="text-3xl font-black text-gray-900 mt-1">12.8k</p>
        </div>
        <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
          <div className="flex justify-between mb-4">
            <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600"><Activity className="w-6 h-6" /></div>
          </div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Tempo de Uptime</p>
          <p className="text-3xl font-black text-emerald-600 mt-1">99.98%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
          <h3 className="text-sm font-black text-gray-800 uppercase tracking-[0.2em] mb-8">Crescimento de Receita (MRR)</h3>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mrrData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="value" stroke="#4f46e5" strokeWidth={4} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-900 p-8 rounded-[40px] text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/5 rounded-full group-hover:scale-125 transition-transform duration-700"></div>
            <Zap className="w-10 h-10 mb-6 text-indigo-400" />
            <h4 className="text-xl font-black mb-2">Alertas de Sistema</h4>
            <div className="space-y-4 mt-6">
              <div className="flex gap-3 items-start p-3 bg-white/5 rounded-2xl border border-white/10">
                <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0" />
                <p className="text-xs text-gray-300">Tenant <b>"Construtora Alfa"</b> excedeu limite de storage.</p>
              </div>
              <div className="flex gap-3 items-start p-3 bg-white/5 rounded-2xl border border-white/10">
                <CreditCard className="w-5 h-5 text-red-400 shrink-0" />
                <p className="text-xs text-gray-300">Falha no processamento de 15 assinaturas via Stripe.</p>
              </div>
            </div>
            <button className="w-full mt-8 py-4 bg-indigo-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-500 transition-all">Ver Central de Segurança</button>
          </div>

          <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6">Últimos Tenants</h4>
            <div className="space-y-4">
              {[
                { name: 'Soluções Hidro', plan: 'Business', date: 'Hoje' },
                { name: 'Clima Express', plan: 'Pro', date: 'Ontem' },
                { name: 'Segurança Total', plan: 'Enterprise', date: '22 Abr' },
              ].map((tenant, idx) => (
                <div key={idx} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center font-black text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all text-xs">
                      {tenant.name[0]}
                    </div>
                    <div>
                      <p className="text-xs font-black text-gray-800">{tenant.name}</p>
                      <p className="text-[10px] font-bold text-gray-400 uppercase">{tenant.plan}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-gray-400">{tenant.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
