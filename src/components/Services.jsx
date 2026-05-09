
import { motion } from 'framer-motion';
import { Cpu, Terminal, Shield, Zap } from 'lucide-react';

const services = [
  {
    title: "Engenharia de Sistema",
    desc: "Nós vamos até a raiz do seu hardware. BIOS tuning para processador rodar frio e estável.",
    icon: Cpu,
    tag: "Deep BIOS"
  },
  {
    title: "Kernel & Latency",
    desc: "Instalação de Windows modificado direto dos servidores da Microsoft. Zero bloatware.",
    icon: Terminal,
    tag: "Low Latency"
  },
  {
    title: "Consultoria 1 a 1",
    desc: "Procedimento de 3h assistido via TeamViewer com raio-X completo do seu setup.",
    icon: Zap,
    tag: "TeamViewer"
  },
  {
    title: "Suporte Vitalício",
    desc: "Manual de cuidados essenciais. Sem mensalidades ou recorrência.",
    icon: Shield,
    tag: "Permanent"
  }
];

export const Services = () => {
  return (
    <section className="py-40 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24">
          <div className="text-[#00bffa] font-light text-[10px] uppercase tracking-[0.4em] mb-4">Engenharia de Performance</div>
          <h2 className="text-5xl md:text-7xl font-light tracking-tighter text-white mb-8 uppercase leading-tight">
            RESULTADOS <br />
            <span className="text-zinc-500 italic">CIRÚRGICOS.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 1 }}
              className="glass-card p-10 group hover:bg-white/[0.03] transition-colors duration-500"
            >
              <div className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center mb-12 group-hover:border-[#00bffa]/30 group-hover:shadow-[0_0_20px_rgba(0,191,250,0.1)] transition-all duration-700 bg-white/[0.02]">
                <item.icon size={20} className="text-zinc-400 group-hover:text-[#00bffa] transition-colors" />
              </div>
              <div className="inline-block px-3 py-1 rounded-full bg-white/[0.03] border border-white/5 text-[8px] font-light text-zinc-500 uppercase tracking-widest mb-4 group-hover:border-[#00bffa]/20 transition-colors">{item.tag}</div>
              <h3 className="text-2xl font-light text-white mb-6 tracking-tight italic uppercase">{item.title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed font-light">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
