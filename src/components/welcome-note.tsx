import { Leaf } from "lucide-react";

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

        <p className="text-lg md:text-xl text-stone-600 leading-relaxed max-w-2xl mx-auto">
          Embrace the ancient wisdom of Ayurveda tailored for modern life. We
          are dedicated to bringing you the purest natural remedies and holistic
          care.
        </p>

        <div className="mt-8 flex justify-center">
          <div className="h-1 w-24 bg-gradient-to-r from-transparent via-emerald-400 to-transparent rounded-full" />
        </div>
      </div>
    </div>
  );
}
