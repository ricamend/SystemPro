
import React from 'react';
import { 
  CreditCard, 
  CheckCircle, 
  Zap, 
  ShieldCheck, 
  History, 
  Download, 
  AlertCircle, 
  ExternalLink,
  Plus,
  ArrowLeft
} from 'lucide-react';

interface Props {
  onBack?: () => void;
}

const Billing: React.FC<Props> = ({ onBack }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-right-4 duration-500 pb-20">
      <div className="flex items-center gap-4">
        {onBack && (
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-xl transition-all">
            <ArrowLeft className="w-6 h-6 text-gray-400" />
          </button>
        )}
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold text-gray-800">Assinatura e Faturamento</h2>
          <p className="text-gray-500">Gerencie seu plano, pagamentos e limite de usuários.</p>
        </div>
      </div>

      {/* Current Plan Summary */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-blue-600 text-white relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
          <div className="relative z-10 space-y-1">
            <span className="text-[10px] font-black uppercase tracking-widest bg-white/20 px-2 py-0.5 rounded">Plano Atual</span>
            <h3 className="text-3xl font-black">ServiçoPro Pro</h3>
            <p className="text-blue-100 text-sm">Próximo faturamento em 12 de Maio, 2024 (R$ 197,00)</p>
          </div>
          <button className="relative z-10 bg-white text-blue-600 px-6 py-3 rounded-2xl font-bold text-sm hover:bg-blue-50 shadow-xl transition-all">
            Alterar Plano
          </button>
        </div>
        
        <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Usuários</p>
            <div className="flex items-end gap-2">
              <p className="text-2xl font-black text-gray-900">12 / 30</p>
              <div className="h-1.5 flex-1 bg-gray-100 rounded-full mb-2 overflow-hidden">
                <div className="h-full bg-blue-600" style={{ width: '40%' }}></div>
              </div>
            </div>
            <p className="text-xs text-gray-500">Mais 18 vagas disponíveis no seu plano.</p>
          </div>
          <div className="space-y-2">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Ordens de Serviço</p>
            <p className="text-2xl font-black text-gray-900">Ilimitadas</p>
            <p className="text-xs text-gray-500">Uso ilimitado habilitado.</p>
          </div>
          <div className="space-y-2">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Espaço em Nuvem</p>
            <div className="flex items-end gap-2">
              <p className="text-2xl font-black text-gray-900">8.4 GB</p>
              <span className="text-xs text-gray-400 mb-1.5">de 20 GB</span>
            </div>
            <p className="text-xs text-gray-500">Fotos e documentos anexados.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Payment Methods */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h4 className="font-bold text-gray-900 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-blue-600" />
                Métodos de Pagamento
              </h4>
              <button className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
                Adicionar <Plus className="w-3 h-3" />
              </button>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 rounded-2xl border border-blue-100 bg-blue-50/30">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-8 bg-white border border-gray-100 rounded-lg flex items-center justify-center font-bold text-[10px] text-gray-400 italic">VISA</div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">•••• •••• •••• 4592</p>
                    <p className="text-[10px] text-gray-500 font-medium">Expira em 12/28 • Principal</p>
                  </div>
                </div>
                <button className="text-[10px] font-bold text-blue-600 uppercase">Editar</button>
              </div>
            </div>
          </div>

          {/* Billing History */}
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 flex items-center gap-2 mb-6">
              <History className="w-5 h-5 text-gray-400" />
              Histórico de Cobranças
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b border-gray-50">
                    <th className="pb-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Data</th>
                    <th className="pb-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Valor</th>
                    <th className="pb-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                    <th className="pb-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {[
                    { date: '12 Abr, 2024', value: 'R$ 197,00', status: 'Pago' },
                    { date: '12 Mar, 2024', value: 'R$ 197,00', status: 'Pago' },
                    { date: '12 Fev, 2024', value: 'R$ 197,00', status: 'Pago' },
                  ].map((inv, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 font-medium text-gray-600">{inv.date}</td>
                      <td className="py-4 font-bold text-gray-900">{inv.value}</td>
                      <td className="py-4">
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-bold uppercase">{inv.status}</span>
                      </td>
                      <td className="py-4 text-right">
                        <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Upgrade Sidebar */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-indigo-600 to-blue-700 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-125 transition-transform duration-700"></div>
            <Zap className="w-10 h-10 mb-6 text-blue-200 fill-blue-200" />
            <h4 className="text-xl font-black mb-2 leading-tight">Precisa de mais poder?</h4>
            <p className="text-sm text-blue-100 mb-8 leading-relaxed">Assine o plano **Business** para ter marca própria, multi-filiais e acesso a API.</p>
            <button className="w-full bg-white text-indigo-600 py-4 rounded-2xl font-black text-sm shadow-xl hover:bg-blue-50 transition-all flex items-center justify-center gap-2">
              Upgrade para Business
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-amber-50 rounded-2xl text-amber-600">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h5 className="text-sm font-bold text-gray-900">Segurança Garantida</h5>
              <p className="text-[10px] text-gray-500 leading-relaxed mt-1">Seus pagamentos são processados de forma segura via Stripe. Não armazenamos seus dados sensíveis.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;
