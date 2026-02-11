
import React, { useState, useEffect } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  MoreVertical,
  Sparkles,
  Zap,
  ArrowRight,
  History,
  Activity
} from 'lucide-react';
import { aiService } from '../services/aiService';
import { logService } from '../services/logService';
import { AuditLog } from '../types';
import MapWidget from './MapWidget';

const dataPerformance = [
  { name: 'Seg', os: 4 },
  { name: 'Ter', os: 7 },
  { name: 'Qua', os: 5 },
  { name: 'Qui', os: 12 },
  { name: 'Sex', os: 9 },
  { name: 'Sáb', os: 3 },
  { name: 'Dom', os: 1 },
];

const dataStatus = [
  { name: 'Abertas', value: 30, color: '#3b82f6' },
  { name: 'Em Andamento', value: 45, color: '#f59e0b' },
  { name: 'Concluídas', value: 120, color: '#10b981' },
  { name: 'Canceladas', value: 15, color: '#ef4444' },
];

const StatCard = ({ title, value, growth, icon: Icon, color }: any) => (
  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <button className="text-gray-400 hover:text-gray-600">
        <MoreVertical className="w-5 h-5" />
      </button>
    </div>
    <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
    <div className="flex items-baseline gap-2 mt-1">
      <span className="text-2xl font-bold text-gray-900">{value}</span>
      <span className={`text-xs font-medium ${growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
        {growth >= 0 ? '+' : ''}{growth}%
      </span>
    </div>
  </div>
);

const StatusBadge = ({ status }: { status: string }) => {
  const normalized = status.toUpperCase();
  const config: Record<string, string> = {
    'AGENDADA': 'bg-blue-100 text-blue-700 border-blue-200',
    'PENDENTE': 'bg-amber-100 text-amber-700 border-amber-200',
    'EM ROTA': 'bg-indigo-100 text-indigo-700 border-indigo-200',
    'EM ANDAMENTO': 'bg-orange-100 text-orange-700 border-orange-200',
    'CONCLUÍDA': 'bg-emerald-100 text-emerald-700 border-emerald-200',
    'URGENTE': 'bg-red-100 text-red-700 border-red-200',
    'CANCELADA': 'bg-gray-100 text-gray-600 border-gray-200',
  };
  const style = config[normalized] || 'bg-gray-100 text-gray-600 border-gray-200';
  return (
    <span className={`px-3 py-1 text-[9px] font-[900] uppercase tracking-[0.15em] rounded-full border ${style}`}>
      {status}
    </span>
  );
};

const Dashboard: React.FC = () => {
  const [insight, setInsight] = useState<string>("Carregando insights...");
  const [isLoadingInsight, setIsLoadingInsight] = useState(true);
  const [recentLogs, setRecentLogs] = useState<AuditLog[]>([]);

  useEffect(() => {
    const fetchInsights = async () => {
      const res = await aiService.generateDashboardInsights({
        totalOS: 156,
        pending: 42,
        completed: 108,
        revenue: 12450
      });
      setInsight(res);
      setIsLoadingInsight(false);
    };
    fetchInsights();
    
    // Carregar os últimos 5 logs de auditoria
    const allLogs = logService.getAllLogs();
    setRecentLogs(allLogs.slice(0, 5));
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Olá, João</h2>
          <p className="text-gray-500">Aqui está o que está acontecendo na sua empresa hoje.</p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 rounded-[32px] p-8 text-white shadow-2xl relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl group-hover:scale-110 transition-transform duration-1000"></div>
         <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-[24px] flex items-center justify-center shadow-xl">
               <Sparkles className="w-8 h-8 text-white fill-white animate-pulse" />
            </div>
            <div className="flex-1 space-y-2">
               <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-white/20 rounded text-[9px] font-black uppercase tracking-widest">IA Operacional</span>
                  <h3 className="text-xl font-black tracking-tight">Visão Estratégica ServiçoPro</h3>
               </div>
               {isLoadingInsight ? (
                 <div className="flex items-center gap-2">
                   <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                   <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:0.2s]"></div>
                   <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:0.4s]"></div>
                 </div>
               ) : (
                 <p className="text-sm font-medium text-blue-50 leading-relaxed max-w-3xl">{insight}</p>
               )}
            </div>
            <button className="bg-white text-indigo-700 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-blue-50 transition-all flex items-center gap-2 shrink-0">
               Explorar BI <ArrowRight className="w-4 h-4" />
            </button>
         </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total de OS" value="156" growth={12} icon={TrendingUp} color="bg-blue-600" />
        <StatCard title="Pendentes" value="42" growth={-5} icon={Clock} color="bg-amber-50" />
        <StatCard title="Concluídas" value="108" growth={24} icon={CheckCircle2} color="bg-emerald-500" />
        <StatCard title="Faturamento" value="R$ 12.450" growth={8} icon={TrendingUp} color="bg-indigo-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <MapWidget />
        </div>
        
        {/* Novo Widget de Auditoria em Tempo Real */}
        <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-black text-gray-800 text-xs uppercase tracking-[0.2em] flex items-center gap-2">
              <History className="w-4 h-4 text-blue-600" /> Atividade Recente
            </h3>
            <button className="text-[10px] font-black text-blue-600 uppercase hover:underline">Ver Todos</button>
          </div>
          
          <div className="flex-1 space-y-6">
            {recentLogs.length > 0 ? recentLogs.map((log) => (
              <div key={log.id} className="flex gap-4 relative group">
                <div className="relative z-10 w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100 group-hover:bg-blue-50 transition-colors">
                  {log.type === 'status' && <Activity className="w-3.5 h-3.5 text-amber-500" />}
                  {log.type === 'edit' && <Zap className="w-3.5 h-3.5 text-blue-500" />}
                  {log.type === 'comment' && <ArrowRight className="w-3.5 h-3.5 text-indigo-500" />}
                  {log.type === 'system' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                </div>
                <div className="space-y-0.5">
                  <p className="text-[11px] font-black text-gray-900 leading-tight">{log.action}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-bold text-gray-400 uppercase">{log.user_name.split(' ')[0]}</span>
                    <span className="text-[9px] text-gray-300">•</span>
                    <span className="text-[9px] font-medium text-gray-400">{new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>
              </div>
            )) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-300 gap-2 opacity-50">
                <History className="w-8 h-8" />
                <p className="text-[10px] font-black uppercase">Sem atividade recente</p>
              </div>
            )}
          </div>
          
          <div className="mt-8 p-4 bg-blue-50 rounded-2xl border border-blue-100 flex items-center gap-3">
             <div className="p-2 bg-blue-600 rounded-lg text-white shadow-sm"><ShieldCircle className="w-4 h-4" /></div>
             <p className="text-[10px] font-bold text-blue-800 leading-tight">Logs de auditoria protegidos contra edição.</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <h3 className="font-semibold text-gray-800 mb-6">Próximas Agendadas</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-100">
                <th className="pb-4 font-medium text-gray-500 text-sm">OS #</th>
                <th className="pb-4 font-medium text-gray-500 text-sm">Cliente</th>
                <th className="pb-4 font-medium text-gray-500 text-sm">Serviço</th>
                <th className="pb-4 font-medium text-gray-500 text-sm">Data/Hora</th>
                <th className="pb-4 font-medium text-gray-500 text-sm text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {[
                { id: '1024', client: 'Condomínio Solar', service: 'Manutenção Elevador', date: 'Hoje, 14:00', status: 'Agendada' },
                { id: '1025', client: 'Restaurante Sabor', service: 'Troca de Filtro Ar', date: 'Amanhã, 09:00', status: 'Pendente' },
                { id: '1026', client: 'Hospital Santa Maria', service: 'Revisão Gerador', date: '22 Abr, 10:30', status: 'Em Rota' },
              ].map((row) => (
                <tr key={row.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="py-4 text-sm font-black text-blue-600 group-hover:scale-105 transition-transform">#{row.id}</td>
                  <td className="py-4 text-sm font-bold text-gray-900">{row.client}</td>
                  <td className="py-4 text-sm text-gray-600 font-medium">{row.service}</td>
                  <td className="py-4 text-sm text-gray-500 font-medium">{row.date}</td>
                  <td className="py-4 text-right">
                    <StatusBadge status={row.status} />
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

// Helper Icon needed
const ShieldCircle = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
  </svg>
);

export default Dashboard;
