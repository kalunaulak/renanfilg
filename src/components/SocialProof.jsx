import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useRef, useEffect, useState } from 'react';
import bakImg from '../assets/bak.webp';
import edImg from '../assets/ed_road_to_glory.webp';
import flakesImg from '../assets/flakes_power.webp';
import ninextImg from '../assets/nine_xt.webp';
import tonyboyImg from '../assets/tonyboy.webp';
import blackoutzImg from '../assets/blackoutz.webp';

export const SocialProof = () => {
  const { language } = useLanguage();
  const containerRef = useRef(null);
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [contentWidth, setContentWidth] = useState(0);
  const x = useMotionValue(0);



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
        { name: "TONYBOY", handle: "@tonyboy", role: "Pro Player", content: "A estabilidade do frame time após a otimização é bizarra. Outro nível de gameplay.", image: tonyboyImg },
        { name: "BLACKOUTZ", handle: "@blackoutz", role: "PRO Fortnite Player & Champion", content: "O PC ficou absurdamente liso, a latência caiu muito e o FPS cravou. Diferença brutal nos torneios. Recomendo de olhos fechados!", image: blackoutzImg }
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
        { name: "TONYBOY", handle: "@tonyboy", role: "Pro Player", content: "The frame time stability after the optimization is bizarre. Another level of gameplay.", image: tonyboyImg },
        { name: "BLACKOUTZ", handle: "@blackoutz", role: "PRO Fortnite Player & Champion", content: "The PC became incredibly smooth, latency dropped heavily and the FPS locked. Brutal difference in tournaments. Highly recommend!", image: blackoutzImg }
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
    // Animação acelerada de forma fluida conforme pedido pelo usuário
    const autoSpeed = -1.5;

    const update = () => {
      if (!isDragging && !isHovered && contentWidth > 0) {
        let currentX = x.get();
        currentX += autoSpeed;

        // Looping infinito seguro fora do modo de arraste (para evitar conflitos de física)
        if (currentX <= -contentWidth) currentX += contentWidth;
        if (currentX >= 0) currentX -= contentWidth;

        x.set(currentX);
      }
      animationFrame = requestAnimationFrame(update);
    };

    animationFrame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrame);
  }, [isDragging, isHovered, contentWidth, x]);

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
          dragMomentum={false}
          dragConstraints={{ left: -contentWidth * 2, right: 0 }}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
          style={{ x, display: 'flex' }}
          className="whitespace-nowrap"
        >
          {[...t.testimonials, ...t.testimonials, ...t.testimonials].map((item, i) => (
            <div 
              key={i} 
              className="w-[300px] md:w-[600px] shrink-0 p-6 md:p-16 relative group transition-all duration-500"
            >
              <div className="flex items-start justify-between mb-10">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 md:w-24 md:h-24 rounded-full overflow-hidden border border-white/10 grayscale group-hover:grayscale-0 group-hover:scale-110 group-hover:border-[#00bffa]/50 transition-all duration-700 shadow-2xl">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-white font-medium tracking-tight text-lg md:text-2xl uppercase leading-tight group-hover:text-[#00bffa] transition-colors">{item.name}</h4>
                      {item.handle && (
                        <a href={"https://instagram.com/" + item.handle.replace('@', '')} target="_blank" rel="noopener noreferrer" className="px-2 py-0.5 rounded bg-[#00bffa]/10 border border-[#00bffa]/20 text-[#00bffa] text-[8px] font-bold tracking-widest uppercase hover:bg-[#00bffa]/20 hover:border-[#00bffa]/30 transition-colors">
                          {item.handle}
                        </a>
                      )}
                    </div>
                    <p className="text-zinc-500 text-[9px] tracking-widest uppercase font-light">{item.role}</p>
                  </div>
                </div>
              </div>
              <p className="text-zinc-400 font-thin text-sm md:text-lg leading-relaxed italic whitespace-normal group-hover:text-white transition-colors duration-700 pointer-events-none tracking-tight">
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
