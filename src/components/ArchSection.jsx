
import { motion } from 'framer-motion';

export const ArchSection = () => {
  return (
    <section className="py-40 bg-black relative overflow-hidden flex flex-col items-center">
      
      {/* The Arch Effect */}
      <div className="relative w-full max-w-7xl h-[350px] flex justify-center">
        {/* Sharp Top Edge Glow */}
        <div className="absolute top-0 w-[140%] h-[1200px] rounded-[100%] border-t-[1px] border-white/40 z-20 pointer-events-none"></div>
        <div className="absolute top-0 w-[140%] h-[1200px] rounded-[100%] border-t-2 border-[#00bffa] opacity-60 blur-[2px] z-20 pointer-events-none"></div>
        
        {/* Main Arch Gradient Fill */}
        <div className="absolute top-0 w-[140%] h-[1200px] rounded-[100%] bg-gradient-to-b from-[#00bffa]/15 via-[#005eea]/5 to-transparent z-10 pointer-events-none"></div>

        {/* The Capsule Label (Inspired by the reference) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="absolute top-12 flex items-center gap-4 px-5 py-2 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-3xl z-30"
        >
          <div className="px-3 py-0.5 bg-gradient-to-br from-[#00bffa] to-[#005eea] rounded-full text-[9px] text-black font-medium uppercase tracking-[0.2em]">
            Renan Filg
          </div>
          <span className="text-[9px] text-zinc-500 font-light uppercase tracking-[0.3em]">Onde o lead se torna vitória</span>
        </motion.div>

        {/* Title positioned carefully */}
        <div className="absolute top-44 text-center px-6 z-30">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-light tracking-tighter text-white max-w-4xl leading-[1.1]"
          >
            A peça mais <span className="italic">importante</span> <br />
            da sua <span className="bg-gradient-to-b from-[#00bffa] to-[#005eea] bg-clip-text text-transparent italic font-medium">performance definitiva.</span>
          </motion.h2>
        </div>
      </div>

    </section>
  );
};
