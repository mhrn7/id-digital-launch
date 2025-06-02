
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from './LanguageProvider';

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { 
      code: 'PT' as const, 
      name: 'Português', 
      flag: '🇧🇷' 
    },
    { 
      code: 'EN' as const, 
      name: 'English', 
      flag: '🇺🇸' 
    },
    { 
      code: 'ES' as const, 
      name: 'Español', 
      flag: '🇪🇸' 
    }
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  const handleLanguageSelect = (langCode: 'PT' | 'EN' | 'ES') => {
    setLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-white hover:text-idOrange transition-colors duration-300 px-3 py-2 rounded-md"
      >
        <span className="text-lg">{currentLanguage?.flag}</span>
        <span className="text-sm font-medium">{currentLanguage?.code}</span>
        <ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-idDarkBlack border border-gray-700 rounded-lg shadow-lg z-50 min-w-[140px]">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageSelect(lang.code)}
              className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-800 transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg ${
                language === lang.code ? 'bg-idOrange/20 text-idOrange' : 'text-white'
              }`}
            >
              <span className="text-lg">{lang.flag}</span>
              <div>
                <div className="text-sm font-medium">{lang.name}</div>
                <div className="text-xs text-gray-400">{lang.code}</div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Overlay to close dropdown when clicking outside */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default LanguageSelector;
