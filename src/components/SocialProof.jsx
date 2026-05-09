
import { BadgeCheck } from 'lucide-react';
import flakesImg from '../assets/flakes_power.webp';
import bakImg from '../assets/bak.webp';
import ninextImg from '../assets/nine_xt.webp';
import edImg from '../assets/ed_road_to_glory.webp';
import tonyboyImg from '../assets/tonyboy.webp';

const testimonials = [
  {
    name: "Flakes Power",
    handle: "@flakespower",
    link: "https://www.instagram.com/flakespower",
    role: "Youtuber & Empresário",
    quote: "Mano, o PC tava precisando de um talento e chamei o Renan. Ficou bizarro de rápido. Trampo absurdo!",
    image: flakesImg
  },
    name: "BAK",
    role: "Pro Player - LOUD",
    content: "O Protocolo mudou minha percepção de fluidez. O input lag simplesmente desapareceu.",
    image: bak,
    performance: "+40% FPS"
  },
  {
    name: "FLAKES POWER",
    role: "Content Creator",
    content: "Consistência é tudo no Fortnite. O Renan entregou o que ninguém conseguiu até hoje.",
    image: flakesPower,
    performance: "-12ms Latency"
  },
  {
    name: "TONYBOY",
    role: "Pro Player",
    content: "A estabilidade do frame time após a otimização é bizarra. Outro nível de gameplay.",
    image: tonyboy,
    performance: "Stable 0.1% Low"
  },
  {
    name: "NINE XT",
    role: "Streamer",
    content: "Minha máquina de stream agora roda como se não tivesse nada aberto. Incrível.",
    image: nineXt,
    performance: "Max Efficiency"
  },
  {
    name: "ED ROAD TO GLORY",
    role: "Tech Expert",
    content: "A engenharia por trás desse protocolo é cirúrgica. Recomendo para qualquer entusiasta.",
    image: edRoadToGlory,
    performance: "Top Tier Opt"
  }
];

export const SocialProof = () => {
  return (
    <section className="py-32 bg-black overflow-hidden border-y border-white/[0.03]">
      <div className="container mx-auto px-6 mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00bffa]/20 bg-[#00bffa]/5 mb-6">
          <span className="text-[10px] tracking-[0.3em] text-[#00bffa] uppercase font-light italic">Validated by Pros</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-light text-white tracking-tighter uppercase">
          RESULTADOS <span className="text-zinc-600 italic">REAIS.</span>
        </h2>
      </div>

      {/* Infinite Marquee - Velocidade ajustada para mobile */}
      <div className="flex relative">
        <motion.div 
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{ 
            duration: 40, // Mais lento para leitura
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="flex gap-6 pr-6 whitespace-nowrap"
        >
          {[...testimonials, ...testimonials].map((t, i) => (
            <div 
              key={i}
              className="w-[320px] md:w-[450px] glass-card p-8 md:p-10 border border-white/[0.05] relative group"
            >
                      className="px-3 py-1 rounded-full bg-[#00bffa]/10 border border-[#00bffa]/20 text-[#00bffa] text-[9px] font-medium hover:bg-[#00bffa] hover:text-black transition-all duration-300"
                    >
                      {item.handle}
                    </a>
                  </div>
                  <p className="text-[10px] text-zinc-400 uppercase tracking-[0.3em] font-medium">{item.role}</p>
                </div>
              </div>
              
              <p className="text-zinc-400 text-2xl leading-tight italic font-light whitespace-normal pr-12 group-hover/card:text-white transition-colors duration-500">
                "{item.quote}"
              </p>
              
              {/* Subtle underline for separation without container */}
              <div className="mt-12 h-px w-20 bg-gradient-to-r from-[#00bffa]/20 to-transparent"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
