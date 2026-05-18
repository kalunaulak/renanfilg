import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ShieldCheck, Zap, Cpu, Award } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import logo from '../assets/logo.webp';

export const About = () => {
  const { language } = useLanguage();
  const isEn = language?.startsWith('en');

  // Rolar para o topo ao montar a página
  useEffect(() => {
    window.scrollTo(0, 0);
    const originalTitle = document.title;
    document.title = isEn ? "About Renan Filg | Elite Performance Engineering" : "Quem é Renan Filg | Otimização Elite de Hardware";
    return () => {
      document.title = originalTitle;
    };
  }, [isEn]);

  const t = {
    pt: {
      back: "Voltar para o Início",
      tag: "THE ALCHEMIST OF HARDWARE",
      title: "QUEM É RENAN",
      title_accent: "FILGUEIRAS?",
      subtitle: "Conheça o engenheiro de performance por trás dos setups dos maiores atletas de e-sports e criadores de conteúdo da América Latina.",
      
      stat1_num: "+1.500",
      stat1_label: "Setups Otimizados",
      stat2_num: "0.00ms",
      stat2_label: "Input Lag de Mouse",
      stat3_num: "+35%",
      stat3_label: "Estabilidade de FPS (1% Low)",
      stat4_num: "+100",
      stat4_label: "Pro Players & Streamers",

      card1_tag: "A Trajetória",
      card1_title: "O início da busca pelo milissegundo perfeito",
      card1_text: "Renan Filgueiras iniciou sua jornada no hardware motivado pelo mesmo problema que afeta milhões de gamers competitivos: a frustração com engasgos no meio do jogo (stuttering) e a latência de entrada (input lag). O que começou como estudos obsessivos sobre os registros internos do Windows e microarquitetura de chipsets evoluiu para um protocolo cirúrgico de otimização que atende a elite dos e-sports.",

      card2_tag: "O Diferencial",
      card2_title: "Calibração física real, sem milagres de software",
      card2_text: "Enquanto a internet está cheia de scripts prontos e programas automáticos que quebram o sistema operacional, Renan trabalha como um cirurgião. O processo vai além do Windows, calibrando diretamente os limites físicos da BIOS da sua placa-mãe. Ajustamos tensões estáveis (undervolt) para reduzir as temperaturas em até 15ºC e apertamos os tempos primários e secundários das memórias RAM (subtimings) para que as peças trabalhem em perfeita sincronia.",

      card3_tag: "Segurança Absoluta",
      card3_title: "Seu hardware tratado com respeito",
      card3_text: "Todo o procedimento é monitorado em tempo real por testes de estresse rigorosos de estabilidade física. Não fazemos overclock bruto agressivo que degrade os componentes. O objetivo é a calibração saudável: obter o potencial máximo que a fabricante deixou adormecido, reduzindo o calor e o consumo elétrico desnecessário.",

      cta_title: "Pronto para jogar no nível da elite?",
      cta_subtitle: "Diga adeus ao lag, às travadas de tela e jogue com a fluidez e precisão dos pro players profissionais.",
      cta_btn: "VER PLANOS DE OTIMIZAÇÃO"
    },
    en: {
      back: "Back to Home",
      tag: "THE ALCHEMIST OF HARDWARE",
      title: "WHO IS RENAN",
      title_accent: "FILGUEIRAS?",
      subtitle: "Meet the performance engineer behind the setups of the biggest esports athletes and content creators in Latin America.",
      
      stat1_num: "+1,500",
      stat1_label: "Setups Optimized",
      stat2_num: "0.00ms",
      stat2_label: "Mouse Input Lag",
      stat3_num: "+35%",
      stat3_label: "FPS Stability (1% Low)",
      stat4_num: "+100",
      stat4_label: "Pro Players & Streamers",

      card1_tag: "The Journey",
      card1_title: "The quest for the perfect millisecond",
      card1_text: "Renan Filgueiras began his journey in hardware motivated by the very same issue affecting millions of competitive gamers: the frustration with mid-game stutters and input lag. What started as obsessive research into Windows internal registries and chipset microarchitectures evolved into a surgical optimization protocol that serves the absolute elite of esports.",

      card2_tag: "The Difference",
      card2_title: "Real hardware tuning, no software magic tricks",
      card2_text: "While the internet is flooded with basic pre-made scripts and automatic 'boosters' that break the OS, Renan operates like a surgeon. The process goes beyond Windows, deep-tuning directly into your motherboard's physical BIOS settings. We optimize stable voltages (undervolting) to drop temperatures by up to 15ºC and tighten RAM timings and subtimings to make everything run in perfect harmony.",

      card3_tag: "Absolute Safety",
      card3_title: "Your hardware treated with elite respect",
      card3_text: "Every procedure is monitored in real-time through rigorous stress tests and hardware telemetry. We do not apply brute, dangerous overclocks that degrade components. The goal is healthy calibration: unlocking the maximum performance left sleeping by manufacturers while dropping heat and power draw.",

      cta_title: "Ready to run at the absolute elite tier?",
      cta_subtitle: "Say goodbye to stutters, input delays, and play with the fluidity and precision of professional pro players.",
      cta_btn: "VIEW OPTIMIZATION PLANS"
    }
  }[isEn ? 'en' : 'pt'];

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-[#00bffa]/30 overflow-hidden font-sans pb-24">
      {/* Background Matrix e Grid ambientados */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,191,250,0.1),transparent_70%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 pt-32 relative z-10">
        
        {/* Botão de voltar elegante no topo */}
        <div className="mb-12">
          <Link 
            to="/" 
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-[#00bffa]/30 transition-all duration-300 text-xs font-mono tracking-widest text-zinc-400 hover:text-white uppercase cursor-pointer"
          >
            <ArrowLeft size={14} className="text-[#00bffa]" />
            {t.back}
          </Link>
        </div>

        {/* Cabeçalho do Perfil */}
        <div className="max-w-4xl mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00bffa]/20 bg-[#00bffa]/5 mb-8">
            <span className="text-[10px] tracking-[0.3em] text-[#00bffa] uppercase font-mono font-light">{t.tag}</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-thin tracking-tighter uppercase leading-[0.9] mb-8">
            {t.title} <br />
            <span className="bg-gradient-to-b from-[#00bffa] to-[#005eea] bg-clip-text text-transparent italic font-medium">
              {t.title_accent}
            </span>
          </h1>
          <p className="text-lg md:text-2xl text-zinc-400 font-light leading-relaxed tracking-tight max-w-3xl italic">
            "{t.subtitle}"
          </p>
        </div>

        {/* Grade de Estatísticas - Uso de Helvetica estrito em números */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-24">
          {[
            { num: t.stat1_num, label: t.stat1_label, icon: <Cpu size={18} className="text-[#00bffa]" /> },
            { num: t.stat2_num, label: t.stat2_label, icon: <Zap size={18} className="text-[#00bffa]" /> },
            { num: t.stat3_num, label: t.stat3_label, icon: <Award size={18} className="text-[#00bffa]" /> },
            { num: t.stat4_num, label: t.stat4_label, icon: <ShieldCheck size={18} className="text-[#00bffa]" /> }
          ].map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              className="glass-card p-6 md:p-8 border border-white/5 rounded-2xl flex flex-col justify-between hover:border-[#00bffa]/20 transition-colors"
            >
              <div className="mb-4 bg-white/2 w-8 h-8 rounded-lg flex items-center justify-center border border-white/5">
                {stat.icon}
              </div>
              <div>
                <div className="text-3xl md:text-5xl font-[Helvetica,Arial,sans-serif] font-bold tracking-tighter mb-2 text-white italic">
                  {stat.num}
                </div>
                <div className="text-[9px] md:text-[10px] tracking-[0.2em] uppercase font-semibold text-zinc-500 leading-tight">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Layout Bento-Grid principal sobre a Metodologia e História */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          
          {/* Card 1: A Trajetória (Largo - col-span-2) */}
          <div className="md:col-span-2 glass-card p-8 md:p-16 border border-white/5 rounded-3xl flex flex-col justify-between hover:border-white/10 transition-colors group relative overflow-hidden">
            <div className="absolute top-0 right-0 text-white/5 font-thin text-8xl italic pointer-events-none tracking-tighter p-8">01</div>
            <div>
              <span className="text-[10px] tracking-[0.3em] text-[#00bffa] uppercase font-mono font-medium block mb-6">{t.card1_tag}</span>
              <h3 className="text-2xl md:text-4xl font-light tracking-tight text-white uppercase mb-8 max-w-xl group-hover:text-[#00bffa] transition-colors leading-tight">
                {t.card1_title}
              </h3>
            </div>
            <p className="text-zinc-400 font-light text-base md:text-lg leading-relaxed max-w-2xl font-[Raleway,sans-serif]">
              {t.card1_text}
            </p>
          </div>

          {/* Card 3: Segurança Absoluta (Estreito - col-span-1) */}
          <div className="glass-card p-8 md:p-12 border border-white/5 rounded-3xl flex flex-col justify-between hover:border-white/10 transition-colors group relative overflow-hidden">
            <div className="absolute top-0 right-0 text-white/5 font-thin text-8xl italic pointer-events-none tracking-tighter p-6">02</div>
            <div>
              <span className="text-[10px] tracking-[0.3em] text-[#00bffa] uppercase font-mono font-medium block mb-6">{t.card3_tag}</span>
              <h3 className="text-2xl font-light tracking-tight text-white uppercase mb-8 group-hover:text-[#00bffa] transition-colors leading-tight">
                {t.card3_title}
              </h3>
            </div>
            <p className="text-zinc-400 font-light text-sm md:text-base leading-relaxed font-[Raleway,sans-serif]">
              {t.card3_text}
            </p>
          </div>

          {/* Card 2: O Diferencial (Largo - col-span-3 ocupando linha inteira) */}
          <div className="md:col-span-3 glass-card p-8 md:p-16 border border-white/5 rounded-3xl flex flex-col justify-between hover:border-white/10 transition-colors group relative overflow-hidden">
            <div className="absolute top-0 right-0 text-white/5 font-thin text-9xl italic pointer-events-none tracking-tighter p-12">03</div>
            <div>
              <span className="text-[10px] tracking-[0.3em] text-[#00bffa] uppercase font-mono font-medium block mb-6">{t.card2_tag}</span>
              <h3 className="text-2xl md:text-5xl font-light tracking-tight text-white uppercase mb-8 max-w-3xl group-hover:text-[#00bffa] transition-colors leading-tight">
                {t.card2_title}
              </h3>
            </div>
            <p className="text-zinc-400 font-light text-base md:text-xl leading-relaxed max-w-4xl font-[Raleway,sans-serif]">
              {t.card2_text}
            </p>
          </div>

        </div>

        {/* Seção CTA do Rodapé da Página de Quem Sou */}
        <div className="glass-card border border-white/5 rounded-3xl p-8 md:p-20 text-center relative overflow-hidden bg-gradient-to-b from-white/[0.01] to-transparent">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#00bffa]/10 rounded-full blur-[120px] pointer-events-none" />
          <h2 className="text-3xl md:text-6xl font-light tracking-tighter mb-6 uppercase text-white leading-tight">
            {t.cta_title}
          </h2>
          <p className="text-zinc-500 font-light text-sm md:text-lg mb-12 max-w-xl mx-auto italic leading-relaxed">
            {t.cta_subtitle}
          </p>
          <a 
            href="/#precos" 
            className="btn-elite-primary inline-flex gap-3 px-10 py-5 text-xs tracking-[0.2em] font-medium"
          >
            {t.cta_btn} <ArrowRight size={16} />
          </a>
        </div>

      </div>
    </div>
  );
};
