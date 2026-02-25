
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ClipboardList, 
  Users, 
  UserSquare2, 
  Settings as SettingsIcon, 
  Menu, 
  Bell, 
  Search,
  Plus,
  Package,
  DollarSign,
  Calendar,
  Monitor,
  Home,
  BarChart3,
  LogOut,
  CreditCard,
  FileCheck,
  Layout,
  Truck,
  Zap,
  BarChartHorizontal,
  Box,
  Map as MapIcon,
  ShieldCheck,
  FileText,
  TrendingUp,
  Palette,
  Terminal,
  MessageSquare,
  Clock,
  User
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import ServiceOrders from './components/ServiceOrders';
import OSDetail from './components/OSDetail';
import Customers from './components/Customers';
import Technicians from './components/Technicians';
import Inventory from './components/Inventory';
import Finance from './components/Finance';
import Settings from './components/Settings';
import CalendarView from './components/CalendarView';
import CustomerPortal from './components/CustomerPortal';
import LandingPage from './components/LandingPage';
import Reports from './components/Reports';
import Billing from './components/Billing';
import TechMobileDashboard from './components/TechMobileDashboard';
import TechAgenda from './components/TechAgenda';
import TechProfile from './components/TechProfile';
import TechPerformance from './components/TechPerformance';
import NotificationCenter from './components/NotificationCenter';
import ChecklistManager from './components/ChecklistManager';
import CustomFieldConfig from './components/CustomFieldConfig';
import TechStock from './components/TechStock';
import ReportBuilder from './components/ReportBuilder';
import CommissionManager from './components/CommissionManager';
import ServiceTypes from './components/ServiceTypes';
import AssetManagement from './components/AssetManagement';
import MapDashboard from './components/MapDashboard';
import SuperAdminDashboard from './components/SuperAdminDashboard';
import ContractManagement from './components/ContractManagement';
import TenantManager from './components/TenantManager';
import BrandingConfig from './components/BrandingConfig';
import SystemLogs from './components/SystemLogs';
import ChatSystem from './components/ChatSystem';
import AICopilot from './components/AICopilot';
import { Login, Register } from './components/Auth';
import ServiceOrderForm from './components/ServiceOrderForm';
import { UserRole } from './types';

type TechTab = 'home' | 'agenda' | 'performance' | 'profile';

const TechBottomNav = ({ activeTab, onTabChange, onPlus }: { activeTab: TechTab, onTabChange: (t: TechTab) => void, onPlus: () => void }) => {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-md border-t border-gray-100 h-22 pb-4 px-6 flex items-center justify-between z-50 rounded-t-[40px] shadow-[0_-15px_45px_rgba(0,0,0,0.06)]">
      <button 
        onClick={() => onTabChange('home')}
        className={`flex flex-col items-center gap-1.5 transition-all duration-300 w-14 ${activeTab === 'home' ? 'text-blue-600 scale-105' : 'text-gray-400 opacity-60'}`}
      >
        <Clock className={`w-6.5 h-6.5 ${activeTab === 'home' ? 'stroke-[2.5px]' : 'stroke-[2px]'}`} />
        <span className={`text-[10px] ${activeTab === 'home' ? 'font-black' : 'font-bold'}`}>Hoje</span>
      </button>
      
      <button 
        onClick={() => onTabChange('agenda')}
        className={`flex flex-col items-center gap-1.5 transition-all duration-300 w-14 ${activeTab === 'agenda' ? 'text-blue-600 scale-105' : 'text-gray-400 opacity-60'}`}
      >
        <Calendar className={`w-6.5 h-6.5 ${activeTab === 'agenda' ? 'stroke-[2.5px]' : 'stroke-[2px]'}`} />
        <span className={`text-[10px] ${activeTab === 'agenda' ? 'font-black' : 'font-bold'}`}>Agenda</span>
      </button>
      
      <div className="relative -mt-10">
        <button 
          onClick={onPlus}
          className="w-15 h-15 bg-blue-600 rounded-[22px] shadow-2xl shadow-blue-400 flex items-center justify-center text-white active:scale-90 transition-all hover:bg-blue-700 border-4 border-white"
        >
          <Plus className="w-8 h-8 stroke-[3px]" />
        </button>
      </div>
      
      <button 
        onClick={() => onTabChange('performance')}
        className={`flex flex-col items-center gap-1.5 transition-all duration-300 w-14 ${activeTab === 'performance' ? 'text-blue-600 scale-105' : 'text-gray-400 opacity-60'}`}
      >
        <TrendingUp className={`w-6.5 h-6.5 ${activeTab === 'performance' ? 'stroke-[2.5px]' : 'stroke-[2px]'}`} />
        <span className={`text-[10px] ${activeTab === 'performance' ? 'font-black' : 'font-bold'}`}>Ganhos</span>
      </button>
      
      <button 
        onClick={() => onTabChange('profile')}
        className={`flex flex-col items-center gap-1.5 transition-all duration-300 w-14 ${activeTab === 'profile' ? 'text-blue-600 scale-105' : 'text-gray-400 opacity-60'}`}
      >
        <User className={`w-6.5 h-6.5 ${activeTab === 'profile' ? 'stroke-[2.5px]' : 'stroke-[2px]'}`} />
        <span className={`text-[10px] ${activeTab === 'profile' ? 'font-black' : 'font-bold'}`}>Perfil</span>
      </button>
    </nav>
  );
};

