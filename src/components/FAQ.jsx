
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: "O que exatamente é o Tweak?",
    a: "O Tweak é uma configuração profunda no sistema operacional (Windows), na BIOS da sua placa-mãe e nos registros do sistema. Nós desativamos processos inúteis que rodam em segundo plano e otimizamos o uso do seu processador, placa de vídeo e memória RAM. O resultado é o máximo de FPS possível, fim das quedas de frame (stuttering) e quase zero input lag (atraso entre o clique e a ação na tela)."
  },
  {
    q: "Fazer Tweak dá ban nos jogos (Valorant, Fortnite, etc.)?",
    a: "Não. Nosso serviço é 100% seguro (White Hat). Nós não usamos programas de terceiros, hacks, macros ou arquivos que alteram os diretórios dos jogos. Trabalhamos apenas otimizando o seu Windows e o seu hardware. Os anti-cheats (como o Vanguard, Easy Anti-Cheat e BattlEye) não detectam nenhuma irregularidade, pois não há nenhuma violação das regras."
  },
  {
    q: "Jogo GTA RP e meu FPS cai muito quando a cidade está lotada. O Tweak resolve?",
    a: "Com certeza. O FiveM (GTA RP) é um jogo que exige demais do processador e da memória RAM por conta dos scripts e da quantidade de jogadores renderizando ao mesmo tempo. Seja em uma trocação ou administrando empresas e farmando na cidade, o Tweak foca em estabilizar o uso da memória e otimizar a leitura do jogo, evitando aquelas \"congeladas\" quando você está dirigindo rápido ou em áreas muito pesadas do mapa."
  },
  {
    q: "Como o serviço é realizado? Preciso levar o PC até você?",
    a: "Não, o serviço é 100% remoto. Após a confirmação, agendamos um horário. Nós acessamos o seu computador através de programas seguros de acesso remoto (como AnyDesk ou TeamViewer) e você acompanha todo o processo acontecendo na sua tela, no conforto da sua casa."
  },
  {
    q: "Quanto tempo demora todo o processo?",
    a: "Em média, a otimização completa leva entre 1 a 2 horas, dependendo do estado atual do seu computador e do pacote escolhido. É um processo artesanal e detalhista para garantir que a sua máquina extraia 100% do potencial."
  }
];

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
  return (
    <section className="py-40 px-6 bg-[#020202] relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="mb-24">
          <div className="text-[#00bffa] font-light text-[10px] uppercase tracking-[0.4em] mb-4">FAQ</div>
          <h2 className="text-5xl md:text-7xl font-light tracking-tighter text-white uppercase leading-none">
            DÚVIDAS <br />
            <span className="bg-gradient-to-b from-[#00bffa] to-[#005eea] bg-clip-text text-transparent italic">FREQUENTES.</span>
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <FAQItem key={idx} {...faq} />
          ))}
        </div>
      </div>
    </section>
  );
};
