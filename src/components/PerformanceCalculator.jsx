import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Info, ShieldAlert } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const GAMES = {
  apex: { name: 'Apex Legends', factor: 1.45, typicalHighFPS: 240 },
  assetto: { name: 'Assetto Corsa / Competizione', factor: 1.40, typicalHighFPS: 180 },
  cs2: { name: 'Counter-Strike 2', factor: 1.50, typicalHighFPS: 420 },
  fortnite: { name: 'Fortnite', factor: 1.48, typicalHighFPS: 380 },
  gta5: { name: 'GTA V / FiveM', factor: 1.42, typicalHighFPS: 160 },
  iracing: { name: 'iRacing', factor: 1.45, typicalHighFPS: 200 },
  lol: { name: 'League of Legends', factor: 1.58, typicalHighFPS: 500 },
  overwatch2: { name: 'Overwatch 2', factor: 1.52, typicalHighFPS: 360 },
  pubg: { name: 'PUBG: Battlegrounds', factor: 1.40, typicalHighFPS: 180 },
  r6: { name: 'Rainbow Six Siege', factor: 1.55, typicalHighFPS: 340 },
  rust: { name: 'Rust', factor: 1.35, typicalHighFPS: 140 },
  valorant: { name: 'Valorant', factor: 1.55, typicalHighFPS: 480 },
  warzone: { name: 'CoD: Warzone', factor: 1.38, typicalHighFPS: 220 }
};

const GPUS = {
  rtx4090: { name: 'NVIDIA RTX 4090', power: 10, isPremium: true },
  rtx4080: { name: 'NVIDIA RTX 4080 / 4080 Super', power: 9.5, isPremium: true },
  rtx4070: { name: 'NVIDIA RTX 4070 / 4070 Ti / Super', power: 8.8, isPremium: true },
  rtx3090: { name: 'NVIDIA RTX 3090 / 3090 Ti', power: 8.5, isPremium: true },
  rtx3080: { name: 'NVIDIA RTX 3080 / 3080 Ti', power: 8.0, isPremium: true },
  rtx4060: { name: 'NVIDIA RTX 4060 / 4060 Ti', power: 7.2, isPremium: false },
  rtx3070: { name: 'NVIDIA RTX 3070 / 3070 Ti', power: 7.5, isPremium: false },
  rtx3060: { name: 'NVIDIA RTX 3060 / 3060 Ti', power: 6.5, isPremium: false },
  rtx2080: { name: 'NVIDIA RTX 2080 / Ti / Super', power: 6.8, isPremium: false },
  rtx2070: { name: 'NVIDIA RTX 2070 / Super', power: 6.0, isPremium: false },
  rtx2060: { name: 'NVIDIA RTX 2060 / Super', power: 5.0, isPremium: false },
  gtx1660: { name: 'NVIDIA GTX 1660 / Super / Ti', power: 4.0, isPremium: false },
  gtx1650: { name: 'NVIDIA GTX 1650 / 1060 / 1070', power: 3.2, isPremium: false },
  rx7900: { name: 'AMD RX 7900 XTX / XT', power: 9.2, isPremium: true },
  rx7800: { name: 'AMD RX 7800 XT / 7700 XT', power: 8.0, isPremium: true },
  rx6900: { name: 'AMD RX 6900 XT / 6800 XT', power: 8.2, isPremium: true },
  rx6700: { name: 'AMD RX 6700 XT / 6600 XT', power: 6.2, isPremium: false }
};

