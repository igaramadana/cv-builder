"use client";

import { Button } from "@/components/ui/button";

export default function PrintButton() {
  return (
    <Button
      onClick={() => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            window.print();
          });
        });
      }}
    >
      Export PDF
    </Button>
  );
}
