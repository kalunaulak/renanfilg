import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import logo from '../assets/logo.webp';

export const Login = () => {
  const { language } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const t = {
    pt: {
      back: '← Voltar para o site',
      title: 'Área do Assinante',
      desc: 'Insira suas credenciais para acessar o painel elite.',
      email: 'Email',
      pass: 'Senha',
      btn: 'Acessar Painel',
      secure: 'Conexão Segura AES-256',
      simulated: 'Login simulado com sucesso!',
      unauthorized: 'Email não autorizado no momento.'
    },
    en: {
      back: '← Back to site',
      title: 'Subscribers Area',
      desc: 'Enter your credentials to access the elite panel.',
      email: 'Email',
      pass: 'Password',
      btn: 'Access Panel',
      secure: 'Secure Connection AES-256',
      simulated: 'Simulated login successful!',
      unauthorized: 'Email not authorized at this time.'
    }
  }[language || 'pt'];

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'admin@renanfilg.com') {
      alert(t.simulated);
      navigate('/admin/dashboard');
    } else if (email === 'kaluancout@gmail.com') {
      alert(t.simulated);
      navigate('/dashboard');
    } else {
      alert(t.unauthorized);
    }
  };

  return (
    <div className="min-h-screen bg-[#020202] flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#00bffa]/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#005eea]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        <Link to="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-12 text-[10px] uppercase tracking-[0.3em]">
          {t.back}
        </Link>

        <div className="glass-card p-10 border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00bffa]/50 to-transparent"></div>

          <div className="text-center mb-10">
            <img src={logo} alt="RF" className="h-8 mx-auto mb-8" />
            <h1 className="text-2xl font-light text-white tracking-tight uppercase mb-2">{t.title}</h1>
            <p className="text-zinc-500 text-xs font-light tracking-tight">{t.desc}</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] text-zinc-500 uppercase tracking-widest pl-1">{t.email}</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full bg-white/[0.03] border border-white/5 rounded-xl py-4 px-6 text-sm text-white focus:outline-none focus:border-[#00bffa]/30 transition-all"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] text-zinc-500 uppercase tracking-widest pl-1">{t.pass}</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white/[0.03] border border-white/5 rounded-xl py-4 px-6 text-sm text-white focus:outline-none focus:border-[#00bffa]/30 transition-all"
                required
              />
            </div>

            <button type="submit" className="w-full btn-elite-primary !py-4 uppercase tracking-widest text-[10px]">
              {t.btn}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest">
              {language === 'pt' ? 'Não tem uma conta?' : "Don't have an account?"}{' '}
              <Link to="/register" className="text-[#00bffa] hover:underline">
                {language === 'pt' ? 'Cadastre-se' : 'Register now'}
              </Link>
            </p>
          </div>

          <div className="mt-10 pt-8 border-t border-white/5 text-center">
            <span className="text-[9px] text-zinc-600 uppercase tracking-[0.2em]">{t.secure}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
