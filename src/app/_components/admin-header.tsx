"use client";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "@/lib/auth-client";
import { redirect } from "next/navigation";

export default function AdminHeader() {
  const { data, isPending } = useSession();
  if (isPending) {
    return null;
  }
  if (!data) {
    console.log(data);
    redirect("/sign-in");
  }
  return (
    <header className="flex flex-row justify-between bg-white shadow p-4 mb-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <Button
        onClick={async () => {
          await signOut();
        }}
      >
        Sign Out
      </Button>
    </header>
  );
}
