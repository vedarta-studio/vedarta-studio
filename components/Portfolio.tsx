import React, { useState, useEffect, useRef } from 'react';
import { siteConfig } from '../siteConfig';

export const Portfolio: React.FC = () => {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [isModalFs, setIsModalFs] = useState(false);
  const modalContainerRef = useRef<HTMLDivElement>(null);

  const selectedProject = siteConfig.portfolio.find(p => p.id === selectedProjectId);

  useEffect(() => {
    if (selectedProjectId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProjectId(null);
    };

    const handleFsChange = () => {
      setIsModalFs(!!document.fullscreenElement);
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('fullscreenchange', handleFsChange);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('fullscreenchange', handleFsChange);
      document.body.style.overflow = 'unset';
    };
  }, [selectedProjectId]);

  const toggleModalFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!document.fullscreenElement) {
      modalContainerRef.current?.requestFullscreen().catch(err => {
        console.error(`Ошибка входа в полноэкранный режим: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <section 
      id="portfolio" 
      className={`pt-40 pb-24 md:pt-64 md:pb-32 bg-[#041a16] relative overflow-hidden transition-all duration-300 ${selectedProjectId ? 'z-[9999]' : 'z-10'}`}
    >
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.01] flex items-center justify-center select-none">
        <span className="text-[20vw] font-logo font-black tracking-tighter text-[#ffcc00] whitespace-nowrap">VEDARTA</span>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <span className="text-[#ffcc00] text-[10px] font-black tracking-[0.6em] uppercase mb-4 block">Избранные проекты</span>
          <h2 className="text-5xl md:text-7xl font-logo italic text-[#f5f5dc] leading-tight">Портфолио</h2>
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#ffcc00]/40 to-transparent mx-auto mt-8 mb-8"></div>
          <p className="text-[#f5f5dc]/50 max-w-2xl mx-auto italic text-sm md:text-lg font-light leading-relaxed">
            Архитектура, созданная от сердца к пространству. <br />
            Гармония формы и внутреннего состояния в каждом кадре.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {siteConfig.portfolio.map((p, idx) => (
            <div 
              key={p.id} 
              onClick={() => setSelectedProjectId(p.id)}
              className="relative group cursor-pointer animate-reveal overflow-hidden bg-black/20 p-2 border border-[#ffcc00]/20 hover:border-[#ffcc00] transition-all duration-700"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-black">
                <img 
                  src={p.image} 
                  alt={p.title} 
                  className="w-full h-full object-cover transition-all duration-1000 transform group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 bg-[#041a16]/90 p-8 md:p-10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-[#ffcc00] text-[9px] tracking-[0.4em] font-black mb-3 uppercase">{p.category}</span>
                  <h3 className="text-xl md:text-2xl font-logo italic text-white tracking-tight leading-tight mb-4">{p.title}</h3>
                  <div className="flex items-center gap-3">
                    <span className="text-[9px] font-black tracking-[0.3em] text-white/60 uppercase">Изучить детали</span>
                    <div className="w-8 h-px bg-[#ffcc00]"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedProject && (
          <div 
            className="fixed inset-0 z-[10000] bg-[#041a16] flex items-center justify-center animate-fade-in overflow-hidden"
            onClick={() => setSelectedProjectId(null)}
          >
            <div 
              ref={modalContainerRef}
              className="relative w-full h-full flex flex-col items-center bg-[#041a16] p-4 md:p-10 lg:p-20 overflow-y-auto custom-scrollbar relative z-[10010]" 
              onClick={e => e.stopPropagation()}
            >
              <div className="sticky top-0 self-end z-[10020] flex items-center gap-4 mb-10">
                <button 
                  onClick={toggleModalFullscreen}
                  className="w-12 h-12 bg-black/60 border border-[#ffcc00]/40 text-[#ffcc00] rounded-full flex items-center justify-center hover:bg-[#ffcc00] hover:text-[#041a16] transition-all"
                >
                  {isModalFs ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 9L4 4m0 0l5 0m-5 0l0 5m11 0l5-5m0 0l-5 0m5 0l0 5m-5 11l5 5m0 0l-5 0m5 0l0-5m-11 0l-5 5m0 0l5 0m-5 0l0-5" /></svg>
                  ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                  )}
                </button>
                <button 
                  onClick={() => setSelectedProjectId(null)}
                  className="w-12 h-12 bg-black/60 border border-[#ffcc00]/40 text-[#ffcc00] rounded-full flex items-center justify-center hover:bg-[#ffcc00] hover:text-[#041a16] transition-all"
                >
                  <span className="text-4xl font-light leading-none">&times;</span>
                </button>
              </div>

              <div className="max-w-6xl w-full flex flex-col lg:flex-row gap-12 lg:gap-24 mb-24 text-left">
                 <div className="lg:w-1/2">
                   <span className="text-[#ffcc00] text-[10px] font-black tracking-[0.6em] uppercase mb-4 block">{selectedProject.category}</span>
                   <h3 className="text-4xl md:text-6xl font-logo italic text-[#f5f5dc] leading-tight mb-8">{selectedProject.title}</h3>
                   <div className="animate-reveal">
                      <h4 className="text-[#ffcc00] text-[9px] font-black tracking-[0.4em] uppercase mb-4 opacity-60">ДНК объекта</h4>
                      <p className="text-xl md:text-2xl font-serif italic text-white leading-relaxed">{selectedProject.details.dna}</p>
                   </div>
                 </div>
                 <div className="lg:w-1/2 space-y-12">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div>
                        <h4 className="text-[#ffcc00] text-[9px] font-black tracking-[0.4em] uppercase mb-4 opacity-60">Задача</h4>
                        <p className="text-sm md:text-base text-[#f5f5dc]/70 font-light leading-relaxed">{selectedProject.details.task}</p>
                      </div>
                      <div>
                        <h4 className="text-[#ffcc00] text-[9px] font-black tracking-[0.4em] uppercase mb-4 opacity-60">Решение</h4>
                        <p className="text-sm md:text-base text-[#f5f5dc]/70 font-light leading-relaxed">{selectedProject.details.solution}</p>
                      </div>
                   </div>
                   <div>
                      <h4 className="text-[#ffcc00] text-[9px] font-black tracking-[0.4em] uppercase mb-4 opacity-60">Тактильный код</h4>
                      <div className="flex flex-wrap gap-3">
                        {selectedProject.details.materials.split(',').map((m, i) => (
                          <span key={i} className="px-5 py-2.5 bg-white/[0.03] border border-[#ffcc00]/20 text-[9px] text-[#ffcc00] uppercase tracking-widest font-black">
                            {m.trim()}
                          </span>
                        ))}
                      </div>
                   </div>
                 </div>
              </div>

              <div className="max-w-7xl w-full space-y-16 md:space-y-24 pb-32">
                <div className="w-full flex items-center gap-6 mb-4">
                  <div className="w-12 h-px bg-[#ffcc00]/40"></div>
                  <h5 className="text-[14px] font-black tracking-[0.6em] text-[#ffcc00] uppercase">Визуальное воплощение</h5>
                  <div className="flex-grow h-px bg-[#ffcc00]/10"></div>
                </div>
                {selectedProject.details.gallery.map((group, gIdx) => (
                  <div key={gIdx} className="space-y-8 flex flex-col items-center">
                    {group.group && (
                      <div className="w-full flex items-center gap-6 mb-4">
                        <div className="w-8 h-px bg-[#ffcc00]/20"></div>
                        <h5 className="text-[11px] font-black tracking-[0.6em] text-[#ffcc00]/60 uppercase">{group.group}</h5>
                      </div>
                    )}
                    <div className={group.images.length === 1 ? "w-full max-w-5xl" : "w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"}>
                      {group.images.map((img, iIdx) => (
                        <div key={iIdx} className="relative p-2 md:p-3 border border-white/5 overflow-hidden group shadow-2xl transition-all duration-700 hover:border-[#ffcc00]">
                          <img 
                            src={img} 
                            alt={`${group.group} ${iIdx}`} 
                            className={`w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 ${group.isPortrait ? 'aspect-[3/4]' : 'aspect-video'}`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-auto pb-10 text-center opacity-30">
                <p className="text-[10px] font-black tracking-[0.8em] text-[#ffcc00] uppercase">VedArta Architecture Studio</p>
              </div>
            </div>
          </div>
        )}
      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.1); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #ffcc00; }
      `}</style>
    </section>
  );
};