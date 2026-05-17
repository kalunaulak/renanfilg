import { supabase } from './supabase';

const defaultFiles = [
  { id: 'f1', title: 'Kernel Optimizer Script', version: '2.4', category: 'Kernel', link: '#', created_at: new Date().toISOString() },
  { id: 'f2', title: 'BIOS Ultimate Profile', version: '1.8', category: 'BIOS', link: '#', created_at: new Date().toISOString() },
  { id: 'f3', title: 'Latency Buster Tool', version: '3.1', category: 'Windows', link: '#', created_at: new Date().toISOString() }
];

const defaultVideos = [
  { id: 'v1', title: 'Otimização Avançada de BIOS para Redução de Input Lag', duration: '18:45', video_id: 'dQw4w9WgXcQ', category: 'BIOS', thumbnail_url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80', created_at: new Date().toISOString() },
  { id: 'v2', title: 'Configuração Extrema de Drivers de Vídeo NVIDIA', duration: '14:20', video_id: 'dQw4w9WgXcQ', category: 'GPU', thumbnail_url: 'https://images.unsplash.com/photo-1587202377425-8b90d5d7f3f1?auto=format&fit=crop&q=80', created_at: new Date().toISOString() }
];

const defaultPosts = [
  {
    id: 'p1',
    title: 'O Fim do Input Lag: Guia Definitivo 2026',
    excerpt: 'Descubra como reduzir a latência do seu sistema em até 45% com as novas técnicas de otimização de kernel e BIOS.',
    content: 'O input lag é o maior inimigo da alta performance nos eSports. Neste guia, vamos explorar como otimizar seu sistema operacional ao nível de kernel e ajustar sua placa-mãe para atingir o menor atraso possível.\n\n### O que é Input Lag?\nO atraso de entrada (input lag) é o tempo que leva para uma ação física (como clicar no mouse ou pressionar uma tecla) ser processada e exibida na tela.\n\n### Otimizando BIOS\n1. Ative o **XMP / DOCP** para memórias operarem na frequência máxima.\n2. Desative o **HPET** (High Precision Event Timer) tanto na BIOS quanto no Windows.\n3. Desative opções de economia de energia como **C-States** e **Intel SpeedStep / AMD Cool\'n\'Quiet**.',
    image_url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80',
    date: '09/05/2026',
    category: 'Performance',
    created_at: new Date().toISOString()
  },
  {
    id: 'p2',
    title: 'GPU Tuning: Máximo FPS no CS2 e Valorant',
    excerpt: 'Configurações secretas do painel NVIDIA e AMD que os profissionais usam para ganhar vantagem competitiva real.',
    content: 'Otimizar o chip gráfico vai muito além de apenas atualizar os drivers. Vamos ver as configurações que removem qualquer gargalo entre seu processador e sua placa de vídeo.\n\n### Painel de Controle NVIDIA\n- **Modo de Gerenciamento de Energia:** Preferência por desempenho máximo.\n- **Modo de Latência Baixa:** Ultra.\n- **Filtragem de Textura - Qualidade:** Alto Desempenho.',
    image_url: 'https://images.unsplash.com/photo-1587202377425-8b90d5d7f3f1?auto=format&fit=crop&q=80',
    date: '08/05/2026',
    category: 'Tutoriais',
    created_at: new Date().toISOString()
  }
];

let isOfflineMode = null;

async function checkConnection() {
  if (isOfflineMode !== null) return isOfflineMode;
  
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    console.warn("[RF SYSTEM] Supabase credentials missing. Running in Offline Mode.");
    isOfflineMode = true;
    return true;
  }
  
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 1800);
  
  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/?apikey=${supabaseKey}`, {
      method: 'GET',
      headers: { 'apikey': supabaseKey },
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    
    // If the HTTP request resolved, we are online. A paused DB will fail to resolve.
    isOfflineMode = !(response.ok || response.status === 400 || response.status === 401 || response.status === 404);
    if (isOfflineMode) {
      console.warn("[RF SYSTEM] Supabase database paused or unreachable. Using Offline Fallback.");
    } else {
      console.log("[RF SYSTEM] Supabase connection established successfully. Real-time synchronization active.");
      isOfflineMode = false;
    }
  } catch (err) {
    clearTimeout(timeoutId);
    console.warn("[RF SYSTEM] Supabase server offline or name not resolved. Activating Premium Offline Fallback.");
    isOfflineMode = true;
  }
  return isOfflineMode;
}

export const db = {
  isOffline: async () => {
    return await checkConnection();
  },
  
  getFiles: async () => {
    const offline = await checkConnection();
    if (offline) {
      const local = localStorage.getItem('rf_files');
      if (local) return JSON.parse(local);
      localStorage.setItem('rf_files', JSON.stringify(defaultFiles));
      return defaultFiles;
    }
    try {
      const { data, error } = await supabase.from('files').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    } catch (err) {
      console.error("[RF DB] Failed to fetch files from Supabase, using localStorage", err);
      const local = localStorage.getItem('rf_files');
      return local ? JSON.parse(local) : defaultFiles;
    }
  },
  
  getVideos: async () => {
    const offline = await checkConnection();
    if (offline) {
      const local = localStorage.getItem('rf_videos');
      if (local) return JSON.parse(local);
      localStorage.setItem('rf_videos', JSON.stringify(defaultVideos));
      return defaultVideos;
    }
    try {
      const { data, error } = await supabase.from('videos').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    } catch (err) {
      console.error("[RF DB] Failed to fetch videos from Supabase, using localStorage", err);
      const local = localStorage.getItem('rf_videos');
      return local ? JSON.parse(local) : defaultVideos;
    }
  },
  
  getPosts: async () => {
    const offline = await checkConnection();
    if (offline) {
      const local = localStorage.getItem('rf_posts');
      if (local) return JSON.parse(local);
      localStorage.setItem('rf_posts', JSON.stringify(defaultPosts));
      return defaultPosts;
    }
    try {
      const { data, error } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    } catch (err) {
      console.error("[RF DB] Failed to fetch posts from Supabase, using localStorage", err);
      const local = localStorage.getItem('rf_posts');
      return local ? JSON.parse(local) : defaultPosts;
    }
  },
  
  getSiteContent: async () => {
    const offline = await checkConnection();
    if (offline) {
      const local = localStorage.getItem('rf_site_content');
      return local ? JSON.parse(local) : {};
    }
    try {
      const { data, error } = await supabase.from('site_content').select('*');
      if (error) throw error;
      const contentMap = {};
      (data || []).forEach(item => {
        contentMap[item.key] = item.content;
      });
      return contentMap;
    } catch (err) {
      console.error("[RF DB] Failed to fetch site content from Supabase, using localStorage", err);
      const local = localStorage.getItem('rf_site_content');
      return local ? JSON.parse(local) : {};
    }
  },
  
  updateSiteContent: async (key, content) => {
    const offline = await checkConnection();
    if (offline) {
      const local = localStorage.getItem('rf_site_content');
      const contentMap = local ? JSON.parse(local) : {};
      contentMap[key] = content;
      localStorage.setItem('rf_site_content', JSON.stringify(contentMap));
      return true;
    }
    try {
      const { error } = await supabase
        .from('site_content')
        .upsert({ key, content }, { onConflict: 'key' });
      if (error) throw error;
      return true;
    } catch (err) {
      console.error("[RF DB] Failed to update site content on Supabase, using localStorage", err);
      const local = localStorage.getItem('rf_site_content');
      const contentMap = local ? JSON.parse(local) : {};
      contentMap[key] = content;
      localStorage.setItem('rf_site_content', JSON.stringify(contentMap));
      return true;
    }
  },
  
  publishData: async (files, videos, posts) => {
    const offline = await checkConnection();
    if (offline) {
      localStorage.setItem('rf_files', JSON.stringify(files));
      localStorage.setItem('rf_videos', JSON.stringify(videos));
      localStorage.setItem('rf_posts', JSON.stringify(posts));
      return true;
    }
    try {
      await supabase.from('files').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      if (files.length > 0) {
        await supabase.from('files').insert(files.map(({id, created_at, ...rest}) => rest));
      }
      
      await supabase.from('videos').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      if (videos.length > 0) {
        await supabase.from('videos').insert(videos.map(({id, created_at, ...rest}) => rest));
      }
      
      await supabase.from('posts').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      if (posts.length > 0) {
        await supabase.from('posts').insert(posts.map(({id, created_at, ...rest}) => rest));
      }
      
      localStorage.setItem('rf_files', JSON.stringify(files));
      localStorage.setItem('rf_videos', JSON.stringify(videos));
      localStorage.setItem('rf_posts', JSON.stringify(posts));
      return true;
    } catch (err) {
      console.error("[RF DB] Failed to publish data to Supabase", err);
      throw err;
    }
  }
};
