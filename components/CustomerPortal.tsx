
import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  ClipboardList, 
  MessageSquare, 
  History, 
  Download,
  Star,
  CheckCircle2,
  Clock,
  ArrowRight,
  Bell,
  LogOut,
  X,
  FileText,
  Bot,
  Send,
  Sparkles,
  Loader2,
  MapPin,
  Navigation,
  User,
  ArrowLeft
} from 'lucide-react';
import NewServiceRequest from './NewServiceRequest';
import { searchService } from '../services/searchService';

interface Props {
  onBack?: () => void;
}

const CustomerPortal: React.FC<Props> = ({ onBack }) => {
  const [isRequesting, setIsRequesting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatLoading, setChatLoading] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [activeOS, setActiveOS] = useState<any>(null);
  
  const [chatMessages, setChatMessages] = useState<{role: 'ai'|'user', text: string}[]>([
    { role: 'ai', text: 'Olá! Sou o assistente do ServiçoPro. Como posso ajudar o Condomínio Solar hoje?' }
  ]);

  const handleChatSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || chatLoading) return;
    const userText = chatInput;
    setChatInput('');
    setChatMessages(prev => [...prev, { role: 'user', text: userText }]);
    setChatLoading(true);
    try {
      const res = await searchService.technicalSearch(userText);
      setChatMessages(prev => [...prev, { role: 'ai', text: res?.text || 'Desculpe, tente novamente.' }]);
    } catch (err) {
      setChatMessages(prev => [...prev, { role: 'ai', text: 'Erro de conexão.' }]);
    } finally {
      setChatLoading(false);
    }
  };

  if (isRequesting) {
    return (
      <div className="max-w-xl mx-auto py-8">
        <NewServiceRequest onClose={() => setIsRequesting(false)} onSuccess={() => { setIsRequesting(false); setShowSuccess(true); }} />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-700 pb-20 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          {onBack && (
            <button 
              onClick={onBack} 
              className="p-2.5 hover:bg-white rounded-xl border border-transparent hover:border-gray-200 transition-all shadow-sm bg-white"
              title="Voltar ao Painel"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
          )}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-bold">CS</div>
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">Portal do Cliente</h2>
            </div>
            <p className="text-gray-500 font-medium ml-13 md:ml-0">Condomínio Solar • Unidade Central</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-3 bg-white border border-gray-100 rounded-2xl text-gray-400 hover:text-blue-600 transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          <button onClick={() => setIsRequesting(true)} className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3.5 rounded-2xl font-black text-sm shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all">
            <Plus className="w-5 h-5" /> Solicitar Serviço
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm flex items-center gap-6">
          <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600">
            <Clock className="w-7 h-7" />
          </div>
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Em Aberto</p>
            <p className="text-3xl font-black text-gray-900">02</p>
          </div>
        </div>
        <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm flex items-center gap-6">
          <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Concluídos</p>
            <p className="text-3xl font-black text-gray-900">45</p>
          </div>
        </div>
        <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm flex items-center gap-6">
          <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
            <Star className="w-7 h-7" />
          </div>
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">SLA Médio</p>
            <p className="text-3xl font-black text-gray-900">4h</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          
          {/* Live Tracking Card */}
          <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden animate-in zoom-in-95">
             <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
                <div className="flex items-center gap-3">
                   <div className="p-3 bg-blue-600 rounded-2xl text-white shadow-lg animate-pulse">
                      <Navigation className="w-6 h-6" />
                   </div>
                   <div>
                      <h3 className="text-xl font-black text-gray-900 tracking-tight">Técnico a Caminho</h3>
                      <p className="text-xs text-gray-500 font-medium">Carlos Lima está se deslocando para seu endereço.</p>
                   </div>
                </div>
                <div className="text-right">
                   <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Chegada Prevista</p>
                   <p className="text-xl font-black text-gray-900">14:15</p>
                </div>
             </div>

             <div className="aspect-[21/9] bg-gray-100 relative overflow-hidden group">
                <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover opacity-50 grayscale" alt="Mapa" />
                <div className="absolute inset-0 bg-blue-600/5 backdrop-blur-[2px]"></div>
                
                {/* Tech Location Pin */}
                <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
                   <div className="w-12 h-12 bg-white rounded-full p-1 shadow-2xl relative">
                      <div className="absolute inset-0 bg-blue-600 rounded-full animate-ping opacity-20"></div>
                      <div className="w-full h-full bg-blue-600 rounded-full flex items-center justify-center text-white relative z-10 border-2 border-white">
                         <User className="w-6 h-6" />
                      </div>
                   </div>
                   <div className="mt-2 bg-gray-900 text-white text-[9px] font-black uppercase px-2 py-1 rounded-full shadow-lg">Carlos L.</div>
                </div>

                {/* Destination Pin */}
                <div className="absolute top-1/3 right-1/4 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
                   <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-xl border-2 border-emerald-500">
                      <MapPin className="w-5 h-5 text-emerald-500" />
                   </div>
                   <div className="mt-2 bg-emerald-600 text-white text-[9px] font-black uppercase px-2 py-1 rounded-full">Sua Localização</div>
                </div>

                {/* Route Line Simulation */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
                   <path d="M 350 250 L 500 200 L 750 180" stroke="#3b82f6" strokeWidth="6" strokeDasharray="10 10" fill="none" className="animate-[dash_20s_linear_infinite]" />
                </svg>
             </div>

             <div className="p-6 bg-white flex items-center justify-between border-t border-gray-50">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-blue-600 border border-gray-100">
                      <MessageSquare className="w-6 h-6" />
                   </div>
                   <p className="text-sm font-bold text-gray-700">Deseja enviar instruções de acesso ao técnico?</p>
                </div>
                <button className="px-6 py-3 bg-gray-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all">Enviar Mensagem</button>
             </div>
          </div>

          <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
            <h3 className="font-black text-gray-800 uppercase text-xs tracking-widest flex items-center gap-2 mb-8">
              <ClipboardList className="w-4 h-4 text-blue-600" /> Histórico de Manutenções
            </h3>
            <div className="space-y-4">
               {[
                 { id: '4421', service: 'Limpeza de Caixas d\'Água', date: '12 Abr', status: 'Concluído' },
                 { id: '4390', service: 'Inspeção Anual de Gás', date: '05 Mar', status: 'Concluído' },
               ].map(os => (
                 <div key={os.id} className="p-5 rounded-3xl border border-gray-50 bg-gray-50/30 hover:bg-white hover:shadow-xl transition-all cursor-pointer group">
                   <div className="flex items-center justify-between">
                     <div className="flex items-center gap-4">
                        <span className="text-[10px] font-black text-gray-400">#{os.id}</span>
                        <h4 className="text-sm font-bold text-gray-900">{os.service}</h4>
                     </div>
                     <span className="text-xs font-bold text-gray-500">{os.date}</span>
                   </div>
                 </div>
               ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-gradient-to-br from-indigo-600 to-blue-700 p-10 rounded-[48px] text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/10 rounded-full group-hover:scale-125 transition-transform duration-1000"></div>
            <Sparkles className="w-12 h-12 mb-8 text-blue-200" />
            <h3 className="text-2xl font-black mb-4 leading-tight">Sugestão Preventiva IA</h3>
            <p className="text-sm text-blue-100 mb-10 leading-relaxed font-medium">Detectamos que seu sistema de incêndio completará 6 meses na próxima semana. Deseja pré-agendar uma inspeção?</p>
            <button className="w-full bg-white text-indigo-700 py-5 rounded-3xl font-black text-sm shadow-xl hover:scale-105 transition-all">Agendar Inspeção</button>
          </div>

          <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
             <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6">Suporte em Tempo Real</h4>
             <button 
              onClick={() => setIsChatOpen(true)}
              className="w-full py-4 border-2 border-dashed border-gray-200 rounded-[24px] text-xs font-bold text-gray-400 hover:border-blue-300 hover:text-blue-600 transition-all flex items-center justify-center gap-2"
             >
                <MessageSquare className="w-4 h-4" /> Abrir Chat de Ajuda
             </button>
          </div>
        </div>
      </div>

      {isChatOpen && (
        <div className="fixed bottom-8 right-8 z-[100] w-full max-w-[400px] h-[600px] bg-white rounded-[48px] shadow-[0_30px_60px_rgba(0,0,0,0.3)] border border-gray-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-8 duration-500">
           <div className="p-6 bg-blue-600 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <div className="p-2.5 bg-white/20 rounded-2xl"><Bot className="w-6 h-6" /></div>
                 <div>
                    <h4 className="text-sm font-black tracking-tight">Assistente Virtual</h4>
                    <span className="text-[9px] font-bold uppercase tracking-widest opacity-70">Sempre Online</span>
                 </div>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="p-2 hover:bg-white/10 rounded-full"><X className="w-6 h-6" /></button>
           </div>
           <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/50 custom-scrollbar">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                   <div className={`max-w-[85%] p-4 rounded-[28px] text-sm font-medium leading-relaxed ${
                     msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white text-gray-800 rounded-tl-none shadow-sm'
                   }`}>
                      {msg.text}
                   </div>
                </div>
              ))}
              {chatLoading && <div className="flex justify-start animate-pulse"><div className="bg-white p-4 rounded-[28px] rounded-tl-none shadow-sm text-[10px] font-black text-gray-400 uppercase tracking-widest">IA Analisando...</div></div>}
           </div>
           <form onSubmit={handleChatSend} className="p-6 bg-white border-t border-gray-100 flex items-center gap-3">
              <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="Pergunte algo..." className="flex-1 bg-gray-50 border-none rounded-2xl px-5 py-4 text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
              <button type="submit" disabled={chatLoading} className="p-4 bg-blue-600 text-white rounded-2xl shadow-xl hover:bg-blue-700 active:scale-95 transition-all"><Send className="w-5 h-5" /></button>
           </form>
        </div>
      )}
    </div>
  );
};

export default CustomerPortal;
