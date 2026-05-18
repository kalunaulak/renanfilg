import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, ArrowRight, MessageSquare } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const ScreeningForm = ({ isOpen, onClose }) => {
  const { language } = useLanguage();
  const isEn = language?.startsWith('en');
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    cpu: '',
    gpu: '',
    motherboard: '',
    objective: ''
  });

  const t = {
    pt: {
      success_title: "DIAGNÓSTICO CONCLUÍDO.",
      success_desc: "Seu perfil técnico foi pré-aprovado. Agora, chame o Renan no WhatsApp para confirmar seu horário.",
      success_cta: "AGENDAR VIA WHATSAPP",
      title: "DIAGNÓSTICO DO",
      title_bold: "SETUP",
      subtitle: "Analiso seu hardware para garantir que você atinja o potencial máximo. Vagas limitadas por semana.",
      cpu_label: "Processador (CPU)",
      gpu_label: "Placa de Vídeo (GPU)",
      motherboard_label: "Placa-mãe",
      objective_label: "Objetivo Principal",
      cpu_placeholder: "Ex: i9-14900K",
      gpu_placeholder: "Ex: RTX 4090",
      motherboard_placeholder: "Ex: ASUS ROG Maximus",
      objective_placeholder: "Ex: Warzone / Reduzir Input Lag",
      cta: "SOLICITAR ACESSO À AGENDA",
      wa_message: (cpu, gpu, mobo, obj) => `Olá Renan! Gostaria de agendar meu Protocolo de Performance.%0A%0A*Dados Técnicos:*%0A- CPU: ${cpu}%0A- GPU: ${gpu}%0A- Placa-mãe: ${mobo}%0A- Objetivo: ${obj}%0A%0AEstou pré-aprovado pelo site e pronto para começar.`
    },
    en: {
      success_title: "DIAGNOSTIC COMPLETED.",
      success_desc: "Your technical profile has been pre-approved. Now, message Renan on WhatsApp to confirm your schedule.",
      success_cta: "SCHEDULE VIA WHATSAPP",
      title: "SETUP",
      title_bold: "DIAGNOSTIC",
      subtitle: "I analyze your hardware to guarantee you hit maximum potential. Limited slots per week.",
      cpu_label: "Processor (CPU)",
      gpu_label: "Graphics Card (GPU)",
      motherboard_label: "Motherboard",
      objective_label: "Main Objective",
      cpu_placeholder: "e.g., i9-14900K",
      gpu_placeholder: "e.g., RTX 4090",
      motherboard_placeholder: "e.g., ASUS ROG Maximus",
      objective_placeholder: "e.g., Warzone / Reduce Input Lag",
      cta: "REQUEST ACCESS TO SCHEDULE",
      wa_message: (cpu, gpu, mobo, obj) => `Hello Renan! I would like to schedule my Performance Protocol.%0A%0A*Technical Data:*%0A- CPU: ${cpu}%0A- GPU: ${gpu}%0A- Motherboard: ${mobo}%0A- Objective: ${obj}%0A%0AI am pre-approved by the website and ready to start.`
    }
  }[isEn ? 'en' : 'pt'];

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
    const phoneNumber = "5547991914050";
    const message = t.wa_message(formData.cpu, formData.gpu, formData.motherboard, formData.objective);
    
    return `https://wa.me/${phoneNumber}?text=${message}`;
  };

  const handleClose = () => {
    setSubmitted(false);
    setFormData({ cpu: '', gpu: '', motherboard: '', objective: '' });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center px-4 overflow-y-auto">
          {/* Fundo Escurecido com Blur */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-sm z-[99998]"
          />

          {/* Cartão Modal Glassmorphism */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-4xl glass-card p-6 md:p-16 border border-white/10 shadow-[0_0_50px_rgba(0,191,250,0.1)] z-[99999] my-8"
          >
            {/* Botão Fechar */}
            <button 
              onClick={handleClose}
              className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors cursor-pointer"
            >
              <X size={24} />
            </button>

            {submitted ? (
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-10">
                <div className="w-20 h-20 glass-card rounded-full flex items-center justify-center mx-auto mb-8 border border-white/10 text-performance shadow-[0_0_50px_rgba(0,191,250,0.1)]">
                  <MessageSquare size={36} />
                </div>
                <h2 className="text-3xl md:text-5xl font-clash font-medium mb-6 uppercase text-white tracking-tighter">
                  {t.success_title}
                </h2>
                <p className="text-zinc-400 mb-10 max-w-md mx-auto italic text-base leading-tight font-light">
                  {t.success_desc}
                </p>
                <a 
                  href={generateWhatsAppLink()} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-elite-primary inline-flex gap-3 px-8 py-4"
                >
                  {t.success_cta} <Send size={18} />
                </a>
              </motion.div>
            ) : (
              <div>
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-5xl font-light tracking-tighter mb-4 uppercase text-white">
                    {t.title} <span className="bg-gradient-to-b from-[#00bffa] to-[#005eea] bg-clip-text text-transparent underline decoration-white/10 underline-offset-8 font-bold">{t.title_bold}</span>
                  </h2>
                  <p className="text-zinc-500 max-w-xl mx-auto font-light text-base italic">
                    {t.subtitle}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8 relative">
                  <div className="hidden md:block absolute top-0 right-0 text-white/5 font-thin text-6xl italic pointer-events-none tracking-tighter -mt-10">RF.01</div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-normal font-[Helvetica,Arial,sans-serif] text-zinc-500 uppercase tracking-[0.3em] px-1 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-gradient-to-br from-[#00bffa] to-[#005eea] rounded-full animate-pulse"></div>
                        {t.cpu_label}
                      </label>
                      <input name="cpu" value={formData.cpu} onChange={handleChange} required type="text" placeholder={t.cpu_placeholder} className="w-full bg-white/2 border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-[#00bffa]/30 focus:bg-white/5 transition-all font-normal font-[Helvetica,Arial,sans-serif] placeholder:text-zinc-700 shadow-inner" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-normal font-[Helvetica,Arial,sans-serif] text-zinc-500 uppercase tracking-[0.3em] px-1 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-gradient-to-br from-[#00bffa] to-[#005eea] rounded-full animate-pulse"></div>
                        {t.gpu_label}
                      </label>
                      <input name="gpu" value={formData.gpu} onChange={handleChange} required type="text" placeholder={t.gpu_placeholder} className="w-full bg-white/2 border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-[#00bffa]/30 focus:bg-white/5 transition-all font-normal font-[Helvetica,Arial,sans-serif] placeholder:text-zinc-700 shadow-inner" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-normal font-[Helvetica,Arial,sans-serif] text-zinc-500 uppercase tracking-[0.3em] px-1 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-gradient-to-br from-[#00bffa] to-[#005eea] rounded-full animate-pulse"></div>
                        {t.motherboard_label}
                      </label>
                      <input name="motherboard" value={formData.motherboard} onChange={handleChange} required type="text" placeholder={t.motherboard_placeholder} className="w-full bg-white/2 border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-[#00bffa]/30 focus:bg-white/5 transition-all font-normal font-[Helvetica,Arial,sans-serif] placeholder:text-zinc-700 shadow-inner" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-normal font-[Helvetica,Arial,sans-serif] text-zinc-500 uppercase tracking-[0.3em] px-1 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-gradient-to-br from-[#00bffa] to-[#005eea] rounded-full animate-pulse"></div>
                        {t.objective_label}
                      </label>
                      <input name="objective" value={formData.objective} onChange={handleChange} required type="text" placeholder={t.objective_placeholder} className="w-full bg-white/2 border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-[#00bffa]/30 focus:bg-white/5 transition-all font-normal font-[Helvetica,Arial,sans-serif] placeholder:text-zinc-700 shadow-inner" />
                    </div>
                  </div>
                  
                  <button type="submit" className="btn-elite-primary w-full !py-6 group text-sm tracking-[0.2em] mt-4">
                    {t.cta} <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
