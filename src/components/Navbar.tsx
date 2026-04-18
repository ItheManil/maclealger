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
          {/* Trefoil bow: 3 lobes + central circle, oval hole */}
          <circle cx="32" cy="13" r="5.5" />
          <circle cx="22" cy="19" r="5.5" />
          <circle cx="42" cy="19" r="5.5" />
          <circle cx="32" cy="20" r="10" />
          <ellipse cx="32" cy="20" rx="3.5" ry="4.5" fill="hsl(var(--background))" />
          {/* Decorative collar */}
          <rect x="23.5" y="30.5" width="17" height="2.5" rx="0.5" />
          {/* Shaft */}
          <rect x="29.5" y="33.5" width="5" height="20" rx="2.5" />
          {/* Mid decorative ring */}
          <rect x="25.5" y="42" width="13" height="2.5" rx="1.25" />
          {/* Teeth (ornate bit) */}
          <rect x="29.5" y="48" width="9" height="3" rx="0.8" />
          <rect x="29.5" y="52.5" width="7" height="3" rx="0.8" />
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
