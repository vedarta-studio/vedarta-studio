import React, { useMemo, useState } from 'react';
import { siteConfig } from '../siteConfig';

type ConceptBlock =
  | { type: 'heading'; text: string }
  | { type: 'subheading'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] };

const renderInlineMarkdown = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={index} className="font-semibold text-[#f5f5dc]">
          {part.slice(2, -2)}
        </strong>
      );
    }

    return <React.Fragment key={index}>{part}</React.Fragment>;
  });
};

export const DomZhizni: React.FC = () => {
  const houseOfLife = siteConfig.houseOfLife;
  const [isConceptOpen, setIsConceptOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const conceptBlocks = useMemo(
    () => houseOfLife.conceptContent as ConceptBlock[],
    [houseOfLife.conceptContent]
  );

  return (
    <>
      <section className="bg-[#0e2a1f] py-24 border-t border-[#fff7a0]/10">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16 text-center">
              <h2 className="text-4xl md:text-5xl font-logo font-black gold-gradient mb-10">
                {houseOfLife.title}
              </h2>

              <div className="max-w-3xl mx-auto text-[#f5f5dc] text-[16px] md:text-[18px] leading-[1.6] whitespace-pre-line">
                {houseOfLife.intro}
              </div>

              <div className="max-w-3xl mx-auto mt-8 text-[#f5f5dc]/90 text-[15px] md:text-[17px] leading-[1.6] whitespace-pre-line">
                {houseOfLife.essence}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
              {houseOfLife.videos.map((item: { title: string; image: string; video: string }) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => setActiveVideo(item.video)}
                  className="group text-left"
                >
                  <div className="relative overflow-hidden border border-[#fff7a0]/20 bg-[#0e2a1f] transition-all duration-300 hover:border-[#ffcc00]/60">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                    />

                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-16 h-16 border border-[#ffcc00]/80 bg-[#0e2a1f]/80 flex items-center justify-center">
                        <div className="ml-1 w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[16px] border-l-[#ffcc00]" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 text-center text-[#f5f5dc] text-[15px] md:text-[17px] tracking-[0.08em] uppercase">
                    {item.title}
                  </div>
                </button>
              ))}
            </div>

            <div className="flex flex-col items-center gap-4 mb-20">
              <button
                type="button"
                onClick={() => setIsConceptOpen((prev) => !prev)}
                className="btn-gold w-full max-w-[620px] px-8 py-4 text-center text-[12px] md:text-[13px] font-black tracking-[0.22em] uppercase"
              >
                {houseOfLife.buttons.openConcept}
              </button>

              <a
                href={houseOfLife.conceptDocument.downloadLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full max-w-[620px] px-8 py-4 text-center text-[12px] md:text-[13px] font-black tracking-[0.22em] uppercase border border-[#ffcc00] text-[#ffcc00] hover:bg-[#ffcc00] hover:text-[#0e2a1f] transition-all duration-300"
              >
                {houseOfLife.buttons.downloadConcept}
              </a>
            </div>

            <div
              className={`overflow-hidden transition-all duration-500 ${
                isConceptOpen ? 'max-h-[9999px] opacity-100 mb-20' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="bg-[#0e2a1f] border border-[#fff7a0]/15 px-6 py-8 md:px-12 md:py-12">
                <div className="max-w-4xl mx-auto">
                  <h3 className="text-center text-[#ffcc00] text-[24px] md:text-[30px] font-logo font-black mb-10">
                    Предварительная концепция проекта «Дом Жизни»
                  </h3>

                  <div className="text-[#f5f5dc]">
                    {conceptBlocks.map((block, index) => {
                      if (block.type === 'heading') {
                        return (
                          <h4
                            key={index}
                            className="mt-8 mb-4 text-[21px] md:text-[24px] leading-[1.35] font-semibold text-[#f5f5dc]"
                          >
                            {block.text}
                          </h4>
                        );
                      }

                      if (block.type === 'subheading') {
                        return (
                          <h5
                            key={index}
                            className="mt-6 mb-3 text-[18px] md:text-[20px] leading-[1.35] font-semibold text-[#f5f5dc]"
                          >
                            {block.text}
                          </h5>
                        );
                      }

                      if (block.type === 'paragraph') {
                        return (
                          <p
                            key={index}
                            className="mb-4 text-[16px] md:text-[18px] leading-[1.55] text-[#f5f5dc]/95"
                          >
                            {renderInlineMarkdown(block.text)}
                          </p>
                        );
                      }

                      if (block.type === 'list') {
                        return (
                          <ul key={index} className="mb-5 pl-0 space-y-2">
                            {block.items.map((item, itemIndex) => (
                              <li
                                key={itemIndex}
                                className="text-[16px] md:text-[18px] leading-[1.55] text-[#f5f5dc]/95"
                              >
                                {renderInlineMarkdown(item)}
                              </li>
                            ))}
                          </ul>
                        );
                      }

                      return null;
                    })}
                  </div>

                  <div className="mt-12">
                    <div className="text-[#f5f5dc] text-[18px] md:text-[20px] leading-[1.5] mb-2">
                      {houseOfLife.signature.name}
                    </div>

                    <div className="text-[#f5f5dc]/90 text-[30px] md:text-[36px] leading-none font-[cursive] italic">
                      {houseOfLife.signature.brand}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center max-w-3xl mx-auto">
              <div className="text-[#f5f5dc] text-[18px] md:text-[21px] leading-[1.6] whitespace-pre-line mb-8">
                {houseOfLife.finalText}
              </div>

              <div className="text-[#f5f5dc]/85 text-[16px] md:text-[18px] leading-[1.5] mb-2">
                {houseOfLife.telegramText}
              </div>

              <a
                href="https://t.me/anna_dissanya"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-[#ffcc00] text-[18px] md:text-[20px] tracking-[0.08em] hover:opacity-80 transition-opacity duration-300"
              >
                {houseOfLife.telegramHandle}
              </a>
            </div>

            <div className="w-full flex justify-center mt-20">
              <div className="w-2/3 h-[1px] bg-gradient-to-r from-transparent via-[#ffcc00] to-transparent opacity-60" />
            </div>
          </div>
        </div>
      </section>

      {activeVideo && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center px-4 py-4"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-[1100px] h-[85vh] bg-[#0e2a1f] border border-[#fff7a0]/20"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveVideo(null)}
              className="absolute top-3 right-3 z-10 w-11 h-11 flex items-center justify-center border border-[#ffcc00] text-[#ffcc00] bg-[#0e2a1f] hover:bg-[#ffcc00] hover:text-[#0e2a1f] transition-all duration-300"
              aria-label="Закрыть видео"
            >
              ✕
            </button>

            <iframe
              src={activeVideo}
              title="Видео презентации"
              className="w-full h-full"
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
};