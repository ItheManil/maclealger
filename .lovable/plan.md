

# Language Toggle with Flag Icons

## What changes
Replace the text labels (EN/FR/عر) in the language toggle button with country flag emojis:
- 🇬🇧 for English
- 🇫🇷 for French
- 🇸🇦 for Arabic

## File to edit

### `src/components/LanguageToggle.tsx`
- Replace `NEXT_LABEL` values with flag emojis: `{ fr: '🇬🇧', en: '🇫🇷', ar: '🇸🇦' }` — each shows the flag of the *next* language
- Wait — currently the button shows the *next* language label. We should show the **current** language flag instead, so the user knows what language is active. Change to display the current language's flag: `{ fr: '🇫🇷', en: '🇬🇧', ar: '🇸🇦' }`
- Increase emoji font size slightly (~16px) for visibility
- Keep the existing button styling, animations, and `aria-label`

Actually, looking at the current logic: `NEXT_LABEL[lang]` shows what clicking will switch *to*. Let me reconsider — showing the current flag is more intuitive (users see which language is active). I'll display the **current** language flag and on click cycle to the next.

### Changes summary
- `NEXT_LABEL` → `CURRENT_FLAG`: `{ fr: '🇫🇷', en: '🇬🇧', ar: '🇸🇦' }`
- Display `CURRENT_FLAG[lang]` instead of text
- Bump the span font size to ~18px, remove `text-[11px]` and `uppercase` classes since they're irrelevant for emojis

