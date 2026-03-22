import React, { useState } from "react";
import { siteConfig } from "../siteConfig";

export const VedAnaBlock: React.FC = () => {
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const { vedAna } = siteConfig;

  if (!vedAna) return null;

  return (
    <section className="relative py-24 md:py-32 border-t border-[#ffcc00]/10">
      <div className="container mx-auto px-6">

        {/* INTRO */}
        <div className="text-center mb-20 md:mb-24">
          <span className="text-[#ffcc00] text-[10px] md:text-[12px] font-black tracking-[0.6em] uppercase">
            VedAna
          </span>

          <h2 className="text-[#f5f5dc] text-[42px] md:text-[84px] font-logo italic leading-tight mb-8">
            {vedAna.intro.title}
          </h2>

          <p className="text-[#f5f5dc]/70 max-w-4xl mx-auto italic text-sm md:text-lg font-light leading-relaxed whitespace-pre-line">
            {vedAna.intro.text}
          </p>
        </div>

        {/* CATALOG */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center mb-24 md:mb-32">

          {/* TEXT */}
          <div>
            <h3 className="text-[#f5f5dc] text-2xl md:text-4xl font-light italic mb-6">
              {vedAna.catalog.title}
            </h3>

            <p className="text-[#f5f5dc]/70 mb-8 whitespace-pre-line">
              {vedAna.catalog.text}
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href={vedAna.catalog.viewLink}
                target="_blank"
                className="px-6 py-3 bg-[#ffcc00] text-black text-sm uppercase tracking-widest font-bold hover:opacity-80 transition"
              >
                {vedAna.buttons.view}
              </a>

              <a
                href={vedAna.catalog.downloadLink}
                target="_blank"
                className="px-6 py-3 border border-[#ffcc00] text-[#ffcc00] text-sm uppercase tracking-widest font-bold hover:bg-[#ffcc00] hover:text-black transition"
              >
                {vedAna.buttons.download}
              </a>
            </div>
          </div>

          {/* IMAGE */}
          <div className="flex justify-center lg:justify-end">
            <div className="group cursor-pointer overflow-hidden">
              <img
                src={vedAna.catalog.coverImage}
                alt="Каталог"
                className="w-full max-w-[520px] aspect-[4/5] object-contain transition-transform duration-700 group-hover:scale-105"
                onClick={() => setActiveImage(vedAna.catalog.coverImage)}
              />
            </div>
          </div>
        </div>

        {/* GUARDIAN */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center mb-24 md:mb-32">

          {/* IMAGE */}
          <div className="flex justify-center">
            <div className="group cursor-pointer overflow-hidden">
              <img
                src={vedAna.guardian.image}
                alt="Хранительница"
                className="w-full max-w-[520px] aspect-[4/5] object-contain transition-transform duration-700 group-hover:scale-105"
                onClick={() => setActiveImage(vedAna.guardian.image)}
              />
            </div>
          </div>

          {/* TEXT */}
          <div>
            <h3 className="text-[#f5f5dc] text-2xl md:text-4xl font-light italic mb-6">
              {vedAna.guardian.title}
            </h3>

            <p className="text-[#f5f5dc]/70 whitespace-pre-line">
              {vedAna.guardian.text}
            </p>
          </div>
        </div>

        {/* EXAMPLES */}
        <div className="mb-24 md:mb-32">
          <h3 className="text-center text-[#f5f5dc] text-2xl md:text-4xl font-light italic mb-6">
            {vedAna.examples.title}
          </h3>

          <p className="text-center text-[#f5f5dc]/70 max-w-3xl mx-auto mb-12 whitespace-pre-line">
            {vedAna.examples.text}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {vedAna.examples.items.map((item, index) => (
              <div
                key={index}
                className="group cursor-pointer"
                onClick={() => setActiveImage(item.image)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full aspect-[4/5] object-contain transition-transform duration-700 group-hover:scale-105"
                />
                <p className="text-center text-[#f5f5dc]/70 mt-4 text-sm">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* FULLSCREEN */}
      {activeImage && (
        <div
          className="fixed inset-0 z-[999] bg-black/95 flex items-center justify-center p-6"
          onClick={() => setActiveImage(null)}
        >
          <img
            src={activeImage}
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
    </section>
  );
};