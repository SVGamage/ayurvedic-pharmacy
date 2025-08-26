import Image from "next/image";
import LogoImage from "@/assets/logo.png";

export default function Brand({ isFooter }: { isFooter: boolean }) {
  return (
    <>
      <Image
        src={LogoImage}
        alt="Rathnadeepa Herbals Logo"
        width={100}
        height={100}
        className="transition-transform group-hover:scale-110"
      />
      <div className="flex flex-col">
        <span
          className={`text-6xl sm:text-5xl font-bold ${
            isFooter ? "text-green-100" : "text-green-800"
          } leading-tight`}
          style={{ fontFamily: "var(--font-tangerine), cursive" }}
        >
          Rathnadeepa
        </span>
        <span
          className={`text-4xl sm:text-3xl font-medium ${
            isFooter ? "text-green-300" : "text-green-600"
          } -mt-1 hidden sm:block`}
          style={{ fontFamily: "var(--font-tangerine), cursive" }}
        >
          Herbals
        </span>
      </div>
    </>
  );
}
