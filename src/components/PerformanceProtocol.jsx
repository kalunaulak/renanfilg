
import { motion } from 'framer-motion';
import { Terminal, Search, Zap, Cpu } from 'lucide-react';

const steps = [
  {
    title: "Preparo do Pendrive e Backup.",
    desc: "Salvamos seus arquivos essenciais e preparamos as ferramentas exclusivas que serão usadas na sua máquina.",
    icon: Terminal
  },
  {
    title: "Telemetria e Diagnóstico de Hardware.",
    desc: "Escaneamos seu setup de ponta a ponta. Identificamos gargalos de temperatura e uso excessivo de CPU/RAM.",
    icon: Search
  },
  {
    title: "Otimização de BIOS e Overclock Seguro.",
    desc: "Ajustamos latências de memória e aplicamos um tuning fino na placa-mãe para extrair o máximo de performance.",
    icon: Zap
  },
  {
    title: "Instalação de Windows Customizado.",
    desc: "Aplicamos um sistema limpo, removendo bloatwares para garantir zero input lag e FPS nas alturas.",
    icon: Cpu
  }
];

export const PerformanceProtocol = () => {
  return (
    <section className="py-32 px-6 bg-zinc-950 border-y border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between mb-24 gap-12">
          <div className="max-w-2xl">
            <div className="text-performance font-light text-xs uppercase tracking-[0.4em] mb-4">Metodologia Exclusiva</div>
            <h2 className="text-4xl md:text-7xl font-light tracking-tighter text-white leading-none">
              PROTOCOLO DE <br /><span className="text-performance">PERFORMANCE</span>
            </h2>
          </div>
          <p className="text-zinc-500 text-xl font-light max-w-sm italic">
            Transparência total. Você assiste e autoriza tudo remotamente.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="relative group"
            >
              <div className="mb-8 flex items-center gap-4">
                <span className="text-5xl font-thin text-white/5 italic group-hover:text-performance/20 transition-colors">0{idx + 1}</span>
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
