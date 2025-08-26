import Image from "next/image";
import LogoImage from "@/assets/logo.png";

export default function Brand({
  isFooter,
  width,
  height,
  logoOnly = false,
  textOnly = false,
  isColumn = false,
}: {
  isFooter: boolean;
  width: number;
  height: number;
  logoOnly?: boolean;
  textOnly?: boolean;
  isColumn?: boolean;
}) {
  // Behavior:
  // - if logoOnly is true => render only the logo image
  // - else if textOnly is true => render only the text
  // - else => render both image and text
  // Assumption: if both logoOnly and textOnly are true, logoOnly takes precedence (renders logo only)

  const renderLogo = Boolean(logoOnly) || (!logoOnly && !textOnly);
  const renderText = Boolean(textOnly) || (!logoOnly && !textOnly);

  const containerClass = isColumn
    ? "flex flex-col items-center gap-4"
    : "flex flex-row items-center sm:flex-row sm:items-center sm:gap-4";

  const textContainerClass = isColumn
    ? "flex flex-col items-center"
    : "flex flex-col items-center sm:items-start";

  return (
    <div className={containerClass}>
      {renderLogo && (
        <div className="logo-wrapper w-20 sm:w-24 md:w-32 flex-shrink-0">
          <Image
            src={LogoImage}
            alt="Rathnadeepa Herbals Logo"
            width={width}
            height={height}
            className="transition-transform group-hover:scale-110 w-full h-auto"
          />
        </div>
      )}

      {renderText && (
        <div className={textContainerClass}>
          <span
            className={`text-3xl sm:text-5xl md:text-6xl font-black ${
              isFooter ? "text-green-100" : "text-green-800"
            } leading-tight`}
            style={{ fontFamily: "var(--font-tangerine), cursive" }}
          >
            Rathnadeepa
          </span>
          <span
            className={`text-xl sm:text-3xl md:text-4xl font-medium ${
              isFooter ? "text-green-300" : "text-green-600"
            } -mt-1`}
            style={{ fontFamily: "var(--font-tangerine), cursive" }}
          >
            Herbals
          </span>
        </div>
      )}
    </div>
  );
}
