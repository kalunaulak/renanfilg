import { motion } from 'framer-motion';
import { Cpu, Terminal, Shield, Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Services = () => {
  const { language } = useLanguage();

  const t = {
    pt: {
      tag: 'Engenharia de Performance',
      title: 'RESULTADOS',
      title_italic: 'CIRÚRGICOS.',
      services: [
        { title: "Engenharia de Sistema", desc: "Eu vou até a raiz do seu hardware. BIOS tuning para o processador rodar frio e estável.", icon: Cpu, badge: "Deep BIOS" },
        { title: "Kernel & Latency", desc: "Instalação de Windows modificado direto dos servidores da Microsoft. Zero bloatware.", icon: Terminal, badge: "Low Latency" },
        { title: "Consultoria 1 a 1", desc: "Procedimento de 3h assistido via TeamViewer com raio-X completo do seu setup.", icon: Zap, badge: "TeamViewer" },
        { title: "Suporte Vitalício", desc: "Manual de cuidados essenciais. Sem mensalidades ou recorrência.", icon: Shield, badge: "Permanent" }
      ]
    },
    en: {
      tag: 'Performance Engineering',
      title: 'SURGICAL',
      title_italic: 'RESULTS.',
      services: [
        { title: "System Engineering", desc: "I go to the root of your hardware. BIOS tuning for stable and cool processor performance.", icon: Cpu, badge: "Deep BIOS" },
        { title: "Kernel & Latency", desc: "Modified Windows installation directly from Microsoft servers. Zero bloatware.", icon: Terminal, badge: "Low Latency" },
        { title: "1-on-1 Consulting", desc: "3h assisted procedure via TeamViewer with a complete X-ray of your setup.", icon: Zap, badge: "TeamViewer" },
        { title: "Lifetime Support", desc: "Essential care manual. No monthly fees or recurrence.", icon: Shield, badge: "Permanent" }
      ]
    }
  }[language || 'pt'];

  return (
    <section className="py-16 md:py-40 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24">
          <div className="text-[#00bffa] font-light text-[10px] uppercase tracking-[0.4em] mb-4">{t.tag}</div>
          <h2 className="text-5xl md:text-7xl font-light tracking-tighter text-white mb-8 uppercase leading-tight">
            {t.title} <br />
            <span className="text-zinc-500 italic">{t.title_italic}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {t.services.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 1 }}
              className="glass-card p-10 group hover:bg-white/[0.03] transition-colors duration-500"
            >
              <div className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center mb-12 group-hover:border-[#00bffa]/30 group-hover:shadow-[0_0_20px_rgba(0,191,250,0.1)] transition-all duration-700 bg-white/[0.02]">
                <item.icon size={20} className="text-zinc-400 group-hover:text-[#00bffa] transition-colors" />
              </div>
              <div className="inline-block px-3 py-1 rounded-full bg-white/[0.03] border border-white/5 text-[8px] font-light text-zinc-500 uppercase tracking-widest mb-4 group-hover:border-[#00bffa]/20 transition-colors">{item.badge}</div>
              <h3 className="text-2xl font-light text-white mb-6 tracking-tight italic uppercase">{item.title}</h3>
              <p className="text-zinc-400 text-base md:text-sm leading-relaxed font-light">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
