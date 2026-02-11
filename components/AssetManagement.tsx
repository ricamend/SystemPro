
import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Search, 
  Plus, 
  QrCode, 
  History, 
  Wrench, 
  AlertCircle, 
  Calendar,
  MoreVertical,
  ChevronRight,
  ShieldCheck,
  Zap,
  CheckCircle2,
  X,
  FileText,
  User,
  Activity,
  Thermometer,
  Gauge,
  TrendingDown,
  Edit2,
  Trash2,
  Loader2,
  Printer,
  Download,
  CheckCircle,
  Navigation,
  FileDown,
  Check
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';
import AssetForm from './AssetForm';
import ServiceOrderForm from './ServiceOrderForm';

const initialAssets = [
  { id: '1', name: 'Elevador Atlas 01', model: 'Gen2 Comfort', serial: 'AT-88492', customer: 'Condomínio Solar', lastService: '12 Abr 2024', nextService: '12 Mai 2024', status: 'Operacional', health: 98 },
  { id: '2', name: 'Gerador Stemac', model: 'ST-500 KVA', serial: 'GER-1120', customer: 'Hospital Santa Maria', lastService: '05 Mar 2024', nextService: '05 Mai 2024', status: 'Alerta', health: 72 },
  { id: '3', name: 'Central de Alarme', model: 'Intelbras AMT', serial: 'SN-99201', customer: 'Escola Dom Bosco', lastService: '10 Jan 2024', nextService: '10 Abr 2024', status: 'Manutenção', health: 45 },
];

