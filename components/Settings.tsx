
import React, { useState } from 'react';
import { 
  Building2, 
  CreditCard, 
  Users, 
  Bell, 
  Shield, 
  Smartphone,
  ChevronRight,
  Globe,
  Camera,
  CheckCircle2,
  Zap,
  Smartphone as PhoneIcon,
  BellRing,
  X,
  ArrowLeft
} from 'lucide-react';
import CompanyData from './CompanyData';
import TeamManagement from './TeamManagement';
import SecuritySettings from './SecuritySettings';
import BrandingConfig from './BrandingConfig';
import Billing from './Billing';
import MobileAppSettings from './MobileAppSettings';
import PushSettings from './PushSettings';

type SettingsView = 'menu' | 'company' | 'branding' | 'team' | 'security' | 'push' | 'mobile' | 'billing';

const SettingItem = ({ icon: Icon, title, description, badge, onClick }: any) => (
  <button 
    onClick={onClick}
    className="w-full flex items-center justify-between p-6 hover:bg-gray-50 rounded-[32px] transition-all border border-transparent hover:border-gray-100 group bg-white shadow-sm hover:shadow-xl hover:-translate-y-0.5 duration-300"
  >
    <div className="flex items-center gap-5 text-left">
      <div className="p-3 bg-gray-50 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all shadow-inner">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <h4 className="text-sm font-black text-gray-900 flex items-center gap-2 tracking-tight">
          {title}
          {badge && (
            <span className="text-[9px] font-black bg-blue-600 text-white px-2 py-0.5 rounded-full shadow-lg shadow-blue-200">
              {badge}
            </span>
          )}
        </h4>
        <p className="text-[11px] text-gray-400 font-medium mt-0.5">{description}</p>
      </div>
    </div>
    <div className="p-2 rounded-full group-hover:bg-blue-50 transition-all">
       <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-blue-600 transition-colors" />
    </div>
  </button>
);

const Settings: React.FC = () => {
  const [currentView, setCurrentView] = useState<SettingsView>('menu');

  const renderView = () => {
    switch (currentView) {
      case 'company': return <CompanyData onBack={() => setCurrentView('menu')} />;
      case 'branding': return <BrandingConfig onBack={() => setCurrentView('menu')} />;
      case 'team': return <TeamManagement onBack={() => setCurrentView('menu')} />;
      case 'security': return <SecuritySettings onBack={() => setCurrentView('menu')} />;
      case 'billing': return <Billing onBack={() => setCurrentView('menu')} />;
      case 'mobile': return <MobileAppSettings onBack={() => setCurrentView('menu')} />;
      case 'push': return <PushSettings onBack={() => setCurrentView('menu')} />;
      default: return (
        <div className="space-y-10 animate-in fade-in zoom-in-95 duration-500">
          <div className="flex flex-col gap-1">
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">Configurações</h2>
            <p className="text-gray-500 font-medium">Gerencie sua empresa, equipe e preferências da conta.</p>
          </div>

          <div className="bg-white rounded-[48px] border border-gray-100 shadow-sm overflow-hidden p-10">
            <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
              <div className="relative group">
                <div className="w-28 h-28 rounded-[36px] bg-blue-600 flex items-center justify-center text-white text-4xl font-black shadow-2xl overflow-hidden shadow-blue-200">
                  SP
                </div>
                <button className="absolute -bottom-2 -right-2 p-3 bg-white rounded-2xl shadow-2xl border border-gray-50 text-gray-600 hover:text-blue-600 transition-all hover:scale-110 active:scale-95">
                  <Camera className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 text-center md:text-left space-y-2">
                <h3 className="text-2xl font-black text-gray-900 tracking-tight">ServiçoPro Soluções Hidráulicas</h3>
                <p className="text-sm text-gray-400 font-medium">Plano Pro • Ativo desde Jan 2024</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-4">
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-black rounded-full uppercase tracking-widest border border-emerald-100">CONTA VERIFICADA</span>
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 text-[10px] font-black rounded-full uppercase tracking-widest border border-blue-100">12/30 USUÁRIOS</span>
                </div>
              </div>
              <button className="px-10 py-4 bg-blue-600 text-white rounded-[20px] font-black text-sm uppercase tracking-widest hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all hover:scale-105 active:scale-95">
                Editar Perfil
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              <div className="space-y-4">
                <h5 className="text-[10px] font-black text-gray-300 uppercase tracking-[0.25em] px-4 mb-4">EMPRESA</h5>
                <SettingItem 
                  icon={Building2} 
                  title="Dados da Empresa" 
                  description="CNPJ, Endereço e Informações de Contato"
                  onClick={() => setCurrentView('company')}
                />
                <SettingItem 
                  icon={Globe} 
                  title="Marca e Branding" 
                  description="Logo, cores e customização do portal"
                  onClick={() => setCurrentView('branding')}
                />
              </div>

              <div className="space-y-4">
                <h5 className="text-[10px] font-black text-gray-300 uppercase tracking-[0.25em] px-4 mb-4">ACESSO E SEGURANÇA</h5>
                <SettingItem 
                  icon={Users} 
                  title="Gestão de Equipe" 
                  description="Administre usuários, técnicos e permissões"
                  badge="12"
                  onClick={() => setCurrentView('team')}
                />
                <SettingItem 
                  icon={Shield} 
                  title="Segurança" 
                  description="Senhas, Autenticação 2FA e Logs de Acesso"
                  onClick={() => setCurrentView('security')}
                />
              </div>

              <div className="space-y-4 mt-8">
                <h5 className="text-[10px] font-black text-gray-300 uppercase tracking-[0.25em] px-4 mb-4">SISTEMA</h5>
                <SettingItem 
                  icon={Bell} 
                  title="Notificações Push" 
                  description="Configure alertas mobile para a equipe"
                  onClick={() => setCurrentView('push')}
                />
                <SettingItem 
                  icon={Smartphone} 
                  title="App Mobile" 
                  description="Configurações para o app do técnico"
                  onClick={() => setCurrentView('mobile')}
                />
              </div>

              <div className="space-y-4 mt-8">
                <h5 className="text-[10px] font-black text-gray-300 uppercase tracking-[0.25em] px-4 mb-4">FATURAMENTO</h5>
                <SettingItem 
                  icon={CreditCard} 
                  title="Plano e Pagamento" 
                  description="Gerencie sua assinatura do ServiçoPro"
                  onClick={() => setCurrentView('billing')}
                />
              </div>
            </div>
          </div>

          <div className="bg-red-50 p-8 rounded-[40px] border border-red-100 flex items-center justify-between shadow-sm">
            <div>
              <h4 className="text-lg font-black text-red-900 tracking-tight">Zona de Perigo</h4>
              <p className="text-sm text-red-600 font-medium">Excluir sua conta e todos os dados da empresa permanentemente.</p>
            </div>
            <button className="px-8 py-4 bg-white border border-red-200 text-red-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-sm">
              Excluir Conta
            </button>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="max-w-5xl mx-auto pb-20">
      {renderView()}
    </div>
  );
};

export default Settings;
