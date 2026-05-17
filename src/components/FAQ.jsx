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
        { q: "O que exatamente é o Tweak?", a: "O Tweak é uma calibração profunda no seu Windows e nas configurações físicas do seu computador. Eu desativo programas desnecessários que rodam escondidos em segundo plano e faço o seu processador, placa de vídeo e memórias trabalharem em perfeita harmonia. O resultado é o máximo de FPS possível, fim absoluto das travadas no meio do jogo (stuttering) e respostas instantâneas ao clicar ou mover o mouse (sem atrasos)." },
        { q: "Fazer Tweak dá ban nos jogos?", a: "Não. Meu serviço é 100% seguro e permitido pelas desenvolvedoras de jogos (método limpo). Eu não utilizo nenhum tipo de trapaça, hack ou programa proibido que altere os arquivos dos seus jogos. Trabalho apenas otimizando o seu Windows e ajustando o desempenho real das suas peças." },
        { q: "Jogo GTA RP e meu FPS cai muito. O Tweak resolve?", a: "Com certeza. O FiveM (GTA RP) exige demais do computador e da memória RAM. O Tweak foca em estabilizar o uso da memória e fazer o jogo carregar mais rápido, evitando aquelas congeladas irritantes." },
        { q: "Como o serviço é realizado?", a: "O serviço é 100% remoto através de programas de acesso seguro (como AnyDesk). Você acompanha tudo o que estou fazendo na sua tela, no conforto da sua casa." },
        { q: "Quanto tempo demora o processo?", a: "Em média, entre 1 a 2 horas, dependendo do estado atual do seu computador." }
      ]
    },
    en: {
      tag: 'FAQ',
      title: 'COMMON',
      title_italic: 'QUESTIONS.',
      faqs: [
        { q: "What exactly is Tweak?", a: "Tweak is a deep calibration of your Windows and your computer's physical hardware settings. I disable useless background programs and make your CPU, GPU, and RAM work in perfect harmony. The result is maximum FPS, an absolute end to mid-game stuttering, and instant mouse and click responses (zero delay)." },
        { q: "Can Tweaking get me banned?", a: "No. My service is 100% safe and fully allowed by game developers (clean method). I do not use any cheats, hacks, or prohibited programs that alter your game files. I only optimize your Windows and fine-tune your hardware's actual performance." },
        { q: "I play GTA RP and my FPS drops. Does it fix it?", a: "Absolutely. FiveM (GTA RP) is highly demanding on CPU and RAM. The Tweak focuses on stabilizing memory usage and making the game load faster, avoiding those annoying freezes." },
        { q: "How is the service performed?", a: "The service is 100% remote using secure screen-share programs (like AnyDesk). You can watch everything I do on your screen from the comfort of your home." },
        { q: "How long does it take?", a: "On average, between 1 to 2 hours, depending on your computer's current state." }
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
