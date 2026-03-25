

## Pricing Grid for PrislistaPage

### What we're building
A 2x2 pricing card grid above the existing BookingSection, with neon-styled cards, scroll animations, info text, and a CTA button.

### Implementation

**1. Update `tailwind.config.ts`**
- Add `glow-pulse` keyframe (border glow pulsing between magenta/cyan)
- Add `slide-in-bottom` keyframe for scroll-triggered entrance

**2. Update `src/pages/PrislistaPage.tsx`**
Add a new `PricingGrid` component inline (or separate file) rendered between the page header and BookingSection:

- **4 cards** in `grid grid-cols-1 sm:grid-cols-2 gap-6` layout
- Each card uses `glass-card` base styling with:
  - Alternating `border-neon-pink` / `border-neon-cyan` with `shadow-[0_0_15px_...]` glow
  - Hover: intensified glow via `hover:shadow-[0_0_25px_...]`
  - Package name: `font-display uppercase text-neon-cyan`
  - Price: large `text-yellow-400 font-display font-bold`
  - Two feature lines with `Clock` and `Speaker` icons from lucide-react
  - Muted addon text below
- **Scroll animation**: Use Intersection Observer hook to add `animate-fade-in-up` class when cards enter viewport
- **Info text**: muted paragraph with dot separators
- **CTA**: italic text + gradient button that does `document.getElementById('boka').scrollIntoView()`

**3. Multi-language support**
Add Swedish/English/Spanish translations for all card text, info line, CTA text — matching existing `translations` pattern.

### Technical details
- Reuses existing design tokens: `neon-pink`, `neon-cyan`, `font-display` (Orbitron), `glass-card`
- Uses existing `fade-in-up` animation keyframe already in tailwind config
- No new dependencies needed
- BookingSection remains completely untouched

