import { motion } from 'framer-motion';
import bakImg from '../assets/bak.webp';
import edImg from '../assets/ed_road_to_glory.webp';
import flakesImg from '../assets/flakes_power.webp';
import ninextImg from '../assets/nine_xt.webp';
import tonyboyImg from '../assets/tonyboy.webp';

const testimonials = [
  {
    name: "BAK",
    role: "Pro Player - LOUD",
    content: "O Protocolo mudou minha percepção de fluidez. O input lag simplesmente desapareceu.",
    image: bakImg,
    performance: "+40% FPS"
  },
  {
    name: "FLAKES POWER",
    role: "Content Creator",
    content: "Consistência é tudo no Fortnite. O Renan entregou o que ninguém conseguiu até hoje.",
    image: flakesImg,
    performance: "-12ms Latency"
  },
  {
    name: "TONYBOY",
    role: "Pro Player",
    content: "A estabilidade do frame time após a otimização é bizarra. Outro nível de gameplay.",
    image: tonyboyImg,
    performance: "Stable 0.1% Low"
  },
  {
    name: "NINE XT",
    role: "Streamer",
    content: "Minha máquina de stream agora roda como se não tivesse nada aberto. Incrível.",
    image: ninextImg,
    performance: "Max Efficiency"
  },
  {
    name: "ED ROAD TO GLORY",
    role: "Tech Expert",
    content: "A engenharia por trás desse protocolo é cirúrgica. Recomendo para qualquer entusiasta.",
    image: edImg,
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

      {/* Infinite Marquee */}
      <div className="flex relative">
        <motion.div 
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{ 
            duration: 40, 
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
              <div className="flex items-start justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden border border-white/10 grayscale group-hover:grayscale-0 transition-all duration-500">
                    <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="whitespace-normal">
                    <h4 className="text-white font-light tracking-tight text-lg uppercase leading-tight">{t.name}</h4>
                    <p className="text-[#00bffa] text-[10px] tracking-[0.2em] uppercase font-light">{t.role}</p>
                  </div>
                </div>
                <div className="text-[10px] text-zinc-600 font-mono italic">{t.performance}</div>
              </div>
              <p className="text-zinc-400 font-light text-base md:text-lg leading-relaxed italic whitespace-normal">
                "{t.content}"
              </p>
              <div className="mt-8 h-px w-16 bg-gradient-to-r from-[#00bffa]/30 to-transparent"></div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
