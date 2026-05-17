import { motion } from 'framer-motion';
import { Terminal, Search, Zap, Cpu } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const PerformanceProtocol = () => {
  const { language } = useLanguage();

  const t = {
    pt: {
      tag: 'Metodologia Exclusiva',
      title_part1: 'PROTOCOLO DE',
      title_part2: 'PERFORMANCE',
      desc: 'Transparência total. Você assiste e autoriza tudo remotamente.',
      steps: [
        { title: "Preparo e Cópia de Segurança.", desc: "Salvo seus arquivos importantes e preparo as ferramentas exclusivas que vou usar na sua máquina.", icon: Terminal },
        { title: "Raio-X e Diagnóstico do PC.", desc: "Escaneio seu computador de ponta a ponta. Identifico se ele está esquentando muito ou se tem peças trabalhando sobrecarregadas.", icon: Search },
        { title: "Configurações da Placa-mãe.", desc: "Ajusto as configurações físicas da sua placa e memórias de forma 100% segura para extrair a máxima velocidade.", icon: Zap },
        { title: "Instalação do Windows Otimizado.", desc: "Aplico um sistema limpo, tirando todo o lixo do Windows para garantir respostas instantâneas ao clicar e FPS no máximo.", icon: Cpu }
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
            <h2 className="text-5xl md:text-8xl font-light tracking-tighter text-white leading-[0.85] uppercase italic">
              {t.title_part1} <br />
              <span className="inline-block bg-gradient-to-b from-[#00bffa] via-[#00bffa] to-[#005eea] bg-clip-text text-transparent not-italic font-bold drop-shadow-[0_0_15px_rgba(0,191,250,0.4)]">
                {t.title_part2}
              </span>
            </h2>
          </div>
          <p className="text-zinc-500 text-lg font-light max-w-sm italic md:mt-12">
            {t.desc}
          </p>
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
              
              <h3 className="text-xl font-light text-white uppercase tracking-tight mb-4 pr-10">{item.title}</h3>
              <p className="text-zinc-400 text-base md:text-sm font-light leading-relaxed italic pr-4">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
