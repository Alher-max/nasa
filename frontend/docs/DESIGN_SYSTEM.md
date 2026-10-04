# ThortechShop Design System v1.0

KarbonTani uses the shared Thortech visual language to keep the agricultural
dashboard, its field guide, and the wider ThortechShop ecosystem recognizable as
one product family. Tailwind CSS v4 theme variables in `app/globals.css` are the
runtime source for utility classes. `tailwind.config.ts` mirrors the named
palette for tools and integrations that consume the standard Tailwind config
shape; update both when changing a token.

## Design principles

- **Enterprise Slate Navy + Energetic Orange:** Slate Navy anchors typography,
  navigation, and the ecosystem footer. Energetic Orange is reserved for the
  primary action, active state, and a small number of brand highlights.
- **Quiet canvas, clear hierarchy:** `#FAFAFC` is the app canvas. White cards,
  Slate 200 borders, restrained shadows, and `rounded-2xl` geometry keep dense
  data legible without the visual weight of a dark dashboard.
- **Domain color is semantic:** Emerald communicates positive agriculture and
  carbon outcomes; Sky Blue is reserved for NASA, satellite, and spatial-data
  context. Neither replaces the primary brand color for general actions.
- **Honest data presentation:** Estimates, simulated verification, and
  satellite observations retain their existing labels and caveats. Color must
  not imply a confirmed payout or a definitive satellite finding.
- **Mobile-first field usability:** Layouts must remain readable and usable at
  360 CSS pixels. Interactive controls have a minimum 44px touch target.

## Color token specification

| Token | Hex | Tailwind utility | Intended use |
| --- | --- | --- | --- |
| Brand primary | `#FF5E00` | `text-brand-primary`, `bg-brand-primary`, `border-brand-primary` | Primary CTA, selected controls, brand highlight |
| Brand hover | `#E05200` | `hover:bg-brand-hover` | Hover state for primary CTA |
| Brand soft | `#FFF3EB` | `bg-brand-soft` | Brand badges, soft highlights, selected backgrounds |
| Brand dark | `#0F172A` | `bg-brand-dark` | Shared footer, high-contrast ecosystem surface |
| Surface background | `#FAFAFC` | `bg-surface-bg` | Page canvas and quiet inset surface |
| Surface card | `#FFFFFF` | `bg-surface-card` | Cards, header, dialogs, accordion panels |
| Surface border | `#E2E8F0` | `border-surface-border` | Card boundaries and dividers |
| Body primary | `#0F172A` | `text-body-primary` | Headings and high-priority text |
| Body secondary | `#475569` | `text-body-secondary` | Body copy, descriptions, labels |
| Body muted | `#94A3B8` | `text-body-muted` | Low-priority metadata and supporting labels |
| Semantic success | `#10B981` | `text-semantic-success`, `bg-semantic-success` | Positive carbon and agriculture status |
| Semantic info | `#0EA5E9` | `text-semantic-info`, `bg-semantic-info` | NASA, satellite, and spatial data |
| Semantic error | `#EF4444` | `text-semantic-error`, `bg-semantic-error` | Errors and destructive states |

Use low-opacity semantic fills with a matching pale border (for example,
`bg-emerald-50 border-emerald-200`) to preserve contrast. Do not use muted text
for essential instructions or status values.

## Component blueprints

### Badge

Use a compact pill with a border and a clear semantic meaning:

```tsx
<span className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-soft px-3 py-1.5 text-xs font-semibold text-brand-primary">
  <span className="h-1.5 w-1.5 rounded-full bg-semantic-success" />
  ZERO-BURN PILOT ACTIVE
</span>
```

### Primary and secondary buttons

Keep primary actions visually unique and provide field users at least 44px of
height. Use secondary actions for navigation or optional tasks.

```tsx
<button className="min-h-11 rounded-full bg-brand-primary px-6 py-3.5 font-bold text-white transition hover:bg-brand-hover">
  Verify my field
</button>
<button className="min-h-11 rounded-full border border-surface-border bg-surface-card px-6 py-3.5 font-bold text-body-primary transition hover:bg-slate-50">
  Learn more
</button>
```

### Metric card

Use white cards, restrained shadows, a secondary label, and a prominent value.
Positive carbon outcomes use success-colored badges rather than changing the
meaning of the brand CTA.

