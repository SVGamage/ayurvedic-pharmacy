"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { openingHours } from "@/config/location";

type Status = { open: boolean; en: string; si: string };

// The shop keeps Sri Lanka time; compute from that, not the visitor's clock.
function currentStatus(): Status {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Colombo",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).formatToParts(new Date());
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 0);
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? 0);
  const now = hour + minute / 60;
  const { opensAt, closesAt } = openingHours;

  if (now >= opensAt && now < closesAt) {
    return {
      open: true,
      en: "Open now · closes 7:00 PM",
      si: "දැන් විවෘතයි · ප.ව. 7.00 ට වසයි",
    };
  }
  return {
    open: false,
    en: now < opensAt ? "Closed now · opens 8:00 AM" : "Closed now · opens 8:00 AM tomorrow",
    si: "දැන් වසා ඇත · පෙ.ව. 8.00 ට විවෘත වේ",
  };
}

/** Live open/closed line. Renders after mount so server and client agree. */
export function OpenStatus({ className }: { className?: string }) {
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    setStatus(currentStatus());
    const timer = setInterval(() => setStatus(currentStatus()), 60_000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={cn("min-h-[3rem]", className)} aria-live="polite">
      {status && (
        <>
          <p className="flex items-center gap-2 font-semibold text-stone-800">
            <span
              aria-hidden="true"
              className={cn(
                "h-2.5 w-2.5 rounded-full",
                status.open ? "bg-emerald-600" : "bg-stone-400",
              )}
            />
            {status.en}
          </p>
          <p lang="si" className="text-sm text-stone-600">
            {status.si}
          </p>
          <p className="mt-1 text-sm text-stone-600">
            Every day 8:00 AM – 7:00 PM. Closed on Poya days.
          </p>
        </>
      )}
    </div>
  );
}
