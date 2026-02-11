
import React from 'react';
import { 
  CheckCircle, 
  ArrowRight, 
  Smartphone, 
  Globe, 
  ShieldCheck, 
  Zap,
  BarChart3,
  Users2,
  Star,
  Play,
  MessageSquare,
  Navigation,
  Clock,
  ExternalLink
} from 'lucide-react';
import FAQSection from './FAQSection';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 h-20 px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg shadow-lg shadow-blue-100">
            <Zap className="text-white w-5 h-5 fill-white" />
          </div>
          <h1 className="text-xl font-black text-gray-900 tracking-tight">Serviço<span className="text-blue-600">Pro</span></h1>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-bold text-gray-500 hover:text-blue-600 transition-colors">Funcionalidades</a>
          <a href="#customer-experience" className="text-sm font-bold text-gray-500 hover:text-blue-600 transition-colors">Portal do Cliente</a>
          <a href="#pricing" className="text-sm font-bold text-gray-500 hover:text-blue-600 transition-colors">Preços</a>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-sm font-black text-gray-700 hover:text-blue-600 transition-colors">Entrar</button>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-full text-sm font-black hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all hover:scale-105 active:scale-95">
            Teste Grátis
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
            Novo: Inteligência Artificial para Diagnósticos
          </div>
          <h2 className="text-5xl lg:text-[80px] font-black text-gray-900 leading-[0.95] tracking-tighter">
            Domine sua <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Gestão de Campo</span>.
          </h2>
          <p className="text-lg text-gray-500 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
            O SaaS definitivo para manutenção e instalações. Digitalize seus técnicos, encante seus clientes e escale seu faturamento.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
            <button className="w-full sm:w-auto bg-blue-600 text-white px-10 py-5 rounded-[24px] font-black text-lg shadow-2xl shadow-blue-200 hover:bg-blue-700 transition-all hover:-translate-y-1">
              Começar agora grátis
            </button>
            <button className="w-full sm:w-auto flex items-center justify-center gap-3 bg-white border border-gray-100 text-gray-700 px-10 py-5 rounded-[24px] font-black text-lg hover:bg-gray-50 transition-all shadow-sm">
              <Play className="w-5 h-5 fill-current" /> Ver Demo
            </button>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-10 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 blur-[100px] rounded-full"></div>
          <div className="relative bg-white border border-gray-100 rounded-[48px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] p-4 overflow-hidden transform rotate-2 hover:rotate-0 transition-transform duration-700">
             <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200" alt="Dashboard" className="rounded-[40px] shadow-2xl" />
          </div>
        </div>
      </section>

      {/* Seção Portal do Cliente - Adição Solicitada */}
      <section id="customer-experience" className="py-32 bg-indigo-900 text-white overflow-hidden relative">
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] -mr-64 -mt-64"></div>
         <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
               <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
                  Transparência Radical
               </div>
               <h3 className="text-5xl font-black leading-tight tracking-tighter">O Portal que seus clientes vão amar.</h3>
               <p className="text-lg text-indigo-100/70 font-medium leading-relaxed">
                  Dê adeus às ligações perguntando "onde está o técnico?". Ofereça um portal moderno com rastreamento GPS em tempo real, abertura de chamados e histórico técnico completo.
               </p>
               
               <div className="space-y-6">
                  {[
                    { icon: MessageSquare, title: 'Acesso No-Auth via WhatsApp', desc: 'O cliente recebe um link temporário e seguro. Clicou, entrou.' },
                    { icon: Navigation, title: 'Uber-Like Tracking', desc: 'Acompanhamento do deslocamento do técnico no mapa em tempo real.' },
                    { icon: Globe, title: 'Subdomínio da sua Marca', desc: 'O portal roda no seu endereço personalizado: empresa.servicopro.com.br' },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-5">
                       <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-blue-400 shrink-0 border border-white/5">
                          <item.icon className="w-6 h-6" />
                       </div>
                       <div>
                          <h4 className="text-lg font-bold">{item.title}</h4>
                          <p className="text-sm text-indigo-200/60 font-medium">{item.desc}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            <div className="relative group">
               {/* Mock do Celular do Cliente */}
               <div className="relative w-full max-w-[320px] mx-auto bg-gray-900 rounded-[48px] p-4 shadow-[0_50px_100px_rgba(0,0,0,0.5)] border-8 border-gray-800 transform lg:rotate-6 group-hover:rotate-0 transition-transform duration-700">
                  <div className="bg-white rounded-[32px] overflow-hidden aspect-[9/19] flex flex-col">
                     <div className="p-4 pt-8 bg-blue-600 text-white">
                        <div className="flex justify-between items-center mb-4">
                           <div className="w-8 h-8 rounded-lg bg-white/20"></div>
                           <Clock className="w-4 h-4 opacity-50" />
                        </div>
                        <h5 className="text-xs font-black uppercase">Técnico a Caminho</h5>
                        <p className="text-[10px] opacity-70">Chegada prevista: 14:15</p>
                     </div>
                     <div className="flex-1 bg-gray-50 p-2">
                        <div className="w-full h-32 bg-gray-200 rounded-2xl mb-3 flex items-center justify-center overflow-hidden">
                           <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover opacity-50" />
                           <div className="absolute w-4 h-4 bg-blue-600 rounded-full border-2 border-white animate-ping"></div>
                        </div>
                        <div className="space-y-2">
                           <div className="h-2 w-3/4 bg-gray-200 rounded"></div>
                           <div className="h-2 w-1/2 bg-gray-200 rounded"></div>
                           <div className="h-10 w-full bg-blue-600 rounded-xl mt-4"></div>
                        </div>
                     </div>
                  </div>
                  <div className="absolute -bottom-6 -left-10 bg-white p-4 rounded-2xl shadow-2xl text-gray-900 animate-bounce">
                     <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white"><Zap className="w-4 h-4 fill-current" /></div>
                        <div>
                           <p className="text-[10px] font-black uppercase">Novo WhatsApp</p>
                           <p className="text-xs font-bold">Seu técnico saiu para atendimento!</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-24 space-y-4">
            <span className="text-blue-600 font-black text-xs uppercase tracking-[0.3em]">Funcionalidades</span>
            <h4 className="text-5xl font-black text-gray-900 tracking-tight">Tudo o que sua operação precisa.</h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { icon: Smartphone, title: 'App Offline', desc: 'Sua equipe no campo nunca para. Checklists e fotos sincronizam sozinhos.' },
              { icon: Globe, title: 'Portal do Cliente', desc: 'Autoatendimento 24h. Chamados, status e notas em um só lugar.' },
              { icon: BarChart3, title: 'BI e Analytics', desc: 'Decisões baseadas em dados. Produtividade e faturamento em tempo real.' },
              { icon: Zap, title: 'AI Diagnóstico', desc: 'Nossa IA sugere checklists e urgência baseado na descrição do problema.' },
              { icon: ShieldCheck, title: 'Controle de Ativos', desc: 'Gestão de QR Codes e ciclo de vida de cada equipamento instalado.' },
              { icon: Users2, title: 'Gestão de Técnicos', desc: 'Escalas inteligentes, comissões automáticas e rastreamento GPS.' },
            ].map((feature, idx) => (
              <div key={idx} className="bg-white p-10 rounded-[40px] border border-gray-100 hover:border-blue-200 transition-all group hover:shadow-2xl hover:shadow-blue-500/5 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h5 className="text-xl font-black text-gray-900 mb-4">{feature.title}</h5>
                <p className="text-gray-500 leading-relaxed font-medium">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection />

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-gray-900 text-white overflow-hidden relative">
         <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full -mr-48 -mt-48"></div>
         <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-20 space-y-4">
              <span className="text-blue-400 font-black text-xs uppercase tracking-[0.3em]">Planos</span>
              <h4 className="text-5xl font-black tracking-tight">O investimento que se paga em dias.</h4>
            </div>
            <div className="flex flex-wrap justify-center gap-8">
               <div className="bg-white/5 border border-white/10 p-12 rounded-[48px] max-w-sm flex-1 space-y-8 backdrop-blur-md">
                  <h6 className="text-2xl font-black">Plano Pro</h6>
                  <p className="text-gray-400 font-medium">Ideal para equipes em expansão que buscam controle total.</p>
                  <div className="text-5xl font-black">R$ 197<span className="text-lg text-gray-500">/mês</span></div>
                  <ul className="space-y-4 pt-6 border-t border-white/10">
                    <li className="flex items-center gap-3 text-sm font-medium"><CheckCircle className="w-5 h-5 text-emerald-400" /> Até 10 Usuários</li>
                    <li className="flex items-center gap-3 text-sm font-medium"><CheckCircle className="w-5 h-5 text-emerald-400" /> OS Ilimitadas</li>
                    <li className="flex items-center gap-3 text-sm font-medium"><CheckCircle className="w-5 h-5 text-emerald-400" /> Portal do Cliente</li>
                  </ul>
                  <button className="w-full bg-blue-600 py-5 rounded-[24px] font-black shadow-xl hover:bg-blue-50 transition-all">Começar Trial Grátis</button>
               </div>
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-20 px-6 text-white border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Zap className="text-white w-5 h-5 fill-white" />
              </div>
              <h1 className="text-xl font-black tracking-tight">ServiçoPro</h1>
            </div>
            <p className="text-gray-500 text-sm font-medium">© 2024. Operação inteligente para empresas de campo.</p>
            <div className="flex gap-6">
               <a href="#" className="text-gray-400 hover:text-white transition-colors"><Globe className="w-5 h-5" /></a>
               <a href="#" className="text-gray-400 hover:text-white transition-colors"><Smartphone className="w-5 h-5" /></a>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
