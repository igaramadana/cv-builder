"use client";

import { useResumeStore } from "@/lib/store/useResumeStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function BasicsEditor() {
  const basics = useResumeStore((s) => s.data.basics);
  const setData = useResumeStore((s) => s.setData);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Diri</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <Label>Nama Lengkap</Label>
            <Input
              placeholder="Contoh: Budi Santoso"
              onChange={(e) =>
                setData((p) => ({
                  ...p,
                  basics: { ...p.basics, fullName: e.target.value },
                }))
              }
            />
          </div>

          <div>
            <Label>Posisi / Role</Label>
            <Input
              placeholder="Contoh: Frontend Engineer"
              value={basics.title ?? ""}
              onChange={(e) =>
                setData((p) => ({
                  ...p,
                  basics: { ...p.basics, title: e.target.value },
                }))
              }
            />
          </div>

          <div>
            <Label>Email</Label>
            <Input
              placeholder="Contoh: budi@email.com"
              value={basics.email ?? ""}
              onChange={(e) =>
                setData((p) => ({
                  ...p,
                  basics: { ...p.basics, email: e.target.value },
                }))
              }
            />
          </div>

          <div>
            <Label>Nomor HP</Label>
            <Input
              placeholder="Contoh: +62 812-3456-7890"
              value={basics.phone ?? ""}
              onChange={(e) =>
                setData((p) => ({
                  ...p,
                  basics: { ...p.basics, phone: e.target.value },
                }))
              }
            />
          </div>

          <div className="md:col-span-2">
            <Label>Domisili</Label>
            <Input
              placeholder="Contoh: Jakarta, Indonesia"
              value={basics.location ?? ""}
              onChange={(e) =>
                setData((p) => ({
                  ...p,
                  basics: { ...p.basics, location: e.target.value },
                }))
              }
            />
          </div>
        </div>

        <div>
          <Label>Ringkasan</Label>
          <Textarea
            placeholder="Contoh: Frontend Engineer dengan 3+ tahun pengalaman membangun aplikasi web, fokus pada performa, aksesibilitas, dan DX..."
            className="min-h-[110px]"
            onChange={(e) =>
              setData((p) => ({
                ...p,
                basics: { ...p.basics, summary: e.target.value },
              }))
            }
          />
        </div>
      </CardContent>
    </Card>
  );
}
