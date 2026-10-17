---
name: Rathnadeepa Herbals
description: A trusted family Ayurvedic dispensary, rendered in warm stone and deep herb green.
colors:
  herb-green: "#059669"
  herb-green-deep: "#047857"
  forest-shade: "#065f46"
  forest-night: "#064e3b"
  sprout: "#10b981"
  leaf-mist: "#a7f3d0"
  leaf-wash: "#d1fae5"
  dew: "#ecfdf5"
  wordmark-green: "#166534"
  wordmark-green-light: "#16a34a"
  turmeric: "#fbbf24"
  stone-paper: "#fafaf9"
  stone-shelf: "#f5f5f4"
  stone-line: "#e7e5e4"
  stone-quiet: "#a8a29e"
  stone-muted: "#78716c"
  stone-ink-soft: "#57534e"
  stone-ink: "#292524"
  stone-ink-deep: "#1c1917"
  card-white: "#ffffff"
  alert-red: "#ef4444"
typography:
  brand:
    fontFamily: "Tangerine, cursive"
    fontSize: "clamp(1.875rem, 6vw, 3.75rem)"
    fontWeight: 700
    lineHeight: 1.25
  display:
    fontFamily: "Source Serif 4, serif"
    fontSize: "clamp(2.25rem, 5vw, 3.75rem)"
    fontWeight: 700
    lineHeight: 1.25
  hero:
    fontFamily: "Source Serif 4, serif"
    fontSize: "clamp(1.875rem, 4vw, 3rem)"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Source Serif 4, serif"
    fontSize: "clamp(1.875rem, 3vw, 2.25rem)"
    fontWeight: 700
    lineHeight: 1.2
  title:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.375
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.625
  body-lead:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.05em"
rounded:
  sm: "4px"
  md: "6px"
  lg: "8px"
  xl: "12px"
  2xl: "16px"
  3xl: "24px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
  section: "80px"
components:
  button-primary:
    backgroundColor: "{colors.herb-green}"
    textColor: "{colors.card-white}"
    typography: "{typography.body}"
    rounded: "{rounded.full}"
    padding: "24px 24px"
  button-primary-hover:
    backgroundColor: "{colors.herb-green-deep}"
  button-nav-cta:
    backgroundColor: "{colors.forest-night}"
    textColor: "{colors.card-white}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: "8px 24px"
  button-nav-cta-hover:
    backgroundColor: "{colors.forest-shade}"
  button-outline-herb:
    backgroundColor: "{colors.card-white}"
    textColor: "{colors.herb-green-deep}"
    rounded: "{rounded.2xl}"
    padding: "12px 16px"
  button-outline-herb-hover:
    backgroundColor: "{colors.dew}"
  button-shadcn-default:
    backgroundColor: "{colors.herb-green}"
    textColor: "{colors.card-white}"
    rounded: "{rounded.md}"
    height: "40px"
    padding: "8px 16px"
  input:
    backgroundColor: "{colors.stone-paper}"
    textColor: "{colors.stone-ink-deep}"
    rounded: "{rounded.md}"
    height: "40px"
    padding: "8px 12px"
  badge-pill:
    backgroundColor: "{colors.herb-green}"
    textColor: "{colors.card-white}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: "2px 10px"
  eyebrow-chip:
    backgroundColor: "{colors.card-white}"
    textColor: "{colors.herb-green-deep}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: "6px 16px"
  card-product:
    backgroundColor: "{colors.card-white}"
    rounded: "{rounded.3xl}"
    padding: "20px"
  card-basic:
    backgroundColor: "{colors.card-white}"
    rounded: "{rounded.lg}"
    padding: "24px"
  footer:
    backgroundColor: "{colors.forest-night}"
    textColor: "{colors.leaf-mist}"
    typography: "{typography.label}"
---

# Design System: Rathnadeepa Herbals

## Overview

**Creative North Star: "The Village Apothecary"**

This is the trusted family dispensary on the Hambantota road, put on a screen. Pages are warm stone paper (`stone-paper`), not stark white. Green is the colour of the herb shelf and the doctor's coat: deep, settled emerald (`herb-green`) that marks every place a visitor can act, and that darkens to `forest-night` where the shop holds its ground (the nav order button and the footer). The name is written by hand: the Tangerine script wordmark is the one flourish that says "family, generational", and everything around it stays plain so the script keeps its warmth.

Density is relaxed and retail-friendly. There are wide 1280px containers, generous 80px section breathing room, and rounded, softly lifted cards that feel like jars on a shelf you can pick up. Serif headlines carry the "ancient wisdom" register, often with an italic emerald second phrase ("What Our *Customers Say*"). Inter carries every price, label and button so the commerce reads clearly. Photography of real products, services and the shop sits inside rounded frames, with dark stone gradients wherever text sits on top.

