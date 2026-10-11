# КЛИК project instructions

Before a meaningful change, read `PROJECT.md` and, for brand or visual work, `RESTYLING.md`.

## Sources of truth

- `src/club.config.ts`: company identity, location, schedule, phone, external links and hero copy.
- `src/data.ts`: zones, demonstration capacities, tariffs, perks, gallery and FAQ.
- `src/styles.css`: design tokens, responsive gutters, typography, motion and component styling.
- `public/photos`: real venue photography supplied by the user.
- `index.html`: SEO metadata and JSON-LD; keep it synchronized with `src/club.config.ts`.

## Invariants

- The seat selector remains demonstrational until a real booking source is connected.
- Keep the visible disclaimer that forms do not send or store data.
- Keep Vite `base: './'` and build public-asset URLs through `assetUrl`.
- Do not replace real venue photos with stock or generated images without explicit approval.
- Preserve keyboard accessibility, focus states, reduced-motion support and mobile layouts.
- Do not invent equipment specifications, services, promotions, reviews or contact data.

## Verification

Run before delivery:

```powershell
pnpm typecheck
pnpm lint
pnpm build
```

Visually inspect representative desktop and mobile widths and verify the phone, Telegram, WhatsApp and 2ГИС links.
