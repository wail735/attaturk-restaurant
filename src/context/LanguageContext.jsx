import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../translations';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('fr');

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === 'fr' ? 'ar' : 'fr'));
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  useEffect(() => {
    // Update HTML dir attribute for RTL support
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