The implemented system has some loose ends that are recorded rather than resolved (see Do's and Don'ts → Known gaps). Document what renders; don't treat the gaps as intent.

**Key Characteristics:**
- Warm stone neutrals (Tailwind *stone*) everywhere; cool grays are drift.
- One accent family, emerald, in a full ladder from `dew` to `forest-night`; turmeric amber only for stars and small highlights.
- Pills for actions and chips, 16–24px radii for cards and media frames.
- Soft, diffuse lift on cards, warming to an emerald-tinted glow on hover.
- Tangerine script reserved for the Rathnadeepa Herbals wordmark.
- Serif headlines with an italic emerald phrase; sans for everything functional.

## Colors

A warm, earthy palette: stone paper and ink, with emerald herb greens doing all the signalling.

### Primary
- **Herb Green** (`herb-green`): the action colour. Primary buttons, "Order via WhatsApp", active links, product category labels, prices on product cards, focus rings (`--ring`). The most-used colour in the codebase.
- **Herb Green Deep** (`herb-green-deep`): hover state of Herb Green; the italic emerald phrase in section headlines; link hover in nav and contact rows.
- **Forest Shade** (`forest-shade`): active nav link text; hover on the dark nav CTA; deep text on pale green surfaces.
- **Forest Night** (`forest-night`): the grounding dark. Header "order" button and the full footer background.
- **Sprout** (`sprout`): the lighter end of emerald gradients on product-card badges and WhatsApp buttons.

### Secondary
- **Leaf Mist** (`leaf-mist`): footer link text on Forest Night; hover borders on product cards.
- **Leaf Wash** (`leaf-wash`): icon discs behind contact and feature icons (`p-3 rounded-full`).
- **Dew** (`dew`): pale green section bands (testimonials) and outline-button hover fills.
- **Wordmark Green / Wordmark Green Light** (`wordmark-green`, `wordmark-green-light`): only the two lines of the script wordmark ("Rathnadeepa" / "Herbals"). In the footer they invert to Tailwind green-100 and green-300.

### Tertiary
- **Turmeric** (`turmeric`): rating stars (filled), the `--accent` token, small warm highlights. Never a button or large fill.

### Neutral
- **Stone Paper** (`stone-paper`): page background (`--background`), scrolled header glass, mobile menu.
- **Stone Shelf** (`stone-shelf`): secondary surfaces, neutral chips, image placeholders.
- **Stone Line** (`stone-line`): borders, dividers, inputs (`--border`, `--input`).
- **Stone Quiet / Stone Muted** (`stone-quiet`, `stone-muted`): captions, "per unit" micro-labels, empty-state italics.
- **Stone Ink Soft** (`stone-ink-soft`): body copy and nav links at rest (`--muted-foreground`).
- **Stone Ink / Stone Ink Deep** (`stone-ink`, `stone-ink-deep`): headlines and primary text (`--foreground`).
- **Card White** (`card-white`): cards, dialogs, popovers.

### Named Rules
**The Warm Stone Rule.** Neutrals come from the stone family. `gray-*` and `slate-*` classes in older components (blog preview, some loaders) are drift; don't add more.

**The Emerald Ladder Rule.** All brand colour is emerald, picked by depth: pale steps for surfaces, 600 for action, 900 for grounding. Plain `green-*` belongs only to the wordmark and to WhatsApp-specific moments.

**The Turmeric Pinch Rule.** Amber is a spice, not a base. Stars, a badge dot, a tiny highlight; never a fill larger than a chip.

## Typography

**Brand Font:** Tangerine 700 (cursive fallback), loaded via `next/font` as `--font-tangerine`
**Display / Headline Font:** declared as Source Serif 4 (`--font-serif`), *not loaded*, so it currently renders in the browser's default serif (see Known gaps)
**Body / Label Font:** Inter (system-ui stack fallback), loaded as `--font-inter`

**Character:** A handwritten family signature over a bookish serif voice, with a clean modern sans doing the shopkeeping.

### Hierarchy
- **Brand** (700, 30px to 60px responsive): the "Rathnadeepa" wordmark only, with "Herbals" beneath at about 60% size, weight 500.
- **Display** (serif 700, 36px to 60px, line-height 1.25): page heroes on inner routes (`ReusableHeroSection`). Line one is solid; line two is italic and coloured.
- **Hero** (serif 500, 30px to 48px, tracking −0.025em, white): the homepage carousel title, set in two short lines ("Ancient Wisdom,\nModern Healing.").
- **Headline** (serif 700, 30px to 36px, `stone-ink`): section titles, typically ending in an italic `herb-green-deep` phrase.
- **Title** (Inter 600, 14px mobile to 18px desktop, tracking −0.025em): card and product names, clamped to two lines.
- **Body** (Inter 400, 14px, line-height 1.625, `stone-ink-soft`): descriptions and card text. **Body Lead** (18px) sits under section headlines, max about 42rem wide and centred.
- **Label** (Inter 600, 10px to 12px, uppercase, tracking 0.05em): eyebrow chips, category tags, footer column headings, price captions.

