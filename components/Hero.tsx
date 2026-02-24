
import React from 'react';
import { siteConfig } from '../siteConfig';

interface HeroProps {
  onOpenAI: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenAI }) => {
  const scrollToPortfolio = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('portfolio');
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col overflow-hidden bg-[#041a16]">
      <div className="absolute inset-0 z-0">
        <img 
          src={siteConfig.hero.bgImage} 
          alt="VedArta Architecture Background" 
          className="w-full h-full object-cover animate-slow-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#041a16]/70 via-transparent to-[#041a16]/80"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col min-h-screen pt-24 md:pt-32 pb-8 md:pb-10">
        <div className="max-w-4xl mt-12 md:mt-20 self-end text-right animate-fade-in">
          <p className="text-white text-[10px] md:text-xs tracking-[0.4em] md:tracking-[0.6em] font-black uppercase opacity-100 mb-4">
            {siteConfig.hero.tagline}
          </p>
          
          <h1 className="text-[8vw] md:text-5xl lg:text-6xl font-bold leading-[1.2] tracking-tight text-white drop-shadow-2xl">
            {siteConfig.hero.title.part1} <br />
            <span className="italic font-serif gold-gradient py-1 inline-block">{siteConfig.hero.title.gradient1}</span> <br />
            <span className="italic font-serif gold-gradient py-1 inline-block">{siteConfig.hero.title.gradient2}</span>
          </h1>

          <p className="text-sm md:text-base font-logo italic text-white tracking-[0.3em] uppercase opacity-100 font-bold drop-shadow-lg mt-6">
            — {siteConfig.founder.name} —
          </p>
        </div>

        <div className="flex-grow min-h-[15vh]"></div>

        <div className="w-full flex justify-end items-end mt-auto">
          <div className="max-w-xl text-left lg:text-right flex flex-col items-start lg:items-end animate-fade-in delay-400">
            <div className="lg:border-r-2 border-l-2 lg:border-l-0 border-[#ffcc00]/40 lg:pr-10 lg:pl-0 pl-6 py-2">
              <p className="text-xl md:text-2xl font-serif font-bold italic text-white mb-4 tracking-wide gold-shimmer inline-block uppercase drop-shadow-md">
                {siteConfig.hero.subtitle}
              </p>
              <p className="text-[#f5f5dc] text-sm md:text-base font-medium tracking-[0.05em] leading-relaxed drop-shadow-lg mb-8">
                {siteConfig.hero.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 md:gap-6 w-full lg:justify-end">
                <button onClick={scrollToPortfolio} className="btn-gold px-10 py-5 rounded-sm text-[10px] font-black tracking-[0.4em] uppercase">
                  Портфолио
                </button>
                <button onClick={onOpenAI} className="px-10 py-5 rounded-sm border-2 border-[#ffcc00]/40 bg-[#041a16]/60 backdrop-blur-md text-[10px] font-black tracking-[0.4em] uppercase text-[#ffcc00]">
                  AI Ассистент
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
