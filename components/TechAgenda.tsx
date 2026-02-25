
import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, ChevronRight, Filter, ChevronLeft, AlertCircle } from 'lucide-react';

const TechAgenda: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(21);
  
  const weekDays = [
    { label: 'S', date: 20 },
    { label: 'T', date: 21 },
    { label: 'Q', date: 22 },
    { label: 'Q', date: 23 },
    { label: 'S', date: 24 },
    { label: 'S', date: 25 },
    { label: 'D', date: 26 },
  ];

  const agendaItems = [
    { 
      id: '5491', 
      time: '14:00', 
      title: 'Reparo Hidráulico', 
      client: 'Condomínio Solar', 
      priority: 'high',
      address: 'Rua das Flores, 123 - Bloco B'
    },
    { 
      id: '5492', 
      time: '16:30', 
      title: 'Manutenção Válvulas', 
      client: 'Mercado Central', 
      priority: 'medium',
      address: 'Av. Brasil, 500'
    },
    { 
      id: '5501', 
      time: '18:00', 
      title: 'Check-up Preventivo', 
      client: 'Residencial Pinheiros', 
      priority: 'low',
      address: 'Rua Augusta, 1500'
    },
  ];

  return (
    <div className="p-6 pb-24 space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">Sua Agenda</h2>
          <p className="text-xs text-gray-500 font-medium">Controle de atendimentos diários.</p>
        </div>
        <button className="p-3 bg-white border border-gray-100 rounded-2xl shadow-sm text-gray-400">
          <Filter className="w-5 h-5" />
        </button>
      </div>

      {/* Seletor de Datas Horizontal */}
      <div className="flex items-center justify-between gap-2">
        {weekDays.map((day, i) => (
          <button 
            key={i}
            onClick={() => setSelectedDate(day.date)}
            className={`flex-1 py-3 rounded-2xl flex flex-col items-center transition-all ${
              selectedDate === day.date 
              ? 'bg-blue-600 text-white shadow-xl shadow-blue-100 scale-105' 
              : 'bg-white text-gray-400 border border-gray-50'
            }`}
          >
            <span className="text-[10px] font-black uppercase opacity-60 mb-1">{day.label}</span>
            <span className="text-sm font-black">{day.date}</span>
          </button>
        ))}
      </div>

      {/* Timeline de Cards */}
      <div className="space-y-6 relative before:absolute before:left-6 before:top-4 before:bottom-4 before:w-px before:bg-gray-100">
        {agendaItems.map((item, idx) => (
          <div key={item.id} className="relative pl-12 group">
            <div className={`absolute left-4 top-2 w-4 h-4 rounded-full border-4 border-white shadow-sm z-10 transition-colors ${
              item.priority === 'high' ? 'bg-red-500' : item.priority === 'medium' ? 'bg-blue-500' : 'bg-gray-300'
            }`}></div>
            
            <div className="bg-white p-5 rounded-[32px] border border-gray-100 shadow-sm group-active:scale-[0.98] transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-blue-50 rounded-xl text-blue-600">
                    <Clock className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-black text-gray-900">{item.time}</span>
                </div>
                <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">OS #{item.id}</span>
              </div>
              
              <div className="space-y-1 mb-4">
                <h4 className="text-base font-black text-gray-800 leading-tight">{item.title}</h4>
                <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{item.client}</p>
              </div>

              <div className="flex items-center gap-1.5 text-gray-400">
                <MapPin className="w-3.5 h-3.5" />
                <span className="text-[10px] font-medium truncate">{item.address}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 bg-blue-50 rounded-[32px] border border-blue-100 flex items-center gap-4">
        <AlertCircle className="w-6 h-6 text-blue-600 shrink-0" />
        <p className="text-[10px] text-blue-800 font-bold leading-relaxed uppercase">
          Você tem 1 atendimento com alta prioridade pendente.
        </p>
      </div>
    </div>
  );
};

export default TechAgenda;