### Named Rules
**The Signature Rule.** Tangerine appears only in the wordmark. Never set headings, prices or Sinhala in script.

**The Italic Phrase Rule.** A serif headline may end with one italic emerald phrase. One per heading, never the whole line.

**The Sinhala Legibility Rule.** Sinhala copy (for example, the bilingual hero subtitle) is set in the body sans at body sizes or larger, on solid or darkened ground. It inherits the system Sinhala fallback today; no Sinhala webfont is loaded.

## Layout

- **Container:** `max-w-7xl` (1280px), centred, with 24px side padding (`px-6`; some sections use `px-4 sm:px-6 lg:px-8`).
- **Section rhythm:** 80px vertical padding (`py-20`) for major bands and 64px (`py-16`) for lighter ones. Section intros are centred, with 64px (`mb-16`) before the grid.
- **Grids:** product, service and company cards use 2 columns on mobile and 3–4 on desktop, with 16–32px gaps. Content-and-map or content-and-image sections use a two-column split (`md:grid-cols-2 gap-12`).
- **Hero:** a rounded, inset media frame (not full-bleed), padded below the fixed header (128–160px top). It is 4:5 on mobile and 21:9 on desktop, with copy anchored bottom-left over a stone gradient.
- **Header:** fixed and transparent at the top of the page; once scrolled it becomes `stone-paper` at 80% opacity, with a backdrop blur and a hairline border. Desktop links appear from `md` (768px) up; below that, a slide-down sheet menu.
- **Mobile:** cards shrink their type and padding by roughly one step (`text-sm sm:text-lg`, `p-3 sm:p-5`) rather than reflowing.
- **Floating:** a WhatsApp action button stays fixed at the bottom-right on every page.

## Elevation & Depth

The system uses soft lift. Surfaces rest on gentle, diffuse shadows. On hover, cards rise a few pixels and the shadow warms with an emerald tint, so the shelf feels picked up. Glass (backdrop blur over translucent white or stone) is used for overlays on imagery and for the scrolled header.

### Shadow Vocabulary
- **Rest** (`box-shadow: 0 4px 20px -4px rgba(0,0,0,0.06)`): product and service cards at rest.
- **Herbal lift** (`box-shadow: 0 20px 40px -12px rgba(16,185,129,0.15), 0 8px 20px -8px rgba(0,0,0,0.08)`): card hover, paired with `translateY(-8px)`.
- **Emerald glow** (`box-shadow: 0 10px 15px -3px rgb(16 185 129 / 0.2)`, Tailwind `shadow-lg shadow-emerald-500/20`): WhatsApp/primary gradient buttons and floating badges.
- **Hero frame** (`shadow-2xl shadow-stone-200`): the inset hero media frame.
- **Utility** (`--shadow-sm` … `--shadow-xl`): shadcn primitives (cards, popovers, dialogs).

### Named Rules
**The Picked-Up Jar Rule.** Interactive cards lift on hover (translate up and deepen to Herbal lift). Static information panels stay on Rest or `shadow-sm` and do not move.

## Shapes

The form language is soft and organic, without hard corners anywhere a customer touches.

- **Pills (9999px):** every primary action, nav CTA, chip, eyebrow tag, badge, icon disc and carousel dot. This is the most common shape in the codebase.
- **Generous rounding (16–24px):** product cards (24px from `sm` up, 16px on mobile), hero frame, dialogs and image frames.
- **Medium (12px):** inner buttons on cards, variant chips, contact info panels.
- **Utility (6–8px):** shadcn inputs, base buttons and admin UI.
- **Borders:** hairline `stone-line`, often at 60% opacity on cards. They warm to `leaf-mist` on hover.
- **Media:** always clipped inside its container's radius. Images zoom slightly (`scale-105` to `110`) inside the frame on hover.

## Components

