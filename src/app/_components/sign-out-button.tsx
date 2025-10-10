"use client";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { PendingCircle } from "./pending-circle";
export default function SignOutButton() {
  const { data, isPending } = useSession();
  if (isPending) {
    return (
      <Button
        disabled={isPending}
        variant="outline"
        className="bg-white/20 border-white/30 text-white opacity-50"
      >
        <PendingCircle />
      </Button>
    );
  }
  if (!data) {
    console.log(data);
    redirect("/sign-in");
  }
  return (
    <Button
      onClick={async () => {
        await signOut();
      }}
      disabled={isPending}
      variant="outline"
      className="bg-white/20 border-white/30 text-white hover:bg-white/30 hover:border-white/50 font-semibold transition-all duration-200"
    >
      Sign Out
    </Button>
  );
}
