import Link from "next/link";
import SignOutButton from "./sign-out-button";

export default function AdminHeader() {
  return (
    <header className="bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-600 shadow-xl border-b-4 border-yellow-400">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex flex-row justify-between items-center">
          <Link href="/admin">
            <div className="group cursor-pointer">
              <h1 className="text-3xl font-bold text-white hover:text-yellow-100 transition-colors duration-200 flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-200">
                  <div className="w-6 h-6 bg-yellow-300 rounded-full animate-pulse"></div>
                </div>
                <span className="bg-gradient-to-r from-white to-yellow-100 bg-clip-text text-transparent">
                  Ayurvedic Admin
                </span>
              </h1>
              <p className="text-yellow-100 text-sm ml-13 opacity-90">
                Holistic Wellness Management
              </p>
            </div>
          </Link>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-1">
            <SignOutButton />
          </div>
        </div>
      </div>
    </header>
  );
}
