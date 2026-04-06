const items = [
  { time: '18:00', dur: '10 min', title: 'Ouverture', desc: "Accueil des participants et présentation du panel d'experts." },
  { time: '18:10', dur: '20 min', title: 'Expert Juridique — Le cadre légal', desc: 'Comprendre les types de ventes en Algérie, le role du notaire et les demarchés specifiques aux non-résidents.' },
  { time: '18:30', dur: '20 min', title: 'Expert Immobilier — Comprendre le marché', desc: "Tendances 2026, choix du quartier, évaluation d'un bien à distance : la lecture des professionnels." },
  { time: '18:50', dur: '15 min', title: 'Table ronde — Bonnes pratiques', desc: "Les réflexes indispensables pour acheter depuis l'étranger, mis en commun par tous les intervenants." },
  { time: '19:05', dur: '55 min', title: 'Questions / Réponses en direct', desc: 'Posez vos questions personnelles par chat — les experts répondent en temps réel. Le moment le plus attendu de la soirée.' },
  { time: '19:50', dur: '10 min', title: 'Clôture & prochaines étapes', desc: 'Synthèse des points clés et ressources pour aller plus loin dans votre projet.' },
];

const ProgrammeSection = () => (
  <section className="py-[90px] px-[5%] bg-card transition-colors duration-300" id="programme">
    <div className="section-line h-px bg-border mx-auto mb-14" />
    <span className="reveal-left block text-[11px] font-medium text-[var(--gold)] tracking-[0.1em] uppercase mb-4">Au programme</span>
    <h2 className="reveal-left font-heading text-[clamp(28px,4vw,44px)] font-bold leading-[1.15] tracking-tight text-foreground mb-4">
      Une soirée <em className="not-italic text-[var(--gold)]" style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>structuree</em>,<br />deux heures denses.
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

export default ProgrammeSection;
