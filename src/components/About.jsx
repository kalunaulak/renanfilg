import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import renanImg from '../assets/renan_profile.png';

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
      tag: "THE ALCHEMIST OF HARDWARE",
      title_first: "RENAN",
      title_last: "FILGUEIRAS",
      subtitle: "O engenheiro de performance por trás dos setups dos maiores atletas de e-sports e criadores de conteúdo da América Latina.",
      
      stat1_num: "+1.500",
      stat1_label: "Setups Otimizados",
      stat2_num: "0.00ms",
      stat2_label: "Input Lag de Mouse",
      stat3_num: "+35%",
      stat3_label: "Estabilidade 1% Low",
      stat4_num: "+100",
      stat4_label: "Pro Players da Elite",

      card1_tag: "A Trajetória",
      card1_title: "A busca obsessiva pelo milissegundo perfeito.",
      card1_text: "Iniciado pela mesma dor que atinge milhares de gamers: a frustração com o stuttering. O que começou como estudos minuciosos sobre os registros internos do Windows evoluiu para um protocolo cirúrgico adotado pela elite dos e-sports. Para mim, 1ms de delay é inaceitável.",

      card2_tag: "O Diferencial",
      card2_title: "Calibração física real. Sem softwares mágicos.",
      card2_text: "Enquanto a internet consome scripts que quebram o sistema, eu trabalho como um cirurgião de hardware. Calibramos os limites físicos da BIOS da sua placa-mãe. Ajustamos tensões (undervolt) para derrubar até 15ºC e apertamos os subtimings da memória RAM para que tudo rode em absoluta sincronia.",

      card3_tag: "Segurança",
      card3_title: "O máximo potencial. Zero degradação.",
      card3_text: "Todo o processo é ancorado em testes de estresse rigorosos. Não utilizo overclocks brutos ou agressivos. O objetivo é a calibração saudável: despertar o potencial que a fabricante limitou de fábrica, reduzindo o calor e preservando a vida útil de peças que custam milhares de reais.",

      cta_title: "Velocidade absoluta.",
      cta_subtitle: "Jogue com a mesma fluidez, latência zero e taxa de quadros exigida pelos campeões mundiais.",
      cta_btn: "AGENDAR OTIMIZAÇÃO"
    },
    en: {
      back: "Back",
      tag: "THE ALCHEMIST OF HARDWARE",
      title_first: "RENAN",
      title_last: "FILGUEIRAS",
      subtitle: "The performance engineer behind the setups of the biggest esports athletes and content creators in Latin America.",
      
      stat1_num: "+1,500",
      stat1_label: "Setups Optimized",
      stat2_num: "0.00ms",
      stat2_label: "Mouse Input Lag",
      stat3_num: "+35%",
      stat3_label: "1% Low Stability",
      stat4_num: "+100",
      stat4_label: "Elite Pro Players",

      card1_tag: "The Journey",
      card1_title: "The obsessive quest for the perfect millisecond.",
      card1_text: "Started by the same pain that hits thousands of gamers: the frustration with stuttering. What began as deep studies into Windows internal registries evolved into a surgical protocol adopted by the esports elite. To me, a 1ms delay is unacceptable.",

      card2_tag: "The Difference",
      card2_title: "Real physical tuning. No magic software.",
      card2_text: "While the internet consumes scripts that break the system, I work like a hardware surgeon. We calibrate the physical limits of your motherboard's BIOS. We adjust voltages (undervolting) to drop up to 15ºC and tighten RAM subtimings so everything runs in absolute harmony.",

      card3_tag: "Safety",
      card3_title: "Maximum potential. Zero degradation.",
      card3_text: "The whole process is anchored in rigorous stress tests. I do not use brute or aggressive overclocks. The goal is healthy calibration: awakening the potential limited by manufacturers at the factory, reducing heat, and preserving the lifespan of highly expensive hardware.",

      cta_title: "Absolute Speed.",
      cta_subtitle: "Play with the exact same fluidity, zero latency, and framerates demanded by world champions.",
      cta_btn: "BOOK OPTIMIZATION"
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

      {/* Hero Section: Editorial Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[90vh] lg:min-h-screen border-b border-white/5">
        
        {/* Coluna da Imagem (Esquerda) */}
        <div className="lg:col-span-5 relative h-[50vh] lg:h-full order-2 lg:order-1 overflow-hidden">
          {/* Degradês para fundir a imagem com o fundo preto */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-[#020202]/20 lg:to-[#020202] z-10"></div>
          
          <img 
            src={renanImg} 
            alt="Renan Filgueiras" 
            className="w-full h-full object-cover object-top lg:object-center grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-1000"
          />
          
          <div className="absolute bottom-8 left-8 z-20 hidden lg:block">
            <div className="text-[9px] tracking-[0.5em] uppercase text-zinc-600 transform -rotate-90 origin-bottom-left absolute bottom-full left-0 whitespace-nowrap mb-8">
              EST. 2024
            </div>
          </div>
        </div>

        {/* Coluna de Conteúdo (Direita) */}
        <div className="lg:col-span-7 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-24 relative z-20 order-1 lg:order-2">
          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} 
            className="max-w-2xl"
          >
            <span className="text-[9px] tracking-[0.4em] text-[#00bffa] uppercase block mb-12 font-light">
              {t.tag}
            </span>
            
            <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-thin uppercase leading-[0.85] tracking-tighter mb-12">
              {t.title_first} <br/>
              <span className="font-medium italic bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
                {t.title_last}
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-zinc-400 font-light leading-relaxed tracking-tight font-[Raleway,sans-serif] mb-20 italic">
              "{t.subtitle}"
            </p>

            {/* Métricas Puristas (Grid Minimalista) */}
            <div className="grid grid-cols-2 gap-x-12 gap-y-16 pt-16 border-t border-white/10">
              {[
                { num: t.stat1_num, label: t.stat1_label },
                { num: t.stat2_num, label: t.stat2_label },
                { num: t.stat3_num, label: t.stat3_label },
                { num: t.stat4_num, label: t.stat4_label }
              ].map((stat, idx) => (
                <div key={idx} className="flex flex-col group">
                  <span className="text-4xl md:text-6xl font-[Helvetica,Arial,sans-serif] font-bold italic tracking-tighter mb-4 text-white group-hover:text-[#00bffa] transition-colors duration-500">
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
          className="inline-flex items-center gap-4 px-12 py-5 bg-white text-black hover:bg-zinc-200 transition-colors text-[10px] tracking-[0.4em] uppercase font-bold rounded-full"
        >
          {t.cta_btn} <ArrowRight size={14} />
        </a>
      </div>

    </div>
  );
};
