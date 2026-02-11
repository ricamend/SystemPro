
import React, { useState } from 'react';
import { 
  X, 
  Plus, 
  Trash2, 
  DollarSign, 
  Save, 
  FileText,
  Calculator,
  Percent,
  ChevronDown
} from 'lucide-react';

interface QuoteItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

interface Props {
  onClose: () => void;
  onSave: (data: any) => void;
  osId?: string;
}

const QuoteForm: React.FC<Props> = ({ onClose, onSave, osId }) => {
  const [items, setItems] = useState<QuoteItem[]>([
    { id: '1', description: '', quantity: 1, unitPrice: 0 }
  ]);
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(false);

  const addItem = () => {
    setItems([...items, { id: Date.now().toString(), description: '', quantity: 1, unitPrice: 0 }]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter(i => i.id !== id));
  };

  const updateItem = (id: string, field: keyof QuoteItem, value: any) => {
    setItems(items.map(i => i.id === id ? { ...i, [field]: value } : i));
  };

  const subtotal = items.reduce((acc, i) => acc + (i.quantity * i.unitPrice), 0);
  const total = subtotal - discount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      onSave({ items, discount, total });
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="bg-white rounded-[32px] border border-gray-100 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 max-w-3xl mx-auto">
      <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-600 p-2 rounded-xl">
            <Calculator className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-black text-gray-900 tracking-tight">Novo Orçamento</h3>
            <p className="text-xs text-gray-500 font-medium">Gere uma proposta financeira para aprovação do cliente.</p>
          </div>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-white rounded-full transition-colors text-gray-400">
          <X className="w-6 h-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Vincular a OS</label>
            <div className="relative">
              <select className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none appearance-none">
                <option>{osId ? `#${osId} - Manutenção Elevador` : 'Selecione uma OS...'}</option>
                <option>#5492 - Instalação Elétrica</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Validade da Proposta</label>
            <input type="date" className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center px-1">
            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Itens do Orçamento</h4>
            <button 
              type="button" 
              onClick={addItem}
              className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:underline"
            >
              <Plus className="w-3.5 h-3.5" /> Adicionar Item
            </button>
          </div>

          <div className="space-y-3">
            {items.map((item, idx) => (
              <div key={item.id} className="grid grid-cols-12 gap-3 items-end p-4 bg-gray-50/50 rounded-2xl border border-gray-100 group">
                <div className="col-span-12 md:col-span-6 space-y-1.5">
                  <label className="text-[9px] font-bold text-gray-400 uppercase ml-1">Descrição</label>
                  <input 
                    type="text" 
                    placeholder="Ex: Válvula de Pressão 3/4"
                    value={item.description}
                    onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                    className="w-full px-3 py-2.5 bg-white border border-gray-100 rounded-xl text-xs font-medium focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div className="col-span-4 md:col-span-2 space-y-1.5">
                  <label className="text-[9px] font-bold text-gray-400 uppercase ml-1">Qtd</label>
                  <input 
                    type="number" 
                    value={item.quantity}
                    onChange={(e) => updateItem(item.id, 'quantity', Number(e.target.value))}
                    className="w-full px-3 py-2.5 bg-white border border-gray-100 rounded-xl text-xs font-medium focus:ring-2 focus:ring-blue-500 outline-none text-center"
                  />
                </div>
                <div className="col-span-6 md:col-span-3 space-y-1.5">
                  <label className="text-[9px] font-bold text-gray-400 uppercase ml-1">Preço Unit. (R$)</label>
                  <input 
                    type="number" 
                    value={item.unitPrice}
                    onChange={(e) => updateItem(item.id, 'unitPrice', Number(e.target.value))}
                    className="w-full px-3 py-2.5 bg-white border border-gray-100 rounded-xl text-xs font-medium focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div className="col-span-2 md:col-span-1 pb-1 flex justify-center">
                  <button 
                    type="button" 
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4 pt-6 border-t border-gray-50">
          <div className="flex flex-col md:flex-row justify-between gap-6">
            <div className="max-w-xs w-full space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Desconto Manual (R$)</label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                  <input 
                    type="number" 
                    value={discount}
                    onChange={(e) => setDiscount(Number(e.target.value))}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Observações do Orçamento</label>
                <textarea rows={2} className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-xs font-medium focus:ring-2 focus:ring-blue-500 outline-none resize-none" placeholder="Ex: Pagamento facilitado em 3x..." />
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-[24px] min-w-[280px] space-y-4">
              <div className="flex justify-between text-xs font-medium text-gray-500">
                <span>Subtotal</span>
                <span>R$ {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs font-medium text-red-500">
                <span>Desconto</span>
                <span>- R$ {discount.toFixed(2)}</span>
              </div>
              <div className="pt-4 border-t border-gray-200 flex justify-between items-center">
                <span className="text-sm font-black text-gray-900 uppercase">Total Geral</span>
                <span className="text-2xl font-black text-blue-600">R$ {total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </form>

      <div className="p-6 border-t border-gray-50 bg-gray-50/50 flex items-center justify-end gap-3">
        <button type="button" onClick={onClose} className="px-6 py-3 text-sm font-bold text-gray-500 hover:text-gray-700 transition-colors">Cancelar</button>
        <button 
          onClick={handleSubmit}
          disabled={loading}
          className="flex items-center gap-2 bg-emerald-600 text-white px-8 py-4 rounded-2xl font-black text-sm shadow-xl shadow-emerald-100 hover:bg-emerald-700 transition-all active:scale-[0.98] disabled:opacity-50"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <Save className="w-4 h-4" />
          )}
          Gerar Orçamento
        </button>
      </div>
    </div>
  );
};

export default QuoteForm;
