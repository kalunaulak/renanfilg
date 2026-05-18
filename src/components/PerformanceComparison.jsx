
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
      after: 'Otimizado',
      disclaimer: '*Nota: As métricas apresentadas representam médias obtidas em testes internos. Os ganhos reais são variáveis e dependem diretamente das especificações de hardware, refrigeração e condições físicas de cada computador.'
    },
    en: {
      tag: 'Real Benchmarking',
      title: 'RESULTS YOU CAN FEEL.',
      desc: 'Measurements taken in a controlled environment before and after applying the protocol.',
      label1: 'Input Lag (ms)',
      label2: 'Avg FPS',
      before: 'Original',
      after: 'Optimized',
      disclaimer: '*Note: The metrics presented represent averages obtained in internal tests. Actual gains are variable and depend directly on hardware specifications, cooling, and the physical conditions of each computer.'
    }
  }[language || 'pt'];
  return (
    <section className="py-16 md:py-40 px-6 md:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <div>
            <div className="text-performance font-light text-[10px] uppercase tracking-[0.4em] mb-4">Métricas de Performance</div>
            <h2 className="text-5xl md:text-7xl font-light tracking-tighter text-white mb-12 uppercase leading-none">
              DADOS <br />
              <span className="text-[#00bffa] italic">REAIS.</span>
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
                  <p className="text-sm md:text-xs text-zinc-400 mt-2 font-light italic">{item.desc}</p>
                </motion.div>
              ))}
            </div>
            
            <p className="text-xs md:text-sm text-zinc-400 font-light italic leading-relaxed mt-10 max-w-md">
              {t.disclaimer}
            </p>
          </div>

          <div className="relative">
            {/* Glassmorphism Card */}
            <div className="backdrop-blur-xl bg-white/[0.02] border border-white/[0.05] rounded-3xl p-6 md:p-10 relative overflow-hidden flex flex-col justify-between min-h-[350px] md:aspect-video">
              
              {/* Technical Grid Crosshairs (Extremely Subtle) */}
              <div className="absolute inset-0 p-8 flex flex-wrap justify-between pointer-events-none opacity-[0.02]">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="w-2 h-2 border-l border-t border-white"></div>
                ))}
              </div>

              {/* Minimalist Labels (No Overlap) */}
              <div className="flex justify-between items-start relative z-20 gap-4">
                <div className="flex flex-col">
                  <span className="text-[9px] font-medium text-zinc-500 uppercase tracking-widest">Base</span>
                  <span className="text-2xl md:text-3xl font-light text-zinc-400 font-mono tracking-tighter">680 <span className="text-[10px] opacity-40">FPS</span></span>
                </div>
                <div className="flex flex-col text-right">
                  <motion.div 
                    initial={{ opacity: 0, y: -5 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="flex flex-col"
                  >
                    <div className="flex items-center justify-end gap-1.5 mb-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#00bffa] animate-pulse"></div>
                      <span className="text-[9px] font-medium text-[#00bffa] uppercase tracking-widest">Otimizado</span>
                    </div>
                    <span className="text-5xl md:text-6xl font-light text-white font-mono tracking-tighter drop-shadow-[0_0_15px_rgba(0,191,250,0.25)]">966 <span className="text-xs opacity-30 text-[#00bffa]">FPS</span></span>
                  </motion.div>
                </div>
              </div>

              {/* Animated Chart SVG (Perfectly Centered & Scaled) */}
              <div className="absolute inset-0 top-[32%] h-[48%] pointer-events-none">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 400 200" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00bffa" stopOpacity="0.08" />
                      <stop offset="100%" stopColor="#00bffa" stopOpacity="0" />
                    </linearGradient>
                    <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="2" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* Clean straight Baseline (Dashed) */}
                  <motion.line 
                    x1="0" y1="160" x2="400" y2="160"
                    stroke="rgba(255,255,255,0.06)"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 1.5 }}
                  />

                  {/* Path for the elegant curve and traveling pulse */}
                  <path 
                    id="mainPath"
                    d="M 0 160 C 120 160, 240 30, 400 30"
                    fill="none"
                    stroke="transparent"
                  />

                  {/* Gradient Fill (Sleek curve shadow) */}
                  <motion.path 
                    d="M 0 160 C 120 160, 240 30, 400 30 L 400 200 L 0 200 Z"
                    fill="url(#chartGradient)"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1.5, delay: 1.2 }}
                  />

                  {/* Main Laser Line with Subtle Glow */}
                  <motion.path 
                    d="M 0 160 C 120 160, 240 30, 400 30"
                    fill="none"
                    stroke="#00bffa"
                    strokeWidth="1.5"
                    filter="url(#neonGlow)"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                  />

                  {/* Traveling Pulse Circle (Laser Tip) */}
                  <motion.circle r="2" fill="#fff" filter="url(#neonGlow)">
                    <animateMotion dur="4.5s" repeatCount="indefinite" path="M 0 160 C 120 160, 240 30, 400 30" />
                  </motion.circle>

                  {/* Peak Marker Dot */}
                  <motion.circle 
                    cx="400" cy="30" r="3" 
                    fill="#00bffa" 
                    initial={{ scale: 0 }} 
                    whileInView={{ scale: 1 }} 
                    transition={{ delay: 2.4 }}
                  />
                </svg>
              </div>

              {/* Bottom Info Panels (Mobile Responsive Stacking) */}
              <div className="relative z-20 flex flex-col sm:flex-row justify-between items-start sm:items-end border-t border-white/[0.03] pt-6 gap-4 sm:gap-0 mt-auto">
                <div className="flex gap-8">
                  <div className="flex flex-col">
                    <span className="text-[8px] text-zinc-600 uppercase tracking-widest mb-1">Status</span>
                    <span className="text-[10px] text-zinc-400 uppercase font-light">Verified</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[8px] text-zinc-600 uppercase tracking-widest mb-1">Redução Lag</span>
                    <span className="text-[10px] text-[#00bffa] uppercase font-light">-14.2ms</span>
                  </div>
                </div>
                <div className="text-[9px] text-zinc-600 uppercase tracking-wider">Kernel Integration v4.0</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
