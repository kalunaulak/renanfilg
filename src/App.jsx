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
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { Register } from './pages/Register';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { LanguageSelector } from './components/LanguageSelector';
import { useEffect } from 'react';
import logo from './assets/logo.webp';

const LandingPage = () => (
  <>
    <Header />
    <main className="relative z-10 space-y-24 md:space-y-48">
      <Hero />
      <section className="py-20 md:py-32"><SocialProof /></section>
      <section className="py-20 md:py-32"><PerformanceComparison /></section>
      <section className="py-20 md:py-32"><Services /></section>
      <section className="py-20 md:py-32"><PerformanceProtocol /></section>
      <section className="py-20 md:py-32"><Pricing /></section>
      <section className="py-20 md:py-32"><ScreeningForm /></section>
      <section className="py-20 md:py-40"><FAQ /></section>
    </main>
    
    {/* RODAPÉ ROBUSTO E ESPAÇOSO */}
    <footer className="py-40 md:py-60 px-10 md:px-20 border-t border-white/[0.05] bg-[#020202] relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-20 md:gap-32 mb-32">
          <img src={logo} alt="Renan Filg" className="h-10 md:h-12 w-auto grayscale opacity-60 hover:opacity-100 transition-opacity" />
          <div className="flex flex-wrap justify-center gap-12 md:gap-24 text-[11px] md:text-xs font-bold text-white/40 uppercase tracking-[0.5em]">
            <a href="https://instagram.com/renanfilg" target="_blank" rel="noopener noreferrer" className="hover:text-[#00bffa] transition-colors">Instagram</a>
            <a href="#" className="hover:text-[#00bffa] transition-colors">Twitter</a>
            <a href="#" className="hover:text-[#00bffa] transition-colors">Discord</a>
            <a href="#" className="hover:text-[#00bffa] transition-colors">LinkedIn</a>
          </div>
        </div>
        <div className="flex flex-col gap-8 items-center border-t border-white/5 pt-20">
          <div className="text-[10px] md:text-[12px] font-thin text-white/20 uppercase tracking-[1em] text-center leading-relaxed">
            © 2026 Renan Filg® — Built for the 1%. <br className="md:hidden" /> Otimização Elite em Hardware.
          </div>
          <div className="h-1 w-20 bg-gradient-to-r from-transparent via-[#00bffa] to-transparent opacity-30"></div>
        </div>
      </div>
    </footer>
  </>
);

const AppContent = () => {
  const { language, selectLanguage } = useLanguage();

  return (
    <Router>
      <div className="min-h-screen bg-[#020202] text-white selection:bg-[#00bffa]/30 relative overflow-x-hidden">
        <CustomCursor />
        <GridBackground />
        
        {!language && <LanguageSelector onSelect={selectLanguage} />}

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

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
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
