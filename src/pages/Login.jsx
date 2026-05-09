import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { motion } from 'framer-motion';
import { LogIn, Mail, Lock, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.webp';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      navigate('/dashboard');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#020202] flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#00bffa0a_0%,transparent_50%)]"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full glass-card p-10 relative z-10 border border-white/5"
      >
        <Link to="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-[10px] uppercase tracking-[0.2em] mb-12">
          <ArrowLeft size={14} /> Voltar ao site
        </Link>

        <div className="text-center mb-10">
          <img src={logo} alt="RF" className="h-8 mx-auto mb-6 opacity-80" />
          <h1 className="text-2xl font-light tracking-tighter text-white uppercase">Acesso <span className="text-[#00bffa] italic">Protocolo</span></h1>
          <p className="text-zinc-500 text-sm font-light mt-2 italic">Identifique-se para acessar seu dashboard.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] text-zinc-500 uppercase tracking-widest px-1">E-mail</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#00bffa]/30 transition-all font-light"
                placeholder="seu@email.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] text-zinc-500 uppercase tracking-widest px-1">Senha</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#00bffa]/30 transition-all font-light"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <p className="text-red-500/80 text-[10px] uppercase tracking-wider text-center bg-red-500/5 py-2 rounded-lg border border-red-500/10">
              {error}
            </p>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="btn-elite-primary w-full py-6 group flex items-center justify-center gap-3"
          >
            {loading ? 'AUTENTICANDO...' : 'ENTRAR NO DASHBOARD'}
            <LogIn size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-zinc-600 text-[10px] uppercase tracking-widest">
            Não tem acesso? <a href="#agendar" className="text-white hover:text-[#00bffa] transition-colors">Solicite aqui</a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};
