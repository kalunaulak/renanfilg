
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
  {
    name: "Bak",
    handle: "@bak",
    link: "https://www.instagram.com/bak",
    role: "Streamer & Pro Player",
    quote: "O moleque é absurdo no que faz, fala dele! Recomendo demais.",
    image: bakImg
  },
  {
    name: "ninext",
    handle: "@ninext",
    link: "https://www.instagram.com/ninext",
    role: "Streamer & Expert",
    quote: "Disparado o melhor tweaker que tem hoje no mercado. O cara sabe o que faz. Mexeu no meu setup e a diferença na fluidez do jogo é sacanagem.",
    image: ninextImg
  },
  {
    name: "Ed",
    handle: "@edrglory",
    link: "https://www.instagram.com/edrglory",
    role: "Pro Player e Streamer",
    quote: "Pra quem joga camp, qualquer delayzinho já fode a play. Ele fez a otimização aqui, tirou todo o input lag e o FPS cravou.",
    image: edImg
  },
  {
    name: "Tonyboy",
    handle: "@tonyboy",
    link: "https://www.instagram.com/tonyboy",
    role: "Streamer & Pro Player",
    quote: "O moleque é absurdo no que faz, fala dele! Recomendo demais.",
    image: tonyboyImg
  }
];

// Double the items for seamless looping
const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials];

export const SocialProof = () => {
  return (
    <section className="py-40 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-24 text-center">
        <div className="text-[#00bffa] font-light text-[10px] uppercase tracking-[0.4em] mb-4">Social Proof</div>
        <h2 className="text-5xl md:text-7xl font-light tracking-tighter text-white uppercase leading-none">
          Aprovado por <br />
          <span className="bg-gradient-to-b from-[#00bffa] to-[#005eea] bg-clip-text text-transparent italic">Gigantes.</span>
        </h2>
      </div>

      {/* Infinite Ribbon */}
      <div className="relative w-full overflow-hidden pause-on-hover">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-64 bg-gradient-to-r from-black via-black/90 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-64 bg-gradient-to-l from-black via-black/90 to-transparent z-10 pointer-events-none"></div>

        <div className="flex w-max animate-marquee py-10">
          {duplicatedTestimonials.map((item, idx) => (
            <div
              key={idx}
              className="mx-12 w-[450px] flex-shrink-0 relative group/card"
            >
              <div className="flex items-center gap-6 mb-10">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full overflow-hidden border border-white/5 group-hover/card:border-[#00bffa]/30 transition-all duration-700">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover grayscale group-hover/card:grayscale-0 scale-110 group-hover/card:scale-100 transition-all duration-1000"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-gradient-to-br from-[#00bffa] to-[#005eea] rounded-full p-1.5 shadow-lg">
                    <BadgeCheck size={16} className="text-black" />
                  </div>
                </div>
                <div className="whitespace-normal">
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="font-medium text-white tracking-tight uppercase text-xl italic leading-none">{item.name}</h4>
                    <a 
                      href={item.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
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
