import { useState } from 'react';

const faqs = [
  { q: 'Est-ce vraiment gratuit ?', a: "Oui, totalement gratuit. Aucun paiement ni engagement. Il vous suffit de vous inscrire pour recevoir votre lien Google Meet." },
  { q: 'Je vis en dehors de la France, puis-je participer ?', a: "Absolument. Ce webinaire est concu pour toute la diaspora algérienne, ou que vous residiez dans le monde. Seule la connexion internet est necessaire." },
  { q: 'Que se passe-t-il si les 50 places sont complètes ?', a: "Le formulaire se ferme automatiquement. Si vous etes sur liste d'attente, nous vous contacterons en priorite pour la prochaine session." },
  { q: 'Le webinaire sera-t-il enregistre ?', a: "Nous prévoyons de mettre un replay à disposition des inscrits après la session, sous réserve. Nous vous tiendrons informé(e) par email." },
  { q: 'Comment poser mes questions pendant la session ?', a: "Via le chat Google Meet. Une session de 55 minutes est entièrement dédiée à vos questions — posez-les en direct ou a l'avance lors de l'inscription." },
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-[90px] px-[5%] text-center" id="faq">
      <div className="section-line h-px bg-border mx-auto mb-14" />
      <span className="reveal-fade block text-[11px] font-medium text-[var(--gold)] tracking-[0.1em] uppercase mb-4 text-center">Foire aux questions</span>
      <h2 className="reveal-fade font-heading text-[clamp(28px,4vw,44px)] font-bold leading-[1.15] tracking-tight text-foreground mb-2 mx-auto">Questions fréquentes</h2>
      <div className="max-w-[680px] mx-auto mt-14">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="reveal border-b border-border py-5 cursor-pointer text-left"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          >
            <div className="flex justify-between items-center gap-3">
              <span className="text-[15px] font-medium text-foreground">{faq.q}</span>
              <span className={`text-[var(--gold)] text-xl shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${openIndex === i ? 'rotate-45' : ''}`}>+</span>
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
