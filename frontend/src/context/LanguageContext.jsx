// (tùy chọn – nếu bạn muốn quản lý ngôn ngữ ngoài i18next)
import { createContext, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language);

  const toggleLanguage = () => {
    const newLang = lang === 'vi' ? 'en' : 'vi';
    i18n.changeLanguage(newLang);
    setLang(newLang);
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);