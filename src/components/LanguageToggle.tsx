import { useLanguage } from '@/hooks/useLanguage';
import type { Lang } from '@/i18n/translations';

const LANGS: { code: Lang; flag: string; label: string }[] = [
  { code: 'en', flag: '🇬🇧', label: 'EN' },
  { code: 'fr', flag: '🇫🇷', label: 'FR' },
  { code: 'ar', flag: '🇸🇦', label: 'AR' },
];

const LanguageToggle = () => {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center gap-1 rounded-full border border-border bg-muted/50 p-0.5">
      {LANGS.map(({ code, flag, label }) => (
        <button
          key={code}
          onClick={() => setLang(code)}
          className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide transition-all duration-200 ${
            lang === code
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground hover:bg-accent'
          }`}
        >
          <span className="text-sm leading-none">{flag}</span>
          {label}
        </button>
      ))}
    </div>
  );
};

export default LanguageToggle;
