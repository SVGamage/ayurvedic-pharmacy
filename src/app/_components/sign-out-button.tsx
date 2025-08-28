"use client";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { PendingCircle } from "./pending-circle";
export default function SignOutButton() {
  const { data, isPending } = useSession();
  if (isPending) {
    return (
      <Button disabled={isPending}>
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
    >
      Sign Out
    </Button>
  );
}
