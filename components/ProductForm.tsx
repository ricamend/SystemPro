
import React, { useState, useEffect } from 'react';
import { X, Save, Package, Tag, DollarSign, Layers, AlertTriangle, Loader2 } from 'lucide-react';

interface Props {
  onClose: () => void;
  onSave: (data: any) => void;
  initialData?: any;
}

const ProductForm: React.FC<Props> = ({ onClose, onSave, initialData }) => {
  const [loading, setLoading] = useState(false);
  
  // Estados vinculados ao formulário
  const [name, setName] = useState(initialData?.name || '');
  const [sku, setSku] = useState(initialData?.sku || '');
  const [category, setCategory] = useState(initialData?.category || 'Hidráulica');
  const [cost, setCost] = useState(initialData?.cost || 0);
  const [price, setPrice] = useState(initialData?.price || 0);
  const [stock, setStock] = useState(initialData?.stock || 0);
  const [minStock, setMinStock] = useState(initialData?.minStock || 5);

  const margin = price > 0 ? (((price - cost) / price) * 100).toFixed(1) : '0.0';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const payload = {
      name,
      sku,
      category,
      cost: parseFloat(cost.toString()),
      price: parseFloat(price.toString()),
      stock: parseInt(stock.toString()),
      minStock: parseInt(minStock.toString())
    };

    setTimeout(() => {
      onSave(payload);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="bg-white rounded-[32px] border border-gray-100 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 max-w-2xl mx-auto">
      <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-xl text-white shadow-lg">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-black text-gray-900 tracking-tight">
              {initialData ? 'Editar Produto' : 'Novo Produto/Peça'}
            </h3>
            <p className="text-xs text-gray-500 font-medium">Cadastre itens para controle de estoque e venda.</p>
          </div>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-white rounded-full transition-colors text-gray-400">
          <X className="w-6 h-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Nome do Produto</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Válvula de Retenção 1/2" 
              className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-inner" 
              required 
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">SKU / Código</label>
            <input 
              type="text" 
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              placeholder="HID-VAL-002" 
              className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Categoria</label>
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none appearance-none"
            >
              <option value="Hidráulica">Hidráulica</option>
              <option value="Elétrica">Elétrica</option>
              <option value="Climatização">Climatização</option>
              <option value="Refrigeração">Refrigeração</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-gray-50 rounded-[24px] border border-gray-100">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Preço de Custo</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-300" />
              <input 
                type="number" 
                step="0.01"
                value={cost}
                onChange={(e) => setCost(parseFloat(e.target.value))}
                placeholder="0.00" 
                className="w-full pl-8 pr-4 py-2.5 bg-white border border-gray-100 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500 shadow-sm" 
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Preço de Venda</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-blue-600" />
              <input 
                type="number" 
                step="0.01"
                value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value))}
                placeholder="0.00" 
                className="w-full pl-8 pr-4 py-2.5 bg-white border border-gray-100 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500 text-blue-600 shadow-sm" 
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Margem Bruta</label>
            <div className={`w-full px-4 py-2.5 border rounded-xl text-sm font-black flex items-center justify-center transition-colors ${parseFloat(margin) > 30 ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-blue-50 border-blue-100 text-blue-700'}`}>
              {margin}%
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Estoque Atual</label>
            <input 
              type="number" 
              value={stock}
              onChange={(e) => setStock(parseInt(e.target.value))}
              placeholder="0" 
              className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none" 
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Alerta de Estoque Mínimo</label>
            <div className="relative">
              <AlertTriangle className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-500" />
              <input 
                type="number" 
                value={minStock}
                onChange={(e) => setMinStock(parseInt(e.target.value))}
                placeholder="5" 
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none" 
              />
            </div>
          </div>
        </div>
      </form>

      <div className="p-6 border-t border-gray-50 bg-gray-50/50 flex justify-end gap-3">
        <button type="button" onClick={onClose} className="px-6 py-3 text-sm font-bold text-gray-500 hover:text-gray-700 transition-colors">Descartar</button>
        <button 
          onClick={handleSubmit}
          disabled={loading}
          className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-2xl font-black text-sm shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all active:scale-[0.98] disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {initialData ? 'Salvar Alterações' : 'Cadastrar Produto'}
        </button>
      </div>
    </div>
  );
};

export default ProductForm;
