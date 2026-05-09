import { motion } from 'framer-motion';
import { GradientBars } from './GradientBars';
import { ArrowRight } from 'lucide-react';
import { MatrixHeroBackground } from './MatrixLoader';
import { useLanguage } from '../context/LanguageContext';

const Particles = () => (
  <div className="absolute inset-0 pointer-events-none">
    {[...Array(30)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-px h-px bg-white rounded-full"
        initial={{ 
          x: Math.random() * 100 + "%", 
          y: Math.random() * 100 + "%",
          opacity: Math.random() * 0.5 
        }}
        animate={{ 
          opacity: [0.1, 0.5, 0.1],
          scale: [1, 1.5, 1]
        }}
        transition={{ 
          duration: 3 + Math.random() * 4, 
          repeat: Infinity, 
          delay: Math.random() * 5
        }}
      />
    ))}
  </div>
);

export const Hero = () => {
  const { language } = useLanguage();
  
  const t = {
    pt: {
      tag: 'Expert Performance Engineering',
      title1: 'FPS BOOST',
      title2: 'DEFINITIVO',
      subtitle: 'Sua máquina em sua melhor forma. Otimização de BIOS e kernel para pro-players que exigem o absoluto.',
      cta: 'Agendar Otimização',
      more: 'Saiba mais'
    },
    en: {
      tag: 'Expert Performance Engineering',
      title1: 'ULTIMATE',
      title2: 'FPS BOOST',
      subtitle: 'Your machine at its peak. BIOS and kernel optimization for pro-players who demand the absolute best.',
      cta: 'Book Optimization',
      more: 'Learn more'
    }
  }[language || 'pt'];

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 overflow-hidden bg-black">
      <MatrixHeroBackground />
      <Particles />
      
      <div className="absolute bottom-0 left-0 w-full h-[60vh] z-0 pointer-events-none">
        <GradientBars />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 text-center max-w-5xl"
      >
        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-white/[0.05] bg-white/[0.02] mb-12">
          <div className="w-1.5 h-1.5 rounded-full bg-[#00bffa] animate-pulse shadow-[0_0_10px_#00bffa]"></div>
          <span className="text-[10px] font-light text-zinc-400 uppercase tracking-[0.6em]">{t.tag}</span>
        </div>
        
        <h1 className="text-6xl md:text-[8rem] font-light tracking-tighter leading-[0.9] mb-12 text-white text-balance">
          {t.title1} <br />
          <span className="bg-gradient-to-b from-[#00bffa] to-[#005eea] bg-clip-text text-transparent">
            {t.title2}
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-zinc-500 max-w-2xl mx-auto mb-20 font-light leading-relaxed tracking-tight">
          {t.subtitle}
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <a href="#agendar" className="btn-elite-primary group">
            {t.cta} 
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <button className="btn-elite-glass">
            {t.more}
          </button>
        </div>
      </motion.div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-20 flex flex-col items-center gap-3">
        <div className="w-[1px] h-20 bg-gradient-to-b from-white to-transparent"></div>
      </div>
    </section>
  );
};
