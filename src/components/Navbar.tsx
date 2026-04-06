import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';
import { useLanguage } from '@/hooks/useLanguage';

const Navbar = () => {
  const { t } = useLanguage();

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] px-3 sm:px-[5%] py-3 sm:py-[18px] flex items-center justify-between bg-[rgba(245,250,247,0.9)] dark:bg-[rgba(10,30,22,0.9)] backdrop-blur-[12px] border-b border-border transition-colors duration-300">
      <div className="font-heading text-[15px] sm:text-[17px] font-bold text-foreground tracking-tight shrink-0">
        Ma Clé <span className="text-primary">à Alger</span>
      </div>
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
