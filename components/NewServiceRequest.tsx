
import React, { useState } from 'react';
import { 
  X, 
  Send, 
  FileText, 
  AlertCircle, 
  Camera, 
  MapPin,
  Clock,
  CheckCircle2
} from 'lucide-react';

interface Props {
  onClose: () => void;
  onSuccess: () => void;
}

const NewServiceRequest: React.FC<Props> = ({ onClose, onSuccess }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 2) setStep(step + 1);
    else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        onSuccess();
      }, 1500);
    }
  };

  return (
    <div className="bg-white rounded-[32px] border border-gray-100 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 max-w-xl mx-auto">
      <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-xl">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-black text-gray-900 tracking-tight">Nova Solicitação</h3>
            <p className="text-xs text-gray-500 font-medium">Descreva o problema para abrirmos um chamado.</p>
          </div>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-white rounded-full transition-colors text-gray-400">
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="p-8">
        {/* Progress Bar */}
        <div className="flex items-center gap-2 mb-8">
          <div className={`h-1.5 flex-1 rounded-full transition-all ${step >= 1 ? 'bg-blue-600' : 'bg-gray-100'}`}></div>
          <div className={`h-1.5 flex-1 rounded-full transition-all ${step >= 2 ? 'bg-blue-600' : 'bg-gray-100'}`}></div>
        </div>

        <form onSubmit={handleNext} className="space-y-6">
          {step === 1 ? (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Título da Solicitação</label>
                <input 
                  type="text" 
                  placeholder="Ex: Vazamento no banheiro do 4º andar"
                  className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Descrição do Problema</label>
                <textarea 
                  rows={4}
                  placeholder="Conte-nos o que está acontecendo com o máximo de detalhes..."
                  className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Urgência</label>
                  <select className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none appearance-none">
                    <option value="low">Baixa - Pode aguardar</option>
                    <option value="medium">Normal - Preciso logo</option>
                    <option value="high">Alta - Urgente</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Localização</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                    <select className="w-full pl-10 pr-4 py-4 bg-gray-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none appearance-none">
                      <option>Sede Principal</option>
                      <option>Filial Norte</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
              <div className="p-6 border-2 border-dashed border-gray-100 rounded-[24px] text-center space-y-4 hover:border-blue-200 transition-all cursor-pointer group bg-gray-50/50">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-sm group-hover:scale-110 transition-transform">
                  <Camera className="w-8 h-8 text-gray-300 group-hover:text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-700">Adicionar Fotos</p>
                  <p className="text-[10px] text-gray-400 font-medium">Envie fotos do problema para agilizar o diagnóstico.</p>
                </div>
                <input type="file" className="hidden" multiple accept="image/*" />
              </div>

              <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100 flex gap-3">
                <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
                <p className="text-[11px] text-amber-700 font-medium leading-relaxed">
                  Lembre-se: solicitações marcadas como <b>Urgente</b> fora do horário comercial podem ter taxas adicionais de atendimento.
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Melhor Horário para Visita</label>
                <div className="relative">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                  <input 
                    type="text" 
                    placeholder="Ex: Qualquer dia após as 14h"
                    className="w-full pl-10 pr-4 py-4 bg-gray-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="pt-4 flex gap-3">
            {step > 1 && (
              <button 
                type="button" 
                onClick={() => setStep(1)}
                className="px-8 py-4 text-sm font-bold text-gray-500 hover:bg-gray-50 rounded-2xl transition-all"
              >
                Voltar
              </button>
            )}
            <button 
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-black text-sm shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  {step === 1 ? 'Próximo Passo' : 'Enviar Solicitação'}
                  <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewServiceRequest;
