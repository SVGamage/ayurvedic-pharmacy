import SignOutButton from "./sign-out-button";

export default function AdminHeader() {
  return (
    <header className="flex flex-row justify-between bg-white shadow p-4 mb-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <SignOutButton />
    </header>
  );
}
