"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useResumeStore } from "@/lib/store/useResumeStore";

export default function JsonIO() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const data = useResumeStore((s) => s.data);
  const loadFromJson = useResumeStore((s) => s.loadFromJson);
  const [err, setErr] = useState<string>("");

  function downloadJson() {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "resume.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  async function onPickFile(file: File | undefined) {
    setErr("");
    if (!file) return;
    try {
      const text = await file.text();
      const raw = JSON.parse(text);
      const res = loadFromJson(raw);
      if (!res.ok) setErr(res.error);
    } catch {
      setErr("File JSON tidak valid.");
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" onClick={downloadJson}>Download JSON</Button>
      <Button variant="outline" onClick={() => inputRef.current?.click()}>Upload JSON</Button>
      <input
        ref={inputRef}
        type="file"
        accept="application/json"
        className="hidden"
        onChange={(e) => onPickFile(e.target.files?.[0])}
      />
      {err ? <span className="text-xs text-destructive">{err}</span> : null}
    </div>
  );
}
