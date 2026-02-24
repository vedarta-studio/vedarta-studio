
import React, { useState, useEffect } from 'react';
import { siteConfig } from '../siteConfig';

type TabType = 'story' | 'experience' | 'philosophy';

export const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('story');
  const [showFullManifesto, setShowFullManifesto] = useState(false);

  useEffect(() => {
    document.body.style.overflow = showFullManifesto ? 'hidden' : 'unset';
  }, [showFullManifesto]);

  const tabs: {id: TabType, label: string}[] = [
    { id: 'story', label: 'Путь' },
    { id: 'experience', label: 'Опыт' },
    { id: 'philosophy', label: 'Философия' }
  ];

  const { fullManifesto } = siteConfig;

  return (
    <section id="about" className="py-24 bg-[#041a16] relative scroll-mt-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20 md:mb-24">
          <span className="text-[#d4af37] text-[10px] font-black tracking-[0.5em] uppercase mb-4 block">О Студии</span>
          <h2 className="text-4xl md:text-6xl font-serif italic text-[#f5f5dc]">Глубина <span className="text-[#d4af37]">VedArta</span></h2>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <div className="lg:col-span-5 space-y-10 order-2 lg:order-1">
              <div className="relative group">
                <div className="relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] bg-[#062c26] rounded-sm">
                  <img src={siteConfig.founder.photo} alt={siteConfig.founder.name} className="w-full h-auto" />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-[#d4af37] p-6 text-[#041a16] font-serif italic text-xl shadow-2xl z-10">
                  VedArta
                </div>
              </div>
              <div className="space-y-6 pt-10 border-t border-white/5">
                <div>
                  <h3 className="text-3xl font-serif italic text-[#f5f5dc]">{siteConfig.founder.name}</h3>
                  <p className="text-[#d4af37] text-xs font-black tracking-widest uppercase mt-1">{siteConfig.founder.role}</p>
                </div>
                
                <button 
                  onClick={() => setShowFullManifesto(true)} 
                  className="w-full mt-6 flex items-center justify-center gap-4 py-6 md:py-7 btn-gold rounded-sm relative overflow-hidden group btn-pulse-attention"
                >
                  <span className="relative z-10 text-[12px] font-black tracking-[0.4em] uppercase">
                    Погрузиться в смыслы VedArta →
                  </span>
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-25deg] group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none z-20"></div>
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2">
              <div className="relative mb-12 p-2 bg-black/60 border-2 border-[#d4af37]/30 rounded-full flex items-center shadow-2xl">
                <div className="absolute h-[calc(100%-16px)] bg-[#d4af37] rounded-full tab-active-bg transition-all duration-500"
                  style={{ width: `calc(100% / ${tabs.length} - 12px)`, left: `calc((${activeTab === 'story' ? 0 : activeTab === 'experience' ? 1 : 2} * 100% / ${tabs.length}) + 6px)` }}
                ></div>
                {tabs.map(tab => (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`relative z-10 flex-1 py-4 text-[12px] font-black uppercase tracking-[0.3em] transition-all ${activeTab === tab.id ? 'text-[#041a16]' : 'text-[#f5f5dc]/50'}`}>
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="text-[#f5f5dc] min-h-[450px] bg-white/[0.01] p-10 border border-white/5 rounded-sm">
                {activeTab === 'story' && (
                  <div className="animate-fade-in space-y-12">
                    <h4 className="text-3xl font-serif italic text-[#d4af37]">Путь к гармонии</h4>
                    <p className="text-xl font-light leading-relaxed">{siteConfig.about.story}</p>
                  </div>
                )}
                {activeTab === 'experience' && (
                  <div className="animate-fade-in space-y-8">
                    <h4 className="text-3xl font-serif italic text-[#d4af37]">{siteConfig.founder.experienceYears} года созидания</h4>
                    <div className="grid gap-6">
                      {siteConfig.about.experience.map((p, i) => (
                        <a key={i} href={p.link} target="_blank" className="p-6 border border-white/5 bg-black/20 hover:border-[#d4af37]/50 block">
                          <h5 className="font-bold text-xl">{p.title}</h5>
                          <span className="text-[10px] text-[#d4af37] uppercase tracking-widest">{p.loc}</span>
                          <p className="text-sm text-white/40 italic mt-2">{p.desc}</p>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
                {activeTab === 'philosophy' && (
                  <div className="animate-fade-in space-y-8">
                    <h4 className="text-3xl font-serif italic text-[#d4af37]">От личности к пространству</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {siteConfig.about.philosophyPoints.map((item, i) => (
                        <div key={i} className="bg-black/20 p-8 border border-white/5">
                          <div className="w-12 h-px bg-[#d4af37] mb-6"></div>
                          <h5 className="text-[#d4af37] text-[10px] font-black uppercase tracking-widest mb-3">{item.t}</h5>
                          <p className="text-sm text-white/60 italic leading-relaxed">{item.d}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showFullManifesto && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-[#041a16]/98 backdrop-blur-3xl p-2 md:p-10 animate-fade-in overflow-hidden">
          <div className="w-full max-w-6xl h-full md:h-[90vh] bg-[#062c26] border border-[#d4af37]/30 flex flex-col relative overflow-hidden rounded-sm shadow-[0_0_100px_rgba(0,0,0,0.8)]">
            <div className="p-4 md:p-8 border-b border-[#d4af37]/10 flex items-center justify-between bg-[#062c26] relative z-20 shadow-md">
              <div className="flex items-center gap-3 md:gap-6">
                <img src={siteConfig.founder.photo} className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border-2 border-[#d4af37]/40" />
                <div>
                  <h4 className="font-logo italic text-lg md:text-xl text-[#f5f5dc] leading-tight">{siteConfig.founder.name}</h4>
                  <p className="text-[7px] md:text-[8px] text-[#d4af37] uppercase tracking-[0.2em] font-black">АРХИТЕКТОР / ДУША VEDARTA</p>
                </div>
              </div>
              <button onClick={() => setShowFullManifesto(false)} className="p-2 md:p-4 text-[#f5f5dc] hover:text-[#d4af37] transition-all bg-black/40 rounded-full">
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 md:p-16 md:pt-20 space-y-10 md:space-y-14 text-[#f5f5dc] custom-scrollbar relative bg-[#062c26]">
              <section className="animate-reveal">
                <div className="max-w-4xl mx-auto text-center md:text-left">
                  <h2 className="text-4xl md:text-7xl font-logo italic text-[#d4af37] mb-6 md:mb-8 leading-tight">{fullManifesto.intro.title}</h2>
                  <p className="text-lg md:text-2xl font-light leading-relaxed mb-6 md:mb-10 text-white/80">{fullManifesto.intro.subtitle}</p>
                  <div className="border-l-2 border-[#d4af37]/30 pl-6 md:pl-10 space-y-3 italic text-base md:text-lg text-white/60 text-left">
                    {fullManifesto.intro.points.map((p, i) => <p key={i}>{p}</p>)}
                  </div>
                </div>
              </section>

              <section className="animate-reveal">
                <div className="bg-black/30 p-8 md:p-12 border border-[#d4af37]/20 mb-8 md:mb-12 rounded-sm shadow-xl text-center">
                  <h3 className="text-xl md:text-4xl font-logo italic leading-tight text-[#f5f5dc]">
                    {fullManifesto.soulQuote}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
                  <div className="md:col-span-7 space-y-6 md:space-y-8">
                    <div>
                      <h4 className="text-[#d4af37] text-[10px] font-black uppercase tracking-[0.5em] mb-4 md:mb-6 border-b border-[#d4af37]/20 pb-2 inline-block">
                        {fullManifesto.experience.title}
                      </h4>
                      <p className="text-lg md:text-xl font-light leading-relaxed text-white/70 mb-4">{fullManifesto.experience.text}</p>
                    </div>
                    <div className="space-y-4">
                      <p className="text-[10px] font-black uppercase tracking-widest text-white/40">В моем портфолио есть и крупные объекты:</p>
                      <div className="space-y-2">
                        {fullManifesto.experience.links.map((l, i) => (
                          <a key={i} href={l.url} target="_blank" className="block text-lg md:text-xl font-logo italic text-[#d4af37] hover:text-white transition-colors border-b border-[#d4af37]/20 pb-1 w-fit group">
                            {l.name} <span className="inline-block transition-transform group-hover:translate-x-2">→</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-5 bg-[#041a16] p-6 md:p-8 border border-[#d4af37]/20 space-y-4 md:space-y-6 shadow-inner">
                    <p className="text-base md:text-lg italic leading-relaxed text-white/60">
                      {fullManifesto.experience.atlantis.split('Она простая')[0]}
                    </p>
                    <div className="w-12 h-px bg-[#d4af37]/30"></div>
                    <h4 className="text-xl md:text-3xl font-logo italic text-[#d4af37] leading-tight">
                      Она простая — дом должен звучать как человек. Нежно, уверенно, честно.
                    </h4>
                  </div>
                </div>
              </section>

              <section className="animate-reveal text-center">
                <h4 className="text-[#d4af37] text-[11px] font-black uppercase tracking-[0.6em] mb-8 md:mb-12">
                  {fullManifesto.masters.title}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                  {fullManifesto.masters.cards.map((c, i) => (
                    <div key={i} className="bg-black/20 p-6 md:p-8 border border-white/5 text-left h-full group hover:border-[#d4af37]/40 transition-all">
                      <h5 className="text-[#d4af37] text-xl md:text-2xl font-logo italic mb-3 md:mb-4">{c.t}</h5>
                      <p className="text-sm font-light leading-relaxed text-white/60">{c.d}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="animate-reveal">
                <div className="max-w-5xl mx-auto text-center space-y-8 md:space-y-12">
                  <h4 className="text-3xl md:text-6xl font-logo italic text-[#d4af37] leading-tight">
                    {fullManifesto.philosophy.title}
                  </h4>
                  <p className="text-lg md:text-2xl italic text-white/70 max-w-3xl mx-auto leading-relaxed">{fullManifesto.philosophy.lead}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 md:gap-x-12 gap-y-4 md:gap-y-6 text-left max-w-2xl mx-auto">
                    {fullManifesto.philosophy.bullets.slice(0, 6).map((b, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <span className="w-1.5 h-1.5 bg-[#d4af37] rounded-full shadow-[0_0_8px_#d4af37] shrink-0"></span>
                        <span className="text-lg md:text-xl italic text-white/70">{b}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 md:pt-8 animate-fade-in delay-700">
                    <div className="inline-block px-4 md:px-12 py-4 md:py-6">
                      <h3 className="text-3xl md:text-5xl font-logo italic text-[#d4af37] tracking-tight drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                        {fullManifesto.philosophy.bullets[6]}
                      </h3>
                    </div>
                  </div>
                </div>
              </section>

              <section className="animate-reveal py-4 md:py-8">
                <div className="max-w-4xl mx-auto text-center space-y-4 md:space-y-8">
                  <div className="space-y-2">
                    <p className="text-lg md:text-2xl font-logo italic text-white/60 leading-relaxed px-4">
                      {fullManifesto.philosophy.subLead}
                    </p>
                  </div>

                  <div className="relative group w-full max-w-3xl mx-auto px-2 sm:px-4 md:px-0">
                    <div className="bg-[#041a16] border-2 border-[#d4af37]/40 p-8 md:p-16 rounded-sm shadow-[0_0_60px_rgba(0,0,0,0.6)] relative z-10 overflow-hidden">
                      <div className="absolute top-4 left-4 text-[8px] md:text-[10px] text-[#d4af37]/40 uppercase tracking-[0.3em] font-black">VEDARTA CORE PRINCIPLE</div>
                      <h3 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-logo italic font-bold text-[#d4af37] tracking-tight leading-tight uppercase whitespace-normal break-words">
                        {fullManifesto.philosophy.formula}
                      </h3>
                    </div>
                    <div className="absolute -inset-4 md:-inset-10 bg-[#d4af37]/5 blur-3xl rounded-full opacity-50"></div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 mt-12 md:mt-16">
                  <div className="lg:col-span-5 space-y-6 md:space-y-8">
                    <h5 className="text-[#d4af37] text-[10px] font-black uppercase tracking-[0.5em] border-b border-[#d4af37]/20 pb-2 inline-block">
                      {fullManifesto.howWeWork.title}
                    </h5>
                    <div className="space-y-4 md:space-y-6">
                      {fullManifesto.howWeWork.points.map((p, i) => (
                        <div key={i} className="text-lg md:text-xl">
                          <span className="text-[#d4af37] font-black uppercase tracking-widest mr-3 block md:inline mb-1 md:mb-0">{p.label}</span>
                          <span className="italic text-white/70">{p.text}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-base md:text-lg italic text-white/50 leading-relaxed pt-4 md:pt-6 border-t border-white/5">
                      {fullManifesto.howWeWork.description}
                    </p>
                    <div className="bg-black/40 p-6 md:p-8 border border-[#d4af37]/30 shadow-2xl rounded-sm">
                       <p className="text-sm italic leading-relaxed text-white/80">{fullManifesto.howWeWork.aiBox}</p>
                    </div>
                  </div>
                  <div className="lg:col-span-7 space-y-8 md:space-y-10">
                    <div>
                      <h5 className="text-[#d4af37] text-[10px] font-black uppercase tracking-[0.5em] border-b border-[#d4af37]/20 pb-2 inline-block mb-4 md:mb-6">
                        {fullManifesto.howWeWork.romance.title}
                      </h5>
                      <div className="space-y-3 md:space-y-4 text-xl md:text-2xl font-logo italic text-white/70 border-l-2 border-[#d4af37]/10 pl-6 md:pl-8">
                        {fullManifesto.howWeWork.romance.texts.map((t, i) => <p key={i}>{t}</p>)}
                      </div>
                    </div>
                    <div className="pt-4 md:pt-6">
                      <h4 className="text-xl md:text-3xl font-logo italic text-[#d4af37] leading-tight">
                        {fullManifesto.howWeWork.belief}
                      </h4>
                    </div>
                  </div>
                </div>
              </section>

              <section className="animate-reveal text-center py-8 md:py-12 bg-black/20 border-t border-[#d4af37]/10 rounded-sm">
                <h4 className="text-2xl md:text-5xl font-logo italic text-[#d4af37] mb-6 md:mb-10 leading-tight">{fullManifesto.whyCalm.title}</h4>
                <div className="space-y-3 md:space-y-4 mb-8 md:mb-14 text-lg md:text-xl italic text-white/70 px-4">
                  {fullManifesto.whyCalm.reasons.map((r, i) => <p key={i}>{r}</p>)}
                </div>
                
                <button onClick={() => setShowFullManifesto(false)} className="btn-gold px-12 py-6 md:px-16 md:py-8 rounded-sm text-[10px] md:text-[11px] font-black tracking-[0.5em] uppercase shadow-2xl">
                  Вернуться на сайт
                </button>
              </section>

            </div>
          </div>
        </div>
      )}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.2); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #d4af37; border-radius: 10px; }
        
        @keyframes reveal {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-reveal {
          animation: reveal 1.2s cubic-bezier(0.2, 0.6, 0.2, 1) forwards;
        }

        @keyframes pulse-attention {
          0% { box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.7); }
          70% { box-shadow: 0 0 0 15px rgba(212, 175, 55, 0); }
          100% { box-shadow: 0 0 0 0 rgba(212, 175, 55, 0); }
        }
        .btn-pulse-attention {
          animation: pulse-attention 2s infinite;
        }

        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
};
