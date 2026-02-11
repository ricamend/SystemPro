
import React, { useState } from 'react';
import { 
  Palette, 
  Upload, 
  Globe, 
  Smartphone, 
  Eye, 
  Save, 
  Type,
  Layout,
  CheckCircle2,
  Image as ImageIcon,
  X,
  Loader2,
  CheckCircle,
  ChevronRight,
  MousePointer2,
  Sparkles,
  MessageSquare,
  ArrowLeft,
  Send
} from 'lucide-react';

interface Props {
  onBack: () => void;
}

const BrandingConfig: React.FC<Props> = ({ onBack }) => {
  const [primaryColor, setPrimaryColor] = useState('#3b82f6');
  const [logo, setLogo] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Estados para Customização
  const [customDomain, setCustomDomain] = useState('suaempresa');
  const [selectedFont, setSelectedFont] = useState('Inter');
  const [isDomainModalOpen, setIsDomainModalOpen] = useState(false);
  const [isFontModalOpen, setIsFontModalOpen] = useState(false);

  // Estados de Interação do Mock Mobile
  const [mockView, setMockView] = useState<'home' | 'form' | 'ai'>('home');

  const fonts = [
    { name: 'Inter', family: "'Inter', sans-serif" },
    { name: 'Roboto', family: "'Roboto', sans-serif" },
    { name: 'Montserrat', family: "'Montserrat', sans-serif" },
    { name: 'Poppins', family: "'Poppins', sans-serif" },
  ];

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!['image/png', 'image/svg+xml', 'image/jpeg'].includes(file.type)) {
        alert("Por favor, selecione um arquivo PNG ou SVG.");
        return;
      }

      setIsUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result as string);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLogo(null);
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1200);
  };
  
  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in slide-in-from-right-4 duration-300 pb-20 relative">
      {/* Toast de Sucesso */}
      {showSuccess && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[300] bg-emerald-600 text-white px-8 py-4 rounded-3xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-top-8">
           <CheckCircle className="w-6 h-6" />
           <span className="font-black text-sm uppercase tracking-widest">Identidade Visual Atualizada!</span>
        </div>
      )}

      {/* Modal Domínio Customizado */}
      {isDomainModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-lg rounded-[40px] shadow-2xl overflow-hidden border border-gray-100 animate-in zoom-in-95">
            <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-600 rounded-2xl text-white shadow-lg"><Globe className="w-6 h-6" /></div>
                <div>
                  <h3 className="text-xl font-black text-gray-900 tracking-tight">Domínio Customizado</h3>
                  <p className="text-xs text-gray-500 font-medium">Defina o endereço de acesso do seu portal.</p>
                </div>
              </div>
              <button onClick={() => setIsDomainModalOpen(false)} className="p-2 hover:bg-white rounded-full text-gray-400"><X className="w-6 h-6" /></button>
            </div>
            <div className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Seu Subdomínio</label>
                <div className="flex items-center bg-gray-50 rounded-2xl px-5 py-4 shadow-inner group focus-within:ring-2 focus-within:ring-blue-500 transition-all">
                  <input 
                    type="text" 
                    value={customDomain}
                    onChange={(e) => setCustomDomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                    className="bg-transparent border-none outline-none text-sm font-bold flex-1"
                    placeholder="nome-da-empresa"
                  />
                  <span className="text-sm font-bold text-gray-400">.servicopro.com.br</span>
                </div>
                <p className="text-[10px] text-gray-400 font-medium px-1 italic">Use apenas letras, números e hifens.</p>
              </div>
              <button 
                onClick={() => setIsDomainModalOpen(false)}
                className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all"
              >
                Confirmar Domínio
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Tipografia */}
      {isFontModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-lg rounded-[40px] shadow-2xl overflow-hidden border border-gray-100 animate-in zoom-in-95">
            <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-600 rounded-2xl text-white shadow-lg"><Type className="w-6 h-6" /></div>
                <div>
                  <h3 className="text-xl font-black text-gray-900 tracking-tight">Tipografia do Sistema</h3>
                  <p className="text-xs text-gray-500 font-medium">Escolha a fonte que melhor representa sua marca.</p>
                </div>
              </div>
              <button onClick={() => setIsFontModalOpen(false)} className="p-2 hover:bg-white rounded-full text-gray-400"><X className="w-6 h-6" /></button>
            </div>
            <div className="p-8 grid grid-cols-2 gap-4">
              {fonts.map((f) => (
                <button
                  key={f.name}
                  onClick={() => setSelectedFont(f.name)}
                  className={`p-6 rounded-[28px] border-2 transition-all flex flex-col items-center gap-3 group ${
                    selectedFont === f.name ? 'border-blue-600 bg-blue-50/50' : 'border-gray-50 hover:border-blue-200 bg-white'
                  }`}
                >
                  <span className="text-3xl font-bold text-gray-900" style={{ fontFamily: f.family }}>Aa</span>
                  <span className="text-xs font-black uppercase tracking-widest text-gray-400 group-hover:text-blue-600">{f.name}</span>
                  {selectedFont === f.name && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                </button>
              ))}
              <div className="col-span-2 pt-4">
                <button 
                  onClick={() => setIsFontModalOpen(false)}
                  className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all"
                >
                  Aplicar Tipografia
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-xl transition-all">
            <ArrowLeft className="w-6 h-6 text-gray-400" />
          </button>
          <div>
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">Marca e Personalização</h2>
            <p className="text-gray-500 font-medium">Deixe o ServiçoPro com a cara da sua empresa.</p>
          </div>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-sm shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
        >
          {isSaving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {isSaving ? 'Salvando...' : 'Salvar Alterações'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Upload da Logo */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Logo da Empresa</h4>
                <div className="relative aspect-video rounded-[24px] border-2 border-dashed border-gray-100 bg-gray-50 group hover:border-blue-300 transition-all overflow-hidden">
                  {logo ? (
                    <div className="relative w-full h-full p-6 flex items-center justify-center bg-white group/preview">
                      <img src={logo} alt="Logo Preview" className="max-w-full max-h-full object-contain" />
                      <button 
                        onClick={removeLogo}
                        className="absolute top-4 right-4 p-2 bg-red-50 text-red-500 rounded-xl opacity-0 group-hover/preview:opacity-100 transition-opacity hover:bg-red-100 shadow-sm"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <label className="w-full h-full flex flex-col items-center justify-center gap-3 cursor-pointer">
                      <input 
                        type="file" 
                        className="hidden" 
                        accept="image/png,image/svg+xml,image/jpeg"
                        onChange={handleLogoUpload} 
                      />
                      <div className="p-4 bg-white rounded-2xl shadow-sm group-hover:scale-110 transition-transform">
                        {isUploading ? (
                          <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <Upload className="w-6 h-6 text-gray-300 group-hover:text-blue-600" />
                        )}
                      </div>
                      <p className="text-[10px] font-black text-gray-400 group-hover:text-blue-600 uppercase tracking-widest">
                        {isUploading ? 'Processando...' : 'Upload PNG/SVG'}
                      </p>
                    </label>
                  )}
                </div>
              </div>

              {/* Seletor de Cores */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Cor Principal (Brand Color)</h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-16 h-16 rounded-[20px] shadow-inner border-4 border-white transition-colors duration-500 shrink-0"
                      style={{ backgroundColor: primaryColor }}
                    />
                    <div className="flex-1">
                      <input 
                        type="text" 
                        value={primaryColor} 
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm font-mono font-bold focus:ring-2 focus:ring-blue-500 outline-none shadow-inner"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'].map(c => (
                      <button 
                        key={c}
                        onClick={() => setPrimaryColor(c)}
                        className={`aspect-square rounded-lg border-2 shadow-sm transition-all hover:scale-110 ${
                          primaryColor.toLowerCase() === c.toLowerCase() ? 'border-gray-900 scale-110' : 'border-white'
                        }`}
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-gray-50 space-y-6">
              <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Customização do Portal</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div 
                  onClick={() => setIsDomainModalOpen(true)}
                  className="p-5 rounded-3xl bg-gray-50 border border-transparent hover:border-blue-200 transition-all flex items-center justify-between gap-4 group cursor-pointer"
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-gray-400 group-hover:text-blue-600 transition-colors shadow-sm shrink-0">
                      <Globe className="w-6 h-6" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-black text-gray-800 truncate">Domínio Customizado</p>
                      <p className="text-[10px] text-gray-400 font-bold truncate">{customDomain}.servicopro.com.br</p>
                    </div>
                  </div>
                  <button className="shrink-0 text-[10px] font-black text-blue-600 uppercase tracking-widest flex items-center gap-1 group-hover:scale-105 transition-transform">
                    Configurar <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
                <div 
                  onClick={() => setIsFontModalOpen(true)}
                  className="p-5 rounded-3xl bg-gray-50 border border-transparent hover:border-blue-200 transition-all flex items-center justify-between gap-4 group cursor-pointer"
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-gray-400 group-hover:text-blue-600 transition-colors shadow-sm shrink-0">
                      <Type className="w-6 h-6" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-black text-gray-800 truncate">Tipografia</p>
                      <p className="text-[10px] text-gray-400 font-bold truncate">{selectedFont} (Ativo)</p>
                    </div>
                  </div>
                  <button className="shrink-0 text-[10px] font-black text-blue-600 uppercase tracking-widest flex items-center gap-1 group-hover:scale-105 transition-transform">
                    Alterar <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-900 rounded-[40px] p-8 text-white relative overflow-hidden shadow-2xl">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
             <div className="flex items-center gap-2 mb-6">
                <Eye className="w-4 h-4 text-blue-400" />
                <h4 className="text-[10px] font-black uppercase tracking-widest">Pré-visualização (Live)</h4>
             </div>
             
             {/* Mock de Celular Interativo */}
             <div className="max-w-[210px] mx-auto border-[6px] border-gray-800 rounded-[36px] overflow-hidden bg-white aspect-[9/18.5] relative shadow-2xl group/phone">
                <div className="h-4 bg-gray-800 w-24 mx-auto rounded-b-xl absolute top-0 left-1/2 -translate-x-1/2 z-30"></div>
                
                {/* Tela do Celular */}
                <div 
                  className="h-full flex flex-col transition-all duration-500 relative" 
                  style={{ fontFamily: fonts.find(f => f.name === selectedFont)?.family }}
                >
                  {/* Header Mock */}
                  <div className="p-4 pt-8 flex items-center gap-2 border-b border-gray-50 bg-white">
                    {mockView !== 'home' && (
                      <button onClick={() => setMockView('home')} className="p-1 hover:bg-gray-50 rounded-lg">
                        <ArrowLeft className="w-4 h-4 text-gray-400" />
                      </button>
                    )}
                    <div 
                      className="w-7 h-7 rounded-lg shadow-sm flex items-center justify-center text-white text-[9px] font-black overflow-hidden bg-white border border-gray-50 shrink-0"
                      style={{ backgroundColor: !logo ? primaryColor : 'white' }}
                    >
                      {logo ? <img src={logo} className="w-full h-full object-contain" /> : 'SP'}
                    </div>
                    <div className="space-y-0.5 flex-1 min-w-0">
                       <div className="h-2 w-16 bg-gray-100 rounded"></div>
                       <div className="h-1.5 w-10 bg-gray-50 rounded"></div>
                    </div>
                  </div>

                  {/* Conteúdo Dinâmico */}
                  <div className="flex-1 p-4 overflow-hidden relative">
                    {mockView === 'home' && (
                      <div className="space-y-4 animate-in fade-in zoom-in-95">
                        <div className="h-24 w-full bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-center relative overflow-hidden group/card">
                          <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover/card:opacity-100 transition-opacity"></div>
                          <div 
                            className="w-8 h-8 rounded-full shadow-lg flex items-center justify-center text-white transition-all duration-500"
                            style={{ backgroundColor: primaryColor }}
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </div>
                        </div>
                        <div className="space-y-2">
                           <div className="h-2 w-full bg-gray-100 rounded"></div>
                           <div className="h-2 w-full bg-gray-100 rounded"></div>
                           <div className="h-2 w-2/3 bg-gray-100 rounded"></div>
                        </div>
                        <button 
                          onClick={() => setMockView('form')}
                          className="h-11 w-full rounded-xl shadow-md flex items-center justify-center text-white text-[10px] font-black uppercase transition-all hover:brightness-110 active:scale-95"
                          style={{ backgroundColor: primaryColor }}
                        >
                          Solicitar agora
                        </button>
                      </div>
                    )}

                    {mockView === 'form' && (
                      <div className="space-y-4 animate-in slide-in-from-right-4">
                        <h5 className="text-[10px] font-black text-gray-800 uppercase tracking-widest">Nova Solicitação</h5>
                        <div className="space-y-2">
                          <div className="h-8 w-full bg-gray-50 rounded-lg border border-gray-100"></div>
                          <div className="h-20 w-full bg-gray-50 rounded-lg border border-gray-100"></div>
                          <div className="h-8 w-full bg-gray-50 rounded-lg border border-gray-100"></div>
                        </div>
                        <button 
                          onClick={() => setMockView('home')}
                          className="h-11 w-full rounded-xl text-white text-[10px] font-black uppercase flex items-center justify-center gap-2"
                          style={{ backgroundColor: primaryColor }}
                        >
                          <Send className="w-3 h-3" /> Enviar Pedido
                        </button>
                      </div>
                    )}

                    {mockView === 'ai' && (
                      <div className="space-y-4 animate-in slide-in-from-bottom-4 flex flex-col h-full pb-10">
                        <div className="flex-1 space-y-3">
                          <div className="bg-gray-100 p-2 rounded-xl rounded-tl-none w-4/5 text-[9px] font-medium leading-tight">Olá! Em que posso ajudar?</div>
                          <div 
                            className="p-2 rounded-xl rounded-tr-none w-4/5 ml-auto text-white text-[9px] font-medium leading-tight"
                            style={{ backgroundColor: primaryColor }}
                          >
                            Preciso de uma revisão na bomba d'água.
                          </div>
                          <div className="bg-gray-100 p-2 rounded-xl rounded-tl-none w-full text-[9px] font-medium leading-tight border-l-2 border-blue-500">
                            <b>Sugestão IA:</b> Baseado no histórico, agendar para amanhã às 14h?
                          </div>
                        </div>
                        <div className="h-8 w-full bg-gray-50 rounded-full border border-gray-100 flex items-center px-3 mt-auto">
                          <div className="h-1.5 w-12 bg-gray-200 rounded"></div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Floating AI Button no Mock */}
                  <button 
                    onClick={() => setMockView(mockView === 'ai' ? 'home' : 'ai')}
                    className="absolute bottom-4 right-4 w-10 h-10 rounded-full shadow-2xl flex items-center justify-center text-white transition-all hover:scale-110 active:scale-90 z-20"
                    style={{ backgroundColor: primaryColor }}
                  >
                    {mockView === 'ai' ? <X className="w-5 h-5" /> : <Sparkles className="w-5 h-5 fill-current" />}
                    <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-20"></div>
                  </button>
                </div>
             </div>
             
             <div className="flex items-center justify-center gap-2 mt-6">
                <MousePointer2 className="w-3 h-3 text-blue-400" />
                <p className="text-[10px] font-medium text-gray-500">Clique no mock para interagir</p>
             </div>
          </div>

          <div className="bg-blue-50 p-8 rounded-[40px] border border-blue-100 group hover:bg-blue-100/50 transition-colors">
             <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-600 rounded-xl text-white shrink-0">
                   <Layout className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-black text-blue-900 leading-tight">Marca Própria</h4>
             </div>
             <p className="text-sm text-blue-700 leading-relaxed font-medium">
               A personalização automática do portal eleva o valor percebido do seu serviço em até 40% na primeira impressão do cliente.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandingConfig;
