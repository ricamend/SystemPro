
import React, { useState } from 'react';
import { 
  X, 
  Save, 
  MapPin, 
  Phone, 
  Mail, 
  CreditCard,
  Building2,
  Navigation,
  Loader2,
  ShieldCheck
} from 'lucide-react';

interface Props {
  onClose: () => void;
  onSave: (data: any) => void;
  initialData?: any;
}

const CustomerForm: React.FC<Props> = ({ onClose, onSave, initialData }) => {
  const [loading, setLoading] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [lat, setLat] = useState(initialData?.latitude || '');
  const [lng, setLng] = useState(initialData?.longitude || '');

  const handleCaptureLocation = () => {
    setIsCapturing(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLat(position.coords.latitude.toString());
        setLng(position.coords.longitude.toString());
        setIsCapturing(false);
      }, (error) => {
        console.error("Erro ao capturar localização:", error);
        alert("Não foi possível obter a localização. Verifique as permissões do navegador.");
        setIsCapturing(false);
      });
    } else {
      alert("Geolocalização não é suportada por este navegador.");
      setIsCapturing(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      onSave({ 
        id: Date.now(), 
        ...initialData,
        latitude: lat ? parseFloat(lat) : null,
        longitude: lng ? parseFloat(lng) : null
      });
      setLoading(false);
    }, 800);
  };

  return (
    <div className="bg-white rounded-[32px] border border-gray-100 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
      <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
        <div>
          <h3 className="text-xl font-black text-gray-900 tracking-tight">
            {initialData ? 'Editar Cliente' : 'Novo Cliente'}
          </h3>
          <div className="flex items-center gap-1.5 mt-0.5">
             <ShieldCheck className="w-3 h-3 text-emerald-500" />
             <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Audit Trail Ativo</p>
          </div>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-white rounded-full transition-colors text-gray-400 hover:text-gray-600">
          <X className="w-6 h-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
        {/* Identificação */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-blue-600">
            <Building2 className="w-4 h-4" />
            <h4 className="text-xs font-black uppercase tracking-widest">Identificação</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Nome Completo / Razão Social</label>
              <input 
                type="text" 
                placeholder="Ex: Mercado Central LTDA"
                className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-inner"
                required
                defaultValue={initialData?.name}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">CPF / CNPJ</label>
              <input 
                type="text" 
                placeholder="00.000.000/0000-00"
                className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                defaultValue={initialData?.document}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Tipo de Cliente</label>
              <select className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none">
                <option>Pessoa Jurídica</option>
                <option>Pessoa Física</option>
                <option>Condomínio</option>
              </select>
            </div>
          </div>
        </div>

        {/* Endereço e Geolocalização */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-blue-600">
              <MapPin className="w-4 h-4" />
              <h4 className="text-xs font-black uppercase tracking-widest">Endereço e GPS</h4>
            </div>
            <button 
              type="button"
              onClick={handleCaptureLocation}
              disabled={isCapturing}
              className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-blue-100 transition-all disabled:opacity-50"
            >
              {isCapturing ? <Loader2 className="w-3 h-3 animate-spin" /> : <Navigation className="w-3 h-3" />}
              Capturar GPS Atual
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">CEP</label>
              <input type="text" placeholder="00000-000" className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
            </div>
            <div className="space-y-1.5 md:col-span-4">
              <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Logradouro</label>
              <input type="text" placeholder="Rua, Avenida, etc" className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
            </div>
            <div className="space-y-1.5 md:col-span-3">
              <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Latitude</label>
              <input 
                type="number" 
                step="any"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
                placeholder="-23.5505" 
                className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
              />
            </div>
            <div className="space-y-1.5 md:col-span-3">
              <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Longitude</label>
              <input 
                type="number" 
                step="any"
                value={lng}
                onChange={(e) => setLng(e.target.value)}
                placeholder="-46.6333" 
                className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
              />
            </div>
          </div>
        </div>

        {/* Contato */}
        <div className="space-y-4 pt-4 border-t border-gray-50">
          <div className="flex items-center gap-2 text-blue-600">
            <Mail className="w-4 h-4" />
            <h4 className="text-xs font-black uppercase tracking-widest">Contato Principal</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                <input 
                  type="email" 
                  placeholder="exemplo@email.com"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  defaultValue={initialData?.email}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Telefone / WhatsApp</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                <input 
                  type="tel" 
                  placeholder="(00) 00000-0000"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  defaultValue={initialData?.phone}
                />
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
          className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-2xl font-black text-sm shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all active:scale-[0.98] disabled:opacity-50"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <Save className="w-4 h-4" />
          )}
          Salvar Cliente
        </button>
      </div>
    </div>
  );
};

export default CustomerForm;
