import { cn } from "@/lib/utils";

// What happens after a WhatsApp handoff, in English and Sinhala.
// Only confirmed facts: no online payment, island-wide delivery, 8 AM–7 PM, closed on Poya days.
const NOTES = {
  order: {
    en: "No payment now. We'll reply on WhatsApp to confirm stock and delivery anywhere in Sri Lanka. Closed on Poya days.",
    si: "දැන් ගෙවීමක් අවශ්‍ය නැත. තොගය සහ බෙදාහැරීම WhatsApp හරහා අපි තහවුරු කරමු. පෝය දිනවල වසා ඇත.",
  },
  booking: {
    en: "Opens WhatsApp. No payment now. We'll reply to confirm a time. Closed on Poya days.",
    si: "WhatsApp විවෘත වේ. දැන් ගෙවීමක් අවශ්‍ය නැත. වේලාවක් තහවුරු කිරීමට අපි පිළිතුරු දෙමු. පෝය දිනවල වසා ඇත.",
  },
  message: {
    en: "Opens WhatsApp with your message. We reply between 8 AM and 7 PM, and we're closed on Poya days.",
    si: "ඔබේ පණිවිඩය සමඟ WhatsApp විවෘත වේ. අපි පෙ.ව. 8 සිට ප.ව. 7 දක්වා පිළිතුරු දෙමු. පෝය දිනවල වසා ඇත.",
  },
} as const;

export function WhatsAppHandoffNote({
  kind,
  className,
}: {
  kind: keyof typeof NOTES;
  className?: string;
}) {
  const note = NOTES[kind];
  return (
    <div
      className={cn(
        "rounded-xl bg-emerald-50 px-3 py-2.5 text-xs text-emerald-900 leading-relaxed",
        className,
      )}
    >
      <p>{note.en}</p>
      <p lang="si" className="mt-1 text-emerald-800">
        {note.si}
      </p>
    </div>
  );
}