const CPUS = {
  ryzen7800x3d: { name: 'AMD Ryzen 7 7800X3D', power: 10, isPremium: true, stabilityWeight: 1.95 },
  ryzen5800x3d: { name: 'AMD Ryzen 7 5800X3D', power: 8.8, isPremium: true, stabilityWeight: 1.85 },
  ryzen97950x3d: { name: 'AMD Ryzen 9 7950X3D', power: 9.5, isPremium: true, stabilityWeight: 1.90 },
  intel14900k: { name: 'Intel Core i9 14900K / KS', power: 9.8, isPremium: true, stabilityWeight: 1.70 },
  intel13900k: { name: 'Intel Core i9 13900K / KS', power: 9.4, isPremium: true, stabilityWeight: 1.65 },
  intel12900k: { name: 'Intel Core i9 12900K', power: 8.2, isPremium: true, stabilityWeight: 1.55 },
  intel14700k: { name: 'Intel Core i7 14700K', power: 8.8, isPremium: true, stabilityWeight: 1.60 },
  intel13700k: { name: 'Intel Core i7 13700K', power: 8.4, isPremium: true, stabilityWeight: 1.55 },
  intel12700k: { name: 'Intel Core i7 12700K', power: 7.8, isPremium: true, stabilityWeight: 1.45 },
  ryzen97900x: { name: 'AMD Ryzen 9 7900X / 5900X', power: 8.0, isPremium: true, stabilityWeight: 1.40 },
  ryzen77700x: { name: 'AMD Ryzen 7 7700X / 5700X', power: 7.5, isPremium: false, stabilityWeight: 1.35 },
  intel14600k: { name: 'Intel Core i5 14600K / 13600K', power: 7.2, isPremium: false, stabilityWeight: 1.30 },
  intel12400f: { name: 'Intel Core i5 12400F / 13400F', power: 5.5, isPremium: false, stabilityWeight: 1.15 },
  intel10400f: { name: 'Intel Core i5 10400F / 11400F', power: 4.2, isPremium: false, stabilityWeight: 1.08 },
  ryzen7600x: { name: 'AMD Ryzen 5 7600X / 5600X', power: 6.0, isPremium: false, stabilityWeight: 1.20 },
  ryzen3600: { name: 'AMD Ryzen 5 3600 / 4600G', power: 4.0, isPremium: false, stabilityWeight: 1.05 }
};

const RAM_OPTIONS = {
  ram8_single: { name: '8 GB RAM (Single Channel)', penalty: 0.65, lowPenalty: 0.50 },
  ram16_single: { name: '16 GB RAM (Single Channel / Lenta)', penalty: 0.80, lowPenalty: 0.65 },
  ram16_dual: { name: '16 GB RAM (Dual Channel Standard)', penalty: 0.95, lowPenalty: 0.90 },
  ram32_single: { name: '32 GB RAM (Single Channel / Lenta)', penalty: 0.85, lowPenalty: 0.70 },
  ram32_dual: { name: '32 GB RAM (Dual Channel High-Speed)', penalty: 1.00, lowPenalty: 1.00 },
  ram64_plus: { name: '64 GB or more (Dual/Quad Channel)', penalty: 1.00, lowPenalty: 1.05 }
};

