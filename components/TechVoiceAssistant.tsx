import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { Mic, MicOff, X, Volume2, Bot, AlertCircle, Loader2 } from 'lucide-react';
import { encode, decode, decodeAudioData, createBlob } from '../lib/audioUtils';

const TechVoiceAssistant: React.FC<{ isOpen: boolean, onClose: () => void }> = ({ isOpen, onClose }) => {
  const [isLive, setIsLive] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [isModelTalking, setIsModelTalking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const audioContextRef = useRef<AudioContext | null>(null);
  const outputContextRef = useRef<AudioContext | null>(null);
  const sessionPromiseRef = useRef<Promise<any> | null>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef(new Set<AudioBufferSourceNode>());

  useEffect(() => {
    if (isOpen && !isLive) {
      startSession();
    }
    return () => {
      stopSession();
    };
  }, [isOpen]);

  const startSession = async () => {
    setError(null);
    try {
      // Fix: Follow initialization guidelines for GoogleGenAI using named apiKey parameter from process.env.API_KEY
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const inputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      
      audioContextRef.current = inputAudioContext;
      outputContextRef.current = outputAudioContext;

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            setIsLive(true);
            const source = inputAudioContext.createMediaStreamSource(stream);
            const scriptProcessor = inputAudioContext.createScriptProcessor(4096, 1, 1);
            
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const pcmBlob = createBlob(inputData);
              sessionPromise.then((session) => {
                session.sendRealtimeInput({ media: pcmBlob });
              });
            };
            
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputAudioContext.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            // Handle Audio Output
            const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64Audio) {
              setIsModelTalking(true);
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputAudioContext.currentTime);
              const audioBuffer = await decodeAudioData(decode(base64Audio), outputAudioContext, 24000, 1);
              const source = outputAudioContext.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(outputAudioContext.destination);
              source.onended = () => {
                sourcesRef.current.delete(source);
                if (sourcesRef.current.size === 0) setIsModelTalking(false);
              };
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              sourcesRef.current.add(source);
            }

            // Handle Transcription
            if (message.serverContent?.outputTranscription) {
              setTranscription(prev => prev + message.serverContent?.outputTranscription?.text);
            }
            if (message.serverContent?.turnComplete) {
              setTranscription('');
            }

            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => s.stop());
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
              setIsModelTalking(false);
            }
          },
          onerror: (e) => {
            console.error('Live API Error:', e);
            setError('Falha na conexão de voz.');
          },
          onclose: () => setIsLive(false),
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
          },
          systemInstruction: 'Você é o Assistente de Voz do ServiçoPro. Você ajuda técnicos no campo a realizar manutenções hidráulicas e elétricas. Seja curto, direto e use termos técnicos apropriados. Você pode resumir OS e dar dicas de segurança.',
          outputAudioTranscription: {},
        }
      });

      sessionPromiseRef.current = sessionPromise;

    } catch (err) {
      console.error(err);
      setError('Acesso ao microfone negado.');
    }
  };

  const stopSession = () => {
    setIsLive(false);
    audioContextRef.current?.close();
    outputContextRef.current?.close();
    sourcesRef.current.forEach(s => s.stop());
    sourcesRef.current.clear();
    // Fix: Properly close the Live API session when assistant is closed to release resources
    sessionPromiseRef.current?.then(session => session.close());
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-sm rounded-[40px] shadow-2xl overflow-hidden flex flex-col relative">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200 transition-colors">
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 pt-12 flex flex-col items-center text-center space-y-6">
          <div className="relative">
            <div className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-500 ${
              isModelTalking ? 'bg-blue-600 scale-110 shadow-[0_0_40px_rgba(37,99,235,0.4)]' : 'bg-gray-100'
            }`}>
              {isLive ? (
                isModelTalking ? <Bot className="w-12 h-12 text-white animate-bounce" /> : <Mic className="w-12 h-12 text-blue-600" />
              ) : (
                <Loader2 className="w-12 h-12 text-gray-300 animate-spin" />
              )}
            </div>
            
            {isLive && (
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                {[1, 2, 3, 4, 5].map(i => (
                  <div 
                    key={i} 
                    className={`w-1 bg-blue-400 rounded-full transition-all duration-150 ${isLive ? 'animate-pulse' : 'h-2'}`}
                    style={{ 
                      height: isModelTalking ? `${Math.random() * 20 + 10}px` : '4px',
                      animationDelay: `${i * 0.1}s` 
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          <div>
            <h3 className="text-xl font-black text-gray-900">Modo Mãos Livres</h3>
            <p className="text-sm text-gray-500 font-medium">IA está ouvindo... Fale naturalmente.</p>
          </div>

          <div className="w-full bg-gray-50 rounded-2xl p-4 min-h-[100px] flex items-center justify-center">
            {error ? (
              <div className="flex items-center gap-2 text-red-500 text-sm font-bold">
                <AlertCircle className="w-4 h-4" /> {error}
              </div>
            ) : (
              <p className="text-sm text-gray-700 font-medium italic leading-relaxed">
                {isModelTalking ? transcription || 'Gerando resposta...' : 'Aguardando seu comando...'}
              </p>
            )}
          </div>

          <div className="w-full space-y-3">
             <div className="flex items-center gap-2 justify-center">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Conexão Ultra-Low Latency</span>
             </div>
             <button 
              onClick={onClose}
              className="w-full py-4 bg-gray-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all"
             >
               Encerrar Assistente
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechVoiceAssistant;