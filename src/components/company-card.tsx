"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { MessageCircle, Building2, MapPin, Mail, Phone } from "lucide-react";
import { Company } from "@/types/company";
import { contactCompanyViaWhatsApp } from "@/lib/whatsapp";

interface CompanyCardProps {
  company: Company;
}

export function CompanyCard({ company }: CompanyCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCardClick = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = (open: boolean) => {
    setIsDialogOpen(open);
  };

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    contactCompanyViaWhatsApp(company.name, company.phone);
  };

  return (
    <>
      <div className="group relative cursor-pointer" onClick={handleCardClick}>
        <div className="relative bg-gradient-to-b from-white to-stone-50/80 rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-500 ease-out hover:-translate-y-2 border border-stone-200/60 hover:border-emerald-200 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_40px_-12px_rgba(16,185,129,0.15),0_8px_20px_-8px_rgba(0,0,0,0.08)]">
          {/* Decorative Corner Accent */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-emerald-50/80 to-transparent pointer-events-none" />

          {/* Image Section */}
          <div className="relative">
            <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-stone-100 to-stone-50">
              {company.image ? (
                <Image
                  src={company.image}
                  alt={company.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-all duration-700 ease-out group-hover:scale-110"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-emerald-50 to-stone-100">
                  <Building2 className="w-16 h-16 text-emerald-300" />
                </div>
              )}

              {/* Gradient Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>

          {/* Content Section */}
          <div className="relative p-3 sm:p-5 pt-3 sm:pt-4 overflow-hidden">
            {/* Company Name */}
            <h4 className="text-sm sm:text-lg font-semibold text-stone-800 tracking-tight mb-2 sm:mb-3 line-clamp-1 leading-snug group-hover:text-emerald-700 transition-colors duration-300">
              {company.name}
            </h4>

            {/* Description */}
            {company.description && (
              <p className="text-xs sm:text-sm text-stone-500 mb-3 sm:mb-4 line-clamp-2 leading-relaxed">
                {company.description}
              </p>
            )}

            {!company.description && (
              <p className="text-xs sm:text-sm text-stone-400 italic mb-3 sm:mb-4">
                Ayurvedic products supplier
              </p>
            )}

            {/* WhatsApp Button */}
            <button
              className="w-full relative overflow-hidden flex items-center justify-center gap-1.5 sm:gap-2.5 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-white py-3 sm:py-3.5 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-300 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 hover:shadow-xl group/btn"
              onClick={handleWhatsApp}
            >
              <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 transition-transform duration-300 group-hover/btn:scale-110" />
              <span className="truncate">Contact via WhatsApp</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
            </button>
          </div>
        </div>
      </div>

      {/* Company Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
        <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] bg-stone-50 p-0 gap-0 flex flex-col">
          {/* Scrollable Content Container */}
          <div className="overflow-y-auto flex-1">
            {/* Large Company Image */}
            <div className="relative w-full aspect-[16/9] overflow-hidden flex-shrink-0">
              {company.image ? (
                <Image
                  src={company.image}
                  alt={company.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-emerald-50 to-stone-100">
                  <Building2 className="w-24 h-24 text-emerald-300" />
                </div>
              )}
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

              {/* Title Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <DialogTitle className="text-3xl font-serif font-bold text-white drop-shadow-lg">
                  {company.name}
                </DialogTitle>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Description */}
              {company.description ? (
                <div className="bg-white rounded-xl p-5 border border-stone-200 shadow-sm">
                  <h4 className="text-sm font-semibold text-stone-500 uppercase tracking-wider mb-2">
                    About
                  </h4>
                  <p className="text-stone-700 leading-relaxed">
                    {company.description}
                  </p>
                </div>
              ) : (
                <div className="bg-white rounded-xl p-5 border border-stone-200 shadow-sm">
                  <p className="text-stone-500 italic">
                    Ayurvedic products supplier
                  </p>
                </div>
              )}

              {/* Company Contact Details */}
              <div className="bg-white rounded-xl p-5 border border-stone-200 shadow-sm">
                <h4 className="text-sm font-semibold text-stone-500 uppercase tracking-wider mb-4">
                  Contact Information
                </h4>
                <div className="space-y-4">
                  {company.phone && (
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-emerald-100 rounded-lg flex-shrink-0">
                        <Phone className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-xs text-stone-500 uppercase tracking-wide">
                          Phone
                        </p>
                        <p className="text-stone-800 font-medium">
                          {company.phone}
                        </p>
                      </div>
                    </div>
                  )}
                  {company.email && (
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-emerald-100 rounded-lg flex-shrink-0">
                        <Mail className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-xs text-stone-500 uppercase tracking-wide">
                          Email
                        </p>
                        <p className="text-stone-800 font-medium">
                          {company.email}
                        </p>
                      </div>
                    </div>
                  )}
                  {company.address && (
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-emerald-100 rounded-lg flex-shrink-0">
                        <MapPin className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-xs text-stone-500 uppercase tracking-wide">
                          Address
                        </p>
                        <p className="text-stone-800 font-medium">
                          {company.address}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* WhatsApp CTA */}
              <Button
                className="w-full relative overflow-hidden bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-white font-semibold h-14 rounded-2xl shadow-xl shadow-emerald-500/20 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/30 group text-base"
                onClick={() =>
                  contactCompanyViaWhatsApp(company.name, company.phone)
                }
              >
                <MessageCircle className="h-5 w-5 mr-2 transition-transform group-hover:scale-110" />
                Contact via WhatsApp
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
