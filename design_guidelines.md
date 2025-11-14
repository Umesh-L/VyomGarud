# VyomGarud UI Design Guidelines

This document describes the visual system and component guidelines for the VyomGarud project. It is written in plain language and maps directly to the codebase (Tailwind CSS, Radix UI, and the project's `client/src/components/ui` components). Follow these rules to keep the product consistent, accessible, and easy to maintain.

## Core Principles

- Military precision: geometric grids, clear alignment, and predictable spacing.
- Clear hierarchy: obvious visual order for headlines, sections and CTAs.
- Functional restraint: avoid decorative noise; prioritize clarity and purpose.
- Accessibility-first: semantic markup, visible focus states, and sufficient contrast.

## Where to edit tokens

- Change global colors, spacing and radius in `tailwind.config.js` so updates apply everywhere.
- Use component variants (CVA) or utility helpers instead of repeating classes across files.

## Color, Dark Mode and Tokens

- Default theme: dark-first (design optimized for dark surfaces). Provide a light theme as an alternative.
- Primary color (accent): hsl(25 100% 50%) — use for primary CTAs and key accents.
- Accent states: hover (≈10% darker), active (≈15% darker), disabled (opacity 60%).
- Neutral scale: use a broad grayscale for surfaces and text; prefer `neutral-900` for dark surfaces.
- Use CSS custom properties (where helpful) and map them to Tailwind tokens.

Example tokens (in `tailwind.config.js`):

```js
// colors
--color-primary: 'hsl(25 100% 50%)'
// spacing scale uses Tailwind's default spacing: 4, 8, 12, 16, 20, 24
```

## Typography

- Font stack: `Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial`.
- Scale guidelines (use Tailwind `text-` classes):
  - Hero / h1: large (desktop 48–64px range)
  - h2: 32–40px
  - h3: 24–28px
  - Body: 16px base; 18px for long-form content
  - Line-height: 1.4–1.6 for body text

Prefer utility classes (`text-xl`, `text-2xl`) and avoid hard-coded pixel values inside components.

## Spacing & Layout

- Use Tailwind spacing scale consistently: 4, 8, 12, 16, 20, 24.
- Page container: `max-w-7xl` with horizontal `px-6` or `px-8`.
- Content width for text-heavy areas: `max-w-4xl`.
- Sections: use symmetric vertical padding (for example `py-20` desktop, `py-12` mobile).

## Component Patterns

The repository uses Radix primitives and shadcn-style components. Reuse components in `client/src/components/ui` and follow these simple rules:

- Buttons
  - `.btn-primary`: primary CTAs (primary background, white text, clear focus state).
  - `.btn-secondary`: secondary actions (neutral background).
  - Include `:focus-visible` styles for keyboard users.

- Cards
  - Use `rounded-md`, `shadow-sm`, and a simple surface color like `bg-neutral-900` (dark) or `bg-white` (light).
  - Internal padding: `p-6` for comfortable density, `p-4` for denser lists.

- Forms
  - Inputs: `bg-neutral-800`, `text-white`, `rounded-md`, `px-3 py-2`.
  - Focus: `focus-visible:ring-2 focus-visible:ring-primary/60`.
  - Errors: use `text-red-400` with `aria-invalid="true"` and an inline message element.

- Modals & Drawers
  - Use Radix Dialog/Drawer; mobile should use full-screen pattern, desktop centered card.
  - Backdrop: `backdrop-blur-sm` with a semi-opaque overlay color.

- Toasts
  - Compact, dismissible, slide-in from top-right; use icons from `lucide-react`.

## Accessibility

- Use semantic HTML and landmarks (`header`, `main`, `footer`, `nav`).
- Ensure all interactive controls are keyboard operable and have visible focus styles.
- Test color contrast for both dark and light themes (WCAG AA minimum for body text).
- Honor `prefers-reduced-motion` and keep animations subtle.

## Motion & Animation

- Keep motion subtle and purposeful: fade/slide/scale with 150–300ms durations.
- Use `framer-motion` for coordinated transitions and check `prefers-reduced-motion`.
- Avoid heavy layout-shifting animations that affect readability.

## Images & Assets

- Place production images in `attached_assets/` or `client/public` and reference them from the client code.
- Hero images: dark, technical photography or high-contrast drone imagery.
- Use SVGs for icons (line-style sets like Lucide work well with this aesthetic).

## Responsive Guidelines

- Mobile-first approach: build components for the smallest breakpoint first and expand up.
- Breakpoints: follow Tailwind defaults `sm`, `md`, `lg`, `xl` and test each.
- Navigation collapses to a hamburger menu on `sm` with an accessible off-canvas drawer.

## Examples & Code Snippets (copyable)

Button example (JSX):

```jsx
<button className="btn-primary px-6 py-3 rounded-md">Request Demo</button>
```

Card example (JSX):

```jsx
<article className="bg-neutral-900 rounded-md shadow-sm p-6">
  <h3 className="text-xl font-semibold">Payload Integration</h3>
  <p className="mt-3 text-sm leading-relaxed">Modular payloads for varied missions.</p>
</article>
```

Form input example (JSX):

```jsx
<label className="block">
  <span className="text-sm">Email</span>
  <input type="email" className="mt-1 block w-full rounded-md bg-neutral-800 px-3 py-2 text-white focus-visible:ring-2 focus-visible:ring-primary/60" />
</label>
```

## Developer Hints

- Prefer updating tokens in `tailwind.config.js` rather than changing repeated classes throughout components.
- Use `cva` (class-variance-authority) for component variants and `tailwind-merge` to combine conditional classnames.
- Keep components small and focused; prefer composition over custom layout logic.

## Design Review Checklist

- Visual hierarchy: headings and CTAs are clearly ordered.
- Spacing: consistent use of the spacing scale across sections.
- Accessibility: keyboard navigable and color contrast verified.
- Motion: reduced motion honoured for those who prefer it.

## Contributing

When adding tokens or patterns:

1. Add tokens to `tailwind.config.js` and document them here.
2. Add a sample component to `client/src/components/ui` and show a short usage example.
3. Run the dev server and verify both dark and light themes.

---

These guidelines keep the UI consistent, accessible, and aligned with the project's military-precision aesthetic. When in doubt, prefer clarity and function.
# VyomGarud UAV Systems - Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from Onomondo's clean professionalism and Raphe's bold, military-grade aesthetic. The design prioritizes precision, confidence, and advanced technology communication through strong typography, generous spacing, and purposeful component placement.

## Core Design Principles
- **Military Precision**: Clean lines, geometric layouts, structured grids
- **Confidence Through Restraint**: Spacious layouts that let content breathe
- **Technical Excellence**: Sharp, modern components that communicate reliability
- **Professional Authority**: Enterprise-grade polish without excessive decoration

## Typography System

**Primary Font**: Inter (clean, technical, excellent readability)
**Hierarchy**:
- Hero Headline: 4xl to 6xl (font-bold, tracking-tight, uppercase for company name)
- Section Headers: 3xl to 4xl (font-bold, tracking-tight)
- Subheadings: xl to 2xl (font-semibold)
- Body Text: base to lg (font-normal, leading-relaxed)
- CTA Buttons: base to lg (font-semibold, uppercase tracking-wide)

## Layout & Spacing System

**Tailwind Units**: Consistently use 4, 8, 12, 16, 20, 24 for spacing
- Section Padding: py-20 to py-32 (desktop), py-12 to py-16 (mobile)
- Component Spacing: gap-8 to gap-16 for grids
- Container: max-w-7xl with px-6 to px-8
- Content max-width: max-w-4xl for text-heavy sections

## Component Library

### Hero Section
- Full viewport height (min-h-screen) with centered content
- Large hero image: Dark, dramatic UAV/drone in flight or technical closeup, positioned as background with overlay
- Image treatment: Dark gradient overlay (opacity-70) for text legibility
- Company name in bold, large uppercase typography
- Tagline below in lighter weight, medium size
- Primary CTA button with blurred background (backdrop-blur-md) positioned prominently
- Subtle scroll indicator at bottom

### About Section
- Single column layout, max-w-3xl centered
- Section header with accent underline element
- 2-paragraph mission statement with generous line-height
- Stats bar: 3-4 key metrics in horizontal grid (grid-cols-2 md:grid-cols-4)

### Capabilities/Products Cards
- Grid layout: grid-cols-1 md:grid-cols-2 lg:grid-cols-4
- Card design: Bordered containers with subtle hover elevation
- Each card contains:
  - Icon area (technical line icons from Heroicons)
  - Service title (font-semibold, text-xl)
  - Brief description (text-sm, leading-relaxed)
  - Optional "Learn more" link
- Hover state: Subtle border glow, slight scale transform

### Highlights Section
- 3 columns on desktop (grid-cols-1 md:grid-cols-3)
- Icon + headline + description format
- Larger icons (w-12 h-12) with technical styling
- Concise bullet-style content
- Equal height cards for visual balance

### Contact/Footer
- Two-column layout (md:grid-cols-2)
- Left: Simple contact form with:
  - Name, Email, Message fields
  - Styled inputs with focus states
  - Submit button matching primary CTA style
- Right: Contact information and quick links
- Bottom footer bar with company info and social links

## Images Strategy

**Hero Image**: 
- Large, dramatic image of UAV/drone in flight or precision engineering close-up
- Dark, moody atmospheric treatment
- Position: Background with dark overlay gradient
- Style: High-tech, military-grade aesthetic

**Supporting Images**:
- Capabilities section: Consider small technical icons or product imagery within cards
- About section: Optional technical diagram or facility image

## Animation Guidelines

**Minimal, Purposeful Animations**:
- Hero text: Fade-in on load (duration-700)
- Scroll-triggered: Section fade-in as they enter viewport (intersection observer)
- Card hovers: Subtle scale (scale-105) and border glow
- Button states: Smooth opacity/transform transitions
- NO: Complex scroll effects, parallax, or distracting movements

## Navigation

- Fixed top navigation bar with backdrop-blur
- Logo left, navigation links center/right
- Mobile: Hamburger menu with slide-in drawer
- CTA button in header (persistent)

## Responsive Behavior

- Mobile-first approach with Tailwind breakpoints
- Hero: Full height maintained, text sizes scale down
- Cards: Stack to single column on mobile
- Spacing: Reduce py-32 to py-12 on mobile
- Images: Maintain aspect ratios, adjust positioning for mobile viewports

## Trust & Credibility Elements

- Client logos section (if available): "Trusted by" bar
- Technical certifications or standards badges
- Numerical highlights (years of experience, successful deployments)
- Professional imagery throughout conveying precision and reliability

This design delivers a military-grade, confident presence that positions VyomGarud as a leader in precision UAV systems through clean layouts, strong typography, and purposeful component design.