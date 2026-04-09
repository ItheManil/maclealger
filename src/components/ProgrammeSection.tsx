import { useLanguage } from '@/hooks/useLanguage';

const times = ['17:00', '17:10', '17:30', '17:50', '18:05', '18:50'];
const durs = ['10 min', '20 min', '20 min', '15 min', '55 min', '10 min'];

const ProgrammeSection = () => {
  const { t } = useLanguage();

  const items = times.map((time, i) => ({
    time,
    dur: durs[i],
    title: t(`prog.${i}.title` as any),
    desc: t(`prog.${i}.desc` as any),
  }));

  return (
    <section className="py-[90px] px-[5%] bg-card transition-colors duration-300" id="programme">
      <div className="section-line h-px bg-border mx-auto mb-14" />
      <span className="reveal-left block text-[11px] font-medium text-[var(--gold)] tracking-[0.1em] uppercase mb-4">{t('prog.tag')}</span>
      <h2 className="reveal-left font-heading text-[clamp(28px,4vw,44px)] font-bold leading-[1.15] tracking-tight text-foreground mb-4">
        {t('prog.title.line1')} <em className="not-italic text-[var(--gold)]" style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>{t('prog.title.em')}</em>,<br />{t('prog.title.line2')}
      </h2>
      <div className="mt-14">
        {items.map((item, i) => (
          <div key={i} className={`reveal grid grid-cols-[90px_1fr] max-[600px]:grid-cols-[70px_1fr] gap-6 max-[600px]:gap-3.5 py-6 border-b border-border items-start ${i === 0 ? 'border-t' : ''}`}>
            <div>
              <span className="font-heading text-[22px] font-bold text-[var(--gold)] pt-[3px] block">{item.time}</span>
              <span className="text-[11px] text-muted-foreground font-light block">{item.dur}</span>
            </div>
            <div>
              <p className="text-[15px] font-medium text-foreground">{item.title}</p>
              <p className="text-[13px] text-muted-foreground mt-1">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProgrammeSection;
