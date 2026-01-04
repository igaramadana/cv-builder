"use client";

import { useResumeStore } from "@/lib/store/useResumeStore";
import TemplateOne from "./templates/TemplateOne";
import TemplateTwo from "./templates/TemplateTwo";
import PreviewToolbar from "./PreviewToolbar";

export default function PreviewPanel() {
  const data = useResumeStore((s) => s.data);
  const zoom = useResumeStore((s) => s.data.zoom);
  const Template = data.template === "two" ? TemplateTwo : TemplateOne;

  return (
    <div className="space-y-3">
      <div className="sticky top-2 z-10 rounded-xl border bg-background/80 backdrop-blur p-3">
        <PreviewToolbar />
      </div>

      <div className="rounded-2xl border bg-background shadow-sm p-4">
        <div className="flex justify-center">
          <div
            className="cv-zoom"
            style={{
              transform: `scale(${zoom / 100})`,
              transformOrigin: "top center",
              width: "fit-content",
            }}
          >
            <Template data={data} />
          </div>
        </div>
      </div>

      <div className="text-xs text-muted-foreground">
        Tips: Klik <span className="font-medium">Export PDF</span> lalu pilih “Save as PDF”.
      </div>
    </div>
  );
}
