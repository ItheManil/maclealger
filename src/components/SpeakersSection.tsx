import { useLanguage } from '@/hooks/useLanguage';

const initials = ['R', 'M', 'H'];

const SpeakersSection = () => {
  const { t } = useLanguage();

  const speakers = initials.map((initial, i) => ({
    initial,
    role: t(`speakers.${i}.role` as any),
    name: t(`speakers.${i}.name` as any),
    bio: t(`speakers.${i}.bio` as any),
  }));

  return (
    <section className="py-[90px] px-[5%]" id="intervenants">
      <div className="section-line h-px bg-border mx-auto mb-14" />
      <span className="reveal-right block text-[11px] font-medium text-[var(--gold)] tracking-[0.1em] uppercase mb-4">{t('speakers.tag')}</span>
      <h2 className="reveal-right font-heading text-[clamp(28px,4vw,44px)] font-bold leading-[1.15] tracking-tight text-foreground mb-4">
        {t('speakers.title.line1')} <em className="not-italic text-[var(--gold)]" style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>{t('speakers.title.em')}</em><br />{t('speakers.title.line2')}
      </h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-5 mt-14">
        {speakers.map((s) => (
          <div key={s.initial} className="reveal-scale speaker-card-hover bg-card border border-border rounded-2xl py-7 px-6 text-center transition-colors duration-300">
            <div className="w-16 h-16 rounded-full bg-accent border-2 border-border flex items-center justify-center font-heading text-[22px] font-bold text-[var(--gold)] mx-auto mb-4">
              {s.initial}
            </div>
            <span className="block text-[11px] text-[var(--gold)] font-medium tracking-[0.06em] uppercase mb-2">{s.role}</span>
            <p className="text-[15px] font-medium text-foreground">{s.name}</p>
            <p className="text-[13px] text-muted-foreground mt-2 leading-relaxed">{s.bio}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SpeakersSection;
