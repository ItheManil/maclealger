const stats = [
  { num: '2h', label: 'de contenu expert' },
  { num: '3', label: 'intervenants spécialisés' },
  { num: "55'", label: 'de questions en direct' },
  { num: '100%', label: 'gratuit' },
];

const StatsBar = () => (
  <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-px bg-border border-y border-border transition-colors duration-300">
    {stats.map((s) => (
      <div key={s.num} className="reveal bg-[var(--cream)] py-9 px-8 text-center transition-colors duration-300">
        <span className="font-heading text-[40px] font-bold text-[var(--gold)] leading-none block">{s.num}</span>
        <span className="text-[13px] text-[var(--sand-soft)] mt-1.5 block">{s.label}</span>
      </div>
    ))}
  </div>
);

export default StatsBar;
