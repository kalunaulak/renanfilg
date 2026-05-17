import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Gamepad2, Zap, ArrowRight, Activity, Gauge, Sliders } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const GAMES = {
  fortnite: { name: 'Fortnite', factor: 1.48 },
  valorant: { name: 'Valorant', factor: 1.52 },
  cs2: { name: 'Counter-Strike 2', factor: 1.50 },
  warzone: { name: 'CoD: Warzone', factor: 1.38 },
  lol: { name: 'League of Legends', factor: 1.58 }
};

const GPUS = {
  rtx40: { name: 'RTX 4070 / 4080 / 4090', gpuWeight: 1.25 },
  rtx30: { name: 'RTX 3060 / 3070 / 3080', gpuWeight: 1.15 },
  rtx20: { name: 'RTX 2060 / 2070 / 2080', gpuWeight: 1.05 },
  gtx16: { name: 'GTX 1650 / 1660 Super', gpuWeight: 0.90 },
  rx6000: { name: 'AMD RX 6600 / 6700 / 6800', gpuWeight: 1.10 }
};

const CPUS = {
  ryzenX3D: { name: 'Ryzen 7 7800X3D / 5800X3D', cpuWeight: 1.30, stabilityWeight: 1.85 },
  intelCoreI9: { name: 'Core i9 13900K / 14900K', cpuWeight: 1.25, stabilityWeight: 1.60 },
  ryzenStandard: { name: 'Ryzen 5 5600X / 7600X', cpuWeight: 1.05, stabilityWeight: 1.15 },
  intelCoreI5: { name: 'Core i5 12400F / 13400F', cpuWeight: 0.95, stabilityWeight: 1.10 }
};