const Sidebar = ({ isOpen, toggle, onLogout, role }: { isOpen: boolean, toggle: () => void, onLogout: () => void, role: UserRole }) => {
  const location = useLocation();

  const commonItems = [
    { name: 'Chat de Equipe', icon: MessageSquare, path: '/chat' },
    { name: 'Portal Cliente', icon: Monitor, path: '/portal' },
    { name: 'Configurações', icon: SettingsIcon, path: '/config' },
  ];

  const adminItems = [
    { name: 'Dashboard BI', icon: LayoutDashboard, path: '/' },
    { name: 'Monitoramento', icon: MapIcon, path: '/map-dashboard' },
    { name: 'Ordens de Serviço', icon: ClipboardList, path: '/os' },
    { name: 'Contratos', icon: ShieldCheck, path: '/contracts' },
    { name: 'Agenda', icon: Calendar, path: '/agenda' },
    { name: 'Relatórios', icon: BarChart3, path: '/relatorios' },
    { name: 'Report Builder', icon: BarChartHorizontal, path: '/report-builder' },
    { name: 'Tipos de Serviço', icon: Zap, path: '/service-types' },
    { name: 'Checklists', icon: FileCheck, path: '/checklists' },
    { name: 'Campos Custom', icon: Layout, path: '/custom-fields' },
    { name: 'Clientes / CRM', icon: Users, path: '/clientes' },
    { name: 'Gestão de Ativos', icon: Box, path: '/assets' },
    { name: 'Técnicos', icon: UserSquare2, path: '/tecnicos' },
    { name: 'Comissões', icon: DollarSign, path: '/commissions' },
    { name: 'Estoque Central', icon: Package, path: '/estoque' },
    { name: 'Estoque Técnico', icon: Truck, path: '/tech-stock' },
    { name: 'Financeiro', icon: DollarSign, path: '/financeiro' },
    { name: 'Assinatura', icon: CreditCard, path: '/billing' },
  ];

  const superAdminItems = [
    { name: 'Painel Global', icon: LayoutDashboard, path: '/super-admin' },
    { name: 'Gerenciar Tenants', icon: Box, path: '/tenants' },
    { name: 'Planos & MRR', icon: TrendingUp, path: '/mrr' },
    { name: 'Logs de Sistema', icon: Terminal, path: '/system-logs' },
  ];

  const menuItems = role === 'super_admin' ? superAdminItems : adminItems;

  const noSidebarPaths = ['/landing', '/portal', '/login', '/register', '/tech-app'];
  if (noSidebarPaths.includes(location.pathname) || role === 'client') {
    return null;
  }

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={toggle}
        />
      )}

      <aside className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 z-30 transition-transform duration-300 w-64 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-6 flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <ClipboardList className="text-white w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold text-gray-800 tracking-tight">Serviço<span className="text-blue-600">Pro</span></h1>
        </div>

        <nav className="mt-6 px-4 space-y-1 h-[calc(100vh-220px)] overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                  isActive 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' 
                  : 'text-gray-500 hover:bg-gray-100'
                }`}
                onClick={() => window.innerWidth < 1024 && toggle()}
              >
                <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                {item.name}
              </Link>
            );
          })}
          
          <div className="pt-4 mt-4 border-t border-gray-100">
            {commonItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                    isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-gray-500 hover:bg-gray-100'
                  }`}
                  onClick={() => window.innerWidth < 1024 && toggle()}
                >
                  <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t bg-white space-y-2">
           <Link to="/landing" className="flex items-center gap-2 px-4 py-2 text-[10px] font-bold text-gray-400 hover:text-blue-600 uppercase">
            <Home className="w-3 h-3" /> Ver Site
          </Link>
          <div className="flex items-center justify-between gap-3 px-4 py-2 border-t pt-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs">JS</div>
              <div className="overflow-hidden">
                <p className="text-[11px] font-bold text-gray-800 truncate">João Silva</p>
                <p className="text-[9px] text-gray-400 truncate">{role}</p>
              </div>
            </div>
            <button onClick={onLogout} className="p-1.5 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-lg transition-all">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

