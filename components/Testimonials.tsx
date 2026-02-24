
import React from 'react';
import { siteConfig } from '../siteConfig';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-32 bg-[#041a16] overflow-hidden relative">
      <div className="absolute top-0 right-0 p-24 opacity-[0.03] pointer-events-none hidden lg:block">
        <span className="text-[250px] font-serif font-bold leading-none text-[#d4af37] select-none">VEDA</span>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mb-20">
          <span className="text-[#d4af37] text-[10px] font-black tracking-[0.5em] uppercase mb-4 block">Признание</span>
          <h2 className="text-4xl md:text-6xl font-bold italic font-serif text-[#f5f5dc] leading-tight">
            Истории <span className="text-[#d4af37]">преображения</span> <br /> наших клиентов
          </h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {siteConfig.testimonials.map((r, idx) => (
            <div 
              key={idx} 
              className="group relative bg-white/[0.02] border border-white/5 p-10 md:p-14 transition-all duration-700 hover:bg-white/[0.04] hover:border-[#d4af37]/30"
            >
              <div className="absolute top-10 right-10 text-8xl text-[#d4af37]/10 italic font-serif pointer-events-none group-hover:text-[#d4af37]/20 transition-colors">
                &ldquo;
              </div>

              <div className="relative z-10 flex flex-col h-full">
                <p className="text-[#f5f5dc]/80 text-xl md:text-2xl leading-relaxed mb-12 italic font-serif">
                  {r.text}
                </p>
                
                <div className="mt-auto flex items-center gap-6">
                  <div className="relative">
                    <img 
                      src={r.avatar} 
                      alt={r.name} 
                      className="w-16 h-16 md:w-20 md:h-20 rounded-full grayscale group-hover:grayscale-0 transition-all duration-700 object-cover border-2 border-[#d4af37]/20 group-hover:border-[#d4af37] relative z-10" 
                    />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-[#f5f5dc] tracking-tight mb-1">{r.name}</h4>
                    <p className="text-[10px] text-[#d4af37] tracking-[0.3em] uppercase font-black opacity-80">{r.role}</p>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 h-[2px] bg-[#d4af37] w-0 group-hover:w-full transition-all duration-1000"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
