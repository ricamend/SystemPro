
import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Plus, 
  MoreHorizontal,
  Calendar,
  User,
  ArrowRight,
  LayoutGrid,
  List as ListIcon,
  BellRing,
  X,
  Users,
  AlertCircle,
  Clock,
  CheckCircle2,
  MoreVertical,
  ChevronDown
} from 'lucide-react';
import ServiceOrderForm from './ServiceOrderForm';
import KanbanBoard from './KanbanBoard';
import { notificationService } from '../services/notificationService';
import { logService } from '../services/logService';
import { OSStatus, OSPriority } from '../types';

const availableTechs = [
  { id: '1', name: 'Carlos Lima' },
  { id: '2', name: 'Ana Souza' },
  { id: '3', name: 'Marcos Silva' },
  { id: '4', name: 'Ricardo Dias' },
];

const defaultOS = [
  { id: 'OS-5491', customer: 'Mercado Central', service: 'Reparo Hidráulico', title: 'Reparo Hidráulico', description: 'Vazamento no bloco B', priority: 'high', status: 'in_progress', assigned_tech_ids: ['1', '2'], date: '2024-04-21' },
  { id: 'OS-5492', customer: 'Escola Dom Bosco', service: 'Instalação Câmeras', title: 'Instalação Câmeras', description: 'Sistema de monitoramento pátio', priority: 'medium', status: 'scheduled', assigned_tech_ids: ['2'], date: '2024-04-22' },
];

