
import React, { useState } from 'react';
import { 
  Zap, 
  Settings2, 
  Plus, 
  Trash2, 
  ChevronRight, 
  Layout, 
  Clock, 
  AlertCircle 
} from 'lucide-react';
import ServiceTypeForm from './ServiceTypeForm';

const ServiceTypes: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<any>(null);
  const [serviceTypes, setServiceTypes] = useState([
    { id: '1', name: 'Manutenção Corretiva', color: 'bg-red-500', default_priority: 'High', checklist: 'Hidráulica Padrão' },
    { id: '2', name: 'Manutenção Preventiva', color: 'bg-blue-500', default_priority: 'Medium', checklist: 'Revisão Mensal' },
    { id: '3', name: 'Instalação de Ativos', color: 'bg-emerald-500', default_priority: 'Low', checklist: 'Checklist Instalação' },
    { id: '4', name: 'Vistoria Técnica', color: 'bg-amber-500', default_priority: 'Medium', checklist: 'Relatório Vistoria' },
  ]);

  const handleEdit = (type: any) => {
    setSelectedType(type);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Deseja realmente excluir este tipo de serviço?")) {
      setServiceTypes(prev => prev.filter(t => t.id !== id));
    }
  };

  const handleSave = (newData: any) => {
    if (selectedType) {
      // Atualizando existente
      setServiceTypes(prev => prev.map(t => t.id === newData.id ? newData : t));
    } else {
      // Adicionando novo
      setServiceTypes(prev => [...prev, newData]);
    }
    setIsFormOpen(false);
    setSelectedType(null);
  };

  if (isFormOpen) {
    return (
      <div className="max-w-4xl mx-auto py-10 animate-in fade-in zoom-in-95 duration-300">
        <ServiceTypeForm 
          onClose={() => { setIsFormOpen(false); setSelectedType(null); }} 
          onSave={handleSave} 
          initialData={selectedType}
        />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Tipos de Serviço</h2>
          <p className="text-gray-500 font-medium">Padronize seus atendimentos definindo comportamentos padrão.</p>
        </div>
        <button 
          onClick={() => { setSelectedType(null); setIsFormOpen(true); }}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all hover:scale-105 active:scale-95"
        >
          <Plus className="w-4 h-4" />
          Novo Tipo
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {serviceTypes.map(type => (
          <div key={type.id} className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-2 h-full ${type.color}`}></div>
            
            <div className="flex justify-between items-start mb-6">
              <div className={`w-12 h-12 rounded-2xl ${type.color.replace('500', '50').replace('600', '50')} flex items-center justify-center`}>
                <Zap className={`w-6 h-6 ${type.color.replace('bg-', 'text-')}`} />
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleEdit(type)}
                  className="p-2 text-gray-300 hover:text-blue-600 hover:bg-gray-50 rounded-xl transition-all"
                  title="Editar Configurações"
                >
                  <Settings2 className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleDelete(type.id)}
                  className="p-2 text-gray-300 hover:text-red-500 hover:bg-gray-50 rounded-xl transition-all"
                  title="Excluir Tipo"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <h3 className="text-lg font-black text-gray-900 mb-1 leading-tight">{type.name}</h3>
            
            <div className="space-y-3 mt-6 pt-4 border-t border-gray-50">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Prioridade Padrão</span>
                <span className="text-[10px] font-black text-gray-700 uppercase">{type.default_priority}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Checklist Vinculado</span>
                <button 
                  onClick={() => handleEdit(type)}
                  className="text-[10px] font-black text-blue-600 uppercase underline cursor-pointer hover:text-blue-800 transition-colors"
                >
                  {type.checklist}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 p-6 rounded-[32px] border border-blue-100 flex flex-col md:flex-row gap-6 items-center">
        <div className="w-16 h-16 bg-blue-600 rounded-[24px] flex items-center justify-center text-white shadow-lg shrink-0">
          <AlertCircle className="w-8 h-8" />
        </div>
        <div>
          <h4 className="text-lg font-black text-blue-900 leading-tight">Dica de Configuração</h4>
          <p className="text-sm text-blue-700 mt-1 leading-relaxed">
            Ao definir um checklist padrão, ele será automaticamente anexado a toda nova OS deste tipo, garantindo que o técnico não esqueça nenhum passo importante do processo.
          </p>
        </div>
        <button className="md:ml-auto px-6 py-3 bg-white text-blue-600 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all border border-blue-200 shadow-sm">
          Aprender Mais
        </button>
      </div>
    </div>
  );
};

export default ServiceTypes;
