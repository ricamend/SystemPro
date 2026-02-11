
import React, { useState } from 'react';
import { 
  BarChart3, 
  PieChart as PieIcon, 
  TrendingUp, 
  Download, 
  Calendar, 
  Filter,
  FileText,
  Share2,
  ChevronRight,
  Clock,
  Star,
  Package,
  ArrowUpRight,
  Zap,
  CheckCircle
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  Cell,
  PieChart,
  Pie,
  AreaChart,
  Area
} from 'recharts';

// Mock Data para os diferentes relatórios
const productivityData = [
  { name: 'Carlos', concluido: 25, pendente: 5 },
  { name: 'Ana', concluido: 32, pendente: 2 },
  { name: 'Marcos', concluido: 18, pendente: 8 },
  { name: 'Ricardo', concluido: 22, pendente: 4 },
];

const billingData = [
  { month: 'Nov', valor: 42000 },
  { month: 'Dez', valor: 48000 },
  { month: 'Jan', valor: 39000 },
  { month: 'Fev', valor: 55000 },
  { month: 'Mar', valor: 62000 },
  { month: 'Abr', valor: 75000 },
];

const slaData = [
  { day: '01/04', tempo: 3.5 },
  { day: '05/04', tempo: 4.2 },
  { day: '10/04', tempo: 2.8 },
  { day: '15/04', tempo: 5.1 },
  { day: '20/04', tempo: 3.9 },
  { day: '25/04', tempo: 3.2 },
];

const satisfactionData = [
  { name: '5 Estrelas', value: 65, color: '#10b981' },
  { name: '4 Estrelas', value: 25, color: '#3b82f6' },
  { name: '3 Estrelas', value: 7, color: '#f59e0b' },
  { name: '2 Estrelas', value: 3, color: '#ef4444' },
];

const partsData = [
  { name: 'Válvula 3/4', qtd: 85, custo: 1200 },
  { name: 'Cabo 2.5mm', qtd: 140, custo: 950 },
  { name: 'Disjuntor 20A', qtd: 45, custo: 540 },
  { name: 'Filtro Ar', qtd: 32, custo: 800 },
];

type ReportId = 'productivity' | 'billing' | 'sla' | 'satisfaction' | 'parts';