```tsx
<article className="rounded-2xl border border-surface-border bg-surface-card p-4 shadow-sm sm:p-5">
  <p className="text-xs font-medium text-body-secondary">Carbon avoided</p>
  <p className="mt-3 text-2xl font-extrabold text-body-primary sm:text-3xl">212.5 t</p>
  <span className="mt-2 inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-2 py-1 text-xs font-semibold text-semantic-success">
    Projected per year
  </span>
</article>
```

### Accordion

Use native `<details>` and `<summary>` for keyboard and no-JavaScript support.
Maintain visible focus, clear open state, and 44px minimum summary height.

```tsx
<details className="group rounded-2xl border border-surface-border bg-surface-card shadow-sm open:border-brand-primary/40">
  <summary className="flex min-h-11 cursor-pointer items-center justify-between p-4 font-semibold text-body-primary">
    Guide step
    <span className="text-brand-primary">+</span>
  </summary>
  <div className="border-t border-surface-border p-4 text-sm leading-relaxed text-body-secondary">
    Supporting instructions
  </div>
</details>
```

### Forms and field controls

Labels must be associated with their controls; errors must be announced and
visually distinct from helper text. Use a visible focus ring and generous
targets for range inputs, presets, and custom-value controls.

```tsx
<label htmlFor="area" className="text-sm font-medium text-body-primary">
  Farm size (hectares)
</label>
<input
  id="area"
  type="number"
  className="min-h-11 w-full rounded-xl border border-surface-border bg-surface-card px-3 text-body-primary focus-visible:outline-semantic-info"
/>
```

## Responsive rules

- Design from 360px upward; prevent page-level horizontal scroll and clipping.
- Put `min-w-0` on grid and flex children that contain long text. Use
  `break-words` for headings and long content; reserve `truncate` for secondary
  metadata whose full value is available elsewhere.
- Use a single-column layout on narrow screens and introduce multi-column grids
  at existing Tailwind breakpoints (`sm`, `lg`, `xl`) only when content fits.
- Keep page gutters at `px-3` on the smallest screens, growing to `sm:px-6` and
  `lg:px-8`. Constrain desktop reading content with `max-w-7xl` or a narrower
  measure for prose.
- Scale hero type with responsive utilities (for example,
  `text-3xl sm:text-5xl lg:text-6xl`). Keep body copy at least `text-sm` on
  mobile and use relaxed line-height for instructions.
- Buttons, toggles, accordion summaries, modal close buttons, and map controls
  must provide a minimum 44px touch target. At narrow widths, stack navigation
  controls and let labels wrap without pushing the viewport wider.
- Dialogs use viewport-constrained height (`max-h-[90vh]`) and internal
  scrolling. Map controls and status overlays must not obscure one another.

## Brand Identity & App Icons

- The approved master logo is stored at `public/logo.png`; keep this high-resolution
  source as the shared asset for page headers, dialogs, and the footer. The
  generated browser and platform icons live in `public/` and `public/icons/`.
- Keep `favicon.ico` available at 16, 32, and 48 pixels, and provide a
  180-pixel Apple touch icon. The PWA manifest uses 192- and 512-pixel
  standard icons for general install surfaces and a separate 512-pixel
  maskable icon for adaptive Android launchers.
- The maskable icon must keep the logo within its central safe area, with
  approximately 10% padding on every edge; standard icons should use the
  available canvas without maskable-specific padding.
- Use the original logo with `object-contain` and a fixed square box so its
  proportions stay intact. Keep responsive navbar branding compact at 360px,
  use `shrink-0` for the icon and `min-w-0` for adjacent text, and avoid
  forcing the brand or tagline beyond the viewport.

## ThortechShop continuity rules

1. Reuse the shared tokens and component patterns instead of introducing
   page-specific palettes, gradients, radii, or shadow systems.
2. Keep headers and cards white with Slate 200 borders on the off-white canvas.
   Use Slate Navy for the ecosystem footer and primary text.
3. Use orange only for brand actions and active states; retain emerald for
   positive agricultural metrics and sky blue for satellite/spatial context.
4. Share `SiteFooter` for the affiliation line and quick links. External
   ThortechShop links should use the canonical HTTPS catalog URL.
5. Apply responsive and accessible defaults to new routes and widgets:
   semantic headings/landmarks, keyboard operation, `:focus-visible`, readable
   contrast, and 44px touch targets.
6. Update this document, `tailwind.config.ts`, and `app/globals.css` together
   when changing shared tokens. Run frontend lint/build and check routes at
   360px before merging a design-system change.
