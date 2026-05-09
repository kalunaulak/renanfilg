import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.webp';

export const AdminDashboard = () => {
  const navigate = useNavigate();
  
  const defaultContent = {
    files: [
      { id: 1, name: 'Pack de Drivers Elite v4.2', desc: 'Drivers otimizados para baixa latência', url: '#' },
      { id: 2, name: 'Scripts de Limpeza de Kernel', desc: 'Remoção de telemetria e bloatware', url: '#' },
    ],
    videos: [
      { id: 1, title: 'Como formatar um pendrive para a BIOS', duration: '05:20', thumb: 'https://images.unsplash.com/photo-1591488320449-011701bb6704', url: '#' },
    ]
  };

  const [content, setContent] = useState(defaultContent);

  // Carrega ao iniciar
  useEffect(() => {
    const saved = localStorage.getItem('RF_ADMIN_DATA');
    if (saved) {
      try {
        setContent(JSON.parse(saved));
      } catch (e) {
        console.error("Erro ao carregar dados", e);
      }
    }
  }, []);

  const publishData = () => {
    // SALVA EM DUAS CHAVES PARA GARANTIR
    const dataString = JSON.stringify(content);
    localStorage.setItem('RF_ADMIN_DATA', dataString);
    localStorage.setItem('rf_content', dataString); // Chave que o Dashboard lê
    
    // Dispara evento manual para o navegador
    window.dispatchEvent(new Event('storage'));
    
    alert('🚀 PUBLICADO COM SUCESSO! Verifique a aba do aluno agora.');
  };

  const updateFile = (id, field, value) => {
    setContent(prev => ({ ...prev, files: prev.files.map(f => f.id === id ? { ...f, [field]: value } : f) }));
  };

  const updateVideo = (id, field, value) => {
    setContent(prev => ({ ...prev, videos: prev.videos.map(v => v.id === id ? { ...v, [field]: value } : v) }));
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white p-12 lg:p-24 font-sans selection:bg-[#00bffa]/30">
      <div className="max-w-6xl mx-auto">
        
        <header className="flex justify-between items-center mb-24 border-b border-white/10 pb-16">
          <div className="flex items-center gap-10">
            <img src={logo} alt="RF" className="h-10" />
            <div>
              <h1 className="text-4xl font-thin uppercase text-white">GESTOR CMS.</h1>
              <p className="text-[10px] text-[#00bffa] font-black tracking-[0.4em] uppercase">Sincronização Ativa</p>
            </div>
          </div>
          <div className="flex gap-4">
             <button onClick={() => { localStorage.clear(); window.location.reload(); }} className="px-6 py-2 text-[8px] border border-white/10 rounded-full hover:bg-red-500/20 uppercase font-black">Limpar Cache</button>
             <button onClick={publishData} className="px-16 py-6 rounded-full bg-[#00bffa] text-black text-[12px] font-black uppercase tracking-[0.4em] hover:scale-105 transition-all shadow-[0_0_40px_rgba(0,191,250,0.4)]">Publicar Agora</button>
          </div>
        </header>

        <div className="space-y-32">
          {/* GESTÃO DE ARQUIVOS */}
          <section>
            <div className="flex justify-between items-end mb-12 border-l-8 border-[#00bffa] pl-10">
               <h2 className="text-3xl font-thin uppercase">Downloads</h2>
               <button onClick={() => setContent(prev => ({ ...prev, files: [{ id: Date.now(), name: 'NOVO', desc: '', url: '#' }, ...prev.files] }))} className="text-[#00bffa] text-[10px] font-black uppercase">+ Novo</button>
            </div>
            <div className="grid grid-cols-1 gap-8">
              {content.files.map((file) => (
                <div key={file.id} className="p-12 rounded-[50px] bg-white/[0.03] border-2 border-white/20 space-y-8 relative">
                  <button onClick={() => setContent(prev => ({ ...prev, files: prev.files.filter(f => f.id !== file.id) }))} className="absolute top-8 right-10 text-red-500/50 text-[10px] font-black uppercase">Remover</button>
                  <div className="grid grid-cols-2 gap-10">
                    <input type="text" value={file.name} onChange={(e) => updateFile(file.id, 'name', e.target.value)} placeholder="NOME DO ARQUIVO" className="w-full bg-black border-2 border-white/20 rounded-[30px] p-6 text-white text-xl font-thin" />
                    <input type="text" value={file.url} onChange={(e) => updateFile(file.id, 'url', e.target.value)} placeholder="URL DE DOWNLOAD" className="w-full bg-black border-2 border-white/20 rounded-[30px] p-6 text-[#00bffa] text-sm" />
                  </div>
                  <input type="text" value={file.desc} onChange={(e) => updateFile(file.id, 'desc', e.target.value)} placeholder="DESCRIÇÃO" className="w-full bg-black border-2 border-white/20 rounded-[30px] p-6 text-white/60 text-sm" />
                </div>
              ))}
            </div>
          </section>

          {/* GESTÃO DE VÍDEOS */}
          <section>
            <div className="flex justify-between items-end mb-12 border-l-8 border-white/40 pl-10">
               <h2 className="text-3xl font-thin uppercase">Playlist</h2>
               <button onClick={() => setContent(prev => ({ ...prev, videos: [{ id: Date.now(), title: 'NOVA AULA', duration: '00:00', thumb: '', url: '#' }, ...prev.videos] }))} className="text-white text-[10px] font-black uppercase">+ Novo</button>
            </div>
            <div className="grid grid-cols-1 gap-8">
              {content.videos.map((video) => (
                <div key={video.id} className="p-12 rounded-[50px] bg-white/[0.03] border-2 border-white/20 space-y-8 relative">
                  <button onClick={() => setContent(prev => ({ ...prev, videos: prev.videos.filter(v => v.id !== video.id) }))} className="absolute top-8 right-10 text-red-500/50 text-[10px] font-black uppercase">Remover</button>
                  <div className="grid grid-cols-2 gap-10">
                    <input type="text" value={video.title} onChange={(e) => updateVideo(video.id, 'title', e.target.value)} placeholder="TÍTULO DA AULA" className="w-full bg-black border-2 border-white/20 rounded-[30px] p-6 text-white text-xl font-thin" />
                    <input type="text" value={video.url} onChange={(e) => updateVideo(video.id, 'url', e.target.value)} placeholder="LINK DO VÍDEO" className="w-full bg-black border-2 border-white/20 rounded-[30px] p-6 text-[#00bffa] text-sm" />
                  </div>
                  <div className="grid grid-cols-2 gap-10">
                    <input type="text" value={video.thumb} onChange={(e) => updateVideo(video.id, 'thumb', e.target.value)} placeholder="URL DA CAPA" className="w-full bg-black border-2 border-white/20 rounded-[30px] p-6 text-white/30 text-[10px]" />
                    <input type="text" value={video.duration} onChange={(e) => updateVideo(video.id, 'duration', e.target.value)} placeholder="DURAÇÃO" className="w-full bg-black border-2 border-white/20 rounded-[30px] p-6 text-white text-sm" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
