
import React, { useState } from 'react';
import { Shield, Lock, Smartphone, History, ArrowLeft, Key, CheckCircle, ChevronRight, AlertCircle } from 'lucide-react';

const SecuritySettings: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [twoFactor, setTwoFactor] = useState(false);

  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-xl transition-all">
          <ArrowLeft className="w-6 h-6 text-gray-400" />
        </button>
        <div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">Segurança</h2>
          <p className="text-gray-500 font-medium">Proteja o acesso à sua empresa e dados sensíveis.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
           {/* Alterar Senha */}
           <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-8">
              <div className="flex items-center gap-3">
                 <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600"><Lock className="w-5 h-5" /></div>
                 <h3 className="text-lg font-black text-gray-900 tracking-tight">Alterar Senha</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Senha Atual</label>
                    <input type="password" placeholder="••••••••" className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl text-sm font-bold outline-none" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Nova Senha</label>
                    <input type="password" placeholder="••••••••" className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl text-sm font-bold outline-none" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Confirmar Senha</label>
                    <input type="password" placeholder="••••••••" className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl text-sm font-bold outline-none" />
                 </div>
              </div>
              <div className="flex justify-end pt-4">
                 <button className="px-8 py-4 bg-gray-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-black transition-all">Atualizar Senha</button>
              </div>
           </div>

           {/* 2FA */}
           <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-5">
                 <div className="p-3 bg-amber-50 rounded-2xl text-amber-600 shadow-sm"><Smartphone className="w-6 h-6" /></div>
                 <div>
                    <h3 className="text-lg font-black text-gray-900 tracking-tight">Autenticação de Dois Fatores (2FA)</h3>
                    <p className="text-xs text-gray-500 font-medium">Adicione uma camada extra de proteção ao entrar.</p>
                 </div>
              </div>
              <div className="relative inline-flex items-center cursor-pointer">
                 <input type="checkbox" className="sr-only peer" checked={twoFactor} onChange={() => setTwoFactor(!twoFactor)} />
                 <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
              </div>
           </div>
        </div>

        <div className="space-y-6">
           <div className="bg-gray-900 p-8 rounded-[40px] text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-110 transition-transform"></div>
              <div className="flex items-center gap-3 mb-6">
                 <History className="w-5 h-5 text-blue-400" />
                 <h4 className="text-[10px] font-black uppercase tracking-widest">Logs de Acesso</h4>
              </div>
              <div className="space-y-4">
                 {[
                   { device: 'iPhone 15 Pro', date: 'Hoje, 14:05', location: 'São Paulo, BR' },
                   { device: 'MacBook Pro 14"', date: 'Ontem, 09:20', location: 'São Paulo, BR' },
                 ].map((log, idx) => (
                   <div key={idx} className="p-4 bg-white/5 rounded-2xl border border-white/10">
                      <p className="text-xs font-black">{log.device}</p>
                      <p className="text-[10px] text-gray-400 font-medium">{log.date} • {log.location}</p>
                   </div>
                 ))}
              </div>
              <button className="w-full mt-6 py-4 border border-white/20 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">Ver Todos os Dispositivos</button>
           </div>

           <div className="p-6 bg-blue-50 rounded-[32px] border border-blue-100 flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-blue-600 shrink-0" />
              <p className="text-[11px] text-blue-800 font-medium leading-relaxed">
                Suas sessões de administrador expiram automaticamente após <b>24 horas</b> de inatividade por motivos de conformidade.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;
