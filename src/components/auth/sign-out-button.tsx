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
      className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-rose-400 hover:bg-rose-950/40 hover:text-rose-300 transition-colors"
    >
      <LogOut className="h-4 w-4" />
      Sign Out
    </button>
  );
}
