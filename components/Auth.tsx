
import React, { useState } from 'react';
import { 
  ClipboardList, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Building2,
  User,
  LayoutDashboard,
  Smartphone,
  Globe
} from 'lucide-react';
import { UserRole } from '../types';

export const Login: React.FC<{ onToggle: () => void, onLogin: (role: UserRole) => void }> = ({ onToggle, onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>('admin');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6 animate-in fade-in duration-500">
      <div className="max-w-md w-full space-y-8 bg-white p-8 md:p-12 rounded-[32px] shadow-2xl border border-gray-100">
        <div className="text-center space-y-4">
          <div className="bg-blue-600 p-3 rounded-2xl inline-block shadow-lg">
            <ClipboardList className="text-white w-8 h-8" />
          </div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Bem-vindo de volta!</h2>
          <p className="text-gray-500 font-medium">Acesse sua conta para gerenciar seus serviços.</p>
        </div>

        <div className="grid grid-cols-3 gap-2 p-1 bg-gray-100 rounded-2xl">
          <button 
            onClick={() => setSelectedRole('admin')}
            className={`flex flex-col items-center justify-center gap-1 py-3 rounded-xl text-[10px] font-bold transition-all ${selectedRole === 'admin' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <LayoutDashboard className="w-4 h-4" /> Gestor
          </button>
          <button 
            onClick={() => setSelectedRole('tech')}
            className={`flex flex-col items-center justify-center gap-1 py-3 rounded-xl text-[10px] font-bold transition-all ${selectedRole === 'tech' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <Smartphone className="w-4 h-4" /> Técnico
          </button>
          <button 
            onClick={() => setSelectedRole('client')}
            className={`flex flex-col items-center justify-center gap-1 py-3 rounded-xl text-[10px] font-bold transition-all ${selectedRole === 'client' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <Globe className="w-4 h-4" /> Cliente
          </button>
        </div>

        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onLogin(selectedRole); }}>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">E-mail ou CPF</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
              <input 
                type="text" 
                placeholder={selectedRole === 'client' ? "E-mail ou Documento" : "exemplo@email.com"}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-inner"
                defaultValue={selectedRole === 'admin' ? 'admin@servicopro.com' : selectedRole === 'tech' ? 'tech@servicopro.com' : 'cliente@solar.com'}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Senha</label>
              <button type="button" className="text-xs font-bold text-blue-600 hover:underline">Esqueceu a senha?</button>
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
              <input 
                type={showPassword ? 'text' : 'password'} 
                placeholder="••••••••"
                className="w-full pl-12 pr-12 py-4 bg-gray-50 border-none rounded-2xl text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-inner"
                defaultValue="password123"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-blue-500"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 group"
          >
            Entrar como {selectedRole === 'admin' ? 'Gestor' : selectedRole === 'tech' ? 'Técnico' : 'Cliente'}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="text-center pt-6 border-t border-gray-50">
          <p className="text-sm text-gray-500 font-medium">
            {selectedRole === 'client' ? 'Deseja contratar o ServiçoPro?' : 'Ainda não tem uma conta?'}
            {' '}
            <button onClick={onToggle} className="text-blue-600 font-bold hover:underline">
               {selectedRole === 'client' ? 'Ver Planos' : 'Comece o teste grátis'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export const Register: React.FC<{ onToggle: () => void, onRegister: () => void }> = ({ onToggle, onRegister }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6 animate-in fade-in duration-500">
      <div className="max-w-2xl w-full grid grid-cols-1 md:grid-cols-2 bg-white rounded-[32px] shadow-2xl border border-gray-100 overflow-hidden">
        <div className="bg-blue-600 p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="space-y-8 relative z-10">
            <div className="flex items-center gap-3">
              <Zap className="w-8 h-8 fill-white" />
              <h1 className="text-2xl font-black tracking-tight">ServiçoPro</h1>
            </div>
            <h2 className="text-4xl font-black leading-tight">Digitalize sua empresa de campo hoje.</h2>
            <div className="space-y-4">
               <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-blue-200" />
                  <span className="text-sm font-bold text-blue-50">14 dias grátis</span>
               </div>
               <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-blue-200" />
                  <span className="text-sm font-bold text-blue-50">Sem cartão de crédito</span>
               </div>
               <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-blue-200" />
                  <span className="text-sm font-bold text-blue-50">Setup em 2 minutos</span>
               </div>
            </div>
          </div>
          <p className="text-xs text-blue-200 font-medium relative z-10">
            Junte-se a mais de 500 empresas que escalaram sua operação com ServiçoPro.
          </p>
        </div>

        <div className="p-8 md:p-12 space-y-8">
           <div className="space-y-2">
              <h3 className="text-2xl font-black text-gray-900 tracking-tight">Criar Conta</h3>
              <p className="text-sm text-gray-500 font-medium">Informe os dados da sua empresa.</p>
           </div>

           <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); onRegister(); }}>
              <div className="space-y-2">
                 <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Nome Completo</label>
                 <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                    <input type="text" placeholder="Seu nome" className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                 </div>
              </div>

              <div className="space-y-2">
                 <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Empresa</label>
                 <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                    <input type="text" placeholder="Nome da sua empresa" className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                 </div>
              </div>

              <div className="space-y-2">
                 <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">E-mail Corporativo</label>
                 <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                    <input type="email" placeholder="email@empresa.com" className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                 </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-black text-lg shadow-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2 group"
              >
                Começar agora
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
           </form>

           <div className="text-center">
              <p className="text-sm text-gray-500 font-medium">
                Já tem conta?{' '}
                <button onClick={onToggle} className="text-blue-600 font-bold hover:underline">Fazer login</button>
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};
