
import React from 'react';
import { 
  Bell, 
  X, 
  Check, 
  AlertCircle, 
  Info, 
  Clock, 
  ArrowRight,
  Settings
} from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  time: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  { id: '1', title: 'Nova OS Atribuída', message: 'Você foi atribuído à OS #5492 pelo Admin.', type: 'info', time: '5 min atrás', read: false },
  { id: '2', title: 'Pagamento Confirmado', message: 'O cliente Condomínio Solar pagou a fatura da OS #5310.', type: 'success', time: '1 hora atrás', read: false },
  { id: '3', title: 'Estoque Baixo', message: 'O item "Válvula Esfera 3/4" atingiu o nível crítico.', type: 'warning', time: '3 horas atrás', read: true },
  { id: '4', title: 'Atraso detectado', message: 'O técnico Carlos Lima não iniciou a OS #5490 no horário.', type: 'error', time: '5 horas atrás', read: true },
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationCenter: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
      
      <div className="absolute top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl animate-in slide-in-from-right duration-300">
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-xl">
                <Bell className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-black text-gray-900 tracking-tight">Notificações</h3>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Central de Alertas</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-3">
            <div className="flex items-center justify-between px-2 mb-2">
              <span className="text-[10px] font-bold text-gray-400 uppercase">Recentes</span>
              <button className="text-[10px] font-bold text-blue-600 hover:underline">Marcar todas como lidas</button>
            </div>

            {mockNotifications.map((notification) => (
              <div 
                key={notification.id}
                className={`p-4 rounded-2xl border transition-all cursor-pointer group ${
                  notification.read ? 'bg-white border-gray-50' : 'bg-blue-50/30 border-blue-100'
                } hover:border-blue-300`}
              >
                <div className="flex gap-4">
                  <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${
                    notification.type === 'info' ? 'bg-blue-500' :
                    notification.type === 'success' ? 'bg-emerald-500' :
                    notification.type === 'warning' ? 'bg-amber-500' : 'bg-red-500'
                  }`} />
                  <div className="flex-1">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className={`text-sm font-bold ${notification.read ? 'text-gray-700' : 'text-gray-900'}`}>
                        {notification.title}
                      </h4>
                      <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap">{notification.time}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                      {notification.message}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {mockNotifications.length === 0 && (
              <div className="flex flex-col items-center justify-center h-40 text-gray-400">
                <Bell className="w-12 h-12 mb-4 opacity-10" />
                <p className="text-sm font-medium">Nenhuma notificação por enquanto.</p>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-gray-100 bg-gray-50">
            <button className="w-full flex items-center justify-center gap-2 py-3 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100 transition-all">
              <Settings className="w-4 h-4" />
              Configurar Notificações
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationCenter;
