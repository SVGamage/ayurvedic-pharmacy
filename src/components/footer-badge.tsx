import { Facebook, Instagram, Twitter } from "lucide-react";
import Brand from "./brand";

export default function FooterBadge() {
  return (
    <div className="space-y-4 text-center md:text-left">
      <div className="flex items-center justify-center md:justify-start space-x-2">
        <Brand isFooter={true} width={110} height={120} isColumn={true} />
      </div>
      <div className="flex flex-col items-center justify-center md:justify-start space-x-2 space-y-2">
        <p
          className="text-green-100 text-2xl"
          style={{ fontFamily: "var(--font-tangerine), cursive" }}
        >
          Arogya Parama Labha
        </p>
        <div className="flex space-x-4">
          <Facebook className="h-5 w-5 text-green-400 hover:text-white cursor-pointer" />
          <Instagram className="h-5 w-5 text-green-400 hover:text-white cursor-pointer" />
          <Twitter className="h-5 w-5 text-green-400 hover:text-white cursor-pointer" />
        </div>
      </div>
    </div>
  );
}
