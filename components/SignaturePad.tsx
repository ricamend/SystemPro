
import React, { useRef, useState, useEffect } from 'react';
import { Eraser, Check, X, PenTool, ShieldCheck } from 'lucide-react';

interface Props {
  onSave: (signatureData: string) => void;
  onCancel: () => void;
}

const SignaturePad: React.FC<Props> = ({ onSave, onCancel }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.strokeStyle = '#1e40af';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    const ratio = window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    ctx.scale(ratio, ratio);
  }, []);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    setIsEmpty(false);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx?.beginPath();
    }
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const rect = canvas.getBoundingClientRect();
    let x, y;

    if ('touches' in e) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.moveTo(x, y);
  };

  const clear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setIsEmpty(true);
    }
  };

  const handleSave = () => {
    if (isEmpty) return;
    const canvas = canvasRef.current;
    if (canvas) {
      onSave(canvas.toDataURL());
    }
  };

  return (
    <div className="bg-white rounded-[32px] border border-gray-100 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 max-w-lg w-full mx-auto">
      <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-xl text-white">
            <PenTool className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-black text-gray-900 tracking-tight">Assinatura Digital</h3>
            <p className="text-xs text-gray-500 font-medium">O cliente deve assinar na área abaixo.</p>
          </div>
        </div>
        <button onClick={onCancel} className="p-2 hover:bg-white rounded-full transition-colors text-gray-400">
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="p-8">
        <div className="relative aspect-[16/9] w-full bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 overflow-hidden touch-none">
          <canvas
            ref={canvasRef}
            className="w-full h-full cursor-crosshair"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseOut={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />
          {isEmpty && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <p className="text-sm font-bold text-gray-300 uppercase tracking-widest">Assine aqui</p>
            </div>
          )}
        </div>
        
        <div className="mt-4 flex justify-between items-center px-1">
          <button 
            onClick={clear}
            className="flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:text-red-500 transition-colors"
          >
            <Eraser className="w-4 h-4" /> Limpar área
          </button>
          <div className="flex gap-1 text-[10px] text-gray-400 font-medium italic">
            <ShieldCheck className="w-3 h-3" /> Autenticado via ServiçoPro
          </div>
        </div>
      </div>

      <div className="p-6 border-t border-gray-50 bg-gray-50/50 flex gap-3">
        <button 
          onClick={onCancel} 
          className="flex-1 px-6 py-4 text-sm font-bold text-gray-500 hover:text-gray-700 transition-colors"
        >
          Cancelar
        </button>
        <button 
          onClick={handleSave}
          disabled={isEmpty}
          className="flex-[2] flex items-center justify-center gap-2 bg-blue-600 text-white px-10 py-4 rounded-2xl font-black text-sm shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95 disabled:opacity-50"
        >
          <Check className="w-5 h-5" /> Confirmar Assinatura
        </button>
      </div>
    </div>
  );
};

export default SignaturePad;
