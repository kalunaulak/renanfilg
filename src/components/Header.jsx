import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Menu, X, LogIn, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.webp';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        isScrolled ? 'py-4 bg-[#020202]/80 backdrop-blur-2xl border-b border-white/5' : 'py-8 bg-transparent'
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
            <a href="#" className="hover:text-white transition-colors">Home</a>
            <a href="#precos" className="hover:text-white transition-colors">Preços</a>
            <a href="https://instagram.com/renanfilg" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Social</a>
          </div>

          <div className="flex items-center gap-4 border-l border-white/10 pl-8">
            <Link 
              to="/login" 
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-widest text-zinc-300 hover:text-[#00bffa] hover:border-[#00bffa]/30 transition-all group"
            >
              <User size={14} className="text-[#00bffa]" />
              ASSINANTES
            </Link>
            <a href="#agendar" className="btn-elite-primary !py-2.5 !px-6 !text-[10px] !rounded-full">
              AGENDAR AGORA
            </a>
          </div>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-[#020202] border-b border-white/10 p-8 flex flex-col gap-6 md:hidden z-50 shadow-2xl"
          >
            <a href="#" onClick={() => setMobileMenuOpen(false)} className="text-xl font-light uppercase tracking-tighter flex items-center justify-between group">
              Home <ChevronRight size={18} className="text-[#00bffa] opacity-0 group-hover:opacity-100 transition-all" />
            </a>
            <a href="#precos" onClick={() => setMobileMenuOpen(false)} className="text-xl font-light uppercase tracking-tighter flex items-center justify-between group">
              Preços <ChevronRight size={18} className="text-[#00bffa] opacity-0 group-hover:opacity-100 transition-all" />
            </a>
            <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="text-xl font-light uppercase tracking-tighter text-[#00bffa] flex items-center justify-between group">
              Área do Assinante <LogIn size={18} />
            </Link>
            <a href="#agendar" onClick={() => setMobileMenuOpen(false)} className="btn-elite-primary text-center mt-4">
              AGENDAR PROTOCOLO
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
