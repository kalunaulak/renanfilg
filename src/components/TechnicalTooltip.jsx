import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, MousePointer, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const glossary = {
  pt: {
    bios: {
      title: "BIOS (Sistema Básico de Entrada/Saída)",
      desc: "A BIOS é o 'cérebro' físico que vem direto na placa-mãe. Ajustá-la (BIOS Tuning) libera a velocidade real das suas memórias e processador de forma 100% segura, removendo os limites lentos de fábrica."
    },
    undervolt: {
      title: "Undervolt",
      desc: "Uma calibração segura que reduz o excesso de voltagem elétrica enviado ao processador e placa de vídeo. Seu PC entrega a mesma performance máxima, porém trabalhando muito mais frio e economizando energia."
    },
    kernel: {
      title: "Kernel",
      desc: "O Kernel é o canal central que faz a ponte direta de dados entre o Windows e as peças físicas. Otimizá-lo garante que seus jogos tenham prioridade máxima absoluta de processamento, evitando engasgos."
    },
    inputlag: {
      title: "Input Lag (Atraso de Entrada)",
      desc: "O atraso invisível entre você clicar no mouse/teclado e o movimento acontecer de fato na tela. Reduzir o Input Lag deixa a sua mira instantânea e a gameplay muito mais responsiva."
    },
    overclock: {
      title: "Overclock",
      desc: "Aceleração controlada da frequência de processamento de memórias e CPU. Aumenta a velocidade de cálculo do computador para processar tarefas e empurrar mais FPS nos jogos."
    },
    bloatwares: {
      title: "Bloatwares (Lixos do Windows)",
      desc: "Programas e serviços ocultos que vêm pré-instalados de fábrica com o Windows padrão (rastreadores, widgets inúteis, etc.). Eles roubam memória RAM e esforço do processador em segundo plano."
    }
  },
  en: {
    bios: {
      title: "BIOS (Basic Input/Output System)",
      desc: "The BIOS is the physical 'brain' built directly onto the motherboard. Adjusting it (BIOS Tuning) unlocks the real speed of your RAM and CPU 100% safely, removing restrictive factory limits."
    },
    undervolt: {
      title: "Undervolt",
      desc: "A safe calibration that reduces the excess electrical voltage sent to the processor and graphics card. Your PC delivers the same maximum performance, but runs much cooler and saves power."
    },
    kernel: {
      title: "Kernel",
      desc: "The Kernel is the core bridge that links Windows directly to the physical hardware. Optimizing it ensures your games receive absolute maximum processing priority, avoiding micro-stutters and freezes."
    },
    inputlag: {
      title: "Input Lag (Input Latency)",
      desc: "The invisible delay between clicking your mouse/keyboard and the action actually rendering on screen. Reducing Input Lag makes your aiming instant and gameplay much more responsive."
    },
    overclock: {
      title: "Overclock",
      desc: "Controlled acceleration of memory and CPU processing frequencies. It increases the computer's computing speed to process tasks faster and push more FPS in games."
    },
    bloatwares: {
      title: "Bloatwares (Windows Bloat)",
      desc: "Hidden programs and background tracking services pre-installed with standard Windows (telemetry, useless widgets). They steal RAM and processor power silently in the background."
    }
  }
};

