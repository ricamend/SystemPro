
import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Settings, 
  GripVertical, 
  Trash2, 
  Save, 
  ChevronRight,
  ClipboardCheck,
  Zap,
  CheckCircle2,
  X,
  Loader2
} from 'lucide-react';

interface ChecklistTemplate {
  id: string;
  name: string;
  steps: string[];
  category: string;
}

const ChecklistManager: React.FC = () => {
  const [templates, setTemplates] = useState<ChecklistTemplate[]>([
    { id: '1', name: 'Manutenção de Ar Condicionado', steps: ['Limpeza de Filtros', 'Verificação de Gás', 'Teste de Drenagem'], category: 'CLIMATIZAÇÃO' },
    { id: '2', name: 'Vistoria Hidráulica Predial', steps: ['Teste de Estanqueidade', 'Verificação de Válvulas'], category: 'HIDRÁULICA' },
    { id: '3', name: 'Instalação de CFTV', steps: ['Fixação de Câmeras', 'Configuração de DVR', 'Passagem de Cabos'], category: 'SEGURANÇA' },
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Estados do Formulário
  const [editName, setEditName] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editSteps, setEditSteps] = useState<string[]>([]);

  const handleEdit = (template: ChecklistTemplate) => {
    setSelectedId(template.id);
    setEditName(template.name);
    setEditCategory(template.category);
    setEditSteps(template.steps);
    setIsEditing(true);
  };

  const handleCreateNew = () => {
    setSelectedId(null);
    setEditName('');
    setEditCategory('CLIMATIZAÇÃO');
    setEditSteps(['Novo Passo...']);
    setIsEditing(true);
  };

  const handleAddStep = () => {
    setEditSteps([...editSteps, 'Novo Passo...']);
  };

  const handleRemoveStep = (index: number) => {
    setEditSteps(editSteps.filter((_, i) => i !== index));
  };

  const handleStepChange = (index: number, value: string) => {
    const newSteps = [...editSteps];
    newSteps[index] = value;
    setEditSteps(newSteps);
  };

  const handleSave = () => {
    if (!editName.trim()) {
      alert("O nome do checklist é obrigatório.");
      return;
    }

    setLoading(true);
    
    setTimeout(() => {
      if (selectedId) {
        // Editando existente
        setTemplates(templates.map(t => 
          t.id === selectedId 
            ? { ...t, name: editName, category: editCategory, steps: editSteps } 
            : t
        ));
      } else {
        // Criando novo
        const newTemplate: ChecklistTemplate = {
          id: Date.now().toString(),
          name: editName,
          category: editCategory,
          steps: editSteps
        };
        setTemplates([...templates, newTemplate]);
      }
      
      setLoading(false);
      setIsEditing(false);
      setSelectedId(null);
    }, 800);
  };

  if (isEditing) {
    return (
      <div className="max-w-4xl mx-auto py-4 animate-in zoom-in-95 duration-300">
        <div className="bg-white rounded-[40px] border border-gray-100 shadow-2xl overflow-hidden">
          <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
            <div className="flex items-center gap-4">
               <div className="bg-blue-600 p-3 rounded-2xl text-white shadow-lg">
                  <ClipboardCheck className="w-6 h-6" />
               </div>
               <div>
                  <h3 className="text-xl font-black text-gray-900 tracking-tight">
                    {selectedId ? 'Editar Protocolo' : 'Novo Protocolo de Serviço'}
                  </h3>
                  <p className="text-xs text-gray-500 font-medium">Configure os passos de qualidade para o campo.</p>
               </div>
            </div>
            <button onClick={() => setIsEditing(false)} className="p-2 hover:bg-white rounded-full transition-colors text-gray-400">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Nome do Checklist</label>
                <input 
                  type="text" 
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="Ex: Protocolo Hidráulico" 
                  className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-inner" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Categoria / Setor</label>
                <select 
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value)}
                  className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none appearance-none cursor-pointer"
                >
                  <option value="CLIMATIZAÇÃO">Climatização</option>
                  <option value="HIDRÁULICA">Hidráulica</option>
                  <option value="SEGURANÇA">Segurança</option>
                  <option value="ELÉTRICA">Elétrica</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Passos do Protocolo ({editSteps.length})</h4>
                <button onClick={() => setEditSteps([])} className="text-[10px] font-black text-blue-600 uppercase hover:underline">Limpar Todos</button>
              </div>
              <div className="space-y-3">
                {editSteps.map((step, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-2xl group hover:border-blue-200 transition-all animate-in slide-in-from-left-2">
                    <GripVertical className="w-4 h-4 text-gray-300 cursor-move" />
                    <input 
                      type="text" 
                      value={step}
                      onChange={(e) => handleStepChange(idx, e.target.value)}
                      placeholder={`Descreva o passo...`} 
                      className="flex-1 text-sm font-bold text-gray-700 outline-none bg-transparent" 
                    />
                    <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleRemoveStep(idx)}
                        className="p-1.5 text-gray-300 hover:text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
                <button 
                  onClick={handleAddStep}
                  className="w-full py-4 border-2 border-dashed border-gray-100 rounded-2xl text-xs font-black text-gray-400 hover:bg-gray-50 hover:text-blue-600 hover:border-blue-200 transition-all flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Adicionar Novo Passo
                </button>
              </div>
            </div>
          </div>

          <div className="p-8 border-t border-gray-50 bg-gray-50/50 flex justify-end gap-4">
             <button onClick={() => setIsEditing(false)} className="px-8 py-4 text-sm font-bold text-gray-500 hover:text-gray-700 transition-colors">Cancelar</button>
             <button 
                onClick={handleSave}
                disabled={loading}
                className="flex items-center gap-2 bg-blue-600 text-white px-10 py-4 rounded-2xl font-black text-sm shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all active:scale-[0.98] disabled:opacity-50"
             >
               {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
               {selectedId ? 'Salvar Alterações' : 'Criar Protocolo'}
             </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Protocolos de Serviço</h2>
          <p className="text-gray-500 font-medium leading-relaxed">Gerencie checklists padronizados para garantir a qualidade do campo.</p>
        </div>
        <button 
          onClick={handleCreateNew}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3.5 rounded-2xl text-sm font-black shadow-xl shadow-blue-100 hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <Plus className="w-5 h-5" /> Novo Checklist
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {templates.map(template => (
          <div key={template.id} className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 group relative">
            {/* Cog no topo direito dispara edição também */}
            <button 
              onClick={() => handleEdit(template)}
              className="absolute top-8 right-8 p-1.5 text-gray-100 group-hover:text-gray-300 hover:bg-gray-50 rounded-xl transition-all"
            >
               <Settings className="w-5 h-5" />
            </button>

            {/* Ícone Circle topo esquerdo */}
            <div className="mb-8">
               <div className="w-14 h-14 rounded-full bg-blue-50/50 flex items-center justify-center text-blue-600 border border-blue-100/30">
                  <CheckCircle2 className="w-7 h-7" />
               </div>
            </div>
            
            <div className="space-y-1 mb-10">
               <h3 className="text-xl font-black text-gray-900 leading-[1.2]">{template.name}</h3>
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">{template.category}</p>
            </div>
            
            <div className="flex items-center justify-between pt-6 border-t border-gray-50">
              <div className="flex items-center gap-2 text-gray-400">
                <Zap className="w-4 h-4" />
                <span className="text-xs font-bold">{template.steps.length} passos definidos</span>
              </div>
              <button 
                onClick={() => handleEdit(template)}
                className="flex items-center gap-1 text-blue-600 text-xs font-black uppercase tracking-widest group/btn"
              >
                Editar <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
              </button>
            </div>
          </div>
        ))}

        {/* Card de Adição rápida */}
        <button 
          onClick={handleCreateNew}
          className="border-2 border-dashed border-gray-200 rounded-[40px] p-8 flex flex-col items-center justify-center gap-4 text-gray-400 hover:border-blue-300 hover:text-blue-500 hover:bg-blue-50/30 transition-all group"
        >
           <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-white group-hover:shadow-lg transition-all">
              <Plus className="w-8 h-8" />
           </div>
           <p className="text-xs font-black uppercase tracking-[0.2em]">Novo Template</p>
        </button>
      </div>
    </div>
  );
};

export default ChecklistManager;
