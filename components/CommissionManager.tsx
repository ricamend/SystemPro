
import React, { useState } from 'react';
import { 
  DollarSign, 
  Users, 
  Download, 
  ChevronRight, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  TrendingUp,
  Search,
  Loader2,
  CheckCircle,
  X,
  AlertTriangle,
  RotateCcw,
  Lock,
  Unlock,
  ShieldCheck,
  FileLock2
} from 'lucide-react';

const CommissionManager: React.FC = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [isClosingPeriod, setIsClosingPeriod] = useState(false);
  const [isReopeningPeriod, setIsReopeningPeriod] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isRestoreModalOpen, setIsRestoreModalOpen] = useState(false);
  const [isPeriodClosed, setIsPeriodClosed] = useState(false);
  const [showToast, setShowToast] = useState<string | null>(null);

  // Dados transformados em estado para permitir manipulação (Fechar/Reabrir)
  const [commissions, setCommissions] = useState([
    { id: '1', tech: 'Carlos Lima', os_count: 12, total_revenue: 4500.00, commission: 450.00, status: 'pending' },
    { id: '2', tech: 'Ana Souza', os_count: 15, total_revenue: 8200.00, commission: 1230.00, status: 'paid' },
    { id: '3', tech: 'Marcos Silva', os_count: 8, total_revenue: 2100.00, commission: 315.00, status: 'pending' },
    { id: '4', tech: 'Ricardo Dias', os_count: 10, total_revenue: 3800.00, commission: 570.00, status: 'paid' },
  ]);

  const triggerToast = (msg: string) => {
    setShowToast(msg);
    setTimeout(() => setShowToast(null), 3000);
  };

  const handleExportCSV = () => {
    setIsExporting(true);
    setTimeout(() => {
      const headers = ['Tecnico', 'Qtd OS', 'Faturamento Total', 'Comissao', 'Status'];
      const rows = commissions.map(c => [
        c.tech, c.os_count, c.total_revenue.toFixed(2), c.commission.toFixed(2), c.status.toUpperCase()
      ]);
      const csvContent = [headers.join(';'), ...rows.map(e => e.join(';'))].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `folha_comissoes_abril.csv`);
      link.click();
      setIsExporting(false);
      triggerToast("Folha exportada para auditoria!");
    }, 1000);
  };

  const executeClosePeriod = () => {
    setIsConfirmModalOpen(false);
    setIsClosingPeriod(true);
    
    // Simula consolidação de dados: marca tudo como pago ao fechar
    setTimeout(() => {
      setCommissions(prev => prev.map(c => ({ ...c, status: 'paid' })));
      setIsClosingPeriod(false);
      setIsPeriodClosed(true);
      triggerToast("Período encerrado e bloqueado!");
    }, 1500);
  };

  const executeReopenPeriod = () => {
    setIsRestoreModalOpen(false);
    setIsReopeningPeriod(true);
    
    // Simula restauração: volta ao estado original (permitindo pendências)
    setTimeout(() => {
      setCommissions([
        { id: '1', tech: 'Carlos Lima', os_count: 12, total_revenue: 4500.00, commission: 450.00, status: 'pending' },
        { id: '2', tech: 'Ana Souza', os_count: 15, total_revenue: 8200.00, commission: 1230.00, status: 'paid' },
        { id: '3', tech: 'Marcos Silva', os_count: 8, total_revenue: 2100.00, commission: 315.00, status: 'pending' },
        { id: '4', tech: 'Ricardo Dias', os_count: 10, total_revenue: 3800.00, commission: 570.00, status: 'paid' },
      ]);
      setIsReopeningPeriod(false);
      setIsPeriodClosed(false);
      triggerToast("Período reaberto com sucesso!");
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 relative">
      {/* Toast Feedback */}
      {showToast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[500] bg-gray-900 text-white px-8 py-4 rounded-3xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-top-8">
           <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
           <span className="font-black text-sm uppercase tracking-widest">{showToast}</span>
        </div>
      )}

      {/* Modal: Fechar Período */}
      {isConfirmModalOpen && (
        <div className="fixed inset-0 z-[400] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-md rounded-[40px] shadow-2xl overflow-hidden border border-gray-100 animate-in zoom-in-95">
              <div className="p-8 text-center space-y-6">
                 <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto text-blue-600">
                    <Lock className="w-10 h-10" />
                 </div>
                 <div className="space-y-2">
                    <h3 className="text-2xl font-black text-gray-900 tracking-tight">Consolidar Período?</h3>
                    <p className="text-sm text-gray-500 font-medium px-4">
                      Esta ação irá processar todos os pagamentos de <b>Abril/2024</b> e bloquear o período para alterações.
                    </p>
                 </div>
                 <div className="grid grid-cols-2 gap-4 pt-4">
                    <button onClick={() => setIsConfirmModalOpen(false)} className="py-4 bg-gray-50 text-gray-500 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-100 transition-all">Cancelar</button>
                    <button onClick={executeClosePeriod} className="py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all">Confirmar</button>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* Modal: Reabrir Período (Restore/Rollback) */}
      {isRestoreModalOpen && (
        <div className="fixed inset-0 z-[400] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-md rounded-[40px] shadow-2xl overflow-hidden border border-gray-100 animate-in zoom-in-95">
              <div className="p-8 text-center space-y-6">
                 <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto text-orange-600">
                    <RotateCcw className="w-10 h-10" />
                 </div>
                 <div className="space-y-2">
                    <h3 className="text-2xl font-black text-gray-900 tracking-tight">Restaurar Período?</h3>
                    <p className="text-sm text-gray-500 font-medium px-4">
                      O período de <b>Abril/2024</b> será reaberto. Todos os cálculos de comissão voltarão a ser editáveis.
                    </p>
                 </div>
                 <div className="grid grid-cols-2 gap-4 pt-4">
                    <button onClick={() => setIsRestoreModalOpen(false)} className="py-4 bg-gray-50 text-gray-500 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-100 transition-all">Manter Fechado</button>
                    <button onClick={executeReopenPeriod} className="py-4 bg-orange-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-orange-100 hover:bg-orange-700 transition-all active:scale-95">Sim, Reabrir</button>
                 </div>
              </div>
           </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className={`p-4 rounded-3xl transition-all duration-500 ${isPeriodClosed ? 'bg-gray-900 text-white' : 'bg-blue-600 text-white shadow-xl shadow-blue-100'}`}>
            {isPeriodClosed ? <FileLock2 className="w-8 h-8" /> : <DollarSign className="w-8 h-8" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">Gestão de Comissões</h2>
              {isPeriodClosed ? (
                <span className="flex items-center gap-1.5 px-3 py-1 bg-gray-900 text-white text-[9px] font-black uppercase tracking-widest rounded-full animate-in zoom-in">
                  <Lock className="w-3 h-3" /> Consolidado
                </span>
              ) : (
                <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 text-[9px] font-black uppercase tracking-widest rounded-full border border-emerald-100 animate-in zoom-in">
                  <Unlock className="w-3 h-3" /> Período Aberto
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500 font-medium leading-tight mt-1">Auditando competência: Abril/2024</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={handleExportCSV}
            disabled={isExporting}
            className="flex items-center gap-2 bg-white border border-gray-200 px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-widest text-gray-600 hover:bg-gray-50 transition-all active:scale-95 disabled:opacity-50"
          >
            {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4 text-blue-600" />}
            Folha CSV
          </button>

          {isPeriodClosed ? (
            <button 
              onClick={() => setIsRestoreModalOpen(true)}
              disabled={isReopeningPeriod}
              className="flex items-center gap-2 bg-orange-50 text-orange-700 border border-orange-100 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-orange-100 transition-all active:scale-95 disabled:opacity-50 shadow-sm"
            >
              {isReopeningPeriod ? <Loader2 className="w-4 h-4 animate-spin" /> : <RotateCcw className="w-4 h-4" />}
              Reabrir Período
            </button>
          ) : (
            <button 
              onClick={() => setIsConfirmModalOpen(true)}
              disabled={isClosingPeriod}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all active:scale-95 disabled:opacity-50"
            >
              {isClosingPeriod ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
              Fechar Período
            </button>
          )}
        </div>
      </div>

      <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-700 ${isPeriodClosed ? 'opacity-70 scale-[0.99]' : 'opacity-100'}`}>
        <div className="bg-white p-7 rounded-[32px] border border-gray-100 shadow-sm">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Comprometimento</p>
          <p className="text-3xl font-black text-gray-900 mt-1 tracking-tighter">R$ 2.565,00</p>
          <div className="flex items-center gap-1.5 text-blue-500 text-[10px] font-black mt-3 uppercase">
            <ShieldCheck className="w-3.5 h-3.5" /> <span>Dados auditados via sistema</span>
          </div>
        </div>
        <div className="bg-white p-7 rounded-[32px] border border-gray-100 shadow-sm border-l-4 border-l-emerald-500">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Liquidado</p>
          <p className="text-3xl font-black text-emerald-600 mt-1 tracking-tighter">
            {isPeriodClosed ? 'R$ 2.565,00' : 'R$ 1.800,00'}
          </p>
          <div className="flex items-center gap-1.5 text-emerald-500 text-[10px] font-black mt-3 uppercase">
            <CheckCircle2 className="w-3.5 h-3.5" /> <span>{isPeriodClosed ? 'Pagamento total aprovado' : 'Aguardando fechamento'}</span>
          </div>
        </div>
        <div className="bg-white p-7 rounded-[32px] border border-gray-100 shadow-sm">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Melhor Performance</p>
          <p className="text-3xl font-black text-gray-900 mt-1 tracking-tighter">Ana Souza</p>
          <div className="flex items-center gap-1.5 text-indigo-500 text-[10px] font-black mt-3 uppercase">
            <TrendingUp className="w-3.5 h-3.5" /> <span>+25% vs meta mensal</span>
          </div>
        </div>
      </div>

      <div className={`bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden relative transition-all duration-500 ${isPeriodClosed ? 'bg-gray-50/50' : ''}`}>
        {isPeriodClosed && (
          <div className="absolute top-4 right-10 z-10 flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-2xl shadow-xl animate-in slide-in-from-right-4">
             <Lock className="w-4 h-4 text-orange-400" />
             <span className="text-[10px] font-black uppercase tracking-widest">Modo Somente Leitura</span>
          </div>
        )}

        <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              disabled={isPeriodClosed}
              placeholder={isPeriodClosed ? "Pesquisa desativada (Modo Consolidado)" : "Buscar por técnico..."}
              className="w-full pl-11 pr-4 py-4 bg-white border border-gray-100 rounded-2xl text-xs font-bold outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 shadow-inner" 
            />
          </div>
        </div>

        <div className={`overflow-x-auto transition-all duration-1000 ${isPeriodClosed ? 'grayscale opacity-50 select-none' : ''}`}>
          <table className="w-full">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="px-10 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Colaborador</th>
                <th className="px-10 py-6 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">OS</th>
                <th className="px-10 py-6 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest">Faturamento</th>
                <th className="px-10 py-6 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest">Comissão</th>
                <th className="px-10 py-6 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-10 py-6"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {commissions.map((item) => (
                <tr key={item.id} className={`group transition-colors ${isPeriodClosed ? 'cursor-not-allowed' : 'hover:bg-blue-50/30 cursor-pointer'}`}>
                  <td className="px-10 py-7">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-[11px] font-black shadow-sm transition-all ${isPeriodClosed ? 'bg-gray-200 text-gray-500' : 'bg-blue-50 text-blue-600 border border-blue-100'}`}>
                        {item.tech.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-sm font-black text-gray-900 group-hover:text-blue-600 transition-colors">{item.tech}</span>
                    </div>
                  </td>
                  <td className="px-10 py-7 text-center">
                    <span className="text-xs font-black text-gray-600 bg-gray-100 px-3 py-1 rounded-lg border border-gray-200">{item.os_count}</span>
                  </td>
                  <td className="px-10 py-7 text-right">
                    <span className="text-sm font-bold text-gray-500">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.total_revenue)}
                    </span>
                  </td>
                  <td className="px-10 py-7 text-right">
                    <span className="text-lg font-black text-gray-900 tracking-tighter">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.commission)}
                    </span>
                  </td>
                  <td className="px-10 py-7 text-center">
                    <span className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all ${
                      item.status === 'paid' 
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                        : 'bg-amber-50 text-amber-700 border-amber-100'
                    }`}>
                      {item.status === 'paid' ? 'Liquidado' : 'Pendente'}
                    </span>
                  </td>
                  <td className="px-10 py-7 text-right">
                    {!isPeriodClosed && (
                      <button className="p-2.5 text-gray-300 hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-all transform hover:scale-110">
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CommissionManager;
