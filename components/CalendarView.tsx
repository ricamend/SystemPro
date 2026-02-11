
import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Filter,
  Clock,
  User,
  MapPin,
  Sparkles,
  Zap,
  Loader2,
  ChevronDown,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { geoService } from '../services/geoService';

const mockScheduledOS = [
  { id: '1024', day: 21, title: 'Manutenção Elevador', client: 'Condomínio Solar', tech: 'Carlos Lima', time: '14:00', type: 'Reparo' },
  { id: '1025', day: 22, title: 'Troca de Filtros', client: 'Restaurante Sabor', tech: 'Ana Souza', time: '09:00', type: 'Preventiva' },
  { id: '1026', day: 22, title: 'Revisão Gerador', client: 'Hospital Santa Maria', tech: 'Marcos Silva', time: '13:30', type: 'Urgente' },
  { id: '1027', day: 24, title: 'Instalação Câmeras', client: 'Escola Dom Bosco', tech: 'Ana Souza', time: '10:00', type: 'Instalação' },
];

const unassignedOS = [
  { id: '1028', title: 'Vazamento Banheiro', client: 'Prédio Central', priority: 'High', location: 'Centro' },
  { id: '1029', title: 'Curto Circuito', client: 'Lojas Americanas', priority: 'Urgent', location: 'Zona Sul' },
];

