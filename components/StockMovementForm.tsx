
import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Package, 
  Save, 
  X,
  Plus,
  Truck,
  User,
  ArrowRightLeft,
  ChevronDown
} from 'lucide-react';

interface Props {
  onClose: () => void;
  onSave: (data: any) => void;
}

const StockMovementForm: React.FC<Props> = ({ onClose, onSave }) => {
  const [type, setType] = useState<'in' | 'out' | 'transfer'>('in');
  const [selectedTech, setSelectedTech] = useState('');

  return (
    <div className="bg-white rounded-[32px] border border-gray-100 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 max-w-xl mx-auto">
      <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
        <div>
          <h3 className="text-xl font-black text-gray-900 tracking-tight">Movimentação de Estoque</h3>
          <p className="text-xs text-gray-500 font-medium">Registre entradas, saídas ou transferências de responsabilidade.</p>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-white rounded-full transition-colors text-gray-400">
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="p-8 space-y-6">
        <div className="flex gap-2 p-1 bg-gray-100 rounded-2xl">
          <button 
            onClick={() => setType('in')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              type === 'in' ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <ArrowUpRight className="w-3.5 h-3.5" /> Entrada
          </button>
          <button 
            onClick={() => setType('out')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              type === 'out' ? 'bg-white text-red-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <ArrowDownRight className="w-3.5 h-3.5" /> Saída
          </button>
          <button 
            onClick={() => setType('transfer')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              type === 'transfer' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <ArrowRightLeft className="w-3.5 h-3.5" /> Transferir
          </button>
        </div>

        <div className="space-y-4">
          {type === 'transfer' && (
            <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 space-y-3 animate-in slide-in-from-top-2">
               <label className="text-[10px] font-black text-blue-400 uppercase tracking-widest px-1 flex items-center gap-2">
                 <Truck className="w-3 h-3" /> Destino (Técnico / Van)
               </label>
               <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-300" />
                  <select 
                    value={selectedTech}
                    onChange={(e) => setSelectedTech(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-white border-none rounded-xl text-sm font-bold text-blue-900 focus:ring-2 focus:ring-blue-500 outline-none appearance-none"
                  >
                    <option value="">Selecione o técnico responsável...</option>
                    <option value="1">Carlos Lima (Van 01)</option>
                    <option value="2">Ana Souza (Van 02)</option>
                    <option value="3">Marcos Silva (Mochila Técnica)</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-300" />
               </div>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Produto / Item</label>
            <div className="relative">
               <Package className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
               <select className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none appearance-none">
                <option>Selecione um item do estoque...</option>
                <option>Válvula Esfera 3/4</option>
                <option>Cabo Flexível 2.5mm</option>
                <option>Disjuntor 20A</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Quantidade</label>
              <input type="number" placeholder="0" className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm font-black focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Motivo / Categoria</label>
              <select className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none appearance-none">
                {type === 'transfer' ? (
                   <option>Carga de Van (Reposição)</option>
                ) : (
                  <>
                    <option>Compra de Fornecedor</option>
                    <option>Devolução de Técnico</option>
                    <option>Ajuste de Inventário</option>
                    <option>Avaria / Perda</option>
                  </>
                )}
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Observações / NF</label>
            <textarea rows={2} className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none resize-none" placeholder="Ex: Carga semanal para atendimento..." />
          </div>
        </div>
      </div>

      <div className="p-6 border-t border-gray-50 bg-gray-50/50 flex justify-end gap-3">
        <button onClick={onClose} className="px-6 py-3 text-sm font-bold text-gray-500">Cancelar</button>
        <button 
          onClick={() => onSave({})}
          className={`flex items-center gap-2 px-8 py-3 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl transition-all ${
            type === 'in' ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-100' : 
            type === 'out' ? 'bg-red-600 hover:bg-red-700 shadow-red-100' :
            'bg-blue-600 hover:bg-blue-700 shadow-blue-100'
          } text-white`}
        >
          {type === 'in' ? 'Confirmar Entrada' : 
           type === 'out' ? 'Confirmar Saída' : 
           'Confirmar Transferência'}
        </button>
      </div>
    </div>
  );
};

export default StockMovementForm;
