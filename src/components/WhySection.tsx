import { useLanguage } from '@/hooks/useLanguage';

const WhySection = () => {
  const { t } = useLanguage();

  const cards = [
    { icon: t('why.card.0.icon'), title: t('why.card.0.title'), desc: t('why.card.0.desc') },
    { icon: t('why.card.1.icon'), title: t('why.card.1.title'), desc: t('why.card.1.desc') },
    { icon: t('why.card.2.icon'), title: t('why.card.2.title'), desc: t('why.card.2.desc') },
    { icon: t('why.card.3.icon'), title: t('why.card.3.title'), desc: t('why.card.3.desc') },
  ];

  return (
    <section className="py-[90px] px-[5%]" id="pourquoi">
      <div className="section-line h-px bg-border mx-auto mb-14" />
      <span className="reveal-left block text-[11px] font-medium text-[var(--gold)] tracking-[0.1em] uppercase mb-4">{t('why.tag')}</span>
      <h2 className="reveal-left font-heading text-[clamp(28px,4vw,44px)] font-bold leading-[1.15] tracking-tight text-foreground mb-4">
        {t('why.title.line1')} <em className="not-italic text-[var(--gold)]" style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>{t('why.title.em')}</em>
      </h2>
      <p className="reveal-left text-base text-muted-foreground max-w-[520px]">
        {t('why.subtitle')}
      </p>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-4 mt-14">
        {cards.map((c) => (
          <div key={c.title} className="reveal-scale why-card-hover bg-card border border-border rounded-2xl py-8 px-7 transition-colors duration-300">
            <span className="text-[26px] mb-4 block">{c.icon}</span>
            <p className="text-[15px] font-medium text-foreground mb-2">{c.title}</p>
            <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhySection;
