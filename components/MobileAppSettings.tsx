
import React, { useState } from 'react';
import { 
  Smartphone, 
  ArrowLeft, 
  Save, 
  Camera, 
  MapPin, 
  Wifi, 
  ShieldCheck, 
  Clock, 
  Loader2, 
  CheckCircle,
  PenTool,
  RotateCcw
} from 'lucide-react';

interface Props {
  onBack: () => void;
}

const Toggle = ({ enabled, onChange, label, description, icon: Icon }: any) => (
  <div className="flex items-center justify-between p-6 bg-white rounded-[32px] border border-gray-100 shadow-sm hover:shadow-md transition-all group">
    <div className="flex items-center gap-4">
      <div className={`p-3 rounded-2xl transition-colors ${enabled ? 'bg-blue-50 text-blue-600' : 'bg-gray-50 text-gray-400'}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-sm font-black text-gray-900 leading-tight">{label}</p>
        <p className="text-[11px] text-gray-400 font-medium mt-0.5">{description}</p>
      </div>
    </div>
    <button 
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none ${enabled ? 'bg-blue-600' : 'bg-gray-200'}`}
    >
      <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
  </div>
);

const MobileAppSettings: React.FC<Props> = ({ onBack }) => {
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({
    requirePhotoEntry: true,
    requirePhotoExit: true,
    requireSignature: true,
    offlineMode: true,
    gpsInterval: '5',
    cacheExpiry: '24'
  });

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onBack();
    }, 1200);
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-xl transition-all">
            <ArrowLeft className="w-6 h-6 text-gray-400" />
          </button>
          <div>
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">App Mobile</h2>
            <p className="text-gray-500 font-medium">Configurações para o aplicativo do técnico em campo.</p>
          </div>
        </div>
        <button 
          onClick={handleSave}
          disabled={loading}
          className="flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Salvar Regras
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] px-1">Protocolos de Campo</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Toggle 
              label="Foto na Entrada" 
              description="Exigir foto ao iniciar a OS" 
              icon={Camera}
              enabled={settings.requirePhotoEntry}
              onChange={(val: boolean) => setSettings({...settings, requirePhotoEntry: val})}
            />
            <Toggle 
              label="Foto na Saída" 
              description="Exigir foto para concluir OS" 
              icon={CheckCircle}
              enabled={settings.requirePhotoExit}
              onChange={(val: boolean) => setSettings({...settings, requirePhotoExit: val})}
            />
            <Toggle 
              label="Assinatura Digital" 
              description="Obrigar coleta de assinatura" 
              icon={PenTool}
              enabled={settings.requireSignature}
              onChange={(val: boolean) => setSettings({...settings, requireSignature: val})}
            />
            <Toggle 
              label="Sincronização Offline" 
              description="Permitir trabalho sem internet" 
              icon={Wifi}
              enabled={settings.offlineMode}
              onChange={(val: boolean) => setSettings({...settings, offlineMode: val})}
            />
          </div>

          <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-8">
            <div className="flex items-center gap-3">
               <div className="p-2.5 bg-indigo-50 rounded-xl text-indigo-600"><MapPin className="w-5 h-5" /></div>
               <h3 className="text-lg font-black text-gray-900 tracking-tight">Rastreamento e GPS</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Intervalo de Localização</label>
                  <select 
                    value={settings.gpsInterval}
                    onChange={(e) => setSettings({...settings, gpsInterval: e.target.value})}
                    className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none appearance-none"
                  >
                    <option value="1">Tempo Real (1 min)</option>
                    <option value="5">Alta Precisão (5 min)</option>
                    <option value="15">Equilibrado (15 min)</option>
                    <option value="30">Economia (30 min)</option>
                  </select>
                  <p className="text-[10px] text-gray-400 font-medium px-1 italic leading-relaxed">
                    Intervalos menores consomem mais bateria, mas oferecem roteirização mais precisa.
                  </p>
               </div>

               <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Expiração de Cache</label>
                  <select 
                    value={settings.cacheExpiry}
                    onChange={(e) => setSettings({...settings, cacheExpiry: e.target.value})}
                    className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none appearance-none"
                  >
                    <option value="12">12 Horas</option>
                    <option value="24">24 Horas (Padrão)</option>
                    <option value="48">48 Horas</option>
                    <option value="72">72 Horas</option>
                  </select>
                  <p className="text-[10px] text-gray-400 font-medium px-1 italic leading-relaxed">
                    Tempo que os dados da OS permanecem no dispositivo após a conclusão.
                  </p>
               </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-900 p-8 rounded-[40px] text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-110 transition-transform"></div>
            <Smartphone className="w-10 h-10 mb-6 text-blue-400" />
            <h4 className="text-xl font-black mb-2">Segurança do App</h4>
            <p className="text-xs text-gray-400 leading-relaxed font-medium mb-8">
              Configure biometria obrigatória ou bloqueio automático por inatividade para proteger os dados sensíveis dos clientes em campo.
            </p>
            <button className="w-full py-4 border border-white/20 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">Configurar Autenticação</button>
          </div>

          <div className="p-6 bg-blue-50 rounded-[32px] border border-blue-100 flex items-start gap-4">
             <ShieldCheck className="w-6 h-6 text-blue-600 shrink-0" />
             <p className="text-[11px] text-blue-800 font-medium leading-relaxed">
               As alterações nas regras de campo são aplicadas aos técnicos assim que eles realizarem a próxima sincronização manual ou abertura do app.
             </p>
          </div>

          <div className="p-6 bg-gray-50 rounded-[32px] border border-gray-100 flex items-center justify-between">
             <div className="flex items-center gap-3">
                <RotateCcw className="w-4 h-4 text-gray-400" />
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Versão Mínima</span>
             </div>
             <span className="text-xs font-black text-gray-900">v2.4.8</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileAppSettings;
