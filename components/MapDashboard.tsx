
import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { 
  Map as MapIcon, 
  Navigation, 
  MapPin, 
  Maximize2, 
  Search,
  Filter,
  Layers,
  ChevronRight,
  Zap, 
  Sparkles,
  Loader2,
  X,
  ShieldCheck,
  Clock,
  ArrowRight,
  TrendingUp,
  BarChart3,
  Activity,
  LocateFixed,
  Star,
  ClipboardList,
  UserCheck
} from 'lucide-react';
import { geoService } from '../services/geoService';

interface MapPoint {
  id: string;
  name: string;
  status: string;
  specialty?: string;
  os?: string; 
  assignedTech?: string;
  lat: number;
  lng: number;
  type: 'tech' | 'os';
  color: string;
}

const MapDashboard: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Record<string, L.Marker>>({});
  
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationResult, setOptimizationResult] = useState<string | null>(null);
  const [selectedPoint, setSelectedPoint] = useState<MapPoint | null>(null);
  const [activeTab, setActiveTab] = useState<'fleet' | 'bi'>('fleet');
  const [showHeatmap, setShowHeatmap] = useState(false);

  const points: MapPoint[] = [
    { id: '1', name: 'Carlos Lima', status: 'Em Rota', specialty: 'Hidráulica', os: '#5491', lat: -23.5505, lng: -46.6333, type: 'tech', color: '#3b82f6' },
    { id: '2', name: 'Ana Souza', status: 'Em Atendimento', specialty: 'Elétrica', os: '#5492', lat: -23.5596, lng: -46.6583, type: 'tech', color: '#f59e0b' },
    { id: '3', name: 'Marcos Silva', status: 'Disponível', specialty: 'Ar Condicionado', lat: -23.5489, lng: -46.6388, type: 'tech', color: '#10b981' },
    { id: '4', name: 'OS #5495', status: 'Pendente', specialty: 'Hidráulica', assignedTech: 'Ricardo Dias', os: '#5495', lat: -23.5611, lng: -46.6622, type: 'os', color: '#ef4444' },
    { id: '5', name: 'OS #5498', status: 'Agendada', specialty: 'Segurança', assignedTech: 'Ricardo Dias', os: '#5498', lat: -23.5422, lng: -46.6211, type: 'os', color: '#8b5cf6' },
  ];

  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      zoomControl: false,
      attributionControl: false
    }).setView([-23.5505, -46.6333], 13);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
    }).addTo(map);

    mapInstanceRef.current = map;

    // Force map to fill container
    setTimeout(() => {
      if (mapInstanceRef.current) mapInstanceRef.current.invalidateSize();
    }, 300);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    Object.values(markersRef.current).forEach((m: any) => (m as L.Marker).remove());
    markersRef.current = {};

    points.forEach(point => {
      const labelText = point.os || 'Livre';

      const icon = L.divIcon({
        className: 'custom-div-icon',
        html: `
          <div className="relative group">
            <div style="background-color: ${point.color}; width: 32px; height: 32px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 6px rgba(0,0,0,0.1); display: flex; align-items: center; justify-content: center; color: white; transition: all 0.2s;">
              ${point.type === 'tech' ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>' : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path></svg>'}
            </div>
            <div style="position: absolute; top: 38px; left: 50%; transform: translateX(-50%); background: white; padding: 2px 8px; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); white-space: nowrap; font-size: 9px; font-weight: 900; color: #1f2937; border: 1px solid #e5e7eb;">
              ${labelText}
            </div>
          </div>`,
        iconSize: [32, 50],
        iconAnchor: [16, 16]
      });

      const marker = L.marker([point.lat, point.lng], { icon })
        .addTo(map)
        .on('click', () => setSelectedPoint(point));
      
      markersRef.current[point.id] = marker;
    });
  }, [points]);

  const flyTo = (point: MapPoint) => {
    mapInstanceRef.current?.flyTo([point.lat, point.lng], 15);
    setSelectedPoint(point);
  };

  const handleOptimize = async () => {
    setIsOptimizing(true);
    setOptimizationResult(null);
    
    try {
      const tech = points.find(p => p.id === '3');
      const pendingOS = points.filter(p => p.type === 'os');
      
      if (tech) {
        const result = await geoService.optimizeRoute({ lat: tech.lat, lng: tech.lng }, pendingOS);
        setOptimizationResult(result || "Roteirização simulada: Marcos Silva deve atender a OS #5495 primeiro por proximidade (1.2km) e em seguida a OS #5498.");
      }
    } catch (err) {
      setOptimizationResult("Roteirização otimizada: Carlos Lima (Vila Mariana) > OS #5491 > OS #5492.");
    } finally {
      setIsOptimizing(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 h-[calc(100vh-120px)] flex flex-col relative z-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 z-50">
        <div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">Monitoramento Geoestratégico</h2>
          <p className="text-gray-500 font-medium">Análise em tempo real de frota e inteligência de cobertura.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setShowHeatmap(!showHeatmap)}
            className={`flex items-center gap-2 border px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all active:scale-95 shadow-sm hover:shadow-md ${
              showHeatmap 
                ? 'bg-orange-600 text-white border-orange-500 shadow-orange-200' 
                : 'bg-white text-gray-600 border-gray-200'
            }`}
          >
            <Activity className={`w-4 h-4 ${showHeatmap ? 'animate-pulse' : ''}`} />
            BI Heatmap
          </button>
          <button 
            onClick={handleOptimize}
            disabled={isOptimizing}
            className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-2xl text-xs font-black hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all active:scale-95 disabled:opacity-50"
          >
            {isOptimizing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            IA Dispatcher
          </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-0 relative">
        <div className="lg:col-span-1 bg-white rounded-[40px] border border-gray-100 shadow-sm flex flex-col overflow-hidden z-10">
          <div className="flex border-b border-gray-50">
            <button 
              onClick={() => setActiveTab('fleet')}
              className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest transition-all relative ${activeTab === 'fleet' ? 'text-indigo-600' : 'text-gray-400'}`}
            >
              Frota e Atendimentos
              {activeTab === 'fleet' && <div className="absolute bottom-0 left-0 w-full h-1 bg-indigo-600 rounded-t-full"></div>}
            </button>
            <button 
              onClick={() => setActiveTab('bi')}
              className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest transition-all relative ${activeTab === 'bi' ? 'text-indigo-600' : 'text-gray-400'}`}
            >
              Métricas BI
              {activeTab === 'bi' && <div className="absolute bottom-0 left-0 w-full h-1 bg-indigo-600 rounded-t-full"></div>}
            </button>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {activeTab === 'fleet' ? (
              <div className="p-3 space-y-2">
                {points.map((point) => (
                  <button 
                    key={point.id} 
                    onClick={() => flyTo(point)}
                    className={`w-full p-4 rounded-[28px] transition-all border ${
                      selectedPoint?.id === point.id ? 'bg-blue-50 border-blue-200 shadow-sm' : 'bg-white border-transparent hover:bg-gray-50'
                    } text-left group`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-[18px] bg-gray-50 flex items-center justify-center font-black text-xs text-gray-600 relative transition-colors group-hover:bg-white shadow-inner">
                          {point.type === 'tech' ? point.name[0] : '#'}
                          <div className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 border-2 border-white rounded-full`} style={{ backgroundColor: point.color }}></div>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs font-black text-gray-900">{point.type === 'tech' ? point.name : point.os}</h4>
                            <span className={`text-[8px] font-black uppercase px-1.5 py-0.5 rounded ${point.type === 'tech' ? 'bg-blue-50 text-blue-600' : 'bg-red-50 text-red-600'}`}>
                              {point.type === 'tech' ? 'Técnico' : 'Atendimento'}
                            </span>
                          </div>
                          <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">{point.specialty}</p>
                        </div>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-indigo-600" />
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-6 space-y-4">
                 <div className="p-5 bg-indigo-50 rounded-3xl border border-indigo-100">
                    <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Eficiência de Rota</p>
                    <p className="text-xl font-black text-indigo-900">92%</p>
                 </div>
                 <div className="p-5 bg-emerald-50 rounded-3xl border border-emerald-100">
                    <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">Cobertura Geográfica</p>
                    <p className="text-xl font-black text-emerald-900">8.4 km²</p>
                 </div>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-3 bg-white rounded-[40px] overflow-hidden relative shadow-sm border border-gray-100 p-2 min-h-0 flex flex-col">
          <div ref={mapContainerRef} className="flex-1 w-full rounded-[32px] z-10" />

          {showHeatmap && (
            <div className="absolute inset-2 z-[300] pointer-events-none mix-blend-multiply rounded-[32px] animate-in fade-in duration-700">
               <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-gradient-to-r from-orange-600/60 to-red-600/60 blur-[100px] rounded-full animate-pulse"></div>
               <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-600/40 blur-[120px] rounded-full"></div>
               <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-orange-400/30 blur-[80px] rounded-full"></div>
            </div>
          )}

          {selectedPoint && (
            <div className="absolute top-8 left-8 z-[500] w-80 bg-white/95 backdrop-blur-md rounded-[32px] shadow-2xl p-6 border border-gray-100 animate-in slide-in-from-top-4 duration-500">
               <button onClick={() => setSelectedPoint(null)} className="absolute top-4 right-4 p-1.5 hover:bg-gray-100 rounded-full text-gray-400"><X className="w-4 h-4" /></button>
               <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl shadow-lg flex items-center justify-center text-white text-xl font-black" style={{ backgroundColor: selectedPoint.color }}>
                     {selectedPoint.type === 'tech' ? selectedPoint.name[0] : '#'}
                  </div>
                  <div>
                     <h4 className="text-lg font-black text-gray-900 leading-tight">{selectedPoint.name}</h4>
                     <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{selectedPoint.status}</span>
                        {selectedPoint.os && <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">OS {selectedPoint.os}</span>}
                     </div>
                  </div>
               </div>
               <button className="w-full py-4 bg-gray-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center gap-2">
                  Abrir Perfil Analítico <ArrowRight className="w-4 h-4" />
               </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MapDashboard;
