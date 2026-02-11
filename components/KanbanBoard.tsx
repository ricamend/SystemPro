
import React, { useMemo } from 'react';
import { MoreHorizontal, Calendar, User, ArrowRight, Zap, AlertCircle } from 'lucide-react';
import { OSStatus, OSPriority } from '../types';

interface KanbanCard {
  id: string;
  title: string;
  customer: string;
  priority: OSPriority;
  tech?: string;
  date: string;
  status: OSStatus;
}

const columns: { title: string, status: OSStatus, color: string }[] = [
  { title: 'Abertas', status: 'open', color: 'bg-gray-100' },
  { title: 'Agendadas', status: 'scheduled', color: 'bg-blue-50' },
  { title: 'Em Execução', status: 'in_progress', color: 'bg-amber-50' },
  { title: 'Concluídas', status: 'completed', color: 'bg-emerald-50' },
];

const KanbanBoard: React.FC<{ onSelectOS: (id: string) => void, filteredOS: any[] }> = ({ onSelectOS, filteredOS }) => {
  
  // Agrupa as OS filtradas por status para as colunas do Kanban
  const cardsByStatus = useMemo(() => {
    const groups: Record<string, any[]> = {
      open: [],
      scheduled: [],
      in_progress: [],
      completed: [],
      billed: [],
      cancelled: []
    };
    
    filteredOS.forEach(os => {
      if (groups[os.status]) {
        groups[os.status].push(os);
      }
    });
    
    return groups;
  }, [filteredOS]);

  return (
    <div className="flex gap-6 overflow-x-auto pb-6 custom-scrollbar h-[calc(100vh-280px)] min-h-[500px]">
      {columns.map((col) => (
        <div key={col.status} className="flex-shrink-0 w-80 flex flex-col">
          <div className="flex items-center justify-between mb-4 px-2">
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-500">{col.title}</h3>
              <span className="bg-gray-200 text-gray-600 text-[10px] font-black px-2 py-0.5 rounded-full">
                {cardsByStatus[col.status]?.length || 0}
              </span>
            </div>
            <button className="p-1 hover:bg-gray-100 rounded-lg text-gray-400 transition-colors"><MoreHorizontal className="w-4 h-4" /></button>
          </div>

          <div className={`flex-1 rounded-[32px] p-3 space-y-3 ${col.color} border border-dashed border-gray-200/50 overflow-y-auto custom-scrollbar`}>
            {cardsByStatus[col.status]?.map((card) => (
              <div 
                key={card.id}
                onClick={() => onSelectOS(card.id)}
                className={`bg-white p-5 rounded-2xl shadow-sm border border-gray-100 cursor-pointer hover:shadow-md hover:border-blue-200 transition-all group relative overflow-hidden ${
                  card.priority === 'urgent' ? 'ring-2 ring-red-500/20' : ''
                }`}
              >
                {card.priority === 'urgent' && (
                  <div className="absolute top-0 left-0 w-full h-1 bg-red-500 animate-pulse"></div>
                )}
                
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[10px] font-black text-blue-600 uppercase">#{card.id.split('-')[1] || card.id}</span>
                  {card.priority === 'high' || card.priority === 'urgent' ? (
                    <AlertCircle className={`w-3.5 h-3.5 ${card.priority === 'urgent' ? 'text-red-500' : 'text-orange-500'}`} />
                  ) : null}
                </div>

                <h4 className="text-sm font-bold text-gray-900 leading-snug mb-1 group-hover:text-blue-600 transition-colors">
                  {card.service || card.title}
                </h4>
                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mb-4">{card.customer}</p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                  <div className="flex items-center gap-2">
                    {card.tech && card.tech !== 'Aguardando' ? (
                      <div className="w-6 h-6 rounded-lg bg-blue-100 flex items-center justify-center text-[9px] font-black text-blue-600 border border-white">
                        {card.tech.split(' ').map((n: string) => n[0]).join('')}
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 border border-dashed border-gray-300">
                        <User className="w-3 h-3" />
                      </div>
                    )}
                    <span className="text-[10px] font-bold text-gray-500">{card.tech || 'Não atribuído'}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[9px] font-black text-gray-400 uppercase">
                    <Calendar className="w-3 h-3" /> {new Date(card.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
                  </div>
                </div>
              </div>
            ))}
            
            {cardsByStatus[col.status]?.length === 0 && (
              <div className="py-10 text-center opacity-40">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Coluna Vazia</p>
              </div>
            )}
            
            <button className="w-full py-4 border-2 border-dashed border-gray-300/30 rounded-2xl text-[10px] font-black text-gray-400 uppercase tracking-widest hover:bg-white hover:text-blue-600 hover:border-blue-200 transition-all">
              + Adicionar OS
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
