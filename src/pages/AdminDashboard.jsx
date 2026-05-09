import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Save, LogOut, RefreshCw, Database, Layout, Video, Download, AlertCircle, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const [drivers, setDrivers] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [activeTab, setActiveTab] = useState('drivers');
  const [isPublishing, setIsPublishing] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [debugInfo, setDebugInfo] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setIsLoading(true);
    setDebugInfo('Conectando ao Supabase...');
    try {
      const { data: dData, error: dError } = await supabase.from('drivers').select('*').order('created_at', { ascending: false });
      if (dError) throw dError;

      const { data: lData, error: lError } = await supabase.from('lessons').select('*').order('created_at', { ascending: false });
      if (lError) throw lError;

      setDrivers(dData || []);
      setLessons(lData || []);
      setDebugInfo('');
    } catch (error) {
      console.error('Erro:', error);
      setMessage(`ERRO DE CONEXÃO: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }

  const publishData = async () => {
    setIsPublishing(true);
    setMessage('Sincronizando com a Nuvem...');
    try {
      await supabase.from('drivers').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      if (drivers.length > 0) {
        const { error } = await supabase.from('drivers').insert(drivers.map(({id, created_at, ...rest}) => rest));
        if (error) throw error;
      }

      await supabase.from('lessons').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      if (lessons.length > 0) {
        const { error } = await supabase.from('lessons').insert(lessons.map(({id, created_at, ...rest}) => rest));
        if (error) throw error;
      }

      setMessage('PUBLICAÇÃO ELITE CONCLUÍDA! 🚀');
      setTimeout(() => setMessage(''), 4000);
    } catch (error) {
      setMessage(`ERRO AO PUBLICAR: ${error.message}`);
    } finally {
      setIsPublishing(false);
    }
  };

  const addDriver = () => setDrivers([{ title: 'Novo Driver', version: '1.0.0', date: new Date().toLocaleDateString(), category: 'GPU', link: '#' }, ...drivers]);
  const addLesson = () => setLessons([{ title: 'Nova Aula', duration: '15:00', date: new Date().toLocaleDateString(), video_id: '', category: 'Software' }, ...lessons]);
  const updateDriver = (idx, f, v) => { const u = [...drivers]; u[idx][f] = v; setDrivers(u); };
  const updateLesson = (idx, f, v) => { const u = [...lessons]; u[idx][f] = v; setLessons(u); };

  if (isLoading) return (
    <div className="min-h-screen bg-[#020202] flex flex-col items-center justify-center gap-6">
      <RefreshCw className="text-[#00bffa] animate-spin" size={48} />
      <p className="text-zinc-500 font-bold tracking-[0.3em] text-[10px] uppercase">{debugInfo}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans selection:bg-[#00bffa]/30">
      {/* SIDEBAR */}
      <div className="fixed left-0 top-0 bottom-0 w-20 md:w-64 bg-black border-r border-white/5 z-50 flex flex-col items-center py-10">
        <div className="mb-16">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00bffa] to-[#005eea] flex items-center justify-center shadow-[0_0_25px_rgba(0,191,250,0.3)]">
            <Database size={22} />
          </div>
        </div>
        <nav className="flex-1 w-full px-4 space-y-4">
          <button onClick={() => setActiveTab('drivers')} className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all ${activeTab === 'drivers' ? 'bg-[#00bffa]/10 text-[#00bffa] border border-[#00bffa]/20' : 'text-zinc-500 hover:bg-white/5'}`}>
            <Download size={20} /> <span className="hidden md:block font-bold text-xs uppercase tracking-widest">Driver Hub</span>
          </button>
          <button onClick={() => setActiveTab('lessons')} className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all ${activeTab === 'lessons' ? 'bg-[#00bffa]/10 text-[#00bffa] border border-[#00bffa]/20' : 'text-zinc-500 hover:bg-white/5'}`}>
            <Video size={20} /> <span className="hidden md:block font-bold text-xs uppercase tracking-widest">Lessons</span>
          </button>
        </nav>
        <button onClick={() => navigate('/')} className="p-4 text-zinc-600 hover:text-white transition-colors"><LogOut size={24} /></button>
      </div>

      {/* CONTENT */}
      <div className="pl-20 md:pl-64 p-8 md:p-16 max-w-7xl mx-auto">
        <header className="flex flex-col lg:row justify-between items-start lg:items-center mb-12 gap-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-light tracking-tighter uppercase leading-none">ADMIN <span className="italic font-bold text-[#00bffa]">CONTROL.</span></h1>
            <p className="text-zinc-500 text-[10px] font-bold tracking-[0.4em] uppercase mt-4 italic">Sincronismo Global Ativo</p>
          </div>
          <button onClick={publishData} disabled={isPublishing} className="btn-elite-primary !py-5 !px-10 group">
            {isPublishing ? <RefreshCw className="animate-spin" size={18} /> : <Save size={18} />}
            {isPublishing ? 'SINCRONIZANDO...' : 'PUBLICAR ALTERAÇÕES'}
          </button>
        </header>

        {message && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className={`mb-10 p-6 rounded-2xl border ${message.includes('SUCESSO') ? 'bg-green-500/10 border-green-500/20 text-green-500' : 'bg-red-500/10 border-red-500/20 text-red-500'} flex items-center gap-4`}>
            <AlertCircle size={20} /> <span className="font-bold text-[10px] tracking-widest uppercase">{message}</span>
          </motion.div>
        )}

        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3 text-zinc-500 text-[10px] font-bold tracking-widest uppercase">
            <Layout size={14} /> Gerenciando: {activeTab === 'drivers' ? 'Drivers' : 'Aulas'}
          </div>
          <button onClick={activeTab === 'drivers' ? addDriver : addLesson} className="flex items-center gap-2 px-6 py-3 bg-[#00bffa]/5 border border-[#00bffa]/20 rounded-xl text-[10px] font-bold text-[#00bffa] uppercase tracking-widest hover:bg-[#00bffa] hover:text-black transition-all">
            <Plus size={16} /> Adicionar Item
          </button>
        </div>

        <div className="space-y-6">
          <AnimatePresence>
            {(activeTab === 'drivers' ? drivers : lessons).map((item, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="glass-card p-8 md:p-10 border-white/5 hover:border-white/10 transition-all">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
                  <div className="md:col-span-5 space-y-3">
                    <label className="text-[9px] font-bold text-zinc-600 uppercase tracking-[0.2em] px-1">Título do Conteúdo</label>
                    <input value={item.title} onChange={(e) => activeTab === 'drivers' ? updateDriver(idx, 'title', e.target.value) : updateLesson(idx, 'title', e.target.value)} className="w-full bg-white/2 border border-white/10 rounded-xl p-4 text-sm font-light focus:border-[#00bffa]/40 focus:bg-white/5 outline-none transition-all shadow-inner" />
                  </div>
                  <div className="md:col-span-5 space-y-3">
                    <label className="text-[9px] font-bold text-zinc-600 uppercase tracking-[0.2em] px-1">{activeTab === 'drivers' ? 'Link de Download' : 'ID do Vídeo YouTube'}</label>
                    <div className="relative">
                      {activeTab === 'drivers' ? (
                        <input value={item.link} onChange={(e) => updateDriver(idx, 'link', e.target.value)} className="w-full bg-white/2 border border-white/10 rounded-xl p-4 text-sm font-light focus:border-[#00bffa]/40 focus:bg-white/5 outline-none transition-all pr-12" />
                      ) : (
                        <input value={item.video_id} onChange={(e) => updateLesson(idx, 'video_id', e.target.value)} placeholder="Ex: dQw4w9WgXcQ" className="w-full bg-white/2 border border-white/10 rounded-xl p-4 text-sm font-light focus:border-[#00bffa]/40 focus:bg-white/5 outline-none transition-all pr-12" />
                      )}
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-700"><ExternalLink size={16} /></div>
                    </div>
                  </div>
                  <div className="md:col-span-2 flex justify-end">
                    <button onClick={() => { const u = (activeTab === 'drivers' ? drivers : lessons).filter((_, i) => i !== idx); activeTab === 'drivers' ? setDrivers(u) : setLessons(u); }} className="w-14 h-14 rounded-2xl bg-red-500/5 border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center shadow-lg">
                      <Trash2 size={22} />
                    </button>
                  </div>

                  <div className="md:col-span-3 space-y-3">
                    <label className="text-[9px] font-bold text-zinc-600 uppercase tracking-[0.2em] px-1">{activeTab === 'drivers' ? 'Versão' : 'Duração'}</label>
                    <input value={activeTab === 'drivers' ? item.version : item.duration} onChange={(e) => activeTab === 'drivers' ? updateDriver(idx, 'version', e.target.value) : updateLesson(idx, 'duration', e.target.value)} className="w-full bg-white/2 border border-white/10 rounded-xl p-4 text-xs font-light focus:border-[#00bffa]/40 outline-none transition-all" />
                  </div>
                  <div className="md:col-span-3 space-y-3">
                    <label className="text-[9px] font-bold text-zinc-600 uppercase tracking-[0.2em] px-1">Categoria</label>
                    <select value={item.category} onChange={(e) => activeTab === 'drivers' ? updateDriver(idx, 'category', e.target.value) : updateLesson(idx, 'category', e.target.value)} className="w-full bg-white/2 border border-white/10 rounded-xl p-4 text-xs font-light focus:border-[#00bffa]/40 outline-none appearance-none transition-all">
                      {activeTab === 'drivers' ? (
                        <>
                          <option value="GPU">GPU</option>
                          <option value="CPU">CPU</option>
                          <option value="Network">Network</option>
                          <option value="Kernel">Kernel</option>
                        </>
                      ) : (
                        <>
                          <option value="Software">Software</option>
                          <option value="BIOS">BIOS</option>
                          <option value="Hardware">Hardware</option>
                          <option value="Geral">Geral</option>
                        </>
                      )}
                    </select>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
