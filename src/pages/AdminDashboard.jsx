import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Save, LogOut, RefreshCw, Database, Layout, Video, Download, FileText, ExternalLink, Image as ImageIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [videos, setVideos] = useState([]);
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState('files');
  const [isPublishing, setIsPublishing] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => { loadData(); }, []);

  async function loadData() {
    setIsLoading(true);
    try {
      const { data: fData } = await supabase.from('files').select('*').order('created_at', { ascending: false });
      const { data: vData } = await supabase.from('videos').select('*').order('created_at', { ascending: false });
      const { data: pData } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
      
      setFiles(fData || []);
      setVideos(vData || []);
      setPosts(pData || []);
    } catch (error) {
      console.error(error);
      setMessage('Erro ao carregar dados do banco.');
    } finally {
      setIsLoading(false);
    }
  }

  const publishData = async () => {
    setIsPublishing(true);
    setMessage('Sincronizando Plataforma...');
    try {
      // Sincronizar Arquivos
      await supabase.from('files').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      if (files.length > 0) await supabase.from('files').insert(files.map(({id, created_at, ...rest}) => rest));

      // Sincronizar Vídeos
      await supabase.from('videos').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      if (videos.length > 0) await supabase.from('videos').insert(videos.map(({id, created_at, ...rest}) => rest));

      // Sincronizar Blog
      await supabase.from('posts').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      if (posts.length > 0) await supabase.from('posts').insert(posts.map(({id, created_at, ...rest}) => rest));

      setMessage('SITE ATUALIZADO COM SUCESSO! 🚀');
      setTimeout(() => setMessage(''), 4000);
    } catch (error) {
      setMessage(`ERRO: ${error.message}`);
    } finally {
      setIsPublishing(false);
    }
  };

  const addItem = () => {
    if (activeTab === 'files') setFiles([{ title: 'Novo Arquivo Útil', version: '1.0', date: new Date().toLocaleDateString(), category: 'Utilidades', link: '#' }, ...files]);
    if (activeTab === 'videos') setVideos([{ title: 'Novo Tutorial', duration: '10:00', date: new Date().toLocaleDateString(), video_id: '', category: 'Otimização' }, ...videos]);
    if (activeTab === 'posts') setPosts([{ title: 'Nova Matéria', excerpt: 'Resumo da matéria...', content: '', image_url: '', video_url: '', date: new Date().toLocaleDateString() }, ...posts]);
  };

  if (isLoading) return <div className="min-h-screen bg-[#020202] flex items-center justify-center"><RefreshCw className="text-[#00bffa] animate-spin" size={48} /></div>;

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans selection:bg-[#00bffa]/30">
      {/* SIDEBAR */}
      <div className="fixed left-0 top-0 bottom-0 w-20 md:w-64 bg-black border-r border-white/5 z-50 flex flex-col items-center py-10">
        <div className="mb-16"><div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00bffa] to-[#005eea] flex items-center justify-center shadow-[0_0_20px_rgba(0,191,250,0.3)]"><Database size={22} /></div></div>
        <nav className="flex-1 w-full px-4 space-y-4">
          <button onClick={() => setActiveTab('files')} className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all ${activeTab === 'files' ? 'bg-[#00bffa]/10 text-[#00bffa] border border-[#00bffa]/20' : 'text-zinc-500 hover:bg-white/5'}`}><Download size={20} /> <span className="hidden md:block font-bold text-[10px] uppercase tracking-widest">Arquivos</span></button>
          <button onClick={() => setActiveTab('videos')} className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all ${activeTab === 'videos' ? 'bg-[#00bffa]/10 text-[#00bffa] border border-[#00bffa]/20' : 'text-zinc-500 hover:bg-white/5'}`}><Video size={20} /> <span className="hidden md:block font-bold text-[10px] uppercase tracking-widest">Tutoriais</span></button>
          <button onClick={() => setActiveTab('posts')} className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all ${activeTab === 'posts' ? 'bg-[#00bffa]/10 text-[#00bffa] border border-[#00bffa]/20' : 'text-zinc-500 hover:bg-white/5'}`}><FileText size={20} /> <span className="hidden md:block font-bold text-[10px] uppercase tracking-widest">Blog</span></button>
        </nav>
        <button onClick={() => navigate('/')} className="p-4 text-zinc-600 hover:text-white transition-colors"><LogOut size={24} /></button>
      </div>

      {/* CONTENT */}
      <div className="pl-20 md:pl-64 p-8 md:p-16 max-w-7xl mx-auto">
        <header className="flex flex-col lg:row justify-between items-start lg:items-center mb-12 gap-8">
          <div><h1 className="text-4xl md:text-5xl font-light tracking-tighter uppercase leading-none">ADMIN <span className="italic font-bold text-[#00bffa]">HUB.</span></h1></div>
          <button onClick={publishData} disabled={isPublishing} className="btn-elite-primary !py-5 !px-10 group">{isPublishing ? <RefreshCw className="animate-spin" size={18} /> : <Save size={18} />}{isPublishing ? 'SINCRONIZANDO...' : 'PUBLICAR TUDO'}</button>
        </header>

        {message && <div className={`mb-10 p-6 rounded-2xl border ${message.includes('SUCESSO') ? 'bg-green-500/10 border-green-500/20 text-green-500' : 'bg-red-500/10 border-red-500/20 text-red-500'} font-bold text-[10px] tracking-widest uppercase`}>{message}</div>}

        <div className="flex justify-between items-center mb-8">
          <div className="text-zinc-500 text-[10px] font-bold tracking-[0.4em] uppercase italic">Controle de {activeTab}</div>
          <button onClick={addItem} className="flex items-center gap-2 px-6 py-3 bg-[#00bffa]/5 border border-[#00bffa]/20 rounded-xl text-[10px] font-bold text-[#00bffa] uppercase tracking-widest hover:bg-[#00bffa] hover:text-black transition-all"><Plus size={16} /> Novo Item</button>
        </div>

        <div className="space-y-6">
          <AnimatePresence>
            {(activeTab === 'files' ? files : activeTab === 'videos' ? videos : posts).map((item, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-8 border-white/5">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
                  <div className="md:col-span-6 space-y-2">
                    <label className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest">Título</label>
                    <input value={item.title} onChange={(e) => { const u = [...(activeTab === 'files' ? files : activeTab === 'videos' ? videos : posts)]; u[idx].title = e.target.value; if(activeTab === 'files') setFiles(u); else if(activeTab === 'videos') setVideos(u); else setPosts(u); }} className="w-full bg-white/2 border border-white/10 rounded-xl p-4 text-sm font-light focus:border-[#00bffa]/40 outline-none" />
                  </div>
                  
                  {activeTab === 'files' && (
                    <div className="md:col-span-6 space-y-2">
                      <label className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest">Link do Arquivo</label>
                      <input value={item.link} onChange={(e) => { const u = [...files]; u[idx].link = e.target.value; setFiles(u); }} className="w-full bg-white/2 border border-white/10 rounded-xl p-4 text-sm font-light focus:border-[#00bffa]/40 outline-none" />
                    </div>
                  )}

                  {activeTab === 'videos' && (
                    <div className="md:col-span-6 space-y-2">
                      <label className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest">ID YouTube</label>
                      <input value={item.video_id} onChange={(e) => { const u = [...videos]; u[idx].video_id = e.target.value; setVideos(u); }} className="w-full bg-white/2 border border-white/10 rounded-xl p-4 text-sm font-light focus:border-[#00bffa]/40 outline-none" />
                    </div>
                  )}

                  {activeTab === 'posts' && (
                    <div className="md:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                      <div className="space-y-2">
                        <label className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest">URL da Imagem de Capa</label>
                        <input value={item.image_url} onChange={(e) => { const u = [...posts]; u[idx].image_url = e.target.value; setPosts(u); }} className="w-full bg-white/2 border border-white/10 rounded-xl p-4 text-sm font-light focus:border-[#00bffa]/40 outline-none" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest">Resumo (Excerpt)</label>
                        <input value={item.excerpt} onChange={(e) => { const u = [...posts]; u[idx].excerpt = e.target.value; setPosts(u); }} className="w-full bg-white/2 border border-white/10 rounded-xl p-4 text-sm font-light focus:border-[#00bffa]/40 outline-none" />
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <label className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest">Conteúdo da Matéria (Texto/HTML)</label>
                        <textarea rows="4" value={item.content} onChange={(e) => { const u = [...posts]; u[idx].content = e.target.value; setPosts(u); }} className="w-full bg-white/2 border border-white/10 rounded-xl p-4 text-sm font-light focus:border-[#00bffa]/40 outline-none resize-none" />
                      </div>
                    </div>
                  )}

                  <div className="md:col-span-10 grid grid-cols-2 md:grid-cols-3 gap-4">
                    {activeTab !== 'posts' && (
                      <>
                        <div className="space-y-2">
                          <label className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest">{activeTab === 'files' ? 'Versão' : 'Duração'}</label>
                          <input value={activeTab === 'files' ? item.version : item.duration} onChange={(e) => { const u = [...(activeTab === 'files' ? files : videos)]; if(activeTab === 'files') u[idx].version = e.target.value; else u[idx].duration = e.target.value; activeTab === 'files' ? setFiles(u) : setVideos(u); }} className="w-full bg-white/2 border border-white/10 rounded-xl p-4 text-xs font-light focus:border-[#00bffa]/40 outline-none" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest">Categoria</label>
                          <input value={item.category} onChange={(e) => { const u = [...(activeTab === 'files' ? files : videos)]; u[idx].category = e.target.value; activeTab === 'files' ? setFiles(u) : setVideos(u); }} className="w-full bg-white/2 border border-white/10 rounded-xl p-4 text-xs font-light focus:border-[#00bffa]/40 outline-none" />
                        </div>
                      </>
                    )}
                  </div>

                  <div className="md:col-span-2 flex justify-end">
                    <button onClick={() => { const u = (activeTab === 'files' ? files : activeTab === 'videos' ? videos : posts).filter((_, i) => i !== idx); if(activeTab === 'files') setFiles(u); else if(activeTab === 'videos') setVideos(u); else setPosts(u); }} className="w-12 h-12 rounded-xl bg-red-500/5 border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center"><Trash2 size={20} /></button>
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
