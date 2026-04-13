import CountdownBlock from './CountdownBlock';
import RegistrationForm from './RegistrationForm';
import { useLanguage } from '@/hooks/useLanguage';

const HeroSection = () => {
  const { t } = useLanguage();

  const metaBadges = [
    { icon: '📅', text: t('hero.badge.date') },
    { icon: '🕕', text: t('hero.badge.time') },
    { icon: '💻', text: t('hero.badge.platform') },
    
  ];

  return (
    <section className="min-h-screen flex flex-col justify-center px-[5%] pt-[100px] pb-[50px] max-[600px]:pt-[80px] max-[600px]:pb-[30px] relative overflow-hidden items-center">
      <div className="absolute inset-0 z-0" style={{
        background: 'radial-gradient(ellipse 70% 60% at 80% 50%, rgba(0,51,38,0.08) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 10% 80%, rgba(0,51,38,0.05) 0%, transparent 60%)',
      }} />
      <div className="absolute top-0 left-[5%] right-[5%] h-px" style={{
        background: 'linear-gradient(90deg, transparent, var(--gold), transparent)',
      }} />

      <div className="grid grid-cols-2 gap-[60px] items-center relative z-[1] w-full max-[900px]:grid-cols-1 max-[900px]:gap-10">
        <div>
          <div className="inline-flex items-center gap-2 bg-[var(--gold-pale)] border border-border rounded-[40px] px-3 py-1 max-[600px]:px-2.5 text-[10px] max-[600px]:text-[9px] font-medium text-[var(--gold)] tracking-[0.06em] uppercase mb-5 max-[600px]:mb-4" style={{ animation: 'fadeUp 0.6s ease both' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]" />
            {t('hero.badge')}
          </div>
          <h1 className="font-heading text-[clamp(32px,7vw,84px)] font-bold leading-[1.05] tracking-tight text-[var(--sand)] max-[900px]:text-[clamp(28px,7vw,56px)]" style={{ animation: 'fadeUp 0.6s 0.1s ease both' }}>
            {t('hero.title.line1')}<br />{t('hero.title.line2')} <em className="not-italic font-normal text-[var(--gold)]" style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontWeight: 400 }}>{t('hero.title.em')}</em>
          </h1>
          <p className="mt-4 max-[600px]:mt-3 text-base max-[600px]:text-sm font-light text-[var(--sand-soft)] max-w-[560px] leading-relaxed" style={{ animation: 'fadeUp 0.6s 0.2s ease both' }}>
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-wrap gap-4 max-[600px]:gap-2.5 mt-7 max-[600px]:mt-5" style={{ animation: 'fadeUp 0.6s 0.3s ease both' }}>
            {metaBadges.map((b) => (
              <div key={b.text} className="flex items-center gap-2 text-[13px] max-[600px]:text-[11px] text-[var(--sand-mid)]">
                <div className="w-[30px] h-[30px] max-[600px]:w-[26px] max-[600px]:h-[26px] rounded-full bg-[var(--gold-pale)] border border-border flex items-center justify-center text-[13px] max-[600px]:text-[11px]">
                  {b.icon}
                </div>
                {b.text}
              </div>
            ))}
          </div>
          <CountdownBlock />
        </div>

        <div id="inscription" className="bg-card rounded-[20px] p-6 max-[600px]:p-4 border border-border relative z-[1] transition-colors duration-300" style={{ animation: 'fadeUp 0.6s 0.2s ease both' }}>
          <h3 className="font-heading text-lg font-bold text-[var(--sand)] mb-1.5">{t('hero.form.title')}</h3>
          <p className="text-[13px] text-[var(--sand-soft)] mb-5">{t('hero.form.subtitle')}</p>
          <RegistrationForm />
          <p className="text-center text-xs text-[var(--sand-soft)] mt-2.5">{t('hero.form.footer')}</p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
