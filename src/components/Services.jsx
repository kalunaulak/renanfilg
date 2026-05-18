import { motion } from 'framer-motion';
import { Cpu, Terminal, Shield, Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { parseGlossaryTerms, HoverHelper } from './TechnicalTooltip';

export const Services = () => {
  const { language } = useLanguage();

  const t = {
    pt: {
      tag: 'Engenharia de Performance',
      title: 'RESULTADOS',
      title_italic: 'CIRÚRGICOS.',
      services: [
        { 
          title: "Overclock Saudável", 
          desc: "Via chamada de vídeo, vamos até a BIOS (firmware) de sua placa-mãe. Irei AUMENTAR a performance de seu computador subindo as frequências e REDUZIR as temperaturas das peças abaixando as tensões.", 
          icon: Cpu, 
          badge: "Deep Tuning" 
        },
        { 
          title: "Inputlag Zero", 
          desc: "Instalação de um Windows 100% otimizado a partir do original da Microsoft. Sem programas e serviços inúteis travando seu PC. Você possui acesso VITALÍCIO a suas futuras versões, podendo formatar novamente sozinho quando e quantas vezes quiser.", 
          icon: Terminal, 
          badge: "Resposta Rápida" 
        },
        { 
          title: "Atendimento Remoto", 
          desc: "O procedimento dura em média de 1h a 2h, de forma totalmente remota. Eu daqui, e você daí, podendo ver e interferir em tudo o que é feito.", 
          icon: Zap, 
          badge: "Para o seu conforto" 
        },
        { 
          title: "Depois, faça você mesmo!", 
          desc: "Você recebe um manual de cuidados práticos essenciais para manter a máquina voando sozinho, incluindo links de drivers de vídeo modificados e suas futuras atualizações. Total autonomia, sem mensalidades.", 
          icon: Shield, 
          badge: "Autonomia" 
        }
      ]
    },
    en: {
      tag: 'Performance Engineering',
      title: 'SURGICAL',
      title_italic: 'RESULTS.',
      services: [
        { 
          title: "Healthy Overclock", 
          desc: "Via video call, we go straight to your motherboard's BIOS (firmware). I will INCREASE your computer's performance by raising frequencies and REDUCE temperatures by lowering voltages.", 
          icon: Cpu, 
          badge: "Deep Tuning" 
        },
        { 
          title: "Zero Inputlag", 
          desc: "Installation of a 100% optimized Windows directly from official Microsoft sources. No useless background apps and services lagging your PC. Lifetime access to future versions, format on your own whenever you want.", 
          icon: Terminal, 
          badge: "Quick Response" 
        },
        { 
          title: "Remote Assistance", 
          desc: "The entire process takes 1h to 2h on average, fully remote. I work from here, you watch from there, able to see and interact with everything being done.", 
          icon: Zap, 
          badge: "For your comfort" 
        },
        { 
          title: "DIY Maintenance Guide", 
          desc: "You receive a practical manual of essential care guidelines to keep your system flying solo, including custom video drivers and future update links. Total autonomy, no monthly fees.", 
          icon: Shield, 
          badge: "Autonomy" 
        }
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
              <span className="text-[#00bffa] italic">{t.title_italic}</span>
            </h2>
          </div>
          <HoverHelper />
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
