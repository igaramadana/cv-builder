"use client";

import { useEffect, useRef, useState } from "react";
import TopBar from "./TopBar";
import EditorPanel from "./EditorPanel";
import PreviewPanel from "./PreviewPanel";
import MobileTabs from "./MobileTabs";
import PrintArea from "./PrintArea";
import BuilderFooter from "./BuilderFooter";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function BuilderShell() {
  // default lebar sidebar
  const [sidebarW, setSidebarW] = useState(560);
  const dragRef = useRef<{ startX: number; startW: number; dragging: boolean }>({
    startX: 0,
    startW: 560,
    dragging: false,
  });

  useEffect(() => {
    function onMove(e: MouseEvent) {
      if (!dragRef.current.dragging) return;
      const dx = e.clientX - dragRef.current.startX;
      const next = dragRef.current.startW + dx;
      setSidebarW(clamp(next, 420, 760));
    }
    function onUp() {
      dragRef.current.dragging = false;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    }
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  return (
  <div className="min-h-screen bg-background flex flex-col">
    <TopBar />

    {/* Print area selalu ada */}
    <PrintArea />

    {/* CONTENT */}
    <div className="flex-1">
      {/* Mobile */}
      <div className="lg:hidden">
        <MobileTabs editor={<EditorPanel />} preview={<PreviewPanel />} />
      </div>

      {/* Desktop */}
      <div className="hidden lg:flex">
        {/* Sidebar */}
        <aside
          className="h-[calc(100vh-56px)] border-r bg-background"
          style={{ width: sidebarW }}
        >
          <div className="h-full overflow-y-auto p-4">
            <div className="max-w-[720px]">
              <EditorPanel />
            </div>
          </div>
        </aside>

        {/* Resize handle */}
        <div
          className="h-[calc(100vh-56px)] w-2 cursor-col-resize hover:bg-muted/60"
          onMouseDown={(e) => {
            dragRef.current.dragging = true;
            dragRef.current.startX = e.clientX;
            dragRef.current.startW = sidebarW;
            document.body.style.cursor = "col-resize";
            document.body.style.userSelect = "none";
          }}
        />

        {/* Preview */}
        <main className="h-[calc(100vh-56px)] flex-1 bg-muted/30">
          <div className="h-full overflow-y-auto p-6">
            <PreviewPanel />
          </div>
        </main>
      </div>
    </div>

    {/* ✅ FOOTER (di luar area print & scroll panel) */}
    <BuilderFooter />
  </div>
);

}
