import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Play, Shield, LogOut, MessageCircle, FileText, FileArchive, Video, ChevronRight, RefreshCw, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { supabase } from '../lib/supabase';

export const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('hub');
  const [files, setFiles] = useState([]);
  const [videos, setVideos] = useState([]);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    loadData();
    const channel = supabase.channel('schema-db-changes').on('postgres_changes', { event: '*', schema: 'public' }, () => loadData()).subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  async function loadData() {
    setIsLoading(true);
    try {
      const { data: fData } = await supabase.from('files').select('*').order('created_at', { ascending: false });
      const { data: vData } = await supabase.from('videos').select('*').order('created_at', { ascending: false });
      const { data: pData } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
      setFiles(fData || []);
      setVideos(vData || []);
      setPosts(pData || []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) return (
    <div className="min-h-screen bg-[#020202] flex flex-col items-center justify-center gap-6">
      <RefreshCw className="text-[#00bffa] animate-spin" size={40} />
      <p className="text-zinc-500 font-light tracking-[0.6em] text-[10px] uppercase italic">Sincronizando Protocolo Elite...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans selection:bg-[#00bffa]/30 pb-32">
      {/* HEADER LANDING STYLE */}
      <nav className="p-10 md:px-16 flex justify-between items-center max-w-7xl mx-auto border-b border-white/5">
        <div className="flex items-center gap-6">
          <Shield size={24} className="text-[#00bffa]" />
          <div>
            <h1 className="text-xl font-light tracking-tighter uppercase leading-none">PAINEL DO <span className="text-[#00bffa] font-normal">ASSINANTE</span></h1>
            <p className="text-[9px] text-zinc-500 font-light tracking-[0.5em] uppercase mt-2 italic">Renan Filg Performance</p>
          </div>
        </div>
        
        <div className="flex items-center gap-8">
          <button onClick={() => setActiveTab('hub')} className={`text-[10px] font-light uppercase tracking-[0.3em] transition-all ${activeTab === 'hub' ? 'text-[#00bffa]' : 'text-zinc-500 hover:text-white'}`}>Central</button>
          <button onClick={() => setActiveTab('blog')} className={`text-[10px] font-light uppercase tracking-[0.3em] transition-all ${activeTab === 'blog' ? 'text-[#00bffa]' : 'text-zinc-500 hover:text-white'}`}>Artigos</button>
          <button onClick={() => navigate('/')} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-zinc-500 hover:text-white transition-all"><LogOut size={18} /></button>
        </div>
      </nav>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="max-w-7xl mx-auto px-10 md:px-16 mt-20">
        <AnimatePresence mode="wait">
          {activeTab === 'hub' ? (
            <motion.div key="hub" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              
              <div className="lg:col-span-8 space-y-24">
                {/* ARQUIVOS */}
                <section>
                  <header className="mb-10 flex items-center gap-4">
                    <div className="w-1 h-8 bg-gradient-to-b from-[#00bffa] to-transparent"></div>
                    <h2 className="text-[11px] font-light text-zinc-400 uppercase tracking-[0.5em]">Arquivos Úteis</h2>
                  </header>
                  <div className="space-y-4">
                    {files.map((file) => (
                      <div key={file.id} className="glass-card !bg-[#050505] border-white/5 p-8 flex items-center justify-between group hover:border-[#00bffa]/20 transition-all duration-700">
                        <div className="flex items-center gap-8">
                          <div className="w-12 h-12 rounded-lg bg-white/2 border border-white/5 flex items-center justify-center text-zinc-600 group-hover:text-[#00bffa] transition-all">
                            <FileArchive size={20} />
                          </div>
                          <div>
                            <h3 className="text-lg font-light tracking-tight text-white group-hover:text-[#00bffa] transition-colors uppercase">{file.title}</h3>
                            <p className="text-[9px] text-zinc-600 font-light uppercase tracking-[0.3em] mt-2">{file.category} • v{file.version}</p>
                          </div>
                        </div>
                        <a href={file.link} className="flex items-center gap-3 text-[10px] font-light uppercase tracking-widest text-zinc-500 hover:text-white transition-all">Download <Download size={14} className="text-[#00bffa]" /></a>
                      </div>
                    ))}
                  </div>
                </section>

                {/* VÍDEOS COM CAPA */}
                <section>
                  <header className="mb-10">
                    <h2 className="text-[11px] font-light text-zinc-600 uppercase tracking-[0.5em]">Playlist de Tutoriais</h2>
                  </header>
                  <div className="grid grid-cols-1 gap-8">
                    {videos.map((video) => (
                      <div key={video.id} className="glass-card !bg-[#050505] border-white/5 p-0 overflow-hidden group hover:border-white/10 transition-all duration-700">
                        <div className="flex flex-col md:flex-row">
                          <div className="w-full md:w-80 aspect-video bg-zinc-900 relative overflow-hidden group">
                            {video.video_id ? (
                               <iframe className="w-full h-full opacity-60 group-hover:opacity-100 transition-opacity" src={`https://www.youtube.com/embed/${video.video_id}`} title={video.title} allowFullScreen></iframe>
                            ) : video.thumbnail_url ? (
                              <img src={video.thumbnail_url} alt={video.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center"><Play size={40} className="text-white/10" /></div>
                            )}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                               <Play size={48} className="text-[#00bffa] transform scale-0 group-hover:scale-100 transition-transform duration-500" />
                            </div>
                          </div>
                          <div className="p-10 flex-1 space-y-4">
                            <div className="flex items-center gap-4 text-[9px] font-light uppercase tracking-widest text-zinc-500">
                              <span className="text-[#00bffa]">Tutorial</span>
                              <span>{video.duration}</span>
                            </div>
                            <h3 className="text-2xl font-light tracking-tight text-white uppercase group-hover:text-[#00bffa] transition-colors">{video.title}</h3>
                            <p className="text-[10px] text-zinc-600 font-light uppercase tracking-[0.3em] italic leading-relaxed">Vídeo aula autorizada para o Protocolo de Performance Elite.</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              {/* SIDEBAR WIDGETS */}
              <aside className="lg:col-span-4 space-y-12">
                <div className="glass-card !bg-gradient-to-br from-[#0a0a0a] to-black border-white/5 p-12 space-y-10">
                  <header>
                    <h4 className="text-[11px] font-light text-green-500 uppercase tracking-[0.6em] mb-4 italic">Comunidade VIP</h4>
                    <p className="text-sm text-zinc-600 font-light leading-relaxed">O santuário oficial para discussões de hardware e atualizações em tempo real.</p>
                  </header>
                  <button className="w-full py-6 bg-[#1ea354]/5 border border-[#1ea354]/20 text-green-500 rounded-2xl text-[10px] font-light uppercase tracking-[0.4em] hover:bg-[#1ea354] hover:text-white transition-all flex items-center justify-center gap-3">
                    <MessageCircle size={18} /> Acessar WhatsApp
                  </button>
                </div>
              </aside>

            </motion.div>
          ) : (
            <motion.div key="blog" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-16">
               <header className="mb-20">
                  <h2 className="text-4xl md:text-5xl font-light tracking-tighter uppercase leading-none">ARTIGOS <span className="text-[#00bffa] italic">&</span> MATÉRIAS.</h2>
                  <p className="text-zinc-500 text-[10px] font-light tracking-[0.5em] uppercase mt-4 italic leading-relaxed">Conhecimento Técnico de Elite para Performance Extrema</p>
               </header>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {posts.map((post) => (
                    <div key={post.id} onClick={() => setSelectedPost(post)} className="glass-card !p-0 overflow-hidden border-white/5 group hover:border-[#00bffa]/30 transition-all duration-700 cursor-pointer">
                      <div className="aspect-[21/9] overflow-hidden bg-zinc-900">
                        <img src={post.image_url} alt={post.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" />
                      </div>
                      <div className="p-10">
                        <span className="text-[9px] font-light text-[#00bffa] uppercase tracking-[0.4em] mb-4 block">{post.date}</span>
                        <h3 className="text-2xl font-light tracking-tight text-white uppercase group-hover:text-[#00bffa] transition-colors mb-6">{post.title}</h3>
                        <p className="text-xs text-zinc-500 font-light leading-relaxed line-clamp-2">{post.excerpt}</p>
                      </div>
                    </div>
                  ))}
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* MODAL DE MATÉRIA RICA (CONTEÚDO COMPLETO COM PRINTS) */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-6 md:p-20 overflow-y-auto">
            <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} className="bg-[#050505] border border-white/10 rounded-[40px] max-w-4xl w-full p-10 md:p-20 relative my-auto">
              <button onClick={() => setSelectedPost(null)} className="absolute top-10 right-10 w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-zinc-500 hover:text-white transition-all"><X size={24} /></button>
              
              <div className="space-y-10">
                <header>
                  <span className="text-[10px] font-light text-[#00bffa] uppercase tracking-[0.5em] mb-6 block italic">{selectedPost.date}</span>
                  <h2 className="text-4xl md:text-6xl font-light tracking-tighter uppercase leading-none text-white">{selectedPost.title}</h2>
                </header>

                {selectedPost.image_url && <img src={selectedPost.image_url} className="w-full aspect-[21/9] object-cover rounded-3xl grayscale-[0.5] border border-white/5" alt="Capa" />}

                {/* RENDERIZADOR DE MARKDOWN (SUPORTA IMAGENS E PRINTS NO MEIO DO TEXTO) */}
                <div className="prose prose-invert prose-zinc max-w-none prose-p:font-light prose-p:text-zinc-400 prose-headings:font-light prose-headings:tracking-tight prose-img:rounded-3xl prose-img:border prose-img:border-white/10">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {selectedPost.content}
                  </ReactMarkdown>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
