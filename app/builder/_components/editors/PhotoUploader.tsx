"use client";

import { useRef, useState } from "react";
import { useResumeStore } from "@/lib/store/useResumeStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Gagal membaca file"));
    reader.onload = () => resolve(String(reader.result));
    reader.readAsDataURL(file);
  });
}

export default function PhotoUploader() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const photo = useResumeStore((s) => s.data.basics.photo);
  const fullName = useResumeStore((s) => s.data.basics.fullName);
  const setData = useResumeStore((s) => s.setData);

  const [err, setErr] = useState("");

  async function onPick(file?: File) {
    setErr("");
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErr("File harus berupa gambar (PNG/JPG/WebP).");
      return;
    }

    const maxBytes = 2 * 1024 * 1024;
    if (file.size > maxBytes) {
      setErr("Ukuran gambar maksimal 2MB.");
      return;
    }

    try {
      const dataUrl = await fileToDataUrl(file);
      setData((p) => ({ ...p, basics: { ...p.basics, photo: dataUrl } }));
    } catch {
      setErr("Gagal mengunggah foto.");
    } finally {
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function remove() {
    setErr("");
    setData((p) => ({ ...p, basics: { ...p.basics, photo: "" } }));
  }

  const initials =
    fullName
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase())
      .join("") || "CV";

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Foto</CardTitle>

        <div className="flex gap-2">
          <Button variant="outline" onClick={() => inputRef.current?.click()}>
            {photo ? "Ganti" : "Unggah"}
          </Button>
          {photo ? (
            <Button variant="destructive" onClick={remove}>
              Hapus
            </Button>
          ) : null}
        </div>
      </CardHeader>

      <CardContent className="flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={photo || undefined} alt="Foto profil" />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>

        <div className="text-sm text-muted-foreground">
          <div>Format: PNG / JPG / WebP</div>
          <div>Maks: 2MB</div>
          <div className="mt-1">Pilih foto yang jelas (latar sederhana lebih bagus).</div>
          {err ? <div className="text-xs text-destructive mt-1">{err}</div> : null}
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => onPick(e.target.files?.[0])}
        />
      </CardContent>
    </Card>
  );
}
