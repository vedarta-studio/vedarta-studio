
import React from 'react';
import { siteConfig } from '../siteConfig';

export const TextureLibrary: React.FC = () => {
  return (
    <section className="py-24 bg-[#041a16] overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-xl">
            <span className="text-[#ffcc00] text-[10px] font-black tracking-[0.6em] uppercase mb-4 block">Тактильный код</span>
            <h2 className="text-4xl md:text-5xl font-serif italic text-[#f5f5dc]">Библиотека <span className="text-[#ffcc00]">ощущений</span></h2>
          </div>
          <p className="text-[#f5f5dc]/40 text-sm font-light italic max-w-sm text-right">
            Мы проектируем не только глазами, но и кончиками пальцев. Каждая фактура — это эмоциональный якорь вашего дома.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {siteConfig.materials.map((m, idx) => (
            <div key={idx} className="relative group cursor-crosshair">
              <div className="relative p-3 md:p-4 border border-[#ffcc00]/20 transition-all duration-700 group-hover:border-[#ffcc00] group-hover:shadow-[0_0_40px_rgba(255,204,0,0.15)] bg-black/40">
                <div className="aspect-[3/4] overflow-hidden relative">
                  <img src={m.image} alt={m.name} className="w-full h-full object-cover transition-all duration-1000 transform group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#041a16] via-[#041a16]/40 to-transparent opacity-20 group-hover:opacity-70 transition-opacity duration-700 z-10"></div>
                  <div className="absolute inset-0 p-8 flex flex-col justify-end z-30 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                    <span className="text-[#ffcc00] text-[10px] font-black uppercase tracking-[0.3em] mb-1">{m.emotion}</span>
                    <h3 className="text-2xl font-serif italic text-white mb-3">{m.name}</h3>
                    <p className="text-white opacity-0 group-hover:opacity-100 text-xs transition-all duration-700 italic">{m.desc}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
