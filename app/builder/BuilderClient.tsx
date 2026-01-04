"use client";

import { useEffect, useState } from "react";
import { useResumeStore } from "@/lib/store/useResumeStore";
import BuilderShell from "./_components/BuilderShell";

export default function BuilderClient() {
  const hydrate = useResumeStore((s) => s.hydrate);
  const hydrated = useResumeStore((s) => s.hydrated);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    hydrate();
  }, [hydrate]);

  // Hindari render apa pun sebelum client siap (mencegah mismatch)
  if (!mounted || !hydrated) {
    return null; // atau tampilkan skeleton kamu di sini
  }

  return <BuilderShell />;
}
