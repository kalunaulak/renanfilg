import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, X, Terminal, ShieldAlert } from 'lucide-react';

export const EasterEgg = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [terminalLines, setTerminalLines] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [hasActivated, setHasActivated] = useState(false);

  const script = [
    { text: ">>> RENAN FILG HARDWARE DEEP TUNING OS [v2.01]", delay: 100 },
    { text: ">>> INICIANDO PROTOCOLO DE OVERCLOCK SAUDÁVEL E ZEROLAG...", delay: 400 },
    { text: ">>> ACESSANDO MICROCODIGO DA BIOS DO CHIPSET... [OK]", delay: 800 },
    { text: ">>> CALIBRANDO MULTIPLICADORES DA CPU: 6.20 GHz UNLOCKED 🔥", delay: 1300 },
    { text: ">>> AJUSTANDO TENSÕES DE NÚCLEO (UNDERVOLT): 935mV [ESTÁVEL -12ºC]", delay: 1800 },
    { text: ">>> APERTANDO SUBTEMPOS DA MEMÓRIA RAM: CAS Latency 14-14-14-34 [ESTÁVEL]", delay: 2400 },
    { text: ">>> PURGANDO SERVIÇOS E TELEMETRIA DO WINDOWS: 147 lixos deletados", delay: 2800 },
    { text: ">>> FLUSHING DE BUFFER DE DISPOSITIVO USB: Latência do Mouse a 0.00ms [Zerolag]", delay: 3300 },
    { text: ">>> PROTOCOLO DE PERFORMANCE CONCLUÍDO COM EXCELÊNCIA! 🚀", delay: 3800 },
    { text: ">>> MODO TURBO DEEP TUNING ATIVADO. BEM-VINDO AO CLUBE DOS 1%.", delay: 4100 }
  ];

  // Synth de som de calibração usando Web Audio API
  const playBeep = (freq, duration, type = 'sine', volume = 0.1) => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      
      if (type === 'sawtooth') {
        osc.frequency.exponentialRampToValueAtTime(freq * 3, ctx.currentTime + duration);
      }
      
      gain.gain.setValueAtTime(volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      console.log(e);
    }
  };

  const handleStart = () => {
    setIsOpen(true);
    setTerminalLines([]);
    setIsCompleted(false);
    
    // Play sci-fi start sound
    playBeep(220, 1.2, 'sawtooth', 0.15);
    
    script.forEach((line) => {
      setTimeout(() => {
        setTerminalLines((prev) => [...prev, line.text]);
        playBeep(650, 0.05, 'sine', 0.05);
      }, line.delay);
    });

    // Complete calibration
    setTimeout(() => {
      setIsCompleted(true);
      setHasActivated(true);
      window.dispatchEvent(new CustomEvent('overdrive-activated'));
      // Play sci-fi success chord
      playBeep(880, 0.8, 'sine', 0.2);
      setTimeout(() => playBeep(1320, 0.5, 'sine', 0.15), 150);
      setTimeout(() => playBeep(1760, 0.6, 'sine', 0.1), 300);
    }, 4500);
  };

  return (
    <>
      {/* Botão flutuante sutil no canto inferior esquerdo */}
      <div className="fixed bottom-6 left-6 z-[99998] hidden md:block">
        <motion.button
          onClick={handleStart}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-500 shadow-[0_0_30px_rgba(0,191,250,0.1)] group relative cursor-pointer ${
            hasActivated 
              ? 'bg-[#ff3e3e]/10 border-[#ff3e3e]/40 text-[#ff3e3e] shadow-[0_0_30px_rgba(255,62,62,0.3)]' 
              : 'bg-black/80 border-white/10 text-[#00bffa] hover:border-[#00bffa]/40'
          }`}
        >
          <Cpu size={20} className={`${hasActivated ? 'animate-pulse' : 'group-hover:rotate-180 transition-transform duration-700'}`} />
          
          {/* Tooltip */}
          <span className="absolute left-16 top-1/2 -translate-y-1/2 bg-black/90 border border-white/10 text-[9px] font-mono tracking-widest text-zinc-400 py-2 px-4 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none uppercase">
            {hasActivated ? "OVERDRIVE ON [1000+ FPS]" : "Overdrive Mode [Click]"}
          </span>
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#020202] z-[9999999] flex flex-col justify-center p-6 md:p-24 font-mono select-none"
          >
            {/* Scanlines visual effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,6px_100%] pointer-events-none" />

            <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col justify-between py-12 relative z-10">
              <div className="flex items-center justify-between border-b border-white/5 pb-6 mb-8">
                <div className="flex items-center gap-3 text-zinc-400 text-xs md:text-sm tracking-wider">
                  <Terminal size={18} className="text-[#00bffa]" />
                  <span>RENAN_FILG_BIOS_CALIBRATION.SH</span>
                </div>
                {!isCompleted ? (
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-yellow-500/20 bg-yellow-500/5 text-yellow-500 text-[10px] tracking-widest animate-pulse">
                    <ShieldAlert size={12} />
                    <span>TUNING IN PROGRESS...</span>
                  </div>
                ) : (
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="text-zinc-500 hover:text-white transition-colors flex items-center gap-2 text-xs border border-white/10 px-4 py-2 rounded-lg bg-white/2 cursor-pointer"
                  >
                    <span>CLOSE TERMINAL [ESC]</span>
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Terminal Screen Area */}
              <div className="flex-1 bg-black/40 border border-white/5 rounded-2xl p-6 md:p-10 overflow-y-auto space-y-4 shadow-inner custom-scrollbar text-left">
                {terminalLines.map((line, idx) => {
                  const isSuccess = line.includes("[OK]") || line.includes("🔥") || line.includes("1%") || line.includes("CONCLUÍDO");
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`text-xs md:text-sm tracking-tight leading-relaxed ${
                        isSuccess ? 'text-[#00bffa] font-medium' : 'text-zinc-400'
                      }`}
                    >
                      {line}
                    </motion.div>
                  );
                })}
                
                {!isCompleted && (
                  <motion.div 
                    animate={{ opacity: [1, 0, 1] }} 
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="w-2.5 h-4 bg-[#00bffa] inline-block ml-1"
                  />
                )}
              </div>

              {/* Footer status bar */}
              <div className="mt-8 flex justify-between items-center text-[10px] text-zinc-500 uppercase tracking-widest">
                <span>BASED ON VITALIC HARDWARE TUNING</span>
                <span>VOLTAGE: 0.935V | CORE FREQ: 6.2GHZ</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
