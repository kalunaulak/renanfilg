import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle } from 'lucide-react';

const glossary = {
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
};

export const TechnicalTooltip = ({ term, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const cleanTerm = term.toLowerCase().replace(/\s/g, '').normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const data = glossary[cleanTerm];

  if (!data) return <span>{children}</span>;

  return (
    <span 
      className="relative inline cursor-help group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onTouchStart={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }}
    >
      <span className="text-[#00bffa] hover:text-[#005eea] transition-colors duration-300 font-normal">
        {children}
      </span>
      
      <AnimatePresence>
        {isOpen && (
          <motion.span
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-72 p-5 rounded-2xl backdrop-blur-2xl bg-zinc-950/98 border border-[#00bffa]/15 shadow-[0_12px_40px_-5px_rgba(0,0,0,0.9)] z-50 text-left normal-case tracking-normal font-sans pointer-events-none sm:pointer-events-auto"
          >
            <span className="flex items-center gap-1.5 text-[9px] font-bold text-[#00bffa] uppercase tracking-widest mb-2.5">
              <HelpCircle className="w-3.5 h-3.5" /> Explicação Didática
            </span>
            <span className="block text-sm font-semibold text-white mb-1.5 not-italic tracking-wide">
              {data.title}
            </span>
            <span className="block text-[12px] text-zinc-300 font-light leading-relaxed not-italic tracking-normal">
              {data.desc}
            </span>
            <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-[5px] border-[5px] border-transparent border-t-zinc-950 pointer-events-none"></span>
          </motion.span>
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
