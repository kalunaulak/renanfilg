import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import logo from '../assets/logo.webp';

export const Header = () => {
  const { language, selectLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);

  const t = {
    pt: { home: 'Home', pricing: 'Preços', social: 'Social', members: 'MEMBROS', cta: 'AGENDAR AGORA' },
    en: { home: 'Home', pricing: 'Pricing', social: 'Social', members: 'MEMBERS', cta: 'BOOK NOW' }
  }[language || 'pt'];

  const toggleLanguage = () => {
    selectLanguage(language === 'pt' ? 'en' : 'pt');
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 border-b border-white/5 bg-[#020202]/80 backdrop-blur-3xl ${
        isScrolled 
          ? 'py-4 md:py-4 shadow-2xl' 
          : 'py-10 md:py-6' // Mobile alto (py-10), PC original (py-6)
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between">
        
        {/* Logo - Grande no mobile, Normal no PC */}
        <Link to="/" className="flex items-center gap-4 group">
          <img src={logo} alt="RF" className="h-10 md:h-8 w-auto" />
          <div className="hidden lg:block w-px h-4 bg-white/10"></div>
          <span className="hidden lg:block text-[9px] font-light text-zinc-500 uppercase tracking-[0.4em]">Renan Filg</span>
        </Link>

        {/* Desktop Nav (Escondido no mobile para evitar o bug de amontoamento) */}
        <nav className="hidden md:flex items-center gap-12">
          <div className="flex items-center gap-8 text-[10px] font-light tracking-[0.3em] text-zinc-500 uppercase">
            <a href="#" className="hover:text-white transition-colors">{t.home}</a>
            <a href="#precos" className="hover:text-white transition-colors">{t.pricing}</a>
            <a href="https://instagram.com/renanfilg" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              {t.social}
            </a>
          </div>

          <div className="flex items-center gap-4 border-l border-white/10 pl-8">
            <button onClick={(e) => { e.preventDefault(); document.getElementById('agendar')?.scrollIntoView({ behavior: 'smooth' }); }} className="btn-elite-primary !py-2.5 !px-6 !text-[10px] !rounded-xl">
              {t.cta}
            </button>

            {/* Language Switch */}
            <div onClick={toggleLanguage} className="flex items-center gap-3 ml-2 cursor-pointer group">
              <span className={`text-[8px] uppercase tracking-widest ${language === 'pt' ? 'text-white' : 'text-zinc-600'}`}>PT</span>
              <div className="w-10 h-5 rounded-full bg-white/10 border border-white/10 relative p-1">
                <motion.div animate={{ x: language === 'pt' ? 0 : 20 }} className="w-3 h-3 rounded-full bg-[#00bffa]" />
              </div>
              <span className={`text-[8px] uppercase tracking-widest ${language === 'en' ? 'text-white' : 'text-zinc-600'}`}>EN</span>
            </div>
          </div>
        </nav>

        {/* Mobile View - Apenas o CTA para manter o design clean e alto */}
        <div className="md:hidden flex items-center gap-4">
           <button onClick={(e) => { e.preventDefault(); document.getElementById('agendar')?.scrollIntoView({ behavior: 'smooth' }); }} className="btn-elite-primary !py-3 !px-6 !text-[9px] !rounded-xl">
              {t.cta}
            </button>
        </div>
      </div>
    </header>
  );
};
