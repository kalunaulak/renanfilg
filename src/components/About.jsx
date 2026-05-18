import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

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
      back: "Voltar",
      tag: "ENGENHARIA DE PERFORMANCE",
      title_first: "RENAN",
      title_last: "FILGUEIRAS",
      subtitle: "A engenharia exata por trás da latência zero nos setups da elite do e-sports latino-americano.",
      
      stat1_num: "+3.500",
      stat1_label: "Setups Calibrados",
      stat2_num: "0.00ms",
      stat2_label: "DPC Latency Alvo",
      stat3_num: "+35%",
      stat3_label: "Estabilidade de Frame Time",
      stat4_num: "+100",
      stat4_label: "Atletas de Alto Rendimento",

      card1_tag: "A Metodologia",
      card1_title: "A matemática exata por trás da latência zero.",
      card1_text: "Não acredito em sorte ou 'boosters' milagrosos no competitivo. Acredito em DPC Latency nula, interrupções de hardware (IRQs) isoladas e estabilidade absoluta de frame time. Minha metodologia nasceu da engenharia reversa para entender o motivo de máquinas de altíssimo custo apresentarem 'micro-stutters' em torneios decisivos. O resultado é um protocolo lógico, cirúrgico e adotado pela elite dos e-sports.",

      card2_tag: "Deep Calibration",
      card2_title: "Além do software. Eu reescrevo as regras do seu hardware.",
      card2_text: "A indústria opera com margens de segurança genéricas que sufocam a sua máquina. Meu trabalho não envolve 'scripts de internet' que corrompem o SO. Nós entramos na BIOS e aplicamos calibrações milimétricas: ajustamos a curva de tensão/frequência (V/F), otimizamos o Load-Line Calibration (LLC) contra Vdroop, e apertamos cirurgicamente os subtimings (tFAW, tREFI, tRFC) da sua memória RAM para extrair toda a banda do controlador (IMC).",

      card3_tag: "Integridade",
      card3_title: "Performance extrema sem degradação térmica.",
      card3_text: "Performance máxima não significa fritar seus componentes. Meu protocolo de estresse utiliza métricas industriais para garantir estabilidade 24/7 sem qualquer erro de WHEA. A verdadeira calibração reduz a carga térmica das VRMs, mitigando o Thermal Throttling, o que permite extrair um ganho brutal de performance enquanto o seu setup roda até 15ºC mais frio.",

      roadmap_title: "A Linha do Tempo",
      roadmap: [
        {
          year: "2018",
          title: "Engenharia Reversa",
          desc: "O início da pesquisa sobre gargalos do kernel do Windows e manipulação de registros para mitigação de micro-stutters."
        },
        {
          year: "2020",
          title: "Protocolo de BIOS",
          desc: "Transição do software para o hardware. Início dos testes de estresse industriais e otimização de subtimings de RAM e V/F Curve."
        },
        {
          year: "2022",
          title: "A Elite dos E-sports",
          desc: "Adoção oficial da nossa metodologia de calibração por atletas competitivos Tier 1 (LOUD, Furia) e influenciadores de peso."
        },
        {
          year: "2024",
          title: "Autoridade Consolidada",
          desc: "Ultrapassamos a marca de 3.500 setups cirurgicamente calibrados, consolidando a RF como o padrão ouro em performance."
        }
      ],

      cta_title: "Performance não se presume. Se mede.",
      cta_subtitle: "Assuma o controle real sobre o seu hardware. Latência mínima, FPS estável e resposta imediata.",
      cta_btn: "AGENDAR CALIBRAÇÃO AGORA"
    },
    en: {
      back: "Back",
      tag: "PERFORMANCE ENGINEERING",
      title_first: "RENAN",
      title_last: "FILGUEIRAS",
      subtitle: "The precise engineering behind zero latency in the setups of Latin America's esports elite.",
      
      stat1_num: "+3,500",
      stat1_label: "Setups Calibrated",
      stat2_num: "0.00ms",
      stat2_label: "Target DPC Latency",
      stat3_num: "+35%",
      stat3_label: "Frame Time Stability",
      stat4_num: "+100",
      stat4_label: "High-Performance Athletes",

      card1_tag: "The Methodology",
      card1_title: "The exact math behind zero latency.",
      card1_text: "I don't believe in luck or miracle 'boosters' in competitive gaming. I believe in zero DPC Latency, isolated hardware interrupts (IRQs), and absolute frame time stability. My methodology was born from reverse engineering to understand why extremely expensive machines still suffer from micro-stutters in decisive tournaments. The result is a logical, surgical protocol adopted by the esports elite.",

      card2_tag: "Deep Calibration",
      card2_title: "Beyond software. I rewrite your hardware's rules.",
      card2_text: "The industry operates with generic safety margins that choke your machine. My work doesn't involve 'internet scripts' that corrupt the OS. We dive into the BIOS and apply millimeter calibrations: adjusting the voltage/frequency (V/F) curve, optimizing Load-Line Calibration (LLC) against Vdroop, and surgically tightening RAM subtimings (tFAW, tREFI, tRFC) to unleash the full bandwidth of the memory controller (IMC).",

      card3_tag: "Integrity",
      card3_title: "Extreme performance without thermal degradation.",
      card3_text: "Maximum performance does not mean frying your components. My stress protocol uses industrial metrics to guarantee 24/7 stability with zero WHEA errors. True calibration reduces the thermal load on VRMs, mitigating Thermal Throttling, allowing us to extract massive performance gains while your setup runs up to 15ºC cooler.",

      roadmap_title: "The Timeline",
      roadmap: [
        {
          year: "2018",
          title: "Reverse Engineering",
          desc: "The beginning of the research on Windows kernel bottlenecks and registry manipulation for micro-stutter mitigation."
        },
        {
          year: "2020",
          title: "BIOS Protocol",
          desc: "Transition from software to physical hardware. Start of industrial stress testing, RAM subtiming optimization, and V/F Curve tuning."
        },
        {
          year: "2022",
          title: "The Esports Elite",
          desc: "Official adoption of our calibration methodology by Tier 1 competitive athletes (LOUD, Furia) and major influencers."
        },
        {
          year: "2024",
          title: "Consolidated Authority",
          desc: "We surpassed the milestone of 3,500 surgically calibrated setups, cementing RF as the gold standard in performance."
        }
      ],

      cta_title: "Performance is not assumed. It's measured.",
      cta_subtitle: "Take real control over your hardware. Minimum latency, rock-solid FPS, and immediate response.",
      cta_btn: "BOOK CALIBRATION NOW"
    }
  }[isEn ? 'en' : 'pt'];

  return (
    <div className="bg-[#020202] min-h-screen text-white font-sans selection:bg-[#00bffa]/30 pb-32">
      
      {/* Botão flutuante de Voltar */}
      <div className="fixed top-8 left-6 md:left-12 z-[110]">
        <Link 
          to="/" 
          className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all text-[9px] tracking-[0.3em] uppercase font-light text-zinc-400 hover:text-white"
        >
          <ArrowLeft size={12} className="text-white" /> {t.back}
        </Link>
      </div>

      {/* Hero Banner Panorâmico (Proporção 100% preservada, sem recortes, texto embaixo) */}
      <div className="relative w-full bg-[#020202]">
        
        {/* Imagem de Fundo (De ponta a ponta, altura automática para não cortar nada) */}
        <div className="relative w-full">
          <img 
            src="/upscaled renan e flakes.webp.webp" 
            alt="Renan Filgueiras e Flakes Power" 
            className="w-full h-auto opacity-100 block"
          />
          {/* Degradê na base para unir com a parte preta do texto */}
          <div className="absolute bottom-0 left-0 right-0 h-32 md:h-48 bg-gradient-to-t from-[#020202] to-transparent"></div>
        </div>

        {/* Título Principal (Abaixo da foto) */}
        <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 lg:px-24 w-full pt-8 pb-12 -mt-16 md:-mt-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} 
          >
            <span className="text-[9px] tracking-[0.4em] text-[#00bffa] uppercase block mb-6 font-light drop-shadow-md">
              {t.tag}
            </span>
            
            <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-thin uppercase leading-[0.9] tracking-tighter drop-shadow-2xl">
              {t.title_first} <br/>
              <span className="font-medium italic bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
                {t.title_last}
              </span>
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Seção de Métricas e Subtítulo */}
      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24 relative z-20 -mt-4 border-b border-white/5 pb-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} 
        >
          <p className="text-xl md:text-3xl text-zinc-300 font-light leading-relaxed tracking-tight font-[Raleway,sans-serif] mb-20 italic max-w-4xl">
            "{t.subtitle}"
          </p>

          {/* Métricas Puristas (Grid Minimalista Horizontal) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 pt-16 border-t border-white/10">
            {[
              { num: t.stat1_num, label: t.stat1_label },
              { num: t.stat2_num, label: t.stat2_label },
              { num: t.stat3_num, label: t.stat3_label },
              { num: t.stat4_num, label: t.stat4_label }
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col group">
                <span className="text-3xl md:text-5xl font-[Helvetica,Arial,sans-serif] font-medium italic tracking-tighter mb-3 text-white group-hover:text-[#00bffa] transition-colors duration-500">
                  {stat.num}
                </span>
                <span className="text-[9px] tracking-[0.2em] uppercase text-zinc-500 font-medium">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Blocos Textuais Editoriais (Sem bordas de cards, apenas linhas horizontais finas) */}
      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24 pt-32">
        
        {[
          { tag: t.card1_tag, title: t.card1_title, text: t.card1_text },
          { tag: t.card2_tag, title: t.card2_title, text: t.card2_text },
          { tag: t.card3_tag, title: t.card3_title, text: t.card3_text }
        ].map((block, idx) => (
          <div key={idx} className="grid md:grid-cols-12 gap-8 md:gap-16 py-24 border-t border-white/5 relative group">
            <div className="md:col-span-4">
              <span className="text-[10px] tracking-[0.3em] uppercase text-zinc-600 group-hover:text-[#00bffa] transition-colors duration-500">
                {block.tag}
              </span>
            </div>
            <div className="md:col-span-8">
              <h2 className="text-3xl md:text-5xl font-light tracking-tighter uppercase mb-8 leading-tight text-white group-hover:text-white/90 transition-colors">
                {block.title}
              </h2>
              <p className="text-zinc-400 text-lg md:text-xl font-light leading-relaxed font-[Raleway,sans-serif] max-w-3xl">
                {block.text}
              </p>
            </div>
          </div>
        ))}
        {/* Linha final para fechar o bloco */}
        <div className="border-t border-white/5"></div>

      </div>

      {/* Interface de Roadmap / Linha do Tempo */}
      <div className="max-w-4xl mx-auto px-8 md:px-16 pt-24 pb-16">
        <div className="mb-16">
          <span className="text-[10px] tracking-[0.3em] uppercase text-zinc-600 block mb-4">
            {t.roadmap_title}
          </span>
          <h2 className="text-3xl md:text-5xl font-light tracking-tighter uppercase text-white leading-tight">
            Evolução <span className="text-[#00bffa] italic font-medium">Técnica</span>
          </h2>
        </div>

        <div className="relative border-l border-white/10 ml-4 md:ml-8 space-y-16">
          {t.roadmap.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative pl-12 md:pl-16 group"
            >
              {/* Timeline Dot Neon */}
              <div className="absolute w-3 h-3 bg-[#020202] border border-[#00bffa]/50 rounded-full -left-[6.5px] top-2 group-hover:bg-[#00bffa] group-hover:border-[#00bffa] group-hover:shadow-[0_0_15px_rgba(0,191,250,0.6)] transition-all duration-300"></div>
              
              <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 mb-4">
                <span className="text-2xl md:text-4xl font-[Helvetica,Arial,sans-serif] font-medium italic text-white/20 group-hover:text-white/40 transition-colors">
                  {item.year}
                </span>
                <h3 className="text-xl md:text-2xl font-light uppercase tracking-tight text-white group-hover:text-[#00bffa] transition-colors">
                  {item.title}
                </h3>
              </div>
              <p className="text-zinc-400 text-sm md:text-base font-light font-[Raleway,sans-serif] leading-relaxed max-w-xl">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section Minimalista */}
      <div className="max-w-4xl mx-auto px-8 py-40 text-center flex flex-col items-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#00bffa]/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="w-px h-24 bg-gradient-to-b from-white/20 to-transparent mb-16"></div>
        
        <h2 className="text-4xl md:text-7xl font-thin tracking-tighter uppercase mb-8 leading-none">
          {t.cta_title}
        </h2>
        <p className="text-zinc-500 text-lg md:text-2xl font-light font-[Raleway,sans-serif] mb-16 max-w-2xl italic leading-relaxed">
          {t.cta_subtitle}
        </p>
        
        <a 
          href="/#precos" 
          className="inline-flex items-center gap-4 px-12 py-5 bg-white text-black hover:bg-zinc-200 transition-colors text-[10px] tracking-[0.4em] uppercase font-medium rounded-full"
        >
          {t.cta_btn} <ArrowRight size={14} />
        </a>
      </div>

    </div>
  );
};
