
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export const PerformanceComparison = () => {
  const { language } = useLanguage();
  
  const t = {
    pt: {
      tag: 'Benchmarking Real',
      title: 'RESULTADOS QUE VOCÊ SENTE.',
      desc: 'Medições feitas em ambiente controlado antes e depois da aplicação do protocolo.',
      label1: 'Input Lag (ms)',
      label2: 'Média de FPS',
      before: 'Original',
      after: 'Otimizado'
    },
    en: {
      tag: 'Real Benchmarking',
      title: 'RESULTS YOU CAN FEEL.',
      desc: 'Measurements taken in a controlled environment before and after applying the protocol.',
      label1: 'Input Lag (ms)',
      label2: 'Avg FPS',
      before: 'Original',
      after: 'Optimized'
    }
  }[language || 'pt'];
  return (
    <section className="py-40 px-10 md:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <div>
            <div className="text-performance font-light text-[10px] uppercase tracking-[0.4em] mb-4">Métricas de Performance</div>
            <h2 className="text-5xl md:text-7xl font-light tracking-tighter text-white mb-12 uppercase leading-none">
              DADOS <br />
              <span className="text-zinc-500 italic">REAIS.</span>
            </h2>
            
            <div className="space-y-10">
              {[
                { label: "FPS", val: "+42%", desc: "Aumento médio em títulos competitivos." },
                { label: "Latency", val: "-12ms", desc: "Redução de input lag sistêmico." },
                { label: "Stability", val: "100%", desc: "Zero quedas bruscas (frame drops)." }
              ].map((item, idx) => (
                <motion.div 
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="group"
                >
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="text-xl font-light text-zinc-400 group-hover:text-white transition-colors uppercase tracking-widest">{item.label}</span>
                    <span className="text-4xl font-light text-performance font-mono">{item.val}</span>
                  </div>
                  <div className="h-px w-full bg-white/[0.05] relative overflow-hidden">
                    <motion.div 
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="absolute inset-0 bg-primary-gradient origin-left opacity-30"
                    ></motion.div>
                  </div>
                  <p className="text-[10px] text-zinc-600 uppercase tracking-widest mt-2 font-light">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="glass-card p-6 md:p-12 aspect-video relative overflow-hidden flex flex-col justify-between border-white/[0.03] bg-black/40">
              
              {/* Technical Grid Crosshairs */}
              <div className="absolute inset-0 p-8 flex flex-wrap justify-between pointer-events-none opacity-10">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="w-2 h-2 border-l border-t border-white"></div>
                ))}
              </div>

              {/* Ultra-Minimalist Labels */}
              <div className="flex justify-between items-start relative z-20">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-light text-zinc-600 uppercase tracking-[0.4em]">Hardware Base</span>
                  <span className="text-3xl font-light text-zinc-500 font-mono tracking-tighter">680 <span className="text-xs opacity-50">FPS</span></span>
                </div>
                <div className="flex flex-col gap-1 text-right">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 2.5 }}
                    className="flex flex-col gap-1"
                  >
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#00bffa] animate-pulse"></div>
                      <span className="text-[10px] font-light text-[#00bffa] uppercase tracking-[0.4em] italic">RF Peak Performance</span>
                    </div>
                    <span className="text-7xl font-light text-white font-mono tracking-tighter drop-shadow-[0_0_20px_rgba(0,191,250,0.3)]">975 <span className="text-sm opacity-30 text-[#00bffa]">FPS</span></span>
                  </motion.div>
                </div>
              </div>

              {/* Animated Chart SVG */}
              <div className="absolute inset-0 top-1/4 h-3/4">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 400 200" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00bffa" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#00bffa" stopOpacity="0" />
                    </linearGradient>
                    <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="4" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* Wavy Base Line (Dashed) */}
                  <motion.path 
                    d="M 0 160 C 40 165, 100 155, 200 160 S 350 150, 400 165"
                    fill="none"
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 2 }}
                  />

                  {/* Path for the main line and the traveling pulse */}
                  <path 
                    id="mainPath"
                    d="M 0 160 C 40 140, 80 170, 120 130 S 160 150, 200 100 S 280 120, 320 60 S 380 40, 400 20"
                    fill="none"
                    stroke="transparent"
                  />

                  {/* Gradient Fill */}
                  <motion.path 
                    d="M 0 160 C 40 140, 80 170, 120 130 S 160 150, 200 100 S 280 120, 320 60 S 380 40, 400 20 L 400 200 L 0 200 Z"
                    fill="url(#chartGradient)"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 2, delay: 2 }}
                  />

                  {/* Main Wavy Line with Neon */}
                  <motion.path 
                    d="M 0 160 C 40 140, 80 170, 120 130 S 160 150, 200 100 S 280 120, 320 60 S 380 40, 400 20"
                    fill="none"
                    stroke="#00bffa"
                    strokeWidth="2.5"
                    filter="url(#neonGlow)"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 3, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
                  />

                  {/* Traveling Pulse Circle */}
                  <motion.circle r="3" fill="#fff" filter="url(#neonGlow)">
                    <animateMotion dur="4s" repeatCount="indefinite" path="M 0 160 C 40 140, 80 170, 120 130 S 160 150, 200 100 S 280 120, 320 60 S 380 40, 400 20" />
                  </motion.circle>

                  {/* Peak Marker Dot */}
                  <motion.circle 
                    cx="400" cy="20" r="4" 
                    fill="#00bffa" 
                    initial={{ scale: 0 }} 
                    whileInView={{ scale: 1 }} 
                    transition={{ delay: 3.5 }}
                    className="shadow-[0_0_20px_#00bffa]"
                  />
                </svg>
              </div>

              {/* Bottom Info Panels */}
              <div className="relative z-20 flex justify-between items-end border-t border-white/[0.05] pt-8">
                <div className="flex gap-10">
                  <div className="flex flex-col">
                    <span className="text-[8px] text-zinc-700 uppercase tracking-widest mb-1">Status</span>
                    <span className="text-[10px] text-zinc-500 uppercase font-light">Verified</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[8px] text-zinc-700 uppercase tracking-widest mb-1">Latency</span>
                    <span className="text-[10px] text-[#00bffa] uppercase font-light">-14.2ms</span>
                  </div>
                </div>
                <div className="text-[9px] text-zinc-800 uppercase tracking-[0.4em]">Hardware-Kernel Integration v4.0</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
