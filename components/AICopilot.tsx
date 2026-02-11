
import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Search, MapPin, ExternalLink, Bot, User, Loader2, MessageSquare, ChevronRight } from 'lucide-react';
import { searchService, SearchResult } from '../services/searchService';
import { geoService, MapResource } from '../services/geoService';

const AICopilot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'ai' | 'user', text: string, links?: any[], type?: 'search' | 'geo' | 'text' }[]>([
    { role: 'ai', text: 'Olá! Sou seu Copiloto ServiçoPro. Posso ajudar com manuais técnicos, encontrar fornecedores ou analisar processos. O que precisa agora?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, loading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userText = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setLoading(true);

    // Lógica de detecção de intenção simples
    const lowerText = userText.toLowerCase();
    
    try {
      if (lowerText.includes('onde comprar') || lowerText.includes('loja') || lowerText.includes('fornecedor')) {
        const res = await geoService.findNearbyResources(userText);
        setMessages(prev => [...prev, { 
          role: 'ai', 
          text: res?.text || "Busquei por locais próximos, veja o que encontrei:", 
          links: res?.places,
          type: 'geo' 
        }]);
      } else {
        const res = await searchService.technicalSearch(userText);
        setMessages(prev => [...prev, { 
          role: 'ai', 
          text: res?.text || "Não consegui encontrar uma resposta específica na web.", 
          links: res?.links,
          type: 'search' 
        }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', text: 'Desculpe, tive um problema ao processar sua requisição.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-[380px] h-[550px] bg-white/95 backdrop-blur-xl border border-blue-100 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden animate-in slide-in-from-bottom-8 duration-300">
          <div className="p-5 bg-gradient-to-r from-blue-600 to-indigo-700 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-xl">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-black tracking-tight">Copiloto IA</h4>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-blue-100">Sempre Online</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar bg-gray-50/30">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                  msg.role === 'ai' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {msg.role === 'ai' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>
                <div className={`space-y-3 max-w-[85%]`}>
                  <div className={`p-4 rounded-2xl text-xs font-medium leading-relaxed ${
                    msg.role === 'ai' 
                    ? 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-tl-none' 
                    : 'bg-blue-600 text-white rounded-tr-none shadow-md shadow-blue-100'
                  }`}>
                    {msg.text}
                  </div>
                  
                  {msg.links && msg.links.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1">
                        {msg.type === 'geo' ? <MapPin className="w-3 h-3" /> : <Search className="w-3 h-3" />}
                        {msg.type === 'geo' ? 'Locais Encontrados' : 'Fontes Web'}
                      </p>
                      <div className="flex flex-col gap-1.5">
                        {msg.links.map((link, lIdx) => (
                          <a 
                            key={lIdx} 
                            href={link.uri} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="bg-white p-2.5 rounded-xl border border-gray-100 hover:border-blue-500 hover:bg-blue-50/30 transition-all flex items-center justify-between group"
                          >
                            <span className="text-[10px] font-bold text-gray-700 truncate max-w-[200px]">{link.title}</span>
                            <ChevronRight className="w-3 h-3 text-gray-300 group-hover:text-blue-600" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-3 animate-pulse">
                <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center text-blue-400">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-4 bg-white border border-gray-100 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
                  <Loader2 className="w-3 h-3 animate-spin text-blue-600" />
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">IA está processando...</span>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSend} className="p-4 bg-white border-t border-gray-100 flex items-center gap-3">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Pergunte qualquer coisa..."
              className="flex-1 bg-gray-50 border-none rounded-2xl px-4 py-3 text-xs font-medium outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <button 
              type="submit"
              disabled={loading || !input.trim()}
              className="p-3 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 disabled:opacity-50 active:scale-95 transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full flex items-center justify-center text-white shadow-2xl transition-all hover:scale-110 active:scale-95 group ${
          isOpen ? 'bg-gray-900 rotate-90' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Sparkles className="w-8 h-8 fill-current" />}
        {!isOpen && (
          <span className="absolute -top-1 -left-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-500 border-2 border-white"></span>
          </span>
        )}
      </button>
    </div>
  );
};

export default AICopilot;
