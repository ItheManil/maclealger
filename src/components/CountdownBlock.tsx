import { useCountdown } from '@/hooks/useCountdown';
import { useLanguage } from '@/hooks/useLanguage';

const targetDate = new Date('2026-04-18T18:00:00');

const CountdownBlock = () => {
  const { days, hours, minutes, seconds } = useCountdown(targetDate);
  const { t } = useLanguage();
  const pad = (n: number) => String(n).padStart(2, '0');

  const blocks = [
    { value: pad(days), label: t('countdown.days') },
    { value: pad(hours), label: t('countdown.hours') },
    { value: pad(minutes), label: t('countdown.minutes') },
    { value: pad(seconds), label: t('countdown.seconds') },
  ];

  return (
    <div className="mt-8" style={{ animation: 'fadeUp 0.6s 0.35s ease both' }}>
      <span className="block text-[11px] font-medium text-[var(--gold)] tracking-[0.1em] uppercase mb-3">
        {t('countdown.label')}
      </span>
      <div className="flex gap-2 max-[600px]:gap-1.5 flex-wrap">
        {blocks.map((b) => (
          <div
            key={b.label}
            className="bg-[var(--sand)] dark:bg-muted rounded-xl px-3 py-2.5 max-[600px]:px-2.5 max-[600px]:py-2 text-center min-w-[56px] max-[600px]:min-w-[48px] border border-border transition-colors duration-300"
          >
            <span className="font-heading text-[24px] max-[600px]:text-[20px] font-bold text-[var(--gold)] leading-none block">
              {b.value}
            </span>
            <span className="text-[10px] text-primary-foreground/50 dark:text-muted-foreground mt-1 block tracking-[0.06em] uppercase">
              {b.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountdownBlock;
