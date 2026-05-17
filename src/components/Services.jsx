import { motion } from 'framer-motion';
import { Cpu, Terminal, Shield, Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { parseGlossaryTerms } from './TechnicalTooltip';

export const Services = () => {
  const { language } = useLanguage();

  const t = {
    pt: {
      tag: 'Engenharia de Performance',
      title: 'RESULTADOS',
      title_italic: 'CIRÚRGICOS.',
      services: [
        { title: "Calibração de Peças", desc: "Eu vou até a raiz do seu computador. Ajusto as configurações de fábrica para o processador rodar frio e estável.", icon: Cpu, badge: "Deep Tuning" },
        { title: "Windows Sem Lixo", desc: "Instalação de um Windows otimizado direto da Microsoft. Sem programas inúteis travando a máquina.", icon: Terminal, badge: "Resposta Rápida" },
        { title: "Atendimento 1 a 1", desc: "Procedimento de 3h comigo no seu computador (acesso remoto seguro) com raio-X completo.", icon: Zap, badge: "Remoto Seguro" },
        { title: "Manual de Preservação", desc: "Você recebe um manual de cuidados práticos essenciais para manter a máquina voando sozinho, garantindo total autonomia. Sem mensalidades.", icon: Shield, badge: "Autonomia" }
      ]
    },
    en: {
      tag: 'Performance Engineering',
      title: 'SURGICAL',
      title_italic: 'RESULTS.',
      services: [
        { title: "Hardware Tuning", desc: "I go to the root of your computer. I adjust factory settings so the processor runs cool and stable.", icon: Cpu, badge: "Deep Tuning" },
        { title: "Clean Windows", desc: "Installation of an optimized Windows directly from Microsoft. No useless background apps slowing you down.", icon: Terminal, badge: "Quick Response" },
        { title: "1-on-1 Consulting", desc: "3-hour safe remote session with me for a complete X-ray and setup of your PC.", icon: Zap, badge: "Safe Remote" },
        { title: "Preservation Guide", desc: "You receive a complete manual of essential care guidelines to maintain peak performance on your own, ensuring total autonomy. No monthly fees.", icon: Shield, badge: "Autonomy" }
      ]
    }
  }[language || 'pt'];

  return (
    <section className="py-16 md:py-40 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="text-[#00bffa] font-light text-[10px] uppercase tracking-[0.4em] mb-4">{t.tag}</div>
            <h2 className="text-5xl md:text-7xl font-light tracking-tighter text-white uppercase leading-tight">
              {t.title} <br />
              <span className="text-zinc-500 italic">{t.title_italic}</span>
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-2 text-zinc-500 text-[9px] uppercase tracking-widest bg-white/[0.02] border border-white/5 rounded-full px-4 py-1.5 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00bffa] animate-pulse"></span>
            <span>Passe o mouse nos termos destacados em ciano</span>
          </div>
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
              <h3 className="text-2xl font-light text-white mb-6 tracking-tight italic uppercase">{parseGlossaryTerms(item.title)}</h3>
              <p className="text-zinc-400 text-base md:text-sm leading-relaxed font-light">{parseGlossaryTerms(item.desc)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
