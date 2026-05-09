
export const GradientBars = () => {
  // Exact heights from the reference image (approximate)
  const heights = ["80%", "65%", "50%", "38%", "28%", "20%", "15%"];
  
  return (
    <div className="absolute bottom-0 left-0 right-0 h-[65vh] flex items-end justify-start pointer-events-none px-0">
      <div className="flex items-end w-full max-w-6xl">
        {heights.map((h, i) => (
          <div 
            key={i} 
            className="flex-1 transition-all duration-1000 ease-out"
            style={{ 
              height: h,
              background: 'linear-gradient(to top, #ffffff 0%, #00bffa 45%, transparent 100%)',
              opacity: Math.max(0.2, 1 - (i * 0.12)),
              borderRight: '1px solid rgba(255,255,255,0.05)'
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};
