

# Add Dark/Light Toggle Button

## Overview
Add a polished dark/light mode toggle to the navbar with smooth transitions, persisted preference via localStorage, and system preference detection.

## Changes

### 1. Create `src/hooks/useTheme.ts`
- React hook managing `"light" | "dark"` state
- On mount: check localStorage, fall back to `prefers-color-scheme`
- Toggle adds/removes `dark` class on `<html>` and saves to localStorage
- Wrap in a context provider for global access

### 2. Add dark mode CSS variables in `src/index.css`
- Add a `.dark` block with inverted color tokens:
  - `--background`: dark green-black (~163 40% 8%)
  - `--foreground`: light cream
  - `--card`: dark surface
  - `--cream`: dark background
  - `--sand`: lighter sand for readability
  - `--gold-pale`: darker variant
- Add `transition: background-color 0.3s, color 0.3s` to `body` for smooth switching

### 3. Create `src/components/ThemeToggle.tsx`
- Compact icon button using Sun/Moon icons from lucide-react
- Animated icon swap (rotate + scale transition)
- Styled to match navbar aesthetic: transparent bg, rounded, subtle hover

### 4. Update `src/components/Navbar.tsx`
- Add ThemeToggle between the logo and CTA button
- Update navbar bg for dark mode: `dark:bg-[rgba(10,30,22,0.9)]` and border color

### 5. Update `src/App.tsx`
- Wrap app with ThemeProvider

### 6. Update hardcoded colors in components
- Audit components using hardcoded light colors (navbar, hero, sections) and add `dark:` variants where needed for key surfaces and text

