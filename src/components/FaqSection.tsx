import { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { t } = useLanguage();

  const faqs = Array.from({ length: 5 }, (_, i) => ({
    q: t(`faq.${i}.q` as any),
    a: t(`faq.${i}.a` as any),
  }));

  return (
    <section className="py-[90px] px-[5%] text-center" id="faq">
      <div className="section-line h-px bg-border mx-auto mb-14" />
      <span className="reveal-fade block text-[11px] font-medium text-[var(--gold)] tracking-[0.1em] uppercase mb-4 text-center">{t('faq.tag')}</span>
      <h2 className="reveal-fade font-heading text-[clamp(28px,4vw,44px)] font-bold leading-[1.15] tracking-tight text-foreground mb-2 mx-auto">{t('faq.title')}</h2>
      <div className="max-w-[680px] mx-auto mt-14">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className={`group relative border-b border-border py-5 cursor-pointer text-left rounded-lg px-4 -mx-4 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-accent/50 hover:border-transparent ${openIndex === i ? 'bg-accent/30' : ''}`}
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          >
            <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-[3px] rounded-full bg-[var(--gold)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${openIndex === i ? 'h-3/4 opacity-100' : 'h-0 opacity-0 group-hover:h-1/2 group-hover:opacity-60'}`} />
            <div className="flex justify-between items-center gap-3">
              <span className="text-[15px] font-medium text-foreground transition-colors duration-200 group-hover:text-[var(--gold)]">{faq.q}</span>
              <span className={`text-[var(--gold)] text-xl shrink-0 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 ${openIndex === i ? 'rotate-45' : ''}`}>+</span>
            </div>
            <div
              className={`overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${openIndex === i ? 'max-h-40 opacity-100 mt-3' : 'max-h-0 opacity-0 mt-0'}`}
            >
              <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FaqSection;
