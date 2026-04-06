const cards = [
  { icon: '⚖️', title: 'Comprendre le cadre légal', desc: 'Types de ventes, role du notaire, demarchés specifiques aux non-résidents — expliques clairement, sans jargon.' },
  { icon: '🏙️', title: 'Lire le marché à Alger', desc: 'Neuf ou ancien ? Quelles zones ? Comment évaluér un bien à distance ? La vision des experts en 2026.' },
  { icon: '🛡️', title: 'Securiser votre projet', desc: 'Les bons réflexes et points de vigilance a connaitre avant de vous engager, pour investir sans mauvaises surprises.' },
  { icon: '💬', title: 'Poser vos questions', desc: '55 minutes dédiées à vos questions en direct par chat — un accès rare et direct à des experts juridiques et immobiliers.' },
];

const WhySection = () => (
  <section className="py-[90px] px-[5%]" id="pourquoi">
    <div className="section-line h-px bg-border mx-auto mb-14" />
    <span className="reveal-left block text-[11px] font-medium text-[var(--gold)] tracking-[0.1em] uppercase mb-4">Pourquoi ce webinaire ?</span>
    <h2 className="reveal-left font-heading text-[clamp(28px,4vw,44px)] font-bold leading-[1.15] tracking-tight text-foreground mb-4">
      Ce webinaire est fait pour vous <em className="not-italic text-[var(--gold)]" style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>si…</em>
    </h2>
    <p className="reveal-left text-base text-muted-foreground max-w-[520px]">
      Vous faites partie de la diaspora algérienne et vous pensez a investir dans l'immobilier, mais les demarchés à distance vous semblent complexes.
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

export default WhySection;
