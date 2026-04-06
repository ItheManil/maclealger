import ThemeToggle from './ThemeToggle';

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-[100] px-[5%] py-[18px] flex items-center justify-between bg-[rgba(245,250,247,0.9)] dark:bg-[rgba(10,30,22,0.9)] backdrop-blur-[12px] border-b border-border transition-colors duration-300">
    <div className="font-heading text-[17px] font-bold text-foreground tracking-tight">
      Ma Clé <span className="text-primary">à Alger</span>
    </div>
    <div className="flex items-center gap-3">
      <ThemeToggle />
      <a
        href="#inscription"
        className="bg-primary text-primary-foreground border-none rounded-[40px] px-[22px] py-[9px] text-[13px] font-medium no-underline transition-all duration-200 hover:opacity-90 hover:-translate-y-px"
      >
        Je m'inscris — Gratuit
      </a>
    </div>
  </nav>
);

export default Navbar;
