import { Hero } from './components/Hero';
import { SocialProof } from './components/SocialProof';
import { PerformanceComparison } from './components/PerformanceComparison';
import { Services } from './components/Services';
import { PerformanceProtocol } from './components/PerformanceProtocol';
import { Pricing } from './components/Pricing';
import { ScreeningForm } from './components/ScreeningForm';
import { GridBackground } from './components/GridBackground';
import { FAQ } from './components/FAQ';
import { CustomCursor } from './components/CustomCursor';
import { useEffect } from 'react';
import logo from './assets/logo.webp';

function App() {
  useEffect(() => {
    let interval;
    const originalTitle = document.title;
    
    const handleVisibilityChange = () => {
      if (document.hidden) {
        let toggle = false;
        interval = setInterval(() => {
          document.title = toggle ? "O segredo do zero lag... 🤫" : originalTitle;
          toggle = !toggle;
        }, 500);
      } else {
        clearInterval(interval);
        document.title = originalTitle;
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  return (
    <div className="min-h-screen bg-[#020202] text-white selection:bg-[#00bffa]/30 relative">
      <CustomCursor />
      <GridBackground />
      
      {/* Basic Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#020202]/60 backdrop-blur-3xl border-b border-white/[0.03] px-10 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6 group cursor-pointer">
            <img src={logo} alt="Renan Filg" className="h-8 w-auto" />
            <div className="hidden lg:block w-px h-4 bg-white/10"></div>
            <span className="hidden lg:block text-[10px] font-light text-zinc-500 uppercase tracking-[0.4em]">Expert Systems</span>
          </div>
          
          <div className="hidden md:flex items-center gap-12 text-[10px] font-light tracking-[0.4em] text-zinc-500 uppercase">
            <a href="#" className="hover:text-white transition-colors">Home</a>
            <a href="#precos" className="hover:text-white transition-colors">Preços</a>
            <a href="https://instagram.com/renanfilg" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
          </div>

          <a href="#agendar" className="btn-elite-primary !py-3 !px-8 !text-[10px]">
            Agendar Agora
          </a>
        </div>
      </nav>

      <main className="relative z-10">
        <Hero />
        <SocialProof />
        <PerformanceComparison />
        <Services />
        <PerformanceProtocol />
        <Pricing />
        <ScreeningForm />
        <FAQ />
      </main>

      <footer className="py-32 px-10 border-t border-white/[0.03] bg-[#020202] relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:row justify-between items-center gap-12 mb-20">
            <img src={logo} alt="Renan Filg" className="h-6 w-auto grayscale opacity-40" />
            <div className="flex gap-12 text-[10px] font-light text-zinc-400 uppercase tracking-[0.4em]">
              <a href="https://instagram.com/renanfilg" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
              <a href="#" className="hover:text-white transition-colors">Discord</a>
            </div>
          </div>
          <div className="text-[10px] font-light text-zinc-500 uppercase tracking-widest text-center">
            © 2026 Renan Filg® — Todos os direitos reservados. Built for the 1%.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
