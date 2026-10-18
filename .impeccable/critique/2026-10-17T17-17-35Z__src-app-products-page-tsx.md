---
target: /products
total_score: 18
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 3
target_identity: "file:D:\\Github\\ayurvedic-pharmacy\\src\\app\\products\\page.tsx"
target_fingerprint: "sha256:1f2f0b00181608467710ec39afab2cce7f7cdf24bdbe77ea5d85007eaedd46a1"
target_path: "D:\\Github\\ayurvedic-pharmacy\\src\\app\\products\\page.tsx"
timestamp: 2026-10-17T17-17-35Z
slug: src-app-products-page-tsx
---
Method: dual-agent (A: design review · B: detector + browser)

## Design Health Score
| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | "FROM" price badge shows the selected/first variant price, not the lowest; add-to-cart toast omits variant and has no "View cart"; no result count |
| 2 | Match System / Real World | 2 | "Showing 1 to 2 of 2 entries" admin language; two dropdowns both about "category"; English-only WhatsApp message carrying raw product IDs |
| 3 | User Control and Freedom | 2 | "Clear All" full-width right under "Order via WhatsApp", no undo; "Try Again" reloads and loses search/filters |
| 4 | Consistency and Standards | 2 | Gradient + shine buttons vs flat herb-green system; off-palette full-page loader; card vs dialog variant pills differ |
| 5 | Error Prevention | 2 | Empty categories still listed; "Price on request" products keep an Add to Cart that fails with "No variant available" |
| 6 | Recognition Rather Than Recall | 3 | Variant pills visible on cards (good); categories hidden in dropdowns |
| 7 | Flexibility and Efficiency | 1 | No URL state for search/filter/page; "Share Product" shares bare /products; no sort |
| 8 | Aesthetic and Minimalist Design | 2 | First product at ~y=1600 behind three stock carousels and a tall hero; two equal CTAs per card |
| 9 | Error Recovery | 1 | Failed fetch replaces the whole page and error is never reset; empty state is a dead end |
| 10 | Help and Documentation | 1 | Nothing explains ordering: no online payment, island-wide delivery, what happens after WhatsApp, Poya closures |
| **Total** | | **18/40** | **Poor** |

## Design Specificity Verdict
LLM: Category-interchangeable. Remove the Tangerine wordmark and the rotating Sinhala subtitle and this is any wellness Shopify theme: three autoplay stock-photo carousels ("Slide 1/2/3" alt), a "Let's Shop / Premium Ayurvedic Products" hero, gradient-shine cards, an admin pagination bar. The product's real differentiators are absent from the page: the maker/brand never appears on cards (multi-brand stockist; brand browser commented out), no path to the in-house doctors, "Disease-Related Products" hidden in a dropdown, and the WhatsApp till treated as a duplicate button rather than the moment the whole page builds to.
Deterministic: CLI 8 findings (gray-on-color 6, side-tab 1, font-size 1): all false positives or documented exceptions on inspection (hover-state pairs, blockquote border, cart-count 10px). Browser overlay 16/13/9 across page/dialog/cart: confirmed real — white 12px on emerald-600 selected variant chip (~3.8:1), h1→h4 heading skip, `transition: height`; also flagged emerald-gradient badges/buttons (agrees with LLM consistency finding), hover-transform images, Inter at 90% of text, stock imagery under washes.

## Priority Issues
1. [P1] Products buried below decoration — three carousels + 12rem hero + filter card push the first product to ~3 screens down on mobile. Fix: drop/reduce CarouselGrid to one real-shop strip, compress hero to a one-line bilingual title, put search + category chips above the fold. → /impeccable layout, then distill
2. [P1] WhatsApp handoff has no reassurance and an incomplete message — no "how ordering works" (no payment now, stock/delivery confirmed, island-wide, Poya), no name/town, English-only, raw IDs; Clear All one mis-tap from the CTA. → /impeccable clarify + harden
3. [P1] "FROM" price badge is wrong — shows selected/first price (product-card.tsx:124-130) while lowestPrice (l.58) goes unused. Fix: "From {lowest}" only with ≥2 variants. → /impeccable harden
4. [P2] Unbacked trust signals and unguarded content — star ratings/review counts render from product fields while PRODUCT.md records no real reviews; placeholder descriptions pass through; price-on-request items keep a failing Add to Cart. Fix: hide ratings until real, show maker / "Rathnadeepa formulation" instead, "Ask price on WhatsApp" CTA. → /impeccable harden, then clarify
5. [P2] Dead-end states — full-page error never cleared, empty state with no recovery, no URL state, Share copies /products, first load is an off-palette spinner. Fix: inline error + retry, empty state with Clear filters + "Ask us on WhatsApp", searchParams + ?product deep links, skeleton on first load. → /impeccable harden

## Persona Red Flags
Casey (mobile): first product ~3 screens down; 618px-tall cards; variant pills ~24px tall; cart steppers ~20-24px; floating WhatsApp button overlaps card CTAs; full-screen spinner on slow loads.
Riley (stress): transient fetch error wiped page and query; empty categories; refresh loses filters/page; Clear All next to order CTA.
Jordan (first-timer): no explanation of no-online-payment or what happens after WhatsApp; two CTAs per card unexplained; two "category" dropdowns; card is a clickable div with no role/tabindex.
Nimal (Sinhala-first local repeat buyer): only Sinhala is one rotating subtitle; filters, buttons, cart and WhatsApp message all English; no Poya note; no shelf-name chips (Arishta, Thailam, Kwatha).

## Minor Observations
Carousel alt "Slide N"; ProductLoading sans + off-palette gradient; 11px stone-400 "From" low contrast; product name h4 under h1; variant buttons lack aria-pressed; "Select Size" label not associated; dialog hides scrollbar and cuts off CTAs on short viewports; Share clipboard fallback has no toast; skeleton capped at 6 while 12 load (layout shift); pagination status text styled like links; hover-only effects do nothing on touch; `transition: height` animates layout.

## Questions to Consider
- If WhatsApp is the till, why does every card carry two tills?
- What if the page opened with "What are you treating?" chips and a one-tap "Ask our doctor"?
- Isn't the maker (or "our own formulation") more trustworthy than a star rating nobody wrote?
- Should the bilingual promise live in the buttons, chips and WhatsApp message, not a rotating subtitle?
