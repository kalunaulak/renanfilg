import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ArrowRight } from 'lucide-react';
import logo from '../assets/logo.webp';

export const LanguageSelector = ({ onSelect }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-[#020202] flex flex-col items-center justify-center px-6 overflow-hidden"
    >
      {/* Background Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#00bffa0a_0%,transparent_50%)]"></div>
      
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="relative z-10 text-center"
      >
        <img src={logo} alt="RF" className="h-12 mx-auto mb-12 opacity-80" />
        
        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/5 bg-white/[0.02] mb-8">
          <Globe size={14} className="text-[#00bffa]" />
          <span className="text-[10px] font-light text-zinc-500 uppercase tracking-[0.4em]">Select Language / Selecione o Idioma</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-xl mx-auto">
          {/* Portuguese */}
          <button 
            onClick={() => onSelect('pt')}
            className="group relative p-8 glass-card border border-white/5 hover:border-[#00bffa]/30 transition-all text-left overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
              <span className="text-6xl font-bold">PT</span>
            </div>
            <h3 className="text-2xl font-light text-white tracking-tighter uppercase mb-2">Português</h3>
            <p className="text-zinc-500 text-xs font-light mb-6">Acesse a experiência completa em português brasileiro.</p>
            <div className="flex items-center gap-2 text-[#00bffa] text-[10px] font-bold uppercase tracking-widest">
              Entrar <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* English */}
          <button 
            onClick={() => onSelect('en')}
            className="group relative p-8 glass-card border border-white/5 hover:border-[#00bffa]/30 transition-all text-left overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
              <span className="text-6xl font-bold">EN</span>
            </div>
            <h3 className="text-2xl font-light text-white tracking-tighter uppercase mb-2">English</h3>
            <p className="text-zinc-500 text-xs font-light mb-6">Access the full experience in English.</p>
            <div className="flex items-center gap-2 text-[#00bffa] text-[10px] font-bold uppercase tracking-widest">
              Enter <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>

        <div className="mt-20">
          <div className="w-[1px] h-20 bg-gradient-to-b from-white/20 to-transparent mx-auto"></div>
          <p className="text-[9px] text-zinc-600 uppercase tracking-[0.5em] mt-6">Protocolo de Performance Elite</p>
        </div>
      </motion.div>
    </motion.div>
  );
};
