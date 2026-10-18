"use client";

import Link from "next/link";
import {
  Bus,
  Car,
  Copy,
  Mail,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Train,
  Truck,
} from "lucide-react";
import { toast } from "sonner";
import { ReusableHeroSection } from "@/components/reusable-hero-section";
import EmbeddedMap from "@/components/embedded-map";
import { OpenStatus } from "@/components/open-status";
import {
  directionsUrl,
  locationInfo,
  pharmacyLocation,
} from "@/config/location";
import { contactViaWhatsApp } from "@/lib/whatsapp";

const pill =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2";

export default function LocationPage() {
  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(pharmacyLocation.address);
      toast.success("Address copied");
    } catch {
      toast.error("Couldn't copy the address", {
        description: pharmacyLocation.address,
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12 md:pt-36">
      <ReusableHeroSection
        preTitle="Find Our Sanctuary"
        titleLine1="Visit Our"
        titleLine2="Wellness Center"
        subtitle={[
          "Over 30 years of trusted Ayurvedic experience and services, now available from us.",
          "වසර 30කට වඩා වැඩි විශ්වාසනීය පලපුරුදු ආයුර්වේද සේවාවන් දැන් අප වෙතින්.",
        ]}
        theme="green"
        compact
      />

      {/* The three jobs, first: is it open, call, get there */}
      <section
        aria-labelledby="visit-heading"
        className="mb-10 rounded-3xl border border-stone-200 bg-white p-5 sm:p-8"
      >
        <h2 id="visit-heading" className="sr-only">
          Opening status and quick actions
        </h2>
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <OpenStatus />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 md:flex md:flex-shrink-0">
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${pill} bg-emerald-600 text-white hover:bg-emerald-700`}
            >
              <Navigation className="h-4 w-4" aria-hidden="true" />
              Directions
              <span className="sr-only">(opens Google Maps)</span>
            </a>
            <a
              href={`tel:${pharmacyLocation.phoneTel}`}
              className={`${pill} border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50`}
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call {pharmacyLocation.phoneDisplay}
            </a>
            <button
              type="button"
              onClick={() => contactViaWhatsApp("Visiting the shop")}
              className={`${pill} border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50`}
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              WhatsApp
            </button>
          </div>
        </div>
      </section>

      {/* Address, hours, contact | map */}
      <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-[2fr_3fr]">
        <div className="space-y-8">
          <section aria-labelledby="address-heading">
            <h2
              id="address-heading"
              className="mb-3 flex items-center gap-2 font-serif text-xl font-semibold text-stone-800"
            >
              <MapPin className="h-5 w-5 text-emerald-700" aria-hidden="true" />
              Address
            </h2>
            <p className="text-lg text-stone-700">{pharmacyLocation.address}</p>
            <button
              type="button"
              onClick={copyAddress}
              className="mt-2 inline-flex min-h-10 items-center gap-2 rounded-md text-sm font-medium text-emerald-800 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
            >
              <Copy className="h-4 w-4" aria-hidden="true" />
              Copy address
            </button>
          </section>

          <section aria-labelledby="hours-heading">
            <h2
              id="hours-heading"
              className="mb-3 font-serif text-xl font-semibold text-stone-800"
            >
              Opening hours
            </h2>
            <dl className="divide-y divide-stone-100">
              {Object.entries(locationInfo.operatingHours).map(
                ([day, hours]) => (
                  <div key={day} className="flex justify-between gap-4 py-2">
                    <dt className="font-medium text-stone-700">{day}</dt>
                    <dd className="text-right text-stone-600">{hours}</dd>
                  </div>
                ),
              )}
            </dl>
            <p className="mt-3 rounded-xl bg-emerald-50 px-3 py-2.5 text-sm font-medium text-emerald-900">
              {locationInfo.emergencyNote}
            </p>
          </section>

          <section aria-labelledby="contact-heading">
            <h2
              id="contact-heading"
              className="mb-3 font-serif text-xl font-semibold text-stone-800"
            >
              Contact
            </h2>
            <ul className="space-y-3 text-stone-700">
              <li className="flex items-start gap-3">
                <Phone
                  className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-700"
                  aria-hidden="true"
                />
                <div className="min-w-0">
                  <a
                    href={`tel:${pharmacyLocation.phoneTel}`}
                    className="font-medium text-stone-800 underline-offset-4 hover:text-emerald-800 hover:underline"
                  >
                    {pharmacyLocation.phoneDisplay}
                  </a>
                  <p className="text-sm text-stone-600">
                    Also for emergencies
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail
                  className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-700"
                  aria-hidden="true"
                />
                <div className="min-w-0 space-y-1">
                  <a
                    href={`mailto:${locationInfo.email.general}`}
                    className="block break-all text-stone-800 underline-offset-4 hover:text-emerald-800 hover:underline"
                  >
                    {locationInfo.email.general}
                  </a>
                  <a
                    href={`mailto:${locationInfo.email.appointments}`}
                    className="block break-all text-stone-800 underline-offset-4 hover:text-emerald-800 hover:underline"
                  >
                    {locationInfo.email.appointments}
                  </a>
                </div>
              </li>
            </ul>
          </section>
        </div>

        <section aria-labelledby="map-heading">
          <h2 id="map-heading" className="sr-only">
            Map
          </h2>
          <div className="overflow-hidden rounded-3xl border border-stone-200 bg-stone-100">
            <EmbeddedMap height="100%" className="h-64 sm:h-80 lg:h-[440px]" />
          </div>
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex min-h-10 items-center gap-2 text-sm font-medium text-emerald-800 underline-offset-4 hover:underline"
          >
            Map not loading? Open in Google Maps
          </a>
        </section>
      </div>

      {/* How to reach us */}
      <section aria-labelledby="reach-heading" className="mb-12">
        <h2
          id="reach-heading"
          className="mb-6 font-serif text-2xl font-bold text-stone-800 sm:text-3xl"
        >
          How to reach us
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-2 flex items-center gap-2 font-serif text-lg font-semibold text-stone-800">
              <Car className="h-5 w-5 text-emerald-700" aria-hidden="true" />
              By car
            </h3>
            <p className="max-w-prose text-sm leading-relaxed text-stone-600">
              Our shop is conveniently located along the Tissamaharama–Matara
              main road. From the Highway: Exit at the Mattala Interchange, then
              continue towards Tissamaharama to reach the Tissa–Matara main
              road. Free parking available on-site.
            </p>
          </div>
          <div>
            <h3 className="mb-2 flex items-center gap-2 font-serif text-lg font-semibold text-stone-800">
              <Bus className="h-5 w-5 text-emerald-700" aria-hidden="true" />
              By bus
            </h3>
            <p className="max-w-prose text-sm leading-relaxed text-stone-600">
              Bus routes 2, 334/1, and 32 stop directly in front of our center.
              The &ldquo;Wellness Center&rdquo; stop is announced on all routes.
            </p>
          </div>
          <div>
            <h3 className="mb-2 flex items-center gap-2 font-serif text-lg font-semibold text-stone-800">
              <Train className="h-5 w-5 text-emerald-700" aria-hidden="true" />
              By train
            </h3>
            <p className="max-w-prose text-sm leading-relaxed text-stone-600">
              Train services are not available in this area.
            </p>
          </div>
        </div>
      </section>

      {/* Can't visit? */}
      <section
        aria-labelledby="delivery-heading"
        className="rounded-3xl bg-emerald-50 px-6 py-10 text-center sm:px-10"
      >
        <Truck
          className="mx-auto mb-3 h-8 w-8 text-emerald-700"
          aria-hidden="true"
        />
        <h2
          id="delivery-heading"
          className="mb-3 font-serif text-2xl font-bold text-stone-800 sm:text-3xl"
        >
          Can&apos;t make it to <span className="italic text-emerald-800">the shop?</span>
        </h2>
        <p className="mx-auto mb-6 max-w-xl text-stone-700">
          Order on WhatsApp and we&apos;ll deliver anywhere in Sri Lanka.
        </p>
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/products"
            className={`${pill} bg-emerald-600 text-white hover:bg-emerald-700`}
          >
            Browse products
          </Link>
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${pill} border-2 border-emerald-600 bg-white text-emerald-700 hover:bg-emerald-50`}
          >
            <Navigation className="h-4 w-4" aria-hidden="true" />
            Get directions
            <span className="sr-only">(opens Google Maps)</span>
          </a>
        </div>
      </section>
    </div>
  );
}
