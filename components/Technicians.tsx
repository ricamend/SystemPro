
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Star, Map, Phone, Mail, Award, Clock, Plus, Navigation, ExternalLink, Calendar, Package, CheckCircle } from 'lucide-react';
import TechnicianForm from './TechnicianForm';
import TechSchedule from './TechSchedule';
import DailyLoadForm from './DailyLoadForm';

const mockTechs = [
  { id: '1', name: 'Carlos Lima', specialty: 'Hidráulica / Elétrica', rating: 4.8, activeOS: 3, phone: '(11) 91234-5678', availability: 'Disponível', lat: -23.5505, lng: -46.6333 },
  { id: '2', name: 'Ana Souza', specialty: 'Segurança / CFTV', rating: 4.9, activeOS: 1, phone: '(11) 98765-4321', availability: 'Em Atendimento', lat: -23.5596, lng: -46.6583 },
  { id: '3', name: 'Marcos Silva', specialty: 'Ar Condicionado', rating: 4.5, activeOS: 0, phone: '(11) 94444-3333', availability: 'Disponível', lat: -23.5489, lng: -46.6388 },
];

const Technicians: React.FC = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [loadingTech, setLoadingTech] = useState<any>(null);
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  if (showSchedule) {
    return <TechSchedule onClose={() => setShowSchedule(false)} />;
  }

  if (isCreating) {
    return (
      <div className="max-w-4xl mx-auto">
        <TechnicianForm 
          onClose={() => setIsCreating(false)} 
          onSave={() => setIsCreating(false)} 
        />
      </div>
    );
  }

  const handleLocate = (lat: number, lng: number) => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`, '_blank');
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-500 relative">
      {showToast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[600] bg-gray-900 text-white px-8 py-4 rounded-3xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-top-8">
           <CheckCircle className="w-5 h-5 text-emerald-500" />
           <span className="font-black text-sm uppercase tracking-widest">Carga registrada com sucesso!</span>
        </div>
      )}

      {loadingTech && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
           <div className="w-full max-w-2xl">
              <DailyLoadForm 
                technician={loadingTech} 
                onClose={() => setLoadingTech(null)} 
                onSave={(data) => {
                  setLoadingTech(null);
                  setShowToast(true);
                  setTimeout(() => setShowToast(false), 3000);
                }} 
              />
           </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Equipe de Campo</h2>
          <p className="text-gray-500">Gerencie técnicos, escalas e responsabilidade de materiais.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setShowSchedule(true)}
            className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-50 transition-colors shadow-sm"
          >
            <Calendar className="w-4 h-4 text-blue-600" />
            Escala Global
          </button>
          <button 
            onClick={() => setIsCreating(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-100"
          >
            <Plus className="w-4 h-4" />
            Novo Técnico
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockTechs.map((tech) => (
          <div key={tech.id} className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden flex flex-col group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="w-16 h-16 rounded-[24px] bg-blue-600 flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-blue-100 transform group-hover:scale-110 transition-transform">
                  {tech.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex flex-col items-end gap-2">
                   <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-full">
                     <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                     <span className="text-xs font-black text-amber-700">{tech.rating}</span>
                   </div>
                   <div className="flex items-center gap-1 text-[9px] font-bold text-gray-400">
                     <Clock className="w-3 h-3" />
                     Ativo há 4h
                   </div>
                </div>
              </div>

              <h3 className="text-xl font-black text-gray-900 leading-tight">{tech.name}</h3>
              <div className="flex items-center gap-1.5 text-blue-600 mt-1 mb-6">
                <Award className="w-3.5 h-3.5" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">{tech.specialty}</span>
              </div>

              <div className="space-y-3 pt-6 border-t border-gray-50">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400 font-bold uppercase tracking-widest">Status Atual</span>
                  <span className={`font-black uppercase tracking-widest text-[9px] px-3 py-1 rounded-full ${tech.availability === 'Disponível' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                    {tech.availability}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400 font-bold uppercase tracking-widest">Saldo em Posse</span>
                  <span className="font-black text-gray-900">R$ 1.250,00</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400 font-bold uppercase tracking-widest">OS Ativas</span>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-gray-900">{tech.activeOS}</span>
                    <div className="w-12 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                       <div className="h-full bg-blue-500" style={{ width: `${(tech.activeOS/5)*100}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-auto p-4 bg-gray-50/50 border-t border-gray-100 grid grid-cols-3 gap-2">
              <button 
                onClick={() => window.location.href = `tel:${tech.phone}`}
                className="flex items-center justify-center p-4 bg-white border border-gray-200 rounded-[20px] text-gray-400 hover:text-blue-600 hover:border-blue-100 transition-all shadow-sm"
                title="Ligar"
              >
                <Phone className="w-4 h-4" />
              </button>
              <button 
                onClick={() => handleLocate(tech.lat, tech.lng)}
                className="flex items-center justify-center p-4 bg-white border border-gray-200 rounded-[20px] text-gray-400 hover:text-blue-600 hover:border-blue-100 transition-all shadow-sm"
                title="Localizar GPS"
              >
                <Navigation className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setLoadingTech(tech)}
                className="flex items-center justify-center gap-2 bg-blue-600 p-4 rounded-[20px] text-white hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 active:scale-95"
                title="Carregar Kit de Materiais"
              >
                <Package className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="p-8 bg-gradient-to-br from-gray-900 to-indigo-950 rounded-[48px] text-white shadow-2xl relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
         <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
               <div className="w-20 h-20 bg-indigo-500/20 backdrop-blur-xl border border-indigo-500/20 rounded-[28px] flex items-center justify-center">
                  <Map className="w-10 h-10 text-indigo-400" />
               </div>
               <div>
                  <h4 className="text-2xl font-black tracking-tight">Rastreamento de Patrimônio</h4>
                  <p className="text-indigo-200 text-sm max-w-md mt-1 font-medium opacity-80 leading-relaxed">
                     Cada item carregado nos veículos gera um termo de cautela digital. Monitore o valor financeiro em campo por técnico.
                  </p>
               </div>
            </div>
            <button 
              onClick={() => navigate('/map-dashboard')}
              className="px-8 py-4 bg-white text-indigo-900 rounded-[24px] font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-xl"
            >
               Ver Dashboard de Carga
            </button>
         </div>
      </div>
    </div>
  );
};

export default Technicians;
