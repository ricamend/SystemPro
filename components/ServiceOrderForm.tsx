
import React, { useState, useEffect } from 'react';
import { 
  X, 
  Save, 
  User, 
  Calendar as CalendarIcon, 
  AlertTriangle, 
  FileText,
  MapPin,
  ClipboardCheck,
  Zap,
  Sparkles,
  CheckCircle2,
  Navigation,
  Loader2,
  Users,
  Check
} from 'lucide-react';
import { aiService } from '../services/aiService';
import { logService } from '../services/logService';
import { notificationService } from '../services/notificationService';

interface Props {
  onClose: () => void;
  onSave: (data: any) => void;
  initialData?: any;
}

const availableTechs = [
  { id: '1', name: 'Carlos Lima', specialty: 'Hidráulica' },
  { id: '2', name: 'Ana Souza', specialty: 'Elétrica' },
  { id: '3', name: 'Marcos Silva', specialty: 'Ar Condicionado' },
  { id: '4', name: 'Ricardo Dias', specialty: 'CFTV' },
];

const ServiceOrderForm: React.FC<Props> = ({ onClose, onSave, initialData }) => {
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState(initialData?.description || '');
  const [title, setTitle] = useState(initialData?.title || '');
  const [customer, setCustomer] = useState(initialData?.customer || '');
  const [selectedTechIds, setSelectedTechIds] = useState<string[]>(initialData?.assigned_tech_ids || []);
  const [priority, setPriority] = useState(initialData?.priority || 'medium');
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState<any>(null);
  
  const [isCapturing, setIsCapturing] = useState(false);
  const [lat, setLat] = useState(initialData?.latitude || '');
  const [lng, setLng] = useState(initialData?.longitude || '');

  const toggleTech = (id: string) => {
    setSelectedTechIds(prev => 
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  const handleCaptureLocation = () => {
    setIsCapturing(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLat(position.coords.latitude.toString());
        setLng(position.coords.longitude.toString());
        setIsCapturing(false);
      }, (error) => {
        setIsCapturing(false);
        alert("Erro ao capturar GPS.");
      });
    } else {
      setIsCapturing(false);
    }
  };

  const handleAiAnalysis = async () => {
    if (!description || description.length < 10) return;
    setIsAnalyzing(true);
    const result = await aiService.suggestDiagnosis(description);
    if (result) setAiSuggestion(result);
    setIsAnalyzing(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const changes: any[] = [];
    if (initialData?.id) {
      // Comparar campos para Auditoria
      if (title !== initialData.title) changes.push({ target_id: initialData.id, target_type: 'service_order', action: 'Título alterado', type: 'edit', old_value: initialData.title, new_value: title });
      if (description !== initialData.description) changes.push({ target_id: initialData.id, target_type: 'service_order', action: 'Descrição técnica atualizada', type: 'edit' });
      if (priority !== initialData.priority) changes.push({ target_id: initialData.id, target_type: 'service_order', action: 'Prioridade alterada', type: 'edit', old_value: initialData.priority, new_value: priority });
      
      const oldTechs = (initialData.assigned_tech_ids || []).sort().join(',');
      const newTechs = [...selectedTechIds].sort().join(',');
      if (oldTechs !== newTechs) {
        const names = selectedTechIds.map(id => availableTechs.find(t => t.id === id)?.name).join(', ');
        changes.push({ target_id: initialData.id, target_type: 'service_order', action: 'Equipe técnica redefinida', type: 'user', new_value: names });
      }
    }

    logService.bulkAddLogs(changes);

    setTimeout(() => {
      const isNew = !initialData?.id;
      const osId = initialData?.id || `OS-${Math.floor(Math.random() * 10000)}`;
      
      onSave({ 
        ...initialData,
        id: osId,
        title,
        description,
        customer,
        priority,
        assigned_tech_ids: selectedTechIds,
        latitude: lat ? parseFloat(lat) : null,
        longitude: lng ? parseFloat(lng) : null,
        updated_at: new Date().toISOString()
      });
      
      // Disparar Push se for nova OS e houver técnicos
      if (isNew && selectedTechIds.length > 0) {
        notificationService.notifyNewOS(osId.split('-')[1], customer);
      }

      setLoading(false);
    }, 800);
  };

  return (
    <div className="bg-white rounded-[32px] border border-gray-100 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
      <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
        <div>
          <h3 className="text-xl font-black text-gray-900 tracking-tight">
            {initialData?.id ? 'Editar Ordem de Serviço' : 'Nova Ordem de Serviço'}
          </h3>
          <p className="text-xs text-gray-500 font-medium">Notificação automática para técnicos escalados.</p>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-white rounded-full transition-colors text-gray-400">
          <X className="w-6 h-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
        <div className="space-y-4">
           <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Título do Atendimento</label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Manutenção Bomba KSB"
              className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-inner"
              required
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 text-blue-600">
            <Sparkles className="w-4 h-4" />
            <h4 className="text-xs font-black uppercase tracking-widest">Diagnóstico por IA</h4>
          </div>
          <div className="space-y-1.5 relative">
            <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Descrição do Problema</label>
            <textarea 
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva o que precisa ser feito..."
              className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none pr-12 shadow-inner"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Prioridade</label>
              <select 
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none appearance-none"
              >
                <option value="low">Baixa</option>
                <option value="medium">Média</option>
                <option value="high">Alta</option>
                <option value="urgent">Urgente</option>
              </select>
           </div>
           <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Cliente</label>
              <select 
                value={customer}
                onChange={(e) => setCustomer(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none appearance-none"
                required
              >
                <option value="">Selecione...</option>
                <option value="Condomínio Solar">Condomínio Solar</option>
                <option value="Mercado Central">Mercado Central</option>
                <option value="Escola Dom Bosco">Escola Dom Bosco</option>
              </select>
           </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 text-blue-600">
            <Users className="w-4 h-4" />
            <h4 className="text-xs font-black uppercase tracking-widest">Equipe Designada</h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {availableTechs.map(tech => {
              const isSelected = selectedTechIds.includes(tech.id);
              return (
                <button
                  key={tech.id}
                  type="button"
                  onClick={() => toggleTech(tech.id)}
                  className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${
                    isSelected 
                    ? 'border-blue-600 bg-blue-50 shadow-md ring-4 ring-blue-600/5' 
                    : 'border-gray-50 bg-white hover:border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs transition-colors ${
                      isSelected ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400'
                    }`}>
                      {tech.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div className="text-left">
                      <p className={`text-xs font-black leading-none ${isSelected ? 'text-blue-900' : 'text-gray-700'}`}>{tech.name}</p>
                      <p className="text-[9px] font-bold text-gray-400 uppercase mt-1">{tech.specialty}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </form>

      <div className="p-6 border-t border-gray-50 bg-gray-50/50 flex items-center justify-end gap-3">
        <button type="button" onClick={onClose} className="px-6 py-3 text-sm font-bold text-gray-500 hover:text-gray-700">Cancelar</button>
        <button 
          onClick={handleSubmit}
          disabled={loading}
          className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-2xl font-black text-sm shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all hover:scale-[1.02] disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
          {initialData?.id ? 'Salvar Alterações' : 'Criar OS'}
        </button>
      </div>
    </div>
  );
};

export default ServiceOrderForm;
