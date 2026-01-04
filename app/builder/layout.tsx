import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Builder • CV Builder",
};

export default function BuilderLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen">{children}</div>;
}