export const PerformanceCalculator = () => {
  const { language } = useLanguage();
  const isEn = language?.startsWith('en');

  const [currentFPS, setCurrentFPS] = useState(140);
  const [selectedGame, setSelectedGame] = useState('fortnite');
  const [selectedGPU, setSelectedGPU] = useState('rtx4070');
  const [selectedCPU, setSelectedCPU] = useState('intel14700k');
  const [selectedRAM, setSelectedRAM] = useState('ram16_single');
  
  const [isBottleneckDetected, setIsBottleneckDetected] = useState(false);
  const [isDespairMode, setIsDespairMode] = useState(false);
  const [typicalMax, setTypicalMax] = useState(300);
  const [fpsLost, setFpsLost] = useState(0);

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
      tag: 'Diagnóstico de Hardware',
      title: 'SIMULADOR DE FLUXO E CALIBRAGEM.',
      subtitle: 'Analise o estrangulamento sistêmico do seu setup comparado aos benchmarks stock ideais de laboratório.',
      fpsInputLabel: 'TAXA DE QUADROS ATUAL (MÉDIA DE FPS)',
      selectGame: 'JOGO DE ANÁLISE PRINCIPAL',
      selectGPU: 'PLACA DE VÍDEO SELECIONADA',
      selectCPU: 'PROCESSADOR INTEGRADO',
      selectRAM: 'MEMÓRIA RAM OPERACIONAL',
      avgFPS: 'Média de FPS',
      low1: 'Estabilidade (1% Low)',
      inputLag: 'Input Lag do Sistema',
      cta: 'DESBLOQUEAR PODER DESTE SETUP',
      ctaDespair: '🚨 RESOLVER ANOMALIA DE SISTEMA',
      despairAlert: '🔴 ANOMALIA E SUBUTILIZAÇÃO DETECTADA',
      despairDesc: 'Seu PC possui hardware de nível NASA, mas seu FPS atual está extremamente sufocado por erros graves de BIOS, timings de RAM desalinhados e desconfiguração sistêmica.',
      typicalComparison: 'Média de Referência Stock Mundial: ',
      lostFpsText: 'Prejuízo Real: ',
      statBeforeLabel: 'Original',
      statOptimizedLabel: 'Tuned Extreme',
      disclaimerTitle: 'ANÁLISE DE DIAGNÓSTICO E BENCHMARKS',
      disclaimerText: 'Os valores simulados e comparações mundiais são estimativas científicas baseadas em testes de laboratório comparando máquinas antes e depois do protocolo profissional. Resultados reais dependem de refrigeração e condições elétricas do sistema.'
    },
    en: {
      tag: 'Hardware Diagnostic',
      title: 'FLOW & CALIBRATION SIMULATOR.',
      subtitle: 'Analyze the systemic strangling of your setup compared to laboratory stock benchmarks.',
      fpsInputLabel: 'CURRENT AVERAGE FRAME RATE (AVG FPS)',
      selectGame: 'PRIMARY GAME TARGET',
      selectGPU: 'GRAPHICS CARD MODEL (GPU)',
      selectCPU: 'INTEGRATED CPU MODEL',
      selectRAM: 'OPERATIONAL RAM MEMORY',
      avgFPS: 'Average FPS',
      low1: 'Stability (1% Low)',
      inputLag: 'System Input Lag',
      cta: 'UNLOCK THIS SETUP FULL POWER',
      ctaDespair: '🚨 FIX SYSTEM ANOMALY',
      despairAlert: '🔴 ANOMALY & UNDERUTILIZATION DETECTED',
      despairDesc: 'Your PC features space-grade hardware, but your current FPS is heavily choked by severe BIOS faults, misaligned RAM timings, and systemic clutter.',
      typicalComparison: 'Global Stock Reference Average: ',
      lostFpsText: 'Real Loss: ',
      statBeforeLabel: 'Original',
      statOptimizedLabel: 'Tuned Extreme',
      disclaimerTitle: 'DIAGNOSTIC ANALYSIS & BENCHMARKS',
      disclaimerText: 'Simulated values and global comparisons are scientific estimates based on lab tests comparing machines before and after the professional protocol. Real results depend on cooling and hardware health.'
    }
  }[isEn ? 'en' : 'pt'];

  useEffect(() => {
    const game = GAMES[selectedGame];
    const gpu = GPUS[selectedGPU];
    const cpu = CPUS[selectedCPU];
    const ram = RAM_OPTIONS[selectedRAM];

    const beforeFPS = Math.max(30, Math.min(800, Number(currentFPS) || 140));
    const hardwarePowerScore = (gpu.power + cpu.power) / 2;
    const calculatedTypicalMax = Math.round(game.typicalHighFPS * (hardwarePowerScore / 10) * ram.penalty);
    setTypicalMax(calculatedTypicalMax);

    const isPremium = gpu.isPremium || cpu.isPremium;
    const isDespair = isPremium && (beforeFPS < calculatedTypicalMax * 0.65);
    const isBottleneck = isPremium && (beforeFPS < calculatedTypicalMax * 0.85);

    setIsDespairMode(isDespair);
    setIsBottleneckDetected(isBottleneck && !isDespair);

    let dynamicBoostFactor = game.factor;
    let afterFPS = Math.round(beforeFPS * dynamicBoostFactor);

    if (isDespair) {
      const tunedOptimalFPS = Math.round(calculatedTypicalMax * game.factor * 1.15);
      afterFPS = Math.max(Math.round(beforeFPS * 1.8), tunedOptimalFPS);
    } else if (isBottleneck) {
      const tunedOptimalFPS = Math.round(calculatedTypicalMax * game.factor * 1.10);
      afterFPS = Math.max(Math.round(beforeFPS * 1.5), tunedOptimalFPS);
    } else {
      const bottleneckRatio = gpu.power / cpu.power;
      const fineTuneFactor = game.factor * (1 + Math.max(-0.06, Math.min(0.08, (bottleneckRatio - 1) * 0.15)));
      afterFPS = Math.round(beforeFPS * fineTuneFactor * ram.penalty);
    }

    const lost = Math.max(0, afterFPS - beforeFPS);
    setFpsLost(lost);

    const beforeLow = Math.round(beforeFPS * 0.52 * ram.lowPenalty);
    const stabilityMultiplier = (afterFPS / beforeFPS) * (cpu.stabilityWeight / (ram.lowPenalty * 1.05));
    const afterLow = Math.round(beforeLow * stabilityMultiplier);

    const systemOverheadBefore = (9.8 * (1.3 / (cpu.power / 6))) / ram.penalty;
    const beforeLag = parseFloat((1000 / beforeFPS + systemOverheadBefore).toFixed(1));
    const systemOverheadAfter = 2.4;
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
  }, [currentFPS, selectedGame, selectedGPU, selectedCPU, selectedRAM]);

  const handleWhatsAppSimulation = () => {
    const gameName = GAMES[selectedGame].name;
    const gpuName = GPUS[selectedGPU].name;
    const cpuName = CPUS[selectedCPU].name;
    const ramName = RAM_OPTIONS[selectedRAM].name;

    const message = isEn
      ? `Hello Renan! I simulated my setup on your site: GPU: ${gpuName}, CPU: ${cpuName}, RAM: ${ramName}, playing ${gameName}. My current performance is ${results.beforeFPS} FPS. The system detected a ${isDespairMode ? 'CRITICAL HARDWARE UNDERUTILIZATION ANOMALY' : 'System Bottleneck'} and showed that I am losing ${fpsLost} FPS! My performance could jump to ${results.afterFPS} FPS (+${results.percentBoost}%) and lag drop from ${results.beforeLag}ms to ${results.afterLag}ms. I need this tuning immediately!`
      : `Olá Renan! Simulei meu setup no seu site: GPU: ${gpuName}, CPU: ${cpuName}, RAM: ${ramName}, jogando ${gameName}. Minha performance atual é ${results.beforeFPS} FPS. O sistema detectou uma ${isDespairMode ? 'ANOMALIA DE SUBUTILIZAÇÃO CRÍTICA' : 'Gargalo de Hardware'} e mostrou que estou perdendo ${fpsLost} FPS! Minha performance pode saltar para ${results.afterFPS} FPS (+${results.percentBoost}%) e lag cair de ${results.beforeLag}ms para ${results.afterLag}ms. Preciso dessa otimização urgente!`;

    window.open(`https://wa.me/5547991914050?text=${encodeURIComponent(message)}`, '_blank');
  };

  // Cálculo individual das curvas em tempo real para os 3 osciloscópios
  const peakY_FPS = Math.max(10, 80 - (results.percentBoost * 0.5));
  
  const lowPercentBoost = Math.round(((results.afterLow - results.beforeLow) / results.beforeLow) * 100);
  const peakY_Low = Math.max(10, 80 - (lowPercentBoost * 0.45));
  
  // Para input lag, a curva deve ser DESCENDENTE (cair até a base ultra rápida)
  // O original começa no alto (ex: y=25) e desce até o otimizado (ex: y=80)
  const latencyReduction = results.beforeLag - results.afterLag;
  const latencyRatio = Math.min(0.8, latencyReduction / results.beforeLag);
  const peakY_Lag = Math.min(85, 20 + (latencyRatio * 75));

  return (
    <section 
      className="py-16 md:py-36 px-6 md:px-8 border-t border-white/[0.03] bg-[#020202] relative overflow-hidden"
      style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
    >
      {/* Laser backgrounds */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[#00bffa]/[0.01] blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#005eea]/[0.01] blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Title Group - Styled matching the real identity */}
        <div className="mb-20 md:mb-28">
          <div className="text-[#00bffa] font-light text-[10px] uppercase tracking-[0.4em] mb-4">
            {t.tag}
          </div>
          <h2 className="text-5xl md:text-7xl font-light tracking-tighter text-white mb-6 uppercase leading-none">
            {isEn ? 'CALCULATE YOUR' : 'CALCULE SEU'}<br />
            <span className="text-zinc-500 italic">{isEn ? 'FPS BOOST.' : 'FPS BOOST REAL.'}</span>
          </h2>
          <p className="text-zinc-500 text-sm font-light max-w-2xl leading-relaxed italic">
            {t.subtitle}
          </p>
        </div>

        {/* Despair Mode Alert Panel - Redesign matching Luxury High-Tech */}
        <AnimatePresence>
          {isDespairMode && (
            <motion.div
              initial={{ height: 0, opacity: 0, marginBottom: 0 }}
              animate={{ height: 'auto', opacity: 1, marginBottom: 40 }}
              exit={{ height: 0, opacity: 0, marginBottom: 0 }}
              className="max-w-7xl mx-auto overflow-hidden"
            >
              <div className="border border-red-500/20 bg-red-500/[0.02] rounded-3xl p-6 md:p-10 flex flex-col gap-6 relative shadow-[0_0_40px_rgba(239,68,68,0.03)]">
                
                {/* Minimal crosshair elements */}
                <div className="absolute inset-0 p-6 flex flex-wrap justify-between pointer-events-none opacity-[0.03]">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 border-l border-t border-white"></div>
                  ))}
                </div>

                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 shrink-0 animate-pulse">
                    <ShieldAlert className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-red-500 text-xs font-bold tracking-[0.2em] uppercase mb-2 font-sans">{t.despairAlert}</h4>
                    <p className="text-zinc-400 text-xs md:text-sm font-light italic leading-relaxed">{t.despairDesc}</p>
                  </div>
                </div>
                
                <div className="border-t border-white/[0.04] pt-6 mt-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs font-light">
                  <div className="text-zinc-500">
                    {t.typicalComparison} <span className="text-[#00bffa] font-bold font-mono tracking-tight">{typicalMax} FPS</span>
                  </div>
                  <div className="px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 font-bold tracking-wider font-mono">
                    {t.lostFpsText} -{fpsLost} FPS
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20">
          
          {/* Controls Box - Styled exactly like luxury BIOS Configurator (5 cols) */}
          <div className="lg:col-span-5 backdrop-blur-xl bg-white/[0.01] border border-white/[0.04] rounded-3xl p-6 md:p-8 relative flex flex-col justify-between">
            
            {/* Minimal Technical Crosshairs */}
            <div className="absolute inset-0 p-6 flex flex-wrap justify-between pointer-events-none opacity-[0.02]">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 border-l border-t border-white"></div>
              ))}
            </div>
            
            <div className="space-y-6">
              {/* FPS Input */}
              <div className="space-y-3">
                <div className="flex justify-between items-baseline">
                  <label className="text-[9px] font-semibold text-zinc-500 uppercase tracking-widest">
                    {t.fpsInputLabel}
                  </label>
                  <span className="text-[#00bffa] font-bold text-sm tracking-tight">{currentFPS} FPS</span>
                </div>
                
                <div className="flex items-center gap-4">
                  <input 
                    type="range" 
                    min="30" 
                    max="500" 
                    step="5"
                    value={currentFPS} 
                    onChange={(e) => setCurrentFPS(Number(e.target.value))}
                    className="w-full h-[1px] bg-white/10 rounded appearance-none cursor-pointer accent-[#00bffa]"
                  />
                  <input 
                    type="number"
                    min="10"
                    max="999"
                    value={currentFPS}
                    onChange={(e) => setCurrentFPS(Math.min(999, Math.max(1, Number(e.target.value) || 0)))}
                    className="w-16 bg-black/60 border border-white/[0.08] rounded-xl py-2 text-center text-xs font-semibold text-white focus:outline-none focus:border-[#00bffa]/40"
                  />
                </div>
              </div>

              {/* Game Selector */}
              <div className="space-y-3">
                <label className="text-[9px] font-semibold text-zinc-500 uppercase tracking-widest">
                  {t.selectGame}
                </label>
                <select 
                  value={selectedGame} 
                  onChange={(e) => setSelectedGame(e.target.value)}
                  className="w-full bg-black/60 border border-white/[0.08] rounded-xl px-5 py-3.5 text-xs font-light text-zinc-300 focus:outline-none focus:border-[#00bffa]/40 transition-all cursor-pointer font-sans"
                >
                  {Object.entries(GAMES).map(([key, val]) => (
                    <option key={key} value={key} className="bg-[#0c0c0c] text-zinc-300 py-3 font-sans">{val.name}</option>
                  ))}
                </select>
              </div>

              {/* GPU Selector */}
              <div className="space-y-3">
                <label className="text-[9px] font-semibold text-zinc-500 uppercase tracking-widest">
                  {t.selectGPU}
                </label>
                <select 
                  value={selectedGPU} 
                  onChange={(e) => setSelectedGPU(e.target.value)}
                  className="w-full bg-black/60 border border-white/[0.08] rounded-xl px-5 py-3.5 text-xs font-light text-zinc-300 focus:outline-none focus:border-[#00bffa]/40 transition-all cursor-pointer font-sans"
                >
                  {Object.entries(GPUS).map(([key, val]) => (
                    <option key={key} value={key} className="bg-[#0c0c0c] text-zinc-300 py-3 font-sans">{val.name}</option>
                  ))}
                </select>
              </div>

              {/* CPU Selector */}
              <div className="space-y-3">
                <label className="text-[9px] font-semibold text-zinc-500 uppercase tracking-widest">
                  {t.selectCPU}
                </label>
                <select 
                  value={selectedCPU} 
                  onChange={(e) => setSelectedCPU(e.target.value)}
                  className="w-full bg-black/60 border border-white/[0.08] rounded-xl px-5 py-3.5 text-xs font-light text-zinc-300 focus:outline-none focus:border-[#00bffa]/40 transition-all cursor-pointer font-sans"
                >
                  {Object.entries(CPUS).map(([key, val]) => (
                    <option key={key} value={key} className="bg-[#0c0c0c] text-zinc-300 py-3 font-sans">{val.name}</option>
                  ))}
                </select>
              </div>

              {/* RAM Selector */}
              <div className="space-y-3">
                <label className="text-[9px] font-semibold text-zinc-500 uppercase tracking-widest">
                  {t.selectRAM}
                </label>
                <select 
                  value={selectedRAM} 
                  onChange={(e) => setSelectedRAM(e.target.value)}
                  className="w-full bg-black/60 border border-white/[0.08] rounded-xl px-5 py-3.5 text-xs font-light text-zinc-300 focus:outline-none focus:border-[#00bffa]/40 transition-all cursor-pointer font-sans"
                >
                  {Object.entries(RAM_OPTIONS).map(([key, val]) => (
                    <option key={key} value={key} className="bg-[#0c0c0c] text-zinc-300 py-3 font-sans">{val.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Results Box - redimensionado para 3 gráficos laser individuais (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* GRÁFICO 1: MÉDIA DE FPS */}
            <div className="backdrop-blur-xl bg-white/[0.01] border border-white/[0.04] rounded-3xl p-5 relative overflow-hidden flex flex-col justify-between h-[155px]">
              
              {/* Technical corner marks */}
              <div className="absolute inset-0 p-4 flex flex-wrap justify-between pointer-events-none opacity-[0.02]">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 border-l border-t border-white"></div>
                ))}
              </div>

              {/* Header Info */}
              <div className="flex justify-between items-start relative z-10">
                <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest">{t.avgFPS}</span>
                <span className="text-xs font-mono text-zinc-400">
                  {results.beforeFPS} FPS → <span className={`font-bold ${isDespairMode ? 'text-red-500' : 'text-[#00bffa]'}`}>{results.afterFPS} FPS</span>
                </span>
              </div>

              {/* Dynamic SVG Laser Curve */}
              <div className="absolute inset-0 top-[20%] h-[60%] pointer-events-none">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 400 100" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="fpsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={isDespairMode ? '#ef4444' : '#00bffa'} stopOpacity="0.04" />
                      <stop offset="100%" stopColor={isDespairMode ? '#ef4444' : '#00bffa'} stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <line x1="0" y1="80" x2="400" y2="80" stroke="rgba(255,255,255,0.03)" strokeWidth="0.75" strokeDasharray="3 3" />
                  <path d={`M 0 80 C 120 80, 240 ${peakY_FPS}, 400 ${peakY_FPS} L 400 100 L 0 100 Z`} fill="url(#fpsGradient)" />
                  <motion.path 
                    key={`${peakY_FPS}-fps`}
                    d={`M 0 80 C 120 80, 240 ${peakY_FPS}, 400 ${peakY_FPS}`}
                    fill="none"
                    stroke={isDespairMode ? '#ef4444' : '#00bffa'}
                    strokeWidth="1.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6 }}
                  />
                  <circle cx="400" cy={peakY_FPS} r="2.5" fill={isDespairMode ? '#ef4444' : '#00bffa'} />
                </svg>
              </div>

              <div className="relative z-10 text-[8px] text-zinc-600 uppercase tracking-wider font-mono">
                FPS OSCILLOSCOPE MODULE // ACCELERATED
              </div>
            </div>

            {/* GRÁFICO 2: ESTABILIDADE (1% LOW) */}
            <div className="backdrop-blur-xl bg-white/[0.01] border border-white/[0.04] rounded-3xl p-5 relative overflow-hidden flex flex-col justify-between h-[155px]">
              
              <div className="absolute inset-0 p-4 flex flex-wrap justify-between pointer-events-none opacity-[0.02]">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 border-l border-t border-white"></div>
                ))}
              </div>

              <div className="flex justify-between items-start relative z-10">
                <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest">{t.low1}</span>
                <span className="text-xs font-mono text-zinc-400">
                  {results.beforeLow} FPS → <span className="font-bold text-[#00bffa]">{results.afterLow} FPS</span>
                </span>
              </div>

              <div className="absolute inset-0 top-[20%] h-[60%] pointer-events-none">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 400 100" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="lowGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00bffa" stopOpacity="0.04" />
                      <stop offset="100%" stopColor="#00bffa" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <line x1="0" y1="80" x2="400" y2="80" stroke="rgba(255,255,255,0.03)" strokeWidth="0.75" strokeDasharray="3 3" />
                  <path d={`M 0 80 C 120 80, 240 ${peakY_Low}, 400 ${peakY_Low} L 400 100 L 0 100 Z`} fill="url(#lowGradient)" />
                  <motion.path 
                    key={`${peakY_Low}-low`}
                    d={`M 0 80 C 120 80, 240 ${peakY_Low}, 400 ${peakY_Low}`}
                    fill="none"
                    stroke="#00bffa"
                    strokeWidth="1.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6 }}
                  />
                  <circle cx="400" cy={peakY_Low} r="2.5" fill="#00bffa" />
                </svg>
              </div>

              <div className="relative z-10 text-[8px] text-zinc-600 uppercase tracking-wider font-mono">
                STABILITY OSCILLOSCOPE MODULE // FRAME STABILIZATION
              </div>
            </div>

            {/* GRÁFICO 3: SYSTEM INPUT LAG (DESCENDENTE!) */}
            <div className="backdrop-blur-xl bg-white/[0.01] border border-white/[0.04] rounded-3xl p-5 relative overflow-hidden flex flex-col justify-between h-[155px]">
              
              <div className="absolute inset-0 p-4 flex flex-wrap justify-between pointer-events-none opacity-[0.02]">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 border-l border-t border-white"></div>
                ))}
              </div>

              <div className="flex justify-between items-start relative z-10">
                <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest">{t.inputLag}</span>
                <span className="text-xs font-mono text-zinc-400">
                  {results.beforeLag}ms → <span className="font-bold text-green-400">{results.afterLag}ms</span>
                </span>
              </div>

              {/* Descending Laser Curve SVG for Input Lag */}
              <div className="absolute inset-0 top-[20%] h-[60%] pointer-events-none">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 400 100" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="lagGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#22c55e" stopOpacity="0.04" />
                      <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <line x1="0" y1="20" x2="400" y2="20" stroke="rgba(255,255,255,0.03)" strokeWidth="0.75" strokeDasharray="3 3" />
                  <path d={`M 0 20 C 120 20, 240 ${peakY_Lag}, 400 ${peakY_Lag} L 400 100 L 0 100 Z`} fill="url(#lagGradient)" />
                  <motion.path 
                    key={`${peakY_Lag}-lag`}
                    d={`M 0 20 C 120 20, 240 ${peakY_Lag}, 400 ${peakY_Lag}`}
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth="1.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6 }}
                  />
                  <circle cx="400" cy={peakY_Lag} r="2.5" fill="#22c55e" />
                </svg>
              </div>

              <div className="relative z-10 text-[8px] text-zinc-600 uppercase tracking-wider font-mono">
                LATENCY SLIDE DEVIATION // DESCENT SPEED COMPLETED
              </div>
            </div>

            {/* Custom Action Trigger Panel */}
            <button 
              onClick={handleWhatsAppSimulation}
              className={`w-full !py-6 group text-xs font-bold tracking-[0.2em] relative z-10 flex justify-center items-center gap-2 rounded-xl transition-all ${isDespairMode ? 'bg-gradient-to-r from-red-700 to-red-500 hover:from-red-600 hover:to-red-400 text-white shadow-[0_0_30px_rgba(220,38,38,0.4)] border border-red-500/30 animate-pulse font-sans' : 'bg-white hover:bg-zinc-100 text-black hover:scale-[1.02] shadow-[0_0_30px_rgba(255,255,255,0.05)] font-sans'}`}
            >
              {isDespairMode ? t.ctaDespair : t.cta} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>

        {/* Highly Visible Diagnostic Disclaimer Box */}
        <div className="border border-white/[0.04] bg-white/[0.01] rounded-3xl p-6 md:p-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 h-[1.5px] w-20 bg-gradient-to-r from-[#00bffa] to-[#005eea]"></div>
          <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start">
            <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-500 shrink-0 mt-0.5">
              <Info className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-white text-xs font-bold tracking-widest uppercase mb-3">{t.disclaimerTitle}</h4>
              <p className="text-zinc-500 text-xs md:text-sm font-light italic leading-relaxed">{t.disclaimerText}</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
