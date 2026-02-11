
import React, { useState } from 'react';
// Added Truck, Clock, and CheckCircle to imports
import { 
  Plus, 
  Settings2, 
  Trash2, 
  GripVertical, 
  Save, 
  Layout, 
  Database,
  Type,
  ToggleLeft,
  Calendar,
  ChevronDown,
  Truck,
  Clock,
  CheckCircle
} from 'lucide-react';

const CustomFieldConfig: React.FC = () => {
  const [fields, setFields] = useState([
    { id: '1', name: 'Nº do Medidor', type: 'number', required: true, section: 'Hidráulica' },
    { id: '2', name: 'Marca do Dispositivo', type: 'text', required: false, section: 'Segurança' },
  ]);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Campos Customizados</h2>
          <p className="text-gray-500">Adicione campos específicos para cada tipo de ordem de serviço.</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all">
          <Plus className="w-4 h-4" /> Novo Campo
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-50 bg-gray-50/50 flex items-center justify-between">
              <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                <Layout className="w-4 h-4 text-blue-600" />
                Campos Ativos
              </h3>
              <span className="text-[10px] font-bold text-gray-400 bg-white px-2 py-1 rounded-full border border-gray-100">2 DE 50</span>
            </div>

            <div className="divide-y divide-gray-50">
              {fields.map((field) => (
                <div key={field.id} className="p-6 flex items-center justify-between group hover:bg-gray-50/30 transition-all">
                  <div className="flex items-center gap-6">
                    <GripVertical className="w-4 h-4 text-gray-200 cursor-move" />
                    <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400">
                      {field.type === 'text' ? <Type className="w-5 h-5" /> : <Database className="w-5 h-5" />}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">{field.name}</h4>
                      <div className="flex gap-2 mt-1">
                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{field.type}</span>
                        {field.required && (
                          <span className="text-[9px] font-black text-red-400 uppercase tracking-widest">• Obrigatório</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="p-2 text-gray-300 hover:text-blue-600 transition-colors">
                      <Settings2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-300 hover:text-red-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
             <div className="flex items-center gap-3 mb-8">
                <div className="p-2.5 bg-purple-50 rounded-xl text-purple-600">
                   <ToggleLeft className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-black text-gray-900 tracking-tight">Status Personalizados</h3>
             </div>
             
             <div className="space-y-3">
                {[
                  { name: 'Em Rota', color: 'bg-blue-500', icon: Truck },
                  { name: 'Aguardando Peça', color: 'bg-amber-500', icon: Clock },
                  { name: 'Vistoria Pendente', color: 'bg-purple-500', icon: Layout },
                ].map((st, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-purple-100 transition-all">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${st.color}`}></div>
                      <span className="text-xs font-bold text-gray-800">{st.name}</span>
                    </div>
                    <button className="text-[10px] font-black text-purple-600 uppercase tracking-widest hover:underline">Configurar</button>
                  </div>
                ))}
                <button className="w-full py-4 border-2 border-dashed border-gray-100 rounded-2xl text-[10px] font-black text-gray-400 hover:border-purple-200 hover:text-purple-600 transition-all uppercase tracking-[0.2em] flex items-center justify-center gap-2">
                   <Plus className="w-4 h-4" /> Adicionar Status
                </button>
             </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-gray-900 to-blue-900 p-8 rounded-[32px] text-white shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:scale-125 transition-transform duration-700"></div>
            <Settings2 className="w-10 h-10 mb-6 text-blue-400" />
            <h4 className="text-xl font-black mb-2 leading-tight">Mapeie seu Processo</h4>
            <p className="text-sm text-gray-400 mb-8 leading-relaxed">Personalize o formulário de OS para capturar exatamente o que seu negócio precisa.</p>
            <div className="space-y-3">
               <div className="flex items-center gap-3 text-xs font-medium text-gray-300">
                  <CheckCircle className="w-4 h-4 text-emerald-500" /> Validação de campos
               </div>
               <div className="flex items-center gap-3 text-xs font-medium text-gray-300">
                  <CheckCircle className="w-4 h-4 text-emerald-500" /> Máscaras de input
               </div>
               <div className="flex items-center gap-3 text-xs font-medium text-gray-300">
                  <CheckCircle className="w-4 h-4 text-emerald-500" /> Campos condicionais
               </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm">
             <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Pré-visualização</h4>
             <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                   <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Tipo: Número</p>
                   <p className="text-sm font-bold text-gray-800">Nº do Medidor</p>
                   <input disabled type="number" placeholder="123456..." className="w-full mt-2 bg-white border border-gray-100 rounded-xl px-3 py-2 text-xs" />
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomFieldConfig;
