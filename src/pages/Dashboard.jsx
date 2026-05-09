import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Play, Shield, LogOut, MessageCircle, FileText, FileArchive, Video, ChevronRight, RefreshCw, X, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { supabase } from '../lib/supabase';

export const Dashboard = () => {
  const navigate = useNavigate();
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
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center gap-6">
      <RefreshCw className="text-[#00bffa] animate-spin" size={40} />
      <p className="text-zinc-400 font-light tracking-[0.6em] text-[10px] uppercase italic">Iniciando Protocolo de Performance...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-[#e0e0e0] font-sans selection:bg-[#00bffa]/30 pb-40">
      
      {/* GLOW DE FUNDO SUTIL PARA ILUMINAÇÃO */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-[#00bffa]/5 rounded-full blur-[150px] pointer-events-none"></div>

      {/* HEADER ILUMINADO */}
      <nav className="p-10 md:px-16 flex justify-between items-center max-w-7xl mx-auto border-b border-white/10 relative z-10 bg-black/20 backdrop-blur-md">
        <div className="flex items-center gap-6">
          <Shield size={26} className="text-[#00bffa] drop-shadow-[0_0_8px_rgba(0,191,250,0.5)]" />
          <div>
            <h1 className="text-2xl font-light tracking-tighter uppercase leading-none">PAINEL DO <span className="text-[#00bffa] font-normal">ASSINANTE</span></h1>
            <p className="text-[10px] text-zinc-400 font-light tracking-[0.5em] uppercase mt-2 italic">Renan Filg Performance Hub</p>
          </div>
        </div>
        
        <button onClick={() => navigate('/')} className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-full text-[10px] font-light uppercase tracking-widest text-zinc-300 hover:bg-white/10 hover:text-white transition-all">
          Sair do Sistema <LogOut size={16} />
        </button>
      </nav>

      {/* CONTEÚDO PRINCIPAL (LAYOUT VERTICAL ÚNICO) */}
      <main className="max-w-7xl mx-auto px-10 md:px-16 mt-24 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          
          {/* COLUNA CENTRAL (8 COLUNAS) */}
          <div className="lg:col-span-8 space-y-32">
            
            {/* 1. SEÇÃO DE ARQUIVOS */}
            <section>
              <header className="mb-12 flex items-center gap-6">
                <div className="w-1.5 h-10 bg-gradient-to-b from-[#00bffa] to-transparent shadow-[0_0_15px_rgba(0,191,250,0.3)]"></div>
                <div>
                  <h2 className="text-[12px] font-light text-white uppercase tracking-[0.6em]">Arquivos de Alta Performance</h2>
                  <p className="text-[9px] text-zinc-500 uppercase tracking-[0.4em] mt-2">Drivers, Scripts e Utilidades</p>
                </div>
              </header>
              
              <div className="grid grid-cols-1 gap-5">
                {files.map((file) => (
                  <motion.div whileHover={{ x: 5 }} key={file.id} className="bg-[#111111] border border-white/10 rounded-3xl p-10 flex items-center justify-between group hover:border-[#00bffa]/40 hover:bg-[#151515] transition-all duration-500 shadow-xl">
                    <div className="flex items-center gap-10">
                      <div className="w-14 h-14 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center text-zinc-400 group-hover:text-[#00bffa] transition-all shadow-inner">
                        <FileArchive size={24} />
                      </div>
                      <div>
                        <h3 className="text-xl font-light tracking-tight text-white group-hover:text-[#00bffa] transition-colors uppercase">{file.title}</h3>
                        <div className="flex items-center gap-6 mt-3">
                          <span className="text-[10px] text-[#00bffa]/80 font-light uppercase tracking-widest">{file.category}</span>
                          <span className="text-[10px] text-zinc-600 font-light uppercase tracking-widest italic">Versão {file.version}</span>
                        </div>
                      </div>
                    </div>
                    <a href={file.link} className="flex items-center gap-4 text-[10px] font-normal uppercase tracking-widest text-[#00bffa] hover:text-white transition-all bg-[#00bffa]/5 px-8 py-4 rounded-2xl border border-[#00bffa]/20 group-hover:bg-[#00bffa] group-hover:text-black">
                      Baixar <Download size={16} />
                    </a>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* 2. SEÇÃO DE VÍDEOS / TREINAMENTOS */}
            <section>
              <header className="mb-12">
                <h2 className="text-[12px] font-light text-white uppercase tracking-[0.6em]">Playlist de Treinamentos</h2>
                <p className="text-[9px] text-zinc-500 uppercase tracking-[0.4em] mt-2">Vídeo aulas e Tutoriais em Full HD</p>
              </header>
              
              <div className="grid grid-cols-1 gap-10">
                {videos.map((video) => (
                  <div key={video.id} className="bg-[#111111] border border-white/10 rounded-[40px] overflow-hidden group hover:border-[#00bffa]/30 transition-all duration-700 shadow-2xl">
                    <div className="flex flex-col xl:flex-row">
                      <div className="w-full xl:w-[400px] aspect-video bg-black relative overflow-hidden">
                        {video.thumbnail_url ? (
                          <img src={video.thumbnail_url} className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700" alt="Capa" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-zinc-900"><Play size={48} className="text-white/10" /></div>
                        )}
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                           <div className="w-20 h-20 rounded-full bg-[#00bffa] flex items-center justify-center text-black scale-50 group-hover:scale-100 transition-transform duration-500 shadow-[0_0_30px_#00bffa]">
                              <Play size={32} />
                           </div>
                        </div>
                        {video.video_id && (
                           <iframe className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity" src={`https://www.youtube.com/embed/${video.video_id}?autoplay=0&rel=0`} title={video.title} allowFullScreen></iframe>
                        )}
                      </div>
                      <div className="p-12 flex-1 flex flex-col justify-center">
                        <div className="flex items-center gap-4 text-[10px] font-light uppercase tracking-widest text-zinc-500 mb-6">
                          <span className="text-[#00bffa] italic underline underline-offset-8">Aula Tutorial</span>
                          <span>{video.duration}</span>
                        </div>
                        <h3 className="text-3xl font-light tracking-tighter text-white uppercase group-hover:text-[#00bffa] transition-colors mb-6">{video.title}</h3>
                        <p className="text-sm text-zinc-400 font-light leading-relaxed italic max-w-lg">Conteúdo autorizado para otimização sistêmica de hardware e software.</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 3. SEÇÃO DE ARTIGOS & MATÉRIAS (ABAIXO DOS TREINAMENTOS) */}
            <section>
              <header className="mb-12">
                <h2 className="text-[12px] font-light text-white uppercase tracking-[0.6em]">Biblioteca de Matérias</h2>
                <p className="text-[9px] text-zinc-500 uppercase tracking-[0.4em] mt-2">Insights técnicos e Artigos Exclusivos</p>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {posts.map((post) => (
                  <div key={post.id} onClick={() => setSelectedPost(post)} className="bg-[#111111] border border-white/10 rounded-[30px] overflow-hidden group hover:border-[#00bffa]/40 transition-all duration-700 cursor-pointer shadow-xl">
                    <div className="aspect-[16/9] overflow-hidden">
                      <img src={post.image_url} alt={post.title} className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-1000" />
                    </div>
                    <div className="p-10">
                      <span className="text-[9px] font-light text-[#00bffa] uppercase tracking-[0.5em] mb-4 block italic">{post.date}</span>
                      <h3 className="text-xl font-light tracking-tight text-white uppercase group-hover:text-[#00bffa] transition-colors mb-6 line-clamp-2">{post.title}</h3>
                      <div className="flex items-center gap-3 text-[9px] font-light text-zinc-500 uppercase tracking-widest group-hover:text-white transition-colors">
                        Ler Completo <ArrowRight size={14} className="text-[#00bffa]" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* COLUNA LATERAL (WIDGETS FIXOS) */}
          <aside className="lg:col-span-4">
            <div className="sticky top-12 space-y-12">
              
              <div className="bg-gradient-to-br from-[#111111] to-[#050505] border border-white/10 rounded-[50px] p-12 space-y-10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#00bffa]/5 rounded-full blur-[60px]"></div>
                <header>
                  <h4 className="text-[12px] font-light text-green-500 uppercase tracking-[0.6em] mb-6 italic">Comunidade VIP</h4>
                  <p className="text-sm text-zinc-400 font-light leading-relaxed">Acesse o servidor exclusivo de suporte e discussões técnicas.</p>
                </header>
                <button className="w-full py-6 bg-[#1ea354]/10 border border-[#1ea354]/30 text-white rounded-2xl text-[10px] font-light uppercase tracking-[0.4em] hover:bg-[#1ea354] transition-all flex items-center justify-center gap-3 shadow-[0_10px_40px_rgba(30,163,84,0.1)]">
                  <MessageCircle size={20} /> Acessar WhatsApp
                </button>
              </div>

              <div className="p-12 bg-[#111111] border border-white/10 rounded-[40px] flex items-center justify-between group hover:border-[#00bffa]/40 transition-all cursor-pointer">
                 <div className="flex items-center gap-5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#00bffa] animate-pulse shadow-[0_0_15px_#00bffa]"></div>
                    <span className="text-[10px] font-light text-white uppercase tracking-[0.5em]">Protocolo Conectado</span>
                 </div>
                 <ChevronRight size={18} className="text-zinc-700 group-hover:text-white transition-colors" />
              </div>

            </div>
          </aside>

        </div>
      </main>

      {/* MODAL DE MATÉRIA (REFORÇADO NA VISIBILIDADE) */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/98 backdrop-blur-2xl flex items-center justify-center p-6 md:p-20 overflow-y-auto">
            <motion.div initial={{ scale: 0.95, y: 30 }} animate={{ scale: 1, y: 0 }} className="bg-[#111111] border border-white/20 rounded-[60px] max-w-5xl w-full p-12 md:p-24 relative my-auto shadow-[0_0_100px_rgba(0,0,0,0.8)]">
              <button onClick={() => setSelectedPost(null)} className="absolute top-12 right-12 w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-500 hover:text-white hover:border-[#00bffa]/40 transition-all"><X size={28} /></button>
              
              <div className="space-y-12">
                <header className="space-y-6">
                  <span className="text-[11px] font-light text-[#00bffa] uppercase tracking-[0.6em] block italic">{selectedPost.date}</span>
                  <h2 className="text-5xl md:text-7xl font-light tracking-tighter uppercase leading-[0.9] text-white">{selectedPost.title}</h2>
                </header>

                {selectedPost.image_url && <img src={selectedPost.image_url} className="w-full aspect-[21/9] object-cover rounded-[40px] border border-white/10 shadow-2xl" alt="Capa" />}

                <div className="prose prose-invert prose-zinc max-w-none prose-p:text-lg prose-p:font-light prose-p:text-zinc-300 prose-p:leading-relaxed prose-headings:font-light prose-headings:tracking-tighter prose-img:rounded-[40px] prose-img:border prose-img:border-white/20 prose-img:shadow-2xl">
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
