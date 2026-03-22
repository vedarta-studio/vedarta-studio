import React, { useState } from "react";
import { siteConfig } from "../siteConfig";

export const VedAnaBlock: React.FC = () => {
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const { vedAna } = siteConfig;

  if (!vedAna) return null;

  return (
    <section className="relative py-24 md:py-32 border-t border-[#ffcc00]/10">
      <div className="container mx-auto px-6">
        {/* Intro */}
        <div className="text-center mb-16 md:mb-24">
          <span className="text-[#ffcc00] text-[10px] md:text-[12px] font-black tracking-[0.6em] uppercase mb-4 block">
            VedAna
          </span>

          <h2 className="text-[#f5f5dc] text-[42px] md:text-[84px] font-logo italic leading-tight mb-8">
            {vedAna.intro.title}
          </h2>

          <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#ffcc00]/40 to-transparent mx-auto mt-8 mb-8"></div>

          <p className="text-[#f5f5dc]/70 max-w-2xl mx-auto italic text-sm md:text-lg font-light leading-relaxed whitespace-pre-line">
            {vedAna.intro.text}
          </p>
        </div>

        {/* Catalog */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 items-center mb-20 md:mb-28">
          <div className="order-2 lg:order-1">
            <span className="text-[#ffcc00] text-[10px] font-black tracking-[0.45em] uppercase mb-4 block">
              Каталог
            </span>

            <h3 className="text-[#f5f5dc] text-3xl md:text-5xl font-logo italic leading-tight mb-6">
              {vedAna.catalog.title}
            </h3>

            <p className="text-[#f5f5dc]/75 text-sm md:text-lg font-light leading-relaxed whitespace-pre-line mb-8">
              {vedAna.catalog.text}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={vedAna.catalog.viewLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center min-h-[62px] px-8 bg-gradient-to-r from-[#a67c00] via-[#ffcc00] to-[#fff4b0] text-[#0b2018] font-black text-[12px] tracking-[0.25em] uppercase transition-all duration-300 hover:scale-[1.02]"
              >
                {vedAna.buttons.view}
              </a>

              <a
                href={vedAna.catalog.downloadLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center min-h-[62px] px-8 border border-[#ffcc00]/30 text-[#f5f5dc] font-black text-[12px] tracking-[0.25em] uppercase bg-black/10 hover:border-[#ffcc00] transition-all duration-300"
              >
                {vedAna.buttons.download}
              </a>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div
              className="group overflow-hidden bg-black/20 p-2 border border-[#ffcc00]/20 hover:border-[#ffcc00] transition-all duration-700 cursor-pointer"
              onClick={() => setActiveImage(vedAna.catalog.coverImage)}
            >
              <div className="relative overflow-hidden bg-black">
                <img
                  src={vedAna.catalog.coverImage}
                  alt={vedAna.catalog.title}
                  className="w-full aspect-[4/5] object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Guardian */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 items-center mb-20 md:mb-28">
          <div>
            <span className="text-[#ffcc00] text-[10px] font-black tracking-[0.45em] uppercase mb-4 block">
              Образ
            </span>

            <h3 className="text-[#f5f5dc] text-3xl md:text-5xl font-logo italic leading-tight mb-6">
              {vedAna.guardian.title}
            </h3>

            <p className="text-[#f5f5dc]/75 text-sm md:text-lg font-light leading-relaxed whitespace-pre-line">
              {vedAna.guardian.text}
            </p>
          </div>

          <div>
            <div
              className="group overflow-hidden bg-black/20 p-2 border border-[#ffcc00]/20 hover:border-[#ffcc00] transition-all duration-700 cursor-pointer"
              onClick={() => setActiveImage(vedAna.guardian.image)}
            >
              <div className="relative overflow-hidden bg-black">
                <img
                  src={vedAna.guardian.image}
                  alt={vedAna.guardian.title}
                  className="w-full aspect-[4/5] object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Examples */}
        <div className="text-center mb-12 md:mb-16">
          <span className="text-[#ffcc00] text-[10px] font-black tracking-[0.45em] uppercase mb-4 block">
            Оформление
          </span>

          <h3 className="text-[#f5f5dc] text-3xl md:text-5xl font-logo italic leading-tight mb-6">
            {vedAna.examples.title}
          </h3>

          <p className="text-[#f5f5dc]/75 max-w-2xl mx-auto text-sm md:text-lg font-light leading-relaxed whitespace-pre-line">
            {vedAna.examples.text}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {vedAna.examples.items.map((item, index) => (
            <div
              key={index}
              className="group overflow-hidden bg-black/20 p-2 border border-[#ffcc00]/20 hover:border-[#ffcc00] transition-all duration-700 cursor-pointer"
              onClick={() => setActiveImage(item.image)}
            >
              <div className="relative overflow-hidden bg-black">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full aspect-[4/5] object-cover transition-transform duration-1000 group-hover:scale-105"
                />

                <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(to_top,rgba(0,20,16,0.92),rgba(0,20,16,0.75),transparent)] p-6">
                  <div className="text-[#ffcc00] text-[10px] font-black tracking-[0.35em] uppercase mb-2">
                    Пример {index + 1}
                  </div>
                  <div className="text-[#f5f5dc] text-2xl font-logo italic leading-tight">
                    {item.title}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen image */}
      {activeImage && (
        <div
          className="fixed inset-0 z-[999] bg-black/95 flex items-center justify-center p-4 md:p-8"
          onClick={() => setActiveImage(null)}
        >
          <button
            className="absolute top-6 right-6 text-[#f5f5dc] text-4xl leading-none"
            onClick={() => setActiveImage(null)}
            aria-label="Закрыть"
          >
            ×
          </button>

          <img
            src={activeImage}
            alt="Preview"
            className="max-w-full max-h-[92vh] object-contain"
          />
        </div>
      )}
    </section>
  );
};