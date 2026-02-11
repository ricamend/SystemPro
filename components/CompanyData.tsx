
import React, { useState } from 'react';
import { Building2, Mail, Phone, MapPin, Save, ArrowLeft, ShieldCheck, Globe, Loader2 } from 'lucide-react';

const CompanyData: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onBack();
    }, 1000);
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-xl transition-all">
          <ArrowLeft className="w-6 h-6 text-gray-400" />
        </button>
        <div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">Dados da Empresa</h2>
          <p className="text-gray-500 font-medium">Informações legais e de contato da sua organização.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Razão Social</label>
              <input type="text" defaultValue="ServiçoPro Soluções Hidráulicas LTDA" className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-inner" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">CNPJ</label>
              <input type="text" defaultValue="12.345.678/0001-90" className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Inscrição Estadual</label>
              <input type="text" defaultValue="ISENTO" className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
          </div>

          <div className="pt-8 border-t border-gray-50 space-y-6">
            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1 flex items-center gap-2">
              <MapPin className="w-3 h-3" /> Sede Principal
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2 md:col-span-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Endereço</label>
                <input type="text" defaultValue="Av. Paulista, 1000 - Bela Vista" className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Cidade / UF</label>
                <input type="text" defaultValue="São Paulo / SP" className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-50 space-y-6">
             <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1 flex items-center gap-2">
              <Mail className="w-3 h-3" /> Contato Público
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">E-mail de Suporte</label>
                <input type="email" defaultValue="contato@servicopro.com.br" className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Telefone Principal</label>
                <input type="text" defaultValue="(11) 98888-7777" className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 bg-gray-50/50 border-t border-gray-50 flex justify-end gap-4">
          <button type="button" onClick={onBack} className="px-8 py-4 text-sm font-bold text-gray-500">Descartar</button>
          <button disabled={loading} className="flex items-center gap-2 bg-blue-600 text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all disabled:opacity-50">
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            Salvar Alterações
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompanyData;
