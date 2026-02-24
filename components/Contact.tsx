
import React, { useState, useEffect } from 'react';
import { siteConfig } from '../siteConfig';

export const Contact: React.FC = () => {
  const [showSocialManifesto, setShowSocialManifesto] = useState(false);

  useEffect(() => {
    document.body.style.overflow = showSocialManifesto ? 'hidden' : 'unset';
  }, [showSocialManifesto]);

  return (
    <section id="contact" className="py-24 bg-[#041a16] relative">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div>
            <h2 className="text-5xl font-bold mb-8 italic font-serif text-[#f5f5dc]">Начнем работу <br /> над вашим проектом?</h2>
            <p className="text-[#f5f5dc]/60 text-lg mb-12 font-light leading-relaxed">
              Заполните форму, и я свяжусь с вами в течение часа для первичной консультации. Я ценю ваше время.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-center gap-6 group cursor-pointer" onClick={() => window.open(siteConfig.contacts.telegramLink)}>
                <div className="w-14 h-14 rounded-full bg-[#0088cc]/10 flex items-center justify-center border border-[#0088cc]/30">
                  <svg className="w-6 h-6 text-[#0088cc]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" /></svg>
                </div>
                <div>
                  <p className="text-xs text-[#0088cc] uppercase tracking-widest font-black">Telegram</p>
                  <p className="text-2xl font-black text-[#f5f5dc]">{siteConfig.contacts.telegram}</p>
                </div>
              </div>

              <div className="flex items-center gap-6 group cursor-pointer" onClick={() => window.open(siteConfig.contacts.phoneLink)}>
                <div className="w-14 h-14 rounded-full bg-[#d4af37]/10 flex items-center justify-center border border-[#d4af37]/30">
                  <svg className="w-6 h-6 text-[#fcf6ba]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </div>
                <div>
                  <p className="text-xs text-[#f5f5dc]/40 uppercase tracking-widest font-black">Телефон</p>
                  <p className="text-2xl font-black text-[#f5f5dc]">{siteConfig.contacts.phone}</p>
                </div>
              </div>

              <div className="pt-8 border-t border-white/10">
                <div className="flex flex-wrap gap-x-8 gap-y-4">
                  {siteConfig.contacts.socialLinks.map((social) => (
                    <button key={social.id} onClick={() => setShowSocialManifesto(true)} className="text-sm font-bold tracking-widest text-[#d4af37]/60 hover:text-white transition-all uppercase">{social.name}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-12">
            <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder="Ваше Имя" className="w-full bg-transparent border-b border-[#d4af37]/40 py-4 focus:border-[#fcf6ba] outline-none text-[#f5f5dc] text-lg" />
              <input type="tel" placeholder="Номер телефона" className="w-full bg-transparent border-b border-[#d4af37]/40 py-4 focus:border-[#fcf6ba] outline-none text-[#f5f5dc] text-lg" />
              <select className="w-full bg-transparent border-b border-[#d4af37]/40 py-4 focus:border-[#fcf6ba] outline-none text-[#f5f5dc]/40 text-lg">
                <option value="" className="bg-[#041a16]">Услуга</option>
                <option value="interior" className="bg-[#041a16]">Дизайн</option>
                <option value="arch" className="bg-[#041a16]">Архитектура</option>
              </select>
              <button className="w-full btn-gold py-7 rounded-sm text-[13px] font-black tracking-widest uppercase">Оставить заявку</button>
            </form>
          </div>
        </div>
      </div>

      {showSocialManifesto && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-[#041a16]/95 backdrop-blur-2xl p-6 animate-fade-in overflow-y-auto">
          <div className="relative group max-w-4xl w-full bg-white/[0.02] border border-white/5 p-12 rounded-sm shadow-2xl">
            <div className="text-[#f5f5dc]/80 text-lg leading-relaxed italic font-serif space-y-2 pt-12">
              {siteConfig.socialManifesto.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
            <div className="flex items-center justify-between border-t border-white/5 mt-8 pt-8">
              <div className="flex items-center gap-6">
                <img src={siteConfig.founder.photo} className="w-16 h-16 rounded-full object-cover border-2 border-[#d4af37]/20" />
                <div>
                  <h4 className="text-2xl font-logo italic text-[#d4af37]">{siteConfig.founder.name}</h4>
                  <p className="text-[8px] text-[#d4af37]/40 tracking-widest uppercase font-black">Founder of VedArta</p>
                </div>
              </div>
              <button onClick={() => setShowSocialManifesto(false)} className="text-[9px] font-black uppercase text-[#d4af37] border-b border-[#d4af37]/10 pb-1">Вернуться</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
