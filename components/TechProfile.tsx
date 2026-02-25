
import React from 'react';
import { User, ShieldCheck, Award, Settings, LogOut, ChevronRight, Bell, Smartphone, HelpCircle, UserCheck, Key, Eye } from 'lucide-react';

const TechProfile: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const profileItems = [
    { icon: User, label: 'Dados Pessoais', value: 'Carlos Alberto Lima' },
    { icon: Key, label: 'Segurança', value: 'Alterar senha e biometria' },
    { icon: UserCheck, label: 'Vínculo Profissional', value: 'Técnico Sênior • CLT' },
  ];

  return (
    <div className="p-6 pb-24 space-y-8 animate-in slide-in-from-right-4 duration-500">
      {/* Header do Perfil */}
      <div className="flex flex-col items-center text-center space-y-4 pt-4">
        <div className="relative">
          <div className="w-24 h-24 rounded-[36px] bg-blue-600 flex items-center justify-center text-white text-3xl font-black shadow-2xl shadow-blue-200">
            CL
          </div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 border-4 border-white rounded-full flex items-center justify-center text-white shadow-lg">
             <ShieldCheck className="w-4 h-4" />
          </div>
        </div>
        <div>
          <h2 className="text-xl font-black text-gray-900 tracking-tight">Carlos Lima</h2>
          <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mt-1">ID #44921 • São Paulo/SP</p>
        </div>
      </div>

      {/* Menu de Conta */}
      <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
        {profileItems.map((item, i) => (
          <div key={i} className="p-5 flex items-center justify-between border-b border-gray-50 last:border-0 group cursor-pointer hover:bg-gray-50 transition-all">
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600 group-hover:scale-110 transition-transform">
                <item.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{item.label}</p>
                <p className="text-sm font-bold text-gray-800">{item.value}</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-200" />
          </div>
        ))}
      </div>

      {/* CONFIGURAÇÕES DO APP - Baseado no Screenshot */}
      <div className="space-y-4">
        <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.25em] px-2">CONFIGURAÇÕES DO APP</h3>
        <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-5 flex items-center justify-between border-b border-gray-50 hover:bg-gray-50 cursor-pointer group">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gray-50 rounded-2xl text-gray-400 group-hover:text-blue-600 group-hover:bg-blue-50 transition-all">
                <Bell className="w-6 h-6" />
              </div>
              <div>
                <p className="text-base font-bold text-gray-800">Notificações</p>
                <p className="text-xs text-gray-400 font-medium">Alertas push e sons</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-100 group-hover:text-gray-300 transition-colors" />
          </div>

          <div className="p-5 flex items-center justify-between border-b border-gray-50 hover:bg-gray-50 cursor-pointer group">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gray-50 rounded-2xl text-gray-400 group-hover:text-blue-600 group-hover:bg-blue-50 transition-all">
                <Smartphone className="w-6 h-6" />
              </div>
              <div>
                <p className="text-base font-bold text-gray-800">Dispositivo</p>
                <p className="text-xs text-gray-400 font-medium">Cache e permissões GPS</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-100 group-hover:text-gray-300 transition-colors" />
          </div>

          <div className="p-5 flex items-center justify-between hover:bg-gray-50 cursor-pointer group">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gray-50 rounded-2xl text-gray-400 group-hover:text-blue-600 group-hover:bg-blue-50 transition-all">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div>
                <p className="text-base font-bold text-gray-800">Suporte Técnico</p>
                <p className="text-xs text-gray-400 font-medium">Falar com operacional</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-100 group-hover:text-gray-300 transition-colors" />
          </div>
        </div>
      </div>

      <button 
        onClick={onLogout}
        className="w-full py-5 bg-red-50 text-red-600 rounded-[24px] font-black text-xs uppercase tracking-widest hover:bg-red-100 transition-all flex items-center justify-center gap-2"
      >
        <LogOut className="w-4 h-4" /> Sair da Conta
      </button>

      <div className="text-center space-y-1">
        <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">
          ServiçoPro Mobile v2.8.4-stable
        </p>
        <p className="text-[9px] text-gray-200">UUID: 88492-SP-2024</p>
      </div>
    </div>
  );
};

export default TechProfile;
