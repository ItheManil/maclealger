import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from '@/components/ui/use-toast';

const countries = ['France', 'Canada', 'Belgique', 'Suisse', 'Royaume-Uni', 'Allemagne', 'Espagne', 'Italie', 'Etats-Unis', 'Autre'];

const projectStages = [
  { value: 'réflex', label: 'Je réfléchis encore, pas décidé(e)' },
  { value: 'actif', label: 'Je cherche activement un bien' },
  { value: 'pret', label: 'Prêt(e) à acheter sous 6 mois' },
  { value: 'vue', label: "J'ai déjà un bien en vue" },
];

const interests = [
  { value: 'légal', label: 'Le cadre légal et les démarches notariales' },
  { value: 'marché', label: "Comprendre le marché immobilier à Alger" },
  { value: 'financement', label: "Le financement depuis l'étranger" },
  { value: 'tout', label: 'Tout — je pars de zéro' },
];

type FormState = {
  prénom: string;
  nom: string;
  email: string;
  tel: string;
  pays: string;
  projet: string;
  intérêt: string;
  rgpd: boolean;
};

const initialForm: FormState = {
  prénom: '',
  nom: '',
  email: '',
  tel: '',
  pays: '',
  projet: '',
  intérêt: '',
  rgpd: false,
};

const MAX_PARTICIPANTS = 50;

const RegistrationForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState<FormState>(initialForm);
  const [isFull, setIsFull] = useState(false);
  const [spotsLeft, setSpotsLeft] = useState<number | null>(null);

  // Check remaining spots on mount
  useState(() => {
    supabase
      .from('webinar_registrations')
      .select('id', { count: 'exact', head: true })
      .then(({ count }) => {
        if (count !== null) {
          const remaining = Math.max(0, MAX_PARTICIPANTS - count);
          setSpotsLeft(remaining);
          if (remaining === 0) setIsFull(true);
        }
      });
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
      const { error: dbError } = await supabase.from('webinar_registrations').insert({
        prenom: form.prénom.trim(),
        nom: form.nom.trim(),
        email: form.email.trim(),
        telephone: form.tel.trim() || null,
        pays: form.pays || null,
        projet: form.projet || null,
        interet: form.intérêt || null,
      });

      if (dbError) {
        if (dbError.code === '23505') {
          setError('Cette adresse email est déjà inscrite.');
          setLoading(false);
          return;
        }
        if (dbError.message?.includes('registration_full')) {
          setIsFull(true);
          setError('Désolé, les 50 places sont complètes. Inscrivez-vous à la liste d\'attente en nous contactant par email.');
          setLoading(false);
          return;
        }
        throw dbError;
      }

      const { data: fnData, error: functionError } = await supabase.functions.invoke('send-confirmation-email', {
        body: {
          prenom: form.prénom.trim(),
          email: form.email.trim(),
        },
      });

      if (functionError) {
        // Check for rate limiting (429)
        if (fnData?.error) {
          setError(fnData.error);
          setLoading(false);
          return;
        }
        console.error('Email function error:', functionError);
        toast({
          title: 'Inscription enregistrée',
          description: "Votre inscription est bien enregistrée, mais l'email de confirmation n'a pas encore pu être envoyé.",
        });
      } else {
        toast({
          title: 'Inscription confirmée',
          description: 'Votre inscription a bien été enregistrée.',
        });
      }

      setSubmitted(true);
      setForm(initialForm);
    } catch (err) {
      console.error('Registration error:', err);
      setError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  if (isFull && !submitted) {
    return (
      <div className="text-center py-10 px-5">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-destructive bg-destructive/10 text-[26px]">🚫</div>
        <p className="mb-2.5 font-heading text-[22px] font-bold text-foreground">Complet !</p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Les 50 places disponibles ont toutes été réservées.<br /><br />
          Nous organiserons une prochaine session. Suivez-nous pour être informé(e) en priorité.
        </p>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="text-center py-10 px-5">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-primary bg-accent text-[26px] text-primary">✓</div>
        <p className="mb-2.5 font-heading text-[22px] font-bold text-foreground">Inscription confirmée !</p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Votre demande a bien été enregistrée.<br /><br />Vous recevrez votre lien Google Meet par email avant le <strong>18 avril 2026</strong>.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-2 gap-3 max-[600px]:grid-cols-1">
        <div className="space-y-2">
          <Label htmlFor="prenom">Prénom *</Label>
          <Input
            id="prenom"
            placeholder="Yasmine"
            value={form.prénom}
            onChange={(e) => setForm({ ...form, prénom: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="nom">Nom *</Label>
          <Input
            id="nom"
            placeholder="Benali"
            value={form.nom}
            onChange={(e) => setForm({ ...form, nom: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          placeholder="vous@email.com"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="telephone">Téléphone (WhatsApp)</Label>
        <Input
          id="telephone"
          type="tel"
          placeholder="+33 6 ..."
          value={form.tel}
          onChange={(e) => setForm({ ...form, tel: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label>Pays de résidence</Label>
        <Select value={form.pays} onValueChange={(value) => setForm({ ...form, pays: value })}>
          <SelectTrigger>
            <SelectValue placeholder="— Sélectionnez —" />
          </SelectTrigger>
          <SelectContent>
            {countries.map((country) => (
              <SelectItem key={country} value={country}>
                {country}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        <Label>Où en êtes-vous dans votre projet ?</Label>
        <RadioGroup value={form.projet} onValueChange={(value) => setForm({ ...form, projet: value })} className="gap-2">
          {projectStages.map((stage) => (
            <label
              key={stage.value}
              className="flex cursor-pointer items-start gap-3 rounded-[10px] border border-input bg-background px-3.5 py-3 text-[13px] text-[var(--sand-mid)] transition-colors hover:bg-accent"
            >
              <RadioGroupItem value={stage.value} className="mt-0.5" />
              <span>{stage.label}</span>
            </label>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-3">
        <Label>Ce qui m'intéresse le plus</Label>
        <RadioGroup value={form.intérêt} onValueChange={(value) => setForm({ ...form, intérêt: value })} className="gap-2">
          {interests.map((interest) => (
            <label
              key={interest.value}
              className="flex cursor-pointer items-start gap-3 rounded-[10px] border border-input bg-background px-3.5 py-3 text-[13px] text-[var(--sand-mid)] transition-colors hover:bg-accent"
            >
              <RadioGroupItem value={interest.value} className="mt-0.5" />
              <span>{interest.label}</span>
            </label>
          ))}
        </RadioGroup>
      </div>

      <label className="flex items-start gap-3 text-xs leading-relaxed text-[var(--sand-soft)]">
        <Checkbox
          checked={form.rgpd}
          onCheckedChange={(checked) => setForm({ ...form, rgpd: checked === true })}
          className="mt-0.5"
        />
        <span>
          J'accepte que mes informations soient utilisées par Oussama Promotion pour recevoir le lien Google Meet et les informations relatives à ce webinaire.
        </span>
      </label>

      <Button
        onClick={handleSubmit}
        disabled={loading || isFull}
        className="mt-2 w-full rounded-xl bg-secondary text-secondary-foreground hover:bg-primary"
      >
        {loading ? 'Inscription en cours...' : 'Confirmer mon inscription →'}
      </Button>
      {spotsLeft !== null && spotsLeft > 0 && spotsLeft <= 10 && (
        <p className="text-center text-xs text-[var(--gold)] font-medium">
          🔥 Plus que {spotsLeft} place{spotsLeft > 1 ? 's' : ''} disponible{spotsLeft > 1 ? 's' : ''} !
        </p>
      )}
    </div>
  );
};

export default RegistrationForm;
