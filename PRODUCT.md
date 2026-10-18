# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Three audiences of roughly equal weight. No single group dominates:

- **Local repeat buyers** in and around Tissamaharama and the Southern Province who already know the shop. They check products and prices, then order over WhatsApp.
- **Island-wide buyers** who find the pharmacy online and order remedies for delivery anywhere in Sri Lanka.
- **Consultation and service seekers** who want to book an Ayurvedic doctor or a service such as a Nakshatra consultation.

A fourth, internal user is the **shop admin**. They maintain products, partner companies, categories, services, contact/team/doctor info, and FAQs through `/admin`.

## Product Purpose

Rathnadeepa Herbals (Rathnadeepa Ayurvedic Pharmacy) runs its online storefront and service front desk here. Visitors browse authentic Ayurvedic products and services. They add items to a cart and send the order or booking to the pharmacy as a WhatsApp message. The site does not take payment online. Success means a visitor quickly finds the right remedy or service, trusts the shop, and starts a WhatsApp conversation.

## Positioning

Four things together, which a neighboring shop could not all claim truthfully:

- a **family, generational practice** of Ayurvedic knowledge;
- **its own herbal formulations** alongside resale;
- a **multi-brand stockist** of certified manufacturers' products in one place (the Companies section);
- **in-house Ayurvedic doctors** who consult on site.

## Operating Context

- Physical shop: Rathnadeepa osu hala, Hambantota Rd, Tissamaharama, Sri Lanka (map coordinates in `src/config/location.ts`).
- Ordering and booking go through a cart (stored in localStorage), then a prefilled WhatsApp message (`src/config/whatsapp.ts`, `src/lib/whatsapp.ts`). There is no checkout or payment gateway.
- Orders are fulfilled by island-wide delivery across Sri Lanka.
- Prices are in Sri Lankan rupees, formatted "Rs." (`src/config/currency.ts`). Products can have several price variants.
- Opening hours: every day 8:00 AM to 7:00 PM, closed on Poya days.
- Content is managed by admins through a CMS with rich text (TipTap) and Cloudinary image uploads, plus a CSV bulk product import.

## Capabilities and Constraints

- Next.js 15 App Router, React 19, TypeScript, Tailwind, Radix/shadcn UI, Prisma on MongoDB, Better Auth (admin-only sign-in), Cloudinary.
- Public routes: home, products, companies, services, contact, location, reviews, blog.
- Admin routes: dashboard, products, companies, services, categories/subcategories, contact page (team, doctors), FAQs.
- **Language:** English and Sinhala both matter. Key messages should appear in Sinhala as well, as the bilingual hero does now. A full site-wide language toggle is not committed.
- **Unconfirmed data in config:** `whatsapp.ts` uses the business name "AyurVeda Pharmacy" and `location.ts` lists `@ayurvedapharmacy.com` emails, while the homepage uses `rathnadeepaherbal@gmail.com`. `location.ts` also lists facilities and claims ("24/7 Emergency", "Meditation Hall", "Wheelchair Accessible", "Free Parking"). Treat all of these as unverified until the owner confirms them.

## Brand Commitments

- Name: **Rathnadeepa Herbals** / Rathnadeepa Ayurvedic Pharmacy. Logo at `src/assets/logo.png`.
- Voice: traditional, trustworthy, rooted in generational knowledge ("Ancient Wisdom, Modern Healing"). Products are described as certified and authentic.
- Bilingual English/Sinhala presence is part of the identity.

## Evidence on Hand

- Real: the product and service catalog in the database, partner companies, team and doctor profiles, and FAQs (all admin-managed); shop photography in `src/assets/hero-*.{jpg,png}`, `src/assets/products/`, `src/assets/services/`; address, phone, hours, and map location.
- **Placeholder, never use as evidence:** the testimonials on `/reviews` and in the testimonials preview (invented names, US locations, invented doctors) and the blog posts in `blog-preview.tsx` / `/blog`. Do not quote them, build on them, or invent replacements. No real reviews, ratings, case studies, certifications documents, or press are on hand.

## Product Principles

1. **WhatsApp is the till.** Every path ends in a clear, well-formed WhatsApp message. Don't add flows that imply online payment or checkout.
2. **Trust is earned with real facts.** Show the lineage, the in-house doctors, the partner brands, and the physical shop. Never show fabricated reviews, credentials, or claims.
3. **Serve both shelves equally.** Products and services/consultations get equal standing in navigation and on the homepage.
4. **Speak to Sri Lanka in both languages.** Put Sinhala on key messages, use rupee prices, and respect local rhythms such as Poya closures.
5. **Admins keep it alive.** Customer-facing content should come from the CMS, not hardcoded copy, so the shop can update it without a developer.

## Accessibility & Inclusion

Sinhala script has to render legibly at body sizes, with fonts that support it. No other product-specific standard has been set.
