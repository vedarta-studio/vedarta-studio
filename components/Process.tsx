
import React from 'react';

const steps = [
  {
    num: "01",
    title: "Знакомство",
    desc: "Обсуждаем ваши предпочтения, бюджет и образ жизни за чашкой кофе."
  },
  {
    num: "02",
    title: "Концепция",
    desc: "Создаем мудборды и планировочные решения, отражающие вашу индивидуальность."
  },
  {
    num: "03",
    title: "3D Визуализация",
    desc: "Вы увидите свой будущий дом до начала ремонта в мельчайших деталях."
  },
  {
    num: "04",
    title: "Реализация",
    desc: "Берем на себя стройку, закупки и надзор. Вы просто заезжаете в готовый дом."
  }
];

export const Process: React.FC = () => {
  return (
    <section className="py-24 bg-[#041a16] border-y border-[#d4af37]/10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {steps.map((s, idx) => (
            <div key={idx} className="group">
              <span className="text-5xl font-serif italic text-[#d4af37]/10 group-hover:text-[#d4af37]/40 transition-colors duration-500">{s.num}</span>
              <h3 className="text-xl font-bold mt-4 mb-3 uppercase tracking-wider text-[#f5f5dc]">{s.title}</h3>
              <p className="text-[#f5f5dc]/40 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
