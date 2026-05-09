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
  </>
);

const AppContent = () => {
  const { language, selectLanguage } = useLanguage();

  return (
    <Router>
      <div className="min-h-screen bg-[#020202] text-white selection:bg-[#00bffa]/30 relative">
        <CustomCursor />
        <GridBackground />
        
        {/* Mostra o seletor se não houver idioma escolhido */}
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
