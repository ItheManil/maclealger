import { useLanguage } from '@/hooks/useLanguage';
import type { Lang } from '@/i18n/translations';

const FLAGS: Record<Lang, string> = {
  en: 'https://flagcdn.com/w40/gb.png',
  fr: 'https://flagcdn.com/w40/fr.png',
  ar: 'https://flagcdn.com/w40/sa.png',
};

const LANGS: { code: Lang; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'fr', label: 'FR' },
  { code: 'ar', label: 'AR' },
];

const LanguageToggle = () => {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center gap-0.5 sm:gap-1 rounded-full border border-border bg-muted/50 p-0.5">
      {LANGS.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => setLang(code)}
          className={`flex items-center gap-1 sm:gap-1.5 rounded-full px-2 sm:px-2.5 py-1 sm:py-1 text-[10px] sm:text-[11px] font-semibold tracking-wide transition-all duration-200 ${
            lang === code
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground hover:bg-accent'
          }`}
        >
          <img
            src={FLAGS[code]}
            alt={label}
            className="w-4 h-3 sm:w-5 sm:h-3.5 rounded-[2px] object-cover"
          />
          <span className="hidden sm:inline">{label}</span>
        </button>
      ))}
    </div>
  );
};

export default LanguageToggle;
