# Hero Beer Image — Responsive Audit

## Issue
On small screens (≤ 767px, especially ≤ 575px), the hero beer can image is visually oversized. It dominates the viewport, pushes content (CTAs, meta) below the fold, and competes with the headline for attention.

---

## Root Causes

### 1. Hard-coded inline width on the wrapper
File: `src/sections/Hero.jsx`

```jsx
<BeerImage
  src={beer.image}
  alt={`${beer.name} — ${beer.style}`}
  accent={beer.accent}
  glow={beer.glow}
  width={360}
/>
```

`BeerImage` applies this as inline style:
```jsx
style={{ width, ... }}
```
So the wrapper renders at exactly **360px wide** regardless of screen size. The CSS rule we added (`.sb-beerimg { max-width: 100% }`) caps it to the column width — but on mobile the Bootstrap column (`.col-lg-5` becomes full-width below `lg`) is the full viewport minus padding. That still produces a ~330–360px can on a 375px phone, which feels huge next to a reduced headline.

### 2. `.sb-hero__stage` reserves vertical space
```css
.sb-hero__stage { height: 78vh; ... }
```
On mobile this becomes `min-height: 320px` (our override) + padding. Combined with a 360px-wide image, the can block consumes most of a small viewport.

### 3. No fluid scaling rule for the image itself
`BeerImage` uses a fixed pixel width; there is no `clamp()` or viewport-relative cap. The image either renders at full 360px or only shrinks reactively when the column physically can't hold it.

### 4. The drop-shadow filter exaggerates perceived size
```css
.sb-can, .sb-beerimg { filter: drop-shadow(0 60px 80px ...) drop-shadow(0 0 40px var(--sb-glow)); }
```
The 60–80px shadow/glow extends well beyond the image bounds, making it visually larger than its box.

### 5. Stacking order on mobile
When `.col-lg-7` (text) and `.col-lg-5` (can) stack vertically, the can sits below the headline at full column width — there is no rule forcing it to a smaller percentage on narrow viewports.

---

## Recommended Fixes (no code yet)

### A. Make `BeerImage` width fluid
Change the hero call to pass a fluid value, or have `BeerImage` accept a `width` that can be a CSS clamp string. Suggested target sizes:

| Breakpoint        | Target can width |
|-------------------|------------------|
| ≥ 1200px desktop  | 340–380 px       |
| 992–1199 laptop   | 300–340 px       |
| 768–991 tablet    | 240–280 px       |
| 576–767 mobile    | 180–220 px       |
| ≤ 575 small phone | 140–170 px       |

Easiest implementation: pass `width="clamp(140px, 38vw, 360px)"` from `Hero.jsx`, since `BeerImage` already forwards `width` straight to inline style.

### B. Add a CSS cap in `homepage.css` (defensive)
Inside the existing responsive blocks, add explicit `.sb-hero__stage .sb-beerimg { width: ...; max-width: ... }` rules per breakpoint so the inline `width={360}` is overridden even if `Hero.jsx` is not changed. Example shape:

```
@media (max-width: 991px) { .sb-hero__stage .sb-beerimg { width: 260px; } }
@media (max-width: 767px) { .sb-hero__stage .sb-beerimg { width: 200px; } }
@media (max-width: 575px) { .sb-hero__stage .sb-beerimg { width: 150px; } }
```

### C. Tighten the hero stage box on mobile
- Reduce `min-height` to ~220–260px on `≤ 767px` (currently 320px).
- Remove vertical padding on `.sb-hero__stage` for small screens so the can hugs its image.

### D. Soften the drop-shadow on small screens
The 60px shadow + 40px glow are designed for a 340px can. On a 180px can they look like a halo bigger than the product. Suggested mobile override:

```
@media (max-width: 767px) {
  .sb-beerimg, .sb-can {
    filter: drop-shadow(0 24px 30px rgba(0,0,0,0.55))
            drop-shadow(0 0 18px var(--sb-glow));
  }
}
```

### E. Tame the framer-motion parallax transform
`Hero.jsx` applies `x: canX, y: canY, rotate: canRot` to `.sb-hero__stage`. On mobile mousemove never fires (good), but on hybrid/touch laptops it can offset the smaller can off-center. Consider disabling parallax under `≤ 991px`, e.g. by gating the `useEffect` on `window.matchMedia('(hover: hover)').matches`.

### F. Optional: rebalance the stack order
On mobile, consider rendering the can **above** the headline (or right after the eyebrow + below an even smaller "now pouring" badge) so the text-then-CTA reading flow stays compact. Today the headline > tagline > meta > CTAs > can means the can is last and pushes nothing — but it also means scroll is dominated by it. A small inline thumbnail near the eyebrow could replace the giant stage entirely on `≤ 575px`.

### G. Optional: hide the can on the smallest screens
If the brand priority on mobile is "headline + CTA", the can image can be hidden below 400px with `display: none` on `.sb-hero__stage`. This is the most aggressive option and trades visual identity for usability.

---

## Recommended Combination (minimum viable fix)

1. **A + B** together: pass a clamp() width from `Hero.jsx`, *and* add CSS caps as a safety net.
2. **C**: reduce stage `min-height` on mobile.
3. **D**: soften shadow on mobile.

Steps 1–3 keep the visual identity, fix the oversized appearance, and require <30 lines of changes total. Step E is a polish nice-to-have; F/G are only needed if 1–3 still feel too heavy.

---

## Files Involved
- [src/sections/Hero.jsx](src/sections/Hero.jsx) — passes `width={360}` to `BeerImage`.
- [src/components/BeerImage.jsx](src/components/BeerImage.jsx) — forwards `width` to inline style; sets the drop-shadow source.
- [src/styles/homepage.css](src/styles/homepage.css) — defines `.sb-hero__stage`, `.sb-beerimg`, `.sb-can`, and the responsive overrides where caps should be added.
