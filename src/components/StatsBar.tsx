import { useLanguage } from '@/hooks/useLanguage';

const StatsBar = () => {
  const { t } = useLanguage();

  const stats = [
    { num: t('stats.0.num'), label: t('stats.0.label') },
    { num: t('stats.1.num'), label: t('stats.1.label') },
    { num: t('stats.2.num'), label: t('stats.2.label') },
    { num: t('stats.3.num'), label: t('stats.3.label') },
  ];

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] max-[600px]:grid-cols-2 gap-px bg-border border-y border-border transition-colors duration-300">
      {stats.map((s) => (
        <div key={s.num} className="reveal bg-[var(--cream)] py-7 px-5 max-[600px]:py-5 max-[600px]:px-3 text-center transition-colors duration-300">
          <span className="font-heading text-[36px] max-[600px]:text-[28px] font-bold text-[var(--gold)] leading-none block">{s.num}</span>
          <span className="text-[12px] max-[600px]:text-[11px] text-[var(--sand-soft)] mt-1 block">{s.label}</span>
        </div>
      ))}
    </div>
  );
};

export default StatsBar;
