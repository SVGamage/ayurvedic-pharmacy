"use client";

import type React from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { WhatsAppFloatingButton } from "@/components/whatsapp-floating-button";
import { usePathname } from "next/navigation";


export default function LayoutComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Define routes where Navigation, Footer, and WhatsAppFloatingButton should not appear
  const excludedRoutes = ["/sign-in", "/sign-up", "/admin"];
  const isExcluded = excludedRoutes.some((route) => pathname.startsWith(route));

  return (
    <>
      {!isExcluded && <Navigation />}
      <main className="min-h-screen">{children}</main>
      {!isExcluded && <Footer />}
      {!isExcluded && <WhatsAppFloatingButton />}
    </>
  );
}
