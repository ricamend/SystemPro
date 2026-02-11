
import React, { useState } from 'react';
import { 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Plus, 
  Clock, 
  User, 
  Zap, 
  MoreHorizontal,
  CheckCircle2,
  AlertCircle,
  Coffee,
  Moon,
  Save,
  Trash2,
  Check,
  FileDown,
  Loader2
} from 'lucide-react';
import { jsPDF } from 'jspdf';

interface TechScheduleProps {
  onClose: () => void;
}

const technicians = [
  { id: '1', name: 'Carlos Lima', role: 'Sênior', avatar: 'CL' },
  { id: '2', name: 'Ana Souza', role: 'Pleno', avatar: 'AS' },
  { id: '3', name: 'Marcos Silva', role: 'Júnior', avatar: 'MS' },
  { id: '4', name: 'Ricardo Dias', role: 'Pleno', avatar: 'RD' },
];

const daysOfWeek = [
  { short: 'Seg', date: '21 Abr' },
  { short: 'Ter', date: '22 Abr' },
  { short: 'Qua', date: '23 Abr' },
  { short: 'Qui', date: '24 Abr' },
  { short: 'Sex', date: '25 Abr' },
  { short: 'Sáb', date: '26 Abr' },
  { short: 'Dom', date: '27 Abr' },
];

const initialShifts: Record<string, string[]> = {
  '1': ['N', 'N', 'P', 'N', 'N', 'F', 'F'],
  '2': ['N', 'P', 'N', 'N', 'N', 'E', 'F'],
  '3': ['F', 'N', 'N', 'N', 'P', 'N', 'F'],
  '4': ['N', 'N', 'F', 'F', 'N', 'N', 'P'],
};

const ShiftBadge = ({ type }: { type: string }) => {
  switch (type) {
    case 'N':
      return <div className="bg-blue-50 text-blue-600 border border-blue-100 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase text-center w-full group-hover:bg-blue-600 group-hover:text-white transition-all">08:00 - 18:00</div>;
    case 'P':
      return <div className="bg-amber-50 text-amber-600 border border-amber-100 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase text-center w-full flex items-center justify-center gap-1 group-hover:bg-amber-500 group-hover:text-white transition-all"><Moon className="w-3 h-3" /> Plantão</div>;
    case 'E':
      return <div className="bg-emerald-50 text-emerald-600 border border-emerald-100 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase text-center w-full group-hover:bg-emerald-600 group-hover:text-white transition-all">Hora Extra</div>;
    case 'F':
      return <div className="bg-gray-50 text-gray-400 border border-gray-100 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase text-center w-full flex items-center justify-center gap-1 group-hover:bg-gray-200 transition-all"><Coffee className="w-3 h-3" /> Folga</div>;
    default:
      return <div className="border-2 border-dashed border-gray-100 px-3 py-1.5 rounded-xl text-[10px] font-black text-gray-300 uppercase text-center w-full group-hover:border-blue-200 group-hover:text-blue-400 transition-all">+ Lançar</div>;
  }
};

