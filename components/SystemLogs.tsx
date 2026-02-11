
import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Search, 
  Terminal, 
  ShieldAlert, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Filter,
  Download,
  Trash2,
  RefreshCw,
  Tag,
  ArrowRight
} from 'lucide-react';
import { logService } from '../services/logService';
import { AuditLog } from '../types';

const SystemLogs: React.FC = () => {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = () => {
    setLogs(logService.getAllLogs());
  };

  const filteredLogs = logs.filter(log => 
    log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.target_id.includes(searchTerm)
  );

  const handleClear = () => {
    if (confirm("Deseja apagar permanentemente todos os logs de auditoria?")) {
      logService.clearLogs();
      loadLogs();
    }
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-8 duration-700 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">Logs e Auditoria do Sistema</h2>
          <p className="text-gray-500 font-medium">Histórico imutável de todas as alterações em OS e Clientes.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={handleClear} className="flex items-center gap-2 bg-white border border-red-100 px-4 py-2.5 rounded-xl text-xs font-bold text-red-500 hover:bg-red-50 transition-all">
            <Trash2 className="w-4 h-4" />
            Limpar Auditoria
          </button>
          <button onClick={loadLogs} className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all">
            <RefreshCw className="w-4 h-4" />
            Atualizar
          </button>
        </div>
      </div>

      <div className="bg-gray-900 rounded-[40px] border border-gray-800 shadow-2xl overflow-hidden">
        <div className="p-6 border-b border-gray-800 flex items-center justify-between bg-black/20">
          <div className="flex items-center gap-4">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            </div>
            <div className="h-4 w-px bg-gray-800"></div>
            <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Console SaaS Auditor</p>
          </div>
          <div className="flex gap-4">
             <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-600" />
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Filtrar eventos..." 
                  className="pl-9 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-xl text-[10px] font-bold text-gray-300 outline-none focus:border-indigo-500 transition-all w-48" 
                />
             </div>
          </div>
        </div>

        <div className="p-4 space-y-2 max-h-[600px] overflow-y-auto custom-scrollbar-dark">
          {filteredLogs.length > 0 ? filteredLogs.map((log) => (
            <div key={log.id} className="p-4 rounded-2xl hover:bg-white/5 border border-transparent hover:border-gray-800 transition-all group flex gap-6">
              <div className="flex-shrink-0 mt-1">
                 {log.type === 'status' && <Clock className="w-4 h-4 text-amber-500" />}
                 {log.type === 'edit' && <RefreshCw className="w-4 h-4 text-blue-500" />}
                 {log.type === 'system' && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                 {log.type === 'comment' && <Terminal className="w-4 h-4 text-indigo-400" />}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black text-white uppercase">{log.action}</span>
                    <span className="text-[9px] font-bold text-indigo-400 px-1.5 py-0.5 bg-indigo-500/10 rounded uppercase">
                      {log.target_type === 'service_order' ? 'OS' : 'Cliente'}: {log.target_id}
                    </span>
                  </div>
                  <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">
                    {new Date(log.created_at).toLocaleString('pt-BR')}
                  </span>
                </div>
                
                {log.old_value && log.new_value && (
                  <div className="flex items-center gap-2 py-1">
                    <span className="text-[10px] text-gray-500 line-through">{log.old_value}</span>
                    <ArrowRight className="w-2 h-2 text-gray-700" />
                    <span className="text-[10px] text-blue-400 font-bold">{log.new_value}</span>
                  </div>
                )}

                <div className="flex items-center gap-2 pt-1 opacity-40">
                  <span className="text-[9px] font-mono text-gray-500">Operador: {log.user_name}</span>
                </div>
              </div>
            </div>
          )) : (
            <div className="p-20 text-center space-y-4">
               <Terminal className="w-12 h-12 text-gray-800 mx-auto opacity-20" />
               <p className="text-gray-600 font-bold text-xs uppercase tracking-widest">Nenhum evento registrado no sistema.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SystemLogs;
