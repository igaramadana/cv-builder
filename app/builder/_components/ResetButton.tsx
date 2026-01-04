"use client";

import { Button } from "@/components/ui/button";
import { useResumeStore } from "@/lib/store/useResumeStore";

export default function ResetButton() {
  const reset = useResumeStore((s) => s.reset);

  return (
    <Button variant="outline" onClick={reset}>
      Reset
    </Button>
  );
}
