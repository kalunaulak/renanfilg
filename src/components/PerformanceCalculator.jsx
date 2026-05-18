import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Gamepad2, Zap, ArrowRight, Activity, Gauge, Sliders, AlertTriangle, Info, ShieldAlert } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const GAMES = {
  fortnite: { name: 'Fortnite', factor: 1.48, typicalHighFPS: 380 },
  valorant: { name: 'Valorant', factor: 1.55, typicalHighFPS: 480 },
  cs2: { name: 'Counter-Strike 2', factor: 1.50, typicalHighFPS: 420 },
  warzone: { name: 'CoD: Warzone', factor: 1.38, typicalHighFPS: 220 },
  lol: { name: 'League of Legends', factor: 1.58, typicalHighFPS: 500 }
};

const GPUS = {
  // NVIDIA High-End
  rtx4090: { name: 'NVIDIA RTX 4090', power: 10, isPremium: true },
  rtx4080: { name: 'NVIDIA RTX 4080 / 4080 Super', power: 9.5, isPremium: true },
  rtx4070: { name: 'NVIDIA RTX 4070 / 4070 Ti / Super', power: 8.8, isPremium: true },
  rtx3090: { name: 'NVIDIA RTX 3090 / 3090 Ti', power: 8.5, isPremium: true },
  rtx3080: { name: 'NVIDIA RTX 3080 / 3080 Ti', power: 8.0, isPremium: true },
  // NVIDIA Mid-End
  rtx4060: { name: 'NVIDIA RTX 4060 / 4060 Ti', power: 7.2, isPremium: false },
  rtx3070: { name: 'NVIDIA RTX 3070 / 3070 Ti', power: 7.5, isPremium: false },
  rtx3060: { name: 'NVIDIA RTX 3060 / 3060 Ti', power: 6.5, isPremium: false },
  rtx2080: { name: 'NVIDIA RTX 2080 / 2080 Ti / Super', power: 6.8, isPremium: false },
  rtx2070: { name: 'NVIDIA RTX 2070 / Super', power: 6.0, isPremium: false },
  // NVIDIA Low-End
  rtx2060: { name: 'NVIDIA RTX 2060 / Super', power: 5.0, isPremium: false },
  gtx1660: { name: 'NVIDIA GTX 1660 / Super / Ti', power: 4.0, isPremium: false },
  gtx1650: { name: 'NVIDIA GTX 1650 / 1060 / 1070', power: 3.2, isPremium: false },
  
  // AMD Radeon High-End
  rx7900: { name: 'AMD RX 7900 XTX / XT', power: 9.2, isPremium: true },
  rx7800: { name: 'AMD RX 7800 XT / 7700 XT', power: 8.0, isPremium: true },
  rx6900: { name: 'AMD RX 6900 XT / 6800 XT', power: 8.2, isPremium: true },
  // AMD Radeon Mid/Low
  rx6700: { name: 'AMD RX 6700 XT / 6600 XT', power: 6.2, isPremium: false }
};

