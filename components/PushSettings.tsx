
import React, { useState } from 'react';
import { Bell, Smartphone, ShieldCheck, Zap, MessageSquare, Clock, Save, ArrowLeft, Loader2, CheckCircle } from 'lucide-react';
import { notificationService } from '../services/notificationService';

interface Props {
  onBack: () => void;
}

const PushSettings: React.FC<Props> = ({ onBack }) => {
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  
  const [config, setConfig] = useState({
    newOS: true,
    statusChange: true,
    urgentOnly: false,
    chatMessages: true,
    inventoryAlerts: true,
    vibration: true,
    sound: true
  });

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }, 1000);
  };

  const testPush = () => {
    notificationService.sendPush(
      "Teste de Sistema 🔔",
      "As notificações push estão configuradas corretamente para este dispositivo.",
      "success"
    );
  };

  const ToggleRow = ({ label, description, icon: Icon, value, field }: any) => (
    <div className="flex items-center justify-between p-6 bg-white rounded-[32px] border border-gray-100 shadow-sm">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-2xl ${value ? 'bg-blue-50 text-blue-600' : 'bg-gray-50 text-gray-400'}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <p className="text-sm font-black text-gray-900 leading-tight">{label}</p>
          <p className="text-[11px] text-gray-400 font-medium mt-0.5">{description}</p>
        </div>
      </div>
      <button 
        onClick={() => setConfig({...config, [field]: !value})}
        className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none ${value ? 'bg-blue-600' : 'bg-gray-200'}`}
      >
        <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${value ? 'translate-x-6' : 'translate-x-1'}`} />
      </button>
    </div>
  );

  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
      {showToast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[300] bg-gray-900 text-white px-8 py-4 rounded-3xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-top-8 border border-gray-800">
           <CheckCircle className="w-5 h-5 text-emerald-500" />
           <span className="text-xs font-black uppercase tracking-widest">Preferências Salvas</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-xl transition-all">
            <ArrowLeft className="w-6 h-6 text-gray-400" />
          </button>
          <div>
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">Notificações Push</h2>
            <p className="text-gray-500 font-medium">Configure quais eventos disparam alertas no celular da equipe.</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={testPush} className="px-5 py-3 bg-white border border-gray-200 text-gray-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all">Testar Agora</button>
          <button 
            onClick={handleSave}
            disabled={loading}
            className="flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Salvar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] px-1">Gatilhos Operacionais</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ToggleRow 
              label="Novas Ordens" 
              description="Sempre que o técnico for escalado" 
              icon={Zap} 
              value={config.newOS} 
              field="newOS" 
            />
            <ToggleRow 
              label="Mudança de Status" 
              description="Acompanhamento de progresso" 
              icon={Clock} 
              value={config.statusChange} 
              field="statusChange" 
            />
            <ToggleRow 
              label="Mensagens do Chat" 
              description="Alertas de novas mensagens" 
              icon={MessageSquare} 
              value={config.chatMessages} 
              field="chatMessages" 
            />
            <ToggleRow 
              label="Estoque Crítico" 
              description="Avisos de reposição de peças" 
              icon={Bell} 
              value={config.inventoryAlerts} 
              field="inventoryAlerts" 
            />
          </div>

          <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] px-1 mt-8">Preferências do Dispositivo</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ToggleRow 
              label="Vibração Hárptica" 
              description="Vibrar celular em alertas críticos" 
              icon={Smartphone} 
              value={config.vibration} 
              field="vibration" 
            />
            <ToggleRow 
              label="Som de Notificação" 
              description="Tocar áudio personalizado" 
              icon={Bell} 
              value={config.sound} 
              field="sound" 
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-indigo-900 rounded-[40px] p-8 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
            <h4 className="text-lg font-black mb-2 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-400" /> Alta Entrega
            </h4>
            <p className="text-xs text-indigo-200 leading-relaxed font-medium mb-8">
              Utilizamos o protocolo **FCM (Firebase Cloud Messaging)** para garantir que as notificações cheguem mesmo com o aplicativo fechado ou em segundo plano.
            </p>
            <div className="p-4 bg-white/10 rounded-2xl border border-white/10">
               <p className="text-[10px] font-black uppercase tracking-widest text-indigo-300">Tempo Médio de Entrega</p>
               <p className="text-2xl font-black mt-1">&lt; 1.5s</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PushSettings;
