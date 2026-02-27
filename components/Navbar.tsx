
import React, { useState, useEffect } from 'react';
import { siteConfig } from '../siteConfig';

interface NavbarProps {
  onOpenAI: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAI }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('fullscreenchange', handleFsChange);
    };
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(e => {
        console.error(`Error attempting to enable full-screen mode: ${e.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-in-out border-b ${isScrolled || isMenuOpen ? 'bg-[#041a16] py-4 shadow-2xl border-[#ffcc00]/20' : 'bg-transparent py-8 md:py-10 border-transparent'}`}>
        <div className="container mx-auto px-4 lg:pl-6 lg:pr-24 flex items-center justify-between">
          
          <div className="flex items-center gap-8 lg:gap-14">
            <div className="flex items-center" onClick={(e) => scrollToSection(e as any, '#')}>
              <span className="text-4xl md:text-5xl lg:text-6xl font-logo font-bold tracking-tight gold-gradient gold-texture cursor-pointer px-2 inline-block drop-shadow-2xl">
                VedArta
              </span>
            </div>

            <div className="hidden lg:flex items-center space-x-8 uppercase text-[11px] tracking-[0.4em] font-black text-white">
              {siteConfig.navigation.map((item) => (
                <a 
                  key={item.name} 
                  href={item.href} 
                  onClick={(e) => scrollToSection(e, item.href)}
                  className="hover:text-[#ffcc00] transition-all duration-300 relative group drop-shadow-md whitespace-nowrap"
                >
                  {item.name}
                  <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-[#ffcc00] transition-all duration-500 group-hover:w-full"></span>
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-6 ml-4">
            {/* Fullscreen Toggle */}
            <button 
              onClick={toggleFullscreen}
              className="hidden sm:flex w-10 h-10 items-center justify-center text-[#ffcc00]/60 hover:text-[#ffcc00] transition-colors border border-[#ffcc00]/20 rounded-full hover:bg-[#ffcc00]/10"
              title={isFullscreen ? "Выйти из полноэкранного режима" : "Войти в полноэкранный режим"}
            >
              {isFullscreen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 9L4 4m0 0l5 0m-5 0l0 5m11 0l5-5m0 0l-5 0m5 0l0 5m-5 11l5 5m0 0l-5 0m5 0l0-5m-11 0l-5 5m0 0l5 0m-5 0l0-5" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              )}
            </button>

            <button 
              onClick={onOpenAI}
              className="relative overflow-hidden group text-[10px] md:text-[11px] tracking-[0.3em] font-black px-8 md:px-10 py-3.5 md:py-4 rounded-full transition-all flex items-center gap-3 text-[#ffcc00] border-2 border-[#ffcc00]/50 hover:border-[#ffcc00] hover:bg-[#ffcc00]/10 hover:shadow-[0_0_25px_rgba(255,204,0,0.4)] active:scale-95 bg-[#041a16]/40 backdrop-blur-md"
            >
              <div className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffcc00] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#ffcc00]"></span>
              </div>
              <span className="hidden sm:inline uppercase">AI Ассистент</span>
              <span className="sm:hidden uppercase">AI</span>
            </button>

            <button 
              className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-2 z-[120] relative group"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className={`w-8 h-[2px] bg-[#ffcc00] transition-all duration-500 origin-center ${isMenuOpen ? 'rotate-45 translate-y-[5px]' : 'group-hover:w-6'}`}></span>
              <span className={`w-8 h-[2px] bg-[#ffcc00] transition-all duration-500 ${isMenuOpen ? 'opacity-0 scale-x-0' : 'group-hover:w-8'}`}></span>
              <span className={`w-8 h-[2px] bg-[#ffcc00] transition-all duration-500 origin-center ${isMenuOpen ? '-rotate-45 -translate-y-[5px]' : 'group-hover:w-5'}`}></span>
            </button>
          </div>
        </div>
      </nav>

      <div className={`fixed inset-0 z-[90] bg-[#041a16] transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] ${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <div className="h-full flex flex-col items-center justify-center space-y-10 overflow-y-auto relative z-10 px-6">
          {siteConfig.navigation.map((item, idx) => (
            <a 
              key={item.name} 
              href={item.href} 
              onClick={(e) => scrollToSection(e, item.href)}
              className={`text-4xl md:text-7xl font-serif italic text-white hover:text-[#ffcc00] transition-all duration-500 transform ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'} relative group px-6 text-center drop-shadow-xl`}
              style={{ transitionDelay: `${idx * 70}ms` }}
            >
              <span className="relative z-10">{item.name}</span>
              <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-0 h.5 bg-[#ffcc00] transition-all duration-500 group-hover:w-full"></span>
            </a>
          ))}
        </div>
      </div>
    </>
  );
};
