import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useRef, useEffect, useState, useCallback } from 'react';
import bakImg from '../assets/bak.webp';
import edImg from '../assets/ed_road_to_glory.webp';
import flakesImg from '../assets/flakes_power.webp';
import ninextImg from '../assets/nine_xt.webp';
import tonyboyImg from '../assets/tonyboy.webp';

export const SocialProof = () => {
  const { language } = useLanguage();
  const containerRef = useRef(null);
  const scrollRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [contentWidth, setContentWidth] = useState(0);
  
  // Valor real da posição (sem mola para o teletransporte)
  const x = useMotionValue(0);
  // Mola apenas para suavizar o scroll manual, mas vamos controlar o 'jump' dela
  const springX = useSpring(x, { stiffness: 200, damping: 40, mass: 0.5 });

  const t = {
    pt: {
      tag: 'Validado por Pros',
      title_start: 'APROVADO POR',
      title_accent: 'GIGANTES.',
      testimonials: [
        { name: "BAK", handle: "@bak", role: "Streamer", content: "O moleque é absurdo no que faz, fala dele! Recomendo demais.", image: bakImg },
        { name: "FLAKES POWER", handle: "@flakespower", role: "Youtuber e Empresário", content: "Mano, o PC tava precisando de um talento e chamei o Renan. Ficou bizarro de rápido. Trampo absurdo!", image: flakesImg },
        { name: "ED", handle: "@edroadtoglory", role: "PRO Player", content: "Pra quem joga camp, qualquer delayzinho já fode a play. Ele fez a otimização aqui, tirou todo o input lag e o FPS cravou. Muito mais fluido pra buildar e dar os edits. 100% aprovado.", image: edImg },
        { name: "NINEXT", handle: "@ninextt", role: "Streamer", content: "Disparado o melhor tweaker que tem hoje no mercado. O cara sabe o que faz. Mexeu no meu setup e a diferença na fluidez do jogo é sacanagem. Confia que o moleque é brabo.", image: ninextImg },
        { name: "TONYBOY", handle: "@tonyboy", role: "Pro Player", content: "A estabilidade do frame time após a otimização é bizarra. Outro nível de gameplay.", image: tonyboyImg }
      ]
    },
    en: {
      tag: 'Validated by Pros',
      title_start: 'APPROVED BY',
      title_accent: 'GIANTS.',
      testimonials: [
        { name: "BAK", handle: "@bak", role: "Streamer", content: "The dude is insane at what he does! Highly recommend.", image: bakImg },
        { name: "FLAKES POWER", handle: "@flakespower", role: "Youtuber & Entrepreneur", content: "Man, the PC needed some love and I called Renan. It became insanely fast. Incredible work!", image: flakesImg },
        { name: "ED", handle: "@edroadtoglory", role: "PRO Player", content: "For those playing competitive, any small delay ruins the play. He did the optimization here, removed all input lag, and the FPS stayed locked. Much smoother for building and editing. 100% approved.", image: edImg },
        { name: "NINEXT", handle: "@ninextt", role: "Streamer", content: "Hands down the best tweaker on the market today. He knows what he's doing. He worked on my setup and the difference in game fluidity is crazy. Trust me, the dude is elite.", image: ninextImg },
        { name: "TONYBOY", handle: "@tonyboy", role: "Pro Player", content: "The frame time stability after the optimization is bizarre. Another level of gameplay.", image: tonyboyImg }
      ]
    }
  }[language || 'pt'];

  useEffect(() => {
    if (scrollRef.current) {
      setContentWidth(scrollRef.current.scrollWidth / 3);
    }
  }, []);

  useEffect(() => {
    let animationFrame;
    let autoSpeed = -0.8;

    const update = () => {
      let currentX = x.get();
      
      // Movimento automático
      if (!isHovered) {
        currentX += autoSpeed;
      }

      // Lógica de Wrap (Loop Infinito)
      // Se passar do limite da esquerda, pula pra direita
      if (currentX <= -contentWidth) {
        currentX += contentWidth;
      } 
      // Se passar do limite da direita (scroll manual), pula pra esquerda
      else if (currentX >= 0) {
        currentX -= contentWidth;
      }

      // Seta o valor bruto (x) e a mola (springX) simultaneamente
      // Usamos 'false' no springX se quisermos que ele pule sem animar (jump)
      x.set(currentX);
      
      animationFrame = requestAnimationFrame(update);
    };

    const handleWheel = (e) => {
      if (isHovered) {
        e.preventDefault();
        let delta = e.deltaY * 0.8;
        x.set(x.get() - delta);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }

    animationFrame = requestAnimationFrame(update);
    return () => {
      cancelAnimationFrame(animationFrame);
      if (container) container.removeEventListener('wheel', handleWheel);
    };
  }, [isHovered, contentWidth]);

  return (
    <section className="py-32 bg-black overflow-hidden border-y border-white/[0.03]">
      <div className="container mx-auto px-6 mb-20 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00bffa]/20 bg-[#00bffa]/5 mb-8">
          <span className="text-[10px] tracking-[0.3em] text-[#00bffa] uppercase font-light italic">{t.tag}</span>
        </div>
        <h2 className="text-5xl md:text-7xl font-light text-white tracking-tighter uppercase leading-none">
          {t.title_start} <br />
          <span className="bg-gradient-to-b from-[#00bffa] to-[#005eea] bg-clip-text text-transparent italic font-medium">
            {t.title_accent}
          </span>
        </h2>
      </div>

      <div 
        ref={containerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex relative cursor-grab active:cursor-grabbing select-none"
      >
        <motion.div 
          ref={scrollRef}
          style={{ x: springX, display: 'flex' }}
          className="whitespace-nowrap"
        >
          {[...t.testimonials, ...t.testimonials, ...t.testimonials].map((item, i) => (
            <div 
              key={i} 
              className="w-[320px] md:w-[500px] p-8 md:p-16 relative group transition-all duration-500"
            >
              <div className="flex items-start justify-between mb-10 pointer-events-none">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-full overflow-hidden border border-white/10 grayscale group-hover:grayscale-0 group-hover:scale-110 group-hover:border-[#00bffa]/50 transition-all duration-700 shadow-2xl">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-white font-medium tracking-tight text-xl uppercase leading-tight group-hover:text-[#00bffa] transition-colors">{item.name}</h4>
                      <div className="px-2 py-0.5 rounded bg-[#00bffa]/10 border border-[#00bffa]/20 text-[#00bffa] text-[9px] font-bold tracking-widest uppercase">{item.handle}</div>
                    </div>
                    <p className="text-zinc-500 text-[10px] tracking-widest uppercase font-light">{item.role}</p>
                  </div>
                </div>
              </div>
              <p className="text-zinc-500 font-light text-lg md:text-2xl leading-relaxed italic whitespace-normal group-hover:text-white transition-colors duration-700 pointer-events-none">
                "{item.content}"
              </p>
              <div className="mt-10 h-px w-20 bg-gradient-to-r from-[#00bffa]/40 to-transparent group-hover:w-full transition-all duration-1000"></div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
