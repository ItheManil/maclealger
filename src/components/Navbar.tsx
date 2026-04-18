import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';
import { useLanguage } from '@/hooks/useLanguage';

const Navbar = () => {
  const { t } = useLanguage();

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] px-3 sm:px-[5%] py-3 sm:py-[18px] flex items-center justify-between bg-[rgba(245,250,247,0.9)] dark:bg-[rgba(10,30,22,0.9)] backdrop-blur-[12px] border-b border-border transition-colors duration-300">
      <a href="#" className="group flex items-center gap-2 sm:gap-2.5 shrink-0 no-underline" aria-label="Ma Clé à Alger">
        <svg
          viewBox="0 0 64 64"
          className="w-6 h-6 sm:w-7 sm:h-7 text-secondary shrink-0 transition-transform duration-500 ease-out group-hover:rotate-[-15deg]"
          fill="currentColor"
          aria-hidden="true"
        >
          {/* Bow */}
          <path d="M32 8a12 12 0 1 0 0 24 12 12 0 0 0 0-24zm0 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10z" />
          {/* Shaft */}
          <rect x="29" y="30" width="6" height="24" rx="3" />
          {/* Teeth */}
          <rect x="29" y="42" width="10" height="4" rx="1.5" />
          <rect x="29" y="49" width="8" height="4" rx="1.5" />
        </svg>
        <span className="font-heading text-[15px] sm:text-[17px] font-bold text-foreground tracking-tight">
          Ma Clé <span className="text-primary">à Alger</span>
        </span>
      </a>
      <div className="flex items-center gap-1.5 sm:gap-3">
        <LanguageToggle />
        <ThemeToggle />
        <a
          href="#inscription"
          className="bg-primary text-primary-foreground border-none rounded-[40px] px-3 sm:px-[22px] py-1.5 sm:py-[9px] text-[11px] sm:text-[13px] font-medium no-underline transition-all duration-200 hover:opacity-90 hover:-translate-y-px whitespace-nowrap"
        >
          {t('nav.cta')}
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
