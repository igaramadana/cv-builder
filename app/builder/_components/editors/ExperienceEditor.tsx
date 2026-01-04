"use client";

import { useResumeStore } from "@/lib/store/useResumeStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ExperienceItem from "./items/ExperienceItem";

export default function ExperienceEditor() {
  const items = useResumeStore((s) => s.data.experience);
  const add = useResumeStore((s) => s.addExperience);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Pengalaman Kerja</CardTitle>
        <Button variant="outline" onClick={add}>
          + Tambah
        </Button>
      </CardHeader>

      <CardContent className="space-y-3">
        {items.length === 0 ? (
          <div className="text-sm text-muted-foreground">Belum ada pengalaman kerja.</div>
        ) : (
          items.map((x) => <ExperienceItem key={x.id} id={x.id} />)
        )}
      </CardContent>
    </Card>
  );
}
