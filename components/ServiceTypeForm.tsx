
import React, { useState, useEffect } from 'react';
import { 
  X, 
  Save, 
  Zap, 
  ChevronDown, 
  Palette, 
  ShieldCheck,
  Loader2,
  Check
} from 'lucide-react';

interface Props {
  onClose: () => void;
  onSave: (data: any) => void;
  initialData?: any;
}

const colors = [
  { name: 'Azul', value: 'bg-blue-500' },
  { name: 'Esmeralda', value: 'bg-emerald-500' },
  { name: 'Vermelho', value: 'bg-red-500' },
  { name: 'Âmbar', value: 'bg-amber-500' },
  { name: 'Roxo', value: 'bg-purple-500' },
  { name: 'Índigo', value: 'bg-indigo-600' },
  { name: 'Rosa', value: 'bg-pink-500' },
  { name: 'Slate', value: 'bg-slate-700' },
];

const ServiceTypeForm: React.FC<Props> = ({ onClose, onSave, initialData }) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(initialData?.name || '');
  const [priority, setPriority] = useState(initialData?.default_priority || 'Medium');
  const [selectedColor, setSelectedColor] = useState(initialData?.color || 'bg-blue-500');
  const [checklist, setChecklist] = useState(initialData?.checklist || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    setLoading(true);
    // Simula salvamento
    setTimeout(() => {
      onSave({ 
        id: initialData?.id || Date.now().toString(), 
        name, 
        default_priority: priority, 
        color: selectedColor,
        checklist 
      });
      setLoading(false);
    }, 800);
  };

  return (
    <div className="bg-white rounded-[40px] border border-gray-100 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 max-w-2xl w-full mx-auto">
      <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
        <div className="flex items-center gap-4">
          <div className={`p-4 rounded-3xl text-white shadow-lg transition-colors ${selectedColor}`}>
            <Zap className="w-6 h-6 fill-current" />
          </div>
          <div>
            <h3 className="text-xl font-black text-gray-900 tracking-tight">
              {initialData ? 'Editar Tipo de Serviço' : 'Novo Tipo de Serviço'}
            </h3>
            <p className="text-xs text-gray-500 font-medium">Defina padrões e comportamentos para este atendimento.</p>
          </div>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-white rounded-full transition-colors text-gray-400 hover:text-gray-600">
          <X className="w-6 h-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Nome do Tipo</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Instalação de Painéis"
                className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-inner"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Prioridade Padrão</label>
              <div className="relative">
                <select 
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none appearance-none cursor-pointer"
                >
                  <option value="Low">Baixa</option>
                  <option value="Medium">Média (Padrão)</option>
                  <option value="High">Alta</option>
                  <option value="Urgent">Urgente</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1 flex items-center gap-2">
              <Palette className="w-3 h-3" /> Cor de Identificação
            </label>
            <div className="grid grid-cols-4 gap-3 p-4 bg-gray-50 rounded-[32px] border border-gray-100 shadow-inner">
              {colors.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setSelectedColor(c.value)}
                  className={`aspect-square rounded-2xl transition-all flex items-center justify-center relative ${c.value} ${
                    selectedColor === c.value ? 'scale-110 shadow-lg ring-4 ring-white' : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  {selectedColor === c.value && <Check className="w-4 h-4 text-white font-black" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-gray-50">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Vincular Checklist Automático</label>
            <div className="relative">
              <select 
                value={checklist}
                onChange={(e) => setChecklist(e.target.value)}
                className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none appearance-none cursor-pointer"
              >
                <option value="">Nenhum checklist selecionado</option>
                <option value="Hidráulica Padrão">Hidráulica Padrão</option>
                <option value="Revisão Mensal">Revisão Mensal</option>
                <option value="Checklist Instalação">Checklist Instalação</option>
                <option value="Relatório Vistoria">Relatório Vistoria</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
            <p className="text-[10px] text-gray-400 font-medium px-1 italic">Este checklist será anexado automaticamente a toda OS deste tipo.</p>
          </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-[28px] border border-blue-100 flex items-center gap-4">
           <ShieldCheck className="w-8 h-8 text-blue-600" />
           <p className="text-xs text-blue-800 font-medium leading-relaxed">
             Tipos de serviço padronizados ajudam na extração de KPIs mais precisos no <b>ReportBuilder</b>.
           </p>
        </div>
      </form>

      <div className="p-8 border-t border-gray-50 bg-gray-50/50 flex items-center justify-end gap-4">
        <button type="button" onClick={onClose} className="px-8 py-4 text-sm font-bold text-gray-500 hover:text-gray-700 transition-colors">Cancelar</button>
        <button 
          onClick={handleSubmit}
          disabled={loading}
          className={`flex items-center gap-2 px-10 py-4 rounded-2xl font-black text-sm shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] text-white ${selectedColor} shadow-blue-100 disabled:opacity-50`}
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          {initialData ? 'Salvar Alterações' : 'Criar Tipo de Serviço'}
        </button>
      </div>
    </div>
  );
};

export default ServiceTypeForm;
