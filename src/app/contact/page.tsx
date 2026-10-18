"use client";

import type React from "react";

import { useEffect, useId, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Phone,
  Smartphone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  MessageCircle,
  Stethoscope,
  Users,
} from "lucide-react";
import {
  askDoctorViaWhatsApp,
  emergencyConsultationViaWhatsApp,
  submitContactFormViaWhatsApp,
} from "@/lib/whatsapp";
import { ReusableHeroSection } from "@/components/reusable-hero-section";
import { WhatsAppHandoffNote } from "@/components/whatsapp-handoff-note";
import { OpenStatus } from "@/components/open-status";
import { ContactPageInfoData } from "@/types/contact-info";
import { Faq } from "@/types/faq";
import {
  hasVisibleRichTextContent,
  sanitizeRichText,
} from "@/lib/rich-text";

const TOPIC_OPTIONS = [
  { value: "ayurvedic-consultation", label: "Ayurvedic consultation" },
  { value: "online-consultation", label: "Online consultation" },
  { value: "nakshatra-services", label: "Nakshatra services" },
  { value: "product-inquiry", label: "A product" },
  { value: "general-inquiry", label: "Something else" },
] as const;

const RICH_TEXT =
  "max-w-prose text-stone-600 text-sm sm:text-base leading-relaxed space-y-3 [&_h2]:text-lg [&_h2]:sm:text-xl [&_h2]:font-serif [&_h2]:font-semibold [&_h2]:text-stone-800 [&_h2]:mb-2 [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-3 [&_li]:mb-1 [&_blockquote]:border-l-4 [&_blockquote]:border-emerald-400 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-stone-700";

