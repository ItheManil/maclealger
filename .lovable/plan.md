

# Mise à jour du contenu du site avec les nouvelles informations

## Changements basés sur les images fournies

### 1. Mise à jour du Programme (translations + composant)
**Nouvelles horaires et contenus :**
- 17:00 (10 min) — Ouverture : Accueil et présentation du panel
- 17:10 (20 min) — Architecte : Comprendre l'évolution des projets
- 17:30 (20 min) — Expert Immobilier : Comprendre le marché et choisir son bien
- 17:50 (15 min) — Table Ronde : Les bonnes pratiques pour acheter depuis l'étranger
- 18:05 (55 min) — Questions / Réponses : Vos questions, en direct par chat
- 18:50 (10 min) — Clôture : Synthèse et prochaines étapes

Fichier `ProgrammeSection.tsx` : mettre à jour les tableaux `times` et `durs`.

### 2. Mise à jour des Intervenants (translations + composant)
Remplacer les speakers génériques par les vrais noms :
- **Bouabdallah Rania** — Modératrice / Conseillère immobilier
- **Khatraoui Mohamed Oualid** — Modérateur / Responsable commercial
- **Bourahla Houssemeddine** — Architecte

Fichier `SpeakersSection.tsx` : mettre à jour les initiales (R, M, H).

### 3. Suppression des références "cadre légal / juridique"
- **Why Section** : supprimer la carte "Comprendre le cadre légal" (why.card.0), la remplacer par une carte liée à l'architecture/projets
- **Hero subtitle** : retirer "cadre légal" de la description
- **Form interests** : remplacer "Le cadre légal et les démarches notariales" par quelque chose lié à l'architecture/projets
- **Speaker 0** : n'est plus "Expert juridique" — devient l'architecte
- **FAQ** : pas de mention juridique directe, pas de changement nécessaire

### 4. Mise à jour des horaires globales
- Hero badge time : "17h00 – 19h00" au lieu de "18h00 – 20h00"

### Fichiers modifiés
- `src/i18n/translations.ts` — toutes les traductions (FR, EN, AR)
- `src/components/ProgrammeSection.tsx` — horaires et durées
- `src/components/SpeakersSection.tsx` — initiales des speakers

