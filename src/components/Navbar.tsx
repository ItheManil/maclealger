const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-[100] px-[5%] py-[18px] flex items-center justify-between bg-[rgba(245,250,247,0.9)] backdrop-blur-[12px] border-b border-[rgba(0,51,38,0.2)]">
    <div className="font-heading text-[17px] font-bold text-[var(--sand)] tracking-tight">
      Ma Clé <span className="text-[var(--gold)]">à Alger</span>
    </div>
    <a
      href="#inscription"
      className="bg-[var(--gold)] text-white border-none rounded-[40px] px-[22px] py-[9px] text-[13px] font-medium no-underline transition-all duration-200 hover:bg-[#00261C] hover:-translate-y-px"
    >
      Je m'inscris — Gratuit
    </a>
  </nav>
);

export default Navbar;
