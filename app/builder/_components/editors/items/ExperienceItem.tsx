"use client";

import { useMemo } from "react";
import { useResumeStore } from "@/lib/store/useResumeStore";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { DatePicker } from "@/components/date-picker";

export default function ExperienceItem({ id }: { id: string }) {
  const item = useResumeStore((s) => s.data.experience.find((e) => e.id === id));
  const update = useResumeStore((s) => s.updateExperience);
  const remove = useResumeStore((s) => s.removeExperience);

  const highlights = useMemo(() => item?.highlights ?? [], [item?.highlights]);
  if (!item) return null;

  return (
    <Card>
      <CardContent className="p-3 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div className="text-sm font-medium">{item.company || "Perusahaan"}</div>
          <Button variant="destructive" size="sm" onClick={() => remove(id)}>
            Hapus
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <Label>Perusahaan</Label>
            <Input
              placeholder="Contoh: PT Maju Jaya"
              onChange={(e) => update(id, { company: e.target.value })}
            />
          </div>

          <div>
            <Label>Posisi</Label>
            <Input
              placeholder="Contoh: Software Engineer"
              onChange={(e) => update(id, { role: e.target.value })}
            />
          </div>

          <div>
            <Label>Bulan Mulai</Label>
            <DatePicker
              value={item.start}
              onChange={(v) => update(id, { start: v })}
              placeholder="Bulan mulai"
            />
          </div>

          <div>
            <Label>Bulan Selesai</Label>
            <DatePicker
              value={item.end}
              onChange={(v) => update(id, { end: v })}
              placeholder="Bulan selesai (kosongkan jika sekarang)"
            />
          </div>

          <div className="md:col-span-2">
            <Label>Lokasi</Label>
            <Input
              placeholder="Contoh: Jakarta / Remote"
              value={item.location ?? ""}
              onChange={(e) => update(id, { location: e.target.value })}
            />
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Poin Pencapaian (bullet)</Label>
            <Button
              size="sm"
              variant="outline"
              onClick={() => update(id, { highlights: [...highlights, ""] })}
            >
              + Tambah Bullet
            </Button>
          </div>

          {highlights.map((h, idx) => (
            <div key={idx} className="flex gap-2">
              <Textarea
                placeholder="Contoh: Membangun fitur checkout yang meningkatkan konversi 15%"
                className="min-h-[42px]"
                value={h}
                onChange={(e) => {
                  const next = [...highlights];
                  next[idx] = e.target.value;
                  update(id, { highlights: next });
                }}
              />
              <Button
                variant="outline"
                onClick={() => {
                  const next = highlights.filter((_, i) => i !== idx);
                  update(id, { highlights: next.length ? next : [""] });
                }}
                title="Hapus bullet"
              >
                X
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
