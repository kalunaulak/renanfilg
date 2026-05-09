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
    pt: { home: 'Home', pricing: 'Preços', social: 'Social', members: 'ÁREA DE MEMBROS', cta: 'AGENDAR AGORA', home_full: 'Início', members_full: 'Área de Membros' },
    en: { home: 'Home', pricing: 'Pricing', social: 'Social', members: 'MEMBERS AREA', cta: 'BOOK NOW', home_full: 'Home', members_full: 'Members Area' }
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
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 border-b border-white/5 bg-[#020202]/90 backdrop-blur-3xl ${
        isScrolled ? 'py-6 md:py-8 shadow-2xl' : 'py-10 md:py-14'
      }`}
    >
      <div className="max-w-7xl mx-auto px-10 md:px-14 flex items-center justify-between">
        
        {/* Logo (Sempre visível) */}
        <Link to="/" className="flex items-center gap-4 group shrink-0">
          <img src={logo} alt="RF" className="h-10 md:h-12 w-auto transition-transform duration-500" />
        </Link>

        {/* Desktop Nav (Escondido no Mobile) */}
        <nav className="hidden lg:flex items-center gap-16">
          <div className="flex items-center gap-12 text-[11px] font-bold tracking-[0.4em] text-white/40 uppercase">
            <a href="#" className="hover:text-white transition-colors">{t.home}</a>
            <a href="#precos" className="hover:text-white transition-colors">{t.pricing}</a>
            <a href="https://instagram.com/renanfilg" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              {t.social}
            </a>
          </div>

          <div className="flex items-center gap-8 border-l border-white/10 pl-12">
            <Link 
              to="/login" 
              className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-[10px] uppercase tracking-widest text-white/60 hover:text-[#00bffa] hover:border-[#00bffa]/30 transition-all"
            >
              {t.members}
            </Link>
            <a href="#agendar" className="btn-elite-primary !py-4 !px-10 !text-[10px] !rounded-2xl">
              {t.cta}
            </a>

            {/* Language Switch Toggle */}
            <div onClick={toggleLanguage} className="flex items-center gap-4 cursor-pointer group">
              <span className={`text-[9px] font-black tracking-widest transition-colors ${language === 'pt' ? 'text-[#00bffa]' : 'text-white/20'}`}>PT</span>
              <div className="w-12 h-6 rounded-full bg-white/5 border border-white/10 relative p-1 transition-colors group-hover:border-[#00bffa]/30">
                <motion.div animate={{ x: language === 'pt' ? 0 : 24 }} transition={{ type: "spring", stiffness: 500, damping: 30 }} className="w-4 h-4 rounded-full bg-[#00bffa] shadow-[0_0_15px_rgba(0,191,250,0.6)]" />
              </div>
              <span className={`text-[9px] font-black tracking-widest transition-colors ${language === 'en' ? 'text-[#00bffa]' : 'text-white/20'}`}>EN</span>
            </div>
          </div>
        </nav>

        {/* Mobile Toggle (Pílula com cantos modernos) */}
        <button 
          className="lg:hidden flex items-center gap-4 px-8 py-4 bg-white/5 rounded-2xl border border-white/10 active:scale-95 transition-all"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="text-[10px] font-black tracking-[0.3em] text-[#00bffa] uppercase">{mobileMenuOpen ? 'CLOSE' : 'MENU'}</span>
          <div className="flex flex-col gap-1">
            <div className={`w-4 h-px bg-white/60 transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-1' : ''}`}></div>
            <div className={`w-4 h-px bg-white/60 transition-all ${mobileMenuOpen ? '-rotate-45' : ''}`}></div>
          </div>
        </button>
      </div>

      {/* Mobile Menu Overlay Full-Screen */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 top-0 bg-[#020202] flex flex-col p-12 pt-40 gap-12 lg:hidden z-[90]"
          >
            <div className="flex flex-col gap-8 border-l border-white/10 pl-8">
               <a href="#" onClick={() => setMobileMenuOpen(false)} className="text-5xl font-thin uppercase tracking-tighter text-white/80">{t.home_full}</a>
               <a href="#precos" onClick={() => setMobileMenuOpen(false)} className="text-5xl font-thin uppercase tracking-tighter text-white/80">{t.pricing}</a>
               <a href="https://instagram.com/renanfilg" onClick={() => setMobileMenuOpen(false)} className="text-5xl font-thin uppercase tracking-tighter text-white/80">{t.social}</a>
               <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="text-5xl font-thin uppercase tracking-tighter text-[#00bffa]">{t.members_full}</Link>
            </div>
            
            <div className="mt-auto space-y-8">
              <a href="#agendar" onClick={() => setMobileMenuOpen(false)} className="btn-elite-primary w-full !py-8 !rounded-[32px] !text-[14px]">
                {t.cta}
              </a>
              <div onClick={toggleLanguage} className="flex items-center justify-center gap-6 p-8 rounded-[32px] border border-white/5 bg-white/[0.02]">
                <span className={`text-xs font-black tracking-widest ${language === 'pt' ? 'text-[#00bffa]' : 'text-white/20'}`}>PORTUGUÊS</span>
                <div className="w-px h-4 bg-white/10"></div>
                <span className={`text-xs font-black tracking-widest ${language === 'en' ? 'text-[#00bffa]' : 'text-white/20'}`}>ENGLISH</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
