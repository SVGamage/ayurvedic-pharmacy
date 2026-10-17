---
target: /services
total_score: 19
max_score: 40
na_heuristics: 
p0_count: 1
p1_count: 2
target_identity: "file:D:\\Github\\ayurvedic-pharmacy\\src\\app\\services\\page.tsx"
target_fingerprint: "sha256:12db465992aedb9ae52afd50c464e40e9ec11751a160f2bd4b17a36f124991dd"
target_path: "D:\\Github\\ayurvedic-pharmacy\\src\\app\\services\\page.tsx"
timestamp: 2026-10-17T17-50-24Z
slug: src-app-services-page-tsx
---
Method: dual-agent (A: design review · B: detector + browser)

## Design Health Score
| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 2 | Nothing says "Book" opens WhatsApp; no acknowledgement after hand-off |
| 2 | Match System / Real World | 2 | "Nakshatra Vana" label (vana = forest); English-only booking message |
| 3 | User Control and Freedom | 2 | Save and Share buttons do nothing; open service not in URL |
| 4 | Consistency and Standards | 1 | Gradient/shimmer buttons, fake rating, dead Share vs reworked /products |
| 5 | Error Prevention | 2 | Bottom CTA books a phantom "Ayurvedic Consultation Rs. 5,000 / 45 min" |
| 6 | Recognition Rather Than Recall | 3 | Price and duration on card and dialog |
| 7 | Flexibility and Efficiency | 2 | Cards not keyboard-openable (div onClick) |
| 8 | Aesthetic and Minimalist Design | 1 | ~1,500px of carousel + hero before first service; stacked glow/blobs/badges |
| 9 | Error Recovery | 2 | Full-page error, reload-only retry, no WhatsApp fallback |
| 10 | Help and Documentation | 2 | Hardcoded "Important Note" wrong for online and Nakshatra services |
| **Total** | | **19/40** | **Poor** |

## Design Specificity Verdict
LLM: wellness-template copy ("Transformative Wellness Services", "Begin Your Journey"), stock carousel (incl. a courier photo), product-card shell with shimmer and a fabricated 5.0 rating. Doctors, the shop, Poya and lineage are absent.
Deterministic: CLI 1 finding (blockquote side-tab, exception). Overlay: REAL white-on-emerald-gradient CTAs and "Most Popular" badge at 2.5:1; "+N more included" emerald-600 at 3.5:1; h2→h4/h5 heading skips; nested card on "Important Note". Buried-raster flags are carousel fade-in false positives.

## Priority Issues
1. [P0] Fabricated rating/popularity — rating={5} hardcoded for every card (page.tsx:209-210, 243-244), "Most Popular" on 2 of 3. Remove rating; Popular only from admin flag. → harden + clarify
2. [P1] Booking hand-off wrong and mute — bottom CTAs book phantom services (page.tsx:281-302); bookServiceViaWhatsApp lacks bilingual greeting, preferred day, online/in-shop; no "opens WhatsApp / no payment / closed Poya" note. → clarify
3. [P1] Mobile dialog hides Book below a hidden-scrollbar fold; per-service note hardcoded and wrong; Save/Share dead. → adapt + harden
4. [P2] First service ~1,500px down; generic hero copy; unused description/badges props. → distill + layout
5. [P2] Card a11y and drift — non-focusable card, h2→h4, 11px stone-400 "Starting at", gradient CTAs at 2.5:1, orphan Nakshatra card, no empty state. → polish + audit

## Persona Red Flags
Casey: 2 screens of stock photos; Book offscreen in mobile dialog; FAB overlaps cards. Riley: test HTML and a GO logo render; NaN price; whole-page error. Jordan: online vs in-person unclear; "Nakshatra Vana" unexplained; prices in CTA don't match cards. Sinhala-first Nakshatra seeker: English everywhere but one hero line; "Nakshastra" typo; note says see a doctor and arrive early; message lacks event/date/birth details.

## Minor Observations
Unused off-palette ServiceLoading; duplicate getIconComponent; "PRICE:" uppercase label; "+3 more included" looks like a link; nav "Book Consult" points to /services itself; Sinhala hero typo "ස්තානයකින්".

## Questions to Consider
- Would a short "what to tell us" composer convert better than three price cards?
- Should consults and Nakshatra share one card design when their trust cues differ?
- Who answers? Put the doctor's name and photo on the consult card.
