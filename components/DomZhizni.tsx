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

const renderCompactParagraphs = (text: string, className: string) => {
  return text
    .split(/\n\s*\n/g)
    .map((paragraph) => paragraph.replace(/\n+/g, ' ').trim())
    .filter(Boolean)
    .map((paragraph, index) => (
      <p key={index} className={className}>
        {paragraph}
      </p>
    ));
};

const getDriveViewLink = (url: string) => {
  if (url.includes('/preview')) return url.replace('/preview', '/view');
  return url;
};

export const DomZhizni: React.FC = () => {
  const houseOfLife = siteConfig.houseOfLife;
  const [isConceptOpen, setIsConceptOpen] = useState(false);

  const conceptBlocks = useMemo(
    () => houseOfLife.conceptContent as ConceptBlock[],
    [houseOfLife.conceptContent]
  );

  return (
    <section className="bg-[#0e2a1f] -mt-24 pt-8 pb-16 border-t border-[#fff7a0]/10">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 text-center">
            <h2 className="text-6xl md:text-7xl font-logo font-black gold-gradient mb-6">
              {houseOfLife.title}
            </h2>

            <div className="max-w-5xl mx-auto text-[#f5f5dc]">
              <div className="space-y-3">
                {renderCompactParagraphs(
                  houseOfLife.intro,
                  'text-[24px] md:text-[30px] leading-[1.28]'
                )}
              </div>

              <div className="mt-8 space-y-3 text-[#f5f5dc]/92">
                {renderCompactParagraphs(
                  houseOfLife.essence,
                  'text-[22px] md:text-[27px] leading-[1.28]'
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {houseOfLife.videos.map((item: { title: string; image: string; video: string }) => (
              <a
                key={item.title}
                href={getDriveViewLink(item.video)}
                target="_blank"
                rel="noopener noreferrer"
                className="group block text-left"
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

                <div className="mt-4 text-center text-[#f5f5dc] text-[18px] md:text-[22px] tracking-[0.06em] uppercase leading-[1.2]">
                  {item.title}
                </div>
              </a>
            ))}
          </div>

          <div className="flex flex-col items-center gap-4 mb-12">
            <button
              type="button"
              onClick={() => setIsConceptOpen((prev) => !prev)}
              className="btn-gold w-full max-w-[860px] px-8 py-5 text-center text-[14px] md:text-[16px] font-black tracking-[0.16em] uppercase"
            >
              {houseOfLife.buttons.openConcept}
            </button>

            <a
              href={houseOfLife.conceptDocument.downloadLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full max-w-[860px] px-8 py-5 text-center text-[14px] md:text-[16px] font-black tracking-[0.16em] uppercase border border-[#ffcc00] text-[#ffcc00] hover:bg-[#ffcc00] hover:text-[#0e2a1f] transition-all duration-300"
            >
              {houseOfLife.buttons.downloadConcept}
            </a>
          </div>

          <div
            className={`overflow-hidden transition-all duration-500 ${
              isConceptOpen ? 'max-h-[9999px] opacity-100 mb-14' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="bg-[#0e2a1f] border border-[#fff7a0]/15 px-6 py-8 md:px-12 md:py-12">
              <div className="max-w-4xl mx-auto">
                <h3 className="text-center text-[#ffcc00] text-[30px] md:text-[38px] font-logo font-black mb-8">
                  Предварительная концепция проекта «Дом Жизни»
                </h3>

                <div className="text-[#f5f5dc]">
                  {conceptBlocks.map((block, index) => {
                    if (block.type === 'heading') {
                      return (
                        <h4
                          key={index}
                          className="mt-8 mb-4 text-[24px] md:text-[28px] leading-[1.28] font-semibold text-[#f5f5dc]"
                        >
                          {block.text}
                        </h4>
                      );
                    }

                    if (block.type === 'subheading') {
                      return (
                        <h5
                          key={index}
                          className="mt-6 mb-3 text-[20px] md:text-[24px] leading-[1.28] font-semibold text-[#f5f5dc]"
                        >
                          {block.text}
                        </h5>
                      );
                    }

                    if (block.type === 'paragraph') {
                      return (
                        <p
                          key={index}
                          className="mb-3 text-[18px] md:text-[20px] leading-[1.42] text-[#f5f5dc]/95"
                        >
                          {renderInlineMarkdown(block.text)}
                        </p>
                      );
                    }

                    if (block.type === 'list') {
                      return (
                        <ul key={index} className="mb-4 pl-0 space-y-1">
                          {block.items.map((item, itemIndex) => (
                            <li
                              key={itemIndex}
                              className="text-[18px] md:text-[20px] leading-[1.42] text-[#f5f5dc]/95"
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

                <div className="mt-10">
                  <div className="text-[#f5f5dc] text-[18px] md:text-[20px] leading-[1.35] mb-2">
                    {houseOfLife.signature.name}
                  </div>

                  <div className="text-[#f5f5dc]/90 text-[34px] md:text-[42px] leading-none font-[cursive] italic">
                    {houseOfLife.signature.brand}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center max-w-4xl mx-auto">
            <div className="space-y-3 text-[#f5f5dc]">
              {renderCompactParagraphs(
                houseOfLife.finalText,
                'text-[22px] md:text-[28px] leading-[1.28]'
              )}
            </div>

            <div className="mt-6 text-[#f5f5dc]/85 text-[18px] md:text-[22px] leading-[1.35] mb-2">
              {houseOfLife.telegramText}
            </div>

            <a
              href="https://t.me/anna_dissanya"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-[#ffcc00] text-[22px] md:text-[26px] tracking-[0.08em] hover:opacity-80 transition-opacity duration-300"
            >
              {houseOfLife.telegramHandle}
            </a>
          </div>

          <div className="w-full flex justify-center mt-14">
            <div className="w-2/3 h-[1px] bg-gradient-to-r from-transparent via-[#ffcc00] to-transparent opacity-60" />
          </div>
        </div>
      </div>
    </section>
  );
};