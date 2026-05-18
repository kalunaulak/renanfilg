import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Flame, Cpu, RefreshCw } from 'lucide-react';

export const EasterEgg = ({ onOpenScreening }) => {
  const [stage, setStage] = useState('idle'); // idle, warning, bsod
  const [logs, setLogs] = useState([]);
  const [emojis, setEmojis] = useState([]);
  const audioCtxRef = useRef(null);
  const noiseSourceRef = useRef(null);
  const filterNodeRef = useRef(null);
  const gainNodeRef = useRef(null);

  const funnyLogs = [
    { text: "⚠️ [0.5s] Intel Stock CoolerBox atingiu 18.000 RPM (Seu PC quer voar ✈️)", time: 500 },
    { text: "🥟 [1.5s] Fonte Genérica de 200W: Cheiro de pastel de vento frito detectado", time: 1500 },
    { text: "🍳 [2.5s] Pasta térmica de maionese derretendo a 115ºC", time: 2500 },
    { text: "💥 [3.5s] Bottleneck Extremo: Celeron tentando empurrar uma RTX 4090", time: 3500 }
  ];

  // Gera emojis subindo na tela para simular o PC pegando fogo
  useEffect(() => {
    if (stage !== 'warning') {
      setEmojis([]);
      return;
    }

    const interval = setInterval(() => {
      const emojiTypes = ['🔥', '💨', '💥', '🍗', '🍳'];
      const randomEmoji = emojiTypes[Math.floor(Math.random() * emojiTypes.length)];
      setEmojis((prev) => [
        ...prev.slice(-30), // limita a 30 emojis
        {
          id: Math.random(),
          char: randomEmoji,
          x: Math.random() * 100, // porcentagem da largura da tela
          duration: 2 + Math.random() * 3, // velocidade de subida
          scale: 0.8 + Math.random() * 1.5
        }
      ]);
    }, 120);

    return () => clearInterval(interval);
  }, [stage]);

  // Função para criar o som de turbina de cooler box Intel acelerando
  const startTurbineSound = () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      audioCtxRef.current = ctx;

      // Criar ruído branco
      const bufferSize = ctx.sampleRate * 6; // 6 segundos
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      // Filtro passa-banda para simular a ressonância da ventoinha assobiando
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(180, ctx.currentTime);
      filter.Q.setValueAtTime(2.5, ctx.currentTime);
      
      // Rampa de aceleração da ventoinha de 180Hz a 2200Hz em 4 segundos
      filter.frequency.exponentialRampToValueAtTime(2200, ctx.currentTime + 4);

      // Controle de volume crescendo
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.005, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.4, ctx.currentTime + 4);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();

      noiseSourceRef.current = noise;
      filterNodeRef.current = filter;
      gainNodeRef.current = gain;
    } catch (e) {
      console.log("Web Audio não suportado no navegador:", e);
    }
  };

  const stopAudio = () => {
    try {
      if (noiseSourceRef.current) {
        noiseSourceRef.current.stop();
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    } catch (e) {
      console.log(e);
    }
  };

  // Som do estouro/crash virtual do PC
  const playExplosionSound = () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(100, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(10, ctx.currentTime + 0.6);
      
      gain.gain.setValueAtTime(0.5, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.6);
    } catch (e) {
      console.log(e);
    }
  };

  const handleTrigger = () => {
    setStage('warning');
    setLogs([]);
    startTurbineSound();

    funnyLogs.forEach((log) => {
      setTimeout(() => {
        setLogs((prev) => [...prev, log.text]);
      }, log.time);
    });

    // Crash para tela azul
    setTimeout(() => {
      stopAudio();
      playExplosionSound();
      setStage('bsod');
    }, 4500);
  };

  const handleReset = () => {
    stopAudio();
    setStage('idle');
    setLogs([]);
  };

  const handleSavePC = () => {
    handleReset();
    setTimeout(() => {
      document.getElementById('precos')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <>
      {/* Botão flutuante sutil no canto inferior esquerdo */}
      <div className="fixed bottom-6 left-6 z-[99998] hidden md:block">
        <motion.button
          onClick={handleTrigger}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-12 h-12 rounded-full flex items-center justify-center border bg-black/80 border-[#ff3e3e]/30 text-[#ff3e3e] shadow-[0_0_30px_rgba(255,62,62,0.15)] hover:shadow-[0_0_30px_rgba(255,62,62,0.4)] hover:border-[#ff3e3e]/70 transition-all duration-500 group relative cursor-pointer"
        >
          <Flame size={20} className="animate-pulse" />
          
          {/* Tooltip */}
          <span className="absolute left-16 top-1/2 -translate-y-1/2 bg-black/90 border border-[#ff3e3e]/20 text-[9px] font-mono tracking-widest text-zinc-400 py-2 px-4 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none uppercase">
            ⚠️ overclock perigoso [não clique]
          </span>
        </motion.button>
      </div>

      <AnimatePresence>
        {/* Estágio 1: PC esquentando e tremendo */}
        {stage === 'warning' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-[9999999] flex flex-col justify-center items-center p-6 select-none overflow-hidden"
          >
            {/* Efeito de Tremor de Tela no container */}
            <motion.div
              animate={{
                x: [0, -10, 10, -5, 5, -10, 10, 0],
                y: [0, 5, -5, 10, -10, 5, -5, 0]
              }}
              transition={{ repeat: Infinity, duration: 0.2 }}
              className="max-w-2xl w-full text-center space-y-8 relative z-10"
            >
              <div className="w-24 h-24 rounded-full bg-red-600/10 border border-red-600/30 flex items-center justify-center mx-auto text-red-500 animate-bounce">
                <ShieldAlert size={48} />
              </div>
              <h2 className="text-3xl md:text-5xl font-mono font-bold text-red-500 uppercase tracking-tighter">
                OVERCLOCK CRÍTICO! 🔥
              </h2>
              
              <div className="bg-black/50 border border-red-500/20 rounded-2xl p-6 md:p-8 font-mono text-left space-y-4 text-xs md:text-sm">
                {logs.map((log, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-red-400 font-medium"
                  >
                    {log}
                  </motion.div>
                ))}
                
                <div className="flex items-center justify-center gap-3 border-t border-red-500/10 pt-4 mt-4 text-red-500 font-bold tracking-widest text-[10px] md:text-xs">
                  <RefreshCw className="animate-spin" size={14} />
                  <span>COOLER RPM: {(12000 + Math.random() * 6000).toFixed(0)} RPM | TEMP: 119ºC</span>
                </div>
              </div>
            </motion.div>

            {/* Emojis flutuando da base da tela para simular fogo */}
            {emojis.map((emoji) => (
              <motion.div
                key={emoji.id}
                initial={{ y: '100vh', x: `${emoji.x}vw`, opacity: 1, scale: emoji.scale }}
                animate={{ y: '-20vh', opacity: 0 }}
                transition={{ duration: emoji.duration, ease: 'easeOut' }}
                className="absolute text-5xl pointer-events-none z-0"
              >
                {emoji.char}
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Estágio 2: Tela Azul da Morte Zueira */}
        {stage === 'bsod' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#0078d7] text-white z-[9999999] flex flex-col justify-center p-8 md:p-24 font-sans select-none overflow-y-auto"
          >
            <div className="max-w-4xl mx-auto w-full space-y-12 text-left">
              {/* Carinha Triste do BSOD */}
              <div className="text-8xl md:text-9xl font-light font-mono">:(</div>
              
              <h1 className="text-2xl md:text-4xl font-light leading-snug max-w-3xl">
                O seu PC chorou de cansaço. Aparentemente, seu cooler box da Intel não aguentou o tranco e sua pasta térmica de chiclete derreteu de vez.
              </h1>

              <div className="space-y-4">
                <p className="text-lg md:text-xl font-light text-white/80">
                  Para mais informações sobre este desastre e possíveis soluções, agende com o Renan urgentemente antes que sua placa de vídeo vire um churrasco de grelha.
                </p>
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6 pt-4 text-xs md:text-sm font-mono text-white/70">
                  <div className="w-24 h-24 bg-white p-2 rounded-lg flex items-center justify-center">
                    {/* SVG simulando QR Code */}
                    <svg viewBox="0 0 100 100" className="w-full h-full text-black">
                      <rect x="0" y="0" width="30" height="30" fill="currentColor"/>
                      <rect x="5" y="5" width="20" height="20" fill="white"/>
                      <rect x="70" y="0" width="30" height="30" fill="currentColor"/>
                      <rect x="75" y="5" width="20" height="20" fill="white"/>
                      <rect x="0" y="70" width="30" height="30" fill="currentColor"/>
                      <rect x="5" y="75" width="20" height="20" fill="white"/>
                      <rect x="35" y="35" width="30" height="30" fill="currentColor"/>
                      <rect x="40" y="40" width="20" height="20" fill="white"/>
                      <rect x="15" y="15" width="5" height="5" fill="currentColor"/>
                      <rect x="80" y="15" width="5" height="5" fill="currentColor"/>
                      <rect x="15" y="80" width="5" height="5" fill="currentColor"/>
                      <rect x="45" y="45" width="5" height="5" fill="currentColor"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold">Se você ligar para o suporte da Microsoft, mencione estes dados de gargalo:</p>
                    <p className="mt-2 text-white/50">Código de Parada: PASTA_TERMICA_DE_CHICLETE</p>
                    <p className="text-white/50">O que falhou: INTEL_STOCK_COOLERBOX.SYS</p>
                    <p className="text-white/50">Seu FPS em Jogos Competitivos: -3 FPS (Sim, negativo. Você está voltando no tempo)</p>
                  </div>
                </div>
              </div>

              {/* Botões de Ação do BSOD */}
              <div className="flex flex-wrap gap-6 pt-8">
                <button
                  onClick={handleSavePC}
                  className="bg-white text-[#0078d7] hover:bg-white/90 active:scale-95 transition-all px-8 py-4 rounded-xl font-bold tracking-wider text-sm flex items-center gap-2 cursor-pointer shadow-lg"
                >
                  <Cpu size={16} />
                  SALVAR DO INCÊNDIO (AGENDAR PROTOCOLO)
                </button>
                
                <button
                  onClick={handleReset}
                  className="border border-white/30 hover:bg-white/10 active:scale-95 transition-all px-8 py-4 rounded-xl font-medium tracking-wider text-sm cursor-pointer"
                >
                  VOLTAR AO LAG E SOFRIMENTO (FECHAR)
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
