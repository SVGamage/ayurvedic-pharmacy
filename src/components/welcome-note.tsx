import { Leaf } from "lucide-react";
import { TextSlideshow } from "./text-slideshow";
const staticContent = {
  descriptions: [
    "We bring the timeless wisdom of Ayurveda into modern life through natural herbal remedies, thoughtfully created to support your health and well-being.",
    "පුරාණ ආයුර්වේද දැනුමේ සාරය, නූතන ජීවන රටාවට ගැළපෙන ස්වභාවධර්මයේ ඖෂධීය සත්කාරයන් ඔබේ සුවපත් ජීවිතයක් උදෙසා අරමුණු කරගෙන ඔබ වෙත ගෙන ඒමට අපි කැපවී සිටිමු."
  ]
}
export default function WelcomeNote() {
  return (
    <div className="relative py-16 my-8 overflow-hidden">
      <div className="absolute inset-0 bg-emerald-50/50 -skew-y-1 transform origin-top-left scale-110" />

      <div className="relative max-w-4xl mx-auto px-4 text-center">
        <div className="inline-flex items-center justify-center p-3 bg-white rounded-full shadow-sm mb-6 animate-bounce-slow">
          <Leaf className="h-6 w-6 text-emerald-600" />
        </div>

        <h2 className="text-4xl md:text-5xl font-serif text-stone-800 mb-6 leading-tight">
          Welcome to Your{" "}
          <span className="text-emerald-700 italic">Wellness Journey</span>
        </h2>

        <TextSlideshow
          texts={staticContent.descriptions}
          interval={5000}
          className="max-w-2xl mx-auto"
          textClassName="text-lg md:text-xl text-stone-600 leading-relaxed"
        />

        <div className="mt-8 flex justify-center">
          <div className="h-1 w-24 bg-gradient-to-r from-transparent via-emerald-400 to-transparent rounded-full" />
        </div>
      </div>
    </div>
  );
}
