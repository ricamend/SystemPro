
import React from 'react';
import { 
  User, 
  Settings, 
  MessageSquare, 
  Camera, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  FileText,
  Play,
  ArrowRight,
  Edit3,
  UserPlus
} from 'lucide-react';
import { AuditLog } from '../types';

interface Props {
  logs: AuditLog[];
}

const getIcon = (type: AuditLog['type']) => {
  switch (type) {
    case 'system': return { icon: Settings, color: 'text-gray-400', bg: 'bg-gray-100' };
    case 'attachment': return { icon: Camera, color: 'text-blue-600', bg: 'bg-blue-50' };
    case 'status': return { icon: Play, color: 'text-amber-500', bg: 'bg-amber-50' };
    case 'comment': return { icon: MessageSquare, color: 'text-purple-600', bg: 'bg-purple-50' };
    case 'edit': return { icon: Edit3, color: 'text-indigo-600', bg: 'bg-indigo-50' };
    case 'user': return { icon: UserPlus, color: 'text-emerald-600', bg: 'bg-emerald-50' };
    default: return { icon: FileText, color: 'text-gray-400', bg: 'bg-gray-100' };
  }
};

const formatValue = (val?: string) => {
  if (!val) return 'Vazio';
  const statusLabels: Record<string, string> = {
    'open': 'Aberta',
    'scheduled': 'Agendada',
    'in_progress': 'Em Execução',
    'completed': 'Concluída',
    'billed': 'Faturada',
    'cancelled': 'Cancelada'
  };
  return statusLabels[val] || val;
};

const AuditTimeline: React.FC<Props> = ({ logs }) => {
  if (logs.length === 0) {
    return (
      <div className="py-12 text-center space-y-3">
        <Clock className="w-10 h-10 text-gray-200 mx-auto" />
        <p className="text-sm font-black text-gray-300 uppercase tracking-widest">Nenhum histórico registrado</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-gray-400" />
          <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Linha do Tempo</h4>
        </div>
        <span className="text-[9px] font-black text-blue-600 uppercase bg-blue-50 px-2 py-0.5 rounded-md">{logs.length} eventos</span>
      </div>

      <div className="relative pl-4 space-y-10 before:absolute before:left-8 before:top-0 before:bottom-0 before:w-px before:bg-gray-100">
        {logs.map((log) => {
          const config = getIcon(log.type);
          return (
            <div key={log.id} className="relative pl-12 group animate-in slide-in-from-left-4 duration-300">
              <div className={`absolute left-0 top-0 w-8 h-8 rounded-xl ${config.bg} flex items-center justify-center border-4 border-white shadow-sm z-10 transition-transform group-hover:scale-110`}>
                <config.icon className={`w-3.5 h-3.5 ${config.color}`} />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-xs font-black text-gray-900 leading-tight">
                    {log.action}
                  </p>
                  <span className="text-[9px] font-bold text-gray-400 uppercase whitespace-nowrap bg-gray-50 px-2 py-0.5 rounded">
                    {new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center text-[8px] font-black text-white">
                    {log.user_name[0]}
                  </div>
                  <p className="text-[10px] font-bold text-gray-500">{log.user_name}</p>
                  <span className="text-[10px] text-gray-300">•</span>
                  <span className="text-[10px] text-gray-400 font-medium">
                    {new Date(log.created_at).toLocaleDateString('pt-BR')}
                  </span>
                </div>

                {log.old_value !== undefined && log.new_value !== undefined && (
                  <div className="mt-2 flex items-center gap-3 p-3 bg-gray-50/80 rounded-2xl border border-gray-100 w-fit max-w-full overflow-hidden">
                    <span className="text-[10px] font-bold text-gray-400 line-through truncate">{formatValue(log.old_value)}</span>
                    <ArrowRight className="w-3 h-3 text-gray-300 shrink-0" />
                    <span className="text-[10px] font-black text-blue-600 truncate">{formatValue(log.new_value)}</span>
                  </div>
                )}
                
                {log.type === 'comment' && log.new_value && (
                  <div className="mt-2 p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100 text-[11px] text-indigo-900 leading-relaxed font-medium italic">
                    "{log.new_value}"
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AuditTimeline;
