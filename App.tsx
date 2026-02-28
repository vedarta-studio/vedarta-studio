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
  className="fixed bottom-6 right-3 z-40 w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-300"
  title="AI Дизайн-Ассистент"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5 text-white"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 10V3L4 14h7v7l9-11h-7z"
    />
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