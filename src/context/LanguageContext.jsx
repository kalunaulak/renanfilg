import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('rf-lang');
    return (saved === 'pt' || saved === 'en') ? saved : null;
  });

  const selectLanguage = (lang) => {
    const validLang = (lang === 'pt' || lang === 'en') ? lang : 'pt';
    setLanguage(validLang);
    localStorage.setItem('rf-lang', validLang);
  };

  return (
    <LanguageContext.Provider value={{ language, selectLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
