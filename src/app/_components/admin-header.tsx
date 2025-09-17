import Link from "next/link";
import SignOutButton from "./sign-out-button";

export default function AdminHeader() {
  return (
    <header className="flex flex-row justify-between bg-white shadow p-4 mb-6">
      <Link href="/admin">
        <h1 className="text-2xl font-bold hover:text-blue-600 transition-colors cursor-pointer">
          Admin Dashboard
        </h1>
      </Link>
      <SignOutButton />
    </header>
  );
}
