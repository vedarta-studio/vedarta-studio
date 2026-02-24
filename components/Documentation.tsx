import React, { useState, useEffect } from 'react';
import { siteConfig } from '../siteConfig';

export const Documentation: React.FC = () => {
  const { projectDocumentation } = siteConfig;
  const [showFullHub, setShowFullHub] = useState(false);
  const [activeSheet, setActiveSheet] = useState<string | null>(null);

  useEffect(() => {
    if (showFullHub || activeSheet) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [showFullHub, activeSheet]);

  // Точный порядок для превью на главной (4 фото):
  // 1. Обмерный план (technicalSheets[0])
  // 2. План мебели и освещения (technicalSheets[5]) - согласно требованию "вторым идет именно растановка мебели с сетью освещения"
  // 3. 3D Планировка 1 (view3D[0])
  // 4. 3D Планировка 2 (view3D[1])
  const previewSheets = [
    projectDocumentation.technicalSheets[0], // Обмерный
    projectDocumentation.technicalSheets[5], // Мебель + Розетки + Свет
    projectDocumentation.view3D[0],           // 3D Лист 1
    projectDocumentation.view3D[1]            // 3D Лист 2
  ];

  const SheetCard = ({ item, idx }: { item: any, idx: number }) => (
    <div 
      key={idx} 
      className="group relative bg-white/[0.02] border border-white/5 p-4 transition-all duration-700 animate-reveal"
      style={{ animationDelay: `${idx * 100}ms` }}
    >
      <div 
        className="relative aspect-[4/3] mb-6 overflow-hidden border border-white/5 bg-black cursor-pointer z-10"
        onClick={(e) => { e.stopPropagation(); setActiveSheet(item.preview); }}
      >
        <img 
          src={item.preview} 
          alt={item.title} 
          className="w-full h-full object-contain transition-all duration-1000 group-hover:scale-105" 
        />
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#ffcc00 1px, transparent 1px), linear-gradient(90deg, #ffcc00 1px, transparent 1px)', backgroundSize: '15px 15px' }}></div>
      </div>

      <div className="px-4 pb-4">
        <h3 className="text-[#f5f5dc] font-logo italic text-2xl mb-2 group-hover:text-[#ffcc00] transition-colors">
          {item.title}
        </h3>
        <p className="text-[#f5f5dc]/40 text-xs leading-relaxed font-light mb-6 min-h-[40px]">
          {item.desc || "Детальное планировочное решение"}
        </p>
        <div 
          className="flex items-center justify-between cursor-pointer group/btn relative z-20 py-2"
          onClick={(e) => { e.stopPropagation(); setActiveSheet(item.preview); }}
        >
           <span className="text-[10px] font-black tracking-[0.3em] text-[#ffcc00] uppercase border-b border-[#ffcc00]/20 pb-1 group-hover/btn:border-[#ffcc00] transition-all">Увеличить лист →</span>
           <span className="text-[8px] text-white/20 font-black tracking-widest uppercase">© VEDARTA</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <section id="documentation" className="py-24 md:py-32 bg-[#041a16] relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
          style={{ 
            backgroundImage: 'linear-gradient(#ffcc00 0.5px, transparent 0.5px), linear-gradient(90deg, #ffcc00 0.5px, transparent 0.5px)', 
            backgroundSize: '40px 40px' 
          }}>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
            <div className="lg:w-1/2">
              <span className="text-[#ffcc00] text-[10px] font-black tracking-[0.6em] uppercase mb-4 block">Технический фундамент</span>
              <h2 className="text-4xl md:text-6xl font-logo italic text-[#f5f5dc] leading-tight mb-8">
                {projectDocumentation.title}
              </h2>
              <p className="text-[#f5f5dc]/60 text-lg md:text-xl font-light leading-relaxed italic border-l border-[#ffcc00]/30 pl-8 mb-10">
                {projectDocumentation.description}
              </p>
              <button 
                onClick={() => setShowFullHub(true)}
                className="btn-gold px-12 py-6 rounded-sm text-[11px] font-black tracking-[0.4em] uppercase shadow-2xl transition-all hover:scale-105 active:scale-95 relative z-20"
              >
                Открыть архив документации →
              </button>
            </div>
            
            <div className="lg:w-1/2 grid grid-cols-2 gap-4 md:gap-6 cursor-pointer relative z-10" onClick={() => setShowFullHub(true)}>
               {previewSheets.map((item, idx) => (
                 <div key={idx} className="relative aspect-[4/3] overflow-hidden border border-white/10 group bg-black shadow-2xl">
                    <img src={item?.preview} alt={item?.title} className="w-full h-full object-contain transition-all duration-1000 group-hover:scale-110" />
                    {/* Затемнение убрано согласно требованию!!!!! */}
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* FULL HUB MODAL */}
      {showFullHub && (
        <div className="fixed inset-0 z-[10000] bg-[#041a16] animate-fade-in flex flex-col overflow-hidden">
          {/* Header */}
          <div className="p-6 md:p-10 border-b border-white/10 flex items-center justify-between bg-[#041a16] relative z-[10020] shadow-2xl">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-full border border-[#ffcc00]/40 flex items-center justify-center bg-black/20 text-[#ffcc00]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v12a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                </svg>
              </div>
              <div>
                <h3 className="font-logo italic text-2xl md:text-3xl text-[#f5f5dc]">Архив проектных решений</h3>
                <p className="text-[9px] text-[#ffcc00] uppercase tracking-[0.3em] font-black opacity-60">VedArta Technical Hub</p>
              </div>
            </div>
            <button 
              onClick={(e) => { e.stopPropagation(); setShowFullHub(false); }}
              className="w-14 h-14 bg-white/5 border border-white/10 text-white rounded-full flex items-center justify-center hover:bg-[#ffcc00] hover:text-[#041a16] transition-all relative z-[10030]"
              aria-label="Закрыть"
            >
              <span className="text-4xl font-light leading-none pointer-events-none">&times;</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 md:p-16 bg-gradient-to-b from-transparent to-black/50 custom-scrollbar relative z-[10010]">
            
            {/* Toolbar Area */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-24 animate-reveal">
               <div className="p-10 border border-[#ffcc00]/20 bg-white/[0.02] backdrop-blur-md relative group overflow-hidden">
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-4">
                       <svg className="w-8 h-8 text-[#ffcc00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                       </svg>
                       <h4 className="text-2xl font-logo italic text-[#f5f5dc]">Комплектация объекта</h4>
                    </div>
                    <p className="text-[#f5f5dc]/40 text-sm mb-8 italic">Интерактивная таблица для формирования ведомостей, расчета материалов и управления закупками.</p>
                    <a 
                      href={projectDocumentation.excelLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn-gold inline-block px-10 py-5 rounded-sm text-[11px] font-black tracking-[0.4em] uppercase shadow-2xl transition-transform hover:scale-105 relative z-[30]"
                    >
                      Открыть таблицу →
                    </a>
                  </div>
               </div>

               <div className="p-10 border border-white/10 bg-black/40 backdrop-blur-md relative group overflow-hidden flex flex-col justify-center">
                  <div className="relative z-10">
                    <h4 className="text-2xl font-logo italic text-[#d4af37] mb-4">Конфиденциальность</h4>
                    <p className="text-[#f5f5dc]/60 text-sm font-light leading-relaxed italic">
                      Данная документация является интеллектуальной собственностью студии VedArta. 
                      Любое копирование или использование материалов без согласия автора преследуется по закону.
                    </p>
                  </div>
               </div>
            </div>

            {/* TECHNICAL DRAWINGS SECTION */}
            <div className="max-w-7xl mx-auto space-y-12 mb-32">
              <div className="flex items-center gap-6 mb-16">
                 <div className="w-12 h-px bg-[#ffcc00]"></div>
                 <h5 className="text-[14px] font-black tracking-[0.6em] text-[#ffcc00] uppercase">Рабочие чертежи (2D)</h5>
                 <div className="flex-grow h-px bg-white/5"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                {projectDocumentation.technicalSheets.map((item, idx) => (
                  <SheetCard key={idx} item={item} idx={idx} />
                ))}
              </div>
            </div>

            {/* 3D VIEWS SECTION */}
            <div className="max-w-7xl mx-auto space-y-12 mb-32">
              <div className="flex items-center gap-6 mb-16">
                 <div className="w-12 h-px bg-[#ffcc00]"></div>
                 <h5 className="text-[14px] font-black tracking-[0.6em] text-[#ffcc00] uppercase">Планировочные решения (3D)</h5>
                 <div className="flex-grow h-px bg-white/5"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {projectDocumentation.view3D.map((item, idx) => (
                  <div 
                    key={idx} 
                    className="group relative bg-black border border-white/10 aspect-[4/3] overflow-hidden cursor-pointer animate-reveal shadow-xl z-10"
                    style={{ animationDelay: `${idx * 50}ms` }}
                    onClick={(e) => { e.stopPropagation(); setActiveSheet(item.preview); }}
                  >
                    <img 
                      src={item.preview} 
                      alt={item.title} 
                      className="w-full h-full object-contain transition-all duration-1000 group-hover:scale-110" 
                    />
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                       <p className="text-[10px] text-[#ffcc00] font-black uppercase tracking-widest">{item.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* LIGHTBOX FOR FULL VIEW */}
      {activeSheet && (
        <div 
          className="fixed inset-0 z-[20000] bg-black/95 flex items-center justify-center p-4 md:p-10 animate-fade-in"
          onClick={() => setActiveSheet(null)}
        >
          <button 
            className="absolute top-10 right-10 text-white hover:text-[#ffcc00] transition-colors z-[20010] p-4 bg-black/40 rounded-full"
            onClick={(e) => { e.stopPropagation(); setActiveSheet(null); }}
          >
            <span className="text-6xl font-light pointer-events-none">&times;</span>
          </button>
          <img 
            src={activeSheet} 
            className="max-w-full max-h-full object-contain shadow-2xl animate-reveal" 
            alt="Full view"
          />
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.1); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #ffcc00; }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-out forwards;
        }

        @keyframes reveal {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-reveal {
          animation: reveal 0.6s cubic-bezier(0.2, 0.6, 0.2, 1) forwards;
        }
      `}</style>
    </>
  );
};