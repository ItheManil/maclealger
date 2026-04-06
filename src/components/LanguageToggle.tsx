import { useLanguage } from '@/hooks/useLanguage';
import type { Lang } from '@/i18n/translations';

const NEXT_LABEL: Record<Lang, string> = {
  fr: 'EN',
  en: 'عر',
  ar: 'FR',
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
      className="relative w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200 hover:bg-accent border border-border text-[11px] font-bold tracking-wide text-foreground uppercase"
    >
      {NEXT_LABEL[lang]}
    </button>
  );
};

export default LanguageToggle;
