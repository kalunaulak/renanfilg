import { useEffect, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';

export const CustomCursor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isOverdrive, setIsOverdrive] = useState(false);
  
  // Motion values for tracking position
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isVisible) setIsVisible(true);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleOverdrive = () => setIsOverdrive(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('overdrive-activated', handleOverdrive);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('overdrive-activated', handleOverdrive);
    };
  }, [isVisible]);

  const activeColor = isOverdrive ? '#ff3e3e' : '#00bffa';
  const ambientBackground = isOverdrive 
    ? 'radial-gradient(circle, rgba(255, 62, 62, 0.35) 0%, rgba(139, 92, 246, 0.12) 40%, transparent 75%)'
    : 'radial-gradient(circle, rgba(0, 191, 250, 0.25) 0%, rgba(0, 94, 234, 0.08) 40%, transparent 75%)';

  return (
    <div className="hidden md:block fixed inset-0 pointer-events-none z-[99999999] overflow-hidden">
      {/* Smaller, more intense Ambient Light "Aura" */}
      <motion.div
        className="absolute top-0 left-0 w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          background: ambientBackground,
          filter: 'blur(50px)',
          opacity: isVisible ? 1 : 0,
        }}
      />
      
      {/* Intense core - Zero delay */}
      <motion.div
        className="absolute top-0 left-0 w-[80px] h-[80px] rounded-full pointer-events-none"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          background: isOverdrive 
            ? 'radial-gradient(circle, rgba(255, 62, 62, 0.15) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(255, 255, 255, 0.12) 0%, transparent 70%)',
          filter: 'blur(15px)',
          opacity: isVisible ? 1 : 0,
        }}
      />

      {/* Stylized Elite Arrow Pointer */}
      <motion.div
        className="absolute top-0 left-0 pointer-events-none"
        style={{
          x: mouseX,
          y: mouseY,
          opacity: isVisible ? 1 : 0,
          filter: isOverdrive ? 'drop-shadow(0 0 10px rgba(255,62,62,0.9))' : 'drop-shadow(0 0 8px rgba(0,191,250,0.8))'
        }}
      >
        <svg 
          width="32" 
          height="32" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          style={{ marginLeft: '-2px', marginTop: '-2px' }}
        >
          <path 
            d="M2 2L18 8L10.5 10.5L8 18L2 2Z" 
            fill="#020202" 
            stroke={activeColor} 
            strokeWidth="1.5" 
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </div>
  );
};
