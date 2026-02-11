
import React, { useState } from 'react';
import { MapPin, Clock, CheckCircle2, Play, AlertCircle, Navigation, Loader2 } from 'lucide-react';
import { osService } from '../services/osService';
import { logService } from '../services/logService';

interface Props {
  osId: string;
  onStatusChange?: (newStatus: string) => void;
}

const CheckInOut: React.FC<Props> = ({ osId, onStatusChange }) => {
  const [status, setStatus] = useState<'idle' | 'en_route' | 'working' | 'finished'>('idle');
  const [startTime, setStartTime] = useState<string | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);

  const captureLocation = (): Promise<{ lat: number; lng: number }> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocalização não suportada"));
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setCoords({ lat, lng });
          resolve({ lat, lng });
        },
        (error) => reject(error),
        { enableHighAccuracy: true }
      );
    });
  };

  const handleAction = async () => {
    setIsLocating(true);
    try {
      if (status === 'idle') {
        const location = await captureLocation();
        setStatus('en_route');
        logService.addLog({
          target_id: osId,
          target_type: 'service_order',
          action: 'Técnico iniciou deslocamento (GPS)',
          type: 'status',
          new_value: 'scheduled'
        });
        if (onStatusChange) onStatusChange('scheduled');
      } else if (status === 'en_route') {
        const location = await captureLocation();
        setStatus('working');
        setStartTime(new Date().toLocaleTimeString());
        logService.addLog({
          target_id: osId,
          target_type: 'service_order',
          action: 'Check-in realizado no local do cliente',
          type: 'status',
          new_value: 'in_progress'
        });
        if (onStatusChange) onStatusChange('in_progress');
      } else if (status === 'working') {
        const location = await captureLocation();
        setStatus('finished');
        logService.addLog({
          target_id: osId,
          target_type: 'service_order',
          action: 'Check-out técnico realizado',
          type: 'status',
          new_value: 'completed'
        });
        if (onStatusChange) onStatusChange('completed');
      }
    } catch (err) {
      console.error("Falha ao capturar localização:", err);
      alert("Permita o acesso à sua localização GPS para registrar o ponto.");
    } finally {
      setIsLocating(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-xl space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-xl ${
            status === 'working' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'
          }`}>
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-black text-gray-900 uppercase tracking-tight">Registro de Ponto OS</h4>
            <p className="text-[10px] text-gray-400 font-bold uppercase">GPS Ativo • OS #{osId}</p>
          </div>
        </div>
        {status === 'working' && (
          <div className="flex items-center gap-1.5 bg-emerald-50 px-3 py-1 rounded-full animate-pulse">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
            <span className="text-[10px] font-black text-emerald-700 uppercase">Trabalhando</span>
          </div>
        )}
      </div>

      <div className="p-4 bg-gray-50 rounded-2xl space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-400 font-bold uppercase tracking-widest">Horário de Início</span>
          <span className="text-gray-900 font-black">{startTime || '--:--'}</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-400 font-bold uppercase tracking-widest">Coordenadas</span>
          <span className="text-blue-600 font-black flex items-center gap-1">
            {coords ? `${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}` : 'Aguardando...'}
          </span>
        </div>
      </div>

      <button 
        onClick={handleAction}
        disabled={status === 'finished' || isLocating}
        className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-2 ${
          isLocating ? 'bg-gray-200 text-gray-400' :
          status === 'idle' ? 'bg-blue-600 text-white hover:bg-blue-700' :
          status === 'en_route' ? 'bg-amber-500 text-white hover:bg-amber-600' :
          status === 'working' ? 'bg-red-500 text-white hover:bg-red-600' :
          'bg-gray-100 text-gray-400 cursor-not-allowed'
        }`}
      >
        {isLocating ? (
          <><Loader2 className="w-4 h-4 animate-spin" /> Sincronizando GPS...</>
        ) : (
          <>
            {status === 'idle' && <><Navigation className="w-4 h-4" /> Iniciar Deslocamento</>}
            {status === 'en_route' && <><Play className="w-4 h-4" /> Marcar Chegada</>}
            {status === 'working' && <><CheckCircle2 className="w-4 h-4" /> Finalizar Atendimento</>}
            {status === 'finished' && 'Serviço Concluído'}
          </>
        )}
      </button>
    </div>
  );
};

export default CheckInOut;
