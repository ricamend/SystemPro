
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
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen pb-24 shadow-2xl relative overflow-hidden animate-in slide-in-from-bottom-8 duration-500 font-sans">
      <header className="bg-indigo-950 p-8 pt-12 text-white rounded-b-[48px] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="flex justify-between items-start mb-10 relative z-10">
           <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center text-2xl font-black shadow-xl shadow-indigo-500/20">CL</div>
              <div>
                 <h2 className="text-xl font-black tracking-tight">Performance</h2>
                 <p className="text-xs text-indigo-300 font-medium">Métricas de Abril • 2024</p>
              </div>
           </div>
           <button onClick={onClose} className="p-3 bg-white/10 rounded-2xl hover:bg-white/20 transition-all">
              <X className="w-5 h-5" />
           </button>
        </div>

        <div className="grid grid-cols-2 gap-4 relative z-10">
           <div className="bg-white/10 backdrop-blur-md rounded-[28px] p-5 border border-white/10">
              <p className="text-[10px] font-black text-indigo-300 uppercase tracking-widest mb-1">Satisfação</p>
              <div className="flex items-center gap-2">
                 <span className="text-2xl font-black text-white">4.9</span>
                 <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              </div>
           </div>
           <div className="bg-white/10 backdrop-blur-md rounded-[28px] p-5 border border-white/10">
              <p className="text-[10px] font-black text-indigo-300 uppercase tracking-widest mb-1">Produtividade</p>
              <div className="flex items-center gap-2">
                 <span className="text-2xl font-black text-white">92%</span>
                 <TrendingUp className="w-4 h-4 text-emerald-400" />
              </div>
           </div>
        </div>
      </header>

      <main className="p-6 space-y-8 -mt-10 relative z-10">
         <div className="bg-white p-8 rounded-[40px] shadow-xl border border-gray-100 space-y-8">
            <div className="flex items-center justify-between">
               <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                  <Target className="w-4 h-4 text-blue-600" /> Metas do Mês
               </h3>
               <span className="text-[10px] font-bold text-gray-400">12 / 15 Concluídas</span>
            </div>
            <div className="space-y-4">
               <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-black text-gray-500 uppercase">
                     <span>Volume de OS</span>
                     <span className="text-blue-600">80%</span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                     <div className="h-full bg-blue-600 rounded-full" style={{ width: '80%' }}></div>
                  </div>
               </div>
               <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-black text-gray-500 uppercase">
                     <span>Pontualidade</span>
                     <span className="text-emerald-500">95%</span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                     <div className="h-full bg-emerald-500 rounded-full" style={{ width: '95%' }}></div>
                  </div>
               </div>
            </div>
         </div>

         <div className="bg-white p-8 rounded-[40px] shadow-xl border border-gray-100 space-y-6">
            <div className="flex items-center justify-between">
               <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-emerald-600" /> Estimativa de Comissões
               </h3>
               <button className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Detalhes</button>
            </div>
            <div className="h-[150px]">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={dataEarnings}>
                    <defs>
                      <linearGradient id="colorE" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Tooltip cursor={false} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px rgba(0,0,0,0.1)' }} />
                    <Area type="monotone" dataKey="val" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorE)" />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
            <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
               <div className="space-y-1">
                  <p className="text-[10px] font-black text-gray-400 uppercase">Saldo Acumulado</p>
                  <p className="text-2xl font-black text-gray-900">R$ 1.250,00</p>
               </div>
               <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600">
                  <ArrowUpRight className="w-6 h-6" />
               </div>
            </div>
         </div>

         <div className="bg-blue-600 p-8 rounded-[40px] text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-125 transition-transform duration-700"></div>
            <Award className="w-10 h-10 text-blue-200 mb-6" />
            <h4 className="text-lg font-black leading-tight mb-2">Technician of the Month</h4>
            <p className="text-xs text-blue-100 font-medium opacity-80 leading-relaxed">Você está no TOP 3 da empresa este mês. Mantenha a média de satisfação para ganhar o bônus de performance!</p>
            <button className="w-full mt-6 py-4 bg-white text-blue-600 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:scale-105 transition-all">Ver Ranking Global</button>
         </div>
      </main>
    </div>
  );
};

export default TechPerformance;
