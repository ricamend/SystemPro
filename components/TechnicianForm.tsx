
import React, { useState } from 'react';
import { 
  X, 
  Save, 
  User, 
  Briefcase, 
  Phone, 
  Mail, 
  Award,
  DollarSign
} from 'lucide-react';

interface Props {
  onClose: () => void;
  onSave: (data: any) => void;
  initialData?: any;
}

const TechnicianForm: React.FC<Props> = ({ onClose, onSave, initialData }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      onSave({ id: Date.now(), ...initialData });
      setLoading(false);
    }, 800);
  };

  return (
    <div className="bg-white rounded-[32px] border border-gray-100 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
      <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
        <div>
          <h3 className="text-xl font-black text-gray-900 tracking-tight">
            {initialData ? 'Editar Técnico' : 'Novo Técnico'}
          </h3>
          <p className="text-xs text-gray-500 font-medium">Cadastre membros da sua equipe de campo.</p>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-white rounded-full transition-colors text-gray-400 hover:text-gray-600">
          <X className="w-6 h-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
        {/* Dados Pessoais */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-blue-600">
            <User className="w-4 h-4" />
            <h4 className="text-xs font-black uppercase tracking-widest">Dados do Colaborador</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Nome Completo</label>
              <input 
                type="text" 
                placeholder="Ex: Carlos Alberto Lima"
                className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">E-mail de Acesso</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                <input 
                  type="email" 
                  placeholder="carlos@empresa.com"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Telefone / Celular</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                <input 
                  type="tel" 
                  placeholder="(00) 00000-0000"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Profissional */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-blue-600">
            <Briefcase className="w-4 h-4" />
            <h4 className="text-xs font-black uppercase tracking-widest">Informações Profissionais</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Especialidade Principal</label>
              <div className="relative">
                <Award className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                <input 
                  type="text" 
                  placeholder="Ex: Hidráulica / Elétrica"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Nível de Acesso</label>
              <select className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none">
                <option value="tech">Apenas App Mobile</option>
                <option value="admin">Admin da Empresa</option>
              </select>
            </div>
          </div>
        </div>

        {/* Comissões */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-blue-600">
            <DollarSign className="w-4 h-4" />
            <h4 className="text-xs font-black uppercase tracking-widest">Financeiro / Comissões</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Tipo de Comissão</label>
              <select className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none">
                <option>Percentual (%) sobre serviço</option>
                <option>Valor Fixo (R$) por OS</option>
                <option>Sem Comissão (Salarista)</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Valor / Percentual</label>
              <input 
                type="text" 
                placeholder="Ex: 15.00"
                className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
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
          Salvar Técnico
        </button>
      </div>
    </div>
  );
};

export default TechnicianForm;
