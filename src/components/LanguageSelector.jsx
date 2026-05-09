import { useState } from 'react';

export const LanguageSelector = ({ onSelect }) => {
  return (
    <div className="fixed inset-0 z-[200] bg-[#020202] flex items-center justify-center p-6">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#00bffa]/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#005eea]/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="w-full max-w-xl relative z-10 text-center">
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-light tracking-tighter text-white mb-4 uppercase">
            Select your <span className="text-[#00bffa]">Experience</span>
          </h1>
          <p className="text-zinc-500 text-[10px] tracking-[0.4em] uppercase font-light mb-8">Renan Filg • Expert Performance Engineering</p>
          <div className="h-px w-20 bg-[#00bffa] mx-auto mb-8"></div>
          <p className="text-white/60 text-xs uppercase tracking-[0.2em] font-light">
            Choose your language <span className="mx-2 text-white/20">|</span> Escolha seu idioma
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button 
            onClick={() => onSelect('pt')}
            className="group relative p-12 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#00bffa]/30 transition-all text-left overflow-hidden"
          >
            <span className="text-zinc-500 text-[10px] tracking-[0.3em] uppercase block mb-4">Brazil / Portugal</span>
            <div className="flex items-center gap-4 mb-2">
              <span className="text-xl">🇧🇷</span>
              <span className="text-2xl font-light tracking-tight text-white group-hover:text-[#00bffa] transition-colors">Português</span>
            </div>
            <div className="mt-8 w-8 h-px bg-white/20 group-hover:w-full transition-all duration-700"></div>
            
            {/* Background Detail */}
            <div className="absolute -bottom-4 -right-4 opacity-[0.03] text-8xl group-hover:opacity-[0.08] transition-all rotate-12">🇧🇷</div>
          </button>

          <button 
            onClick={() => onSelect('en')}
            className="group relative p-12 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#00bffa]/30 transition-all text-left overflow-hidden"
          >
            <span className="text-zinc-500 text-[10px] tracking-[0.3em] uppercase block mb-4">International / EN</span>
            <div className="flex items-center gap-4 mb-2">
              <span className="text-xl">🇺🇸</span>
              <span className="text-2xl font-light tracking-tight text-white group-hover:text-[#00bffa] transition-colors">English</span>
            </div>
            <div className="mt-8 w-8 h-px bg-white/20 group-hover:w-full transition-all duration-700"></div>

            {/* Background Detail */}
            <div className="absolute -bottom-4 -right-4 opacity-[0.03] text-8xl group-hover:opacity-[0.08] transition-all rotate-12">🇺🇸</div>
          </button>
        </div>

        <p className="mt-12 text-[9px] text-zinc-600 uppercase tracking-[0.4em]">
          The ultimate hardware optimization protocol
        </p>
      </div>
    </div>
  );
};
