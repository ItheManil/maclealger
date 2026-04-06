
# Ajout de l'arabe (فصحى) avec RTL complet

## 1. Mettre à jour le système i18n
- **`src/i18n/translations.ts`** : Ajouter une clé `ar` à chaque entrée du dictionnaire, mettre à jour le type `Lang` pour inclure `'ar'`
- **`src/hooks/useLanguage.tsx`** : Supporter 3 langues (fr → en → ar → fr), ajouter `dir` au contexte pour gérer RTL

## 2. Support RTL
- **`src/App.tsx`** ou **`index.html`** : Appliquer `dir="rtl"` et `lang="ar"` sur le `<html>` quand l'arabe est sélectionné
- **`src/index.css`** : Ajouter les styles RTL nécessaires (marges, paddings inversés, alignements)

## 3. Mettre à jour le toggle de langue
- **`src/components/LanguageToggle.tsx`** : Passer d'un toggle binaire à un cycle FR → EN → AR avec affichage du label adapté (عر pour l'arabe)

## 4. Police arabe
- Ajouter une police Google Fonts compatible arabe (ex: Noto Sans Arabic ou Cairo) pour un rendu optimal

## Sections traduites
Tout le contenu existant : Navbar, Hero, Formulaire, Stats, Why, Programme, Speakers, FAQ, Footer, Countdown
