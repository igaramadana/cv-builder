"use client";

import { useResumeStore } from "@/lib/store/useResumeStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import EducationItem from "./items/EducationItem";

export default function EducationEditor() {
  const items = useResumeStore((s) => s.data.education);
  const add = useResumeStore((s) => s.addEducation);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Pendidikan</CardTitle>
        <Button variant="outline" onClick={add}>
          + Tambah
        </Button>
      </CardHeader>

      <CardContent className="space-y-3">
        {items.length === 0 ? (
          <div className="text-sm text-muted-foreground">Belum ada riwayat pendidikan.</div>
        ) : (
          items.map((x) => <EducationItem key={x.id} id={x.id} />)
        )}
      </CardContent>
    </Card>
  );
}
