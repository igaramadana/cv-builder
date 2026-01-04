"use client";

import { useResumeStore } from "@/lib/store/useResumeStore";
import TemplateOne from "./templates/TemplateOne";
import TemplateTwo from "./templates/TemplateTwo";

/**
 * PrintArea selalu ter-render, tapi disembunyikan offscreen.
 * Saat @media print, CSS akan menampilkan #print-area.
 */
export default function PrintArea() {
  const data = useResumeStore((s) => s.data);
  const Template = data.template === "two" ? TemplateTwo : TemplateOne;

  return (
    <div
      id="print-area"
      // offscreen tapi tetap "display:block" (bukan hidden/display:none)
      style={{
        position: "fixed",
        left: "-10000px",
        top: 0,
        width: "210mm", // A4 width
        background: "white",
        color: "black",
      }}
    >
      <Template data={data} />
    </div>
  );
}
