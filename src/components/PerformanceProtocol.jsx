import { motion } from 'framer-motion';
import { Terminal, Search, Zap, Cpu } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { parseGlossaryTerms } from './TechnicalTooltip';

export const PerformanceProtocol = () => {
  const { language } = useLanguage();

  const t = {
    pt: {
      tag: 'Metodologia Exclusiva',
      title_part1: 'PASSOS DA',
      title_part2: 'OTIMIZAÇÃO',
      desc: 'Transparência total. Você assiste e autoriza tudo remotamente.',
      steps: [
        { title: "PREPARO DO PENDRIVE E ATUALIZAÇÃO DE BIOS.", desc: "Envio um vídeo gravado por mim orientando a como deixar o pendrive pronto para o dia agendado.", icon: Terminal },
        { title: "Raio-X e Diagnóstico do PC.", desc: "Escaneio seu computador de ponta a ponta. Identifico se ele está esquentando muito ou se tem peças trabalhando sobrecarregadas.", icon: Search },
        { title: "CONFIGURAÇÕES DA PLACA-MÃE (BIOS)", desc: "Altero as configurações físicas de frequências, tensões e latências de suas peças, de forma 100% segura para extrair a máxima velocidade além de reduzir sua temperatura.", icon: Zap },
        { title: "INSTALAÇÃO DO WINDOWS OTIMIZADO.", desc: "Formato seu computador para um sistema limpo, modificado por mim. Sem lixos ou bloatwares, para garantir o máximo de FPS e o mínimo de atraso de entrada.", icon: Cpu }
      ]
    },
    en: {
      tag: 'Exclusive Methodology',
      title_part1: 'PERFORMANCE',
      title_part2: 'PROTOCOL',
      desc: 'Total transparency. You watch and authorize everything remotely.',
      steps: [
        { title: "Prep & Safety Backup.", desc: "I save your important files and prepare the exclusive tools I will use on your machine.", icon: Terminal },
        { title: "PC X-Ray & Diagnostics.", desc: "I scan your computer from end to end. Identifying overheating bottlenecks or overloaded parts.", icon: Search },
        { title: "Motherboard Settings.", desc: "I adjust physical board and memory settings 100% safely to extract peak hardware speed.", icon: Zap },
        { title: "Optimized Windows Install.", desc: "I apply a clean system, removing all Windows junk to ensure instant click responses and peak FPS.", icon: Cpu }
      ]
    }
  }[language || 'pt'];

  return (
    <section className="py-16 md:py-32 px-6 md:px-6 bg-zinc-950 border-y border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start justify-between mb-20 gap-12">
          <div className="max-w-3xl">
            <div className="text-[#00bffa] font-light text-xs uppercase tracking-[0.4em] mb-6">{t.tag}</div>
            <h2 className="text-5xl md:text-8xl font-light tracking-tighter text-white leading-[0.9] uppercase italic pt-1 flex flex-col">
              <span>{t.title_part1}</span>
              <span className="inline-block bg-gradient-to-b from-[#00bffa] via-[#00bffa] to-[#005eea] bg-clip-text text-transparent not-italic font-bold drop-shadow-[0_0_15px_rgba(0,191,250,0.4)] -mt-4 md:-mt-10 pt-2 pb-1 leading-normal">
                {t.title_part2}
              </span>
            </h2>
          </div>
          <div className="flex flex-col gap-4 md:mt-12">
            <p className="text-zinc-500 text-lg font-light max-w-sm italic">
              {t.desc}
            </p>
            <div className="hidden md:flex items-center gap-2 text-zinc-500 text-[9px] uppercase tracking-widest bg-white/[0.02] border border-white/5 rounded-full px-4 py-1.5 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00bffa] animate-pulse"></span>
              <span>Passe o mouse nos termos destacados em ciano</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {t.steps.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="relative group"
            >
              <div className="mb-6 flex items-center gap-4">
                <span className="text-4xl font-thin text-white/30 italic group-hover:text-[#00bffa]/50 transition-colors">0{idx + 1}</span>
                <div className="h-px flex-1 bg-white/5"></div>
              </div>
              
              <h3 className="text-xl font-light text-white uppercase tracking-tight mb-4 pr-10">{parseGlossaryTerms(item.title)}</h3>
              <p className="text-zinc-400 text-base md:text-sm font-light leading-relaxed italic pr-4">
                {parseGlossaryTerms(item.desc)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
