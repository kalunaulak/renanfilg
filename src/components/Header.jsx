import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 border-b border-white/5 bg-[#020202]/60 backdrop-blur-2xl ${
        isScrolled ? 'py-4 shadow-2xl' : 'py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-4 group">
          <img src={logo} alt="RF" className="h-6 md:h-8 w-auto" />
          <div className="hidden lg:block w-px h-4 bg-white/10"></div>
          <span className="hidden lg:block text-[9px] font-light text-zinc-500 uppercase tracking-[0.4em]">Expert Systems</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-12">
          <div className="flex items-center gap-8 text-[10px] font-light tracking-[0.3em] text-zinc-500 uppercase">
            <a href="#" className="hover:text-white transition-colors">{t.home}</a>
            <a href="#precos" className="hover:text-white transition-colors">{t.pricing}</a>
            <a href="https://instagram.com/renanfilg" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              {t.social}
            </a>
          </div>

          <div className="flex items-center gap-4 border-l border-white/10 pl-8">
            <Link 
              to="/login" 
              className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-widest text-zinc-300 hover:text-[#00bffa] hover:border-[#00bffa]/30 transition-all"
            >
              {t.members}
            </Link>
            <a href="#agendar" className="btn-elite-primary !py-2.5 !px-6 !text-[10px] !rounded-full">
              {t.cta}
            </a>

            {/* Language Switch Toggle */}
            <div 
              onClick={toggleLanguage}
              className="flex items-center gap-3 ml-2 cursor-pointer group"
            >
              <span className={`text-[8px] uppercase tracking-widest transition-colors ${language === 'pt' ? 'text-white' : 'text-zinc-600 group-hover:text-zinc-400'}`}>PT</span>
              <div 
                className="w-10 h-5 rounded-full bg-white/10 border border-white/10 relative p-1 transition-colors group-hover:border-[#00bffa]/30"
              >
                <motion.div 
                  animate={{ x: language === 'pt' ? 0 : 20 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="w-3 h-3 rounded-full bg-[#00bffa] shadow-[0_0_10px_rgba(0,191,250,0.5)]"
                />
              </div>
              <span className={`text-[8px] uppercase tracking-widest transition-colors ${language === 'en' ? 'text-white' : 'text-zinc-600 group-hover:text-zinc-400'}`}>EN</span>
            </div>
          </div>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-white bg-white/5 rounded-lg border border-white/10 text-[10px]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (language === 'en' ? 'CLOSE' : 'FECHAR') : 'MENU'}
        </button>
      </div>

      {/* Mobile Menu Overlay - Simples sem animação */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-[#020202] border-b border-white/10 p-8 flex flex-col gap-6 md:hidden z-50 shadow-2xl">
          <a href="#" onClick={() => setMobileMenuOpen(false)} className="text-xl font-light uppercase tracking-tighter">
            {t.home_full}
          </a>
          <a href="#precos" onClick={() => setMobileMenuOpen(false)} className="text-xl font-light uppercase tracking-tighter">
            {t.pricing}
          </a>
          <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="text-xl font-light uppercase tracking-tighter text-[#00bffa]">
            {t.members_full}
          </Link>
          <a href="#agendar" onClick={() => setMobileMenuOpen(false)} className="btn-elite-primary text-center mt-4 !rounded-xl">
            {t.cta}
          </a>
        </div>
      )}
    </header>
  );
};
