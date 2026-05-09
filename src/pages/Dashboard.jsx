import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Play, Shield, LogOut, MessageCircle, ArrowRight, FileArchive, Video } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export const Dashboard = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [videos, setVideos] = useState([]);
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
      setFiles(fData || []);
      setVideos(vData || []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) return (
    <div className="min-h-screen bg-[#020202] flex flex-col items-center justify-center gap-6">
      <div className="w-16 h-16 border-4 border-[#00bffa]/20 border-t-[#00bffa] rounded-full animate-spin"></div>
      <p className="text-zinc-600 font-bold tracking-[0.4em] text-[10px] uppercase">Acessando Protocolo...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans selection:bg-[#00bffa]/30 pb-20">
      {/* HEADER SUPERIOR */}
      <nav className="p-8 md:px-12 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00bffa] to-[#005eea] flex items-center justify-center shadow-[0_0_20px_rgba(0,191,250,0.4)]">
             <Shield size={20} />
          </div>
          <div>
            <h1 className="text-lg font-black uppercase tracking-widest leading-none">PAINEL DO ASSINANTE</h1>
            <p className="text-[9px] text-[#00bffa] font-bold tracking-[0.2em] uppercase mt-1">Protocolo de Performance Elite</p>
          </div>
        </div>
        <button onClick={() => navigate('/')} className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all text-zinc-500 hover:text-white">
          Sair do Painel
        </button>
      </nav>

      {/* CONTEÚDO PRINCIPAL (GRID 2 COLUNAS) */}
      <main className="max-w-7xl mx-auto px-8 md:px-12 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* COLUNA DA ESQUERDA (CONTEÚDO) */}
        <div className="lg:col-span-8 space-y-16">
          
          {/* SEÇÃO: ARQUIVOS OBRIGATÓRIOS */}
          <section>
            <h2 className="text-[10px] font-black text-[#00bffa] uppercase tracking-[0.4em] mb-8 flex items-center gap-3">
              ARQUIVOS OBRIGATÓRIOS (PRÉ-OTIMIZAÇÃO)
            </h2>
            
            <div className="bg-[#0a0a0a] border-l-4 border-[#00bffa] rounded-r-3xl overflow-hidden p-4 md:p-8 space-y-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              {files.map((file) => (
                <div key={file.id} className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 flex flex-col md:row items-center justify-between gap-6 hover:bg-white/[0.04] transition-all group">
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-[#00bffa]/10 transition-all">
                      <FileArchive size={24} className="text-zinc-500 group-hover:text-[#00bffa]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-black uppercase tracking-widest text-white group-hover:text-[#00bffa] transition-colors">{file.title}</h3>
                      <p className="text-[10px] text-zinc-600 font-medium uppercase mt-1 tracking-widest">{file.category} • Versão {file.version}</p>
                    </div>
                  </div>
                  <a href={file.link} className="px-8 py-3 bg-white/5 border border-white/10 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] hover:bg-[#00bffa] hover:text-black transition-all">
                    Download
                  </a>
                </div>
              ))}
              {files.length === 0 && <p className="text-zinc-700 text-xs italic p-4 text-center">Nenhum arquivo anexado no momento.</p>}
            </div>
          </section>

          {/* SEÇÃO: PLAYLIST DE TREINAMENTO */}
          <section>
            <h2 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em] mb-8">
              PLAYLIST DE TREINAMENTO
            </h2>
            
            <div className="space-y-6">
              {videos.map((video, idx) => (
                <div key={video.id} className="bg-[#0a0a0a] border border-white/5 rounded-3xl overflow-hidden p-6 hover:border-white/10 transition-all group">
                  <div className="flex flex-col md:flex-row gap-8">
                    {/* Thumbnail Fake/Placeholder */}
                    <div className="w-full md:w-64 aspect-video bg-zinc-900 rounded-2xl relative overflow-hidden flex items-center justify-center">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#00bffa]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <Play size={32} className="text-white/20 group-hover:text-[#00bffa] transition-all" />
                      {/* Se quiser iframe real, trocar aqui */}
                    </div>
                    
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-widest text-zinc-500">
                        <span className="text-[#00bffa]">Aula {videos.length - idx}</span>
                        <span>{video.duration} de conteúdo</span>
                      </div>
                      <h3 className="text-xl font-bold text-white group-hover:text-[#00bffa] transition-colors tracking-tight">{video.title}</h3>
                      <p className="text-xs text-zinc-600 font-light leading-relaxed">
                        Neste tutorial você aprenderá o passo a passo completo para executar esta etapa do protocolo com segurança e máxima eficiência.
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* COLUNA DA DIREITA (SIDEBAR) */}
        <aside className="lg:col-span-4 space-y-10">
          
          {/* WIDGET COMUNIDADE VIP */}
          <div className="bg-[#0a0a0a] border border-white/5 rounded-[40px] p-10 space-y-8 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full blur-[60px]"></div>
            
            <div className="space-y-4 relative z-10">
              <h4 className="text-[10px] font-black text-green-500 uppercase tracking-[0.4em]">COMUNIDADE VIP</h4>
              <p className="text-sm text-zinc-500 font-light leading-relaxed">
                Entre no grupo exclusivo de alunos no WhatsApp para atualizações em tempo real e suporte da comunidade.
              </p>
            </div>
            
            <button className="w-full py-5 bg-[#1ea354] hover:bg-[#168a44] text-white rounded-2xl text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(30,163,84,0.2)] transition-all active:scale-95">
              <MessageCircle size={18} />
              Acessar WhatsApp
            </button>
          </div>

          {/* WIDGET STATUS */}
          <div className="bg-[#0a0a0a] border border-white/5 rounded-[40px] p-10 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]"></div>
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Protocolo Ativo</span>
            </div>
            <ArrowRight size={16} className="text-zinc-800" />
          </div>

        </aside>

      </main>
    </div>
  );
};
