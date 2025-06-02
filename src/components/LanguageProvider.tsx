
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

type Language = 'PT' | 'EN' | 'ES';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('PT');

  useEffect(() => {
    const storedLanguage = (localStorage.getItem('language') as Language) || 'PT';
    setLanguageState(storedLanguage);
    
    const handleLanguageChange = () => {
      const updatedLanguage = (localStorage.getItem('language') as Language) || 'PT';
      setLanguageState(updatedLanguage);
    };
    
    window.addEventListener('languageChanged', handleLanguageChange);
    return () => window.removeEventListener('languageChanged', handleLanguageChange);
  }, []);

  const setLanguage = (lang: Language) => {
    localStorage.setItem('language', lang);
    setLanguageState(lang);
    window.dispatchEvent(new Event('languageChanged'));
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
