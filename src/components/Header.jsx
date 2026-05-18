import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Menu, X } from 'lucide-react';
import logo from '../assets/logo.webp';

export const Header = () => {
  const { language, selectLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const t = {
    pt: { home: 'Home', pricing: 'Preços', social: 'Social', members: 'MEMBROS', cta: 'AGENDAR AGORA', about: 'Sobre Mim' },
    en: { home: 'Home', pricing: 'Pricing', social: 'Social', members: 'MEMBERS', cta: 'BOOK NOW', about: 'About Me' }
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
        
        <Link to="/" className="flex items-center gap-4 group">
          <img src={logo} alt="RF" width={930} height={830} className="h-10 md:h-8 w-auto object-contain" />
          <div className="hidden lg:block w-px h-4 bg-white/10"></div>
          <span className="hidden lg:block text-[9px] font-light text-zinc-500 uppercase tracking-[0.4em]">Renan Filg</span>
        </Link>

        {/* Desktop Nav (Escondido no mobile para evitar o bug de amontoamento) */}
        <nav className="hidden md:flex items-center gap-12">
          <div className="flex items-center gap-8 text-[10px] font-light tracking-[0.3em] text-zinc-500 uppercase">
            <Link to="/" className="hover:text-white transition-colors">{t.home}</Link>
            <Link to="/sobre" className="hover:text-white transition-colors">{t.about}</Link>
            <a href="/#precos" onClick={(e) => {
              if (window.location.pathname === '/') {
                e.preventDefault();
                document.getElementById('precos')?.scrollIntoView({ behavior: 'smooth' });
              }
            }} className="hover:text-white transition-colors">{t.pricing}</a>
            <a href="#footer-social" onClick={(e) => {
              e.preventDefault();
              document.getElementById('footer-social')?.scrollIntoView({ behavior: 'smooth' });
            }} className="hover:text-white transition-colors">
              {t.social}
            </a>
          </div>

          <div className="flex items-center gap-4 border-l border-white/10 pl-8">
            <button onClick={(e) => {
              e.preventDefault();
              if (window.location.pathname === '/') {
                document.getElementById('precos')?.scrollIntoView({ behavior: 'smooth' });
              } else {
                window.location.href = '/#precos';
              }
            }} className="btn-elite-primary !py-2.5 !px-6 !text-[10px] !rounded-xl">
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

        {/* Mobile View - Menu e CTA */}
        <div className="md:hidden flex items-center gap-3">
           <button onClick={(e) => {
             e.preventDefault();
             setIsMobileMenuOpen(false);
             if (window.location.pathname === '/') {
               document.getElementById('precos')?.scrollIntoView({ behavior: 'smooth' });
             } else {
               window.location.href = '/#precos';
             }
           }} className="btn-elite-primary !py-2.5 !px-5 !text-[9px] !rounded-xl">
              {t.cta}
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 text-white hover:text-[#00bffa] transition-colors"
            >
              <Menu size={24} />
            </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[120] bg-[#020202]/95 backdrop-blur-3xl border-b border-white/10 flex flex-col pt-8 px-6 h-screen overflow-y-auto"
          >
            {/* Header interno do menu mobile */}
            <div className="flex items-center justify-between mb-20">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-4">
                <img src={logo} alt="RF" className="h-10 w-auto object-contain" />
              </Link>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-white hover:text-[#ff3e3e] transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Links do Menu */}
            <div className="flex flex-col gap-8 text-[12px] font-light tracking-[0.3em] text-zinc-400 uppercase items-center">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white transition-colors py-2">{t.home}</Link>
              <Link to="/sobre" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white transition-colors py-2">{t.about}</Link>
              <a href="/#precos" onClick={(e) => {
                setIsMobileMenuOpen(false);
                if (window.location.pathname === '/') {
                  e.preventDefault();
                  document.getElementById('precos')?.scrollIntoView({ behavior: 'smooth' });
                }
              }} className="hover:text-white transition-colors py-2">{t.pricing}</a>
              <a href="#footer-social" onClick={(e) => {
                e.preventDefault();
                setIsMobileMenuOpen(false);
                document.getElementById('footer-social')?.scrollIntoView({ behavior: 'smooth' });
              }} className="hover:text-white transition-colors py-2">
                {t.social}
              </a>
            </div>

            {/* Seção Extra do Mobile (Idioma) */}
            <div className="mt-16 flex flex-col items-center gap-8 border-t border-white/10 pt-12">
              <div onClick={() => { toggleLanguage(); setIsMobileMenuOpen(false); }} className="flex items-center gap-4 cursor-pointer group">
                <span className={`text-[11px] uppercase tracking-widest ${language === 'pt' ? 'text-white font-bold' : 'text-zinc-600'}`}>PT</span>
                <div className="w-14 h-7 rounded-full bg-white/10 border border-white/10 relative p-1.5">
                  <motion.div animate={{ x: language === 'pt' ? 0 : 28 }} className="w-4 h-4 rounded-full bg-[#00bffa]" />
                </div>
                <span className={`text-[11px] uppercase tracking-widest ${language === 'en' ? 'text-white font-bold' : 'text-zinc-600'}`}>EN</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
