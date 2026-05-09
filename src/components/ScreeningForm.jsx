
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Calendar, ArrowRight } from 'lucide-react';

export const ScreeningForm = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section id="agendar" className="py-32 px-6 bg-black flex flex-col items-center justify-center text-center min-h-[600px] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00bffa]/5 to-[#005eea]/5 pointer-events-none"></div>
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative z-10">
          <div className="w-24 h-24 glass-card rounded-full flex items-center justify-center mx-auto mb-10 border border-white/10 text-performance shadow-[0_0_50px_rgba(0,191,250,0.1)]">
            <Calendar size={40} />
          </div>
          <h2 className="text-4xl md:text-6xl font-light mb-6 uppercase text-white tracking-tighter">TRIAGEM CONCLUÍDA.</h2>
          <p className="text-zinc-400 mb-12 max-w-md mx-auto italic text-lg leading-tight font-light">Seu perfil técnico foi pré-aprovado. Agora, escolha o melhor horário para sua otimização.</p>
          <a 
            href="https://calendly.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-elite-primary inline-flex"
          >
            ABRIR AGENDA VIP
          </a>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="agendar" className="py-32 px-6 bg-black relative border-t border-white/[0.03]">
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-light tracking-tighter mb-6 uppercase text-white">
            PRÉ-TRIAGEM <span className="bg-gradient-to-b from-[#00bffa] to-[#005eea] bg-clip-text text-transparent underline decoration-white/10 underline-offset-8">TÉCNICA</span>
          </h2>
          <p className="text-zinc-500 max-w-xl mx-auto font-light text-lg italic">
            Analisamos seu hardware para garantir que você atinja o potencial máximo. Vagas limitadas por semana.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 glass-card p-10 md:p-16 relative">
          <div className="absolute top-0 right-0 p-8 text-white/5 font-thin text-6xl italic pointer-events-none tracking-tighter">RF.01</div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-3">
              <label className="text-[10px] font-light text-zinc-500 uppercase tracking-[0.3em] px-1 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-gradient-to-br from-[#00bffa] to-[#005eea] rounded-full animate-pulse"></div>
                Processador (CPU)
              </label>
              <input required type="text" placeholder="Ex: i9-14900K" className="w-full bg-white/2 border border-white/10 rounded-xl p-5 text-white focus:outline-none focus:border-[#00bffa]/30 focus:bg-white/5 transition-all font-light placeholder:text-zinc-700 shadow-inner" />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-light text-zinc-500 uppercase tracking-[0.3em] px-1 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-gradient-to-br from-[#00bffa] to-[#005eea] rounded-full animate-pulse"></div>
                Placa de Vídeo (GPU)
              </label>
              <input required type="text" placeholder="Ex: RTX 4090" className="w-full bg-white/2 border border-white/10 rounded-xl p-5 text-white focus:outline-none focus:border-[#00bffa]/30 focus:bg-white/5 transition-all font-light placeholder:text-zinc-700 shadow-inner" />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-light text-zinc-500 uppercase tracking-[0.3em] px-1 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-gradient-to-br from-[#00bffa] to-[#005eea] rounded-full animate-pulse"></div>
                Placa-mãe
              </label>
              <input required type="text" placeholder="Ex: ASUS ROG Maximus" className="w-full bg-white/2 border border-white/10 rounded-xl p-5 text-white focus:outline-none focus:border-[#00bffa]/30 focus:bg-white/5 transition-all font-light placeholder:text-zinc-700 shadow-inner" />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-light text-zinc-500 uppercase tracking-[0.3em] px-1 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-gradient-to-br from-[#00bffa] to-[#005eea] rounded-full animate-pulse"></div>
                Objetivo Principal
              </label>
              <input required type="text" placeholder="Ex: Warzone / Reduzir Input Lag" className="w-full bg-white/2 border border-white/10 rounded-xl p-5 text-white focus:outline-none focus:border-[#00bffa]/30 focus:bg-white/5 transition-all font-light placeholder:text-zinc-700 shadow-inner" />
            </div>
          </div>
          
          <button type="submit" className="btn-elite-primary w-full !py-8 group">
            SOLICITAR ACESSO À AGENDA <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </form>
      </div>
    </section>
  );
};
