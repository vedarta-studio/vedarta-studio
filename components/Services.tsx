
import React from 'react';

const services = [
  {
    title: "Дизайн Интерьера",
    description: "От концептуального эскиза до полной реализации. Создаем уютные и функциональные пространства.",
    icon: (
      <svg className="w-10 h-10 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    )
  },
  {
    title: "Архитектурное Проектирование",
    description: "Разработка частных домов и общественных зданий с учетом всех инженерных и эстетических норм.",
    icon: (
      <svg className="w-10 h-10 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    )
  },
  {
    title: "Авторский Надзор",
    description: "Контроль соответствия строительных работ проекту. Гарантия того, что реальность совпадет с картинкой.",
    icon: (
      <svg className="w-10 h-10 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    title: "Комплектация",
    description: "Подбор мебели, освещения и отделочных материалов у проверенных поставщиков по лучшим ценам.",
    icon: (
      <svg className="w-10 h-10 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    )
  }
];

export const Services: React.FC = () => {
  const scrollToPricing = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('pricing');
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
    <section id="services" className="py-24 bg-[#041a16]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 italic font-serif text-[#f5f5dc]">Наши Услуги</h2>
            <p className="text-[#f5f5dc]/70 text-lg leading-relaxed">
              Мы предлагаем полный цикл работ: от первой линии на бумаге до финальной презентации объекта. Каждый проект для нас — это уникальная история.
            </p>
          </div>
          <a 
            href="#pricing" 
            onClick={scrollToPricing}
            className="text-[#d4af37] font-bold tracking-widest border-b border-[#d4af37]/50 pb-2 hover:border-[#d4af37] transition-all"
          >
            СМОТРЕТЬ ПРАЙС →
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((s, idx) => (
            <div key={idx} className="glass-card p-10 group hover:bg-white/5 transition-all duration-500">
              <div className="mb-8 transform group-hover:scale-110 transition-transform duration-500 origin-left">
                {s.icon}
              </div>
              <h3 className="text-xl font-bold mb-4 text-[#f5f5dc]">{s.title}</h3>
              <p className="text-[#f5f5dc]/50 text-sm leading-relaxed mb-6">
                {s.description}
              </p>
              <div className="w-12 h-px bg-[#d4af37]/30 group-hover:w-full transition-all duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
