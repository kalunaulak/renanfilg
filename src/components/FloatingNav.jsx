import { motion } from 'framer-motion';
import { Send, Home, DollarSign, Instagram, User, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.webp';

export const FloatingNav = () => {
  return (
    <motion.nav 
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.1}
      whileDrag={{ scale: 1.05 }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] px-6 py-4 glass-card border border-white/10 rounded-full flex items-center gap-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] touch-none cursor-grab active:cursor-grabbing md:top-8 md:bottom-auto"
    >
      <div className="flex items-center gap-4 pr-4 border-r border-white/10">
        <Link to="/">
          <img src={logo} alt="RF" width={930} height={830} className="h-5 w-auto object-contain" />
        </Link>
      </div>

      <div className="flex items-center gap-6 text-[10px] font-light tracking-[0.3em] text-zinc-400 uppercase">
        <a href="#" className="hover:text-white transition-colors hidden md:block">Home</a>
        <a href="#precos" className="hover:text-white transition-colors flex items-center gap-2">
          <DollarSign size={12} className="md:hidden" />
          <span className="hidden md:block">Preços</span>
        </a>
        <a href="#footer-social" onClick={(e) => { e.preventDefault(); document.getElementById('footer-social')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-white transition-colors flex items-center gap-2">
          <Instagram size={12} className="md:hidden" />
          <span className="hidden md:block">Social</span>
        </a>
        
        <Link to="/login" className="flex items-center gap-2 text-[#00bffa] hover:text-white transition-all group px-3 py-1.5 rounded-lg bg-white/5 border border-white/5">
          <User size={14} className="group-hover:scale-110 transition-transform" />
          <span className="text-[9px] tracking-widest font-medium">ASSINANTES</span>
        </Link>
      </div>

      <button onClick={(e) => { e.preventDefault(); document.getElementById('precos')?.scrollIntoView({ behavior: 'smooth' }); }} className="btn-elite-primary !py-2 !px-6 !text-[9px] !rounded-full whitespace-nowrap">
        AGENDAR
      </button>

      {/* Drag Indicator (Mobile Only) */}
      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 md:hidden">
        <div className="w-8 h-1 bg-white/20 rounded-full"></div>
      </div>
    </motion.nav>
  );
};