const CalendarView: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState('Abril 2024');
  const [isDispatcherOpen, setIsDispatcherOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [suggestions, setSuggestions] = useState<string | null>(null);

  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const handleAIDispatch = async () => {
    setIsAnalyzing(true);
    // Simula contexto para a IA
    const context = {
      techs: ['Carlos (Hidráulica, 2km)', 'Ana (Elétrica, 5km)', 'Marcos (Geral, 1km)'],
      pending: unassignedOS
    };
    
    // Simulação de chamada de IA baseada na lógica do geoService
    setTimeout(() => {
      setSuggestions(`Com base na localização e especialidade:
1. Atribuir OS #1029 (Urgente) para Ana Souza: Ela é especialista em Elétrica e está a 15min do local.
2. Atribuir OS #1028 para Marcos Silva: Ele finaliza em 20min a OS atual e está no mesmo bairro.`);
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">Agenda Operacional</h2>
          <p className="text-gray-500 font-medium">Controle de escalas e compromissos da equipe.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setIsDispatcherOpen(true)}
            className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-black shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            IA Dispatcher
          </button>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-black shadow-xl shadow-blue-100 hover:bg-blue-700">
            <Plus className="w-4 h-4" />
            Novo Agendamento
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
            <div className="flex items-center gap-4">
              <h3 className="font-black text-gray-800">{currentMonth}</h3>
              <div className="flex gap-1">
                <button className="p-2 hover:bg-white rounded-xl border border-transparent hover:border-gray-200"><ChevronLeft className="w-4 h-4" /></button>
                <button className="p-2 hover:bg-white rounded-xl border border-transparent hover:border-gray-200"><ChevronRight className="w-4 h-4" /></button>
              </div>
            </div>
            <div className="flex bg-gray-100 p-1.5 rounded-2xl">
              <button className="px-6 py-2 text-xs font-black bg-white rounded-xl shadow-sm text-blue-600">Mês</button>
              <button className="px-6 py-2 text-xs font-black text-gray-400 hover:text-gray-600">Semana</button>
            </div>
          </div>

          <div className="grid grid-cols-7 border-b border-gray-100 bg-gray-50/50">
            {weekDays.map(day => (
              <div key={day} className="py-4 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest border-r border-gray-50 last:border-0">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 auto-rows-[140px]">
            <div className="border-r border-b border-gray-50 bg-gray-50/20"></div>
            {days.map(day => {
              const dayOS = mockScheduledOS.filter(os => os.day === day);
              const isToday = day === 21;
              
              return (
                <div key={day} className={`p-3 border-r border-b border-gray-50 hover:bg-blue-50/30 transition-all relative group ${isToday ? 'bg-blue-50/20' : ''}`}>
                  <span className={`text-xs font-black ${isToday ? 'bg-blue-600 text-white w-7 h-7 flex items-center justify-center rounded-full shadow-lg shadow-blue-200' : 'text-gray-400'}`}>
                    {day}
                  </span>
                  
                  <div className="mt-3 space-y-1.5 overflow-y-auto max-h-[80px] custom-scrollbar pr-1">
                    {dayOS.map(os => (
                      <div key={os.id} className="p-2 rounded-xl bg-white border border-gray-100 text-[9px] font-bold text-gray-700 shadow-sm border-l-4 border-l-blue-500 truncate cursor-pointer hover:scale-[1.02] transition-transform">
                        {os.time} • {os.client}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-6">
          {/* Unassigned OS Panel */}
          <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
            <h3 className="font-black text-gray-800 text-sm uppercase tracking-widest mb-6 flex items-center justify-between">
              Pendentes de Técnico
              <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded-lg text-[10px]">{unassignedOS.length}</span>
            </h3>
            <div className="space-y-4">
               {unassignedOS.map(os => (
                 <div key={os.id} className="p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-blue-200 transition-all cursor-move group">
                    <div className="flex justify-between items-start mb-2">
                       <span className="text-[9px] font-black text-blue-600 uppercase">#{os.id}</span>
                       <div className={`w-2 h-2 rounded-full ${os.priority === 'Urgent' ? 'bg-red-500 animate-pulse' : 'bg-amber-500'}`}></div>
                    </div>
                    <h4 className="text-xs font-black text-gray-800">{os.title}</h4>
                    <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">{os.client}</p>
                 </div>
               ))}
            </div>
            <button className="w-full mt-6 py-4 border-2 border-dashed border-gray-200 rounded-2xl text-[10px] font-black text-gray-400 uppercase tracking-widest hover:border-blue-200 hover:text-blue-600 transition-all">
               Ver Lista Completa
            </button>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-[40px] text-white shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
             <Zap className="w-8 h-8 mb-6 text-blue-200 fill-blue-200" />
             <h4 className="text-lg font-black leading-tight mb-2">Monitoramento Ativo</h4>
             <p className="text-xs text-blue-100 opacity-80 leading-relaxed mb-6">3 técnicos estão com OS atrasadas no momento. Deseja enviar um alerta geral?</p>
             <button className="w-full py-3 bg-white text-blue-600 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl">Enviar Push</button>
          </div>
        </div>
      </div>

      {/* IA Dispatcher Modal */}
      {isDispatcherOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-lg rounded-[48px] shadow-2xl overflow-hidden border border-gray-100">
              <div className="p-8 bg-indigo-600 text-white flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-white/20 rounded-2xl"><Sparkles className="w-6 h-6" /></div>
                    <div>
                       <h3 className="text-xl font-black tracking-tight">IA Dispatcher</h3>
                       <p className="text-xs text-indigo-100 font-medium">Otimização de Escala em Tempo Real</p>
                    </div>
                 </div>
                 <button onClick={() => { setIsDispatcherOpen(false); setSuggestions(null); }} className="p-2 hover:bg-white/10 rounded-full">
                    <Plus className="w-6 h-6 rotate-45" />
                 </button>
              </div>

              <div className="p-8 space-y-6">
                 {!suggestions ? (
                   <div className="text-center py-8 space-y-6">
                      <div className="w-20 h-20 bg-indigo-50 rounded-[32px] flex items-center justify-center mx-auto text-indigo-600">
                         {isAnalyzing ? <Loader2 className="w-10 h-10 animate-spin" /> : <Zap className="w-10 h-10" />}
                      </div>
                      <div className="space-y-2">
                         <h4 className="text-lg font-black text-gray-900">Analisar melhor rota?</h4>
                         <p className="text-sm text-gray-500 px-6">A IA irá cruzar o local das OS pendentes com a posição GPS atual dos técnicos e suas especialidades.</p>
                      </div>
                      <button 
                        onClick={handleAIDispatch}
                        disabled={isAnalyzing}
                        className="w-full py-5 bg-indigo-600 text-white rounded-3xl font-black shadow-xl shadow-indigo-100 flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all"
                      >
                         {isAnalyzing ? 'Calculando Matriz...' : 'Gerar Sugestões de Alocação'}
                      </button>
                   </div>
                 ) : (
                   <div className="space-y-6 animate-in zoom-in-95">
                      <div className="p-6 bg-indigo-50 rounded-[32px] border border-indigo-100">
                         <p className="text-sm text-indigo-900 leading-relaxed font-medium whitespace-pre-wrap">{suggestions}</p>
                      </div>
                      <div className="flex gap-3">
                         <button onClick={() => setSuggestions(null)} className="flex-1 py-4 bg-gray-100 text-gray-600 rounded-2xl font-bold text-xs uppercase tracking-widest">Recalcular</button>
                         <button className="flex-[2] py-4 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl">Aplicar Escala</button>
                      </div>
                   </div>
                 )}
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default CalendarView;