### Buttons
Friendly and tactile, like a counter bell.
- **Shape:** pill (9999px) for storefront actions; 16px rounded rectangles for full-width in-card actions; 6px for shadcn defaults and admin.
- **Primary:** Herb Green fill, white Inter 500 text at 14px with slight tracking. The hero size is about 48px tall with 24px horizontal padding. Hover moves to Herb Green Deep, and the hero CTA also scales to 1.05.
- **Nav CTA:** Forest Night pill with 12px tracked text and a small trailing arrow, under a soft `forest-night`-tinted shadow. Hover moves to Forest Shade.
- **Outline (Add to Cart):** 2px Herb Green border, Herb Green Deep text and a white fill. Hover fills with Dew.
- **WhatsApp:** a Herb Green → Sprout gradient with Emerald glow and a light shimmer sweep on hover (a known gap; see below).
- **Ghost on imagery:** white at 10% opacity with a white 20% border and backdrop blur, used over the hero.
- **Focus:** 2px Herb Green ring with a 2px offset (shadcn base).

### Chips / Badges
- **Eyebrow chip:** white at 80% with a blur, a hairline stone border and a pill shape. It carries a small leaf icon and uppercase label text in emerald. It sits above every page hero title.
- **Hero tag:** translucent Forest Night with an emerald-300 label and an emerald-500/30 border, used over the image.
- **Product badge:** Herb Green → Sprout gradient pill with white 10–12px semibold text and a sparkle icon.
- **Variant chips:** 12px-rounded; Stone Shelf when unselected, emerald-tinted when selected.

### Cards / Containers
- **Corner Style:** 24px (product, service, company cards), 8px (shadcn base card).
- **Background:** white fading to Stone Paper, with a faint Dew corner glow at the top right.
- **Shadow Strategy:** Rest at rest and Herbal lift on hover (see Elevation & Depth).
- **Border:** Stone Line at 60%, moving to Leaf Mist on hover.
- **Internal Padding:** 12px on mobile, 20px on desktop. The image is square, on top.
- **Structure (product):** square image, then a price tile (top right, glass), badge (top left) and rating (bottom left). Below that: a category label with a leaf icon, a two-line title, variants, then two stacked actions (Add to Cart, Order via WhatsApp).

### Inputs / Fields
- **Style:** 40px tall, 6px radius, Stone Line border on Stone Paper, 14px text, placeholder in Stone Ink Soft.
- **Focus:** 2px Herb Green ring with a 2px offset.
- **Disabled:** 50% opacity, `not-allowed` cursor.

### Navigation
- **Style:** fixed header that turns to glass on scroll (see Layout). The wordmark with its logo sits on the left; the links are Inter 500 in Stone Ink Soft.
- **States:** hover is Herb Green Deep; active is Forest Shade at weight 600. There's no underline.
- **Mobile:** a hamburger in a pill-shaped hit area opens a full-width Stone Paper sheet, with a full-width Forest Night pill CTA at the bottom.

### Footer
Forest Night ground. Column headings are uppercase white labels; links are 12px Leaf Mist and turn white on hover. Contact rows lead with small Forest Shade icon discs. The wordmark inverts to pale greens.

### Page Hero (signature)
`ReusableHeroSection`: centred, with an eyebrow chip, a two-line serif Display title (solid then italic colour), a Body Lead subtitle, and a row of graduated dots (6, 8, 12, 8 and 6px) as a decorative divider. Blurred colour blobs sit behind it, and the theme colour varies by page.

## Do's and Don'ts

### Do:
- **Do** use Herb Green for anything a visitor can act on, and Forest Night where the brand needs to sit heavy (nav CTA, footer).
- **Do** keep page grounds Stone Paper and text in stone inks; pale emerald bands (Dew) are for whole sections, not individual cards.
- **Do** make storefront actions pills and product cards 24px-rounded, with the Rest → Herbal lift hover.
- **Do** write section headlines in serif with at most one italic emerald phrase.
- **Do** darken imagery with a stone gradient (`stone-900/90` → transparent) before setting text on it.
- **Do** give Sinhala text body size or larger, on solid or darkened ground.

### Don't:
- **Don't** use Tangerine outside the wordmark.
- **Don't** introduce gray or slate neutrals, or a second accent hue; turmeric stays a pinch.
- **Don't** let turmeric/amber become a button or a large fill.
- **Don't** put hard square corners on customer-facing actions or cards.

### Known gaps (recorded, not resolved)
- **Serif font isn't loaded.** `--font-serif` names Source Serif 4, but no font loader includes it, so serif headings render in the browser's default serif and vary by OS. Decide whether to load it or choose another serif.
- **The dark theme is unfinished.** A `.dark` token set exists, with blue secondary and accent colours (`#4682b4`, `#6495ed`) that are off-palette. It has no toggle and hasn't been designed. Don't build on it as it stands.
- **Button styles are mixed.** Gradient fills, shimmer sweeps and hover-scale buttons sit alongside flat Herb Green pills, and nothing decides between them.
- **Unused animations.** `globals.css` defines float, glow, pulse and a gradient-text utility (green → yellow). Treat them as legacy unless a surface brief chooses them.
- **No Sinhala webfont.** Sinhala renders in whatever the system has.
