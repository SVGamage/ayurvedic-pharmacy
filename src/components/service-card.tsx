"use client";

import { useId, useMemo, useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CheckCircle,
  Clock,
  Star,
  MessageCircle,
  Share2,
  Info,
  Sparkles,
  Leaf,
} from "lucide-react";
import * as Icons from "lucide-react";
import { toast } from "sonner";
import { Service } from "@/types/service";
import { cn } from "@/lib/utils";
import { bookServiceViaWhatsApp } from "@/lib/whatsapp";
import {
  getRichTextPreview,
  hasVisibleRichTextContent,
  sanitizeRichText,
} from "@/lib/rich-text";
import { WhatsAppHandoffNote } from "@/components/whatsapp-handoff-note";

// Resolve icon from string name (used when service data comes from the API/DB)
export const getServiceIcon = (iconName?: string) => {
  if (!iconName) return Icons.Star;

  const IconComponent = (Icons as unknown as Record<string, typeof Icons.Star>)[
    iconName
  ];
  return IconComponent || Icons.Star;
};

// What to bring or prepare, by kind of service.
const PREP_NOTES = {
  ayurvedic:
    "Tell us your main health concern when you book, so the doctor can prepare for your consultation.",
  nakshatra:
    "For a reading, have the date, time and place of birth ready for each person involved.",
} as const;

interface ServiceCardProps {
  service: Service;
  variant?: "default" | "compact" | "featured";
  className?: string;
  showRating?: boolean;
  rating?: number;
  /** Open the details dialog on mount (used for ?service= deep links). */
  defaultOpen?: boolean;
  onDialogClose?: () => void;
}