const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    'open': 'bg-slate-100 text-slate-700 border-slate-200',
    'scheduled': 'bg-blue-50 text-blue-700 border-blue-100',
    'in_progress': 'bg-amber-50 text-amber-700 border-amber-200',
    'completed': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'billed': 'bg-indigo-50 text-indigo-700 border-indigo-100',
    'cancelled': 'bg-rose-50 text-rose-700 border-rose-100',
    'waiting_parts': 'bg-[#fde68a] text-[#d97706] border-[#fef3c7]',
  };
  
  const labels: Record<string, string> = {
    'in_progress': 'Em Execução',
    'scheduled': 'Agendada',
    'completed': 'Concluída',
    'open': 'Aberta',
    'billed': 'Faturada',
    'cancelled': 'Cancelada',
    'waiting_parts': 'Aguardando Peça'
  };

  return (
    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-sm inline-flex items-center gap-1.5 ${styles[status] || styles['open']}`}>
      <div className={`w-1.5 h-1.5 rounded-full ${status === 'in_progress' ? 'animate-pulse' : ''} bg-current`}></div>
      {labels[status] || status}
    </span>
  );
};

const PriorityBadge = ({ priority }: { priority: string }) => {
  const config: Record<string, { color: string, label: string, icon?: any }> = {
    'low': { color: 'text-gray-400', label: 'Baixa' },
    'medium': { color: 'text-blue-500', label: 'Média' },
    'high': { color: 'text-orange-500', label: 'Alta' },
    'urgent': { color: 'text-red-600', label: 'Urgente', icon: AlertCircle },
  };
  
  const current = config[priority] || config['low'];
  const Icon = current.icon;

  return (
    <div className={`flex items-center gap-2 ${current.color} font-black`}>
      {Icon ? (
        <Icon className={`w-4 h-4 ${priority === 'urgent' ? 'animate-bounce' : ''}`} />
      ) : (
        <div className={`w-2 h-2 rounded-full bg-current shadow-sm`}></div>
      )}
      <span className="text-[10px] uppercase tracking-tighter">{current.label}</span>
    </div>
  );
};

const TechAvatars = ({ techIds }: { techIds: string[] }) => {
  if (!techIds || techIds.length === 0) {
    return (
      <div className="flex items-center gap-2 group/wait">
        <div className="w-8 h-8 rounded-xl bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-300 group-hover/wait:border-blue-300 group-hover/wait:text-blue-400 transition-colors">
          <User className="w-4 h-4" />
        </div>
        <span className="text-[10px] font-bold text-gray-400 uppercase group-hover/wait:text-blue-500">Aguardando</span>
      </div>
    );
  }

  return (
    <div className="flex items-center">
      <div className="flex -space-x-3 mr-4">
        {techIds.slice(0, 3).map((id, i) => (
          <div 
            key={i} 
            className="w-9 h-9 rounded-xl bg-white border-2 border-white shadow-sm overflow-hidden transform hover:-translate-y-1 transition-all cursor-pointer ring-1 ring-gray-100"
          >
            <div className="w-full h-full bg-indigo-600 flex items-center justify-center text-[10px] font-black text-white">
              {id === '1' ? 'CL' : id === '2' ? 'AS' : 'T'}
            </div>
          </div>
        ))}
      </div>
      <div className="hidden lg:block">
        <p className="text-[10px] font-black text-gray-900 leading-tight">
          {techIds.length} Escalados
        </p>
      </div>
    </div>
  );
};

interface Props {
  onSelectOS: (id: string) => void;
}

const ServiceOrders: React.FC<Props> = ({ onSelectOS }) => {
  const [osList, setOsList] = useState<any[]>(() => {
    const saved = localStorage.getItem('servicopro_os_data');
    return saved ? JSON.parse(saved) : defaultOS;
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedTechId, setSelectedTechId] = useState<string>('all');
  const [isCreating, setIsCreating] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'kanban'>('list');

  useEffect(() => {
    localStorage.setItem('servicopro_os_data', JSON.stringify(osList));
  }, [osList]);

  const filteredOS = useMemo(() => {
    return osList.filter(os => {
      const matchesSearch = 
        os.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        os.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        os.title.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || os.status === statusFilter;
      const matchesTech = selectedTechId === 'all' || (os.assigned_tech_ids && os.assigned_tech_ids.includes(selectedTechId));
      
      return matchesSearch && matchesStatus && matchesTech;
    });
  }, [searchTerm, statusFilter, selectedTechId, osList]);

  const handleSaveOS = (data: any) => {
    const existing = osList.find(o => o.id === data.id);
    if (existing) {
      setOsList(prev => prev.map(o => o.id === data.id ? { ...o, ...data } : o));
    } else {
      const newOS = {
        ...data,
        id: data.id || `OS-${Math.floor(Math.random() * 10000)}`,
        date: data.scheduled_date || new Date().toISOString().split('T')[0],
        status: data.status || 'open'
      };
      setOsList(prev => [newOS, ...prev]);
      logService.addLog({
        target_id: newOS.id,
        target_type: 'service_order',
        action: 'Ordem de Serviço Criada',
        type: 'system'
      });
    }
    setIsCreating(false);
  };

  if (isCreating) {
    return (
      <div className="max-w-4xl mx-auto">
        <ServiceOrderForm 
          onClose={() => setIsCreating(false)} 
          onSave={handleSaveOS} 
        />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Ordens de Serviço</h2>
          <p className="text-gray-500 font-medium mt-1">Monitore e controle a execução técnica em tempo real.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-white border border-gray-100 p-1 rounded-2xl shadow-sm">
            <button onClick={() => setViewMode('list')} className={`p-2.5 rounded-xl transition-all ${viewMode === 'list' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400'}`}><ListIcon className="w-5 h-5" /></button>
            <button onClick={() => setViewMode('kanban')} className={`p-2.5 rounded-xl transition-all ${viewMode === 'kanban' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400'}`}><LayoutGrid className="w-5 h-5" /></button>
          </div>
          <button onClick={() => setIsCreating(true)} className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-blue-700 shadow-xl transition-all active:scale-[0.98]"><Plus className="w-4 h-4" /> Nova OS</button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 w-5 h-5 transition-colors" />
          <input 
            type="text" 
            placeholder="Pesquisar OS..."
            className="w-full pl-13 pr-12 py-4 bg-gray-50 border-none rounded-[20px] text-sm font-medium outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select 
              value={selectedTechId}
              onChange={(e) => setSelectedTechId(e.target.value)}
              className="w-full pl-10 pr-10 py-4 bg-gray-50 border-none rounded-[20px] text-sm font-bold text-gray-700 appearance-none focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer transition-all"
            >
              <option value="all">Todos os Técnicos</option>
              {availableTechs.map(tech => (
                <option key={tech.id} value={tech.id}>{tech.name}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
          </div>

          <div className="relative flex-1 md:w-48">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-10 pr-10 py-4 bg-gray-50 border-none rounded-[20px] text-sm font-bold text-gray-700 appearance-none focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer transition-all"
            >
              <option value="all">Todos Status</option>
              <option value="open">Abertas</option>
              <option value="scheduled">Agendadas</option>
              <option value="in_progress">Em Execução</option>
              <option value="completed">Concluídas</option>
              <option value="waiting_parts">Aguardando Peça</option>
              <option value="billed">Faturadas</option>
              <option value="cancelled">Canceladas</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
          </div>
        </div>
      </div>

      {viewMode === 'list' ? (
        <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden animate-in fade-in">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50/50 border-b border-gray-100">
                <tr>
                  <th className="px-8 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Identificação</th>
                  <th className="px-8 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Prioridade</th>
                  <th className="px-8 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Equipe</th>
                  <th className="px-8 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                  <th className="px-8 py-6"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredOS.length > 0 ? filteredOS.map((os) => (
                  <tr key={os.id} className="hover:bg-blue-50/30 transition-all group cursor-pointer" onClick={() => onSelectOS(os.id)}>
                    <td className="px-8 py-7">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white border border-gray-100 rounded-[18px] flex items-center justify-center text-blue-600 font-black text-xs shadow-sm group-hover:border-blue-200 transition-all">#{os.id.split('-')[1]}</div>
                        <div className="flex flex-col">
                          <span className="text-sm font-black text-gray-900 group-hover:text-blue-600 transition-colors">{os.customer}</span>
                          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">{os.title}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-7"><PriorityBadge priority={os.priority} /></td>
                    <td className="px-8 py-7"><TechAvatars techIds={os.assigned_tech_ids || []} /></td>
                    <td className="px-8 py-7"><StatusBadge status={os.status} /></td>
                    <td className="px-8 py-7 text-right">
                      <button className="p-2.5 opacity-0 group-hover:opacity-100 transition-all bg-white border border-gray-100 rounded-xl text-blue-600 shadow-sm active:scale-90"><ArrowRight className="w-4.5 h-4.5" /></button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={5} className="px-8 py-20 text-center">
                      <div className="flex flex-col items-center gap-3 opacity-30">
                        <AlertCircle className="w-12 h-12" />
                        <p className="text-sm font-black uppercase tracking-widest">Nenhuma OS encontrada para estes filtros.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <KanbanBoard onSelectOS={onSelectOS} filteredOS={filteredOS} />
      )}
    </div>
  );
};

export default ServiceOrders;