const FIELD = "h-11 border-stone-200 bg-white placeholder:text-stone-400";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    topic: "",
    message: "",
  });
  const [contactInfo, setContactInfo] = useState<ContactPageInfoData | null>(
    null,
  );
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const topicLabelId = useId();

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const [infoRes, faqRes] = await Promise.all([
          fetch("/api/contact-info"),
          fetch("/api/faqs"),
        ]);
        if (infoRes.ok) setContactInfo(await infoRes.json());
        if (faqRes.ok) {
          const faqData = await faqRes.json();
          if (Array.isArray(faqData)) setFaqs(faqData);
        }
      } catch (error) {
        // The form and contact details still work without this content.
        console.error("Error loading contact page data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPageData();
  }, []);

  const safeDoctorHtml = useMemo(
    () => sanitizeRichText(contactInfo?.doctorDescription),
    [contactInfo?.doctorDescription],
  );
  const hasDoctorDescription = hasVisibleRichTextContent(safeDoctorHtml);
  const showDoctorSection = Boolean(
    contactInfo?.doctorImage ||
      hasDoctorDescription ||
      contactInfo?.doctorName?.trim(),
  );

  const safeTeamHtml = useMemo(
    () => sanitizeRichText(contactInfo?.teamDescription),
    [contactInfo?.teamDescription],
  );
  const hasTeamDescription = hasVisibleRichTextContent(safeTeamHtml);
  const showTeamSection = Boolean(
    contactInfo?.teamImage ||
      hasTeamDescription ||
      contactInfo?.teamTitle?.trim(),
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitContactFormViaWhatsApp({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      topic: TOPIC_OPTIONS.find((o) => o.value === formData.topic)?.label,
      message: formData.message,
    });
  };

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const doctorName = contactInfo?.doctorName?.trim();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12 md:pt-36">
      <ReusableHeroSection
        preTitle="Connect With Us"
        titleLine1="Get in Touch"
        titleLine2="With Our Team"
        subtitle="We're here to help you on your wellness journey"
        theme="green"
        compact
      />

      {/* Doctor: the person most visitors want to reach */}
      {isLoading ? (
        <div
          className="mb-12 h-[380px] rounded-3xl bg-stone-100 animate-pulse"
          aria-hidden="true"
        />
      ) : (
        showDoctorSection && (
          <section
            aria-labelledby="doctor-heading"
            className="mb-12 sm:mb-16 overflow-hidden rounded-3xl border border-stone-200 bg-white"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
              {contactInfo?.doctorImage && (
                <div className="md:col-span-5 lg:col-span-4 relative w-full h-80 sm:h-96 md:h-auto md:min-h-[380px] bg-stone-100">
                  <Image
                    src={contactInfo.doctorImage}
                    alt={doctorName || "Our Ayurvedic physician"}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 42vw, 33vw"
                    className="object-cover object-top"
                  />
                </div>
              )}

              <div
                className={`${
                  contactInfo?.doctorImage
                    ? "md:col-span-7 lg:col-span-8"
                    : "md:col-span-12"
                } p-6 sm:p-8 lg:p-10 flex flex-col justify-center`}
              >
                <p className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 px-3.5 py-1.5 rounded-full w-fit mb-4">
                  <Stethoscope className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                  <span className="text-xs font-semibold uppercase tracking-wider">
                    {contactInfo?.doctorSpecialty?.trim() || "Ayurvedic Physician"}
                  </span>
                </p>

                <h2
                  id="doctor-heading"
                  className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-800 mb-4 leading-tight"
                >
                  {doctorName || (
                    <>
                      Meet Our{" "}
                      <span className="text-emerald-700 italic">
                        Ayurvedic Doctor
                      </span>
                    </>
                  )}
                </h2>

                {hasDoctorDescription && (
                  <div
                    className={RICH_TEXT}
                    dangerouslySetInnerHTML={{ __html: safeDoctorHtml }}
                  />
                )}

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Button
                    onClick={() => askDoctorViaWhatsApp(doctorName)}
                    className="min-h-12 rounded-full bg-emerald-600 px-6 text-white hover:bg-emerald-700"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" aria-hidden="true" />
                    Ask {doctorName || "the doctor"} on WhatsApp
                  </Button>
                  <Link
                    href="/services#ayurvedic"
                    className="inline-flex min-h-10 items-center text-sm font-medium text-emerald-800 underline-offset-4 hover:underline"
                  >
                    See consultations
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )
      )}

      {/* Message form + contact details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-16">
        <section aria-labelledby="form-heading" className="lg:col-span-2">
          <h2
            id="form-heading"
            className="mb-2 text-2xl sm:text-3xl font-serif font-bold text-stone-800"
          >
            Send us a message
          </h2>
          <p className="mb-6 text-stone-600">
            Your message opens in WhatsApp, ready to send.
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-3xl border border-stone-200 bg-white p-5 sm:p-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-stone-700">
                  Your name
                </Label>
                <Input
                  id="name"
                  autoComplete="name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  required
                  className={FIELD}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-stone-700">
                  Phone <span className="text-stone-500">(optional)</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className={FIELD}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-stone-700">
                  Email <span className="text-stone-500">(optional)</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className={FIELD}
                />
              </div>
              <div className="space-y-2">
                <Label id={topicLabelId} className="text-stone-700">
                  What is it about?{" "}
                  <span className="text-stone-500">(optional)</span>
                </Label>
                <Select
                  value={formData.topic}
                  onValueChange={(value) => handleChange("topic", value)}
                >
                  <SelectTrigger
                    aria-labelledby={topicLabelId}
                    className="h-11 border-stone-200 bg-white"
                  >
                    <SelectValue placeholder="Choose a topic" />
                  </SelectTrigger>
                  <SelectContent>
                    {TOPIC_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-stone-700">
                Your message
              </Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleChange("message", e.target.value)}
                placeholder="Tell us what you need, e.g. a remedy you're looking for or a question for the doctor"
                rows={5}
                required
                className="border-stone-200 bg-white placeholder:text-stone-400"
              />
            </div>

            <WhatsAppHandoffNote kind="message" />

            <Button
              type="submit"
              className="w-full sm:w-auto min-h-12 rounded-full bg-emerald-600 px-8 text-white hover:bg-emerald-700"
            >
              <MessageCircle className="mr-2 h-4 w-4" aria-hidden="true" />
              Send on WhatsApp
            </Button>
          </form>
        </section>

        {/* Contact details */}
        <aside aria-labelledby="details-heading" className="space-y-8">
          <h2 id="details-heading" className="sr-only">
            Contact details
          </h2>

          <OpenStatus />

          <ul className="space-y-4">
            <li>
              <a
                href="tel:+94760575304"
                className="flex items-center gap-3 group min-h-11"
              >
                <Smartphone className="h-5 w-5 text-emerald-700 flex-shrink-0" aria-hidden="true" />
                <span>
                  <span className="block text-sm text-stone-600">Mobile</span>
                  <span className="font-medium text-stone-800 group-hover:text-emerald-800">
                    +94 76 057 5304
                  </span>
                </span>
              </a>
            </li>
            <li>
              <a
                href="tel:+94473477938"
                className="flex items-center gap-3 group min-h-11"
              >
                <Phone className="h-5 w-5 text-emerald-700 flex-shrink-0" aria-hidden="true" />
                <span>
                  <span className="block text-sm text-stone-600">Shop</span>
                  <span className="font-medium text-stone-800 group-hover:text-emerald-800">
                    047 347 7938
                  </span>
                </span>
              </a>
            </li>
            <li>
              <a
                href="mailto:rathnadeepaherbal@gmail.com"
                className="flex items-center gap-3 group min-h-11"
              >
                <Mail className="h-5 w-5 text-emerald-700 flex-shrink-0" aria-hidden="true" />
                <span className="min-w-0">
                  <span className="block text-sm text-stone-600">Email</span>
                  <span className="font-medium text-stone-800 break-all group-hover:text-emerald-800">
                    rathnadeepaherbal@gmail.com
                  </span>
                </span>
              </a>
            </li>
            <li>
              <Link
                href="/location"
                className="flex items-center gap-3 group min-h-11"
              >
                <MapPin className="h-5 w-5 text-emerald-700 flex-shrink-0" aria-hidden="true" />
                <span>
                  <span className="block text-sm text-stone-600">Visit the shop</span>
                  <span className="font-medium text-stone-800 group-hover:text-emerald-800">
                    Hambantota Rd, Tissamaharama
                  </span>
                </span>
              </Link>
            </li>
          </ul>

          <div>
            <h3 className="mb-3 font-serif text-lg font-semibold text-stone-800">
              Follow us
            </h3>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://www.facebook.com/share/17qai7aUM5/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-stone-200 bg-white px-4 text-sm font-medium text-stone-700 hover:border-emerald-400 hover:text-emerald-800"
              >
                <Facebook className="h-4 w-4" aria-hidden="true" />
                Facebook
              </a>
              <a
                href="https://www.instagram.com/rathnadeepa_herbals/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-stone-200 bg-white px-4 text-sm font-medium text-stone-700 hover:border-emerald-400 hover:text-emerald-800"
              >
                <Instagram className="h-4 w-4" aria-hidden="true" />
                Instagram
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5">
            <h3 className="mb-2 font-serif text-lg font-semibold text-stone-800">
              Emergency Consultation
            </h3>
            <p className="mb-4 text-sm leading-relaxed text-stone-600">
              Need urgent Ayurvedic advice? Our emergency consultation service
              is available 24/7 for critical wellness concerns.
            </p>
            <Button
              variant="outline"
              className="w-full min-h-11 rounded-full border-2 border-stone-300 font-semibold text-stone-800 hover:bg-white"
              onClick={emergencyConsultationViaWhatsApp}
            >
              <Phone className="mr-2 h-4 w-4" aria-hidden="true" />
              Emergency Contact
            </Button>
          </div>
        </aside>
      </div>

      {/* Team */}
      {showTeamSection && (
        <section
          aria-labelledby="team-heading"
          className="mb-16 overflow-hidden rounded-3xl border border-stone-200 bg-white"
        >
          {contactInfo?.teamImage && (
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/9] bg-stone-100">
              <Image
                src={contactInfo.teamImage}
                alt={contactInfo.teamTitle || "Our pharmacy team"}
                fill
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover object-center"
              />
            </div>
          )}
          <div className="p-6 sm:p-8 lg:p-10">
            <p className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 px-3.5 py-1.5 rounded-full w-fit mb-4">
              <Users className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
              <span className="text-xs font-semibold uppercase tracking-wider">
                Our Wellness Team
              </span>
            </p>
            <h2
              id="team-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-800 mb-4 leading-tight"
            >
              {contactInfo?.teamTitle?.trim() || (
                <>
                  Dedicated to Your{" "}
                  <span className="text-emerald-700 italic">Natural Healing</span>
                </>
              )}
            </h2>
            {hasTeamDescription && (
              <div
                className={RICH_TEXT}
                dangerouslySetInnerHTML={{ __html: safeTeamHtml }}
              />
            )}
          </div>
        </section>
      )}

      {/* FAQs */}
      {faqs.length > 0 && (
        <section aria-labelledby="faq-heading">
          <h2
            id="faq-heading"
            className="mb-6 text-2xl sm:text-3xl font-serif font-bold text-stone-800"
          >
            Frequently asked questions
          </h2>
          <dl className="grid grid-cols-1 gap-x-10 md:grid-cols-2">
            {faqs.map((faq) => (
              <div key={faq.id} className="border-t border-stone-200 py-5">
                <dt className="mb-2 font-serif text-lg font-semibold text-stone-800">
                  {faq.question}
                </dt>
                <dd className="max-w-prose whitespace-pre-line text-stone-600">
                  {faq.answer}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      )}
    </div>
  );
}
