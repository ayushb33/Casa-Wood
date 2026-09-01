import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | Casa Wood",
  description: "Sign in to the Casa Wood management dashboard.",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
