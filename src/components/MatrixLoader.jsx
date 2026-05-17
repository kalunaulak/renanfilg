import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export const MatrixHeroBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resize);
    resize();

    const characters = "0123456789ABCDEF<>[]{}$%&@#";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(2, 2, 2, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Create Gradient for the characters
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#00bffa'); // Light Blue
      gradient.addColorStop(1, '#005eea'); // Deep Blue

      ctx.fillStyle = gradient;
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#00bffa';
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      
      ctx.shadowBlur = 0;
    };

    const interval = setInterval(draw, 33);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.8 }} // Aumentado significativamente para maior brilho
      transition={{ duration: 3 }}
      className="absolute inset-0 z-0 pointer-events-none"
    >
      <canvas ref={canvasRef} className="w-full h-full opacity-90" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#020202]"></div>
    </motion.div>
  );
};
