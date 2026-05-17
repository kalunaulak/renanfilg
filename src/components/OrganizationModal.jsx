import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Building, Mail, FileText, Monitor, Gamepad2 } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export const OrganizationModal = ({ isOpen, onClose }) => {
  const { language } = useLanguage();
  const [status, setStatus] = useState('idle'); // idle, loading, success

  const t = {
    pt: {
      title: 'CONSULTORIA ENTERPRISE',
      subtitle: 'Estruturação VIP para Organizações e Lines Profissionais.',
      orgName: 'Nome da Organização',
      email: 'E-mail Corporativo do Manager',
      pcCount: 'Quantidade de PCs',
      games: 'Modalidades (Ex: CS2, LoL)',
      needs: 'Descreva as necessidades da Line',
      btnSubmit: 'SOLICITAR ORÇAMENTO',
      btnLoading: 'ENVIANDO...',
      success: 'Solicitação recebida com sucesso! Nossa equipe entrará em contato.'
    },
    en: {
      title: 'ENTERPRISE CONSULTING',
      subtitle: 'VIP Setup for Organizations and Professional Rosters.',
      orgName: 'Organization Name',
      email: 'Manager Corporate E-mail',
      pcCount: 'Number of PCs',
      games: 'Games (e.g. CS2, LoL)',
      needs: 'Describe your Roster needs',
      btnSubmit: 'REQUEST QUOTE',
      btnLoading: 'SENDING...',
      success: 'Request received successfully! Our team will contact you.'
    }
  }[language || 'pt'];

  const [formData, setFormData] = useState({ orgName: '', email: '', pcCount: '', games: '', needs: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('loading');
    
    setTimeout(() => {
      setStatus('success');
      
      // Número do Renan (Sincronizado com o formulário principal)
      const phone = "5547991914050";
      
      // Formatação da mensagem para o WhatsApp
      const message = `*Nova Proposta de Consultoria Enterprise*%0A%0A*Organização:* ${formData.orgName}%0A*E-mail do Manager:* ${formData.email}%0A*Quantidade de PCs:* ${formData.pcCount}%0A*Modalidades/Jogos:* ${formData.games}%0A*Necessidades:* ${formData.needs}`;
      const whatsappUrl = `https://wa.me/${phone}?text=${message}`;
      
      // Abre o WhatsApp numa nova aba
      window.open(whatsappUrl, '_blank');
      
      // Fecha o modal e reseta o form
      setTimeout(() => {
        setStatus('idle');
        setFormData({ orgName: '', email: '', pcCount: '', games: '', needs: '' });
        onClose();
      }, 2000);
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center px-4">
          {/* Fundo Escurecido com Blur */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Cartão Modal Glassmorphism */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg glass-card p-8 md:p-10 border border-white/10 shadow-[0_0_50px_rgba(0,191,250,0.1)]"
          >
            {/* Botão Fechar */}
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            <div className="mb-8 text-center md:text-left mt-2">
              <h3 className="text-2xl font-light text-white tracking-widest mb-2 italic">
                {t.title}
              </h3>
              <p className="text-zinc-500 font-light text-sm italic">
                {t.subtitle}
              </p>
            </div>

            {status === 'success' ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-12 text-center text-[#00bffa] font-light flex flex-col items-center gap-4"
              >
                <div className="w-16 h-16 rounded-full border border-[#00bffa]/30 flex items-center justify-center bg-[#00bffa]/10">
                  <Send size={24} className="ml-1" />
                </div>
                <p className="tracking-wide italic">{t.success}</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <div className="relative">
                    <Building size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                    <input 
                      required
                      type="text" 
                      value={formData.orgName}
                      onChange={(e) => setFormData({...formData, orgName: e.target.value})}
                      placeholder={t.orgName}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-12 py-4 text-sm font-light text-white placeholder-zinc-600 focus:outline-none focus:border-[#00bffa]/50 focus:bg-white/[0.05] transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="relative">
                    <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                    <input 
                      required
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder={t.email}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-12 py-4 text-sm font-light text-white placeholder-zinc-600 focus:outline-none focus:border-[#00bffa]/50 focus:bg-white/[0.05] transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="relative">
                    <Monitor size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                    <input 
                      required
                      type="number"
                      min="1" 
                      value={formData.pcCount}
                      onChange={(e) => setFormData({...formData, pcCount: e.target.value})}
                      placeholder={t.pcCount}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-12 py-4 text-sm font-light text-white placeholder-zinc-600 focus:outline-none focus:border-[#00bffa]/50 focus:bg-white/[0.05] transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="relative">
                    <Gamepad2 size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                    <input 
                      required
                      type="text" 
                      value={formData.games}
                      onChange={(e) => setFormData({...formData, games: e.target.value})}
                      placeholder={t.games}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-12 py-4 text-sm font-light text-white placeholder-zinc-600 focus:outline-none focus:border-[#00bffa]/50 focus:bg-white/[0.05] transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="relative">
                    <FileText size={18} className="absolute left-4 top-6 -translate-y-1/2 text-zinc-500" />
                    <textarea 
                      required
                      rows={4}
                      value={formData.needs}
                      onChange={(e) => setFormData({...formData, needs: e.target.value})}
                      placeholder={t.needs}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-12 pr-4 py-4 text-sm font-light text-white placeholder-zinc-600 focus:outline-none focus:border-[#00bffa]/50 focus:bg-white/[0.05] transition-all resize-none"
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={status === 'loading'}
                  className="btn-elite-primary w-full mt-4 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-wait"
                >
                  {status === 'loading' ? (
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Send size={18} />
                  )}
                  {status === 'loading' ? t.btnLoading : t.btnSubmit}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
