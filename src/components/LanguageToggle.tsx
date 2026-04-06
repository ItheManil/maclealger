import { useLanguage } from '@/hooks/useLanguage';

const LanguageToggle = () => {
  const { lang, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      aria-label={lang === 'fr' ? 'Switch to English' : 'Passer en français'}
      className="relative w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200 hover:bg-accent border border-border text-[11px] font-bold tracking-wide text-foreground uppercase"
    >
      <span
        className={`absolute transition-all duration-300 ${
          lang === 'fr' ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
        }`}
      >
        EN
      </span>
      <span
        className={`absolute transition-all duration-300 ${
          lang === 'en' ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
        }`}
      >
        FR
      </span>
    </button>
  );
};

export default LanguageToggle;