export function ServiceCard({
  service,
  variant = "default",
  className,
  showRating = false,
  rating = 0,
  defaultOpen = false,
  onDialogClose,
}: ServiceCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(defaultOpen);
  const [preferredTime, setPreferredTime] = useState("");
  const timeFieldId = useId();
  const isFeatured = variant === "featured";
  const isNakshatra = service.category === "nakshatra";
  const safeDescriptionHtml = useMemo(
    () => sanitizeRichText(service.description),
    [service.description],
  );
  const hasDescription = hasVisibleRichTextContent(safeDescriptionHtml);
  const previewDescription = useMemo(
    () => getRichTextPreview(service.description, 120, "...."),
    [service.description],
  );

  const IconComponent = service.icon || getServiceIcon(service.iconName);

  const book = (withTime: boolean) =>
    bookServiceViaWhatsApp(service.title, service.price, service.duration, {
      preferredTime: withTime ? preferredTime : undefined,
      isNakshatra,
    });

  const handleShare = async () => {
    const url = service.id
      ? `${window.location.origin}/services?service=${service.id}`
      : `${window.location.origin}/services`;
    if (navigator.share) {
      try {
        await navigator.share({ title: service.title, url });
      } catch {
        // Share sheet dismissed.
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied", { description: service.title });
    } catch {
      toast.error("Couldn't copy the link", { description: url });
    }
  };

  const handleDialogChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) onDialogClose?.();
  };

  const categoryLabel =
    service.category === "ayurvedic"
      ? "Ayurvedic"
      : service.category === "nakshatra"
        ? "Nakshatra"
        : "Wellness";

  const focusRing =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2";

  return (
    <>
      <div
        className={cn(
          "group relative cursor-pointer h-full",
          isFeatured ? "lg:col-span-2" : "",
          className,
        )}
        onClick={() => setIsDialogOpen(true)}
      >
        <div className="relative h-full flex flex-col bg-white rounded-3xl overflow-hidden transition-all duration-500 ease-out hover:-translate-y-2 border border-stone-200/70 hover:border-emerald-200 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_40px_-12px_rgba(16,185,129,0.15),0_8px_20px_-8px_rgba(0,0,0,0.08)]">
          {/* Image / icon */}
          <div className="relative h-52 overflow-hidden bg-stone-100 flex items-center justify-center">
            {service.image ? (
              <Image
                src={service.image}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            ) : (
              IconComponent && (
                <div className="rounded-3xl bg-white p-6 shadow-sm border border-stone-100">
                  <IconComponent
                    className="h-14 w-14 text-emerald-700"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </div>
              )
            )}

            {service.popular && (
              <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 bg-emerald-700 text-white px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide">
                <Sparkles className="w-3 h-3" aria-hidden="true" />
                Most Popular
              </div>
            )}

            {service.duration && (
              <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 rounded-2xl bg-white/95 px-3 py-2 shadow-sm">
                <Clock className="w-3.5 h-3.5 text-stone-600" aria-hidden="true" />
                <span className="text-sm font-semibold text-stone-700">
                  {service.duration}
                </span>
              </div>
            )}

            {showRating && rating > 0 && (
              <div className="absolute bottom-4 left-4 z-10 flex items-center gap-1.5 bg-white/95 px-3 py-1.5 rounded-full shadow-sm">
                <Star
                  className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                  aria-hidden="true"
                />
                <span className="text-sm font-semibold text-stone-700">
                  <span className="sr-only">Rated </span>
                  {rating.toFixed(1)}
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="relative flex flex-1 flex-col p-5 pt-4">
            <div className="flex items-center gap-1.5 text-emerald-700 mb-3">
              <Leaf className="w-3 h-3" aria-hidden="true" />
              <span className="text-[11px] font-semibold uppercase tracking-wider">
                {categoryLabel}
              </span>
            </div>

            <h3 className="mb-3">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDialogOpen(true);
                }}
                className={cn(
                  "text-left font-serif text-xl font-semibold text-stone-800 tracking-tight line-clamp-2 leading-snug group-hover:text-emerald-700 transition-colors duration-300 rounded",
                  focusRing,
                )}
              >
                {service.title}
              </button>
            </h3>

            {hasDescription && (
              <p className="text-sm text-stone-600 mb-4 leading-relaxed">
                {previewDescription}
              </p>
            )}

            {service.features && service.features.length > 0 && (
              <ul className="space-y-2 mb-4">
                {service.features.slice(0, 2).map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-sm text-stone-600"
                  >
                    <CheckCircle
                      className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-700"
                      aria-hidden="true"
                    />
                    <span className="line-clamp-1">{feature}</span>
                  </li>
                ))}
                {service.features.length > 2 && (
                  <li className="text-xs text-stone-600 pl-6">
                    and {service.features.length - 2} more
                  </li>
                )}
              </ul>
            )}

            <div className="mt-auto pt-4 border-t border-stone-100">
              <p className="mb-4 text-2xl font-bold text-stone-800 tracking-tight tabular-nums">
                {service.price}
              </p>
              <button
                type="button"
                className={cn(
                  "w-full min-h-12 flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-sm font-semibold transition-colors",
                  focusRing,
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  book(false);
                }}
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                Book on WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Service details */}
      <Dialog open={isDialogOpen} onOpenChange={handleDialogChange}>
        <DialogContent className="w-[95vw] max-w-3xl h-[88dvh] sm:h-auto sm:max-h-[88vh] bg-white border-0 p-0 gap-0 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden">
          <div className="flex h-full flex-col md:grid md:grid-cols-[2fr_3fr] md:h-auto md:max-h-[88vh] overflow-hidden">
            {/* Visual */}
            <div className="relative h-[150px] sm:h-[200px] md:h-auto md:min-h-[420px] flex-shrink-0 bg-stone-100 flex items-center justify-center">
              {service.image ? (
                <Image
                  src={service.image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 95vw, 320px"
                  className="object-cover"
                />
              ) : (
                IconComponent && (
                  <IconComponent
                    className="h-14 w-14 text-emerald-700"
                    strokeWidth={1.25}
                    aria-hidden="true"
                  />
                )
              )}
            </div>

            {/* Details: scroll area with a pinned booking footer */}
            <div className="flex min-h-0 flex-1 flex-col md:max-h-[88vh]">
              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-5 sm:p-6 md:p-8">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-emerald-800">
                    <Leaf className="h-3 w-3" aria-hidden="true" />
                    {categoryLabel}
                  </span>
                  {service.popular && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-700 px-3 py-1 text-[11px] font-semibold text-white">
                      <Sparkles className="h-3 w-3" aria-hidden="true" />
                      Popular
                    </span>
                  )}
                </div>

                <DialogTitle className="font-serif text-2xl sm:text-3xl font-semibold text-stone-800 leading-tight">
                  {service.title}
                </DialogTitle>

                <div className="mt-3 mb-6 flex flex-wrap items-center gap-x-4 gap-y-2">
                  {service.duration && (
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-stone-700">
                      <Clock className="h-4 w-4 text-stone-500" aria-hidden="true" />
                      {service.duration}
                    </span>
                  )}
                  <span className="text-xl font-bold text-stone-800 tabular-nums">
                    {service.price}
                  </span>
                </div>

                <section className="mb-5">
                  <h3 className="mb-2 font-serif text-base font-semibold text-stone-800">
                    About this service
                  </h3>
                  {hasDescription ? (
                    <div
                      className="max-w-prose text-sm leading-relaxed text-stone-600 [&_h2]:text-base [&_h2]:font-semibold [&_h2]:text-stone-800 [&_h2]:mb-2 [&_p]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-2 [&_li]:mb-1 [&_blockquote]:border-l-4 [&_blockquote]:border-emerald-300 [&_blockquote]:pl-3 [&_blockquote]:italic"
                      dangerouslySetInnerHTML={{ __html: safeDescriptionHtml }}
                    />
                  ) : (
                    <p className="text-sm italic text-stone-600">
                      We&apos;ll share the details when you book.
                    </p>
                  )}
                </section>

                {service.features.length > 0 && (
                  <section className="mb-5">
                    <h3 className="mb-2 font-serif text-base font-semibold text-stone-800">
                      What&apos;s included
                    </h3>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 text-sm leading-relaxed text-stone-600"
                        >
                          <CheckCircle
                            className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-700"
                            aria-hidden="true"
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                <p className="mb-5 flex gap-2.5 text-sm leading-relaxed text-stone-700">
                  <Info
                    className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-700"
                    aria-hidden="true"
                  />
                  {PREP_NOTES[isNakshatra ? "nakshatra" : "ayurvedic"]}
                </p>

                <div className="space-y-1.5">
                  <Label htmlFor={timeFieldId} className="text-sm text-stone-700">
                    Preferred day or time{" "}
                    <span className="text-stone-500">(optional)</span>
                  </Label>
                  <Input
                    id={timeFieldId}
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    placeholder="e.g. Saturday morning"
                    className="h-11 bg-white placeholder:text-stone-400"
                  />
                </div>

                <WhatsAppHandoffNote kind="booking" className="mt-5 sm:hidden" />
              </div>

              {/* Pinned booking footer: always visible, even on short phones */}
              <div className="flex-shrink-0 space-y-3 border-t border-stone-100 bg-white p-4 sm:px-6 md:px-8 pb-[calc(1rem+env(safe-area-inset-bottom))]">
                <WhatsAppHandoffNote kind="booking" className="hidden sm:block" />
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => book(true)}
                    className={cn(
                      "flex-1 min-h-12 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 text-sm sm:text-base font-semibold text-white transition-colors hover:bg-emerald-700",
                      focusRing,
                    )}
                  >
                    <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                    Book on WhatsApp
                  </button>
                  <button
                    type="button"
                    onClick={handleShare}
                    aria-label={`Share ${service.title}`}
                    className={cn(
                      "inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-stone-200 text-stone-600 transition-colors hover:border-emerald-400 hover:text-emerald-800",
                      focusRing,
                    )}
                  >
                    <Share2 className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
