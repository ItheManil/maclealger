import { useLanguage } from '@/hooks/useLanguage';
import type { Lang } from '@/i18n/translations';

const CURRENT_FLAG: Record<Lang, string> = {
  fr: '🇫🇷',
  en: '🇬🇧',
  ar: '🇸🇦',
};

const ARIA_LABEL: Record<Lang, string> = {
  fr: 'Switch to English',
  en: 'التبديل إلى العربية',
  ar: 'Passer en français',
};

const LanguageToggle = () => {
  const { lang, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      aria-label={ARIA_LABEL[lang]}
      className="relative w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-accent border border-border text-lg leading-none active:scale-90"
    >
      <span key={lang} className="animate-fade-in">
        {CURRENT_FLAG[lang]}
      </span>
    </button>
  );
};

export default LanguageToggle;
