
import React, { useState, useEffect } from 'react';
import { 
  Clock, MapPin, CheckCircle2, Play, Calendar, User, ArrowRight,
  Bell, Camera, Navigation, LogOut, Plus, Mic, Sparkles, X, Zap, 
  MessageSquare, TrendingUp, ChevronRight
} from 'lucide-react';
import TechVoiceAssistant from './TechVoiceAssistant';
import TechPerformance from './TechPerformance';
import { notificationService } from '../services/notificationService';
import { Notification as NotificationType } from '../types';

const TechMobileDashboard: React.FC<{ onLogout: () => void, onSelectOS: (id: string) => void }> = ({ onLogout, onSelectOS }) => {
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [isPerformanceOpen, setIsPerformanceOpen] = useState(false);
  const [activePush, setActivePush] = useState<NotificationType | null>(null);
  
  const todayOS = [
    { id: '5491', client: 'Condomínio Solar', service: 'Reparo Hidráulico', time: '14:00', priority: 'High', status: 'Scheduled' },
    { id: '5492', client: 'Mercado Central', service: 'Troca de Válvulas', time: '16:30', priority: 'Medium', status: 'Scheduled' },
  ];

  useEffect(() => {
    const unsubscribe = notificationService.subscribe((n) => {
      setActivePush(n);
      setTimeout(() => setActivePush(null), 6000);
    });
    return unsubscribe;
  }, []);

  if (isPerformanceOpen) {
    return <TechPerformance onClose={() => setIsPerformanceOpen(false)} />;
  }

  return (
    <div className="bg-gray-50 min-h-screen relative overflow-hidden flex flex-col font-sans">
      <TechVoiceAssistant isOpen={isVoiceOpen} onClose={() => setIsVoiceOpen(false)} />

      {activePush && (
        <div className="fixed top-4 left-4 right-4 z-[200] animate-in slide-in-from-top-full duration-500">
          <div className={`p-4 rounded-[24px] shadow-2xl border-2 flex gap-4 items-start backdrop-blur-md ${
            activePush.type === 'error' ? 'bg-red-600/95 border-red-400 text-white' :
            activePush.type === 'warning' ? 'bg-amber-500/95 border-amber-300 text-white' :
            'bg-blue-600/95 border-blue-400 text-white'
          }`}>
            <div className="p-2 bg-white/20 rounded-xl">
              {activePush.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : 
               activePush.type === 'warning' ? <Zap className="w-5 h-5" /> : 
               <MessageSquare className="w-5 h-5" />}
            </div>
            <div className="flex-1">
              <h5 className="text-xs font-black uppercase tracking-widest">{activePush.title}</h5>
              <p className="text-[11px] font-medium opacity-90 leading-tight mt-0.5">{activePush.message}</p>
            </div>
            <button onClick={() => setActivePush(null)} className="p-1 hover:bg-white/10 rounded-lg">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <header className="bg-blue-600 p-6 pt-12 text-white rounded-b-[40px] shadow-lg">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center font-bold text-xl">
              CL
            </div>
            <div>
              <p className="text-blue-100 text-xs font-medium">Boa tarde,</p>
              <h2 className="text-xl font-bold">Carlos Lima</h2>
            </div>
          </div>
          <button onClick={onLogout} className="p-2 bg-white/10 rounded-xl hover:bg-white/20 transition-colors">
            <LogOut className="w-5 h-5" />
          </button>
        </div>

        <button 
          onClick={() => setIsPerformanceOpen(true)}
          className="w-full bg-white/10 backdrop-blur-md rounded-2xl p-4 flex justify-between items-center hover:bg-white/20 transition-all border border-white/10 group"
        >
          <div className="text-center flex-1 border-r border-white/10">
            <p className="text-[10px] text-blue-100 uppercase font-bold tracking-widest">Hoje</p>
            <p className="text-lg font-bold">02 OS</p>
          </div>
          <div className="text-center flex-1 border-r border-white/10">
            <p className="text-[10px] text-blue-100 uppercase font-bold tracking-widest">Mês</p>
            <p className="text-lg font-bold">45</p>
          </div>
          <div className="text-center flex-1">
            <p className="text-[10px] text-blue-100 uppercase font-bold tracking-widest">Score</p>
            <p className="text-lg font-bold flex items-center justify-center gap-1">4.9 <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" /></p>
          </div>
        </button>
      </header>

      <main className="flex-1 p-6 space-y-6 -mt-6">
        <button 
          onClick={() => setIsVoiceOpen(true)}
          className="w-full bg-gradient-to-r from-indigo-600 to-blue-700 p-4 rounded-3xl shadow-xl shadow-indigo-100 flex items-center justify-between group active:scale-95 transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-2xl">
              <Mic className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <p className="text-xs font-black text-blue-100 uppercase tracking-widest">Acesso Rápido</p>
              <h4 className="text-sm font-bold text-white">Copiloto de Voz Hands-Free</h4>
            </div>
          </div>
          <Sparkles className="w-5 h-5 text-blue-200 animate-pulse" />
        </button>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform"></div>
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-4">
              <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">Próxima OS</span>
              <span className="text-xs font-bold text-gray-400">#5491</span>
            </div>
            <h3 className="text-lg font-black text-gray-900 mb-1">Reparo Hidráulico</h3>
            <p className="text-sm text-gray-500 mb-4 flex items-center gap-1">
              <MapPin className="w-4 h-4 text-blue-600" /> Condomínio Solar - Bloco B
            </p>
            
            <div className="flex gap-3 mt-6">
              <button className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-gray-200">
                <Navigation className="w-4 h-4" /> Rotas
              </button>
              <button 
                onClick={() => onSelectOS('5491')}
                className="flex-2 bg-blue-600 text-white py-3 px-8 rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-200 active:scale-95 transition-all"
              >
                <Play className="w-4 h-4 fill-white" /> Iniciar
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4 pb-10">
          <div className="flex justify-between items-center px-2">
            <h3 className="font-black text-gray-900">Agenda de Hoje</h3>
            <button className="text-xs font-bold text-blue-600">Ver Calendário</button>
          </div>
          
          <div className="space-y-3">
            {todayOS.map((os) => (
              <button 
                key={os.id} 
                onClick={() => onSelectOS(os.id)}
                className="w-full bg-white p-4 rounded-2xl border border-gray-100 flex items-center justify-between group active:bg-blue-50 transition-colors"
              >
                <div className="flex items-center gap-4 text-left">
                  <div className="w-12 h-12 rounded-xl bg-gray-50 flex flex-col items-center justify-center border border-gray-100">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Hora</span>
                    <span className="text-sm font-black text-gray-900">{os.time}</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">{os.client}</h4>
                    <p className="text-xs text-gray-500">{os.service}</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-blue-600 transition-colors" />
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default TechMobileDashboard;
