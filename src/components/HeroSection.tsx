import CountdownBlock from './CountdownBlock';
import RegistrationForm from './RegistrationForm';

const metaBadges = [
  { icon: '📅', text: 'Samedi 18 Avril 2026' },
  { icon: '🕕', text: '18h00 – 20h00' },
  { icon: '💻', text: 'Google Meet' },
  { icon: '🎯', text: '50 places max.' },
];

const HeroSection = () => (
  <section className="min-h-screen flex flex-col justify-center px-[5%] pt-[120px] pb-[80px] relative overflow-hidden items-center">
    {/* Background effects */}
    <div className="absolute inset-0 z-0" style={{
      background: 'radial-gradient(ellipse 70% 60% at 80% 50%, rgba(0,51,38,0.08) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 10% 80%, rgba(0,51,38,0.05) 0%, transparent 60%)',
    }} />
    <div className="absolute top-0 left-[5%] right-[5%] h-px" style={{
      background: 'linear-gradient(90deg, transparent, var(--gold), transparent)',
    }} />

    <div className="grid grid-cols-2 gap-[60px] items-center relative z-[1] w-full max-[900px]:grid-cols-1 max-[900px]:gap-10">
      {/* Left */}
      <div>
        <div className="inline-flex items-center gap-2 bg-[var(--gold-pale)] border border-border rounded-[40px] px-4 py-1.5 text-xs font-medium text-[var(--gold)] tracking-[0.06em] uppercase mb-7" style={{ animation: 'fadeUp 0.6s ease both' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]" />
          Webinaire gratuit · 18 Avril 2026
        </div>
        <h1 className="font-heading text-[clamp(42px,7vw,84px)] font-bold leading-[1.05] tracking-tight text-[var(--sand)] max-[900px]:text-[clamp(36px,8vw,56px)]" style={{ animation: 'fadeUp 0.6s 0.1s ease both' }}>
          Acheter un appartement<br />à Alger <em className="not-italic font-normal text-[var(--gold)]" style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontWeight: 400 }}>depuis l'étranger.</em>
        </h1>
        <p className="mt-6 text-lg font-light text-[var(--sand-soft)] max-w-[560px] leading-relaxed" style={{ animation: 'fadeUp 0.6s 0.2s ease both' }}>
          En 2 heures, nos experts vous donnent toutes les clés — cadre légal, marché immobilier, bonnes pratiques — pour concrétiser votre projet en toute sérénité.
        </p>
        <div className="flex flex-wrap gap-6 mt-9 max-[600px]:gap-3.5" style={{ animation: 'fadeUp 0.6s 0.3s ease both' }}>
          {metaBadges.map((b) => (
            <div key={b.text} className="flex items-center gap-2.5 text-sm text-[var(--sand-mid)]">
              <div className="w-[34px] h-[34px] rounded-full bg-[var(--gold-pale)] border border-border flex items-center justify-center text-[15px]">
                {b.icon}
              </div>
              {b.text}
            </div>
          ))}
        </div>
        <CountdownBlock />
        <p className="mt-5 text-xs text-[var(--gold)] flex items-center gap-1.5" style={{ animation: 'fadeUp 0.6s 0.45s ease both' }}>
          ⚠ Places limitées — 50 participants maximum
        </p>
      </div>

      {/* Right - Form */}
      <div id="inscription" className="bg-card rounded-[20px] p-8 max-[600px]:p-5 border border-border relative z-[1] transition-colors duration-300" style={{ animation: 'fadeUp 0.6s 0.2s ease both' }}>
        <h3 className="font-heading text-lg font-bold text-[var(--sand)] mb-1.5">Réserver ma place</h3>
        <p className="text-[13px] text-[var(--sand-soft)] mb-5">Gratuit · Lien Google Meet envoyé par email</p>
        <RegistrationForm />
        <p className="text-center text-xs text-[var(--sand-soft)] mt-2.5">Inscription 100% gratuite · Aucun paiement requis</p>
      </div>
    </div>
  </section>
);

export default HeroSection;
