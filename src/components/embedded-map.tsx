"use client";

interface EmbeddedMapProps {
  className?: string;
  height?: string;
}

export default function EmbeddedMap({
  className = "",
  height = "450px",
}: EmbeddedMapProps) {
  return (
    <div className={`w-full ${className}`}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d991.4650981398622!2d81.266109!3d6.282077!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae69d4cb29100cd%3A0xbc057c7a6a52befa!2sRathnadeepa%20Aurvedic%20Pharmacy!5e0!3m2!1sen!2sus!4v1759433053036!5m2!1sen!2sus"
        width="100%"
        height={height}
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="rounded-lg"
      />
    </div>
  );
}
