import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { useLanguage } from '@/hooks/useLanguage';

const countries = ['France', 'Canada', 'Belgique', 'Suisse', 'Royaume-Uni', 'Allemagne', 'Espagne', 'Italie', 'Etats-Unis', 'Autre'];

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
  const { t } = useLanguage();

  useEffect(() => {
    supabase
      .rpc('get_registration_count')
      .then(({ data: count, error: err }) => {
        if (!err && count !== null) {
          const remaining = Math.max(0, MAX_PARTICIPANTS - count);
          setSpotsLeft(remaining);
          if (remaining === 0) setIsFull(true);
        }
      });
  }, []);

  const projectStages = [
    { value: 'réflex', label: t('form.projet.0') },
    { value: 'actif', label: t('form.projet.1') },
    { value: 'pret', label: t('form.projet.2') },
    { value: 'vue', label: t('form.projet.3') },
  ];

  const interests = [
    { value: 'légal', label: t('form.interet.0') },
    { value: 'marché', label: t('form.interet.1') },
    { value: 'financement', label: t('form.interet.2') },
    { value: 'tout', label: t('form.interet.3') },
  ];

  const handleSubmit = async () => {
    setError('');

    if (!form.prénom.trim() || !form.nom.trim() || !form.email.trim()) {
      setError(t('form.error.required'));
      return;
    }

    if (!form.email.includes('@') || !form.email.includes('.')) {
      setError(t('form.error.email'));
      return;
    }

    if (!form.rgpd) {
      setError(t('form.error.rgpd'));
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
          setError(t('form.error.duplicate'));
          setLoading(false);
          return;
        }
        if (dbError.message?.includes('registration_full')) {
          setIsFull(true);
          setError(t('form.error.full'));
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
        if (fnData?.error) {
          setError(fnData.error);
          setLoading(false);
          return;
        }
        console.error('Email function error:', functionError);
        toast({
          title: t('form.toast.partial.title'),
          description: t('form.toast.partial.desc'),
        });
      } else {
        toast({
          title: t('form.toast.success.title'),
          description: t('form.toast.success.desc'),
        });
      }

      setSubmitted(true);
      setForm(initialForm);
    } catch (err) {
      console.error('Registration error:', err);
      setError(t('form.error.generic'));
    } finally {
      setLoading(false);
    }
  };

  if (isFull && !submitted) {
    return (
      <div className="text-center py-10 px-5">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-destructive bg-destructive/10 text-[26px]">🚫</div>
        <p className="mb-2.5 font-heading text-[22px] font-bold text-foreground">{t('form.full.title')}</p>
        <p className="text-sm leading-relaxed text-muted-foreground" dangerouslySetInnerHTML={{ __html: t('form.full.desc') }} />
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="text-center py-10 px-5">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-primary bg-accent text-[26px] text-primary">✓</div>
        <p className="mb-2.5 font-heading text-[22px] font-bold text-foreground">{t('form.success.title')}</p>
        <p className="text-sm leading-relaxed text-muted-foreground" dangerouslySetInnerHTML={{ __html: t('form.success.desc') }} />
      </div>
    );
  }

  const spotsText = spotsLeft !== null && spotsLeft > 0 && spotsLeft <= 10
    ? t('form.spots').replace('{n}', String(spotsLeft)).replace(/\{s\}/g, spotsLeft > 1 ? 's' : '')
    : null;

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-2 gap-3 max-[600px]:grid-cols-1">
        <div className="space-y-2">
          <Label htmlFor="prenom">{t('form.prenom')}</Label>
          <Input
            id="prenom"
            placeholder={t('form.prenom.placeholder')}
            value={form.prénom}
            onChange={(e) => setForm({ ...form, prénom: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="nom">{t('form.nom')}</Label>
          <Input
            id="nom"
            placeholder={t('form.nom.placeholder')}
            value={form.nom}
            onChange={(e) => setForm({ ...form, nom: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">{t('form.email')}</Label>
        <Input
          id="email"
          type="email"
          placeholder={t('form.email.placeholder')}
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="telephone">{t('form.tel')}</Label>
        <Input
          id="telephone"
          type="tel"
          placeholder={t('form.tel.placeholder')}
          value={form.tel}
          onChange={(e) => setForm({ ...form, tel: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label>{t('form.pays')}</Label>
        <Select value={form.pays} onValueChange={(value) => setForm({ ...form, pays: value })}>
          <SelectTrigger>
            <SelectValue placeholder={t('form.pays.placeholder')} />
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
        <Label>{t('form.projet')}</Label>
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
        <Label>{t('form.interet')}</Label>
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
        <span>{t('form.rgpd')}</span>
      </label>

      <Button
        onClick={handleSubmit}
        disabled={loading || isFull}
        className="mt-2 w-full rounded-xl bg-secondary text-secondary-foreground hover:bg-primary"
      >
        {loading ? t('form.loading') : t('form.submit')}
      </Button>
      {spotsText && (
        <p className="text-center text-xs text-[var(--gold)] font-medium">
          🔥 {spotsText}
        </p>
      )}
    </div>
  );
};

export default RegistrationForm;
