
import React from 'react';
import { siteConfig } from '../siteConfig';

export const Philosophy: React.FC = () => {
  return (
    <section id="philosophy" className="py-48 bg-[#041a16] flex items-center justify-center overflow-hidden relative border-y border-[#ffcc33]/10">
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none select-none">
        <span className="text-[25vw] font-logo font-black tracking-tighter text-[#fff7a0] whitespace-nowrap">VedArta</span>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-24">
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-serif italic leading-[1.2] text-[#f5f5dc] mb-8">
              {siteConfig.founder.quote}
            </h2>
            <p className="text-[#ffcc00] text-sm font-black tracking-[0.4em] uppercase opacity-80">{siteConfig.founder.quoteAuthor}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-left border-t border-[#fff7a0]/20 pt-20">
            {siteConfig.about.philosophyPoints.slice(0,3).map((item) => (
              <div key={item.t} className="group">
                <h4 className="text-[#fff7a0] text-xs font-black tracking-[0.3em] uppercase mb-6 flex items-center gap-3">
                   <span className="w-1.5 h-1.5 bg-[#fff7a0] rounded-full group-hover:scale-150 transition-all shadow-[0_0_8px_#fff7a0]"></span> {item.t}
                </h4>
                <p className="text-[#f5f5dc]/50 text-sm leading-relaxed group-hover:text-[#f5f5dc] transition-colors duration-500">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
