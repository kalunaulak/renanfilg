import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Play, Video, Shield, Settings, LogOut, CheckCircle, Clock, ExternalLink, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('drivers');
  const [drivers, setDrivers] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // CARREGAR DADOS DO SUPABASE (Sincronismo Global)
  useEffect(() => {
    loadData();
    
    // Opcional: Listen para mudanças em tempo real
    const channel = supabase
      .channel('schema-db-changes')
      .on('postgres_changes', { event: '*', schema: 'public' }, () => {
        loadData();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function loadData() {
    setIsLoading(true);
    try {
      const { data: dData } = await supabase.from('drivers').select('*').order('created_at', { ascending: false });
      const { data: lData } = await supabase.from('lessons').select('*').order('created_at', { ascending: false });
      
      setDrivers(dData || []);
      setLessons(lData || []);
    } catch (err) {
      console.error('Erro ao buscar dados:', err);
    } finally {
      setIsLoading(false);
    }
  }

  const handleLogout = () => {
    navigate('/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#020202] flex items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          <RefreshCw className="text-[#00bffa] animate-spin" size={48} />
          <p className="text-zinc-500 font-bold tracking-[0.3em] text-xs uppercase">Sincronizando Protocolo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans selection:bg-[#00bffa]/30 overflow-x-hidden">
      {/* Sidebar Luxo */}
      <div className="fixed left-0 top-0 bottom-0 w-20 md:w-72 bg-black border-r border-white/5 z-50 flex flex-col items-center py-12">
        <div className="mb-20">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00bffa] to-[#005eea] flex items-center justify-center shadow-[0_0_30px_rgba(0,191,250,0.5)]">
            <Shield className="text-white" size={28} />
          </div>
        </div>

        <nav className="flex-1 w-full px-6 space-y-6">
          <button 
            onClick={() => setActiveTab('drivers')}
            className={`w-full flex items-center gap-5 p-5 rounded-2xl transition-all duration-500 ${activeTab === 'drivers' ? 'bg-[#00bffa]/10 text-[#00bffa] shadow-[0_0_20px_rgba(0,191,250,0.1)] border border-[#00bffa]/20' : 'text-zinc-600 hover:text-white hover:bg-white/5'}`}
          >
            <Download size={22} />
            <span className="hidden md:block font-bold tracking-tight text-sm uppercase">Driver Hub</span>
          </button>
          <button 
            onClick={() => setActiveTab('lessons')}
            className={`w-full flex items-center gap-5 p-5 rounded-2xl transition-all duration-500 ${activeTab === 'lessons' ? 'bg-[#00bffa]/10 text-[#00bffa] shadow-[0_0_20px_rgba(0,191,250,0.1)] border border-[#00bffa]/20' : 'text-zinc-600 hover:text-white hover:bg-white/5'}`}
          >
            <Video size={22} />
            <span className="hidden md:block font-bold tracking-tight text-sm uppercase">Streaming Hub</span>
          </button>
        </nav>

        <button onClick={handleLogout} className="p-6 text-zinc-700 hover:text-red-500 transition-colors">
          <LogOut size={26} />
        </button>
      </div>

      {/* Main Content */}
      <div className="pl-20 md:pl-72 p-8 md:p-20">
        <header className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 rounded-full bg-[#00bffa] animate-pulse shadow-[0_0_10px_#00bffa]"></div>
            <span className="text-zinc-500 text-[10px] font-bold tracking-[0.5em] uppercase italic">Acesso Autorizado • Elite Status</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-light tracking-tighter uppercase leading-none">
            REMAN <span className="italic font-bold bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">DASHBOARD.</span>
          </h1>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === 'drivers' ? (
            <motion.div 
              key="drivers"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 xl:grid-cols-2 gap-8"
            >
              {drivers.map((driver) => (
                <div key={driver.id} className="glass-card p-10 flex items-center justify-between group hover:border-[#00bffa]/30 transition-all duration-700">
                  <div className="flex gap-8 items-center">
                    <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#00bffa]/10 transition-all duration-700">
                      <Download size={32} className="text-zinc-500 group-hover:text-[#00bffa]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-2xl font-bold uppercase tracking-tight text-white group-hover:text-[#00bffa] transition-colors">{driver.title}</h3>
                        <span className="px-3 py-1 rounded bg-white/5 border border-white/10 text-[9px] font-bold text-zinc-500 uppercase tracking-widest">{driver.category}</span>
                      </div>
                      <div className="flex gap-6 text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
                        <span className="flex items-center gap-2"><Settings size={12} /> v{driver.version}</span>
                        <span className="flex items-center gap-2"><Clock size={12} /> {driver.date}</span>
                      </div>
                    </div>
                  </div>
                  <a href={driver.link} className="p-5 rounded-2xl bg-[#00bffa] text-black hover:shadow-[0_0_30px_rgba(0,191,250,0.4)] hover:scale-105 transition-all">
                    <Download size={24} />
                  </a>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="lessons"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-10"
            >
              {lessons.map((lesson) => (
                <div key={lesson.id} className="glass-card overflow-hidden group hover:border-[#00bffa]/30 transition-all duration-700">
                  <div className="aspect-video relative overflow-hidden bg-black/40">
                    {lesson.video_id ? (
                      <iframe 
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${lesson.video_id}?rel=0&modestbranding=1`}
                        title={lesson.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                         <Play size={64} className="text-white/10" />
                      </div>
                    )}
                  </div>
                  <div className="p-10">
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-[10px] font-bold text-[#00bffa] uppercase tracking-[0.3em] italic">{lesson.category}</span>
                      <span className="text-xs font-mono text-zinc-600">{lesson.duration}</span>
                    </div>
                    <h3 className="text-2xl font-bold uppercase tracking-tight text-white mb-6 group-hover:text-[#00bffa] transition-colors">{lesson.title}</h3>
                    <div className="flex items-center gap-3 text-zinc-500 text-[10px] font-bold uppercase tracking-widest border-t border-white/5 pt-6">
                      <Clock size={14} /> Atualizado em {lesson.date}
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
