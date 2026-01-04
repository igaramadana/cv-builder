"use client";

import { useState } from "react";
import { useResumeStore } from "@/lib/store/useResumeStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function SkillsEditor() {
  const skills = useResumeStore((s) => s.data.skills);
  const addSkill = useResumeStore((s) => s.addSkill);
  const removeSkill = useResumeStore((s) => s.removeSkill);

  const [value, setValue] = useState("");
  const [err, setErr] = useState("");

  function add() {
    const res = addSkill(value);
    if (!res.ok) {
      setErr(res.error);
      return;
    }
    setErr("");
    setValue("");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Keahlian</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex gap-2">
          <Input
            placeholder="Contoh: React, Next.js, TypeScript, SQL"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                add();
              }
            }}
          />
          <Button variant="outline" onClick={add}>
            Tambah
          </Button>
        </div>

        {err ? <div className="text-xs text-destructive">{err}</div> : null}

        <div className="flex flex-wrap gap-2">
          {skills.map((s) => (
            <Badge key={s} variant="secondary" className="gap-2">
              {s}
              <button
                className="text-xs opacity-70 hover:opacity-100"
                onClick={() => removeSkill(s)}
                type="button"
                title="Hapus skill"
              >
                ✕
              </button>
            </Badge>
          ))}

          {skills.length === 0 ? (
            <div className="text-sm text-muted-foreground">Belum ada keahlian.</div>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
