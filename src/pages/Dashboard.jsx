import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import logo from '../assets/logo.webp';

export const Dashboard = () => {
  const { language } = useLanguage();
  const [content, setContent] = useState(null);

  const loadData = useCallback(() => {
    try {
      const saved = localStorage.getItem('rf_content') || localStorage.getItem('RF_ADMIN_DATA');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Validação simples da estrutura
        if (parsed.files && parsed.videos) {
          setContent(parsed);
          return;
        }
      }
      
      // Fallback Padrão
      setContent({
        files: [
          { name: 'Pack de Drivers Elite v4.2', desc: 'Drivers otimizados para baixa latência', url: '#' },
          { name: 'Scripts de Limpeza de Kernel', desc: 'Remoção de telemetria e bloatware', url: '#' },
          { name: 'Otimizador de Latência TCP', desc: 'Ajustes de rede para jogos competitivos', url: '#' }
        ],
        videos: [
          { title: 'Como formatar um pendrive para a BIOS', duration: '05:20', thumb: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=400', url: '#' },
          { title: 'Ferramentas úteis pós-instalação', duration: '12:45', thumb: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=400', url: '#' },
          { title: 'Como salvar sua otimização (Backup)', duration: '08:15', thumb: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&q=80&w=400', url: '#' },
        ]
      });
    } catch (e) {
      console.error("Dashboard Sync Error:", e);
    }
  }, []);

  useEffect(() => {
    loadData();

    const handleSync = (e) => {
      if (e.key === 'rf_content' || e.key === 'RF_ADMIN_DATA' || !e.key) {
        loadData();
      }
    };

    window.addEventListener('storage', handleSync);
    // Polling agressivo de 1 segundo para garantir
    const interval = setInterval(loadData, 1000);

    return () => {
      window.removeEventListener('storage', handleSync);
      clearInterval(interval);
    };
  }, [loadData]);

  if (!content) return null;

  const t = {
    pt: {
      title: 'Painel do Assinante',
      subtitle: 'Protocolo de Performance Elite',
      logout: 'Sair do Painel',
      files_title: 'Arquivos Obrigatórios (Pré-Otimização)',
      playlist_title: 'Playlist de Treinamento',
      video_lesson: 'Aula',
      video_content: 'de conteúdo',
      video_desc: 'Neste tutorial você aprenderá o passo a passo completo para executar esta etapa do protocolo com segurança.',
      community_title: 'Comunidade VIP',
      community_desc: 'Entre no grupo exclusivo de alunos no WhatsApp para atualizações em tempo real.',
      community_btn: 'Acessar WhatsApp',
    },
    en: {
      title: 'Subscriber Panel',
      subtitle: 'Elite Performance Protocol',
      logout: 'Exit Panel',
      files_title: 'Mandatory Files (Pre-Optimization)',
      playlist_title: 'Training Playlist',
      video_lesson: 'Lesson',
      video_content: 'of content',
      video_desc: 'In this tutorial, you will learn the complete step-by-step to execute this stage of the protocol safely.',
      community_title: 'VIP Community',
      community_desc: 'Join the exclusive student group on WhatsApp for real-time updates.',
      community_btn: 'Access WhatsApp',
    }
  }[language || 'pt'];

  return (
    <div className="min-h-screen bg-[#020202] text-white p-6 md:p-12 selection:bg-[#00bffa]/30">
      <div className="max-w-7xl mx-auto">
        
        {/* Status Bar de Debug (Discreta) */}
        <div className="fixed top-2 right-4 flex items-center gap-2">
           <span className="w-1 h-1 rounded-full bg-[#00bffa] animate-pulse"></span>
           <span className="text-[8px] font-black text-white/20 uppercase tracking-widest">Live Sync Ativo</span>
        </div>

        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
          <div className="flex items-center gap-6">
            <Link to="/">
              <img src={logo} alt="RF" className="h-8 w-auto" />
            </Link>
            <div className="w-px h-8 bg-white/10 hidden md:block"></div>
            <div>
              <h1 className="text-xl font-light tracking-tight uppercase">{t.title}</h1>
              <p className="text-zinc-500 text-[10px] uppercase tracking-[0.3em]">{t.subtitle}</p>
            </div>
          </div>
          <Link to="/" className="text-[10px] uppercase tracking-widest text-zinc-500 hover:text-white transition-colors border border-white/5 px-6 py-3 rounded-full bg-white/[0.02]">
            {t.logout}
          </Link>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <section className="glass-card p-10 border border-[#00bffa]/20 bg-[#00bffa]/5 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#00bffa]"></div>
              <h2 className="text-[10px] uppercase tracking-[0.4em] text-[#00bffa] mb-8">{t.files_title}</h2>
              <div className="space-y-4">
                {content.files.map((file, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 rounded-xl bg-white/[0.03] border border-white/5 hover:border-[#00bffa]/30 transition-all group gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-[#00bffa]/10 flex items-center justify-center text-[10px] font-bold text-[#00bffa]">ZIP</div>
                      <div>
                        <span className="text-sm font-light uppercase tracking-widest block mb-1">{file.name}</span>
                        <span className="text-[10px] text-zinc-500 uppercase tracking-widest">{file.desc}</span>
                      </div>
                    </div>
                    <a href={file.url} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-6 py-3 rounded-full bg-white/5 text-[10px] text-center uppercase tracking-widest text-[#00bffa] hover:bg-[#00bffa] hover:text-black transition-all">Download</a>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 mb-8 flex items-center gap-2">
                <span className="w-8 h-px bg-white/10"></span>
                {t.playlist_title}
              </h2>
              <div className="space-y-8">
                {content.videos.map((video, idx) => (
                  <div key={idx} className="group glass-card p-4 border border-white/5 hover:border-white/10 transition-all">
                    <div className="flex flex-col md:flex-row gap-8">
                      <a href={video.url} target="_blank" rel="noopener noreferrer" className="w-full md:w-64 aspect-video rounded-lg overflow-hidden bg-zinc-900 relative shrink-0">
                        <img src={video.thumb} alt={video.title} className="w-full h-full object-cover opacity-40 group-hover:opacity-70 transition-all" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-[#00bffa] transition-all">
                            <span className="text-[10px] ml-1 text-white">▶</span>
                          </div>
                        </div>
                      </a>
                      <div className="flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-[9px] px-2 py-0.5 rounded bg-white/5 text-zinc-500 uppercase tracking-widest border border-white/5">{t.video_lesson} {idx + 1}</span>
                          <span className="text-[9px] text-[#00bffa] uppercase tracking-widest">{video.duration} {t.video_content}</span>
                        </div>
                        <h3 className="text-xl font-light tracking-tight mb-3 group-hover:text-[#00bffa] transition-colors">{video.title}</h3>
                        <p className="text-xs text-zinc-500 font-light leading-relaxed max-w-xl">
                          {t.video_desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="lg:col-span-1">
            <section className="p-8 rounded-2xl bg-gradient-to-br from-[#25d366]/10 to-transparent border border-[#25d366]/20 sticky top-12">
              <h2 className="text-[10px] uppercase tracking-[0.4em] text-[#25d366] mb-4">{t.community_title}</h2>
              <p className="text-xs font-light text-zinc-400 mb-6 leading-relaxed">
                {t.community_desc}
              </p>
              <a 
                href="https://wa.me/55SEUNUMERO" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-[#25d366] text-black text-[10px] font-bold uppercase tracking-widest hover:bg-[#1fb355] transition-all"
              >
                {t.community_btn}
              </a>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
};
