import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut, FileText, MessageSquare, Download, User, ShieldCheck } from 'lucide-react';
import logo from '../assets/logo.webp';

export const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/login');
      } else {
        setUser(user);
      }
      setLoading(false);
    };
    checkUser();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  if (loading) return (
    <div className="min-h-screen bg-[#020202] flex items-center justify-center">
      <div className="w-12 h-12 border-2 border-[#00bffa]/20 border-t-[#00bffa] rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020202] text-white font-light">
      {/* Header */}
      <header className="border-b border-white/5 bg-[#020202]/50 backdrop-blur-xl fixed top-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <img src={logo} alt="RF" className="h-6" />
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10">
              <User size={14} className="text-[#00bffa]" />
              <span className="text-[10px] uppercase tracking-widest">{user?.email}</span>
            </div>
            <button onClick={handleLogout} className="text-zinc-500 hover:text-red-400 transition-colors">
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </header>

      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-light tracking-tighter uppercase mb-2">Central do <span className="text-[#00bffa] italic">Membro</span></h1>
          <p className="text-zinc-500 italic">Bem-vindo ao seu ambiente de alta performance.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Files Card */}
          <div className="md:col-span-2 glass-card p-8 border border-white/5">
            <div className="flex items-center gap-3 mb-8">
              <FileText className="text-[#00bffa]" size={24} />
              <h3 className="text-lg uppercase tracking-widest font-light">Repositório de Arquivos</h3>
            </div>
            
            <div className="space-y-4">
              {[
                { name: "Protocolo BIOS RF v2.4", size: "1.2 MB", date: "08/05/2026" },
                { name: "Driver Kernel Cleaner Elite", size: "450 KB", date: "07/05/2026" },
                { name: "Script Otimização Windows 11", size: "12 KB", date: "01/05/2026" }
              ].map((file, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#00bffa]/20 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#00bffa]/5 flex items-center justify-center border border-[#00bffa]/10">
                      <Download size={18} className="text-[#00bffa]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-light uppercase tracking-tight">{file.name}</h4>
                      <p className="text-[10px] text-zinc-600 uppercase tracking-widest">{file.size} • {file.date}</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-[10px] uppercase tracking-widest hover:bg-[#00bffa] hover:text-black transition-all">Download</button>
                </div>
              ))}
            </div>
          </div>

          {/* Chat / Support Card */}
          <div className="glass-card p-8 border border-white/5 bg-gradient-to-br from-[#00bffa]/5 to-transparent">
            <div className="flex items-center gap-3 mb-8">
              <MessageSquare className="text-[#00bffa]" size={24} />
              <h3 className="text-lg uppercase tracking-widest font-light">Suporte Direto</h3>
            </div>
            <div className="h-64 flex flex-col items-center justify-center text-center opacity-40">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mb-4">
                <ShieldCheck size={24} />
              </div>
              <p className="text-xs uppercase tracking-[0.2em]">Canal Seguro Habilitado</p>
              <p className="text-[10px] text-zinc-500 mt-2">Fale com o Renan sobre sua otimização.</p>
            </div>
            <button className="w-full btn-elite-primary !py-4 mt-8">INICIAR CHAT</button>
          </div>
        </div>

        {/* Admin Section (Only visible if admin metadata exists - concept) */}
        {user?.email === 'admin@renanfilg.com' && (
          <div className="mt-12 p-8 rounded-2xl border border-[#00bffa]/30 bg-[#00bffa]/5">
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck className="text-[#00bffa]" />
              <h3 className="text-lg uppercase tracking-widest font-light">Painel Administrativo</h3>
            </div>
            <p className="text-sm text-zinc-400 mb-6">Você tem permissões de super-usuário. O Modo de Edição do site está ativo.</p>
            <Link to="/" className="btn-elite-glass !py-3">IR PARA O SITE E EDITAR</Link>
          </div>
        )}
      </main>
    </div>
  );
};
