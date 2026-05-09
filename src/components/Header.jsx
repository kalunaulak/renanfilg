import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import logo from '../assets/logo.webp';

export const Header = () => {
  const { language, selectLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const t = {
    pt: { home: 'Home', pricing: 'Preços', social: 'Social', members: 'MEMBROS', cta: 'AGENDAR AGORA', home_full: 'Home', members_full: 'Área de Membros' },
    en: { home: 'Home', pricing: 'Pricing', social: 'Social', members: 'MEMBERS', cta: 'BOOK NOW', home_full: 'Home', members_full: 'Members Area' }
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
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 border-b border-white/5 bg-[#020202]/80 backdrop-blur-3xl ${
        isScrolled ? 'py-6 shadow-2xl' : 'py-10 md:py-12'
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 md:px-12 flex items-center justify-between">
        {/* Logo imponente */}
        <Link to="/" className="flex items-center gap-6 group">
          <img src={logo} alt="RF" className="h-10 md:h-12 w-auto transition-transform duration-500 group-hover:scale-105" />
          <div className="hidden lg:block w-px h-6 bg-white/10"></div>
          <span className="hidden lg:block text-[10px] font-thin text-white/40 uppercase tracking-[0.5em]">Elite Hardware Systems</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-16">
          <div className="flex items-center gap-12 text-[11px] font-bold tracking-[0.4em] text-white/40 uppercase">
            <a href="#" className="hover:text-white transition-colors">{t.home}</a>
            <a href="#precos" className="hover:text-white transition-colors">{t.pricing}</a>
            <a href="https://instagram.com/renanfilg" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              {t.social}
            </a>
          </div>

          <div className="flex items-center gap-6 border-l border-white/10 pl-12">
            <Link 
              to="/login" 
              className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-widest text-white/60 hover:text-[#00bffa] hover:border-[#00bffa]/30 transition-all"
            >
              {t.members}
            </Link>
            <a href="#agendar" className="btn-elite-primary !py-3 !px-8 !text-[10px] !rounded-full">
              {t.cta}
            </a>

            {/* Language Switch Toggle */}
            <div 
              onClick={toggleLanguage}
              className="flex items-center gap-4 ml-4 cursor-pointer group"
            >
              <span className={`text-[9px] font-black tracking-widest transition-colors ${language === 'pt' ? 'text-[#00bffa]' : 'text-white/20'}`}>PT</span>
              <div className="w-12 h-6 rounded-full bg-white/5 border border-white/10 relative p-1 transition-colors group-hover:border-[#00bffa]/30">
                <motion.div 
                  animate={{ x: language === 'pt' ? 0 : 24 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="w-4 h-4 rounded-full bg-[#00bffa] shadow-[0_0_15px_rgba(0,191,250,0.6)]"
                />
              </div>
              <span className={`text-[9px] font-black tracking-widest transition-colors ${language === 'en' ? 'text-[#00bffa]' : 'text-white/20'}`}>EN</span>
            </div>
          </div>
        </nav>

        {/* Mobile Toggle Robusto */}
        <button 
          className="md:hidden flex items-center gap-4 px-6 py-3 bg-white/5 rounded-full border border-white/10"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="text-[10px] font-black tracking-[0.3em] text-[#00bffa] uppercase">{mobileMenuOpen ? 'FECHAR' : 'MENU'}</span>
          <div className="w-4 h-px bg-white/40"></div>
        </button>
      </div>

      {/* Mobile Menu Overlay Refinado */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-[#020202]/95 backdrop-blur-3xl border-b border-white/10 p-12 flex flex-col gap-10 md:hidden z-50 shadow-2xl"
          >
            <a href="#" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-thin uppercase tracking-tighter text-white/60 hover:text-white transition-colors">
              {t.home_full}
            </a>
            <a href="#precos" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-thin uppercase tracking-tighter text-white/60 hover:text-white transition-colors">
              {t.pricing}
            </a>
            <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-thin uppercase tracking-tighter text-[#00bffa]">
              {t.members_full}
            </Link>
            <a href="#agendar" onClick={() => setMobileMenuOpen(false)} className="btn-elite-primary text-center mt-6 !py-6 !rounded-2xl !text-[12px]">
              {t.cta}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
