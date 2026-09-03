"use client";

import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function SignOutButton() {
  const router = useRouter();

  async function handleSignOut() {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/login";
        },
      },
    });
    window.location.href = "/login";
  }

  return (
    <button
      onClick={handleSignOut}
      className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
    >
      <LogOut className="h-4 w-4" />
      Sign Out
    </button>
  );
}