const TechSchedule: React.FC<TechScheduleProps> = ({ onClose }) => {
  const [currentWeek, setCurrentWeek] = useState('Semana 17 • 2024');
  const [shifts, setShifts] = useState(initialShifts);
  const [activeCell, setActiveCell] = useState<{ techId: string, dayIdx: number } | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [showToast, setShowToast] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setShowToast(msg);
    setTimeout(() => setShowToast(null), 3000);
  };

  const handleUpdateShift = (type: string) => {
    if (!activeCell) return;
    const { techId, dayIdx } = activeCell;
    const newShifts = { ...shifts };
    newShifts[techId][dayIdx] = type;
    setShifts(newShifts);
    setActiveCell(null);
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simula delay de rede
    await new Promise(resolve => setTimeout(resolve, 1200));
    setIsSaving(false);
    triggerToast("Escala salva com sucesso!");
  };

  const handleGeneratePDF = async () => {
    setIsExporting(true);
    try {
      const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });

      const blueBrand = [59, 130, 246];
      const grayDark = [31, 41, 55];
      const grayLight = [156, 163, 175];

      // Cabeçalho
      doc.setFillColor(blueBrand[0], blueBrand[1], blueBrand[2]);
      doc.rect(0, 0, 297, 35, 'F');
      
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(22);
      doc.setFont("helvetica", "bold");
      doc.text("ServiçoPro | Escala de Trabalho", 15, 20);
      
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(`Período: ${currentWeek} | Gerado em: ${new Date().toLocaleDateString('pt-BR')}`, 15, 28);

      // Tabela
      const startX = 15;
      let startY = 50;
      const colWidths = [60, 30, 30, 30, 30, 30, 30, 30]; // Tech + 7 days = 270mm total

      // Header da Tabela
      doc.setFillColor(245, 245, 245);
      doc.rect(startX, startY, 270, 12, 'F');
      doc.setTextColor(grayLight[0], grayLight[1], grayLight[2]);
      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      
      doc.text("TÉCNICO", startX + 5, startY + 8);
      daysOfWeek.forEach((day, i) => {
        doc.text(day.short.toUpperCase(), startX + colWidths[0] + (i * colWidths[1]) + (colWidths[1]/2), startY + 8, { align: 'center' });
      });

      startY += 12;

      // Linhas dos Técnicos
      technicians.forEach((tech, index) => {
        // Zebra effect
        if (index % 2 !== 0) {
          doc.setFillColor(252, 252, 252);
          doc.rect(startX, startY, 270, 15, 'F');
        }
        
        doc.setDrawColor(240, 240, 240);
        doc.line(startX, startY + 15, startX + 270, startY + 15);

        doc.setTextColor(grayDark[0], grayDark[1], grayDark[2]);
        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.text(tech.name, startX + 5, startY + 7);
        
        doc.setFontSize(7);
        doc.setTextColor(grayLight[0], grayLight[1], grayLight[2]);
        doc.text(tech.role.toUpperCase(), startX + 5, startY + 11);

        // Turnos
        const techShifts = shifts[tech.id];
        techShifts.forEach((s, i) => {
          const cellX = startX + colWidths[0] + (i * colWidths[1]);
          const cellY = startY;
          
          if (s === 'N') {
            doc.setTextColor(59, 130, 246);
            doc.setFontSize(8);
            doc.text("08:00 - 18:00", cellX + (colWidths[1]/2), cellY + 9, { align: 'center' });
          } else if (s === 'P') {
            doc.setTextColor(245, 158, 11);
            doc.setFontSize(8);
            doc.text("PLANTÃO", cellX + (colWidths[1]/2), cellY + 9, { align: 'center' });
          } else if (s === 'E') {
            doc.setTextColor(16, 185, 129);
            doc.setFontSize(8);
            doc.text("EXTRA", cellX + (colWidths[1]/2), cellY + 9, { align: 'center' });
          } else if (s === 'F') {
            doc.setTextColor(156, 163, 175);
            doc.setFontSize(8);
            doc.text("FOLGA", cellX + (colWidths[1]/2), cellY + 9, { align: 'center' });
          } else {
            doc.setTextColor(230, 230, 230);
            doc.text("-", cellX + (colWidths[1]/2), cellY + 9, { align: 'center' });
          }
        });

        startY += 15;
      });

      // Legenda no rodapé
      doc.setFontSize(7);
      doc.setTextColor(grayLight[0], grayLight[1], grayLight[2]);
      doc.text("LEGENDA: N = Normal (08-18h) | P = Plantão 24h | E = Hora Extra | F = Folga / DSR", startX, 195);
      doc.text("Documento de uso interno. Sujeito a alterações sem aviso prévio via sistema ServiçoPro.", 282, 195, { align: 'right' });

      doc.save(`Escala_Trabalho_${currentWeek.replace(' • ', '_')}.pdf`);
      triggerToast("PDF gerado com sucesso!");
    } catch (err) {
      console.error(err);
      alert("Erro ao gerar PDF.");
    } finally {
      setIsExporting(false);
    }
  };

  const shiftOptions = [
    { id: 'N', label: 'Normal (08:18h)', icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 'P', label: 'Plantão 24h', icon: Moon, color: 'text-amber-600', bg: 'bg-amber-50' },
    { id: 'E', label: 'Hora Extra', icon: Zap, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { id: 'F', label: 'Folga / DSR', icon: Coffee, color: 'text-gray-500', bg: 'bg-gray-100' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12 relative bg-gray-50 min-h-full">
      {showToast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[600] bg-gray-900 text-white px-8 py-4 rounded-3xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-top-8">
           <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
           <span className="font-black text-sm uppercase tracking-widest">{showToast}</span>
        </div>
      )}

      {activeCell && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white w-full max-w-sm rounded-[40px] shadow-2xl overflow-hidden border border-gray-100 animate-in zoom-in-95">
             <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
                <div>
                   <h3 className="text-xl font-black text-gray-900 tracking-tight">Lançar Turno</h3>
                   <p className="text-xs text-gray-500 font-medium">
                     {technicians.find(t => t.id === activeCell.techId)?.name} • {daysOfWeek[activeCell.dayIdx].short}
                   </p>
                </div>
                <button onClick={() => setActiveCell(null)} className="p-2 hover:bg-white rounded-full text-gray-400"><X className="w-5 h-5" /></button>
             </div>
             
             <div className="p-6 space-y-3">
                {shiftOptions.map((opt) => (
                  <button 
                    key={opt.id}
                    onClick={() => handleUpdateShift(opt.id)}
                    className="w-full flex items-center justify-between p-4 rounded-2xl border-2 border-transparent hover:border-blue-600 hover:bg-blue-50/30 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl ${opt.bg} ${opt.color} group-hover:scale-110 transition-transform`}>
                        <opt.icon className="w-5 h-5" />
                      </div>
                      <span className="text-sm font-black text-gray-800">{opt.label}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-blue-600" />
                  </button>
                ))}
                
                <button 
                  onClick={() => handleUpdateShift('')}
                  className="w-full flex items-center gap-3 p-4 rounded-2xl text-red-500 hover:bg-red-50 transition-colors font-bold text-xs uppercase tracking-widest mt-4"
                >
                  <Trash2 className="w-4 h-4" /> Remover Escala
                </button>
             </div>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50">
        <div className="flex items-center gap-4">
          <button onClick={onClose} className="p-2 hover:bg-white rounded-xl transition-all border border-transparent hover:border-gray-200">
            <ChevronLeft className="w-5 h-5 text-gray-500" />
          </button>
          <div>
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">Escala de Trabalho</h2>
            <p className="text-gray-500 font-medium">Gestão de turnos e disponibilidade da equipe.</p>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex bg-white border border-gray-200 p-1 rounded-2xl shadow-sm">
            <button className="p-2 hover:bg-gray-50 rounded-xl transition-all"><ChevronLeft className="w-4 h-4 text-gray-400" /></button>
            <span className="px-4 flex items-center text-xs font-black uppercase tracking-widest text-gray-600">{currentWeek}</span>
            <button className="p-2 hover:bg-gray-50 rounded-xl transition-all"><ChevronRight className="w-4 h-4 text-gray-400" /></button>
          </div>
          
          <button 
            onClick={handleGeneratePDF}
            disabled={isExporting}
            className="flex items-center gap-2 bg-white border border-gray-200 px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest text-gray-600 hover:bg-gray-50 shadow-sm transition-all active:scale-95 disabled:opacity-50"
          >
            {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileDown className="w-4 h-4 text-blue-600" />}
            PDF Paisagem
          </button>

          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-emerald-100 hover:bg-emerald-700 transition-all active:scale-95 disabled:opacity-50"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Salvar Alterações
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="p-8 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest min-w-[240px]">Técnico</th>
                {daysOfWeek.map((day, idx) => (
                  <th key={idx} className="p-6 text-center min-w-[140px]">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{day.short}</p>
                    <p className="text-xs font-black text-gray-900 mt-1">{day.date}</p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {technicians.map((tech) => (
                <tr key={tech.id} className="hover:bg-blue-50/20 transition-all group">
                  <td className="p-8">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-[20px] bg-white border border-gray-100 shadow-sm flex items-center justify-center font-black text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                        {tech.avatar}
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-gray-900">{tech.name}</h4>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{tech.role}</p>
                      </div>
                    </div>
                  </td>
                  {shifts[tech.id].map((shift, idx) => (
                    <td key={idx} className="p-4">
                       <button 
                         onClick={() => setActiveCell({ techId: tech.id, dayIdx: idx })}
                         className="w-full cursor-pointer hover:scale-105 transition-transform active:scale-95 group focus:outline-none"
                       >
                          <ShiftBadge type={shift} />
                       </button>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
           <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6 px-1">Guia de Cores</h4>
           <div className="grid grid-cols-2 gap-3">
              {shiftOptions.map(opt => (
                <div key={opt.id} className="flex items-center gap-2 p-2 rounded-xl bg-gray-50">
                   <div className={`w-2 h-2 rounded-full ${opt.color.replace('text-', 'bg-')}`}></div>
                   <span className="text-[10px] font-black text-gray-600 uppercase">{opt.id}</span>
                </div>
              ))}
           </div>
        </div>

        <div className="md:col-span-2 bg-gray-900 p-8 rounded-[40px] text-white relative overflow-hidden group shadow-2xl">
           <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:scale-125 transition-transform duration-700"></div>
           <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-white/10 rounded-2xl"><Clock className="w-6 h-6 text-blue-400" /></div>
              <h4 className="text-xl font-black">Escala Inteligente Ativada</h4>
           </div>
           <p className="text-sm text-gray-400 leading-relaxed font-medium mb-8 max-w-xl">
             Clique em qualquer célula da tabela para lançar um novo turno ou folga. O sistema recalcula automaticamente a disponibilidade da frota no mapa.
           </p>
           <div className="flex gap-3">
              <button onClick={handleGeneratePDF} className="bg-white text-gray-900 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-50 transition-all shadow-xl">Imprimir Folha</button>
              <button className="bg-white/10 border border-white/10 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/20 transition-all">Enviar para WhatsApp</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default TechSchedule;
