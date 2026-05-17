import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const FAQItem = ({ q, a }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`mb-4 transition-all duration-500 ${isOpen ? 'bg-white/[0.03]' : 'bg-transparent'} rounded-2xl border border-white/[0.05] overflow-hidden`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-8 flex items-center justify-between text-left group"
      >
        <span className={`text-lg md:text-xl font-light tracking-tight transition-colors ${isOpen ? 'text-white' : 'text-zinc-400 group-hover:text-white'}`}>
          {q}
        </span>
        <div className={`transition-transform duration-500 ${isOpen ? 'rotate-180 text-[#00bffa]' : 'text-zinc-600'}`}>
          <ChevronDown size={20} />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="px-8 pb-8">
              <p className="text-zinc-500 text-lg font-light leading-relaxed">
                {a}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const FAQ = () => {
  const { language } = useLanguage();

  const t = {
    pt: {
      tag: 'FAQ',
      title: 'DÚVIDAS',
      title_italic: 'FREQUENTES.',
      faqs: [
        { q: "O que exatamente é o Tweak?", a: "O Tweak é uma configuração profunda no sistema operacional (Windows), na BIOS da sua placa-mãe e nos registros do sistema. Nós desativamos processos inúteis que rodam em segundo plano e otimizamos o uso do seu processador, placa de vídeo e memória RAM. O resultado é o máximo de FPS possível, fim das quedas de frame (stuttering) e quase zero input lag." },
        { q: "Fazer Tweak dá ban nos jogos?", a: "Não. Nosso serviço é 100% seguro (White Hat). Nós não usamos programas de terceiros, hacks ou arquivos que alteram os diretórios dos jogos. Trabalhamos apenas otimizando o seu Windows e o seu hardware." },
        { q: "Jogo GTA RP e meu FPS cai muito. O Tweak resolve?", a: "Com certeza. O FiveM (GTA RP) exige demais do processador e da RAM. O Tweak foca em estabilizar o uso da memória e otimizar a leitura do jogo, evitando aquelas congeladas." },
        { q: "Como o serviço é realizado?", a: "O serviço é 100% remoto via AnyDesk ou TeamViewer. Você acompanha todo o processo acontecendo na sua tela, no conforto da sua casa." },
        { q: "Quanto tempo demora o processo?", a: "Em média, entre 1 a 2 horas, dependendo do estado atual do seu computador e do pacote escolhido." }
      ]
    },
    en: {
      tag: 'FAQ',
      title: 'COMMON',
      title_italic: 'QUESTIONS.',
      faqs: [
        { q: "What exactly is Tweak?", a: "Tweak is a deep configuration of the OS (Windows), motherboard BIOS, and system registries. We disable useless background processes and optimize CPU, GPU, and RAM usage. The result is maximum FPS, no more stuttering, and near-zero input lag." },
        { q: "Can Tweaking get me banned?", a: "No. Our service is 100% safe (White Hat). We do not use third-party programs, hacks, or files that alter game directories. We only optimize your Windows and hardware." },
        { q: "I play GTA RP and my FPS drops. Does it fix it?", a: "Absolutely. FiveM (GTA RP) is very demanding on CPU and RAM. Tweaking focuses on stabilizing memory usage and optimizing game reading, avoiding those freezes." },
        { q: "How is the service performed?", a: "The service is 100% remote via AnyDesk or TeamViewer. You watch the entire process happening on your screen from the comfort of your home." },
        { q: "How long does it take?", a: "On average, between 1 to 2 hours, depending on your computer's current state and the chosen package." }
      ]
    }
  }[language || 'pt'];

  return (
    <section className="py-16 md:py-40 px-6 bg-[#020202] relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="mb-24">
          <div className="text-[#00bffa] font-light text-[10px] uppercase tracking-[0.4em] mb-4">{t.tag}</div>
          <h2 className="text-5xl md:text-7xl font-light tracking-tighter text-white uppercase leading-none">
            {t.title} <br />
            <span className="bg-gradient-to-b from-[#00bffa] to-[#005eea] bg-clip-text text-transparent italic">{t.title_italic}</span>
          </h2>
        </div>

        <div className="space-y-4">
          {t.faqs.map((faq, idx) => (
            <FAQItem key={idx} {...faq} />
          ))}
        </div>
      </div>
    </section>
  );
};
