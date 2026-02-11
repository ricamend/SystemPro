import React, { useState, useEffect, useRef } from 'react';
import { Send, User, Image, Paperclip, CheckCheck, Smile, Sparkles, X, Loader2 } from 'lucide-react';
import { aiService } from '../services/aiService';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  isMe: boolean;
}

const ChatSystem: React.FC<{ roomName: string }> = ({ roomName }) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', senderId: 'tech-1', senderName: 'Carlos Lima', text: 'Olá, acabei de chegar no local.', timestamp: '14:05', isMe: false },
    { id: '2', senderId: 'admin-1', senderName: 'João Silva', text: 'Perfeito, Carlos. O cliente já está aguardando no Bloco B.', timestamp: '14:06', isMe: true },
    { id: '3', senderId: 'tech-1', senderName: 'Carlos Lima', text: 'Notei um desgaste excessivo na correia secundária. Vou precisar pedir uma nova.', timestamp: '14:15', isMe: false },
    { id: '4', senderId: 'admin-1', senderName: 'João Silva', text: 'Ok, verifique se temos no estoque central. Se não, avise para eu cotar.', timestamp: '14:17', isMe: true },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const msg: Message = {
      id: Date.now().toString(),
      senderId: 'admin-1',
      senderName: 'João Silva',
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    };

    setMessages([...messages, msg]);
    setNewMessage('');
  };

  const handleSummarize = async () => {
    setIsSummarizing(true);
    const res = await aiService.summarizeChatHistory(messages);
    setSummary(res);
    setIsSummarizing(false);
  };

  return (
    <div className="flex flex-col h-[500px] bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden relative">
      <div className="p-4 border-b border-gray-50 flex items-center justify-between bg-blue-600 text-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold">
            {roomName.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <h4 className="text-sm font-black tracking-tight">{roomName}</h4>
            <p className="text-[10px] text-blue-100 font-bold uppercase tracking-widest">Chat em Tempo Real</p>
          </div>
        </div>
        <button 
          onClick={handleSummarize}
          disabled={isSummarizing}
          className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all disabled:opacity-50"
        >
          {isSummarizing ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
          Resumir Conversa
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 custom-scrollbar">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] space-y-1`}>
              {!msg.isMe && <p className="text-[10px] font-black text-gray-400 uppercase ml-1">{msg.senderName}</p>}
              <div className={`p-3 rounded-2xl text-sm ${
                msg.isMe 
                ? 'bg-blue-600 text-white rounded-tr-none shadow-lg shadow-blue-100' 
                : 'bg-white text-gray-800 rounded-tl-none border border-gray-100 shadow-sm'
              }`}>
                {msg.text}
              </div>
              <div className={`flex items-center gap-1 ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                <span className="text-[9px] text-gray-400 font-bold uppercase">{msg.timestamp}</span>
                {msg.isMe && <CheckCheck className="w-3 h-3 text-blue-400" />}
              </div>
            </div>
          </div>
        ))}
      </div>

      {summary && (
        <div className="absolute top-20 left-4 right-4 z-20 bg-indigo-900/95 backdrop-blur-md text-white p-6 rounded-2xl shadow-2xl border border-white/10 animate-in zoom-in-95">
          <div className="flex items-center justify-between mb-3">
             <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-300" />
                <h5 className="text-[10px] font-black uppercase tracking-widest">Resumo Inteligente</h5>
             </div>
             <button onClick={() => setSummary(null)} className="p-1 hover:bg-white/10 rounded-lg">
                <X className="w-4 h-4" />
             </button>
          </div>
          <div className="prose prose-invert prose-xs">
             <p className="text-xs text-indigo-50 leading-relaxed whitespace-pre-wrap">{summary}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSend} className="p-4 bg-white border-t border-gray-50 flex items-center gap-3">
        <button type="button" className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
          <Paperclip className="w-5 h-5" />
        </button>
        <input 
          type="text" 
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Escreva sua mensagem..."
          className="flex-1 bg-gray-50 border-none rounded-xl px-4 py-3 text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
        <button 
          type="submit"
          className="p-3 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 transition-all active:scale-95"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default ChatSystem;