const Header = ({ onToggleSidebar, onToggleNotifications, onNewOS, role }: { onToggleSidebar: () => void, onToggleNotifications: () => void, onNewOS: () => void, role: UserRole }) => {
  const location = useLocation();
  const noHeaderPaths = ['/landing', '/portal', '/login', '/register', '/tech-app'];
  if (noHeaderPaths.includes(location.pathname) || role === 'client') return null;

  return (
    <header className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40 px-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button onClick={onToggleSidebar} className="lg:hidden p-2 hover:bg-gray-100 rounded-md">
          <Menu className="w-6 h-6" />
        </button>
        <div className="hidden md:flex items-center bg-gray-100 rounded-2xl px-3 py-1.5 w-64 lg:w-96">
          <Search className="w-4 h-4 text-gray-400 mr-2" />
          <input 
            type="text" 
            placeholder="Pesquisar OS, clientes..." 
            className="bg-transparent border-none outline-none text-xs w-full font-medium"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <button 
          onClick={onToggleNotifications}
          className="relative p-2 hover:bg-gray-100 rounded-full group"
        >
          <Bell className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        <button 
          onClick={onNewOS}
          className="hidden sm:flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xl shadow-blue-100 hover:scale-[1.02]"
        >
          <Plus className="w-4 h-4" />
          Nova OS
        </button>
      </div>
    </header>
  );
};