const Reports: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState<ReportId>('productivity');
  const [showToast, setShowToast] = useState<string | null>(null);

  const menuItems = [
    { id: 'productivity', label: 'Produtividade por Técnico', icon: BarChart3 },
    { id: 'billing', label: 'Faturamento Mensal', icon: TrendingUp },
    { id: 'sla', label: 'Tempo Médio de Atendimento', icon: Clock },
    { id: 'satisfaction', label: 'Satisfação do Cliente', icon: Star },
    { id: 'parts', label: 'Consumo de Peças', icon: Package },
  ];

  const triggerToast = (msg: string) => {
    setShowToast(msg);
    setTimeout(() => setShowToast(null), 3000);
  };

  const handleShare = async () => {
    const reportLabel = menuItems.find(m => m.id === selectedReport)?.label;
    const shareData = {
      title: `Relatório ServiçoPro: ${reportLabel}`,
      text: `Confira os indicadores de ${reportLabel} atualizados hoje.`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('User cancelled share');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      triggerToast('Link copiado para o clipboard!');
    }
  };

  const handleExport = () => {
    let csvRows = [];
    let filename = `relatorio_${selectedReport}.csv`;

    switch (selectedReport) {
      case 'productivity':
        csvRows.push(['Tecnico', 'Concluido', 'Pendente'].join(';'));
        productivityData.forEach(row => csvRows.push([row.name, row.concluido, row.pendente].join(';')));
        break;
      case 'billing':
        csvRows.push(['Mes', 'Valor (R$)'].join(';'));
        billingData.forEach(row => csvRows.push([row.month, row.valor].join(';')));
        break;
      case 'sla':
        csvRows.push(['Data', 'Tempo Medio (h)'].join(';'));
        slaData.forEach(row => csvRows.push([row.day, row.tempo].join(';')));
        break;
      case 'satisfaction':
        csvRows.push(['Categoria', 'Percentual (%)'].join(';'));
        satisfactionData.forEach(row => csvRows.push([row.name, row.value].join(';')));
        break;
      case 'parts':
        csvRows.push(['Peca', 'Quantidade', 'Custo Total (R$)'].join(';'));
        partsData.forEach(row => csvRows.push([row.name, row.qtd, row.custo].join(';')));
        break;
    }

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.click();
    triggerToast('Download do CSV iniciado!');
  };

  const renderActiveReport = () => {
    switch (selectedReport) {
      case 'productivity':
        return (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
              <div className="flex justify-between items-end mb-8">
                 <div>
                    <h3 className="text-xl font-black text-gray-900 tracking-tight">Performance Individual</h3>
                    <p className="text-sm text-gray-500 font-medium">Volume de ordens finalizadas vs em aberto por técnico.</p>
                 </div>
                 <div className="text-right">
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">Top Performer: Ana Souza</span>
                 </div>
              </div>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={productivityData} layout="vertical" margin={{ left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f3f4f6" />
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 700, fill: '#1f2937'}} />
                    <Tooltip cursor={{fill: 'rgba(59, 130, 246, 0.05)'}} contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)'}} />
                    <Bar dataKey="concluido" name="Concluídas" stackId="a" fill="#3b82f6" radius={[0, 0, 0, 0]} barSize={32} />
                    <Bar dataKey="pendente" name="Pendentes" stackId="a" fill="#e5e7eb" radius={[0, 8, 8, 0]} barSize={32} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Concluído</p>
                  <p className="text-3xl font-black text-gray-900 mt-1">97 OS</p>
               </div>
               <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Eficiência Geral</p>
                  <p className="text-3xl font-black text-emerald-600 mt-1">88.4%</p>
               </div>
               <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Média por Colaborador</p>
                  <p className="text-3xl font-black text-gray-900 mt-1">24.2</p>
               </div>
            </div>
          </div>
        );

      case 'billing':
        return (
          <div className="space-y-6 animate-in fade-in duration-500">
             <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
              <div className="flex justify-between items-end mb-8">
                 <div>
                    <h3 className="text-xl font-black text-gray-900 tracking-tight">Evolução de Receita</h3>
                    <p className="text-sm text-gray-500 font-medium">Crescimento mensal consolidado das operações.</p>
                 </div>
                 <div className="flex gap-2">
                    <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-1">
                       <ArrowUpRight className="w-3 h-3" /> +21% vs Dezembro
                    </span>
                 </div>
              </div>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={billingData}>
                    <defs>
                      {/* FIX: Removed duplicate x1 attribute */}
                      <linearGradient id="colorBilling" x1={0} y1={0} x2={0} y2={1}>
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 11, fontWeight: 700, fill: '#9ca3af'}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 11, fontWeight: 700, fill: '#9ca3af'}} />
                    <Tooltip contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)'}} />
                    <Area type="monotone" dataKey="valor" stroke="#3b82f6" strokeWidth={4} fillOpacity={1} fill="url(#colorBilling)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-[40px] text-white shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-blue-100 opacity-60">Ticket Médio (Abril)</p>
                  <p className="text-4xl font-black mt-2">R$ 480,50</p>
                  <div className="mt-4 flex items-center gap-2 text-xs font-bold text-blue-100">
                     <Zap className="w-4 h-4 fill-current" /> Sugestão IA: Ajustar taxa de deslocamento na zona sul.
                  </div>
               </div>
               <div className="bg-gray-900 p-8 rounded-[40px] text-white shadow-xl">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Projeção Próximo Mês</p>
                  <p className="text-4xl font-black mt-2">R$ 82.4k</p>
                  <p className="text-xs font-medium text-gray-400 mt-2">Baseado em 15 contratos recorrentes ativos.</p>
               </div>
            </div>
          </div>
        );

      case 'sla':
        return (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
              <h3 className="text-xl font-black text-gray-900 tracking-tight mb-8">Tempo Médio (Horas)</h3>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={slaData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 11, fontWeight: 700, fill: '#9ca3af'}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 11, fontWeight: 700, fill: '#9ca3af'}} />
                    <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)'}} />
                    <Bar dataKey="tempo" name="Horas" fill="#f59e0b" radius={[12, 12, 12, 12]} barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="bg-blue-50 p-8 rounded-[40px] border border-blue-100 flex items-center gap-8">
               <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-blue-600 shadow-lg shrink-0">
                  <Clock className="w-10 h-10" />
               </div>
               <div>
                  <h4 className="text-xl font-black text-blue-900 leading-tight">SLA Interno: 4h</h4>
                  <p className="text-sm text-blue-700 font-medium opacity-80 mt-1">Você está operando 15% acima da meta estabelecida. Redução na latência de despacho identificada como causa raiz.</p>
               </div>
            </div>
          </div>
        );

      case 'satisfaction':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in duration-500">
             <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center">
                <h3 className="text-lg font-black text-gray-900 uppercase tracking-widest mb-10">Net Promoter Score (NPS)</h3>
                <div className="w-48 h-48 rounded-full border-[12px] border-emerald-500 flex flex-col items-center justify-center shadow-2xl shadow-emerald-100 mb-8">
                   <span className="text-5xl font-black text-gray-900">82</span>
                   <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mt-1">Zona de Excelência</span>
                </div>
                <p className="text-sm text-gray-500 font-medium px-10">Consolidação de 145 feedbacks diretos via Portal do Cliente e WhatsApp.</p>
             </div>
             
             <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm">
                <h3 className="text-lg font-black text-gray-900 uppercase tracking-widest mb-10">Distribuição de Estrelas</h3>
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={satisfactionData}
                        innerRadius={80}
                        outerRadius={100}
                        paddingAngle={8}
                        dataKey="value"
                      >
                        {satisfactionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-3 mt-4">
                   {satisfactionData.map(item => (
                     <div key={item.name} className="flex items-center justify-between text-xs font-bold">
                        <div className="flex items-center gap-2">
                           <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                           <span className="text-gray-600">{item.name}</span>
                        </div>
                        <span className="text-gray-900">{item.value}%</span>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        );

      case 'parts':
        return (
          <div className="space-y-6 animate-in fade-in duration-500">
             <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
                <h3 className="text-xl font-black text-gray-900 tracking-tight mb-10">Top Peças Consumidas</h3>
                <div className="overflow-x-auto">
                   <table className="w-full">
                      <thead>
                         <tr className="text-left border-b border-gray-50">
                            <th className="pb-6 text-[10px] font-black text-gray-400 uppercase tracking-widest px-4">Item</th>
                            <th className="pb-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Quantidade</th>
                            <th className="pb-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right px-4">Custo Total</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                         {partsData.map(part => (
                           <tr key={part.name} className="group hover:bg-gray-50 transition-colors">
                              <td className="py-6 px-4">
                                 <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 font-bold group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                                       <Package className="w-5 h-5" />
                                    </div>
                                    <span className="text-sm font-black text-gray-900">{part.name}</span>
                                 </div>
                              </td>
                              <td className="py-6 text-center text-sm font-black text-gray-700">{part.qtd} un.</td>
                              <td className="py-6 text-right px-4 text-sm font-black text-blue-600">R$ {part.custo.toLocaleString()}</td>
                           </tr>
                         ))}
                      </tbody>
                   </table>
                </div>
             </div>
             <div className="p-8 bg-gray-900 rounded-[40px] text-white flex items-center justify-between shadow-2xl">
                <div className="space-y-1">
                   <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Patrimônio em Campo (Mês)</p>
                   <p className="text-3xl font-black">R$ 14.850,00</p>
                </div>
                <button className="bg-white text-gray-900 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-50 transition-all shadow-xl">
                   Auditar Insumos
                </button>
             </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20 max-w-7xl mx-auto relative">
      {showToast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[300] bg-emerald-600 text-white px-8 py-4 rounded-3xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-top-8">
           <CheckCircle className="w-6 h-6" />
           <span className="font-black text-sm uppercase tracking-widest">{showToast}</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Business Intelligence</h2>
          <p className="text-gray-500 font-medium">Extraia inteligência acionável dos seus dados operacionais.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleShare}
            className="flex items-center gap-2 bg-white border border-gray-200 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest text-gray-600 hover:bg-gray-50 shadow-sm transition-all active:scale-95"
          >
            <Share2 className="w-4 h-4" />
            Compartilhar
          </button>
          <button 
            onClick={handleExport}
            className="flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all hover:scale-105 active:scale-95"
          >
            <Download className="w-4 h-4" />
            Exportar Analytics
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        <div className="lg:col-span-1 space-y-6">
          <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] px-4">Categorias Analíticas</h3>
          <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden p-2">
            {menuItems.map((item) => (
              <button 
                key={item.id}
                onClick={() => setSelectedReport(item.id as ReportId)}
                className={`w-full flex items-center justify-between p-5 text-left rounded-[24px] transition-all duration-300 group ${
                  selectedReport === item.id ? 'bg-blue-600 text-white shadow-xl shadow-blue-100' : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-4">
                  <item.icon className={`w-5 h-5 ${selectedReport === item.id ? 'text-white' : 'text-gray-300 group-hover:text-blue-500'} transition-colors`} />
                  <span className="text-xs font-black uppercase tracking-widest">{item.label}</span>
                </div>
                <ChevronRight className={`w-4 h-4 ${selectedReport === item.id ? 'text-white/50' : 'text-gray-300'} group-hover:translate-x-1 transition-all`} />
              </button>
            ))}
          </div>
          
          <div className="bg-indigo-900 p-8 rounded-[40px] text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-110 transition-transform duration-700"></div>
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
               <Zap className="w-6 h-6 text-indigo-200 fill-current" />
            </div>
            <h4 className="text-lg font-black text-white leading-tight mb-2">Build Personalizado</h4>
            <p className="text-[10px] text-indigo-200 font-bold uppercase tracking-widest leading-relaxed opacity-80">
              Combine métricas e crie seus próprios dashboards no Builder Visual.
            </p>
            <button className="mt-6 w-full py-4 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-50 transition-all border border-indigo-400/30">Lançar ReportBuilder</button>
          </div>
        </div>

        <div className="lg:col-span-3">
          {renderActiveReport()}
        </div>
      </div>
    </div>
  );
};

export default Reports;
