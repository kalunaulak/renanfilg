import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Save, LogOut, RefreshCw, Database, Layout, Video, Download, FileText, ImageIcon, Link as LinkIcon, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { db } from '../lib/db';

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [videos, setVideos] = useState([]);
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState('files');
  const [isPublishing, setIsPublishing] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => { 
    loadData(); 
    db.isOffline().then(offline => setIsOffline(offline));
  }, []);

  async function loadData() {
    setIsLoading(true);
    try {
      const fData = await db.getFiles();
      const vData = await db.getVideos();
      const pData = await db.getPosts();
      setFiles(fData || []);
      setVideos(vData || []);
      setPosts(pData || []);
    } catch (error) {
      console.error(error);
      setMessage('Erro ao carregar dados.');
    } finally {
      setIsLoading(false);
    }
  }

  const publishData = async () => {
    setIsPublishing(true);
    const offline = await db.isOffline();
    setMessage(offline ? 'Salvando localmente...' : 'Sincronizando Sistema Elite...');
    try {
      await db.publishData(files, videos, posts);
      setMessage(offline ? 'DADOS SALVOS LOCALMENTE! 💎 (Modo Offline)' : 'SITE ATUALIZADO COM SUCESSO! 💎');
      setTimeout(() => setMessage(''), 4000);
    } catch (error) {
      setMessage(`ERRO: ${error.message}`);
    } finally {
      setIsPublishing(false);
    }
  };

  const addItem = () => {
    const date = new Date().toLocaleDateString();
    if (activeTab === 'files') setFiles([{ title: 'Novo Arquivo', version: '1.0', date, category: 'Geral', link: '#' }, ...files]);
    if (activeTab === 'videos') setVideos([{ title: 'Novo Vídeo', duration: '10:00', date, video_id: '', category: 'Tutorial', thumbnail_url: '' }, ...videos]);
    if (activeTab === 'posts') setPosts([{ title: 'Nova Matéria', excerpt: 'Resumo...', content: '', image_url: '', video_url: '', date }, ...posts]);
  };

  if (isLoading) return <div className="min-h-screen bg-[#020202] flex items-center justify-center"><RefreshCw className="text-[#00bffa] animate-spin" size={40} /></div>;

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans selection:bg-[#00bffa]/30">
      {/* SIDEBAR */}
      <div className="fixed left-0 top-0 bottom-0 w-20 md:w-64 bg-black border-r border-white/5 z-50 flex flex-col items-center py-10">
        <div className="mb-16"><div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00bffa] to-[#005eea] flex items-center justify-center shadow-[0_0_20px_rgba(0,191,250,0.3)]"><Database size={22} /></div></div>
        <nav className="flex-1 w-full px-6 space-y-4">
          {[
            { id: 'files', icon: Download, label: 'Arquivos' },
            { id: 'videos', icon: Video, label: 'Vídeos' },
            { id: 'posts', icon: FileText, label: 'Blog' }
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all ${activeTab === tab.id ? 'bg-[#00bffa]/10 text-[#00bffa] border border-[#00bffa]/20' : 'text-zinc-600 hover:bg-white/5'}`}>
              <tab.icon size={20} /> <span className="hidden md:block font-light text-[10px] uppercase tracking-[0.3em]">{tab.label}</span>
            </button>
          ))}
        </nav>
        <button onClick={() => navigate('/')} className="p-4 text-zinc-800 hover:text-white transition-colors"><LogOut size={24} /></button>
      </div>

      <div className="pl-20 md:pl-64 p-8 md:p-16 max-w-7xl mx-auto">
        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-16 gap-8">
          <div className="flex items-center gap-4">
            <h1 className="text-4xl md:text-5xl font-light tracking-tighter uppercase leading-none">ELITE <span className="text-[#00bffa]">MANAGER.</span></h1>
            {isOffline ? (
              <span className="text-[8px] bg-amber-500/10 border border-amber-500/20 text-amber-400 px-3 py-1 rounded-full uppercase tracking-[0.2em] font-medium flex items-center gap-1.5 shadow-[0_0_15px_rgba(245,158,11,0.05)]">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                Modo Offline
              </span>
            ) : (
              <span className="text-[8px] bg-green-500/10 border border-green-500/20 text-green-400 px-3 py-1 rounded-full uppercase tracking-[0.2em] font-medium flex items-center gap-1.5 shadow-[0_0_15px_rgba(34,197,94,0.05)]">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                Nuvem Ativa
              </span>
            )}
          </div>
          <button onClick={publishData} disabled={isPublishing} className="px-10 py-5 bg-[#00bffa] text-black text-[10px] font-bold uppercase tracking-[0.3em] rounded-2xl hover:shadow-[0_0_30px_rgba(0,191,250,0.4)] transition-all">
            {isPublishing ? 'SINCRONIZANDO...' : 'SALVAR TUDO'}
          </button>
        </header>

        {message && <div className="mb-10 p-6 rounded-2xl bg-[#00bffa]/5 border border-[#00bffa]/20 text-[#00bffa] text-center text-[10px] font-bold uppercase tracking-widest">{message}</div>}

        <div className="flex justify-between items-center mb-12">
          <p className="text-zinc-600 text-[10px] font-light uppercase tracking-[0.5em]">Gerenciamento de {activeTab}</p>
          <button onClick={addItem} className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-light uppercase tracking-widest hover:border-[#00bffa]/40 transition-all"><Plus size={16} /> Adicionar</button>
        </div>

        <div className="space-y-6">
          <AnimatePresence>
            {(activeTab === 'files' ? files : activeTab === 'videos' ? videos : posts).map((item, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-10 border-white/5">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                  <div className="md:col-span-12 space-y-3">
                    <label className="text-[8px] font-bold text-zinc-700 uppercase tracking-widest">Título do Item</label>
                    <input value={item.title} onChange={(e) => { const u = [...(activeTab === 'files' ? files : activeTab === 'videos' ? videos : posts)]; u[idx].title = e.target.value; if(activeTab === 'files') setFiles(u); else if(activeTab === 'videos') setVideos(u); else setPosts(u); }} className="w-full bg-white/2 border border-white/10 rounded-xl p-4 text-sm font-light focus:border-[#00bffa]/40 outline-none transition-all" />
                  </div>

                  {activeTab === 'files' && (
                    <div className="md:col-span-12 space-y-3">
                      <label className="text-[8px] font-bold text-zinc-700 uppercase tracking-widest">Link de Download</label>
                      <input value={item.link} onChange={(e) => { const u = [...files]; u[idx].link = e.target.value; setFiles(u); }} className="w-full bg-white/2 border border-white/10 rounded-xl p-4 text-sm font-light focus:border-[#00bffa]/40 outline-none" />
                    </div>
                  )}

                  {activeTab === 'videos' && (
                    <div className="md:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[8px] font-bold text-zinc-700 uppercase tracking-widest">ID Vídeo (Ex: dQw4w9WgXcQ)</label>
                        <input value={item.video_id} onChange={(e) => { const u = [...videos]; u[idx].video_id = e.target.value; setVideos(u); }} className="w-full bg-white/2 border border-white/10 rounded-xl p-4 text-sm font-light focus:border-[#00bffa]/40 outline-none" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[8px] font-bold text-zinc-700 uppercase tracking-widest">URL da Capa (Thumbnail)</label>
                        <input value={item.thumbnail_url} onChange={(e) => { const u = [...videos]; u[idx].thumbnail_url = e.target.value; setVideos(u); }} className="w-full bg-white/2 border border-white/10 rounded-xl p-4 text-sm font-light focus:border-[#00bffa]/40 outline-none" />
                      </div>
                    </div>
                  )}

                  {activeTab === 'posts' && (
                    <div className="md:col-span-12 space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <label className="text-[8px] font-bold text-zinc-700 uppercase tracking-widest">URL da Imagem de Capa</label>
                          <input value={item.image_url} onChange={(e) => { const u = [...posts]; u[idx].image_url = e.target.value; setPosts(u); }} className="w-full bg-white/2 border border-white/10 rounded-xl p-4 text-sm font-light focus:border-[#00bffa]/40 outline-none" />
                        </div>
                        <div className="space-y-3">
                          <label className="text-[8px] font-bold text-zinc-700 uppercase tracking-widest">Resumo Rápido</label>
                          <input value={item.excerpt} onChange={(e) => { const u = [...posts]; u[idx].excerpt = e.target.value; setPosts(u); }} className="w-full bg-white/2 border border-white/10 rounded-xl p-4 text-sm font-light focus:border-[#00bffa]/40 outline-none" />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <label className="text-[8px] font-bold text-zinc-700 uppercase tracking-widest">Conteúdo da Matéria (Markdown/Prints)</label>
                          <span className="text-[8px] text-[#00bffa] font-bold uppercase tracking-widest">DICA: Use ![desc](link) para imagens</span>
                        </div>
                        <textarea rows="10" value={item.content} onChange={(e) => { const u = [...posts]; u[idx].content = e.target.value; setPosts(u); }} className="w-full bg-white/2 border border-white/10 rounded-xl p-6 text-sm font-light focus:border-[#00bffa]/40 outline-none resize-y" placeholder="Escreva aqui sua matéria técnica... Você pode colar links de imagens no formato Markdown." />
                      </div>
                    </div>
                  )}

                  <div className="md:col-span-10 grid grid-cols-2 md:grid-cols-4 gap-6">
                    {activeTab !== 'posts' && (
                      <>
                        <div className="space-y-3"><label className="text-[8px] font-bold text-zinc-700 uppercase tracking-widest">Versão/Tempo</label><input value={activeTab === 'files' ? item.version : item.duration} onChange={(e) => { const u = [...(activeTab === 'files' ? files : videos)]; if(activeTab === 'files') u[idx].version = e.target.value; else u[idx].duration = e.target.value; activeTab === 'files' ? setFiles(u) : setVideos(u); }} className="w-full bg-white/2 border border-white/10 rounded-xl p-4 text-xs font-light focus:border-[#00bffa]/40 outline-none" /></div>
                        <div className="space-y-3"><label className="text-[8px] font-bold text-zinc-700 uppercase tracking-widest">Categoria</label><input value={item.category} onChange={(e) => { const u = [...(activeTab === 'files' ? files : videos)]; u[idx].category = e.target.value; activeTab === 'files' ? setFiles(u) : setVideos(u); }} className="w-full bg-white/2 border border-white/10 rounded-xl p-4 text-xs font-light focus:border-[#00bffa]/40 outline-none" /></div>
                      </>
                    )}
                  </div>

                  <div className="md:col-span-2 flex justify-end items-end">
                    <button onClick={() => { const u = (activeTab === 'files' ? files : activeTab === 'videos' ? videos : posts).filter((_, i) => i !== idx); if(activeTab === 'files') setFiles(u); else if(activeTab === 'videos') setVideos(u); else setPosts(u); }} className="w-14 h-14 rounded-2xl bg-red-500/5 border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center shadow-lg"><Trash2 size={20} /></button>
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
