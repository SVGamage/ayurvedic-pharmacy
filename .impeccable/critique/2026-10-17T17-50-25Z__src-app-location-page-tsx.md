---
target: /location
total_score: 13
max_score: 40
na_heuristics: 
p0_count: 1
p1_count: 2
target_identity: "file:D:\\Github\\ayurvedic-pharmacy\\src\\app\\location\\page.tsx"
target_fingerprint: "sha256:04b06fc00c02a397bd8d0dc64a6f7e2cf9051765d043d33adc1359a9668e8b5a"
target_path: "D:\\Github\\ayurvedic-pharmacy\\src\\app\\location\\page.tsx"
timestamp: 2026-10-17T17-50-25Z
slug: src-app-location-page-tsx
---
Method: dual-agent (A: design review · B: detector + browser)

## Design Health Score
| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 1 | No "Open now / Closed today (Poya)" despite known hours; map has no load/fail state |
| 2 | Match System / Real World | 1 | "Wellness Center", "heart of the city", invented bus stop, 24/7 emergency |
| 3 | User Control and Freedom | 2 | "Get Directions" opens a Maps embed URL via window.open, not directions |
| 4 | Consistency and Standards | 1 | Unverified emails vs footer gmail; two phone formats; outline serif CTA |
| 5 | Error Prevention | 1 | "Emergency consultations available 24/7" at a shop closing 7 PM and on Poya |
| 6 | Recognition Rather Than Recall | 2 | Phone and email are plain text, not tel:/mailto: |
| 7 | Flexibility and Efficiency | 1 | No tap-to-call, no in-page WhatsApp, no Maps-app deep link |
| 8 | Aesthetic and Minimalist Design | 2 | Calm but padded: eyebrows, blobs, "By Train: not available" |
| 9 | Error Recovery | 0 | No fallback if the map fails; every route depends on Google |
| 10 | Help and Documentation | 2 | Useful car directions; bus info likely invented; no landmark |
| **Total** | | **13/40** | **Poor** |

## Design Specificity Verdict
LLM: "Find Our Sanctuary / Wellness Center" template; three equal cards, transport grid, CTA with blobs. Nothing of a roadside osu hala on Hambantota Rd; no shop photo or landmark.
Deterministic: CLI clean. Overlay: REAL nested cards (x9); heading skips h1→h3, h2.

## Priority Issues
1. [P0] Unverified claims as fact — 24/7 emergency note and "(Emergency)" phone (page.tsx:68,110), free parking (:147), ayurvedapharmacy.com emails (:79-81), bus routes and "Wellness Center" stop (:162-164), "heart of the city" (:22). → clarify, then harden
2. [P1] Primary jobs have no direct actions — no tel:, no WhatsApp in body, Directions is an embed URL in a button, no open/closed status. Add status + Call / WhatsApp / Directions pills. → layout + onboard
3. [P1] Order and hierarchy — mobile: map 635, address 1190, hours 1584, CTA 3058 of 4147px. Status/actions → address → hours → shorter map → how to reach; compact hero. → adapt + distill
4. [P2] A11y and robustness — map iframe untitled, card titles not headings, alternating-language subtitle hidden, no map fallback, email overflows at 375px. → audit + harden
5. [P3] Drift from /products standard — outline serif CTA, hover on non-interactive tiles, blobs, no bilingual notes. → polish + quieter

## Persona Red Flags
Casey: can't tap the number; directions open an embed; CTA ~3000px down; sideways scroll. Jordan: no landmark or shop photo; misleading bus stop. Sam: untitled iframe; no headings; directions button opens a window unannounced. Older local checking Poya: no "today" indicator; English only; 24/7 box contradicts closure.

## Minor Observations
Phone listed twice; "Rathndeepa"/"Aurvedic" typos in config; unused facilities list of unverified claims; page is client-only for one onClick; island-wide delivery not mentioned.

## Questions to Consider
- Why isn't address, hours or phone on the first screen?
- What does the Sinhala signboard actually say?
- What happens to someone who trusts "24/7" at 10 PM on a Poya day?
