
import React, { useState } from 'react';
import { siteConfig } from '../siteConfig';

export const Footer: React.FC = () => {
  const [showSocialManifesto, setShowSocialManifesto] = useState(false);

  return (
    <footer className="bg-[#041a16] py-24 border-t border-[#fff7a0]/10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-16">
          <div className="text-5xl font-logo font-black tracking-tight gold-gradient">VedArta</div>
          
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 text-[10px] tracking-[0.4em] font-black text-[#f5f5dc]">
            <a href={siteConfig.contacts.telegramLink} target="_blank" className="text-[#0088cc] uppercase">Telegram</a>
            {siteConfig.contacts.socialLinks.map((item) => (
              <button key={item.id} onClick={() => setShowSocialManifesto(true)} className="uppercase hover:text-[#fff7a0] transition-all">{item.name}</button>
            ))}
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-xs text-[#f5f5dc]/20 tracking-widest uppercase mb-2">© {new Date().getFullYear()} VedArta. All rights reserved.</p>
            <p className="text-[10px] text-[#fff7a0]/50 tracking-widest font-bold uppercase">{siteConfig.hero.subtitle}</p>
          </div>
        </div>
      </div>

      {showSocialManifesto && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-[#041a16]/95 backdrop-blur-2xl p-6 animate-fade-in overflow-y-auto">
          <div className="relative max-w-4xl w-full bg-white/[0.02] border border-white/5 p-12 rounded-sm shadow-2xl text-center">
            <div className="text-[#f5f5dc]/80 text-lg leading-relaxed italic font-serif space-y-2 mb-10">
              {siteConfig.socialManifesto.map((line, i) => <p key={i}>{line}</p>)}
            </div>
            <button onClick={() => setShowSocialManifesto(false)} className="btn-gold px-12 py-5 rounded-sm text-[10px] font-black uppercase tracking-widest">ЗАКРЫТЬ</button>
          </div>
        </div>
      )}
    </footer>
  );
};
