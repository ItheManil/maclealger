import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

const countries = ['France', 'Canada', 'Belgique', 'Suisse', 'Royaume-Uni', 'Allemagne', 'Espagne', 'Italie', 'Etats-Unis', 'Autre'];

const projectStages = [
  { value: 'réflex', label: 'Je réfléchis encore, pas décidé(e)' },
  { value: 'actif', label: 'Je cherche activement un bien' },
  { value: 'pret', label: "Prêt(e) a acheter sous 6 mois" },
  { value: 'vue', label: "J'ai déjà un bien en vue" },
];

const interests = [
  { value: 'légal', label: 'Le cadre légal et les demarchés notariales' },
  { value: 'marché', label: "Comprendre le marché immobilier à Alger" },
  { value: 'financement', label: "Le financement depuis l'étranger" },
  { value: 'tout', label: 'Tout — je pars de zero' },
];

const RegistrationForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    prénom: '', nom: '', email: '', tel: '', pays: '', projet: '', intérêt: '', rgpd: false,
  });

  const handleSubmit = async () => {
    setError('');
    if (!form.prénom.trim() || !form.nom.trim() || !form.email.trim()) {
      setError('Merci de remplir votre prénom, nom et email.');
      return;
    }
    if (!form.email.includes('@') || !form.email.includes('.')) {
      setError('Adresse email invalide.');
      return;
    }
    if (!form.rgpd) {
      setError("Merci d'accepter les conditions.");
      return;
    }

    setLoading(true);
    try {
      const { error: dbError } = await supabase
        .from('webinar_registrations')
        .insert({
          prenom: form.prénom.trim(),
          nom: form.nom.trim(),
          email: form.email.trim(),
          telephone: form.tel.trim() || null,
          pays: form.pays || null,
          projet: form.projet || null,
          interet: form.intérêt || null,
        });

      if (dbError) throw dbError;

      // Send confirmation email
      try {
        await supabase.functions.invoke('send-confirmation-email', {
          body: {
            prenom: form.prénom.trim(),
            email: form.email.trim(),
          },
        });
      } catch {
        // Email failure shouldn't block registration
        console.warn('Confirmation email could not be sent');
      }

      setSubmitted(true);
    } catch (err: any) {
      console.error('Registration error:', err);
      setError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full py-[11px] px-[14px] bg-[var(--cream)] border border-[rgba(0,51,38,0.15)] rounded-[10px] text-sm text-[var(--sand)] outline-none transition-colors focus:border-[var(--gold)]";

  if (submitted) {
    return (
      <div className="text-center py-10 px-5">
        <div className="w-16 h-16 rounded-full bg-[var(--gold-pale)] border border-[var(--gold)] flex items-center justify-center text-[26px] mx-auto mb-5">✓</div>
        <p className="font-heading text-[22px] font-bold text-[var(--sand)] mb-2.5">Inscription confirmée !</p>
        <p className="text-sm text-[var(--sand-soft)] leading-relaxed">
          Vous recevrez votre lien Google Meet par email avant le <strong>18 avril 2026</strong>.<br /><br />À très bientôt !
        </p>
      </div>
    );
  }

  return (
    <div>
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          {error}
        </div>
      )}
      <div className="grid grid-cols-2 gap-3 max-[600px]:grid-cols-1">
        <div className="mb-4">
          <label className="block text-xs font-medium text-[var(--sand-soft)] mb-1.5 tracking-[0.03em] uppercase">Prénom *</label>
          <input className={inputClass} placeholder="Yasmine" value={form.prénom} onChange={(e) => setForm({ ...form, prénom: e.target.value })} />
        </div>
        <div className="mb-4">
          <label className="block text-xs font-medium text-[var(--sand-soft)] mb-1.5 tracking-[0.03em] uppercase">Nom *</label>
          <input className={inputClass} placeholder="Benali" value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })} />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-xs font-medium text-[var(--sand-soft)] mb-1.5 tracking-[0.03em] uppercase">Email *</label>
        <input className={inputClass} type="email" placeholder="vous@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      </div>
      <div className="mb-4">
        <label className="block text-xs font-medium text-[var(--sand-soft)] mb-1.5 tracking-[0.03em] uppercase">Téléphone (WhatsApp)</label>
        <input className={inputClass} type="tel" placeholder="+33 6 ..." value={form.tel} onChange={(e) => setForm({ ...form, tel: e.target.value })} />
      </div>
      <div className="mb-4">
        <label className="block text-xs font-medium text-[var(--sand-soft)] mb-1.5 tracking-[0.03em] uppercase">Pays de résidence</label>
        <select className={inputClass} value={form.pays} onChange={(e) => setForm({ ...form, pays: e.target.value })}>
          <option value="">— Sélectionnez —</option>
          {countries.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-xs font-medium text-[var(--sand-soft)] mb-1.5 tracking-[0.03em] uppercase">Où en êtes-vous dans votre projet ?</label>
        <div className="flex flex-col gap-2 mt-1">
          {projectStages.map((s) => (
            <label key={s.value} className={`flex items-center gap-2.5 bg-[var(--cream)] border rounded-[10px] px-3.5 py-2.5 cursor-pointer text-[13px] text-[var(--sand-mid)] transition-all ${form.projet === s.value ? 'border-[var(--gold)] bg-[var(--gold-pale)]' : 'border-[rgba(0,51,38,0.12)]'}`}>
              <input type="radio" name="projet" className="w-3.5 h-3.5 accent-[var(--gold)] shrink-0" checked={form.projet === s.value} onChange={() => setForm({ ...form, projet: s.value })} />
              {s.label}
            </label>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-xs font-medium text-[var(--sand-soft)] mb-1.5 tracking-[0.03em] uppercase">Ce qui m'intéresse le plus</label>
        <div className="flex flex-col gap-2 mt-1">
          {interests.map((s) => (
            <label key={s.value} className={`flex items-center gap-2.5 bg-[var(--cream)] border rounded-[10px] px-3.5 py-2.5 cursor-pointer text-[13px] text-[var(--sand-mid)] transition-all ${form.intérêt === s.value ? 'border-[var(--gold)] bg-[var(--gold-pale)]' : 'border-[rgba(0,51,38,0.12)]'}`}>
              <input type="radio" name="intérêt" className="w-3.5 h-3.5 accent-[var(--gold)] shrink-0" checked={form.intérêt === s.value} onChange={() => setForm({ ...form, intérêt: s.value })} />
              {s.label}
            </label>
          ))}
        </div>
      </div>
      <div className="flex gap-2.5 items-start text-xs text-[var(--sand-soft)] mt-4 leading-relaxed">
        <input type="checkbox" className="shrink-0 accent-[var(--gold)] mt-0.5" checked={form.rgpd} onChange={(e) => setForm({ ...form, rgpd: e.target.checked })} />
        <span>J'accepte que mes informations soient utilisées par Oussama Promotion pour recevoir le lien Google Meet et les informations relatives a ce webinaire.</span>
      </div>
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-[var(--sand)] text-white border-none rounded-xl py-[15px] text-[15px] font-medium cursor-pointer mt-5 transition-all hover:bg-[var(--gold)] hover:-translate-y-px disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? 'Inscription en cours...' : 'Confirmér mon inscription →'}
      </button>
    </div>
  );
};

export default RegistrationForm;
