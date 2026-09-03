"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { signIn, useSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.user) {
      router.replace("/dashboard");
    }
  }, [session, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const result = await signIn.email({
      email,
      password,
    });

    if (result.error) {
      setError(result.error.message ?? "Invalid credentials.");
      setIsLoading(false);
      return;
    }

    window.location.href = "/dashboard";
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left — Brand Panel */}
      <div
        className="hidden lg:flex flex-col justify-between p-12 text-white"
        style={{ backgroundColor: "var(--primary)" }}
      >
        <div>
          <Image
            src="/brand/casa-wood-logo.png"
            alt="Casa Wood"
            width={180}
            height={60}
            className="object-contain brightness-0 invert"
            priority
          />
        </div>
        <div className="space-y-4">
          <blockquote
            className="text-4xl leading-snug"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            &ldquo;Every piece of furniture tells a story of the hands that
            crafted it.&rdquo;
          </blockquote>
          <p className="opacity-60 text-sm">— Casa Wood Studio</p>
        </div>
        <p className="text-xs opacity-40">
          © {new Date().getFullYear()} Casa Wood. All rights reserved.
        </p>
      </div>

      {/* Right — Login Form */}
      <div
        className="flex flex-col justify-center items-center p-8"
        style={{ backgroundColor: "var(--background)" }}
      >
        <div className="w-full max-w-sm space-y-8">
          {/* Mobile logo */}
          <div className="lg:hidden flex justify-center">
            <Image
              src="/brand/casa-wood-logo.png"
              alt="Casa Wood"
              width={140}
              height={48}
              className="object-contain"
              priority
            />
          </div>

          <div className="space-y-2">
            <h1
              className="text-3xl font-semibold"
              style={{
                fontFamily: "var(--font-playfair)",
                color: "var(--foreground)",
              }}
            >
              Welcome back
            </h1>
            <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
              Sign in to your Casa Wood dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" id="login-form">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                required
                placeholder="admin@casawood.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <p
                id="login-error"
                className="text-sm rounded-md px-3 py-2"
                style={{
                  color: "var(--destructive)",
                  backgroundColor: "var(--destructive-foreground)",
                  border: "1px solid var(--destructive)",
                }}
              >
                {error}
              </p>
            )}

            <Button
              id="login-submit"
              type="submit"
              disabled={isLoading}
              className="w-full"
              style={{
                backgroundColor: "var(--primary)",
                color: "var(--primary-foreground)",
              }}
            >
              {isLoading ? "Signing in…" : "Sign in"}
            </Button>
          </form>

          <p
            className="text-center text-xs"
            style={{ color: "var(--muted-foreground)" }}
          >
            Authorised personnel only. Contact your administrator for access.
          </p>
        </div>
      </div>
    </div>
  );
}
