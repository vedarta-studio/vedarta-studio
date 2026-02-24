
import React from 'react';

export const CallToAction: React.FC = () => {
  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('contact');
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
    <section className="pb-24 pt-4 md:pb-32 md:pt-8 bg-[#041a16] flex justify-center items-center">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col items-center">
            <h3 className="text-[#f5f5dc]/40 text-[9px] md:text-[10px] font-black tracking-[0.6em] uppercase mb-6 md:mb-8">Сделайте первый шаг к идеалу</h3>
            <a 
              href="#contact" 
              onClick={scrollToContact}
              className="btn-gold inline-block px-10 md:px-20 py-5 md:py-8 rounded-sm text-[11px] md:text-[14px] font-black tracking-[0.5em] uppercase shadow-[0_20px_60px_rgba(255,204,0,0.2)] hover:shadow-[0_25px_80px_rgba(255,204,0,0.4)] transition-all"
            >
              Хочешь попробовать? Оставь заявку
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
