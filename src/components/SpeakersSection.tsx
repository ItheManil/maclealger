const speakers = [
  { initial: 'J', role: 'Expert juridique', name: 'Droit immobilier algérien', bio: 'Spécialiste des transactions immobilieres pour non-résidents, il décrypte le cadre légal et les demarchés notariales.' },
  { initial: 'I', role: 'Expert immobilier', name: "Marche d'Alger", bio: "Professionnel du marché algérois, il accompagne les acquéreurs dans la lecture des tendances et l'évaluation des biens." },
  { initial: 'M', role: 'Modératrice', name: 'Oussama Promotion', bio: 'Conseillère commerciale, elle animé la soirée et structure les échanges pour une experience fluide et enrichissante.' },
];

const SpeakersSection = () => (
  <section className="py-[90px] px-[5%]" id="intervenants">
    <div className="section-line h-px bg-border mx-auto mb-14" />
    <span className="reveal-right block text-[11px] font-medium text-[var(--gold)] tracking-[0.1em] uppercase mb-4">Qui intervient ?</span>
    <h2 className="reveal-right font-heading text-[clamp(28px,4vw,44px)] font-bold leading-[1.15] tracking-tight text-foreground mb-4">
      Des professionnels <em className="not-italic text-[var(--gold)]" style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>reconnus</em><br />dans leur domaine.
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

export default SpeakersSection;