export const PerformanceCalculator = () => {
  const { language } = useLanguage();
  const isEn = language?.startsWith('en');

  // Input de FPS real do usuário
  const [currentFPS, setCurrentFPS] = useState(140);
  const [selectedGame, setSelectedGame] = useState('fortnite');
  const [selectedGPU, setSelectedGPU] = useState('rtx30');
  const [selectedCPU, setSelectedCPU] = useState('ryzenX3D');

  const [results, setResults] = useState({
    beforeFPS: 0,
    afterFPS: 0,
    beforeLow: 0,
    afterLow: 0,
    beforeLag: 0,
    afterLag: 0,
    percentBoost: 0
  });

  const t = {
    pt: {
      tag: 'Tuning Científico',
      title: 'CALCULE SEU FPS BOOST REAL.',
      subtitle: 'Informe seu desempenho atual e as especificações de hardware. O simulador aplicará coeficientes reais obtidos em nossos benchmarks para calcular seu novo patamar de FPS e estabilidade.',
      fpsInputLabel: 'Seu FPS Médio Atual',
      selectGame: 'Selecione seu Jogo',
      selectGPU: 'Sua Placa de Vídeo',
      selectCPU: 'Seu Processador',
      avgFPS: 'Média de FPS',
      low1: 'Estabilidade (1% Low)',
      inputLag: 'Input Lag do Sistema',
      cta: 'AGENDAR OTIMIZAÇÃO DESTE SETUP',
      lagDesc: 'Média de latência do clique ao pixel',
      fpsDesc: 'Estabilidade em tiroteios intensos',
      disclaimer: '*O cálculo aplica coeficientes de ganho real mapeados em laboratório. O rendimento final é influenciado pelas condições físicas e térmicas das peças do usuário.'
    },
    en: {
      tag: 'Scientific Tuning',
      title: 'CALCULATE YOUR REAL FPS BOOST.',
      subtitle: 'Enter your current performance and hardware specs. The simulator will apply real coefficients mapped in our benchmarks to calculate your new FPS ceiling and stability.',
      fpsInputLabel: 'Your Current Avg FPS',
      selectGame: 'Select your Game',
      selectGPU: 'Your Graphics Card (GPU)',
      selectCPU: 'Your Processor (CPU)',
      avgFPS: 'Average FPS',
      low1: 'Stability (1% Low)',
      inputLag: 'System Input Lag',
      cta: 'SCHEDULE OPTIMIZATION FOR THIS SETUP',
      lagDesc: 'Average click-to-pixel latency',
      fpsDesc: 'Stability in heavy gunfights',
      disclaimer: '*Calculation applies real gain coefficients mapped in laboratory. Final yield is influenced by the physical and thermal conditions of the user parts.'
    }
  }[isEn ? 'en' : 'pt'];

  useEffect(() => {
    const game = GAMES[selectedGame];
    const gpu = GPUS[selectedGPU];
    const cpu = CPUS[selectedCPU];

    // FPS base informado pelo usuário
    const beforeFPS = Math.max(30, Math.min(800, Number(currentFPS) || 140));
    
    // Coeficiente dinâmico de gargalo (Tuning Potential)
    // Se GPU é forte mas CPU é médio, o ganho percentual é maior por conta do destravamento de gargalo
    const bottleneckRatio = gpu.gpuWeight / cpu.cpuWeight;
    const baseBoostMultiplier = game.factor; // ex: 1.48 para Fortnite
    
    // Ajuste fino do ganho de FPS baseado na combinação
    // Quanto maior a GPU e menor o CPU, maior o ganho com otimização de CPU (Windows/BIOS/RAM)
    const dynamicBoostFactor = baseBoostMultiplier * (1 + Math.max(-0.08, Math.min(0.12, (bottleneckRatio - 1) * 0.2)));
    
    const afterFPS = Math.round(beforeFPS * dynamicBoostFactor);
    
    // 1% Low (estabilidade): Originalmente é ~50% a 58% do FPS médio
    const beforeLow = Math.round(beforeFPS * 0.55);
    
    // Chips X3D e Intel i9 ganham saltos absurdos de estabilidade mínima (1% Low) com RAM Tuning
    const stabilityMultiplier = dynamicBoostFactor * (cpu.stabilityWeight / 1.15);
    const afterLow = Math.round(beforeLow * stabilityMultiplier);

    // Input lag em milissegundos
    // Antes da otimização, há um overhead de processamento do sistema e kernel de ~7.5ms a ~11.5ms
    const systemOverheadBefore = 8.5 * (1.2 / cpu.cpuWeight);
    const beforeLag = parseFloat((1000 / beforeFPS + systemOverheadBefore).toFixed(1));
    
    // Depois da otimização, o overhead de processamento sistêmico é atenuado para a faixa de ~2.4ms a ~3.2ms
    const systemOverheadAfter = 2.8;
    const afterLag = parseFloat((1000 / afterFPS + systemOverheadAfter).toFixed(1));

    const percentBoost = Math.round(((afterFPS - beforeFPS) / beforeFPS) * 100);

    setResults({
      beforeFPS,
      afterFPS,
      beforeLow,
      afterLow,
      beforeLag,
      afterLag,
      percentBoost
    });
  }, [currentFPS, selectedGame, selectedGPU, selectedCPU]);

  const handleWhatsAppSimulation = () => {
    const gameName = GAMES[selectedGame].name;
    const gpuName = GPUS[selectedGPU].name;
    const cpuName = CPUS[selectedCPU].name;

    const message = isEn
      ? `Hello Renan! I simulated my setup on your site: GPU: ${gpuName}, CPU: ${cpuName}, playing ${gameName}. My current average is ${results.beforeFPS} FPS. The scientific simulation showed a boost to ${results.afterFPS} FPS (+${results.percentBoost}%) and input lag dropping from ${results.beforeLag}ms to ${results.afterLag}ms. I want to schedule a tuning session!`
      : `Olá Renan! Simulei meu setup no seu site: GPU: ${gpuName}, CPU: ${cpuName}, jogando ${gameName}. Minha média atual é ${results.beforeFPS} FPS. A simulação científica indicou um ganho para ${results.afterFPS} FPS (+${results.percentBoost}%) e input lag caindo de ${results.beforeLag}ms para ${results.afterLag}ms. Quero agendar a otimização!`;

    window.open(`https://wa.me/5547991914050?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section className="py-16 md:py-32 px-6 md:px-8 border-t border-white/[0.03] bg-gradient-to-b from-[#020202] via-[#050505] to-[#020202] relative overflow-hidden">
      {/* Background neon ambient lights */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-[#00bffa]/[0.02] blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[#005eea]/[0.02] blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00bffa]/20 bg-[#00bffa]/[0.03] mb-4 text-[#00bffa] text-[9px] uppercase tracking-widest font-semibold shadow-[0_0_15px_rgba(0,191,250,0.08)]">
            <Activity className="w-3 h-3 animate-pulse" /> {t.tag}
          </div>
          <h2 className="text-4xl md:text-7xl font-light tracking-tighter text-white mb-6 uppercase leading-none">
            {t.title}
          </h2>
          <p className="text-zinc-500 text-lg font-light max-w-3xl mx-auto italic leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Controls Box (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between glass-card p-6 md:p-10 border border-white/5 bg-zinc-950/20 backdrop-blur-2xl rounded-3xl relative">
            <div className="hidden md:block absolute top-0 right-0 p-8 text-white/2 font-thin text-5xl italic pointer-events-none tracking-tighter">CALC</div>
            
            <div className="space-y-8">
              {/* FPS Input (Slider + Box) */}
              <div className="space-y-3">
                <div className="flex justify-between items-baseline px-1">
                  <label className="text-[9px] font-semibold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                    <Sliders className="w-3.5 h-3.5 text-[#00bffa]" /> {t.fpsInputLabel}
                  </label>
                  <span className="text-[#00bffa] font-mono font-bold text-sm">{currentFPS} FPS</span>
                </div>
                
                <div className="flex items-center gap-4">
                  <input 
                    type="range" 
                    min="40" 
                    max="500" 
                    step="5"
                    value={currentFPS} 
                    onChange={(e) => setCurrentFPS(Number(e.target.value))}
                    className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#00bffa]"
                  />
                  <input 
                    type="number"
                    min="30"
                    max="999"
                    value={currentFPS}
                    onChange={(e) => setCurrentFPS(Math.min(999, Math.max(1, Number(e.target.value) || 0)))}
                    className="w-16 bg-zinc-950 border border-white/10 rounded-lg py-1.5 text-center text-xs font-mono text-white focus:outline-none focus:border-[#00bffa]/40"
                  />
                </div>
              </div>

              {/* Game Selector */}
              <div className="space-y-3">
                <label className="text-[9px] font-semibold text-zinc-500 uppercase tracking-widest px-1 flex items-center gap-2">
                  <Gamepad2 className="w-3.5 h-3.5 text-[#00bffa]" /> {t.selectGame}
                </label>
                <select 
                  value={selectedGame} 
                  onChange={(e) => setSelectedGame(e.target.value)}
                  className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-4 text-xs font-semibold text-white focus:outline-none focus:border-[#00bffa]/40 focus:bg-zinc-900 transition-all font-sans cursor-pointer"
                >
                  {Object.entries(GAMES).map(([key, val]) => (
                    <option key={key} value={key} className="bg-zinc-950 text-white font-sans font-normal py-2">{val.name}</option>
                  ))}
                </select>
              </div>

              {/* GPU Selector */}
              <div className="space-y-3">
                <label className="text-[9px] font-semibold text-zinc-500 uppercase tracking-widest px-1 flex items-center gap-2">
                  <Gauge className="w-3.5 h-3.5 text-[#00bffa]" /> {t.selectGPU}
                </label>
                <select 
                  value={selectedGPU} 
                  onChange={(e) => setSelectedGPU(e.target.value)}
                  className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-4 text-xs font-semibold text-white focus:outline-none focus:border-[#00bffa]/40 focus:bg-zinc-900 transition-all font-sans cursor-pointer"
                >
                  {Object.entries(GPUS).map(([key, val]) => (
                    <option key={key} value={key} className="bg-zinc-950 text-white font-sans font-normal py-2">{val.name}</option>
                  ))}
                </select>
              </div>

              {/* CPU Selector */}
              <div className="space-y-3">
                <label className="text-[9px] font-semibold text-zinc-500 uppercase tracking-widest px-1 flex items-center gap-2">
                  <Cpu className="w-3.5 h-3.5 text-[#00bffa]" /> {t.selectCPU}
                </label>
                <select 
                  value={selectedCPU} 
                  onChange={(e) => setSelectedCPU(e.target.value)}
                  className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-4 text-xs font-semibold text-white focus:outline-none focus:border-[#00bffa]/40 focus:bg-zinc-900 transition-all font-sans cursor-pointer"
                >
                  {Object.entries(CPUS).map(([key, val]) => (
                    <option key={key} value={key} className="bg-zinc-950 text-white font-sans font-normal py-2">{val.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <p className="text-[10px] text-zinc-600 font-light italic leading-normal mt-10">
              {t.disclaimer}
            </p>
          </div>

          {/* Results Visualizer Box (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between glass-card p-6 md:p-10 border border-white/5 shadow-[0_0_60px_rgba(0,191,250,0.03)] rounded-3xl relative overflow-hidden">
            
            {/* Grid background lines */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_100%)] pointer-events-none"></div>

            <div className="relative z-10 space-y-8">
              
              {/* Dynamic Boost Badge */}
              <div className="flex justify-between items-center border-b border-white/5 pb-6">
                <div>
                  <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Setup Tuning Potential</span>
                  <div className="text-[10px] font-light text-zinc-400 mt-1">Estabilidade Geral Aprimorada</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-zinc-400 font-mono">BOOST</span>
                  <motion.div
                    key={results.percentBoost}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#00bffa] to-[#005eea] text-black font-mono font-bold text-lg shadow-[0_0_20px_rgba(0,191,250,0.3)]"
                  >
                    +{results.percentBoost}%
                  </motion.div>
                </div>
              </div>

              {/* Stat 1: Avg FPS */}
              <div className="space-y-3">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs font-light text-zinc-400 uppercase tracking-widest">{t.avgFPS}</span>
                  <span className="text-zinc-500 text-xs font-light">
                    <span className="font-mono">{results.beforeFPS} FPS</span> → <span className="font-mono text-white font-bold drop-shadow-[0_0_10px_rgba(255,255,255,0.15)]">{results.afterFPS} FPS</span>
                  </span>
                </div>
                <div className="h-2 w-full bg-white/[0.03] rounded-full overflow-hidden relative">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, (results.afterFPS / 900) * 100)}%` }}
                    transition={{ type: 'spring', stiffness: 50 }}
                    className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-[#00bffa]/40 to-[#00bffa] rounded-full shadow-[0_0_10px_#00bffa]"
                  />
                  <div className="absolute top-0 bottom-0 left-0 bg-[#005eea] rounded-full" style={{ width: `${Math.min(100, (results.beforeFPS / 900) * 100)}%` }}></div>
                </div>
              </div>

              {/* Stat 2: 1% Low FPS */}
              <div className="space-y-3">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs font-light text-zinc-400 uppercase tracking-widest">{t.low1}</span>
                  <span className="text-zinc-500 text-xs font-light">
                    <span className="font-mono">{results.beforeLow} FPS</span> → <span className="font-mono text-[#00bffa] font-bold drop-shadow-[0_0_10px_rgba(0,191,250,0.2)]">{results.afterLow} FPS</span>
                  </span>
                </div>
                <div className="h-2 w-full bg-white/[0.03] rounded-full overflow-hidden relative">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, (results.afterLow / 800) * 100)}%` }}
                    transition={{ type: 'spring', stiffness: 50 }}
                    className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-[#00bffa]/40 to-[#00bffa] rounded-full shadow-[0_0_10px_#00bffa]"
                  />
                  <div className="absolute top-0 bottom-0 left-0 bg-[#005eea]/50 rounded-full" style={{ width: `${Math.min(100, (results.beforeLow / 800) * 100)}%` }}></div>
                </div>
                <p className="text-[9px] text-zinc-600 font-light italic">{t.fpsDesc}</p>
              </div>

              {/* Stat 3: Input Lag */}
              <div className="space-y-3">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs font-light text-zinc-400 uppercase tracking-widest">{t.inputLag}</span>
                  <span className="text-zinc-500 text-xs font-light font-mono">
                    {results.beforeLag}ms → <span className="text-green-400 font-bold drop-shadow-[0_0_10px_rgba(74,222,128,0.2)]">{results.afterLag}ms</span>
                  </span>
                </div>
                <div className="h-2 w-full bg-white/[0.03] rounded-full overflow-hidden relative">
                  <motion.div 
                    initial={{ width: '100%' }}
                    animate={{ width: `${Math.min(100, (results.afterLag / 40) * 100)}%` }}
                    transition={{ type: 'spring', stiffness: 50 }}
                    className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full shadow-[0_0_10px_rgba(74,222,128,0.5)]"
                  />
                  <div className="absolute top-0 bottom-0 left-0 bg-red-500/50 rounded-full" style={{ width: `${Math.min(100, (results.beforeLag / 40) * 100)}%` }}></div>
                </div>
                <p className="text-[9px] text-zinc-600 font-light italic">{t.lagDesc}</p>
              </div>
            </div>

            <button 
              onClick={handleWhatsAppSimulation}
              className="btn-elite-primary w-full mt-10 !py-6 group text-xs tracking-[0.2em] relative z-10 flex justify-center items-center gap-2"
            >
              {t.cta} <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
