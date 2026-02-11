
import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Clock, MapPin, User, CheckCircle2, Camera, FileText, 
  MessageSquare, History, MoreVertical, Play, CheckCircle, AlertCircle, 
  PenTool, Sparkles, Search, ExternalLink, Map as MapIcon, Store, X, 
  Trash2, ChevronRight, Navigation, Eye, Zap, Loader2, Video, 
  GraduationCap, FileDown, Globe, Plus, ImageIcon, Package, 
  ShoppingCart, FileUp, Wand2, BrainCircuit, Receipt, DollarSign,
  ChevronDown, Layout, Send, ClipboardList
} from 'lucide-react';
import AuditTimeline from './AuditTimeline';
import { aiService } from '../services/aiService';
import { logService } from '../services/logService';
import { notificationService } from '../services/notificationService';
import { inventoryService, Product } from '../services/inventoryService';
import { expenseService, Expense } from '../services/expenseService';
import AIVideoGuide from './AIVideoGuide';
import SignaturePad from './SignaturePad';
import CheckInOut from './CheckInOut';
import { AuditLog } from '../types';

const OSDetail: React.FC<{ onBack: () => void, osId?: string }> = ({ onBack, osId = 'OS-5491' }) => {
  const [activeTab, setActiveTab] = useState('geral');
  const [osData, setOsData] = useState<any>(null);
  const [analyzingImageId, setAnalyzingImageId] = useState<number | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isSignatureOpen, setIsSignatureOpen] = useState(false);
  const [technicalReport, setTechnicalReport] = useState('');
  const [noteInput, setNoteInput] = useState('');
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('servicopro_os_data');
    if (saved) {
      const list = JSON.parse(saved);
      const os = list.find((o: any) => o.id === osId);
      setOsData(os || list[0]);
    }
    loadLogs();
  }, [osId]);

  const loadLogs = () => {
    setAuditLogs(logService.getLogs(osId));
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteInput.trim()) return;
    
    logService.addLog({
      target_id: osId,
      target_type: 'service_order',
      action: 'Adicionou nota técnica',
      type: 'comment',
      new_value: noteInput
    });

    setNoteInput('');
    loadLogs();
  };

  const onStatusUpdate = (newStatus: string) => {
    const oldStatus = osData.status;
    if (oldStatus === newStatus) return;

    const updatedOS = { ...osData, status: newStatus };
    setOsData(updatedOS);
    
    // Atualiza no Storage Global
    const saved = localStorage.getItem('servicopro_os_data');
    if (saved) {
      const list = JSON.parse(saved);
      const newList = list.map((o: any) => o.id === osId ? updatedOS : o);
      localStorage.setItem('servicopro_os_data', JSON.stringify(newList));
    }

    logService.addLog({
      target_id: osId,
      target_type: 'service_order',
      action: 'Alteração de Status Operacional',
      type: 'status',
      old_value: oldStatus,
      new_value: newStatus
    });

    // Gatilho de Push para o Técnico/Gestor
    notificationService.notifyStatusUpdate(osId.split('-')[1] || osId, newStatus);
    
    loadLogs();
  };

  if (!osData) return null;

  return (
    <div className="space-y-6 animate-in slide-in-from-right-8 duration-500 pb-12 relative max-w-7xl mx-auto">
      <AIVideoGuide 
        isOpen={isVideoModalOpen} 
        onClose={() => setIsVideoModalOpen(false)} 
        initialPrompt={`Revisão programada: ${osData.title}`}
      />

      {isSignatureOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
           <SignaturePad 
              onSave={() => {
                setIsSignatureOpen(false);
                onStatusUpdate('completed');
                onBack();
              }}
              onCancel={() => setIsSignatureOpen(false)}
           />
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-white rounded-xl border border-transparent hover:border-gray-200 transition-all shadow-sm bg-white">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">{osData.id}</h2>
              <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full ${
                osData.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 
                osData.status === 'in_progress' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
              }`}>
                {osData.status}
              </span>
            </div>
            <p className="text-xs text-gray-500 font-medium">{osData.customer} • {osData.title}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="flex border-b border-gray-200 gap-8 overflow-x-auto pb-1 custom-scrollbar bg-white px-2 rounded-t-3xl pt-2">
            {[
              { id: 'geral', label: 'Visão Geral' },
              { id: 'checklist', label: 'Protocolo' },
              { id: 'historico', label: 'Auditoria & Notas' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-4 text-[10px] font-black uppercase tracking-widest transition-all relative whitespace-nowrap px-4 ${
                  activeTab === tab.id ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 rounded-t-full"></div>}
              </button>
            ))}
          </div>

          <div className="min-h-[500px]">
            {activeTab === 'geral' && (
              <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-8 animate-in fade-in">
                <CheckInOut osId={osData.id} onStatusChange={onStatusUpdate} />
                
                <div className="p-8 bg-gray-50 rounded-[40px] border border-gray-100 space-y-4">
                   <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                     <FileText className="w-3.5 h-3.5" /> Descrição da Ordem
                   </h4>
                   <p className="text-sm font-medium text-gray-700 leading-relaxed">{osData.description}</p>
                </div>

                <div className="p-8 bg-gray-900 rounded-[40px] text-white relative overflow-hidden group">
                   <h4 className="text-lg font-black mb-2 flex items-center gap-2"><Sparkles className="w-5 h-5 text-blue-400" /> Copiloto Técnico IA</h4>
                   <p className="text-sm text-gray-400 leading-relaxed font-medium mb-6">Utilize o guia assistido para garantir conformidade técnica neste tipo de atendimento.</p>
                   <button onClick={() => setIsVideoModalOpen(true)} className="w-full py-4 bg-white text-gray-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-50 transition-all flex items-center justify-center gap-2">
                      <Play className="w-4 h-4 fill-current" /> Ver Guia de Treinamento IA
                   </button>
                </div>
              </div>
            )}

            {activeTab === 'checklist' && (
              <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm animate-in slide-in-from-top-4 text-center py-20">
                <ClipboardList className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                <p className="text-sm text-gray-500 font-medium">Configure protocolos específicos na tela de Tipos de Serviço.</p>
              </div>
            )}

            {activeTab === 'historico' && (
              <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm animate-in fade-in space-y-10">
                <div className="space-y-4">
                   <h3 className="text-lg font-black text-gray-900 px-1">Notas e Comentários</h3>
                   <form onSubmit={handleAddNote} className="relative">
                      <textarea 
                        value={noteInput}
                        onChange={(e) => setNoteInput(e.target.value)}
                        placeholder="Adicione um comentário ou nota importante..."
                        className="w-full p-6 bg-gray-50 border-none rounded-[32px] text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px] resize-none pr-20 shadow-inner"
                      />
                      <button type="submit" className="absolute bottom-4 right-4 p-3 bg-blue-600 text-white rounded-2xl shadow-xl hover:bg-blue-700 transition-all active:scale-90">
                         <Send className="w-5 h-5" />
                      </button>
                   </form>
                </div>
                <div className="pt-4">
                   <AuditTimeline logs={auditLogs} />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-6">
             <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Resumo Financeiro</h4>
             <div className="space-y-4">
                <div className="flex justify-between text-sm">
                   <span className="text-gray-500 font-medium">Valor Base</span>
                   <span className="font-black text-gray-900">R$ {osData.total_value?.toFixed(2) || '0.00'}</span>
                </div>
                <div className="pt-6 border-t border-gray-100 flex justify-between items-center">
                   <span className="text-xs font-black text-blue-600 uppercase tracking-widest">Total</span>
                   <span className="text-3xl font-black text-gray-900 tracking-tighter">R$ {osData.total_value?.toFixed(2) || '0.00'}</span>
                </div>
             </div>
             {osData.status !== 'completed' && (
                <button 
                  onClick={() => setIsSignatureOpen(true)}
                  className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-700 shadow-xl shadow-emerald-100 transition-all"
                >
                  Concluir e Assinar
                </button>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OSDetail;
