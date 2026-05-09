import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export const useContent = () => {
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const fetchContent = async () => {
    const { data, error } = await supabase.from('site_content').select('*');
    if (data) {
      const contentMap = {};
      data.forEach(item => {
        contentMap[item.key] = item.content;
      });
      setContent(contentMap);
    }
    setLoading(false);
  };

  const checkAdmin = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setIsAdmin(user?.email === 'kaluancout@gmail.com' || user?.email === 'admin@renanfilg.com');
  };

  const updateContent = async (key, newContent) => {
    const { error } = await supabase
      .from('site_content')
      .upsert({ key, content: newContent }, { onConflict: 'key' });
    
    if (!error) {
      setContent(prev => ({ ...prev, [key]: newContent }));
    }
    return !error;
  };

  useEffect(() => {
    fetchContent();
    checkAdmin();
  }, []);

  return { content, loading, isAdmin, updateContent };
};
