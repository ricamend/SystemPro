
import React, { useState } from 'react';
import { 
  X, 
  Plus, 
  Trash2, 
  Package, 
  Save, 
  Search,
  CheckCircle,
  Printer,
  Loader2,
  ChevronRight,
  ShieldCheck,
  Hammer,
  Wrench,
  Boxes
} from 'lucide-react';
import { jsPDF } from 'jspdf';

interface LoadItem {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  unit: string;
  price: number;
  category: 'material' | 'tool';
}

interface Props {
  technician: { id: string; name: string };
  onClose: () => void;
  onSave: (data: any) => void;
}

const DailyLoadForm: React.FC<Props> = ({ technician, onClose, onSave }) => {
  const [items, setItems] = useState<LoadItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'material' | 'tool'>('material');

  // Catálogo simulado do Estoque Central com Preços para cálculo de Cautela
  const centralInventory = [
    { id: 'm1', name: 'Válvula Esfera 3/4', sku: 'HID-VAL-001', unit: 'un', stock: 150, price: 45.00, category: 'material' },
    { id: 'm2', name: 'Cabo Flexível 2.5mm', sku: 'ELE-CAB-025', unit: 'm', stock: 500, price: 3.50, category: 'material' },
    { id: 'm3', name: 'Fita Isolante 20m', sku: 'ELE-FIT-020', unit: 'rl', stock: 40, price: 12.00, category: 'material' },
    { id: 't1', name: 'Parafusadeira Makita 18V', sku: 'FER-MAK-001', unit: 'un', stock: 12, price: 1200.00, category: 'tool' },
    { id: 't2', name: 'Multímetro Fluke 115', sku: 'FER-FLU-115', unit: 'un', stock: 5, price: 2100.00, category: 'tool' },
    { id: 't3', name: 'Escada Articulada 4x4', sku: 'FER-ESC-4X4', unit: 'un', stock: 8, price: 850.00, category: 'tool' },
  ];

  const filteredCatalog = centralInventory.filter(p => 
    p.category === activeTab && 
    (p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.sku.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const addItem = (product: any) => {
    if (items.find(i => i.id === product.id)) return;
    setItems([...items, { ...product, quantity: 1 }]);
    setSearchTerm('');
  };

  const removeItem = (id: string) => {
    setItems(items.filter(i => i.id !== id));
  };

  const updateQty = (id: string, qty: number) => {
    const val = isNaN(qty) ? 0 : qty;
    // Validação de estoque máximo
    const original = centralInventory.find(p => p.id === id);
    const safeQty = original ? Math.min(Math.max(0, val), original.stock) : Math.max(0, val);
    
    setItems(items.map(i => i.id === id ? { ...i, quantity: safeQty } : i));
  };

  const totalLoadValue = items.reduce((acc, i) => acc + (i.quantity * i.price), 0);

  const handleFinalize = async () => {
    if (items.length === 0) return;
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
    onSave({ technicianId: technician.id, items, totalValue: totalLoadValue });
  };

  const generateReceipt = () => {
    const doc = new jsPDF();
    doc.setFillColor(15, 23, 42);
    doc.rect(0, 0, 210, 45, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.text("Ordem de Abastecimento", 20, 28);
    
    doc.setTextColor(31, 41, 55);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`TÉCNICO RECEPTOR: ${technician.name.toUpperCase()}`, 20, 55);
    doc.text(`DATA DA OPERAÇÃO: ${new Date().toLocaleString('pt-BR')}`, 20, 60);
    
    doc.setDrawColor(229, 231, 235);
    doc.line(20, 70, 190, 70);
    
    let y = 80;
    doc.setFont("helvetica", "bold");
    doc.text("QUANTIDADE", 20, y);
    doc.text("DESCRIÇÃO DO MATERIAL / ATIVO", 50, y);
    doc.text("VALOR ESTIMADO", 160, y);
    
    doc.setFont("helvetica", "normal");
    y += 10;
    items.forEach(item => {
      doc.text(`${item.quantity} ${item.unit}`, 20, y);
      doc.text(item.name, 50, y);
      doc.text(`R$ ${(item.quantity * item.price).toFixed(2)}`, 160, y);
      y += 8;
    });

    y += 15;
    doc.setFont("helvetica", "bold");
    doc.text(`VALOR TOTAL DA CARGA: R$ ${totalLoadValue.toFixed(2)}`, 160, y, { align: 'right' });

    y = 250;
    doc.setFontSize(8);
    doc.text("A assinatura abaixo confirma que todos os itens foram conferidos e recebidos em perfeito estado.", 20, y);
    doc.line(20, y + 15, 100, y + 15);
    doc.text("Visto de Entrega (Almoxarifado)", 20, y + 20);
    doc.line(110, y + 15, 190, y + 15);
    doc.text("Visto de Recebimento (Técnico)", 110, y + 20);
    
    doc.save(`Recibo_Carga_${technician.name.replace(' ', '_')}.pdf`);
  };

  return (
    <div className="bg-white rounded-[48px] shadow-[0_32px_80px_rgba(0,0,0,0.25)] border border-gray-100 overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
      <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
        <div className="flex items-center gap-5">
          <div className="p-4 bg-gray-900 rounded-[24px] text-white shadow-xl">
            <Boxes className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-gray-900 tracking-tight">Abastecer Unidade</h3>
            <p className="text-xs text-gray-500 font-medium tracking-tight">Destino: <span className="text-blue-600 font-bold">{technician.name}</span></p>
          </div>
        </div>
        <button onClick={onClose} className="p-2.5 hover:bg-white rounded-full text-gray-400 transition-all active:scale-90">
          <X className="w-7 h-7" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">1. Catálogo do Almoxarifado</label>
            <div className="flex bg-gray-100 p-1 rounded-[16px] shadow-inner">
              <button 
                onClick={() => { setActiveTab('material'); setSearchTerm(''); }}
                className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'material' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400'}`}
              >
                Insumos
              </button>
              <button 
                onClick={() => { setActiveTab('tool'); setSearchTerm(''); }}
                className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'tool' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400'}`}
              >
                Ferramental
              </button>
            </div>
          </div>
          
          <div className="relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={activeTab === 'material' ? "Buscar peças no estoque central..." : "Buscar ferramentas disponíveis..."}
              className="w-full pl-16 pr-6 py-5 bg-gray-50 border-none rounded-[28px] text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-inner"
            />
            {searchTerm && (
              <div className="absolute top-full left-0 w-full mt-3 bg-white border border-gray-100 rounded-[32px] shadow-2xl z-20 overflow-hidden max-h-64 overflow-y-auto animate-in slide-in-from-top-2">
                {filteredCatalog.length > 0 ? filteredCatalog.map(p => (
                  <button 
                    key={p.id}
                    onClick={() => addItem(p)}
                    className="w-full flex items-center justify-between p-5 hover:bg-blue-50 text-left transition-colors border-b border-gray-50 last:border-0 group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-white transition-all shadow-inner">
                        {p.category === 'tool' ? <Hammer className="w-5 h-5" /> : <Package className="w-5 h-5" />}
                      </div>
                      <div>
                        <p className="text-sm font-black text-gray-900 group-hover:text-blue-600 transition-colors">{p.name}</p>
                        <p className="text-[10px] text-gray-400 font-mono">Disponível no CD: <span className="text-gray-600 font-black">{p.stock} {p.unit}</span></p>
                      </div>
                    </div>
                    <Plus className="w-5 h-5 text-blue-600" />
                  </button>
                )) : (
                  <div className="p-10 text-center text-gray-400 font-bold text-xs uppercase tracking-widest">Nenhum item encontrado</div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-5">
          <div className="flex items-center justify-between px-1">
            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">2. Itens do Abastecimento ({items.length})</h4>
            {items.length > 0 && (
              <button onClick={() => setItems([])} className="text-[9px] font-black text-red-500 uppercase hover:underline">Limpar Guia</button>
            )}
          </div>
          
          {items.length > 0 ? (
            <div className="space-y-3">
              {items.map(item => (
                <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-white border border-gray-100 rounded-[32px] group hover:border-blue-200 hover:shadow-xl transition-all animate-in slide-in-from-right-4">
                  <div className="flex items-center gap-5 mb-4 sm:mb-0">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner border border-gray-50 transition-all ${item.category === 'tool' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'}`}>
                      {item.category === 'tool' ? <Wrench className="w-7 h-7" /> : <Package className="w-7 h-7" />}
                    </div>
                    <div>
                      <p className="text-sm font-black text-gray-900 leading-tight">{item.name}</p>
                      <p className="text-[10px] text-gray-400 font-black uppercase mt-1 tracking-widest">Preço: R$ {item.price.toFixed(2)} / {item.unit}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between sm:justify-end gap-6">
                    <div className="flex items-center bg-gray-50 rounded-[20px] p-2 border border-gray-100 shadow-inner">
                       <button 
                        onClick={() => updateQty(item.id, item.quantity - 1)} 
                        className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-white rounded-xl transition-all font-black text-xl active:scale-90"
                       >
                         -
                       </button>
                       <div className="flex flex-col items-center min-w-[70px]">
                          <input 
                            type="number" 
                            value={item.quantity} 
                            onChange={(e) => updateQty(item.id, parseFloat(e.target.value))}
                            className="w-full bg-transparent text-center text-base font-black text-gray-900 outline-none" 
                          />
                          <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">{item.unit}</span>
                       </div>
                       <button 
                        onClick={() => updateQty(item.id, item.quantity + 1)} 
                        className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-white rounded-xl transition-all font-black text-xl active:scale-90"
                       >
                         +
                       </button>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="p-3 text-gray-300 hover:text-red-500 transition-all active:scale-90">
                      <Trash2 className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-24 border-2 border-dashed border-gray-100 rounded-[48px] flex flex-col items-center justify-center text-gray-400 gap-4 bg-gray-50/30">
               <Boxes className="w-16 h-16 opacity-10" />
               <p className="text-xs font-black uppercase tracking-[0.2em]">Aguardando seleção de materiais</p>
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-8 bg-gray-900 rounded-[40px] text-white flex gap-6 items-center shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:scale-125 transition-transform duration-700"></div>
            <ShieldCheck className="w-12 h-12 text-emerald-400 shrink-0" />
            <div className="flex-1">
              <h5 className="text-sm font-black uppercase tracking-widest mb-1">Cautela de Carga</h5>
              <p className="text-[11px] text-gray-400 leading-relaxed font-medium">
                Você está adicionando <b>R$ {totalLoadValue.toFixed(2)}</b> em valor patrimonial à unidade técnica de <b>{technician.name}</b>.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="p-8 border-t border-gray-50 bg-gray-50/50 flex flex-col sm:flex-row gap-4">
        <button 
          onClick={generateReceipt}
          disabled={items.length === 0}
          className="flex-1 flex items-center justify-center gap-3 bg-white border border-gray-200 py-5 rounded-[24px] text-[10px] font-black uppercase tracking-widest text-gray-600 hover:bg-gray-50 transition-all disabled:opacity-50 active:scale-95 shadow-sm"
        >
          <Printer className="w-5 h-5" /> Imprimir Guia
        </button>
        <button 
          onClick={handleFinalize}
          disabled={loading || items.length === 0}
          className="flex-[2] flex items-center justify-center gap-3 bg-blue-600 text-white py-5 rounded-[24px] font-black text-sm uppercase tracking-widest shadow-2xl shadow-blue-200 hover:bg-blue-700 transition-all active:scale-[0.98] disabled:opacity-50 group"
        >
          {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <CheckCircle className="w-6 h-6" />}
          {loading ? 'Validando Saldo...' : 'Confirmar e Transferir Custódia'}
          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default DailyLoadForm;
