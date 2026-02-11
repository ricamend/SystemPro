
import React, { useState } from 'react';
import { Play, X, Loader2, Sparkles, AlertCircle, Video, Download } from 'lucide-react';
import { aiService } from '../services/aiService';

const AIVideoGuide: React.FC<{ isOpen: boolean, onClose: () => void, initialPrompt?: string }> = ({ isOpen, onClose, initialPrompt = '' }) => {
  const [prompt, setPrompt] = useState(initialPrompt);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setError(null);
    setVideoUrl(null);
    
    // @ts-ignore
    if (!await window.aistudio.hasSelectedApiKey()) {
      // @ts-ignore
      await window.aistudio.openSelectKey();
      // Fix: Following guidelines, proceed after triggering openSelectKey() instead of returning.
    }

    setLoading(true);
    setStatus('Iniciando processamento criativo...');
    
    try {
      const messages = [
        'Analisando especificações técnicas...',
        'Renderizando componentes em 3D...',
        'Sincronizando movimentos da câmera...',
        'Finalizando codificação do vídeo...'
      ];
      
      let msgIdx = 0;
      const interval = setInterval(() => {
        if (msgIdx < messages.length) {
          setStatus(messages[msgIdx]);
          msgIdx++;
        }
      }, 15000);

      const url = await aiService.generateInstructionVideo(prompt);
      setVideoUrl(url);
      clearInterval(interval);
    } catch (err: any) {
      if (err.message.includes('Requested entity was not found')) {
        // @ts-ignore
        await window.aistudio.openSelectKey();
      }
      setError('Erro ao gerar vídeo. Certifique-se de usar uma API Key com faturamento ativo.');
    } finally {
      setLoading(false);
      setStatus('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden flex flex-col relative border border-gray-100">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200 z-10 transition-colors">
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-600 rounded-2xl text-white shadow-xl">
              <Video className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black text-gray-900 tracking-tight">Gerador de Guia em Vídeo IA</h3>
              <p className="text-xs text-gray-500 font-medium">Crie instruções visuais realistas para procedimentos complexos.</p>
            </div>
          </div>

          {!videoUrl && !loading && (
            <div className="space-y-4 animate-in slide-in-from-bottom-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">O que o vídeo deve mostrar?</label>
                <textarea 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Ex: Como realizar a sangria de uma bomba de recalque horizontal modelo KSB..."
                  className="w-full p-5 bg-gray-50 border-none rounded-[24px] text-sm font-medium focus:ring-2 focus:ring-indigo-500 outline-none transition-all h-32 resize-none"
                />
              </div>
              <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 shrink-0" />
                <p className="text-[11px] text-blue-700 font-medium leading-relaxed">
                  A geração de vídeo pode levar de 2 a 5 minutos. Você deve possuir um plano de faturamento ativo no Google Cloud.
                  <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="underline ml-1 font-bold">Saiba mais sobre faturamento.</a>
                </p>
              </div>
              <button 
                onClick={handleGenerate}
                disabled={!prompt.trim()}
                className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                Gerar Guia de Treinamento
              </button>
            </div>
          )}

          {loading && (
            <div className="flex flex-col items-center justify-center py-12 space-y-6 animate-in fade-in">
              <div className="relative">
                <div className="w-24 h-24 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
                <Video className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-indigo-600 animate-pulse" />
              </div>
              <div className="text-center space-y-2">
                <p className="text-lg font-black text-gray-900">{status}</p>
                <p className="text-xs text-gray-400 font-medium animate-pulse">A IA está gerando cada frame com precisão técnica...</p>
              </div>
            </div>
          )}

          {videoUrl && (
            <div className="space-y-6 animate-in zoom-in-95 duration-500">
              <div className="aspect-video bg-black rounded-[28px] overflow-hidden shadow-2xl relative border-4 border-white">
                <video src={videoUrl} controls className="w-full h-full object-cover" autoPlay />
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => setVideoUrl(null)}
                  className="flex-1 py-4 bg-gray-100 text-gray-700 rounded-2xl font-bold text-sm hover:bg-gray-200 transition-all"
                >
                  Gerar Outro
                </button>
                <a 
                  href={videoUrl} 
                  download="guia_tecnico.mp4"
                  className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl flex items-center justify-center gap-2 hover:bg-indigo-700"
                >
                  <Download className="w-4 h-4" /> Baixar Guia
                </a>
              </div>
            </div>
          )}

          {error && (
            <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 animate-in shake">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <p className="text-xs font-bold">{error}</p>
              <button onClick={() => setError(null)} className="ml-auto p-1 hover:bg-red-100 rounded-lg"><X className="w-4 h-4" /></button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIVideoGuide;
