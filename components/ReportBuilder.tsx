
import React, { useState, useMemo } from 'react';
import { 
  BarChart3, 
  Download, 
  Save, 
  X,
  Table as TableIcon,
  CheckCircle,
  Loader2,
  TrendingUp,
  TrendingDown,
  ChevronRight
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell 
} from 'recharts';
import { jsPDF } from 'jspdf';

const ReportBuilder: React.FC = () => {
  const [selectedMetrics, setSelectedMetrics] = useState(['Total de OS', 'Faturamento', 'Ticket Médio', 'Tempo de Resposta']);
  const [reportType, setReportType] = useState<'bar' | 'table'>('bar');
  const [showToast, setShowToast] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const metrics = [
    'Total de OS', 'Faturamento', 'Ticket Médio', 'Tempo de Resposta', 
    'Satisfação Média', 'OS por Técnico', 'Peças Utilizadas', 'Inadimplência'
  ];

  const metricValues: Record<string, { val: string, raw: number, trend: string, status: string, percent: number, color: string }> = {
    'Total de OS': { val: '156', raw: 156, trend: '+12%', status: 'Acima da Meta', percent: 85, color: '#3b82f6' },
    'Faturamento': { val: 'R$ 12.450', raw: 12450, trend: '+8%', status: 'Estável', percent: 70, color: '#6366f1' },
    'Ticket Médio': { val: 'R$ 480', raw: 480, trend: '+3%', status: 'Crescente', percent: 60, color: '#8b5cf6' },
    'Tempo de Resposta': { val: '2.4h', raw: 2.4, trend: '-15%', status: 'Excelente', percent: 95, color: '#10b981' },
    'Satisfação Média': { val: '4.9', raw: 4.9, trend: '+2%', status: 'Meta Batida', percent: 98, color: '#f59e0b' },
    'OS por Técnico': { val: '24.2', raw: 24.2, trend: '+5%', status: 'Produtivo', percent: 80, color: '#ec4899' },
    'Peças Utilizadas': { val: '412', raw: 412, trend: '+10%', status: 'Giro Alto', percent: 55, color: '#06b6d4' },
    'Inadimplência': { val: '2.1%', raw: 2.1, trend: '-1%', status: 'Controlado', percent: 90, color: '#ef4444' }
  };

  const chartData = useMemo(() => {
    return selectedMetrics
      .filter(m => metricValues[m])
      .map(m => ({
        name: m,
        value: Number(metricValues[m].percent) || 0,
        display: metricValues[m].val,
        color: metricValues[m].color
      }));
  }, [selectedMetrics]);

  const triggerToast = (msg: string) => {
    setShowToast(msg);
    setTimeout(() => setShowToast(null), 3000);
  };

  const handleSaveTemplate = async () => {
    if (selectedMetrics.length === 0) return;
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    triggerToast("Template salvo na biblioteca!");
  };

  const handleExportPDF = async () => {
    if (selectedMetrics.length === 0) return;
    setIsExporting(true);
    try {
      const doc = new jsPDF();
      doc.setFillColor(59, 130, 246);
      doc.rect(0, 0, 210, 40, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(22);
      doc.text("ServiçoPro | BI Report", 20, 25);
      doc.setFontSize(10);
      doc.text(`Gerado em: ${new Date().toLocaleString()}`, 20, 32);
      
      let y = 60;
      selectedMetrics.forEach((m) => {
        if (metricValues[m]) {
          doc.setTextColor(31, 41, 55);
          doc.setFontSize(12);
          doc.text(`${m}: ${metricValues[m].val} (${metricValues[m].status})`, 20, y);
          y += 10;
        }
      });
      
      doc.save("Relatorio_Personalizado.pdf");
      triggerToast("PDF exportado com sucesso!");
    } catch (e) {
      alert("Erro ao exportar.");
    } finally {
      setIsExporting(false);
    }
  };

  const renderChart = () => {
    if (selectedMetrics.length === 0) return (
      <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
        <div className="w-20 h-20 bg-gray-50 rounded-[32px] flex items-center justify-center">
          <BarChart3 className="w-10 h-10 opacity-20" />
        </div>
        <p className="text-sm font-medium">Selecione ao menos uma métrica para começar.</p>
      </div>
    );

    if (reportType === 'bar') {
      return (
        <div className="w-full h-full min-h-[400px]" key="chart-container-bar">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{fontSize: 9, fontWeight: 700, fill: '#6b7280'}} 
                interval={0}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{fontSize: 10, fontWeight: 700, fill: '#9ca3af'}} 
                domain={[0, 100]}
              />
              <Tooltip 
                cursor={{fill: '#f8fafc'}}
                contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '12px'}}
              />
              <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={32}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      );
    }

    return (
      <div className="overflow-y-auto h-full custom-scrollbar" key="chart-container-table">
        <table className="w-full text-left">
          <thead className="sticky top-0 bg-white z-10">
            <tr className="border-b border-gray-100">
              <th className="pb-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Métrica Analisada</th>
              <th className="pb-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Valor Atual</th>
              <th className="pb-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Tendência</th>
              <th className="pb-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Status Operacional</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {selectedMetrics.map(m => metricValues[m] && (
              <tr key={m} className="group hover:bg-gray-50/50 transition-colors">
                <td className="py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-8 rounded-full" style={{ backgroundColor: metricValues[m].color }}></div>
                    <span className="text-sm font-black text-gray-900">{m}</span>
                  </div>
                </td>
                <td className="py-5 text-center">
                  <span className="text-sm font-bold text-gray-700">{metricValues[m].val}</span>
                </td>
                <td className="py-5 text-center">
                  <div className={`flex items-center justify-center gap-1 text-xs font-black ${metricValues[m].trend.includes('+') ? 'text-emerald-500' : 'text-red-500'}`}>
                    {metricValues[m].trend.includes('+') ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                    {metricValues[m].trend}
                  </div>
                </td>
                <td className="py-5 text-right">
                  <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                    metricValues[m].status === 'Excelente' || metricValues[m].status === 'Meta Batida' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 
                    metricValues[m].status === 'Estável' ? 'bg-blue-50 text-blue-700 border-blue-100' : 'bg-amber-50 text-amber-700 border-amber-100'
                  }`}>
                    {metricValues[m].status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500 pb-20 relative">
      {showToast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[300] bg-gray-900 text-white px-8 py-4 rounded-3xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-top-8">
           <CheckCircle className="w-5 h-5 text-emerald-500" />
           <span className="font-black text-sm uppercase tracking-widest">{showToast}</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Report<span className="text-blue-600">Builder</span></h2>
          <p className="text-gray-500 font-medium leading-tight mt-1">Crie visões personalizadas da sua operação em segundos.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleSaveTemplate}
            disabled={isSaving || isExporting}
            className="flex items-center gap-2 bg-white border border-gray-200 px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-widest text-gray-600 hover:bg-gray-50 transition-all disabled:opacity-50"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin text-blue-600" /> : <Save className="w-4 h-4" />}
            Salvar Template
          </button>
          <button 
            onClick={handleExportPDF}
            disabled={isExporting || isSaving}
            className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
          >
            {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            {isExporting ? 'Gerando...' : 'Exportar PDF'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm space-y-6">
            <div className="space-y-4">
              <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">1. Métricas de BI</h4>
              <div className="space-y-2 max-h-[300px] overflow-y-auto custom-scrollbar pr-1">
                {metrics.map(metric => (
                  <label key={metric} className="flex items-center gap-3 p-3 rounded-xl border border-gray-50 hover:bg-gray-50 cursor-pointer transition-all group">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={selectedMetrics.includes(metric)}
                      onChange={() => {
                        if (selectedMetrics.includes(metric)) setSelectedMetrics(prev => prev.filter(m => m !== metric));
                        else setSelectedMetrics(prev => [...prev, metric]);
                      }}
                    />
                    <span className={`text-[11px] font-bold transition-colors ${selectedMetrics.includes(metric) ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-700'}`}>
                      {metric}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t border-gray-50">
              <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">2. Visualização</h4>
              <div className="grid grid-cols-1 gap-2">
                <button 
                  onClick={() => setReportType('bar')}
                  className={`p-4 rounded-xl border flex items-center gap-4 transition-all ${
                    reportType === 'bar' ? 'bg-blue-50 border-blue-200 text-blue-600 shadow-sm' : 'bg-white border-gray-100 text-gray-400 hover:border-gray-200'
                  }`}
                >
                  <BarChart3 className="w-5 h-5" />
                  <span className="text-[11px] font-black uppercase tracking-widest">Gráfico de Barras</span>
                </button>
                <button 
                  onClick={() => setReportType('table')}
                  className={`p-4 rounded-xl border flex items-center gap-4 transition-all ${
                    reportType === 'table' ? 'bg-blue-50 border-blue-200 text-blue-600 shadow-sm' : 'bg-white border-gray-100 text-gray-400 hover:border-gray-200'
                  }`}
                >
                  <TableIcon className="w-5 h-5" />
                  <span className="text-[11px] font-black uppercase tracking-widest">Tabela de Dados</span>
                </button>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-900 p-8 rounded-[40px] text-white shadow-2xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:scale-125 transition-transform duration-700"></div>
             <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-4">Dica de Gestão</p>
             <p className="text-sm font-medium text-gray-300 leading-relaxed mb-6">
               Alterne para a **Tabela de Dados** para realizar auditorias detalhadas e conferir as tendências exatas de cada indicador.
             </p>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm min-h-[550px] flex flex-col transition-all">
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-50">
              <div>
                <h3 className="text-xl font-black text-gray-900 tracking-tight">Preview do Dashboard</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedMetrics.length > 0 ? selectedMetrics.map(m => (
                    <span key={m} className="bg-gray-50 text-gray-500 text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-lg border border-gray-100">
                      {m}
                    </span>
                  )) : <span className="text-xs text-gray-400 font-medium">Nenhuma métrica selecionada</span>}
                </div>
              </div>
              {selectedMetrics.length > 0 && (
                <button 
                  onClick={() => setSelectedMetrics([])}
                  className="flex items-center gap-1.5 text-[10px] font-black text-red-500 uppercase hover:bg-red-50 px-3 py-1.5 rounded-xl transition-all"
                >
                  <X className="w-3 h-3" /> Limpar
                </button>
              )}
            </div>

            <div className="w-full h-[450px]">
              {renderChart()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportBuilder;
