import Image from "next/image";
import LogoImage from "@/assets/logo.png";

export default function Brand({ isFooter }: { isFooter: boolean }) {
  return (
    <>
      <Image
        src={LogoImage}
        alt="Rathnadeepa Herbals Logo"
        width={54}
        height={54}
        className="transition-transform group-hover:scale-110"
      />
      <div className="flex flex-col">
        <span
          className={`text-xl sm:text-2xl font-bold ${
            isFooter ? "text-green-100" : "text-green-800"
          } leading-tight`}
        >
          Rathnadeepa
        </span>
        <span
          className={`text-sm sm:text-base font-medium ${
            isFooter ? "text-green-300" : "text-green-600"
          } -mt-1 hidden sm:block`}
        >
          Herbals
        </span>
      </div>
    </>
  );
}
