
import React from 'react';
import { 
  TrendingUp, Star, CheckCircle2, Clock, DollarSign, Award, 
  ChevronRight, ArrowUpRight, Zap, Target, History, Calendar, X
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, Cell, AreaChart, Area 
} from 'recharts';

const dataEarnings = [
  { day: 'Seg', val: 120 },
  { day: 'Ter', val: 340 },
  { day: 'Qua', val: 210 },
  { day: 'Qui', val: 450 },
  { day: 'Sex', val: 380 },
];

const TechPerformance: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="p-6 pb-24 space-y-8 animate-in slide-in-from-bottom-8 duration-500 font-sans">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">Seus Ganhos</h2>
          <p className="text-xs text-gray-500 font-medium">Resumo financeiro e produtividade.</p>
        </div>
        <div className="flex bg-white p-1 rounded-xl border border-gray-100 shadow-sm">
          <button className="px-3 py-1.5 text-[10px] font-black bg-blue-600 text-white rounded-lg shadow-md">MÊS</button>
          <button className="px-3 py-1.5 text-[10px] font-black text-gray-400">SEMANA</button>
        </div>
      </div>

      {/* Card de Saldo Principal */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-[40px] text-white shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-125 transition-transform duration-1000"></div>
        <div className="relative z-10 space-y-6">
           <div className="flex justify-between items-start">
              <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                 <DollarSign className="w-7 h-7 text-white" />
              </div>
              <div className="text-right">
                 <p className="text-[10px] font-black text-blue-100 uppercase tracking-widest opacity-80">Saldo Acumulado</p>
                 <p className="text-3xl font-black tracking-tighter">R$ 2.450,00</p>
              </div>
           </div>
           
           <div className="pt-6 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                 <TrendingUp className="w-4 h-4 text-emerald-400" />
                 <span className="text-[10px] font-black uppercase tracking-widest text-emerald-300">+12.5% vs março</span>
              </div>
              <button className="text-[10px] font-black uppercase tracking-widest bg-white text-blue-600 px-4 py-2 rounded-xl shadow-lg">Detalhes</button>
           </div>
        </div>
      </div>

      {/* Gráfico de Evolução */}
      <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-6">
        <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] px-1">Evolução da Semana</h3>
        <div className="h-[180px] w-full">
           <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dataEarnings}>
                <defs>
                  <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Tooltip 
                  cursor={false} 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px rgba(0,0,0,0.1)', fontSize: '10px' }} 
                />
                <Area type="monotone" dataKey="val" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorEarnings)" />
              </AreaChart>
           </ResponsiveContainer>
        </div>
      </div>

      {/* Metas e Bônus */}
      <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
           <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] px-1">Progresso de Metas</h3>
           <Target className="w-4 h-4 text-blue-600" />
        </div>
        <div className="space-y-6">
           <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-black text-gray-500 uppercase">
                 <span>Meta de Produtividade</span>
                 <span className="text-blue-600">12 / 15 OS</span>
              </div>
              <div className="h-2.5 w-full bg-gray-50 rounded-full overflow-hidden border border-gray-100 shadow-inner">
                 <div className="h-full bg-blue-600 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)]" style={{ width: '80%' }}></div>
              </div>
           </div>
           
           <div className="p-4 bg-emerald-50 rounded-[24px] border border-emerald-100 flex items-center gap-4">
              <div className="p-2.5 bg-emerald-500 rounded-xl text-white shadow-lg">
                 <Award className="w-5 h-5" />
              </div>
              <div>
                 <p className="text-xs font-black text-emerald-900 uppercase">Bônus de Qualidade</p>
                 <p className="text-[10px] text-emerald-600 font-bold uppercase">Sua média 4.9 garante +R$ 200,00</p>
              </div>
           </div>
        </div>
      </div>

      <p className="text-center text-[9px] font-black text-gray-300 uppercase tracking-widest pt-4">
        Próximo fechamento: 30 de Abril, 2024
      </p>
    </div>
  );
};

export default TechPerformance;
