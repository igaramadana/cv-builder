"use client";

import { useEffect } from "react";
import { useResumeStore } from "@/lib/store/useResumeStore";
import BuilderShell from "./_components/BuilderShell";

export default function BuilderPage() {
  const hydrate = useResumeStore((s) => s.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return <BuilderShell />;
}
