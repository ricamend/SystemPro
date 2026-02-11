
import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Package, 
  Search, 
  ArrowRight, 
  AlertTriangle, 
  Box, 
  History,
  User,
  Printer,
  FileText,
  ChevronDown,
  Plus,
  RotateCcw,
  ShieldCheck,
  Loader2,
  Wrench,
  Hammer,
  TrendingDown,
  Activity,
  DollarSign,
  LayoutList,
  X,
  Eye,
  CheckCircle2,
  ArrowUpRight,
  ArrowDownRight,
  ClipboardList,
  AlertCircle,
  Truck,
  Clock
} from 'lucide-react';
import DailyLoadForm from './DailyLoadForm';

// Estrutura base de dados
const initialTechData = {
  '1': { 
    id: '1',
    name: 'Carlos Lima', 
    role: 'Técnico Especialista',
    items: [
      { id: 'm1', name: 'Válvula Esfera 3/4', sku: 'HID-VAL-001', qty: 15, unit: 'un', pricePerUnit: 45.00 },
      { id: 'm2', name: 'Cabo Flexível 2.5mm', sku: 'ELE-CAB-025', qty: 120, unit: 'm', pricePerUnit: 3.50, alert: true },
    ],
    assets: [
      { id: 'a1', name: 'Parafusadeira Makita 18V', serial: 'MK-9920', value: 1200 },
      { id: 'a2', name: 'Multímetro Fluke', serial: 'FL-4410', value: 2100 },
    ],
    status: 'regular'
  },
  '2': { 
    id: '2',
    name: 'Ana Souza', 
    role: 'Líder de Equipe',
    items: [
      { id: 'm3', name: 'Disjuntor 20A', sku: 'ELE-DIS-020', qty: 8, unit: 'un', pricePerUnit: 25.00 },
      { id: 'm4', name: 'Fita Isolante 20m', sku: 'ELE-FIT-020', qty: 5, unit: 'rl', pricePerUnit: 12.00 },
    ],
    assets: [
      { id: 'a3', name: 'Escada Articulada 4x4', serial: 'ESC-001', value: 850 },
    ],
    status: 'regular'
  }
};

const mockMovementLogs = [
  { id: 'l1', date: '21 Abr, 14:30', type: 'Consumo', item: 'Válvula Esfera 3/4', qty: '-2 un', os: '#5491', status: 'Debitado' },
  { id: 'l2', date: '21 Abr, 09:15', type: 'Carga', item: 'Cabo Flexível 2.5mm', qty: '+50 m', os: '-', status: 'Recebido' },
];

