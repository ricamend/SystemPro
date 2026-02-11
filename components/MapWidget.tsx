
import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Maximize2, MapPin, Navigation, User, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface MapPoint {
  id: string;
  name: string;
  status: string;
  lat: number;
  lng: number;
  type: 'tech' | 'os';
  color: string;
}

const MapWidget: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Record<string, L.Marker>>({});
  const navigate = useNavigate();

  const [points, setPoints] = useState<MapPoint[]>([
    { id: 't1', name: 'Carlos Lima', status: 'Em Rota', lat: -23.5505, lng: -46.6333, type: 'tech', color: '#3b82f6' },
    { id: 't2', name: 'Ana Souza', status: 'Atendimento', lat: -23.5596, lng: -46.6583, type: 'tech', color: '#f59e0b' },
    { id: 'os1', name: 'OS #5495', status: 'Pendente', lat: -23.5611, lng: -46.6622, type: 'os', color: '#ef4444' },
    { id: 'os2', name: 'OS #5498', status: 'Agendada', lat: -23.5422, lng: -46.6211, type: 'os', color: '#8b5cf6' },
  ]);

  // Inicialização do Mapa
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: false
    }).setView([-23.5505, -46.6333], 13);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
    }).addTo(map);

    mapInstanceRef.current = map;

    // CRITICAL FIX: Invalidate size after a small delay to ensure container is ready
    setTimeout(() => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    }, 200);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Gerenciamento de Marcadores
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    const map = mapInstanceRef.current;

    points.forEach(point => {
      const iconHtml = `
        <div style="background-color: ${point.color}; width: 22px; height: 22px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 6px rgba(0,0,0,0.2); display: flex; align-items: center; justify-content: center; color: white; position: relative;">
          ${point.type === 'tech' ? '<div class="marker-pulse" style="background-color: ' + point.color + '"></div>' : ''}
          <span style="font-size: 10px; font-weight: 900;">${point.type === 'tech' ? 'T' : '!'}</span>
        </div>
      `;

      const icon = L.divIcon({
        className: 'custom-div-icon',
        html: iconHtml,
        iconSize: [22, 22],
        iconAnchor: [11, 11]
      });

      if (markersRef.current[point.id]) {
        markersRef.current[point.id].setLatLng([point.lat, point.lng]);
      } else {
        const marker = L.marker([point.lat, point.lng], { icon })
          .addTo(map)
          .bindPopup(`
            <div class="p-2">
              <p class="font-black text-xs text-gray-900 m-0">${point.name}</p>
              <p class="font-bold text-[10px] text-gray-400 uppercase m-0">${point.status}</p>
            </div>
          `);
        markersRef.current[point.id] = marker;
      }
    });
  }, [points]);

  // Simulação de Movimento
  useEffect(() => {
    const interval = setInterval(() => {
      setPoints(currentPoints => 
        currentPoints.map(p => {
          if (p.type === 'tech') {
            return {
              ...p,
              lat: p.lat + (Math.random() - 0.5) * 0.0005,
              lng: p.lng + (Math.random() - 0.5) * 0.0005
            };
          }
          return p;
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full min-h-[350px]">
      <div className="p-5 border-b border-gray-50 flex items-center justify-between bg-white z-10">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600 rounded-xl text-white shadow-lg shadow-blue-100">
            <Navigation className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-black text-gray-900 tracking-tight">Rastreamento Live</h3>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Sincronizado via GPS</p>
            </div>
          </div>
        </div>
        <button 
          onClick={() => navigate('/map-dashboard')}
          className="p-2.5 hover:bg-gray-50 rounded-xl text-gray-400 hover:text-blue-600 transition-all border border-transparent hover:border-gray-100"
          title="Ver em tela cheia"
        >
          <Maximize2 className="w-4.5 h-4.5" />
        </button>
      </div>
      
      <div className="flex-1 relative min-h-0">
        <div ref={mapContainerRef} className="absolute inset-0 z-0" />
        
        {/* Floating Legend */}
        <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md p-3 rounded-2xl border border-white/50 shadow-xl space-y-2 pointer-events-none">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-sm"></div>
            <span className="text-[9px] font-black text-gray-600 uppercase">Técnicos em Rota</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-sm"></div>
            <span className="text-[9px] font-black text-gray-600 uppercase">OS Pendentes</span>
          </div>
        </div>

        {/* Floating Quick Stats */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 bg-gray-900/90 backdrop-blur-md px-4 py-2 rounded-full shadow-2xl border border-white/10 flex items-center gap-6 pointer-events-none">
           <div className="flex items-center gap-2">
             <User className="w-3 h-3 text-blue-400" />
             <span className="text-[10px] font-black text-white uppercase tracking-widest">2 Ativos</span>
           </div>
           <div className="w-px h-3 bg-white/20"></div>
           <div className="flex items-center gap-2">
             <MapPin className="w-3 h-3 text-red-400" />
             <span className="text-[10px] font-black text-white uppercase tracking-widest">2 Ordens</span>
           </div>
        </div>
      </div>
      
      <div className="p-4 bg-gray-50/50 border-t border-gray-100 flex justify-center z-10">
        <button 
          onClick={() => navigate('/map-dashboard')}
          className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline flex items-center gap-2"
        >
          <Zap className="w-3 h-3" /> Acessar Dashboard BI de Logística
        </button>
      </div>
    </div>
  );
};

export default MapWidget;
