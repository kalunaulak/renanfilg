import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Calendar, ArrowRight, MessageSquare } from 'lucide-react';

export const ScreeningForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    cpu: '',
    gpu: '',
    motherboard: '',
    objective: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const generateWhatsAppLink = () => {
    const phoneNumber = "5547991914050"; // NÚMERO DO RENAN ATUALIZADO
    const message = `Olá Renan! Gostaria de agendar meu Protocolo de Performance.%0A%0A*Dados Técnicos:*%0A- CPU: ${formData.cpu}%0A- GPU: ${formData.gpu}%0A- Placa-mãe: ${formData.motherboard}%0A- Objetivo: ${formData.objective}%0A%0AEstou pré-aprovado pelo site e pronto para começar.`;
    
    return `https://wa.me/${phoneNumber}?text=${message}`;
  };

  if (submitted) {
    return (
      <section id="agendar" className="py-16 md:py-32 px-6 md:px-6 bg-black flex flex-col items-center justify-center text-center min-h-[600px] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00bffa]/5 to-[#005eea]/5 pointer-events-none"></div>
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative z-10">
          <div className="w-24 h-24 glass-card rounded-full flex items-center justify-center mx-auto mb-10 border border-white/10 text-performance shadow-[0_0_50px_rgba(0,191,250,0.1)]">
            <MessageSquare size={40} />
          </div>
          <h2 className="text-4xl md:text-6xl font-clash font-medium mb-6 uppercase text-white tracking-tighter">TRIAGEM CONCLUÍDA.</h2>
          <p className="text-zinc-400 mb-12 max-w-md mx-auto italic text-lg leading-tight font-light">Seu perfil técnico foi pré-aprovado. Agora, chame o Renan no WhatsApp para confirmar seu horário.</p>
          <a 
            href={generateWhatsAppLink()} 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-elite-primary inline-flex gap-3"
          >
            AGENDAR VIA WHATSAPP <Send size={20} />
          </a>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="agendar" className="py-16 md:py-32 px-6 md:px-6 bg-black relative border-t border-white/[0.03]">
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-light tracking-tighter mb-6 uppercase text-white">
            PRÉ-TRIAGEM <span className="bg-gradient-to-b from-[#00bffa] to-[#005eea] bg-clip-text text-transparent underline decoration-white/10 underline-offset-8">TÉCNICA</span>
          </h2>
          <p className="text-zinc-500 max-w-xl mx-auto font-light text-lg italic">
            Analisamos seu hardware para garantir que você atinja o potencial máximo. Vagas limitadas por semana.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 glass-card p-6 md:p-16 relative">
          <div className="absolute top-0 right-0 p-8 text-white/5 font-thin text-6xl italic pointer-events-none tracking-tighter">RF.01</div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-3">
              <label className="text-[10px] font-normal font-[Helvetica,Arial,sans-serif] text-zinc-500 uppercase tracking-[0.3em] px-1 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-gradient-to-br from-[#00bffa] to-[#005eea] rounded-full animate-pulse"></div>
                Processador (CPU)
              </label>
              <input name="cpu" value={formData.cpu} onChange={handleChange} required type="text" placeholder="Ex: i9-14900K" className="w-full bg-white/2 border border-white/10 rounded-xl p-5 text-white focus:outline-none focus:border-[#00bffa]/30 focus:bg-white/5 transition-all font-normal font-[Helvetica,Arial,sans-serif] placeholder:text-zinc-700 shadow-inner" />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-normal font-[Helvetica,Arial,sans-serif] text-zinc-500 uppercase tracking-[0.3em] px-1 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-gradient-to-br from-[#00bffa] to-[#005eea] rounded-full animate-pulse"></div>
                Placa de Vídeo (GPU)
              </label>
              <input name="gpu" value={formData.gpu} onChange={handleChange} required type="text" placeholder="Ex: RTX 4090" className="w-full bg-white/2 border border-white/10 rounded-xl p-5 text-white focus:outline-none focus:border-[#00bffa]/30 focus:bg-white/5 transition-all font-normal font-[Helvetica,Arial,sans-serif] placeholder:text-zinc-700 shadow-inner" />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-normal font-[Helvetica,Arial,sans-serif] text-zinc-500 uppercase tracking-[0.3em] px-1 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-gradient-to-br from-[#00bffa] to-[#005eea] rounded-full animate-pulse"></div>
                Placa-mãe
              </label>
              <input name="motherboard" value={formData.motherboard} onChange={handleChange} required type="text" placeholder="Ex: ASUS ROG Maximus" className="w-full bg-white/2 border border-white/10 rounded-xl p-5 text-white focus:outline-none focus:border-[#00bffa]/30 focus:bg-white/5 transition-all font-normal font-[Helvetica,Arial,sans-serif] placeholder:text-zinc-700 shadow-inner" />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-normal font-[Helvetica,Arial,sans-serif] text-zinc-500 uppercase tracking-[0.3em] px-1 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-gradient-to-br from-[#00bffa] to-[#005eea] rounded-full animate-pulse"></div>
                Objetivo Principal
              </label>
              <input name="objective" value={formData.objective} onChange={handleChange} required type="text" placeholder="Ex: Warzone / Reduzir Input Lag" className="w-full bg-white/2 border border-white/10 rounded-xl p-5 text-white focus:outline-none focus:border-[#00bffa]/30 focus:bg-white/5 transition-all font-normal font-[Helvetica,Arial,sans-serif] placeholder:text-zinc-700 shadow-inner" />
            </div>
          </div>
          
          <button type="submit" className="btn-elite-primary w-full !py-8 group text-base tracking-[0.2em]">
            SOLICITAR ACESSO À AGENDA <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </form>
      </div>
    </section>
  );
};