const TechStock: React.FC = () => {
  const navigate = useNavigate();
  const [techs, setTechs] = useState<any>(() => {
    const saved = localStorage.getItem('servicopro_tech_data');
    return saved ? JSON.parse(saved) : initialTechData;
  });

  const [selectedTechId, setSelectedTechId] = useState('1');
  const [showLoadForm, setShowLoadForm] = useState(false);
  const [showGlobalTable, setShowGlobalTable] = useState(false);
  const [showLogs, setShowLogs] = useState(false);
  const [showDischargeConfirm, setShowDischargeConfirm] = useState(false);
  const [activeTab, setActiveTab] = useState<'consumables' | 'tools'>('consumables');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showToast, setShowToast] = useState<string | null>(null);
  
  const currentTech = techs[selectedTechId];

  useEffect(() => {
    localStorage.setItem('servicopro_tech_data', JSON.stringify(techs));
  }, [techs]);

  const triggerToast = (msg: string) => {
    setShowToast(msg);
    setTimeout(() => setShowToast(null), 3000);
  };

  const handleRequestDischarge = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1500)); 
    
    setTechs((prev: any) => {
      const newState = {
        ...prev,
        [selectedTechId]: {
          ...prev[selectedTechId],
          status: 'discharging' 
        }
      };
      return newState;
    });

    setIsProcessing(false);
    setShowDischargeConfirm(false);
    triggerToast("Solicitação enviada ao CD. Aguarde conferência física.");
  };

  const totals = useMemo(() => {
    if (!currentTech) return { consumables: 0, assets: 0, grandTotal: 0 };
    const consumablesVal = currentTech.items.reduce((acc: number, item: any) => acc + (item.qty * (item.pricePerUnit || 0)), 0);
    const assetsVal = currentTech.assets.reduce((acc: number, asset: any) => acc + (asset.value || 0), 0);
    return {
      consumables: consumablesVal,
      assets: assetsVal,
      grandTotal: consumablesVal + assetsVal
    };
  }, [currentTech]);

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-500 pb-20 relative">
      
      {showToast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[800] bg-gray-900 text-white px-8 py-4 rounded-3xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-top-8">
           <CheckCircle2 className="w-5 h-5 text-emerald-500" />
           <span className="font-black text-sm uppercase tracking-widest">{showToast}</span>
        </div>
      )}

      {showLogs && (
        <div className="fixed inset-0 z-[700] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
           <div className="bg-white w-full max-w-3xl rounded-[48px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col">
              <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
                 <div className="flex items-center gap-5">
                    <div className="p-4 bg-blue-600 rounded-[24px] text-white shadow-xl">
                       <ClipboardList className="w-8 h-8" />
                    </div>
                    <div>
                       <h3 className="text-2xl font-black text-gray-900 tracking-tight">Movimentações</h3>
                       <p className="text-xs text-gray-500 font-medium uppercase tracking-widest">{currentTech?.name}</p>
                    </div>
                 </div>
                 <button onClick={() => setShowLogs(false)} className="p-2.5 hover:bg-white rounded-full text-gray-400">
                    <X className="w-7 h-7" />
                 </button>
              </div>

              <div className="flex-1 overflow-y-auto max-h-[60vh] p-8 custom-scrollbar">
                 <table className="w-full">
                    <thead>
                       <tr className="border-b border-gray-100">
                          <th className="pb-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Data</th>
                          <th className="pb-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Tipo</th>
                          <th className="pb-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Item</th>
                          <th className="pb-6 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                       {mockMovementLogs.map(log => (
                         <tr key={log.id} className="group hover:bg-gray-50">
                            <td className="py-5 text-xs font-black text-gray-900">{log.date}</td>
                            <td className="py-5">
                               <span className={`flex items-center gap-1.5 text-[9px] font-black uppercase ${log.type === 'Carga' ? 'text-emerald-600' : 'text-blue-600'}`}>
                                  {log.type}
                               </span>
                            </td>
                            <td className="py-5">
                               <p className="text-xs font-bold text-gray-800">{log.item}</p>
                               <p className={`text-[10px] font-black ${log.qty.startsWith('+') ? 'text-emerald-500' : 'text-red-500'}`}>{log.qty}</p>
                            </td>
                            <td className="py-5 text-right uppercase text-[9px] font-black text-gray-400">{log.status}</td>
                         </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </div>
        </div>
      )}

      {showDischargeConfirm && (
        <div className="fixed inset-0 z-[700] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
           <div className="bg-white w-full max-w-md rounded-[48px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
              <div className="p-10 text-center space-y-6">
                 <div className="w-24 h-24 bg-red-50 rounded-[32px] flex items-center justify-center mx-auto text-red-600 shadow-inner">
                    <RotateCcw className={`w-12 h-12 ${isProcessing ? 'animate-spin' : ''}`} />
                 </div>
                 <div className="space-y-2">
                    <h3 className="text-2xl font-black text-gray-900 tracking-tight">Confirmar Descarga?</h3>
                    <p className="text-sm text-gray-500 font-medium px-4">
                       Ao confirmar, todos os itens serão registrados como "Em Devolução" até que o Almoxarifado confirme o recebimento no CD.
                    </p>
                 </div>
                 <div className="grid grid-cols-2 gap-4 pt-4">
                    <button onClick={() => setShowDischargeConfirm(false)} className="py-4 bg-gray-50 text-gray-500 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-100 transition-all">Cancelar</button>
                    <button onClick={handleRequestDischarge} className="py-4 bg-red-600 text-white rounded-2xl font-black text-xs uppercase shadow-xl hover:bg-red-700 transition-all flex items-center justify-center gap-2">
                       {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Confirmar'}
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}

      <div className="bg-white rounded-[48px] p-10 border border-gray-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-50/30 rounded-full -mr-40 -mt-40 blur-3xl"></div>
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-gray-900 rounded-[32px] flex items-center justify-center text-white shadow-2xl relative group">
              <User className="w-12 h-12" />
              <div className={`absolute -bottom-2 -right-2 w-8 h-8 border-4 border-white rounded-full flex items-center justify-center transition-colors ${currentTech?.status === 'discharging' ? 'bg-amber-500' : 'bg-emerald-500'}`}>
                 {currentTech?.status === 'discharging' ? <Clock className="w-4 h-4 text-white" /> : <ShieldCheck className="w-4 h-4 text-white" />}
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-black text-gray-900 tracking-tighter">Inventário do Técnico</h3>
              <div className="relative mt-2 inline-flex items-center gap-2 group">
                <select 
                  value={selectedTechId}
                  onChange={(e) => setSelectedTechId(e.target.value)}
                  className="pl-0 pr-8 py-1 bg-transparent border-none text-blue-600 font-black uppercase text-sm tracking-widest focus:ring-0 appearance-none cursor-pointer hover:text-blue-800 transition-colors"
                >
                  {Object.values(techs).map((t: any) => <option key={t.id} value={t.id}>{t.name}</option>)}
                </select>
                <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-600 pointer-events-none group-hover:translate-y-0.5 transition-transform" />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button onClick={() => setShowGlobalTable(true)} className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all shadow-sm">
              <LayoutList className="w-4 h-4 text-blue-600" /> Ver Mapa Geral
            </button>
            <button onClick={() => setShowLoadForm(true)} className="flex items-center gap-2 bg-blue-600 text-white px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 shadow-xl">
              <Plus className="w-4 h-4" /> Nova Carga
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
           <div className="p-8 bg-gray-50 rounded-[40px] border border-gray-100">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                 <DollarSign className="w-3 h-3" /> Patrimônio Total
              </p>
              <p className="text-3xl font-black text-gray-900 tracking-tighter">R$ {totals.grandTotal.toFixed(2)}</p>
           </div>
           
           <div className="p-8 bg-gray-50 rounded-[40px] border border-gray-100">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                 <Hammer className="w-3 h-3" /> Ativos
              </p>
              <p className="text-3xl font-black text-gray-900 tracking-tighter">{currentTech?.assets.length || 0} Itens</p>
           </div>

           <div className={`p-8 rounded-[40px] border transition-all ${currentTech?.status === 'discharging' ? 'bg-amber-50 border-amber-100' : 'bg-emerald-50 border-emerald-100'}`}>
              <p className={`text-[10px] font-black uppercase tracking-widest mb-2 flex items-center gap-2 ${currentTech?.status === 'discharging' ? 'text-amber-600' : 'text-emerald-600'}`}>
                 <Activity className="w-3 h-3" /> Status Operacional
              </p>
              <p className={`text-3xl font-black tracking-tighter ${currentTech?.status === 'discharging' ? 'text-amber-900' : 'text-emerald-900'}`}>
                {currentTech?.status === 'discharging' ? 'Em Devolução' : 'Regular'}
              </p>
           </div>
        </div>

        <div className="space-y-8">
          <div className="flex border-b border-gray-100 gap-10">
            <button onClick={() => setActiveTab('consumables')} className={`pb-5 text-[11px] font-black uppercase tracking-widest relative transition-all ${activeTab === 'consumables' ? 'text-blue-600' : 'text-gray-400'}`}>
              Insumos e Peças
              {activeTab === 'consumables' && <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 rounded-t-full"></div>}
            </button>
            <button onClick={() => setActiveTab('tools')} className={`pb-5 text-[11px] font-black uppercase tracking-widest relative transition-all ${activeTab === 'tools' ? 'text-blue-600' : 'text-gray-400'}`}>
              Ferramental de Cautela
              {activeTab === 'tools' && <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 rounded-t-full"></div>}
            </button>
          </div>

          <div className="space-y-4 min-h-[300px]">
            {currentTech?.status === 'discharging' ? (
                <div className="flex flex-col items-center justify-center py-20 text-center space-y-6 bg-gray-50/50 rounded-[40px] border-2 border-dashed border-gray-100 animate-in fade-in">
                   <div className="w-20 h-20 bg-white rounded-3xl shadow-xl flex items-center justify-center text-amber-500 animate-bounce">
                      <Truck className="w-10 h-10" />
                   </div>
                   <div className="space-y-2 px-10">
                      <h4 className="text-xl font-black text-gray-900 tracking-tight">Materiais em trânsito para o CD</h4>
                      <p className="text-sm text-gray-500 font-medium">A descarga total foi registrada. O almoxarifado deve confirmar a entrada física.</p>
                   </div>
                   <button onClick={() => setTechs((p:any) => ({...p, [selectedTechId]: {...p[selectedTechId], status: 'regular'}}))} className="text-[10px] font-black text-blue-600 uppercase hover:underline">Cancelar Solicitação</button>
                </div>
            ) : (
              activeTab === 'consumables' ? (
                currentTech?.items.length > 0 ? currentTech.items.map((item: any) => (
                  <div key={item.id} className="flex items-center justify-between p-6 bg-white rounded-[32px] border border-gray-50 group hover:shadow-lg transition-all">
                    <div className="flex items-center gap-6">
                      <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-inner border border-gray-50">
                        <Package className="w-7 h-7" />
                      </div>
                      <div>
                        <h4 className="text-base font-black text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">{item.name}</h4>
                        <p className="text-[10px] font-mono text-gray-400 uppercase mt-1">SKU: {item.sku}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-12">
                      <div className="text-center">
                         <span className="text-3xl font-black text-gray-900 tracking-tighter">{item.qty}</span>
                         <span className="text-[10px] font-black text-gray-400 uppercase ml-2">{item.unit}</span>
                      </div>
                      <div className="text-right min-w-[140px] border-l border-gray-100 pl-8">
                         <span className="text-sm font-black text-gray-900">R$ {(item.qty * (item.pricePerUnit || 0)).toFixed(2)}</span>
                         <p className="text-[8px] font-black text-gray-400 uppercase">Custódia</p>
                      </div>
                    </div>
                  </div>
                )) : <div className="text-center py-20 text-gray-400">Vazio</div>
              ) : (
                currentTech?.assets.length > 0 ? currentTech.assets.map((asset: any) => (
                  <div key={asset.id} className="flex items-center justify-between p-7 bg-white rounded-[32px] border border-gray-50 group hover:shadow-lg transition-all">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-inner border border-blue-100/30">
                        <Wrench className="w-8 h-8" />
                      </div>
                      <div>
                        <h4 className="text-base font-black text-gray-900 leading-tight">{asset.name}</h4>
                        <p className="text-[10px] font-mono text-gray-400 uppercase mt-1.5">S/N: {asset.serial}</p>
                      </div>
                    </div>
                    <div className="text-right">
                        <span className="text-lg font-black text-gray-900">R$ {(asset.value || 0).toFixed(2)}</span>
                    </div>
                  </div>
                )) : <div className="text-center py-20 text-gray-400">Vazio</div>
              )
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
          <button onClick={() => setShowLogs(true)} className="flex items-center justify-center gap-3 bg-gray-50 text-gray-600 py-5 rounded-[28px] font-black text-[10px] uppercase tracking-widest hover:bg-gray-100 transition-all border border-gray-100 shadow-sm">
            <History className="w-4 h-4" /> Histórico de Carga
          </button>
          <button 
            disabled={currentTech?.status === 'discharging' || totals.grandTotal === 0}
            onClick={() => setShowDischargeConfirm(true)}
            className="flex items-center justify-center gap-3 bg-red-50 text-red-600 py-5 rounded-[28px] font-black text-[10px] uppercase tracking-widest hover:bg-red-100 transition-all border border-red-100 shadow-sm disabled:opacity-30"
          >
            <RotateCcw className="w-4 h-4" /> Solicitar Descarga Total
          </button>
        </div>
      </div>
    </div>
  );
};

export default TechStock;
