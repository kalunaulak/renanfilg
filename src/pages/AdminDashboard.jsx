import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Save, LogOut, RefreshCw, Database, Layout, Video, Download } from 'lucide-react';
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

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setIsLoading(true);
    try {
      // Teste de conexão individual para capturar o erro exato
      const { data: dData, error: dError } = await supabase.from('drivers').select('*');
      if (dError) {
        console.error('ERRO DRIVERS:', dError);
        throw new Error(`Tabela Drivers: ${dError.message}`);
      }

      const { data: lData, error: lError } = await supabase.from('lessons').select('*');
      if (lError) {
        console.error('ERRO LESSONS:', lError);
        throw new Error(`Tabela Aulas: ${lError.message}`);
      }

      setDrivers(dData || []);
      setLessons(lData || []);
      setMessage('');
    } catch (error) {
      console.error('Erro detalhado:', error);
      setMessage(`ERRO DE CONEXÃO: ${error.message}. Verifique se as tabelas foram criadas e o RLS desativado.`);
    } finally {
      setIsLoading(false);
    }
  }

  const publishData = async () => {
    setIsPublishing(true);
    setMessage('Publicando na nuvem...');
    
    try {
      // Deletar e Reinserir (Garante sincronismo total)
      const { error: delD } = await supabase.from('drivers').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      if (delD) throw delD;
      
      if (drivers.length > 0) {
        const { error: insD } = await supabase.from('drivers').insert(drivers.map(({id, created_at, ...rest}) => rest));
        if (insD) throw insD;
      }

      const { error: delL } = await supabase.from('lessons').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      if (delL) throw delL;

      if (lessons.length > 0) {
        const { error: insL } = await supabase.from('lessons').insert(lessons.map(({id, created_at, ...rest}) => rest));
        if (insL) throw insL;
      }

      setMessage('CONTEÚDO PUBLICADO COM SUCESSO! 🚀');
      setTimeout(() => setMessage(''), 4000);
    } catch (error) {
      console.error('Erro ao publicar:', error);
      setMessage(`ERRO AO SALVAR: ${error.message}`);
    } finally {
      setIsPublishing(false);
    }
  };

  const addDriver = () => setDrivers([{ title: 'Novo Driver', version: '1.0.0', date: new Date().toLocaleDateString(), category: 'GPU', link: '#' }, ...drivers]);
  const addLesson = () => setLessons([{ title: 'Nova Aula', duration: '15:00', date: new Date().toLocaleDateString(), video_id: '', category: 'Software' }, ...lessons]);
  const removeDriver = (idx) => setDrivers(drivers.filter((_, i) => i !== idx));
  const removeLesson = (idx) => setLessons(lessons.filter((_, i) => i !== idx));
  const updateDriver = (idx, f, v) => { const u = [...drivers]; u[idx][f] = v; setDrivers(u); };
  const updateLesson = (idx, f, v) => { const u = [...lessons]; u[idx][f] = v; setLessons(u); };

  if (isLoading) return <div className="min-h-screen bg-[#020202] flex items-center justify-center"><RefreshCw className="text-[#00bffa] animate-spin" size={40} /></div>;

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans selection:bg-[#00bffa]/30">
      <div className="fixed left-0 top-0 bottom-0 w-20 md:w-64 bg-black border-r border-white/5 z-50 flex flex-col items-center py-10">
        <div className="mb-20">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00bffa] to-[#005eea] flex items-center justify-center shadow-[0_0_20px_rgba(0,191,250,0.4)]">
            <Database className="text-white" size={24} />
          </div>
        </div>
        <nav className="flex-1 w-full px-4 space-y-4">
          <button onClick={() => setActiveTab('drivers')} className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${activeTab === 'drivers' ? 'bg-[#00bffa]/10 text-[#00bffa] border border-[#00bffa]/20' : 'text-zinc-500 hover:text-white hover:bg-white/5'}`}><Download size={20} /><span className="hidden md:block font-medium tracking-tight">Drivers</span></button>
          <button onClick={() => setActiveTab('lessons')} className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${activeTab === 'lessons' ? 'bg-[#00bffa]/10 text-[#00bffa] border border-[#00bffa]/20' : 'text-zinc-500 hover:text-white hover:bg-white/5'}`}><Video size={20} /><span className="hidden md:block font-medium tracking-tight">Aulas</span></button>
        </nav>
        <button onClick={() => navigate('/login')} className="p-4 text-zinc-600 hover:text-red-500 transition-colors"><LogOut size={24} /></button>
      </div>

      <div className="pl-20 md:pl-64 p-8 md:p-16 max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
          <div><h1 className="text-4xl md:text-5xl font-light tracking-tighter uppercase mb-2">GERENCIADOR <span className="italic text-zinc-500">ELITE.</span></h1></div>
          <button onClick={publishData} disabled={isPublishing} className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#00bffa] to-[#005eea] rounded-2xl text-xs font-bold tracking-widest uppercase hover:shadow-[0_0_30px_rgba(0,191,250,0.3)] transition-all disabled:opacity-50">
            {isPublishing ? <RefreshCw className="animate-spin" size={16} /> : <Save size={16} />}{isPublishing ? 'PUBLICANDO...' : 'PUBLICAR NO SITE'}
          </button>
        </header>

        {message && <div className={`mb-10 p-6 rounded-2xl ${message.includes('SUCESSO') ? 'bg-green-500/10 border-green-500/20 text-green-500' : 'bg-red-500/10 border-red-500/20 text-red-500'} border font-bold text-center text-xs tracking-widest uppercase`}>{message}</div>}

        <div className="mb-10 flex justify-between items-center">
          <div className="flex items-center gap-2 text-zinc-500 text-[10px] font-bold tracking-widest uppercase"><Layout size={14} /> Editando: {activeTab === 'drivers' ? 'Driver Hub' : 'Streaming Hub'}</div>
          <button onClick={activeTab === 'drivers' ? addDriver : addLesson} className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold tracking-widest uppercase hover:border-[#00bffa]/30 hover:text-[#00bffa] transition-all"><Plus size={14} /> Adicionar</button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <AnimatePresence>
            {(activeTab === 'drivers' ? drivers : lessons).map((item, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="glass-card p-6 md:p-10 flex flex-col md:flex-row items-center gap-8 border-white/5">
                <div className="flex-1 w-full space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input value={item.title} onChange={(e) => activeTab === 'drivers' ? updateDriver(idx, 'title', e.target.value) : updateLesson(idx, 'title', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm font-light focus:border-[#00bffa]/30 outline-none" placeholder="Título" />
                    {activeTab === 'drivers' ? <input value={item.link} onChange={(e) => updateDriver(idx, 'link', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm font-light focus:border-[#00bffa]/30 outline-none" placeholder="Link" /> : <input value={item.video_id} onChange={(e) => updateLesson(idx, 'video_id', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm font-light focus:border-[#00bffa]/30 outline-none" placeholder="ID YouTube" />}
                  </div>
                </div>
                <button onClick={() => activeTab === 'drivers' ? removeDriver(idx) : removeLesson(idx)} className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all"><Trash2 size={20} /></button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
