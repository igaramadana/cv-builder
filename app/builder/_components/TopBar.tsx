"use client";

import JsonIO from "./JsonIO";
import PrintButton from "./PrintButton";
import TemplateToggle from "./TemplateToggle";
import ResetButton from "./ResetButton";
import { ModeToggle } from "@/components/mode-toggle";

export default function TopBar() {
  return (
    <div className="sticky top-0 z-20 border-b bg-background/80 backdrop-blur">
      <div className="h-14 px-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="font-semibold">BUAT CV</div>
          <div className="text-xs text-muted-foreground hidden md:block">
            Editor • Preview • Export
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <ModeToggle />
          <TemplateToggle />
          <JsonIO />
          <ResetButton />
          <PrintButton />
        </div>
      </div>
    </div>
  );
}