const MainContent: React.FC<{ authenticated: boolean, setAuthenticated: (val: boolean) => void, role: UserRole, setRole: (r: UserRole) => void }> = ({ authenticated, setAuthenticated, role, setRole }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [showGlobalOSForm, setShowGlobalOSForm] = useState(false);
  const [activeTechTab, setActiveTechTab] = useState<TechTab>('home');
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedOS, setSelectedOS] = useState<string | null>(null);

  useEffect(() => {
    if (authenticated) {
       if (role === 'client') {
          if (!['/portal', '/landing'].includes(location.pathname)) {
             navigate('/portal', { replace: true });
          }
          return;
       }

       if (role === 'tech' && (location.pathname === '/' || location.pathname === '/login')) {
         navigate('/tech-app', { replace: true });
       } else if (role === 'super_admin' && (location.pathname === '/' || location.pathname === '/login')) {
         navigate('/super-admin', { replace: true });
       } else if (role === 'admin' && (location.pathname === '/tech-app' || location.pathname === '/login')) {
         navigate('/', { replace: true });
       }
    }
  }, [authenticated, role, location.pathname]);

  if (!authenticated && !['/landing', '/login', '/register'].includes(location.pathname)) {
    return <Login onToggle={() => navigate('/register')} onLogin={(r) => { setRole(r); setAuthenticated(true); }} />;
  }

  const handleLogout = () => {
    setAuthenticated(false);
    navigate('/login');
  };

  const isTechMode = location.pathname === '/tech-app';

  const renderTechContent = () => {
    if (selectedOS) return <div className="p-4 pt-8"><OSDetail onBack={() => setSelectedOS(null)} /></div>;
    
    switch (activeTechTab) {
      case 'agenda': return <TechAgenda />;
      case 'performance': return <TechPerformance onClose={() => setActiveTechTab('home')} />;
      case 'profile': return <TechProfile onLogout={handleLogout} />;
      default: return <TechMobileDashboard onLogout={handleLogout} onSelectOS={(id) => setSelectedOS(id)} />;
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar 
        role={role}
        isOpen={sidebarOpen} 
        toggle={() => setSidebarOpen(!sidebarOpen)} 
        onLogout={handleLogout}
      />

      <NotificationCenter 
        isOpen={notificationsOpen} 
        onClose={() => setNotificationsOpen(false)} 
      />

      {showGlobalOSForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="w-full max-w-3xl max-h-[90vh] overflow-hidden">
              <ServiceOrderForm 
                onClose={() => setShowGlobalOSForm(false)} 
                onSave={(data) => {
                  setShowGlobalOSForm(false);
                }} 
              />
           </div>
        </div>
      )}
      
      <main className={`flex-1 flex flex-col min-h-screen bg-gray-50 ${(!authenticated || ['/landing', '/portal', '/login', '/register', '/tech-app'].includes(location.pathname) || role === 'client') ? '' : 'lg:ml-64'} transition-all`}>
        <Header 
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
          onToggleNotifications={() => setNotificationsOpen(true)}
          onNewOS={() => setShowGlobalOSForm(true)}
          role={role}
        />
        
        <div className={`flex-1 ${isTechMode ? 'flex flex-col' : ''}`}>
          <Routes>
            <Route path="/login" element={<Login onToggle={() => navigate('/register')} onLogin={(r) => { setRole(r); setAuthenticated(true); }} />} />
            <Route path="/register" element={<Register onToggle={() => navigate('/login')} onRegister={() => { setRole('admin'); setAuthenticated(true); navigate('/'); }} />} />
            <Route path="/landing" element={<LandingPage />} />
            
            <Route path="/tech-app" element={
               <div className="flex-1 flex flex-col relative">
                  <div className={`flex-1 overflow-y-auto custom-scrollbar ${!selectedOS ? 'pb-28' : ''}`}>
                    <div className="max-w-md mx-auto min-h-full bg-gray-50 shadow-sm border-x border-gray-100">
                      {renderTechContent()}
                    </div>
                  </div>
                  {!selectedOS && <TechBottomNav activeTab={activeTechTab} onTabChange={setActiveTechTab} onPlus={() => setShowGlobalOSForm(true)} />}
               </div>
            } />

            <Route path="/portal" element={
              <div className="bg-gray-50 min-h-screen">
                <div className="bg-white border-b border-gray-100 p-4 sticky top-0 z-50">
                  <div className="max-w-6xl mx-auto flex justify-between items-center px-4">
                    <div className="flex items-center gap-2">
                       <ClipboardList className="w-5 h-5 text-blue-600" />
                       <span className="font-black text-gray-900 tracking-tight">Portal do Cliente</span>
                    </div>
                    <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-400 hover:text-red-500 rounded-xl text-xs font-bold transition-all">
                      <LogOut className="w-4 h-4" /> Sair
                    </button>
                  </div>
                </div>
                <div className="p-4 lg:p-12">
                   <CustomerPortal />
                </div>
              </div>
            } />

            {role !== 'client' && (
              <>
                <Route path="/super-admin" element={<div className="p-4 lg:p-8"><SuperAdminDashboard /></div>} />
                <Route path="/tenants" element={<div className="p-4 lg:p-8"><TenantManager /></div>} />
                <Route path="/system-logs" element={<div className="p-4 lg:p-8"><SystemLogs /></div>} />
                <Route path="/" element={<div className="p-4 lg:p-8"><Dashboard /></div>} />
                <Route path="/map-dashboard" element={<div className="p-4 lg:p-8"><MapDashboard /></div>} />
                <Route path="/os" element={
                  <div className="p-4 lg:p-8">
                    {selectedOS ? <OSDetail onBack={() => setSelectedOS(null)} /> : <ServiceOrders onSelectOS={(id) => setSelectedOS(id)} />}
                  </div>
                } />
                <Route path="/contracts" element={<div className="p-4 lg:p-8"><ContractManagement /></div>} />
                <Route path="/agenda" element={<div className="p-4 lg:p-8"><CalendarView /></div>} />
                <Route path="/relatorios" element={<div className="p-4 lg:p-8"><Reports /></div>} />
                <Route path="/report-builder" element={<div className="p-4 lg:p-8"><ReportBuilder /></div>} />
                <Route path="/service-types" element={<div className="p-4 lg:p-8"><ServiceTypes /></div>} />
                <Route path="/checklists" element={<div className="p-4 lg:p-8"><ChecklistManager /></div>} />
                <Route path="/custom-fields" element={<div className="p-4 lg:p-8"><CustomFieldConfig /></div>} />
                <Route path="/branding" element={<div className="p-4 lg:p-8"><BrandingConfig onBack={() => navigate('/config')} /></div>} />
                <Route path="/clientes" element={<div className="p-4 lg:p-8"><Customers /></div>} />
                <Route path="/assets" element={<div className="p-4 lg:p-8"><AssetManagement /></div>} />
                <Route path="/tecnicos" element={<div className="p-4 lg:p-8"><Technicians /></div>} />
                <Route path="/commissions" element={<div className="p-4 lg:p-8"><CommissionManager /></div>} />
                <Route path="/estoque" element={<div className="p-4 lg:p-8"><Inventory /></div>} />
                <Route path="/tech-stock" element={<div className="p-4 lg:p-8"><TechStock /></div>} />
                <Route path="/financeiro" element={<div className="p-4 lg:p-8"><Finance /></div>} />
                <Route path="/billing" element={<div className="p-4 lg:p-8"><Billing /></div>} />
                <Route path="/config" element={<div className="p-4 lg:p-8"><Settings /></div>} />
                <Route path="/chat" element={<div className="p-4 lg:p-8 max-w-4xl mx-auto"><ChatSystem roomName="Equipe Central" /></div>} />
              </>
            )}
            
            <Route path="*" element={<div className="flex flex-col items-center justify-center h-full text-gray-500 p-8">
              <LayoutDashboard className="w-16 h-16 mb-4 opacity-20" />
              <h2 className="text-xl font-medium">Ops! Algo deu errado</h2>
              <p>Módulo em desenvolvimento ou página não encontrada.</p>
              <Link to={role === 'client' ? "/portal" : "/"} className="mt-4 text-blue-600 font-bold hover:underline">Voltar para o Painel</Link>
            </div>} />
          </Routes>
        </div>
      </main>

      {authenticated && role !== 'client' && <AICopilot />}
    </div>
  );
};

const App: React.FC = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [role, setRole] = useState<UserRole>('admin');

  return (
    <HashRouter>
      <MainContent 
        authenticated={authenticated} 
        setAuthenticated={setAuthenticated} 
        role={role} 
        setRole={setRole} 
      />
    </HashRouter>
  );
};

export default App;
