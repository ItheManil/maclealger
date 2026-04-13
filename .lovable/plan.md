

## Plan : Supprimer la limite de 50 inscriptions

### Ce qui change
- Plus de limite de participants — les inscriptions restent ouvertes sans plafond.
- Le formulaire n'affichera plus "complet" ni le compteur de places restantes.

### Étapes

#### 1. Migration base de données
Supprimer le trigger et la fonction de vérification de limite :
```sql
DROP TRIGGER IF EXISTS enforce_registration_limit ON public.webinar_registrations;
DROP FUNCTION IF EXISTS public.check_registration_limit();
DROP FUNCTION IF EXISTS public.get_registration_count();
```

#### 2. Nettoyage du formulaire (`RegistrationForm.tsx`)
- Supprimer la constante `MAX_PARTICIPANTS`
- Supprimer les états `isFull` et `spotsLeft`
- Supprimer le `useEffect` qui appelle `get_registration_count`
- Supprimer le bloc d'affichage "complet" (quand `isFull && !submitted`)
- Supprimer le texte "places restantes" (`spotsText`)
- Retirer `isFull` de la condition `disabled` du bouton

#### 3. Fichiers impactés
- `supabase/migrations/` — nouvelle migration SQL
- `src/components/RegistrationForm.tsx` — simplification du composant

