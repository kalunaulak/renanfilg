import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import { Header } from './components/Header';
import { EasterEgg } from './components/EasterEgg';
import { About } from './components/About';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { LanguageSelector } from './components/LanguageSelector';
import { useState, useEffect } from 'react';
import logo from './assets/logo.webp';

const LandingPage = () => {
  const [isScreeningOpen, setIsScreeningOpen] = useState(false);

  return (
    <>
      <Header />
      <main className="relative z-10">
        <Hero />
        <div className="bg-black">
          <SocialProof />
          <Services />
          <PerformanceComparison />
          <PerformanceProtocol />
          <Pricing onOpenScreening={() => setIsScreeningOpen(true)} />
          <FAQ />
        </div>
      </main>

      <ScreeningForm isOpen={isScreeningOpen} onClose={() => setIsScreeningOpen(false)} />

      <EasterEgg onOpenScreening={() => setIsScreeningOpen(true)} />
      
      <footer id="footer-social" className="py-16 md:py-32 px-6 md:px-20 border-t border-white/[0.05] bg-[#020202] relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12 md:gap-32 mb-16 md:mb-32">
          <img src={logo} alt="Renan Filg" width={930} height={830} className="h-10 md:h-12 w-auto object-contain grayscale opacity-60 hover:opacity-100 transition-opacity" />
          <div className="flex flex-wrap justify-center gap-6 md:gap-24 text-[11px] md:text-xs font-bold text-white/60 uppercase tracking-[0.5em]">
            <a href="https://instagram.com/renanfilg" target="_blank" rel="noopener noreferrer" className="hover:text-[#00bffa] transition-colors">Instagram</a>
            <a href="https://x.com/renanfilg2" target="_blank" rel="noopener noreferrer" className="hover:text-[#00bffa] transition-colors">Twitter</a>
            <a href="https://www.linkedin.com/in/renanfilgueiras/" target="_blank" rel="noopener noreferrer" className="hover:text-[#00bffa] transition-colors">LinkedIn</a>
          </div>
        </div>
        <div className="flex flex-col gap-8 items-center border-t border-white/5 pt-12 md:pt-20">
          <div className="text-[10px] md:text-[12px] font-medium text-white/50 uppercase tracking-[0.5em] md:tracking-[1em] text-center leading-relaxed">
            © 2026 Renan Filg® — Built for the 1%. <br className="md:hidden" /> Otimização Elite em Hardware.
          </div>
          <div className="h-1 w-20 bg-gradient-to-r from-transparent via-[#00bffa] to-transparent opacity-30"></div>
        </div>
      </div>
    </footer>
  </>
  );
};

const AppContent = () => {
  const { language, selectLanguage } = useLanguage();

  return (
    <Router>
      <div 
        onContextMenu={(e) => e.preventDefault()}
        className="min-h-screen bg-[#020202] text-white selection:bg-[#00bffa]/30 relative overflow-x-hidden"
      >
        <CustomCursor />
        <GridBackground />
        
        {!language && <LanguageSelector onSelect={selectLanguage} />}

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/sobre" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
};

function App() {
  useEffect(() => {
    // Limpar imediatamente qualquer intervalo residual de reloads anteriores do Vite HMR
    if (window.__tabBlinkInterval) {
      clearInterval(window.__tabBlinkInterval);
      window.__tabBlinkInterval = null;
    }

    const originalTitle = "Renan Filg | Extreme Hardware Tuning & FPS Boost";
    document.title = originalTitle; // Forçar o título original imediatamente ao montar/recarregar
    
    const startBlinking = () => {
      // Se já houver um loop ativo, não cria outro para evitar aceleração ou vazamentos
      if (window.__tabBlinkInterval) return;
      
      let toggle = false;
      window.__tabBlinkInterval = setInterval(() => {
        document.title = toggle ? "O segredo do zero Lag 🤫" : originalTitle;
        toggle = !toggle;
      }, 800);
    };

    const stopBlinking = () => {
      if (window.__tabBlinkInterval) {
        clearInterval(window.__tabBlinkInterval);
        window.__tabBlinkInterval = null;
      }
      document.title = originalTitle;
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        startBlinking();
      } else {
        stopBlinking();
      }
    };

    const handleBlur = () => {
      startBlinking();
    };

    const handleFocus = () => {
      stopBlinking();
    };

    const handleContextMenu = (e) => {
      e.preventDefault();
    };

    // Registrar múltiplos ganchos para garantir funcionamento em abas secundárias e múltiplos monitores
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);
    document.addEventListener("contextmenu", handleContextMenu);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
      document.removeEventListener("contextmenu", handleContextMenu);
      if (window.__tabBlinkInterval) {
        clearInterval(window.__tabBlinkInterval);
        window.__tabBlinkInterval = null;
      }
    };
  }, []);

  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
