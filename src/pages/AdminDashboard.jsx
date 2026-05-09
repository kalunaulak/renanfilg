import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Save, LogOut, CheckCircle, Database, Layout, Video, Download, RefreshCw } from 'lucide-react';
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

  // CARREGAR DADOS DO SUPABASE
  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setIsLoading(true);
    try {
      const { data: driversData, error: dError } = await supabase.from('drivers').select('*').order('created_at', { ascending: false });
      const { data: lessonsData, error: lError } = await supabase.from('lessons').select('*').order('created_at', { ascending: false });

      if (dError) throw dError;
      if (lError) throw lError;

      setDrivers(driversData || []);
      setLessons(lessonsData || []);
    } catch (error) {
      console.error('Erro ao carregar dados:', error.message);
      setMessage('Erro ao carregar banco de dados.');
    } finally {
      setIsLoading(false);
    }
  }

  // PUBLICAR TUDO NO SUPABASE
  const publishData = async () => {
    setIsPublishing(true);
    setMessage('Publicando na nuvem...');
    
    try {
      // 1. Limpar e Re-inserir Drivers (Simples para MVP, podemos otimizar depois)
      await supabase.from('drivers').delete().neq('id', '00000000-0000-0000-0000-000000000000'); // Deleta todos
      if (drivers.length > 0) {
        const { error: dError } = await supabase.from('drivers').insert(drivers.map(({id, created_at, ...rest}) => rest));
        if (dError) throw dError;
      }

      // 2. Limpar e Re-inserir Aulas
      await supabase.from('lessons').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      if (lessons.length > 0) {
        const { error: lError } = await supabase.from('lessons').insert(lessons.map(({id, created_at, ...rest}) => rest));
        if (lError) throw lError;
      }

      setMessage('PUBLICADO COM SUCESSO! 🚀');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Erro ao publicar:', error.message);
      setMessage('Erro ao publicar dados.');
    } finally {
      setIsPublishing(false);
    }
  };

  const addDriver = () => {
    const newDriver = {
      title: 'Novo Driver Elite',
      version: '1.0.0',
      date: new Date().toLocaleDateString(),
      category: 'GPU',
      link: '#'
    };
    setDrivers([newDriver, ...drivers]);
  };

  const addLesson = () => {
    const newLesson = {
      title: 'Nova Aula de Otimização',
      duration: '15:00',
      date: new Date().toLocaleDateString(),
      video_id: '',
      category: 'Software'
    };
    setLessons([newLesson, ...lessons]);
  };

  const removeDriver = (index) => {
    setDrivers(drivers.filter((_, i) => i !== index));
  };

  const removeLesson = (index) => {
    setLessons(lessons.filter((_, i) => i !== index));
  };

  const updateDriver = (index, field, value) => {
    const updated = [...drivers];
    updated[index][field] = value;
    setDrivers(updated);
  };

  const updateLesson = (index, field, value) => {
    const updated = [...lessons];
    updated[index][field] = value;
    setLessons(updated);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#020202] flex items-center justify-center">
        <RefreshCw className="text-[#00bffa] animate-spin" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans selection:bg-[#00bffa]/30">
      {/* Sidebar Luxo */}
      <div className="fixed left-0 top-0 bottom-0 w-20 md:w-64 bg-black border-r border-white/5 z-50 flex flex-col items-center py-10">
        <div className="mb-20">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00bffa] to-[#005eea] flex items-center justify-center shadow-[0_0_20px_rgba(0,191,250,0.4)]">
            <Database className="text-white" size={24} />
          </div>
        </div>

        <nav className="flex-1 w-full px-4 space-y-4">
          <button 
            onClick={() => setActiveTab('drivers')}
            className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${activeTab === 'drivers' ? 'bg-[#00bffa]/10 text-[#00bffa] border border-[#00bffa]/20' : 'text-zinc-500 hover:text-white hover:bg-white/5'}`}
          >
            <Download size={20} />
            <span className="hidden md:block font-medium tracking-tight">Drivers</span>
          </button>
          <button 
            onClick={() => setActiveTab('lessons')}
            className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${activeTab === 'lessons' ? 'bg-[#00bffa]/10 text-[#00bffa] border border-[#00bffa]/20' : 'text-zinc-500 hover:text-white hover:bg-white/5'}`}
          >
            <Video size={20} />
            <span className="hidden md:block font-medium tracking-tight">Aulas</span>
          </button>
        </nav>

        <button onClick={() => navigate('/login')} className="p-4 text-zinc-600 hover:text-red-500 transition-colors">
          <LogOut size={24} />
        </button>
      </div>

      {/* Content */}
      <div className="pl-20 md:pl-64 p-8 md:p-16 max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-light tracking-tighter uppercase mb-2">GERENCIADOR <span className="italic text-zinc-500">ELITE.</span></h1>
            <p className="text-zinc-500 font-light tracking-widest text-[10px] uppercase">Controle de Conteúdo Renan Filg v2.0</p>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={publishData}
              disabled={isPublishing}
              className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#00bffa] to-[#005eea] rounded-2xl text-xs font-bold tracking-widest uppercase hover:shadow-[0_0_30px_rgba(0,191,250,0.3)] transition-all active:scale-95 disabled:opacity-50"
            >
              {isPublishing ? <RefreshCw className="animate-spin" size={16} /> : <Save size={16} />}
              {isPublishing ? 'PUBLICANDO...' : 'PUBLICAR NO SITE'}
            </button>
          </div>
        </header>

        {message && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10 p-6 rounded-2xl bg-[#00bffa]/10 border border-[#00bffa]/20 text-[#00bffa] font-bold text-center tracking-[0.2em] text-xs"
          >
            {message}
          </motion.div>
        )}

        <div className="mb-10 flex justify-between items-center">
          <div className="flex items-center gap-2 text-zinc-500 text-[10px] font-bold tracking-widest uppercase">
            <Layout size={14} />
            Editando: {activeTab === 'drivers' ? 'Driver Hub' : 'Streaming Hub'}
          </div>
          <button 
            onClick={activeTab === 'drivers' ? addDriver : addLesson}
            className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold tracking-widest uppercase hover:border-[#00bffa]/30 hover:text-[#00bffa] transition-all"
          >
            <Plus size={14} /> Adicionar {activeTab === 'drivers' ? 'Driver' : 'Aula'}
          </button>
        </div>

        {/* Listagem */}
        <div className="grid grid-cols-1 gap-4">
          <AnimatePresence>
            {(activeTab === 'drivers' ? drivers : lessons).map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="glass-card p-6 md:p-10 flex flex-col md:flex-row items-center gap-8 border-white/5"
              >
                <div className="flex-1 w-full space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest px-1">Título do Conteúdo</label>
                      <input 
                        value={item.title} 
                        onChange={(e) => activeTab === 'drivers' ? updateDriver(idx, 'title', e.target.value) : updateLesson(idx, 'title', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm font-light focus:outline-none focus:border-[#00bffa]/30"
                      />
                    </div>
                    {activeTab === 'drivers' ? (
                      <div className="space-y-2">
                        <label className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest px-1">Link de Download</label>
                        <input 
                          value={item.link} 
                          onChange={(e) => updateDriver(idx, 'link', e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm font-light focus:outline-none focus:border-[#00bffa]/30"
                        />
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <label className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest px-1">ID do Vídeo (YouTube)</label>
                        <input 
                          value={item.video_id} 
                          onChange={(e) => updateLesson(idx, 'video_id', e.target.value)}
                          placeholder="Ex: dQw4w9WgXcQ"
                          className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm font-light focus:outline-none focus:border-[#00bffa]/30"
                        />
                      </div>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="space-y-2">
                      <label className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest px-1">{activeTab === 'drivers' ? 'Versão' : 'Duração'}</label>
                      <input 
                        value={activeTab === 'drivers' ? item.version : item.duration} 
                        onChange={(e) => activeTab === 'drivers' ? updateDriver(idx, 'version', e.target.value) : updateLesson(idx, 'duration', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-xs font-light focus:outline-none focus:border-[#00bffa]/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest px-1">Categoria</label>
                      <select 
                        value={item.category} 
                        onChange={(e) => activeTab === 'drivers' ? updateDriver(idx, 'category', e.target.value) : updateLesson(idx, 'category', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-xs font-light focus:outline-none focus:border-[#00bffa]/30 appearance-none"
                      >
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
                </div>

                <button 
                  onClick={() => activeTab === 'drivers' ? removeDriver(idx) : removeLesson(idx)}
                  className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-lg"
                >
                  <Trash2 size={20} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