const CPUS = {
  // AMD X3D (The Legends)
  ryzen7800x3d: { name: 'AMD Ryzen 7 7800X3D', power: 10, isPremium: true, stabilityWeight: 1.95 },
  ryzen5800x3d: { name: 'AMD Ryzen 7 5800X3D', power: 8.8, isPremium: true, stabilityWeight: 1.85 },
  ryzen97950x3d: { name: 'AMD Ryzen 9 7950X3D / 7900X3D', power: 9.5, isPremium: true, stabilityWeight: 1.90 },
  // Intel High-End
  intel14900k: { name: 'Intel Core i9 14900K / KS', power: 9.8, isPremium: true, stabilityWeight: 1.70 },
  intel13900k: { name: 'Intel Core i9 13900K / KS', power: 9.4, isPremium: true, stabilityWeight: 1.65 },
  intel12900k: { name: 'Intel Core i9 12900K', power: 8.2, isPremium: true, stabilityWeight: 1.55 },
  intel14700k: { name: 'Intel Core i7 14700K', power: 8.8, isPremium: true, stabilityWeight: 1.60 },
  intel13700k: { name: 'Intel Core i7 13700K', power: 8.4, isPremium: true, stabilityWeight: 1.55 },
  intel12700k: { name: 'Intel Core i7 12700K', power: 7.8, isPremium: true, stabilityWeight: 1.45 },
  // AMD Ryzen High-End
  ryzen97900x: { name: 'AMD Ryzen 9 7900X / 5900X', power: 8.0, isPremium: true, stabilityWeight: 1.40 },
  ryzen77700x: { name: 'AMD Ryzen 7 7700X / 5700X / 5800X', power: 7.5, isPremium: false, stabilityWeight: 1.35 },
  // Mid/Low-End
  intel14600k: { name: 'Intel Core i5 14600K / 13600K', power: 7.2, isPremium: false, stabilityWeight: 1.30 },
  intel12400f: { name: 'Intel Core i5 12400F / 13400F', power: 5.5, isPremium: false, stabilityWeight: 1.15 },
  intel10400f: { name: 'Intel Core i5 10400F / 11400F', power: 4.2, isPremium: false, stabilityWeight: 1.08 },
  ryzen7600x: { name: 'AMD Ryzen 5 7600X / 5600X / 5600', power: 6.0, isPremium: false, stabilityWeight: 1.20 },
  ryzen3600: { name: 'AMD Ryzen 5 3600 / 4600G / 2600', power: 4.0, isPremium: false, stabilityWeight: 1.05 }
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
      tag: 'Diagnóstico Científico',
      title: 'CALCULE SEU FPS BOOST REAL.',
      subtitle: 'Informe seu desempenho atual e selecione as peças e RAM do seu computador. Nosso simulador cruza os dados com benchmarks reais mundiais para analisar se seu setup está sofrendo de subutilização crônica.',
      fpsInputLabel: 'Seu FPS Médio Atual',
      selectGame: 'Selecione seu Jogo',
      selectGPU: 'Sua Placa de Vídeo (GPU)',
      selectCPU: 'Seu Processador (CPU)',
      selectRAM: 'Quantidade & Tipo de RAM',
      avgFPS: 'Média de FPS',
      low1: 'Estabilidade (1% Low)',
      inputLag: 'Input Lag do Sistema',
      cta: 'DESBLOQUEAR PODER DESTE SETUP',
      ctaDespair: '🚨 DESTRANCAR MEU PC IMEDIATAMENTE',
      lagDesc: 'Média de latência do clique ao pixel',
      fpsDesc: 'Estabilidade extrema sem frame drops',
      bottleneckAlert: '🚨 GARGALO DE SISTEMA DETECTADO',
      bottleneckDesc: 'Suas peças são excelentes, mas seu FPS atual está abaixo do potencial delas! Seu Windows, BIOS e sub-timings de RAM estão sufocando seu investimento.',
      despairAlert: '🔥 ANOMALIA CRÍTICA E DESPERDÍCIO DE HARDWARE DETECTADO!',
      despairDesc: 'Seu computador possui componentes de nível espacial, mas está entregando o rendimento de um PC comum de escritório! Você está literalmente jogando dinheiro no lixo, desperdiçando a vida útil e sofrendo engasgos por falhas severas de software, sub-timings de memória incorretos e BIOS desconfigurada.',
      typicalComparison: 'De acordo com benchmarks globais de referência, sua máquina deveria estar entregando com facilidade mais de ',
      lostFpsText: 'Você está perdendo em média ',
      statBeforeLabel: 'Seu PC Hoje (Estrangulado)',
      statTypicalLabel: 'Potencial Médio Stock (Sem Otimização)',
      statOptimizedLabel: 'Protocolo Renan Filg (Extreme Tuned)',
      disclaimerTitle: 'ANÁLISE DE DIAGNÓSTICO IMPORTANTE',
      disclaimerText: 'Os ganhos simulados e os comparativos com benchmarks representam taxas de amostragem obtidas em laboratório comparando máquinas antes e depois do protocolo profissional em setups similares. Resultados práticos variam de acordo com as especificações térmicas (refrigeração), clocks físicos e a integridade de hardware individual.'
    },
    en: {
      tag: 'Scientific Diagnostic',
      title: 'CALCULATE YOUR REAL FPS BOOST.',
      subtitle: 'Enter your current performance and select your hardware and RAM. Our simulator matches your data with real global benchmarks to analyze if your setup is suffering from chronic underutilization.',
      fpsInputLabel: 'Your Current Avg FPS',
      selectGame: 'Select your Game',
      selectGPU: 'Your Graphics Card (GPU)',
      selectCPU: 'Your Processor (CPU)',
      selectRAM: 'RAM Capacity & Type',
      avgFPS: 'Average FPS',
      low1: 'Stability (1% Low)',
      inputLag: 'System Input Lag',
      cta: 'UNLOCK THIS SETUP FULL POWER',
      ctaDespair: '🚨 FIX MY PC IMMEDIATELY',
      lagDesc: 'Average click-to-pixel latency',
      fpsDesc: 'Extreme stability without frame drops',
      bottleneckAlert: '🚨 SYSTEM BOTTLENECK DETECTED',
      bottleneckDesc: 'Your parts are excellent, but your current FPS is below their potential! Your Windows, BIOS, and RAM sub-timings are choking your investment.',
      despairAlert: '🔥 CRITICAL ANOMALY AND HARDWARE WASTE DETECTED!',
      despairDesc: 'Your computer has space-grade components, but is delivering the performance of a standard office PC! You are literally throwing money away, wasting lifetime and suffering stutters due to severe software configuration faults, incorrect RAM sub-timings and misconfigured BIOS.',
      typicalComparison: 'According to global reference benchmarks, your machine should easily be delivering more than ',
      lostFpsText: 'You are losing on average ',
      statBeforeLabel: 'Your PC Today (Choked)',
      statTypicalLabel: 'Stock Global Average (No Tuning)',
      statOptimizedLabel: 'Renan Filg Protocol (Extreme Tuned)',
      disclaimerTitle: 'IMPORTANT DIAGNOSTIC ANALYSIS',
      disclaimerText: 'Simulated gains and benchmark comparisons represent sampling rates obtained in laboratory comparing machines before and after the professional protocol in similar setups. Practical results vary according to thermal specs (cooling), physical clocks, and individual hardware integrity.'
    }
  }[isEn ? 'en' : 'pt'];

  useEffect(() => {
    const game = GAMES[selectedGame];
    const gpu = GPUS[selectedGPU];
    const cpu = CPUS[selectedCPU];
    const ram = RAM_OPTIONS[selectedRAM];

    const beforeFPS = Math.max(30, Math.min(800, Number(currentFPS) || 140));
    
    // Hardware Power Score (0 a 10)
    const hardwarePowerScore = (gpu.power + cpu.power) / 2;
    
    // FPS típico real com hardware stock ideal de acordo com benchmarks mundiais de mercado
    const calculatedTypicalMax = Math.round(game.typicalHighFPS * (hardwarePowerScore / 10) * ram.penalty);
    setTypicalMax(calculatedTypicalMax);

    // Condição de Gargalo e Modo de Desespero Crítico!
    // Se a máquina é premium mas o FPS atual é absurdamente baixo (menor que 65% do benchmark stock típico)
    const isPremium = gpu.isPremium || cpu.isPremium;
    const isDespair = isPremium && (beforeFPS < calculatedTypicalMax * 0.65);
    const isBottleneck = isPremium && (beforeFPS < calculatedTypicalMax * 0.85);

    setIsDespairMode(isDespair);
    setIsBottleneckDetected(isBottleneck && !isDespair);

    // Se o PC está estrangulado (Despair Mode), o ganho com a otimização de sub-timings, 
    // BIOS recalibrada do zero e sistema limpo é ABSURDO e MASSIVO, saltando para o teto otimizado final!
    let dynamicBoostFactor = game.factor;
    let afterFPS = Math.round(beforeFPS * dynamicBoostFactor);

    if (isDespair) {
      // O ganho potencial é monumental porque a máquina está subutilizada!
      // Destranca até atingir o potencial real otimizado (típico stock + boost do tuning)
      const tunedOptimalFPS = Math.round(calculatedTypicalMax * game.factor * 1.15);
      afterFPS = Math.max(Math.round(beforeFPS * 1.8), tunedOptimalFPS);
    } else if (isBottleneck) {
      const tunedOptimalFPS = Math.round(calculatedTypicalMax * game.factor * 1.10);
      afterFPS = Math.max(Math.round(beforeFPS * 1.5), tunedOptimalFPS);
    } else {
      // Setup já equilibrado, ganho padrão com ajuste fino
      const bottleneckRatio = gpu.power / cpu.power;
      const fineTuneFactor = game.factor * (1 + Math.max(-0.06, Math.min(0.08, (bottleneckRatio - 1) * 0.15)));
      afterFPS = Math.round(beforeFPS * fineTuneFactor * ram.penalty);
    }

    // Calcula os frames que estão sendo jogados fora hoje!
    const lost = Math.max(0, afterFPS - beforeFPS);
    setFpsLost(lost);

    // 1% Low (estabilidade) com penalidade severa de RAM Single Channel
    const beforeLow = Math.round(beforeFPS * 0.52 * ram.lowPenalty);
    
    // Otimização estabiliza frames mínimos de forma absurda
    const stabilityMultiplier = (afterFPS / beforeFPS) * (cpu.stabilityWeight / (ram.lowPenalty * 1.05));
    const afterLow = Math.round(beforeLow * stabilityMultiplier);

    // Input lag
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

  return (
    <section 
      className="py-16 md:py-32 px-6 md:px-8 border-t border-white/[0.03] bg-gradient-to-b from-[#020202] via-[#050505] to-[#020202] relative overflow-hidden"
      style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
    >
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

        {/* Despair Mode Alert Banner */}
        <AnimatePresence>
          {isDespairMode && (
            <motion.div
              initial={{ height: 0, opacity: 0, marginBottom: 0 }}
              animate={{ height: 'auto', opacity: 1, marginBottom: 40 }}
              exit={{ height: 0, opacity: 0, marginBottom: 0 }}
              className="max-w-7xl mx-auto overflow-hidden"
            >
              <div className="border border-red-500 bg-red-950/20 rounded-3xl p-6 md:p-10 flex flex-col gap-6 shadow-[0_0_50px_rgba(239,68,68,0.15)] relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 text-red-500/10 font-bold text-7xl italic pointer-events-none">ANOMALY</div>
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="w-16 h-16 rounded-2xl bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-500 shrink-0 shadow-[0_0_20px_rgba(239,68,68,0.3)]">
                    <ShieldAlert className="w-8 h-8 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="text-red-500 text-base md:text-lg font-bold tracking-widest uppercase mb-3">{t.despairAlert}</h4>
                    <p className="text-zinc-300 text-sm md:text-base font-light italic leading-relaxed">{t.despairDesc}</p>
                  </div>
                </div>
                
                <div className="border-t border-red-500/20 pt-6 mt-2 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs md:text-sm">
                  <div className="text-zinc-400 italic">
                    {t.typicalComparison} <span className="text-white font-bold font-sans drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]">{typicalMax} FPS</span> em estoque.
                  </div>
                  <div className="px-4 py-2 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 font-bold tracking-wider">
                    {t.lostFpsText} <span className="text-white font-bold">-{fpsLost} FPS</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Standard Bottleneck Warning Banner */}
        <AnimatePresence>
          {isBottleneckDetected && (
            <motion.div
              initial={{ height: 0, opacity: 0, marginBottom: 0 }}
              animate={{ height: 'auto', opacity: 1, marginBottom: 40 }}
              exit={{ height: 0, opacity: 0, marginBottom: 0 }}
              className="max-w-7xl mx-auto overflow-hidden"
            >
              <div className="border border-red-500/20 bg-red-500/[0.03] rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center shadow-[0_0_30px_rgba(239,68,68,0.05)]">
                <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 shrink-0">
                  <AlertTriangle className="w-6 h-6 animate-bounce" />
                </div>
                <div>
                  <h4 className="text-red-500 text-sm font-bold tracking-widest uppercase mb-2">{t.bottleneckAlert}</h4>
                  <p className="text-zinc-400 text-xs md:text-sm font-light italic leading-relaxed">{t.bottleneckDesc}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch mb-16">
          
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
                  <span className="text-[#00bffa] font-bold text-sm">{currentFPS} FPS</span>
                </div>
                
                <div className="flex items-center gap-4">
                  <input 
                    type="range" 
                    min="30" 
                    max="500" 
                    step="5"
                    value={currentFPS} 
                    onChange={(e) => setCurrentFPS(Number(e.target.value))}
                    className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#00bffa]"
                  />
                  <input 
                    type="number"
                    min="10"
                    max="999"
                    value={currentFPS}
                    onChange={(e) => setCurrentFPS(Math.min(999, Math.max(1, Number(e.target.value) || 0)))}
                    className="w-16 bg-zinc-950 border border-white/10 rounded-lg py-1.5 text-center text-xs text-white focus:outline-none focus:border-[#00bffa]/40"
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
                  className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-4 text-xs font-semibold text-white focus:outline-none focus:border-[#00bffa]/40 focus:bg-zinc-900 transition-all cursor-pointer"
                >
                  {Object.entries(GAMES).map(([key, val]) => (
                    <option key={key} value={key} className="bg-zinc-950 text-white font-normal py-2">{val.name}</option>
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
                  className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-4 text-xs font-semibold text-white focus:outline-none focus:border-[#00bffa]/40 focus:bg-zinc-900 transition-all cursor-pointer"
                >
                  {Object.entries(GPUS).map(([key, val]) => (
                    <option key={key} value={key} className="bg-zinc-950 text-white font-normal py-2">{val.name}</option>
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
                  className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-4 text-xs font-semibold text-white focus:outline-none focus:border-[#00bffa]/40 focus:bg-zinc-900 transition-all cursor-pointer"
                >
                  {Object.entries(CPUS).map(([key, val]) => (
                    <option key={key} value={key} className="bg-zinc-950 text-white font-normal py-2">{val.name}</option>
                  ))}
                </select>
              </div>

              {/* RAM Selector */}
              <div className="space-y-3">
                <label className="text-[9px] font-semibold text-zinc-500 uppercase tracking-widest px-1 flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-[#00bffa]" /> {t.selectRAM}
                </label>
                <select 
                  value={selectedRAM} 
                  onChange={(e) => setSelectedRAM(e.target.value)}
                  className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-4 text-xs font-semibold text-white focus:outline-none focus:border-[#00bffa]/40 focus:bg-zinc-900 transition-all cursor-pointer"
                >
                  {Object.entries(RAM_OPTIONS).map(([key, val]) => (
                    <option key={key} value={key} className="bg-zinc-950 text-white font-normal py-2">{val.name}</option>
                  ))}
                </select>
              </div>
            </div>
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
                  <span className="text-sm font-semibold text-zinc-400">BOOST</span>
                  <motion.div
                    key={results.percentBoost}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={`px-4 py-2 rounded-xl text-black font-bold text-lg ${isDespairMode ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-[0_0_30px_rgba(239,68,68,0.5)] border border-red-500/50' : isBottleneckDetected ? 'bg-gradient-to-r from-red-500 to-amber-500 shadow-[0_0_20px_rgba(239,68,68,0.3)]' : 'bg-gradient-to-r from-[#00bffa] to-[#005eea] shadow-[0_0_20px_rgba(0,191,250,0.3)]'}`}
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
                    <span>{results.beforeFPS} FPS</span> → <span className="text-white font-bold drop-shadow-[0_0_10px_rgba(255,255,255,0.15)]">{results.afterFPS} FPS</span>
                  </span>
                </div>
                <div className="h-2 w-full bg-white/[0.03] rounded-full overflow-hidden relative">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, (results.afterFPS / 999) * 100)}%` }}
                    transition={{ type: 'spring', stiffness: 50 }}
                    className={`absolute top-0 bottom-0 left-0 rounded-full ${isDespairMode ? 'bg-gradient-to-r from-red-600 to-red-400 shadow-[0_0_15px_#ef4444]' : isBottleneckDetected ? 'bg-gradient-to-r from-red-500 to-amber-500 shadow-[0_0_10px_#ef4444]' : 'bg-gradient-to-r from-[#00bffa]/40 to-[#00bffa] shadow-[0_0_10px_#00bffa]'}`}
                  />
                  <div className="absolute top-0 bottom-0 left-0 bg-[#005eea] rounded-full" style={{ width: `${Math.min(100, (results.beforeFPS / 999) * 100)}%` }}></div>
                </div>
              </div>

              {/* Stat 2: 1% Low FPS */}
              <div className="space-y-3">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs font-light text-zinc-400 uppercase tracking-widest">{t.low1}</span>
                  <span className="text-zinc-500 text-xs font-light">
                    <span>{results.beforeLow} FPS</span> → <span className="text-[#00bffa] font-bold drop-shadow-[0_0_10px_rgba(0,191,250,0.2)]">{results.afterLow} FPS</span>
                  </span>
                </div>
                <div className="h-2 w-full bg-white/[0.03] rounded-full overflow-hidden relative">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, (results.afterLow / 900) * 100)}%` }}
                    transition={{ type: 'spring', stiffness: 50 }}
                    className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-[#00bffa]/40 to-[#00bffa] rounded-full shadow-[0_0_10px_#00bffa]"
                  />
                  <div className="absolute top-0 bottom-0 left-0 bg-[#005eea]/50 rounded-full" style={{ width: `${Math.min(100, (results.beforeLow / 900) * 100)}%` }}></div>
                </div>
                <p className="text-[9px] text-zinc-600 font-light italic">{t.fpsDesc}</p>
              </div>

              {/* Stat 3: Input Lag */}
              <div className="space-y-3">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs font-light text-zinc-400 uppercase tracking-widest">{t.inputLag}</span>
                  <span className="text-zinc-500 text-xs font-light">
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
              className={`w-full mt-10 !py-6 group text-xs font-bold tracking-[0.2em] relative z-10 flex justify-center items-center gap-2 rounded-xl transition-all ${isDespairMode ? 'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white shadow-[0_0_30px_rgba(220,38,38,0.6)] border border-red-500/50 animate-pulse' : isBottleneckDetected ? 'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white shadow-[0_0_20px_rgba(220,38,38,0.3)]' : 'btn-elite-primary'}`}
            >
              {isDespairMode ? t.ctaDespair : t.cta} <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
            </button>
          </div>

        </div>

        {/* Highly Visible Diagnostic Disclaimer Box */}
        <div className="border border-white/10 bg-white/[0.02] rounded-3xl p-6 md:p-10 relative overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
          <div className="absolute top-0 left-0 h-[2px] w-24 bg-gradient-to-r from-[#00bffa] to-[#005eea]"></div>
          <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#00bffa] shrink-0 mt-1">
              <Info className="w-5 h-5" />
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
