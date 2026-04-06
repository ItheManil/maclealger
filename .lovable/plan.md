
# Ma Clé à Alger — Webinar Landing Page

## Overview
Convert the provided HTML landing page into a professional React application, faithfully reproducing the design, layout, animations, and functionality.

## Design System
- **Fonts**: Playfair Display (headings) + DM Sans (body)
- **Colors**: Green (#003326) as primary, Sand (#CCB89B) as secondary, Cream (#F5FAF7) background
- **Style**: Elegant, minimal, luxury real estate feel with rounded cards and subtle gradients

## Pages & Sections

### Single Landing Page with these sections:

1. **Fixed Navigation Bar** — Logo "Ma Clé à Alger" + CTA button with blur backdrop

2. **Hero Section (split layout)**
   - Left: Pill badge, large headline, subtitle, event meta badges (date, time, platform, seats), live countdown timer to April 18 2026, limited seats warning
   - Right: Registration form with fields (prénom, nom, email, phone, country select, project stage radio, interest radio, GDPR checkbox, submit button) + success state

3. **Stats Bar** — 4 stat blocks: 2h content, 3 speakers, 55min Q&A, 100% free

4. **"Pourquoi ce webinaire"** — 4 feature cards with icons (legal, market, security, Q&A)

5. **Programme** — Timeline-style schedule (6 items from 18:00 to 19:50)

6. **Intervenants** — 3 speaker cards with avatar initials, roles, and bios

7. **FAQ** — 5 accordion items with toggle animation

8. **Footer** — Company info and hashtags

## Functionality
- **Countdown timer**: Live countdown to April 18, 2026 18:00
- **Form validation**: Required fields check, email validation, GDPR consent
- **Form submission**: Show success state on valid submit
- **FAQ accordion**: Toggle open/close with + rotation
- **Scroll reveal animations**: Elements fade up on scroll using IntersectionObserver
- **Responsive design**: 3 breakpoints (900px, 760px, 600px) for mobile adaptation
