import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useRef, useEffect, useState } from 'react';
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
  
  const x = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 100, damping: 30, mass: 1 });

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
    const autoSpeed = -0.6;

    const update = () => {
      if (!isHovered) {
        let currentX = x.get();
        currentX += autoSpeed;

        if (currentX <= -contentWidth) currentX += contentWidth;
        if (currentX >= 0) currentX -= contentWidth;
        
        x.set(currentX);
      }
      animationFrame = requestAnimationFrame(update);
    };

    animationFrame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrame);
  }, [isHovered, contentWidth, x]);

  return (
    <section className="py-24 md:py-32 bg-black overflow-hidden border-y border-white/[0.03]">
      <div className="max-w-7xl mx-auto px-8 md:px-12 mb-20 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00bffa]/20 bg-[#00bffa]/5 mb-8">
          <span className="text-[10px] tracking-[0.3em] text-[#00bffa] uppercase font-light italic">{t.tag}</span>
        </div>
        <h2 className="text-5xl md:text-8xl font-thin text-white tracking-tighter uppercase leading-[0.85] mb-8">
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
          drag="x"
          dragConstraints={{ left: -contentWidth * 2, right: 0 }}
          onDragStart={() => setIsHovered(true)}
          onDragEnd={() => setIsHovered(false)}
          style={{ x: springX, display: 'flex' }}
          className="whitespace-nowrap"
        >
          {[...t.testimonials, ...t.testimonials, ...t.testimonials].map((item, i) => (
            <div 
              key={i} 
              className="w-[300px] md:w-[600px] p-6 md:p-16 relative group transition-all duration-500"
            >
              <div className="flex items-start justify-between mb-10 pointer-events-none">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 md:w-24 md:h-24 rounded-full overflow-hidden border border-white/10 grayscale group-hover:grayscale-0 group-hover:scale-110 group-hover:border-[#00bffa]/50 transition-all duration-700 shadow-2xl">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-white font-medium tracking-tight text-lg md:text-2xl uppercase leading-tight group-hover:text-[#00bffa] transition-colors">{item.name}</h4>
                      <div className="px-2 py-0.5 rounded bg-[#00bffa]/10 border border-[#00bffa]/20 text-[#00bffa] text-[8px] font-bold tracking-widest uppercase">{item.handle}</div>
                    </div>
                    <p className="text-zinc-500 text-[9px] tracking-widest uppercase font-light">{item.role}</p>
                  </div>
                </div>
              </div>
              <p className="text-zinc-400 font-thin text-base md:text-3xl leading-relaxed italic whitespace-normal group-hover:text-white transition-colors duration-700 pointer-events-none tracking-tight">
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
