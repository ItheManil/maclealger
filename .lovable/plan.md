

## Plan: AI-generated favicon for "Ma Clé à Alger"

### Concept
A minimalist square icon combining a stylized **key** (Ma Clé) with a subtle architectural hint of **Algiers** (white casbah arch / Mediterranean blue). Designed to read clearly at 16×16, 32×32, and 180×180.

### Steps

1. **Generate the master image with Lovable AI** (Nano Banana Pro for crisp icon quality)
   - Square 1024×1024 PNG, flat vector-style, transparent or solid brand-color background
   - Prompt focused on: bold golden key silhouette, Mediterranean blue background, simple geometric arch motif, no text, centered, padded margins, app-icon style

2. **Generate optimized favicon set** from the master:
   - `public/favicon.ico` (multi-size: 16, 32, 48) — replaces existing default
   - `public/favicon-32.png` (32×32)
   - `public/favicon-192.png` (192×192, Android/PWA)
   - `public/apple-touch-icon.png` (180×180, iOS)
   - `public/favicon.svg` (lightweight vector version if achievable)

3. **Update `index.html` `<head>`** with full favicon link set:
   ```html
   <link rel="icon" type="image/x-icon" href="/favicon.ico" />
   <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
   <link rel="icon" type="image/png" sizes="192x192" href="/favicon-192.png" />
   <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
   ```

4. **QA**: View each generated size at actual scale to confirm the icon stays legible at 16px (no blurry mess of details).

### Files impacted
- `public/favicon.ico` (overwrite)
- `public/favicon-32.png`, `public/favicon-192.png`, `public/apple-touch-icon.png` (new)
- `index.html` (add link tags)

