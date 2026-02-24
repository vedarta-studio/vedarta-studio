import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Comparison } from './components/Comparison';
import { CallToAction } from './components/CallToAction';
import { About } from './components/About';
import { History } from './components/History';
import { Services } from './components/Services';
import { Pricing } from './components/Pricing';
import { Process } from './components/Process';
import { Documentation } from './components/Documentation';
import { Portfolio } from './components/Portfolio';
import { Philosophy } from './components/Philosophy';
import { AIAssistant } from './components/AIAssistant';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { TextureLibrary } from './components/TextureLibrary';

const App: React.FC = () => {
  const [showAI, setShowAI] = useState(false);

const handleOpenAI = () => {
  window.open(
    "https://chatgpt.com/g/g-68ebeded2ab881918ca6e81ef557dde9-vedsoma-ot-lichnosti-k-prostranstvu",
    "_blank"
  );
};

  return (
    <div className="min-h-screen selection:bg-yellow-500/30">
      <Navbar onOpenAI={handleOpenAI} />
      
      <main>
        <Hero onOpenAI={handleOpenAI} />
        <Comparison />
        <CallToAction />
        <About />
        <History />
        <Philosophy />
        <TextureLibrary />
        <Services />
        <Portfolio />
        <Pricing />
        <Process />
        <Documentation />
        <Testimonials />
        <Contact />
      </main>

      <Footer />

      {/* Floating AI Button */}
      <button 
        onClick={handleOpenAI}
        className="fixed bottom-8 right-8 z-50 w-16 h-16 rounded-full btn-gold flex items-center justify-center shadow-2xl group transition-all"
        title="AI Дизайн-Ассистент"
      >
        <span className="absolute -top-12 right-0 bg-white text-black text-xs font-bold px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl">
          Нужен совет дизайнера? ✨
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </button>

      {/* AI Modal Overlay */}
      {showAI && (
        <AIAssistant onClose={() => setShowAI(false)} />
      )}
    </div>
  );
};

export default App;