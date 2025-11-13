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