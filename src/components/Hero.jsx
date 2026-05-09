
import { motion } from 'framer-motion';
import { GradientBars } from './GradientBars';
import { ArrowRight } from 'lucide-react';
import { MatrixHeroBackground } from './MatrixLoader';

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
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 overflow-hidden bg-black">
      <MatrixHeroBackground />
      <Particles />
      
      {/* The Gradient Bars (Exact replica of the reference) - High Priority Z-Index */}
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
          <span className="text-[10px] font-light text-zinc-400 uppercase tracking-[0.6em]">Expert Performance Engineering</span>
        </div>
        
        <h1 className="text-6xl md:text-[8rem] font-light tracking-tighter leading-[0.9] mb-12 text-white text-balance">
          FPS <span className="italic">BOOST</span> <br />
          <span className="bg-gradient-to-b from-[#00bffa] to-[#005eea] bg-clip-text text-transparent">DEFINITIVO</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-zinc-500 max-w-2xl mx-auto mb-20 font-light leading-relaxed tracking-tight">
          Sua máquina em sua <span className="text-white">melhor forma.</span> Otimização de BIOS e kernel para pro-players que exigem o absoluto.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <a href="#agendar" className="btn-elite-primary group">
            Agendar Otimização 
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <button className="btn-elite-glass">
            Saiba mais
          </button>
        </div>
      </motion.div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-20 flex flex-col items-center gap-3">
        <div className="w-[1px] h-20 bg-gradient-to-b from-white to-transparent"></div>
      </div>
    </section>
  );
};
