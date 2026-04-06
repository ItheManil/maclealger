

# Add FR/EN Language Toggle Button

## Overview
Add a language toggle button in the navbar (next to the theme toggle) that switches all page content between French and English. Uses React Context with a translations dictionary — no external library needed, lightweight and fast.

## Architecture

### 1. Create `src/i18n/translations.ts`
A single file containing all translatable strings keyed by section, with `fr` and `en` variants. Covers: Navbar, Hero, StatsBar, WhySection, ProgrammeSection, SpeakersSection, FaqSection, Footer, RegistrationForm, CountdownBlock.

### 2. Create `src/hooks/useLanguage.tsx`
- React Context + Provider with `lang` state (`"fr" | "en"`)
- `toggleLanguage()` function
- `t(key)` helper to retrieve translated string
- Persists choice in `localStorage`
- Defaults to `"fr"`

### 3. Create `src/components/LanguageToggle.tsx`
- Compact button styled like ThemeToggle (same size, border, rounded)
- Displays `FR` or `EN` text with a smooth crossfade transition on toggle
- Placed in the navbar between ThemeToggle and CTA

### 4. Update `src/components/Navbar.tsx`
- Add LanguageToggle next to ThemeToggle
- Replace hardcoded CTA text with `t('nav.cta')`

### 5. Update all content components
Each component imports `useLanguage` and replaces hardcoded French strings with `t('key')` calls:
- **HeroSection**: title, subtitle, badges, warning text, form header
- **StatsBar**: labels
- **WhySection**: section title, subtitle, card titles/descriptions
- **ProgrammeSection**: section title, timeline items
- **SpeakersSection**: section title, speaker roles/bios
- **FaqSection**: section title, all Q&A pairs
- **Footer**: footer text
- **RegistrationForm**: labels, placeholders, error messages, button text, validation messages
- **CountdownBlock**: labels (Jours→Days, etc.)

### 6. Wrap app with LanguageProvider
In `src/App.tsx`, wrap the app with `<LanguageProvider>` alongside the existing `<ThemeProvider>`.

## Technical Details
- No external dependencies — pure React Context
- Translation dictionary is a flat object with dot-notation keys for fast lookup
- Toggle persisted via `localStorage('lang')`
- Button uses the same visual style as the existing ThemeToggle for consistency
- All transitions are CSS-based for smooth UX

