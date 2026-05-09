import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Play, Shield, LogOut, MessageCircle, FileText, FileArchive, Video, ChevronRight, Clock, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('hub'); // hub (arquivos/vídeos) ou blog
  const [files, setFiles] = useState([]);
  const [videos, setVideos] = useState([]);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
      <p className="text-zinc-500 font-light tracking-[0.6em] text-[10px] uppercase">Sincronizando Protocolo Elite...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans selection:bg-[#00bffa]/30 pb-32">
      {/* HEADER LUXO (ESTILO LANDING) */}
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

      {/* CONTEÚDO */}
      <main className="max-w-7xl mx-auto px-10 md:px-16 mt-20">
        
        <AnimatePresence mode="wait">
          {activeTab === 'hub' ? (
            <motion.div key="hub" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              
              {/* COLUNA ESQUERDA: ARQUIVOS & VÍDEOS */}
              <div className="lg:col-span-8 space-y-24">
                
                {/* SEÇÃO ARQUIVOS */}
                <section>
                  <header className="mb-10 flex items-center gap-4">
                    <div className="w-1 h-8 bg-gradient-to-b from-[#00bffa] to-transparent"></div>
                    <h2 className="text-[11px] font-light text-zinc-400 uppercase tracking-[0.5em]">Arquivos Obrigatórios</h2>
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
                        <a href={file.link} className="flex items-center gap-3 text-[10px] font-light uppercase tracking-widest text-zinc-500 hover:text-white transition-all">
                          Download <Download size={14} className="text-[#00bffa]" />
                        </a>
                      </div>
                    ))}
                  </div>
                </section>

                {/* SEÇÃO PLAYLIST */}
                <section>
                  <header className="mb-10">
                    <h2 className="text-[11px] font-light text-zinc-600 uppercase tracking-[0.5em]">Treinamento & Vídeos</h2>
                  </header>
                  
                  <div className="grid grid-cols-1 gap-8">
                    {videos.map((video) => (
                      <div key={video.id} className="glass-card !bg-[#050505] border-white/5 p-0 overflow-hidden group hover:border-white/10 transition-all duration-700">
                        <div className="flex flex-col md:flex-row gap-0">
                          <div className="w-full md:w-72 aspect-video bg-zinc-900 flex items-center justify-center relative group-hover:bg-black transition-colors">
                            {video.video_id ? (
                              <iframe className="w-full h-full opacity-60 group-hover:opacity-100 transition-opacity" src={`https://www.youtube.com/embed/${video.video_id}`} title={video.title} allowFullScreen></iframe>
                            ) : (
                              <Play size={40} className="text-white/10 group-hover:text-[#00bffa] transition-all" />
                            )}
                          </div>
                          <div className="p-10 flex-1 space-y-4">
                            <div className="flex items-center gap-4 text-[9px] font-light uppercase tracking-widest text-zinc-500">
                              <span className="text-[#00bffa]">Tutorial</span>
                              <span>{video.duration}</span>
                            </div>
                            <h3 className="text-2xl font-light tracking-tight text-white uppercase group-hover:text-[#00bffa] transition-colors">{video.title}</h3>
                            <p className="text-xs text-zinc-600 font-light leading-relaxed italic">Procedimento autorizado para otimização de latência sistêmica.</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              {/* COLUNA DIREITA: WIDGETS */}
              <aside className="lg:col-span-4 space-y-12">
                <div className="glass-card !bg-gradient-to-br from-[#0a0a0a] to-black border-white/5 p-12 space-y-10">
                  <header>
                    <h4 className="text-[11px] font-light text-green-500 uppercase tracking-[0.6em] mb-4">Comunidade VIP</h4>
                    <p className="text-sm text-zinc-600 font-light leading-relaxed">Acesse o santuário de otimização no WhatsApp.</p>
                  </header>
                  <button className="w-full py-6 bg-[#1ea354]/10 border border-[#1ea354]/20 text-white rounded-2xl text-[10px] font-light uppercase tracking-[0.4em] hover:bg-[#1ea354] hover:text-white transition-all flex items-center justify-center gap-3">
                    <MessageCircle size={18} /> Entrar Agora
                  </button>
                </div>

                <div className="p-12 border border-white/5 rounded-[40px] flex items-center justify-between group cursor-pointer hover:border-[#00bffa]/20 transition-all">
                   <div className="flex items-center gap-4">
                      <div className="w-2 h-2 rounded-full bg-[#00bffa] shadow-[0_0_10px_#00bffa]"></div>
                      <span className="text-[9px] font-light text-zinc-500 uppercase tracking-[0.5em]">Status: Conectado</span>
                   </div>
                   <ChevronRight size={16} className="text-zinc-800 group-hover:text-white transition-colors" />
                </div>
              </aside>

            </motion.div>
          ) : (
            <motion.div key="blog" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-12 max-w-4xl">
               <header className="mb-16">
                  <h2 className="text-4xl md:text-5xl font-light tracking-tighter uppercase leading-none">BIBLIOTECA DE <span className="text-[#00bffa]">ARTIGOS.</span></h2>
                  <p className="text-zinc-500 text-[10px] font-light tracking-[0.5em] uppercase mt-4 italic">Conhecimento Técnico de Elite</p>
               </header>

               <div className="grid grid-cols-1 gap-12">
                  {posts.map((post) => (
                    <div key={post.id} className="glass-card !p-0 overflow-hidden border-white/5 group hover:border-[#00bffa]/20 transition-all duration-700 cursor-pointer">
                      <div className="flex flex-col md:flex-row">
                         <div className="w-full md:w-64 h-48 md:h-auto bg-zinc-900 overflow-hidden">
                            <img src={post.image_url} alt={post.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
                         </div>
                         <div className="p-10 flex-1">
                            <span className="text-[9px] font-light text-[#00bffa] uppercase tracking-[0.4em] mb-4 block">{post.date}</span>
                            <h3 className="text-2xl font-light tracking-tight text-white uppercase group-hover:text-[#00bffa] transition-colors mb-6">{post.title}</h3>
                            <p className="text-sm text-zinc-500 font-light leading-relaxed line-clamp-2">{post.excerpt}</p>
                         </div>
                      </div>
                    </div>
                  ))}
               </div>
            </motion.div>
          )}
        </AnimatePresence>

      </main>
    </div>
  );
};
