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
          <span className="text-[#ffcc00] text-[10px] md:text-[12px] font-black tracking-[0.6em] uppercase block mb-4">
            VedAna
          </span>

          <h2 className="text-[#f5f5dc] text-[48px] md:text-[92px] font-semibold font-logo italic leading-tight mb-10">
            {vedAna.intro.title}
          </h2>

          <div className="max-w-5xl mx-auto text-[#f5f5dc]/80 text-base md:text-xl leading-relaxed">
            {vedAna.intro.text
              .split("\n\n")
              .map((paragraph, index) => (
                <p key={index} className="mb-5 last:mb-0">
                  {paragraph.replace(/\n/g, " ")}
                </p>
              ))}
          </div>
        </div>

        {/* CATALOG */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center mb-24 md:mb-32">

          <div>
            <h3 className="text-[#f5f5dc] text-3xl md:text-5xl font-light italic mb-6">
              {vedAna.catalog.title}
            </h3>

            <p className="text-[#f5f5dc]/80 mb-8 text-base md:text-lg leading-relaxed whitespace-pre-line">
              {vedAna.catalog.text}
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href={vedAna.catalog.viewLink}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 bg-[#ffcc00] text-black text-sm uppercase tracking-widest font-bold hover:opacity-80 transition"
              >
                {vedAna.buttons.view}
              </a>

              <a
                href={vedAna.catalog.downloadLink}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 border border-[#ffcc00] text-[#ffcc00] text-sm uppercase tracking-widest font-bold hover:bg-[#ffcc00] hover:text-black transition"
              >
                {vedAna.buttons.download}
              </a>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div
              className="group cursor-pointer overflow-hidden"
              onClick={() => setActiveImage(vedAna.catalog.coverImage)}
            >
              <img
                src={vedAna.catalog.coverImage}
                alt="Каталог"
                className="w-full max-w-[520px] aspect-[4/5] object-contain transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/* GUARDIAN */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center mb-24 md:mb-32">

          <div className="flex justify-center">
            <div
              className="group cursor-pointer overflow-hidden"
              onClick={() => setActiveImage(vedAna.guardian.image)}
            >
              <img
                src={vedAna.guardian.image}
                alt="Хранительница"
                className="w-full max-w-[520px] aspect-[4/5] object-contain transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>

          <div>
            <h3 className="text-[#f5f5dc] text-3xl md:text-5xl font-light italic mb-6">
              {vedAna.guardian.title}
            </h3>

            <p className="text-[#f5f5dc]/80 text-base md:text-lg leading-relaxed whitespace-pre-line">
              {vedAna.guardian.text}
            </p>
          </div>
        </div>

        {/* EXAMPLES */}
        <div className="mb-24 md:mb-32">
          <h3 className="text-center text-[#f5f5dc] text-3xl md:text-5xl font-light italic mb-6">
            {vedAna.examples.title}
          </h3>

          <p className="text-center text-[#f5f5dc]/80 max-w-3xl mx-auto mb-12 text-base md:text-lg leading-relaxed whitespace-pre-line">
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
                <p className="text-center text-[#f5f5dc]/75 mt-4 text-sm md:text-base">
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
            alt="Preview"
          />
        </div>
      )}
    </section>
  );
};