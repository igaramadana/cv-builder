"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useResumeStore } from "@/lib/store/useResumeStore";

export default function TemplateToggle() {
  const template = useResumeStore((s) => s.data.template);
  const setTemplate = useResumeStore((s) => s.setTemplate);

  return (
    <Tabs value={template} onValueChange={(v) => setTemplate(v as "one" | "two")}>
      <TabsList>
        <TabsTrigger value="one">Template 1</TabsTrigger>
        <TabsTrigger value="two">Template 2</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