export const TechnicalTooltip = ({ term, children }) => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [coords, setCoords] = useState({ top: 0 });
  const cleanTerm = term.toLowerCase().replace(/\s/g, '').normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  
  const langKey = language?.startsWith('en') ? 'en' : 'pt';
  const data = glossary[langKey]?.[cleanTerm];

  // Detect screen size dynamically
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Automatically close sheet/tooltip when the user scrolls the page
  useEffect(() => {
    if (!isOpen) return;

    const handleScroll = () => {
      setIsOpen(false);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  if (!data) return <span>{children}</span>;

  return (
    <span 
      className="relative inline cursor-help group"
      onMouseEnter={() => !isMobile && setIsOpen(true)}
      onMouseLeave={() => !isMobile && setIsOpen(false)}
      onClick={(e) => {
        if (isMobile) {
          e.stopPropagation();
          const rect = e.currentTarget.getBoundingClientRect();
          // Garante limite superior de 160px para o tooltip não subir acima do topo do navegador
          const safeTop = Math.max(160, rect.top);
          setCoords({ top: safeTop });
          setIsOpen(!isOpen);
        }
      }}
    >
      <span className="text-[#00bffa] hover:text-[#005eea] transition-colors duration-300 font-normal">
        {children}
      </span>
      
      <AnimatePresence>
        {isOpen && (
          isMobile ? (
            // Mobile: Balão flutuante acima da palavra com margens laterais físicas perfeitas
            <div className="fixed inset-0 z-[100] pointer-events-none">
              {/* Clique fora para fechar */}
              <div className="absolute inset-0 pointer-events-auto" onClick={() => setIsOpen(false)} />
              
              <motion.span
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 5, scale: 0.95 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="fixed left-4 right-4 p-5 rounded-2xl backdrop-blur-2xl bg-zinc-950/98 border border-[#00bffa]/20 shadow-[0_12px_40px_rgba(0,191,250,0.15)] text-left normal-case tracking-normal font-sans pointer-events-auto block -translate-y-full"
                style={{ top: `${coords.top - 12}px` }}
              >
                {/* Botão de Fechar X no Mobile */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(false);
                  }}
                  className="absolute top-4 right-4 text-zinc-500 hover:text-white bg-white/5 hover:bg-white/10 p-1.5 rounded-full transition-colors flex items-center justify-center cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>

                <span className="flex items-center gap-1.5 text-[9px] font-bold text-[#00bffa] uppercase tracking-widest mb-2.5">
                  <HelpCircle className="w-3.5 h-3.5" /> {langKey === 'en' ? 'Didactic Explanation' : 'Explicação Didática'}
                </span>
                <span className="block text-sm font-semibold text-white mb-1.5 not-italic tracking-wide pr-6">
                  {data.title}
                </span>
                <span className="block text-[12px] text-zinc-300 font-light leading-relaxed not-italic tracking-normal">
                  {data.desc}
                </span>
              </motion.span>
            </div>
          ) : (
            // Desktop: Popover padrão acima da palavra
            <motion.span
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 5, scale: 0.95 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-72 p-5 rounded-2xl backdrop-blur-2xl bg-zinc-950/98 border border-[#00bffa]/15 shadow-[0_12px_40px_-5px_rgba(0,0,0,0.9)] z-50 text-left normal-case tracking-normal font-sans pointer-events-none sm:pointer-events-auto block"
            >
              <span className="flex items-center gap-1.5 text-[9px] font-bold text-[#00bffa] uppercase tracking-widest mb-2.5">
                <HelpCircle className="w-3.5 h-3.5" /> {langKey === 'en' ? 'Didactic Explanation' : 'Explicação Didática'}
              </span>
              <span className="block text-sm font-semibold text-white mb-1.5 not-italic tracking-wide">
                {data.title}
              </span>
              <span className="block text-[12px] text-zinc-300 font-light leading-relaxed not-italic tracking-normal">
                {data.desc}
              </span>
              <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-[5px] border-[5px] border-transparent border-t-zinc-950 pointer-events-none"></span>
            </motion.span>
          )
        )}
      </AnimatePresence>
    </span>
  );
};

// Auto-scanner utility to wrap terms in any text string
export const parseGlossaryTerms = (text) => {
  if (typeof text !== 'string') return text;

  // Search patterns sorted by priority/length to avoid partial match overlaps
  const termsMap = [
    { pattern: /\b(BIOS Tuning|BIOS)\b/gi, term: "bios" },
    { pattern: /\b(Undervolt)\b/gi, term: "undervolt" },
    { pattern: /\b(Kernel)\b/gi, term: "kernel" },
    { pattern: /\b(Input Lag|atraso de entrada)\b/gi, term: "inputlag" },
    { pattern: /\b(Overclock)\b/gi, term: "overclock" },
    { pattern: /\b(Bloatwares|Bloat)\b/gi, term: "bloatwares" }
  ];

  let parts = [{ text: text, isReact: false }];

  termsMap.forEach(({ pattern, term }) => {
    let newParts = [];
    parts.forEach(part => {
      if (part.isReact) {
        newParts.push(part);
      } else {
        const matches = [...part.text.matchAll(pattern)];
        if (matches.length === 0) {
          newParts.push(part);
        } else {
          let lastIndex = 0;
          matches.forEach(match => {
            const matchText = match[0];
            const matchIndex = match.index;
            
            // Text before match
            if (matchIndex > lastIndex) {
              newParts.push({ text: part.text.substring(lastIndex, matchIndex), isReact: false });
            }
            
            // The match wrapped in TechnicalTooltip
            newParts.push({
              node: <TechnicalTooltip key={`${term}-${matchIndex}`} term={term}>{matchText}</TechnicalTooltip>,
              isReact: true
            });
            
            lastIndex = matchIndex + matchText.length;
          });
          
          // Text after last match
          if (lastIndex < part.text.length) {
            newParts.push({ text: part.text.substring(lastIndex), isReact: false });
          }
        }
      }
    });
    parts = newParts;
  });

  return parts.map((part, idx) => part.isReact ? part.node : part.text);
};

export const HoverHelper = ({ centered = false }) => {
  const { language } = useLanguage();
  const isEn = language?.startsWith('en');

  return (
    <>
      {/* Versão Desktop - Cursor de Mouse Animado */}
      <div className={`hidden md:flex items-center gap-3.5 text-[#00bffa] text-[10px] uppercase tracking-[0.18em] bg-[#00bffa]/[0.06] border border-[#00bffa]/25 rounded-full px-5 py-2.5 shadow-[0_0_20px_rgba(0,191,250,0.12)] w-fit ${centered ? 'mx-auto mt-8' : ''}`}>
        <motion.div
          animate={{ 
            x: [0, 8, 0], 
            y: [0, -4, 0],
            scale: [1, 0.95, 1]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 2.2, 
            ease: "easeInOut" 
          }}
          className="relative flex items-center justify-center pointer-events-none"
        >
          {/* Aura de luz ambiente idêntica ao cursor real */}
          <motion.span 
            animate={{ opacity: [0.2, 0.5, 0.2], scale: [0.8, 1.4, 0.8] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
            className="absolute w-8 h-8 rounded-full pointer-events-none blur-[4px]"
            style={{
              background: 'radial-gradient(circle, rgba(0, 191, 250, 0.4) 0%, rgba(0, 94, 234, 0.1) 50%, transparent 80%)'
            }}
          />

          {/* Vetor idêntico ao cursor customizado da página */}
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[0_0_5px_rgba(0,191,250,0.85)] z-10"
            style={{ marginLeft: '-1px', marginTop: '-1px' }}
          >
            <path 
              d="M2 2L18 8L10.5 10.5L8 18L2 2Z" 
              fill="#020202" 
              stroke="#00bffa" 
              strokeWidth="1.8" 
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
        <span className="font-semibold text-white tracking-wider">
          {isEn ? (
            <>
              Tip: <span className="text-zinc-400 font-light lowercase">Hover over terms in </span>
              <span className="text-[#00bffa] font-bold tracking-widest uppercase">blue</span> 
              <span className="text-zinc-400 font-light lowercase"> to see the didactic explanation</span>
            </>
          ) : (
            <>
              Dica: <span className="text-zinc-400 font-light lowercase">Passe o mouse nos termos em </span>
              <span className="text-[#00bffa] font-bold tracking-widest uppercase">azul</span> 
              <span className="text-zinc-400 font-light lowercase"> para ver a explicação didática</span>
            </>
          )}
        </span>
      </div>

      {/* Versão Mobile - Dedo Apontando com Animação de Toque (Tap) */}
      <div className={`flex md:hidden items-center gap-3 text-zinc-500 text-[9px] uppercase tracking-[0.14em] bg-[#00bffa]/[0.05] border border-[#00bffa]/20 rounded-full px-5 py-2.5 shadow-[0_0_15px_rgba(0,191,250,0.08)] w-fit ${centered ? 'mx-auto mt-6' : 'mt-4'}`}>
        <motion.div
          animate={{ 
            scale: [1, 0.82, 1],
            y: [0, 2, 0]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 1.8, 
            ease: "easeInOut" 
          }}
          className="relative flex items-center justify-center w-5 h-5 text-[#00bffa] pointer-events-none"
        >
          {/* Circulo de Toque Neon (Ripple Effect) */}
          <motion.span 
            animate={{ scale: [0.6, 1.6, 0.6], opacity: [0.1, 0.8, 0.1] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="absolute -top-1 w-5 h-5 rounded-full bg-[#00bffa]/30 border border-[#00bffa] shadow-[0_0_8px_#00bffa] blur-[1px]"
          />
          
          {/* Mãozinha apontando/tocando */}
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="z-10 drop-shadow-[0_0_3px_rgba(0,191,250,0.6)]"
          >
            <path d="M10 11V4.5a1.5 1.5 0 0 1 3 0V11" />
            <path d="M13 11a1.5 1.5 0 0 1 3 0v1.5" />
            <path d="M16 12.5a1.5 1.5 0 0 1 3 0V14a5 5 0 0 1-10 0v-3.5" />
            <path d="M7 10.5a1.5 1.5 0 0 1 3 0V11" />
            <path d="M7 11.5H5a2 2 0 0 0-2 2v2a7 7 0 0 0 14 0v-1" />
          </svg>
        </motion.div>
        <span className="font-semibold text-white tracking-wider">
          {isEn ? (
            <>
              Tap on terms in <span className="text-[#00bffa] font-bold tracking-widest uppercase">blue</span> for the explanation
            </>
          ) : (
            <>
              Toque no termo em <span className="text-[#00bffa] font-bold tracking-widest uppercase">azul</span> para a explicação
            </>
          )}
        </span>
      </div>
    </>
  );
};
