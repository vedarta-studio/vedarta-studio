
import React from 'react';
import { siteConfig } from '../siteConfig';

export const Pricing: React.FC = () => {
  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('contact');
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section id="pricing" className="py-32 bg-[#041a16] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#d4af37] rounded-full blur-[150px]"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#d4af37] rounded-full blur-[150px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <span className="text-[#d4af37] text-[10px] font-black tracking-[0.6em] uppercase mb-4 block">Инвестиции в комфорт</span>
          <h2 className="text-4xl md:text-6xl font-serif italic text-[#f5f5dc] mb-6">Стоимость <span className="text-[#d4af37]">созидания</span></h2>
          <p className="text-[#f5f5dc]/50 max-w-2xl mx-auto italic font-light">Каждый проект уникален. Базовые ориентиры для оценки масштаба.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-7xl mx-auto">
          {siteConfig.pricing.map((plan, idx) => (
            <div 
              key={idx} 
              className={`relative flex flex-col p-8 md:p-12 border transition-all duration-700 group ${plan.highlight ? 'bg-white/[0.04] border-[#d4af37] shadow-[0_30px_100px_rgba(212,175,55,0.15)] scale-105 z-10' : 'bg-black/20 border-white/5 hover:border-white/20'}`}
            >
              {plan.highlight && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#d4af37] text-[#041a16] text-[9px] font-black uppercase tracking-[0.3em] px-6 py-2 rounded-full">
                  Самый востребованный
                </div>
              )}

              <div className="mb-10">
                <h3 className="text-[#d4af37] text-[11px] font-black uppercase tracking-[0.4em] mb-4">{plan.name}</h3>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-3xl md:text-4xl font-serif italic text-[#f5f5dc]">{plan.price}</span>
                </div>
                <p className="text-sm text-[#f5f5dc]/60 leading-relaxed font-light italic">{plan.description}</p>
              </div>

              <div className="flex-1 space-y-6 mb-12">
                {plan.features.map((feature, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-4">
                    <svg className="w-4 h-4 text-[#d4af37] mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[13px] text-[#f5f5dc]/80 font-light">{feature}</span>
                  </div>
                ))}
              </div>

              <button 
                onClick={scrollToContact}
                className={`w-full py-5 text-[10px] font-black uppercase tracking-[0.3em] transition-all border ${plan.highlight ? 'btn-gold' : 'border-[#d4af37]/40 text-[#d4af37] hover:bg-[#d4af37] hover:text-[#041a16]'}`}
              >
                Обсудить проект
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
