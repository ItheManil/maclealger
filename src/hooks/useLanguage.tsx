import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import translations, { type TranslationKey, type Lang } from '@/i18n/translations';

type LanguageContextType = {
  lang: Lang;
  toggleLanguage: () => void;
  t: (key: TranslationKey) => string;
  dir: 'ltr' | 'rtl';
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANG_CYCLE: Lang[] = ['fr', 'en', 'ar'];

const getInitialLang = (): Lang => {
  try {
    const stored = localStorage.getItem('lang');
    if (stored === 'en' || stored === 'fr' || stored === 'ar') return stored;
  } catch {}
  return 'fr';
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>(getInitialLang);

  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', lang);
  }, [lang, dir]);

  const toggleLanguage = useCallback(() => {
    setLang((prev) => {
      const idx = LANG_CYCLE.indexOf(prev);
      const next = LANG_CYCLE[(idx + 1) % LANG_CYCLE.length];
      try { localStorage.setItem('lang', next); } catch {}
      return next;
    });
  }, []);

  const t = useCallback(
    (key: TranslationKey) => translations[key]?.[lang] ?? key,
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
};
