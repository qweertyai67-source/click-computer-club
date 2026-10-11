# Rebranding and restyling guide

Use this checklist when adapting the site to another computer club or a different company. Confirm factual data before publishing and keep unconfirmed content clearly marked as demonstration content.

## 1. Company identity

Edit `src/club.config.ts`:

- `name`, `brandPrimary`, `brandSecondary` and `initials`;
- `slogan`, `category` and `city`;
- `addressShort`, `addressFull` and `districtLabel`;
- `scheduleShort`, `scheduleFull`, `phoneLabel` and `phoneHref`;
- `links.twoGis`;
- hero copy and hero image.

If the company name cannot be split naturally into two words, adjust the brand markup in `Header` and `Footer` inside `src/App.tsx`.

## 2. Colors, typography and spacing

Edit the variables at the beginning of `src/styles.css`:

- `--bg`, `--panel` and `--panel-soft` for surfaces;
- `--mint`, `--mint-deep`, `--amber` and `--danger` for accents;
- `--display` for the display font;
- `--radius`, `--page-gutter` and `--content-max` for geometry.

Search the same file for literal `rgba(...)` values derived from the old mint and amber colors when making a complete palette change. Test at widths below 620 px, around 900 px, around 1180 px and above 1700 px.

## 3. Products, capacity and pricing

Edit `src/data.ts`:

- `ZONE_CAPACITIES` is the only source for the number of seats;
- `occupiedSeatNumbers` controls the demonstration availability;
- `zones` contains hardware, descriptions, prices and card photography;
- `tariffs` contains package pricing;
- `perks`, `gallery`, `reviews` and `faqs` contain section content.

The total seat count is calculated automatically. When capacities change, also verify copy that mentions team size or a specific total.

## 4. Photography and logo

Place company-owned images in `public/photos` with descriptive lowercase filenames. Reference them through `assetUrl('photos/file.png')`; never use `/photos/file.png`, because root-absolute paths break on this GitHub Pages deployment.

Update:

- `clubConfig.hero.image` for the hero;
- `zones[].image` for zone cards;
- `gallery[]` for the gallery;
- `public/favicon.svg` for the browser icon;
- `.brand-mark` markup or styling if a real logo replaces initials.

Use optimized WebP, JPEG or PNG files and verify `naturalWidth > 0` in the published page after deployment.

## 5. Metadata and legal content

Synchronize `index.html` with the new company:

- page title and meta description;
- Open Graph title and description;
- JSON-LD name, locality and street address.

Replace demonstration privacy and terms content in `LegalDialog` only with owner-approved legal text. Connect a real booking backend only after defining consent, storage and error handling.

## 6. Verification and publication

```powershell
pnpm typecheck
pnpm lint
pnpm build
```

Then review the desktop and mobile layouts. After approval, commit and push to `main`. Wait for the GitHub Pages workflow and check the deployed site with a cache-busting query such as `?v=<commit>`.
