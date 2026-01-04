"use client";

import { useResumeStore } from "@/lib/store/useResumeStore";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/date-picker";

export default function EducationItem({ id }: { id: string }) {
  const item = useResumeStore((s) => s.data.education.find((e) => e.id === id));
  const update = useResumeStore((s) => s.updateEducation);
  const remove = useResumeStore((s) => s.removeEducation);

  if (!item) return null;

  return (
    <Card>
      <CardContent className="p-3 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div className="text-sm font-medium">{item.school || "Institusi"}</div>
          <Button variant="destructive" size="sm" onClick={() => remove(id)}>
            Hapus
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <Label>Institusi</Label>
            <Input
              placeholder="Contoh: Universitas Indonesia"
              value={item.school}
              onChange={(e) => update(id, { school: e.target.value })}
            />
          </div>

          <div>
            <Label>Jurusan / Gelar</Label>
            <Input
              placeholder="Contoh: S1 Teknik Informatika"
              value={item.degree ?? ""}
              onChange={(e) => update(id, { degree: e.target.value })}
            />
          </div>

          <div>
            <Label>Bulan Mulai</Label>
            <DatePicker
              value={item.start}
              onChange={(v) => update(id, { start: v })}
              placeholder="Pilih bulan mulai"
            />
          </div>

          <div>
            <Label>Bulan Selesai</Label>
            <DatePicker
              value={item.end}
              onChange={(v) => update(id, { end: v })}
              placeholder="Pilih bulan selesai"
            />
          </div>

          <div className="md:col-span-2">
            <Label>Lokasi</Label>
            <Input
              placeholder="Contoh: Depok, Jawa Barat"
              value={item.location ?? ""}
              onChange={(e) => update(id, { location: e.target.value })}
            />
          </div>

          <div className="md:col-span-2">
            <Label>Detail (opsional)</Label>
            <Textarea
              placeholder="Contoh: IPK 3.75, organisasi, lomba, skripsi tentang..."
              className="min-h-[90px]"
              value={item.details ?? ""}
              onChange={(e) => update(id, { details: e.target.value })}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
