
import React, { useState } from 'react';
import { 
  X, 
  Save, 
  Box, 
  Tag, 
  User, 
  QrCode, 
  Calendar,
  Building2,
  Settings2,
  Loader2
} from 'lucide-react';

interface Props {
  onClose: () => void;
  onSave: (data: any) => void;
  initialData?: any;
}

const AssetForm: React.FC<Props> = ({ onClose, onSave, initialData }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    model: initialData?.model || '',
    serial: initialData?.serial || '',
    customer: initialData?.customer || '',
    nextService: initialData?.nextService || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      onSave(formData);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="bg-white rounded-[40px] border border-gray-100 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
      <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-blue-600 rounded-3xl text-white shadow-lg">
            <Box className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black text-gray-900 tracking-tight">
              {initialData ? 'Editar Equipamento' : 'Novo Ativo Técnico'}
            </h3>
            <p className="text-xs text-gray-500 font-medium">Digitalize seus ativos para monitoramento de telemetria.</p>
          </div>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-white rounded-full transition-colors text-gray-400">
          <X className="w-6 h-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Nome do Ativo</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Ex: Elevador Atlas 01" 
                className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-inner"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Modelo</label>
                <input 
                  type="text" 
                  value={formData.model}
                  onChange={(e) => setFormData({...formData, model: e.target.value})}
                  placeholder="Gen2 Comfort" 
                  className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Nº de Série</label>
                <div className="relative">
                  <QrCode className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                  <input 
                    type="text" 
                    value={formData.serial}
                    onChange={(e) => setFormData({...formData, serial: e.target.value})}
                    placeholder="S/N: 0000" 
                    className="w-full pl-11 pr-4 py-4 bg-gray-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Cliente / Localização</label>
              <div className="relative">
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                <select 
                  value={formData.customer}
                  onChange={(e) => setFormData({...formData, customer: e.target.value})}
                  className="w-full pl-11 pr-4 py-4 bg-gray-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none appearance-none cursor-pointer"
                  required
                >
                  <option value="">Selecione o Cliente...</option>
                  <option value="Condomínio Solar">Condomínio Solar</option>
                  <option value="Hospital Santa Maria">Hospital Santa Maria</option>
                  <option value="Escola Dom Bosco">Escola Dom Bosco</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Próxima Revisão Prevista</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                <input 
                  type="date" 
                  value={formData.nextService}
                  onChange={(e) => setFormData({...formData, nextService: e.target.value})}
                  className="w-full pl-11 pr-4 py-4 bg-gray-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 bg-blue-50 rounded-[32px] border border-blue-100 flex items-center gap-4">
           <Settings2 className="w-8 h-8 text-blue-600" />
           <p className="text-xs text-blue-800 font-medium leading-relaxed">
             Ativos com <b>Nº de Série</b> cadastrado permitem o uso de QR Codes para check-in rápido pelo técnico no local.
           </p>
        </div>
      </form>

      <div className="p-8 border-t border-gray-50 bg-gray-50/50 flex items-center justify-end gap-4">
        <button type="button" onClick={onClose} className="px-8 py-4 text-sm font-bold text-gray-500 hover:text-gray-700 transition-colors">Cancelar</button>
        <button 
          onClick={handleSubmit}
          disabled={loading}
          className="flex items-center gap-2 bg-blue-600 text-white px-10 py-4 rounded-2xl font-black text-sm shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all active:scale-[0.98] disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          {initialData ? 'Salvar Alterações' : 'Cadastrar Ativo'}
        </button>
      </div>
    </div>
  );
};

export default AssetForm;
