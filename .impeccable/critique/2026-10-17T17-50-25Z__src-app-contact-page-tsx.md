---
target: /contact
total_score: 16
max_score: 40
na_heuristics: 
p0_count: 1
p1_count: 2
target_identity: "file:D:\\Github\\ayurvedic-pharmacy\\src\\app\\contact\\page.tsx"
target_fingerprint: "sha256:76a2996784e0caa3d639aae4ed1ba5fe4656bf2ddbc352f520bd40b79ea21579"
target_path: "D:\\Github\\ayurvedic-pharmacy\\src\\app\\contact\\page.tsx"
timestamp: 2026-10-17T17-50-25Z
slug: src-app-contact-page-tsx
---
Method: dual-agent (A: design review · B: detector + browser)

## Design Health Score
| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 1 | "Send Message" silently opens WhatsApp; nothing on popup block |
| 2 | Match System / Real World | 2 | Email-form framing for a WhatsApp send; no Sinhala |
| 3 | User Control and Freedom | 2 | No preview; two buttons send different messages |
| 4 | Consistency and Standards | 1 | 6px buttons vs pills; asterisks vs "(optional)"; red emergency button; 4 WhatsApp entry points |
| 5 | Error Prevention | 1 | Email required though never used; no type=tel/autocomplete; side button skips validation |
| 6 | Recognition Rather Than Recall | 2 | "Social Media" row links nowhere |
| 7 | Flexibility and Efficiency | 2 | Form at 2390px desktop / 2740px mobile, no shortcut |
| 8 | Aesthetic and Minimalist Design | 2 | Five bordered cards with header bands; dead gap under form |
| 9 | Error Recovery | 1 | Native bubble only; focused field hidden under fixed header; fetch failures swallowed |
| 10 | Help and Documentation | 2 | Good CMS FAQs, but at the very bottom |
| **Total** | | **16/40** | **Poor** |

## Design Specificity Verdict
LLM: stock shadcn contact template; the doctor card is the one authored section, yet has no action. No Sinhala on the page.
Deterministic: CLI 2 (blockquote exceptions). Overlay: REAL rich-text line length 89–112 chars (x9); nested cards (form, info, FAQ). Heading order fine.

## Priority Issues
1. [P0] Unverified and placeholder content as fact — "available 24/7 for critical wellness concerns" + red Emergency button (page.tsx:568-579), contradicted by 8–7/Poya hours; CMS "Best Team" with a festival-panel photo, "Dr. Rathnadeepa" specialty "Master"; "100% natural" FAQ. Remove 24/7; point real emergencies to 1990/hospital; flag CMS content to owner. → clarify, then harden
2. [P1] Form misrepresents itself and breaks on mobile — "Send Message" opens WhatsApp unannounced; buttons collapse to 20–22px tall at 375px (flex-1 in flex-col); required email; duplicate thinner WhatsApp button. One "Send on WhatsApp" pill, email optional, bilingual note. → harden + adapt
3. [P1] Doctor has no consult action — add "Ask the doctor on WhatsApp" on the card. → shape → layout
4. [P2] Action buried, header covers focused fields — reorder doctor+CTA → form+info → FAQ; compact hero; scroll-padding-top. → layout + distill
5. [P2] A11y gaps — Service label points at nothing (unnamed combobox), card titles are divs, TikTok/Threads href="#" target=_blank, placeholders same colour as ink, decorative image with alt. → audit → polish

## Persona Red Flags
Jordan: can't tell email vs WhatsApp; Subject vs Service Interest. Sam: unnamed combobox; no form/FAQ headings; focus under header; dead # links open tabs. Casey: 20px submit buttons; form 4 screens down. Worried Sinhala-first parent: no Sinhala, no ask-the-doctor, forced email, a red 24/7 button that could be relied on in a real emergency.

## Minor Observations
Hours and phones hardcoded (Principle 5); inconsistent phone formats; ignored hero props; static cards lift on hover; "Meet us in our stores" (one shop); doctor/FAQ sections pop in with ~1,700px layout jump; contact message lacks the bilingual greeting.

## Questions to Consider
- Should /contact have a form at all, or three WhatsApp intents?
- Should the doctor be the page headline?
- Who answers "24/7 emergency" at 2 AM on Poya?
