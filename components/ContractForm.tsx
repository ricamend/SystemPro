
import React, { useState } from 'react';
import { 
  X, 
  Save, 
  ShieldCheck, 
  User, 
  Calendar as CalendarIcon, 
  DollarSign, 
  FileText,
  Clock,
  ChevronDown
} from 'lucide-react';

interface Props {
  onClose: () => void;
  onSave: (data: any) => void;
}

const ContractForm: React.FC<Props> = ({ onClose, onSave }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      onSave({ id: Date.now() });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="bg-white rounded-[32px] border border-gray-100 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
      <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-xl text-white shadow-lg">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-black text-gray-900 tracking-tight">Novo Contrato</h3>
            <p className="text-xs text-gray-500 font-medium">Configure a recorrência e os SLAs do atendimento.</p>
          </div>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-white rounded-full transition-colors text-gray-400 hover:text-gray-600">
          <X className="w-6 h-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
        {/* Identificação do Contrato */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-blue-600">
            <User className="w-4 h-4" />
            <h4 className="text-xs font-black uppercase tracking-widest">Cliente e Serviço</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Selecionar Cliente</label>
              <div className="relative">
                <select className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none appearance-none" required>
                  <option value="">Selecione um cliente...</option>
                  <option value="1">Condomínio Solar</option>
                  <option value="2">Hospital Santa Maria</option>
                  <option value="3">Escola Dom Bosco</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Tipo de Manutenção</label>
              <select className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none appearance-none" required>
                <option value="mensal">Manutenção Mensal</option>
                <option value="preventiva">Preventiva Semestral</option>
                <option value="sla">SLA Crítico (24/7)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Financeiro e Vigência */}
        <div className="space-y-4 pt-4 border-t border-gray-50">
          <div className="flex items-center gap-2 text-blue-600">
            <DollarSign className="w-4 h-4" />
            <h4 className="text-xs font-black uppercase tracking-widest">Financeiro e Vigência</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Mensalidade (R$)</label>
              <div className="relative">
                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                <input type="number" placeholder="0,00" className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none transition-all" required />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Data de Início</label>
              <input type="date" className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none transition-all" required />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Data de Término</label>
              <input type="date" className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none transition-all" required />
            </div>
          </div>
        </div>

        {/* SLAs e Termos */}
        <div className="space-y-4 pt-4 border-t border-gray-50">
          <div className="flex items-center gap-2 text-blue-600">
            <Clock className="w-4 h-4" />
            <h4 className="text-xs font-black uppercase tracking-widest">SLA e Notas Técnicas</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Tempo de Resposta (SLA)</label>
              <select className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none appearance-none">
                <option>4 Horas (Crítico)</option>
                <option>12 Horas (Padrão)</option>
                <option>24 Horas (Normal)</option>
                <option>48 Horas (Baixo)</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Dia do Faturamento</label>
              <input type="number" min="1" max="31" placeholder="Ex: 05" className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Observações do Contrato</label>
            <textarea rows={3} placeholder="Descreva cláusulas específicas ou escopo detalhado..." className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none shadow-inner" />
          </div>
        </div>

        {/* Faturamento Automático Toggle */}
        <div className="p-5 bg-blue-50 rounded-[28px] border border-blue-100 flex items-center justify-between">
           <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-600 rounded-2xl text-white shadow-lg"><FileText className="w-5 h-5" /></div>
              <div>
                 <p className="text-sm font-black text-blue-900">Faturamento Automático</p>
                 <p className="text-[10px] text-blue-700 font-bold uppercase tracking-tight">Gerar notas fiscais e boletos mensalmente</p>
              </div>
           </div>
           <div className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
           </div>
        </div>
      </form>

      <div className="p-6 border-t border-gray-50 bg-gray-50/50 flex items-center justify-end gap-3">
        <button type="button" onClick={onClose} className="px-6 py-3 text-sm font-bold text-gray-500 hover:text-gray-700">Descartar</button>
        <button 
          onClick={handleSubmit}
          disabled={loading}
          className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-2xl font-black text-sm shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all hover:scale-[1.02] disabled:opacity-50"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <Save className="w-4 h-4" />
          )}
          Criar Contrato Recorrente
        </button>
      </div>
    </div>
  );
};

export default ContractForm;
