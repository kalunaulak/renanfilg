import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Play, Video, Shield, Settings, LogOut, Clock, RefreshCw, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('drivers');
  const [drivers, setDrivers] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
    const channel = supabase.channel('schema-db-changes').on('postgres_changes', { event: '*', schema: 'public' }, () => loadData()).subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  async function loadData() {
    setIsLoading(true);
    try {
      const { data: dData } = await supabase.from('drivers').select('*').order('created_at', { ascending: false });
      const { data: lData } = await supabase.from('lessons').select('*').order('created_at', { ascending: false });
      setDrivers(dData || []);
      setLessons(lData || []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) return (
    <div className="min-h-screen bg-[#020202] flex flex-col items-center justify-center gap-6">
      <RefreshCw className="text-[#00bffa] animate-spin" size={56} />
      <p className="text-zinc-600 font-bold tracking-[0.5em] text-[10px] uppercase">Sincronizando Arquivos de Elite...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans selection:bg-[#00bffa]/30 overflow-x-hidden">
      {/* SIDEBAR NOBRE */}
      <div className="fixed left-0 top-0 bottom-0 w-20 md:w-80 bg-black border-r border-white/5 z-50 flex flex-col items-center py-12">
        <div className="mb-24">
          <motion.div whileHover={{ scale: 1.05 }} className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00bffa] to-[#005eea] flex items-center justify-center shadow-[0_0_40px_rgba(0,191,250,0.4)] cursor-pointer">
            <Shield className="text-white" size={32} />
          </motion.div>
        </div>

        <nav className="flex-1 w-full px-6 space-y-8">
          <button 
            onClick={() => setActiveTab('drivers')}
            className={`w-full flex items-center justify-between p-6 rounded-2xl transition-all duration-500 group ${activeTab === 'drivers' ? 'bg-[#00bffa]/10 text-[#00bffa] border border-[#00bffa]/20' : 'text-zinc-600 hover:text-white hover:bg-white/5'}`}
          >
            <div className="flex items-center gap-4">
              <Download size={24} className={activeTab === 'drivers' ? 'text-[#00bffa]' : 'group-hover:text-white'} />
              <span className="hidden md:block font-bold text-xs uppercase tracking-widest">Driver Hub</span>
            </div>
            <ChevronRight size={16} className={`hidden md:block transition-transform ${activeTab === 'drivers' ? 'rotate-90' : 'opacity-0'}`} />
          </button>

          <button 
            onClick={() => setActiveTab('lessons')}
            className={`w-full flex items-center justify-between p-6 rounded-2xl transition-all duration-500 group ${activeTab === 'lessons' ? 'bg-[#00bffa]/10 text-[#00bffa] border border-[#00bffa]/20' : 'text-zinc-600 hover:text-white hover:bg-white/5'}`}
          >
            <div className="flex items-center gap-4">
              <Video size={24} className={activeTab === 'lessons' ? 'text-[#00bffa]' : 'group-hover:text-white'} />
              <span className="hidden md:block font-bold text-xs uppercase tracking-widest">Streaming</span>
            </div>
            <ChevronRight size={16} className={`hidden md:block transition-transform ${activeTab === 'lessons' ? 'rotate-90' : 'opacity-0'}`} />
          </button>
        </nav>

        <button onClick={() => navigate('/')} className="p-8 text-zinc-800 hover:text-red-500 transition-all hover:scale-110">
          <LogOut size={28} />
        </button>
      </div>

      {/* MAIN CONTENT NOBRE */}
      <div className="pl-20 md:pl-80 p-8 md:p-24 max-w-[1600px] mx-auto">
        <header className="mb-24">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3 mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00bffa] shadow-[0_0_10px_#00bffa]"></div>
            <span className="text-zinc-500 text-[10px] font-bold tracking-[0.6em] uppercase italic">Acesso Autorizado • Renan Filg Elite</span>
          </motion.div>
          <h1 className="text-6xl md:text-8xl font-light tracking-tighter uppercase leading-[0.85] mb-4">
            REMAN <br />
            <span className="italic font-black bg-gradient-to-r from-white via-white to-zinc-700 bg-clip-text text-transparent">DASHBOARD.</span>
          </h1>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === 'drivers' ? (
            <motion.div key="drivers" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="grid grid-cols-1 xl:grid-cols-2 gap-10">
              {drivers.map((driver) => (
                <div key={driver.id} className="glass-card p-12 flex items-center justify-between group hover:border-[#00bffa]/30 transition-all duration-700 border-white/[0.03]">
                  <div className="flex gap-10 items-center">
                    <div className="w-24 h-24 rounded-3xl bg-white/2 border border-white/5 flex items-center justify-center group-hover:bg-[#00bffa]/10 transition-all duration-700 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#00bffa]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <Download size={36} className="text-zinc-600 group-hover:text-[#00bffa] transition-colors relative z-10" />
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <h3 className="text-3xl font-black uppercase tracking-tighter text-white group-hover:text-[#00bffa] transition-colors">{driver.title}</h3>
                        <span className="px-4 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-black text-zinc-500 uppercase tracking-widest">{driver.category}</span>
                      </div>
                      <div className="flex gap-8 text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
                        <span className="flex items-center gap-2 text-white/40"><Settings size={12} /> Version {driver.version}</span>
                        <span className="flex items-center gap-2"><Clock size={12} /> {driver.date}</span>
                      </div>
                    </div>
                  </div>
                  <motion.a whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} href={driver.link} className="w-16 h-16 rounded-2xl bg-[#00bffa] text-black flex items-center justify-center shadow-[0_0_30px_rgba(0,191,250,0.3)] hover:shadow-[0_0_50px_rgba(0,191,250,0.5)] transition-all">
                    <Download size={28} />
                  </motion.a>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div key="lessons" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {lessons.map((lesson) => (
                <div key={lesson.id} className="glass-card overflow-hidden group hover:border-[#00bffa]/20 transition-all duration-700 border-white/[0.03] bg-black/40">
                  <div className="aspect-video relative overflow-hidden bg-zinc-900 flex items-center justify-center">
                    {lesson.video_id ? (
                      <iframe className="w-full h-full grayscale-[0.5] group-hover:grayscale-0 transition-all duration-1000" src={`https://www.youtube.com/embed/${lesson.video_id}?rel=0&modestbranding=1`} title={lesson.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    ) : (
                      <Play size={80} className="text-white/5 group-hover:text-[#00bffa]/10 transition-colors" />
                    )}
                  </div>
                  <div className="p-12">
                    <div className="flex items-center justify-between mb-8">
                      <span className="text-[11px] font-black text-[#00bffa] uppercase tracking-[0.4em] italic">{lesson.category}</span>
                      <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-mono text-zinc-500">{lesson.duration}</span>
                    </div>
                    <h3 className="text-3xl font-black uppercase tracking-tighter text-white mb-8 group-hover:text-[#00bffa] transition-colors">{lesson.title}</h3>
                    <div className="flex items-center gap-3 text-zinc-600 text-[10px] font-bold uppercase tracking-widest border-t border-white/5 pt-8">
                      <Clock size={14} /> Protocol Updated: {lesson.date}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
