import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { db } from '../lib/db';

export const useContent = () => {
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const fetchContent = async () => {
    try {
      const data = await db.getSiteContent();
      setContent(data || {});
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const checkAdmin = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      setIsAdmin(user?.email === 'kaluancout@gmail.com' || user?.email === 'admin@renanfilg.com');
    } catch (err) {
      setIsAdmin(false);
    }
  };

  const updateContent = async (key, newContent) => {
    const success = await db.updateSiteContent(key, newContent);
    if (success) {
      setContent(prev => ({ ...prev, [key]: newContent }));
    }
    return success;
  };

  useEffect(() => {
    fetchContent();
    checkAdmin();
  }, []);

  return { content, loading, isAdmin, updateContent };
};