const AssetManagement: React.FC = () => {
  const [assets, setAssets] = useState(initialAssets);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAsset, setSelectedAsset] = useState<any>(null);
  const [assetToEdit, setAssetToEdit] = useState<any>(null);
  const [assetToDelete, setAssetToDelete] = useState<any>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [showBatchQR, setShowBatchQR] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [assetForRevision, setAssetForRevision] = useState<any>(null);
  const [activeSubTab, setActiveSubTab] = useState<'history' | 'telemetry'>('history');
  const [telemetryData, setTelemetryData] = useState<any[]>([]);
  
  // Novo Estado para Seleção Múltipla
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!selectedAsset) return;
    
    const initialData = Array.from({ length: 20 }, (_, i) => ({
      time: `${i}:00`,
      val: Math.floor(Math.random() * (90 - 40) + 40)
    }));
    setTelemetryData(initialData);

    const interval = setInterval(() => {
      setTelemetryData(prev => {
        const newData = [...prev.slice(1), { 
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }), 
          val: Math.floor(Math.random() * (90 - 40) + 40) 
        }];
        return newData;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [selectedAsset]);

  const filteredAssets = assets.filter(a => 
    a.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    a.serial.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Lógica de Seleção
  const toggleSelectAll = () => {
    if (selectedIds.size === filteredAssets.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredAssets.map(a => a.id)));
    }
  };

  const toggleSelectOne = (e: React.MouseEvent | React.ChangeEvent, id: string) => {
    e.stopPropagation();
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const handleDelete = () => {
    if (assetToDelete) {
      setAssets(prev => prev.filter(a => a.id !== assetToDelete.id));
      setAssetToDelete(null);
      if (selectedAsset?.id === assetToDelete.id) setSelectedAsset(null);
    }
  };

  const handleExportPDF = async () => {
    const assetsToPrint = assets.filter(a => selectedIds.has(a.id));
    if (assetsToPrint.length === 0) {
      alert("Selecione ao menos um ativo para gerar as etiquetas.");
      return;
    }

    setIsGeneratingPDF(true);
    
    try {
      const doc = new jsPDF();
      const margin = 15;
      const cardWidth = 85;
      const cardHeight = 55;
      const gap = 10;
      let x = margin;
      let y = margin;

      for (let i = 0; i < assetsToPrint.length; i++) {
        const asset = assetsToPrint[i];

        if (i > 0 && i % 8 === 0) {
          doc.addPage();
          x = margin;
          y = margin;
        }

        doc.setDrawColor(220, 220, 220);
        doc.setLineWidth(0.1);
        doc.roundedRect(x, y, cardWidth, cardHeight, 4, 4, 'S');

        const qrDataUrl = await QRCode.toDataURL(asset.id, {
          margin: 1,
          width: 200,
          color: { dark: '#000000', light: '#ffffff' }
        });
        
        doc.addImage(qrDataUrl, 'PNG', x + 5, y + 8, 30, 30);

        doc.setFont("helvetica", "bold");
        doc.setTextColor(31, 41, 55);
        doc.setFontSize(11);
        doc.text(asset.name, x + 40, y + 15);
        
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.setTextColor(107, 114, 128);
        doc.text(`S/N: ${asset.serial}`, x + 40, y + 21);
        doc.text(`MODELO: ${asset.model}`, x + 40, y + 26);

        doc.setFillColor(243, 244, 246);
        doc.roundedRect(x + 40, y + 33, 40, 7, 1.5, 1.5, 'F');
        doc.setTextColor(55, 65, 81);
        doc.setFontSize(7);
        doc.setFont("helvetica", "bold");
        doc.text(asset.customer, x + 42, y + 37.5);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(6);
        doc.setTextColor(209, 213, 219);
        doc.text("GERADO POR SERVICOPRO SAAS", x + 5, y + cardHeight - 5);

        if ((i + 1) % 2 === 0) {
          x = margin;
          y += cardHeight + gap;
        } else {
          x += cardWidth + gap;
        }
      }

      doc.save(`Etiquetas_Identificacao_${Date.now()}.pdf`);
      setShowBatchQR(false);
    } catch (error) {
      console.error("Erro detalhado ao gerar PDF:", error);
      alert("Houve um problema ao processar o lote de etiquetas.");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleSaveAsset = (data: any) => {
    if (assetToEdit) {
      setAssets(prev => prev.map(a => a.id === assetToEdit.id ? { ...a, ...data } : a));
    } else {
      const newAsset = {
        ...data,
        id: `ASSET-${Date.now()}`,
        health: 100,
        status: 'Operacional'
      };
      setAssets(prev => [newAsset, ...prev]);
    }
    setIsFormOpen(false);
    setAssetToEdit(null);
  };

  if (isFormOpen) {
    return (
      <div className="max-w-4xl mx-auto py-4">
        <AssetForm 
          initialData={assetToEdit}
          onClose={() => { setIsFormOpen(false); setAssetToEdit(null); }}
          onSave={handleSaveAsset}
        />
      </div>
    );
  }

  if (assetForRevision) {
    return (
      <div className="max-w-3xl mx-auto py-4">
        <ServiceOrderForm 
          initialData={{ 
            title: `Revisão de Ativo: ${assetForRevision.name}`,
            description: `Procedimento de revisão programada para o equipamento ${assetForRevision.name} (S/N: ${assetForRevision.serial}).`,
            customer: assetForRevision.customer
          }}
          onClose={() => setAssetForRevision(null)}
          onSave={() => setAssetForRevision(null)}
        />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12 relative">
      {assetToDelete && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-md rounded-[40px] shadow-2xl overflow-hidden border border-gray-100 animate-in zoom-in-95">
              <div className="p-8 text-center space-y-6">
                 <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto text-red-500">
                    <Trash2 className="w-10 h-10" />
                 </div>
                 <div className="space-y-2">
                    <h3 className="text-xl font-black text-gray-900 tracking-tight">Excluir Ativo?</h3>
                    <p className="text-sm text-gray-500 font-medium">Você está prestes a remover <b>{assetToDelete.name}</b>. Esta ação não pode ser desfeita.</p>
                 </div>
                 <div className="grid grid-cols-2 gap-3 pt-4">
                    <button onClick={() => setAssetToDelete(null)} className="py-4 bg-gray-50 text-gray-500 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-100 transition-all">Cancelar</button>
                    <button onClick={handleDelete} className="py-4 bg-red-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-red-100 hover:bg-red-700 transition-all">Sim, Excluir</button>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* Modal de Escolha de Etiquetas */}
      {showBatchQR && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-5xl rounded-[40px] shadow-2xl overflow-hidden border border-gray-100 animate-in zoom-in-95 flex flex-col max-h-[90vh]">
              <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
                 <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-600 rounded-2xl text-white shadow-lg"><QrCode className="w-6 h-6" /></div>
                    <div>
                       <h3 className="text-xl font-black text-gray-900 tracking-tight">Escolha as Etiquetas</h3>
                       <p className="text-xs text-gray-500 font-medium">Clique nos ativos para selecionar ou desmarcar do lote.</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-4">
                    <button onClick={toggleSelectAll} className="text-xs font-black text-blue-600 uppercase tracking-widest hover:underline">
                      {selectedIds.size === filteredAssets.length ? 'Desmarcar Todos' : 'Selecionar Todos'}
                    </button>
                    <button onClick={() => setShowBatchQR(false)} className="p-2 hover:bg-white rounded-full text-gray-400"><X className="w-6 h-6" /></button>
                 </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-8 bg-gray-50/30 custom-scrollbar">
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredAssets.map(asset => {
                      const isSelected = selectedIds.has(asset.id);
                      return (
                        <div 
                          key={asset.id} 
                          onClick={(e) => toggleSelectOne(e, asset.id)}
                          className={`bg-white p-6 rounded-3xl border-2 transition-all cursor-pointer relative group ${
                            isSelected ? 'border-blue-600 shadow-xl shadow-blue-50 ring-4 ring-blue-50' : 'border-transparent shadow-sm grayscale opacity-60'
                          }`}
                        >
                           {isSelected && (
                             <div className="absolute top-4 right-4 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white animate-in zoom-in shadow-lg">
                                <Check className="w-4 h-4" />
                             </div>
                           )}
                           <div className="w-full aspect-square bg-gray-50 rounded-2xl flex items-center justify-center mb-6 border-2 border-gray-900 p-4">
                              <QrCode className="w-full h-full text-gray-900" />
                           </div>
                           <div className="space-y-1 text-center">
                              <h4 className="text-sm font-black text-gray-900 leading-tight truncate">{asset.name}</h4>
                              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{asset.serial}</p>
                              <div className="pt-2">
                                 <span className="text-[8px] font-black text-white bg-gray-900 px-3 py-1 rounded-full uppercase truncate block max-w-full">
                                    {asset.customer}
                                 </span>
                              </div>
                           </div>
                        </div>
                      );
                    })}
                 </div>
              </div>

              <div className="p-8 border-t border-gray-50 bg-white flex justify-end gap-3 items-center">
                 <div className="mr-auto text-sm">
                    <span className="text-gray-400 font-medium tracking-tight">Selecionados:</span>
                    <span className="ml-2 font-black text-blue-600">{selectedIds.size} ativos</span>
                 </div>
                 <button onClick={() => setShowBatchQR(false)} className="px-6 py-4 text-sm font-bold text-gray-500 hover:text-gray-800 transition-colors">Cancelar</button>
                 <button 
                  onClick={handleExportPDF}
                  disabled={isGeneratingPDF || selectedIds.size === 0}
                  className="flex items-center gap-2 bg-blue-600 text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95 disabled:opacity-50"
                 >
                   {isGeneratingPDF ? <Loader2 className="w-5 h-5 animate-spin" /> : <FileDown className="w-5 h-5" />}
                   {isGeneratingPDF ? 'Gerando...' : `Imprimir ${selectedIds.size} Etiquetas`}
                 </button>
              </div>
           </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">Gestão de Ativos</h2>
          <p className="text-gray-500 font-medium leading-tight mt-1">Monitore ativos e gere identificação inteligente por QR Code.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setShowBatchQR(true)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-sm ${
              selectedIds.size > 0 ? 'bg-amber-500 text-white shadow-amber-100 animate-in bounce-in' : 'bg-white border border-gray-200 text-gray-600'
            }`}
          >
            <QrCode className="w-4 h-4" />
            {selectedIds.size > 0 ? `Exportar Selecionados (${selectedIds.size})` : 'Lote QR Codes'}
          </button>
          <button 
            onClick={() => { setAssetToEdit(null); setIsFormOpen(true); }}
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl text-xs font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-100"
          >
            <Plus className="w-4 h-4" />
            Novo Ativo
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Filtrar por nome, S/N ou cliente..."
            className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-inner"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50/50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-5 text-center w-12">
                    <button 
                      onClick={toggleSelectAll}
                      className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all ${
                        selectedIds.size === filteredAssets.length ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-gray-200'
                      }`}
                    >
                      {selectedIds.size === filteredAssets.length && <Check className="w-3.5 h-3.5 font-bold" />}
                    </button>
                  </th>
                  <th className="px-6 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Ativo / S/N</th>
                  <th className="px-6 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Cliente</th>
                  <th className="px-6 py-5 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">Saúde</th>
                  <th className="px-6 py-5 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-5"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredAssets.map((asset) => {
                  const isSelected = selectedIds.has(asset.id);
                  return (
                    <tr 
                      key={asset.id} 
                      className={`hover:bg-blue-50/30 transition-all cursor-pointer group ${isSelected ? 'bg-blue-50/20' : ''}`}
                      onClick={() => setSelectedAsset(asset)}
                    >
                      <td className="px-6 py-6" onClick={(e) => toggleSelectOne(e as any, asset.id)}>
                        <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all ${
                          isSelected ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-gray-200 group-hover:border-blue-300'
                        }`}>
                          {isSelected && <Check className="w-3.5 h-3.5 font-bold" />}
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <div className="flex flex-col">
                          <span className="text-sm font-black text-gray-900 group-hover:text-blue-600 transition-colors">{asset.name}</span>
                          <span className="text-[10px] font-mono text-gray-400 uppercase">S/N: {asset.serial}</span>
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <span className="text-xs font-bold text-gray-600">{asset.customer}</span>
                      </td>
                      <td className="px-6 py-6">
                         <div className="flex flex-col items-center gap-1">
                            <span className={`text-xs font-black ${asset.health > 80 ? 'text-emerald-500' : asset.health > 50 ? 'text-amber-500' : 'text-red-500'}`}>
                              {asset.health}%
                            </span>
                            <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                               <div 
                                className={`h-full transition-all duration-1000 ${asset.health > 80 ? 'bg-emerald-500' : asset.health > 50 ? 'bg-amber-500' : 'bg-red-500'}`} 
                                style={{ width: `${asset.health}%` }}
                               />
                            </div>
                         </div>
                      </td>
                      <td className="px-6 py-6 text-center">
                        <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                          asset.status === 'Operacional' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                          asset.status === 'Alerta' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                          'bg-red-50 text-red-700 border-red-100'
                        }`}>
                          {asset.status}
                        </span>
                      </td>
                      <td className="px-6 py-6 text-right">
                         <button className="p-2 text-gray-300 hover:text-gray-600"><MoreVertical className="w-5 h-5" /></button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          {selectedAsset ? (
            <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-xl animate-in slide-in-from-right-4">
               <div className="flex justify-between items-start mb-8">
                  <div>
                     <h3 className="text-xl font-black text-gray-900 leading-tight">{selectedAsset.name}</h3>
                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{selectedAsset.model}</p>
                  </div>
                  <div className="flex gap-2">
                     <button onClick={() => { setAssetToEdit(selectedAsset); setIsFormOpen(true); }} className="p-2.5 bg-gray-50 text-gray-400 hover:text-blue-600 rounded-xl transition-all"><Edit2 className="w-4 h-4" /></button>
                     <button onClick={() => setAssetToDelete(selectedAsset)} className="p-2.5 bg-gray-50 text-gray-400 hover:text-red-500 rounded-xl transition-all"><Trash2 className="w-4 h-4" /></button>
                  </div>
               </div>

               <div className="flex border-b border-gray-100 gap-6 mb-8">
                  <button 
                    onClick={() => setActiveSubTab('history')}
                    className={`pb-4 text-[10px] font-black uppercase tracking-widest relative transition-all ${activeSubTab === 'history' ? 'text-blue-600' : 'text-gray-400'}`}
                  >
                    Histórico
                    {activeSubTab === 'history' && <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 rounded-t-full"></div>}
                  </button>
                  <button 
                    onClick={() => setActiveSubTab('telemetry')}
                    className={`pb-4 text-[10px] font-black uppercase tracking-widest relative flex items-center gap-2 transition-all ${activeSubTab === 'telemetry' ? 'text-blue-600' : 'text-gray-400'}`}
                  >
                    <Activity className="w-3 h-3" /> Telemetria
                    {activeSubTab === 'telemetry' && <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 rounded-t-full"></div>}
                  </button>
               </div>

               {activeSubTab === 'history' ? (
                 <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                       <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                          <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Última OS</p>
                          <p className="text-xs font-bold text-gray-700">{selectedAsset.lastService}</p>
                       </div>
                       <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                          <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest mb-1">Próxima OS</p>
                          <p className="text-xs font-bold text-blue-700">{selectedAsset.nextService}</p>
                       </div>
                    </div>
                    <button 
                      onClick={() => setAssetForRevision(selectedAsset)}
                      className="w-full py-4 bg-gray-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-black transition-all flex items-center justify-center gap-2"
                    >
                       <Wrench className="w-4 h-4" /> Revisar Ativo (Abrir OS)
                    </button>
                 </div>
               ) : (
                 <div className="space-y-6 animate-in fade-in">
                    <div className="h-40 w-full">
                       <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={telemetryData}>
                             <Line type="monotone" dataKey="val" stroke="#3b82f6" strokeWidth={3} dot={false} />
                             <Tooltip content={<div className="bg-gray-900 text-white text-[8px] p-2 rounded shadow-xl">Monitorando Ativo...</div>} />
                          </LineChart>
                       </ResponsiveContainer>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                       <div className="p-3 bg-gray-50 rounded-xl text-center">
                          <Thermometer className="w-4 h-4 text-orange-500 mx-auto mb-1" />
                          <p className="text-[10px] font-black text-gray-900">42°C</p>
                       </div>
                       <div className="p-3 bg-gray-50 rounded-xl text-center">
                          <Gauge className="w-4 h-4 text-blue-500 mx-auto mb-1" />
                          <p className="text-[10px] font-black text-gray-900">8.4 bar</p>
                       </div>
                       <div className="p-3 bg-gray-50 rounded-xl text-center">
                          <Activity className="w-4 h-4 text-emerald-500 mx-auto mb-1" />
                          <p className="text-[10px] font-black text-gray-900">Normal</p>
                       </div>
                    </div>
                 </div>
               )}
            </div>
          ) : (
            <div className="bg-blue-600 p-8 rounded-[40px] text-white shadow-2xl relative overflow-hidden group h-full flex flex-col justify-center">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-125 transition-transform duration-700"></div>
              <Box className="w-12 h-12 text-blue-200 mb-8" />
              <h4 className="text-2xl font-black mb-3 leading-tight">Monitoramento Industrial</h4>
              <p className="text-sm text-blue-100 mb-8 leading-relaxed font-medium">Selecione um ativo para visualizar telemetria em tempo real, histórico de manutenções e documentação técnica.</p>
              <div className="flex items-center gap-3 text-xs font-bold text-blue-200">
                 <ShieldCheck className="w-5 h-5" /> 100% Rastreável
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssetManagement;
