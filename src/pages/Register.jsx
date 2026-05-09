import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import logo from '../assets/logo.webp';

export const Register = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const t = {
    pt: {
      title: 'CRIE SUA CONTA ELITE',
      subtitle: 'Entre para o grupo exclusivo de performance.',
      name: 'Nome Completo',
      email: 'E-mail',
      password: 'Senha',
      btn: 'Finalizar Cadastro',
      back: 'Já tem uma conta? Entrar',
      success: 'Cadastro realizado com sucesso! Bem-vindo ao time.'
    },
    en: {
      title: 'CREATE YOUR ELITE ACCOUNT',
      subtitle: 'Join the exclusive performance group.',
      name: 'Full Name',
      email: 'Email',
      password: 'Password',
      btn: 'Complete Registration',
      back: 'Already have an account? Login',
      success: 'Registration successful! Welcome to the team.'
    }
  }[language || 'pt'];

  const handleRegister = (e) => {
    e.preventDefault();
    alert(t.success);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <Link to="/">
            <img src={logo} alt="RF" className="h-10 mx-auto mb-8 hover:scale-105 transition-transform" />
          </Link>
          <h1 className="text-2xl font-light tracking-tighter uppercase mb-2">{t.title}</h1>
          <p className="text-zinc-500 text-[10px] uppercase tracking-[0.4em]">{t.subtitle}</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-zinc-500 ml-4">{t.name}</label>
            <input 
              type="text" 
              required
              className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-[#00bffa]/40 transition-all"
              placeholder="Ex: Renan Filg"
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-zinc-500 ml-4">{t.email}</label>
            <input 
              type="email" 
              required
              className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-[#00bffa]/40 transition-all"
              placeholder="seu@email.com"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-zinc-500 ml-4">{t.password}</label>
            <input 
              type="password" 
              required
              className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-[#00bffa]/40 transition-all"
              placeholder="••••••••"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button type="submit" className="w-full btn-elite-primary py-5 rounded-2xl text-xs font-bold uppercase tracking-[0.2em] mt-4 shadow-[0_0_30px_rgba(0,191,250,0.15)]">
            {t.btn}
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link to="/login" className="text-[10px] uppercase tracking-widest text-zinc-600 hover:text-white transition-colors">
            {t.back}
          </Link>
        </div>
      </div>
    </div>
  );
};
