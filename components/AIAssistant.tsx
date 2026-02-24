
import React, { useState, useRef, useEffect } from 'react';
import { getDesignAdvice, generateDesignConceptImage } from '../services/geminiService';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  image?: string;
}

interface AIAssistantProps {
  onClose: () => void;
}

declare global {
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }
  interface Window {
    aistudio?: AIStudio;
  }
}

export const AIAssistant: React.FC<AIAssistantProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Здравствуйте! Я интеллектуальная система VedArta. Чем я могу помочь в создании вашего идеального пространства сегодня?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasKey, setHasKey] = useState<boolean | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const checkKeyStatus = async () => {
    if (window.aistudio) {
      const selected = await window.aistudio.hasSelectedApiKey();
      setHasKey(selected);
    } else {
      setHasKey(true); // Default env
    }
  };

  useEffect(() => {
    checkKeyStatus();
  }, []);

  const handleConnect = async () => {
    if (window.aistudio) {
      await window.aistudio.openSelectKey();
      setHasKey(true);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const isImageRequest = /нарисуй|покажи|визуализируй|интерьер|фото|картинка|эскиз/i.test(userMsg);
      
      if (isImageRequest) {
        const imageUrl = await generateDesignConceptImage(userMsg);
        if (imageUrl) {
          setMessages(prev => [...prev, { 
            role: 'assistant', 
            content: 'Я создала для вас визуальную концепцию на основе ваших пожеланий:', 
            image: imageUrl 
          }]);
        } else {
          throw new Error("Failed to generate image");
        }
      } else {
        const advice = await getDesignAdvice(userMsg);
        setMessages(prev => [...prev, { role: 'assistant', content: advice || 'Извините, я не смогла сформировать ответ.' }]);
      }
    } catch (error: any) {
      console.error(error);
      const errorMessage = error.message || "";
      
      if (errorMessage.includes("Requested entity was not found") || errorMessage.includes("404")) {
        setHasKey(false);
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: 'Похоже, ваш API-ключ не найден или не активен. Пожалуйста, активируйте систему заново.' 
        }]);
      } else {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: 'Произошла ошибка соединения с сервером. Пожалуйста, попробуйте еще раз или проверьте настройки сети.' 
        }]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 md:p-10 animate-fade-in">
      <div className="w-full max-w-5xl h-[85vh] bg-[#041a16] border border-[#d4af37]/30 flex flex-col relative shadow-[0_0_100px_rgba(0,0,0,0.8)] rounded-sm overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-[#d4af37]/20 flex items-center justify-between bg-[#062c26]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border border-[#d4af37]/40 flex items-center justify-center bg-black/20">
              <svg className="w-7 h-7 text-[#d4af37] animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-xl text-[#f5f5dc] font-serif italic tracking-wide">VedArta AI Concierge</h3>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${hasKey ? 'bg-green-500 shadow-[0_0_8px_#22c55e]' : 'bg-red-500'}`}></div>
                <p className="text-[9px] text-[#d4af37] uppercase tracking-[0.2em] font-black">
                  {hasKey ? 'Система активна' : 'Требуется подключение'}
                </p>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-all text-[#f5f5dc]/50 hover:text-white">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Chat / Connection Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-12 space-y-8 bg-gradient-to-b from-transparent to-black/30">
          {hasKey === false ? (
            <div className="h-full flex flex-col items-center justify-center text-center max-w-md mx-auto">
              <div className="w-20 h-20 bg-[#d4af37]/10 rounded-full flex items-center justify-center mb-8 border border-[#d4af37]/20">
                 <svg className="w-10 h-10 text-[#d4af37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h4 className="text-2xl font-serif italic text-[#f5f5dc] mb-4">Требуется авторизация</h4>
              <p className="text-[#f5f5dc]/60 text-sm mb-10 leading-relaxed italic">Нажмите кнопку ниже, чтобы выбрать ваш API-ключ в системе AI Studio. Это бесплатно и необходимо для работы нейросети.</p>
              <button onClick={handleConnect} className="btn-gold w-full py-6 rounded-sm text-[12px] font-black tracking-[0.4em] uppercase shadow-2xl">
                Авторизовать систему
              </button>
            </div>
          ) : (
            <>
              {messages.map((m, idx) => (
                <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                  <div className={`max-w-[85%] md:max-w-[75%] p-6 rounded-sm shadow-2xl ${m.role === 'user' ? 'bg-[#d4af37]/10 border border-[#d4af37]/30 text-white italic' : 'bg-white/5 border border-white/5 text-[#f5f5dc]'}`}>
                    <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">{m.content}</p>
                    {m.image && (
                      <div className="mt-6 overflow-hidden rounded-sm border border-[#d4af37]/30 shadow-2xl bg-black/40">
                        <img src={m.image} alt="AI Concept" className="w-full h-auto animate-slow-zoom" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 p-6 rounded-sm border border-white/5 flex items-center gap-3">
                    <span className="w-2 h-2 bg-[#d4af37] rounded-full animate-bounce" style={{animationDelay: '0ms'}}></span>
                    <span className="w-2 h-2 bg-[#d4af37] rounded-full animate-bounce" style={{animationDelay: '200ms'}}></span>
                    <span className="w-2 h-2 bg-[#d4af37] rounded-full animate-bounce" style={{animationDelay: '400ms'}}></span>
                    <span className="text-[10px] text-[#d4af37] font-black tracking-widest ml-2 uppercase opacity-50">Анализ пространства...</span>
                  </div>
                </div>
              )}
            </>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-6 md:p-10 border-t border-[#d4af37]/20 bg-[#062c26]/50">
          <div className="max-w-4xl mx-auto flex gap-4">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={hasKey ? "Опишите ваш идеальный интерьер..." : "Сначала активируйте доступ..."}
              disabled={isLoading || !hasKey}
              className="flex-1 bg-black/40 border border-[#d4af37]/20 p-5 rounded-sm outline-none focus:border-[#d4af37] transition-all text-[#f5f5dc] placeholder:text-[#f5f5dc]/20 italic font-light"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !hasKey || !input.trim()}
              className="btn-gold px-10 py-5 rounded-sm font-black text-[11px] tracking-[0.4em] uppercase disabled:opacity-20 shadow-xl"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
