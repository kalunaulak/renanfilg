import { motion } from 'framer-motion';
import { Terminal, Search, Zap, Cpu } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const PerformanceProtocol = () => {
  const { language } = useLanguage();

  const t = {
    pt: {
      tag: 'Metodologia Exclusiva',
      title: 'PROTOCOLO DE',
      title_performance: 'PERFORMANCE',
      desc: 'Transparência total. Você assiste e autoriza tudo remotamente.',
      steps: [
        { title: "Preparo do Pendrive e Backup.", desc: "Salvamos seus arquivos essenciais e preparamos as ferramentas exclusivas que serão usadas na sua máquina.", icon: Terminal },
        { title: "Telemetria e Diagnóstico de Hardware.", desc: "Escaneamos seu setup de ponta a ponta. Identificamos gargalos de temperatura e uso excessivo de CPU/RAM.", icon: Search },
        { title: "Otimização de BIOS e Overclock Seguro.", desc: "Ajustamos latências de memória e aplicamos um tuning fino na placa-mãe para extrair o máximo de performance.", icon: Zap },
        { title: "Instalação de Windows Customizado.", desc: "Aplicamos um sistema limpo, removendo bloatwares para garantir zero input lag e FPS nas alturas.", icon: Cpu }
      ]
    },
    en: {
      tag: 'Exclusive Methodology',
      title: 'PERFORMANCE',
      title_performance: 'PROTOCOL',
      desc: 'Total transparency. You watch and authorize everything remotely.',
      steps: [
        { title: "Flash Drive Prep & Backup.", desc: "We save your essential files and prepare the exclusive tools to be used on your machine.", icon: Terminal },
        { title: "Telemetry & Hardware Diagnostics.", desc: "We scan your setup end-to-end. Identifying temperature bottlenecks and excessive CPU/RAM usage.", icon: Search },
        { title: "BIOS Optimization & Safe Overclock.", desc: "We tune memory latencies and apply fine adjustments to the motherboard for maximum performance.", icon: Zap },
        { title: "Custom Windows Installation.", desc: "We apply a clean system, removing bloatware to ensure zero input lag and peak FPS.", icon: Cpu }
      ]
    }
  }[language || 'pt'];

  return (
    <section className="py-32 px-6 bg-zinc-950 border-y border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between mb-24 gap-12">
          <div className="max-w-2xl">
            <div className="text-[#00bffa] font-light text-xs uppercase tracking-[0.4em] mb-4">{t.tag}</div>
            <h2 className="text-4xl md:text-7xl font-light tracking-tighter text-white leading-none">
              {t.title} <br /><span className="text-[#00bffa]">{t.title_performance}</span>
            </h2>
          </div>
          <p className="text-zinc-500 text-xl font-light max-w-sm italic">
            {t.desc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {t.steps.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="relative group"
            >
              <div className="mb-8 flex items-center gap-4">
                <span className="text-5xl font-thin text-white/5 italic group-hover:text-[#00bffa]/20 transition-colors">0{idx + 1}</span>
                <div className="h-px flex-1 bg-white/5"></div>
              </div>
              
              <h3 className="text-xl font-light text-white uppercase tracking-tight mb-4 pr-10">{item.title}</h3>
              <p className="text-zinc-500 text-sm font-light leading-relaxed italic pr-4">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
