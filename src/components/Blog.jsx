import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ChevronRight, Play, FileText, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';

export const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      
      // Se não houver posts, mostramos exemplos de elite
      if (!data || data.length === 0) {
        setPosts([
          {
            id: 'ex1',
            title: 'O Fim do Input Lag: Guia Definitivo 2026',
            excerpt: 'Descubra como reduzir a latência do seu sistema em até 45% com as novas técnicas de otimização de kernel e BIOS.',
            image_url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80',
            date: '09/05/2026',
            category: 'Performance'
          },
          {
            id: 'ex2',
            title: 'GPU Tuning: Máximo FPS no CS2 e Valorant',
            excerpt: 'Configurações secretas do painel NVIDIA e AMD que os profissionais usam para ganhar vantagem competitiva real.',
            image_url: 'https://images.unsplash.com/photo-1587202377425-8b90d5d7f3f1?auto=format&fit=crop&q=80',
            date: '08/05/2026',
            category: 'Tutoriais'
          }
        ]);
      } else {
        setPosts(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="blog" className="py-32 bg-[#020202] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00bffa]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-10 relative z-10">
        <header className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00bffa] shadow-[0_0_10px_#00bffa]"></div>
            <span className="text-[#00bffa] text-[10px] font-bold tracking-[0.5em] uppercase italic">Intelligence Hub</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-light tracking-tighter uppercase mb-6 leading-none">
            ÚLTIMAS <br />
            <span className="italic font-black bg-gradient-to-r from-white via-white to-zinc-600 bg-clip-text text-transparent">MATÉRIAS.</span>
          </h2>
          <p className="text-zinc-500 max-w-xl text-lg font-light leading-relaxed">
            Explorando o limite do hardware. Insights técnicos e guias exclusivos para quem não aceita menos que a perfeição.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {posts.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="glass-card overflow-hidden !p-0 border-white/5 hover:border-[#00bffa]/30 transition-all duration-700">
                {/* Image Container */}
                <div className="aspect-[21/9] relative overflow-hidden">
                  <img 
                    src={post.image_url || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80'} 
                    alt={post.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                  
                  {/* Floating Date */}
                  <div className="absolute bottom-6 left-8 flex items-center gap-3 text-white/60 text-[10px] font-bold uppercase tracking-widest">
                    <Calendar size={14} className="text-[#00bffa]" />
                    {post.date}
                  </div>
                </div>

                {/* Content Container */}
                <div className="p-10 md:p-12">
                  <span className="inline-block px-4 py-1 rounded-full bg-[#00bffa]/10 border border-[#00bffa]/20 text-[#00bffa] text-[9px] font-black uppercase tracking-widest mb-6">
                    {post.category || 'Técnico'}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white mb-6 leading-tight group-hover:text-[#00bffa] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-zinc-500 font-light leading-relaxed mb-8 line-clamp-2">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
                    Ler Matéria Completa <ArrowRight size={16} className="text-[#00bffa]" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 flex justify-center">
          <button className="flex items-center gap-3 px-12 py-6 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-all">
            Ver Todos os Artigos <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};
