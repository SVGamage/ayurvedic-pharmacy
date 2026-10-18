---
target: /companies
total_score: 12
max_score: 40
na_heuristics: 
p0_count: 2
p1_count: 2
target_identity: "file:D:\\Github\\ayurvedic-pharmacy\\src\\app\\companies\\page.tsx"
target_fingerprint: "sha256:566bf6276f3a1efc5f65801cc3d71251d846b18f0d950ab69d7937280ac6674a"
target_path: "D:\\Github\\ayurvedic-pharmacy\\src\\app\\companies\\page.tsx"
timestamp: 2026-10-17T17-50-25Z
slug: src-app-companies-page-tsx
---
Method: dual-agent (A: design review · B: detector + browser)

## Design Health Score
| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 2 | No result count or live region; off-palette full-page spinner |
| 2 | Match System / Real World | 1 | "Buy Company Products" with no products shown; office-block icon; "entries" |
| 3 | User Control and Freedom | 2 | No clear-search; search/page not in URL |
| 4 | Consistency and Standards | 1 | Gradient/shimmer, full-page error, no chips/status vs reworked /products |
| 5 | Error Prevention | 1 | CTA can route the customer to a manufacturer's WhatsApp; empty brands keep "Buy" |
| 6 | Recognition Rather Than Recall | 1 | No products listed; search can't find product names |
| 7 | Flexibility and Efficiency | 1 | No filter, no deep link to a brand |
| 8 | Aesthetic and Minimalist Design | 1 | 572px cards of empty placeholder; dev text leaked into a description |
| 9 | Error Recovery | 1 | Full-page error, reload retry, error never cleared; dead-end empty state |
| 10 | Help and Documentation | 1 | Nothing says brands are stocked at the shop and ordered through Rathnadeepa |
| **Total** | | **12/40** | **Critical** |

## Design Specificity Verdict
LLM: products-page hero kit plus generic image-title-CTA cards; 18 of 19 brands imageless, rendering a wall of Building2 icons. Nothing conveys a multi-brand stockist in Tissa.
Deterministic: CLI 1 (blockquote exception). Overlay: REAL stone-400 italic fallback text at 2.5:1 (x11); active pagination page at 3.2:1 (admin-pagination gradient); h1→h4 skip; emerald gradient CTAs flagged. Buried-raster flags are false positives.

## Priority Issues
1. [P0] WhatsApp till routes to the manufacturer — contactCompanyViaWhatsApp(company.name, company.phone) (company-card.tsx:42, 214-216) messages the company's number when set (Baraka's lacks a country code). Always send to the shop. → harden
2. [P0] Company products and prices fetched but never shown — ~550 brand SKUs (Siddhushadha 238, Link Natural 188, Beam 127) exist only here and are invisible; 154 KB unused JSON per page. Brand page or brand filter. → shape, then layout
3. [P1] Poor-content handling — imageless placeholders, "Test Company 1/2" public, dev changelog as description, 16 empty brands with Buy CTA, truncated bilingual names. → harden + distill
4. [P1] Content below the fold — search at 1070px desktop / 950px mobile; tall cards; no URL state; unlabeled search. → layout + adapt
5. [P2] States lag /products — full-page error never cleared, dead-end empty state, mismatched skeleton aspect, card not keyboard-openable. → harden + polish

## Persona Red Flags
Casey: 154 KB unused JSON, spinner, ~15 swipes for 12 brands, FAB over Buy. Riley: product-name search finds nothing; broken wa.me for local-format phone; stale error. Jordan: "Buy Company Products" reads as buying a company; test companies. Repeat buyer wanting a Siddhalepa balm: can't see if stocked or the price; may end up chatting with the brand.

## Minor Observations
Commented-out contact block; h4 under h1; unrendered "Certified" badges; stacked hover motion; "Brands" is the shopper's word.

## Questions to Consider
- Should /companies become a Brand chip row on /products once catalogs merge?
- Is the company phone meant to bypass the shop?
- Would one honest line about the 550+ stocked items beat 19 tiles, 16 empty?
