"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useResumeStore } from "@/lib/store/useResumeStore";
import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import SortableRow from "../sortable/SortableRow";
import type { SectionId } from "@/lib/resumeSchema";

const label: Record<SectionId, string> = {
  summary: "Summary",
  experience: "Experience",
  education: "Education",
  skills: "Skills",
};

export default function SectionOrder() {
  const order = useResumeStore((s) => s.data.sectionOrder);
  const setSectionOrder = useResumeStore((s) => s.setSectionOrder);

  function onDragEnd(e: DragEndEvent) {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const oldIndex = order.indexOf(active.id as SectionId);
    const newIndex = order.indexOf(over.id as SectionId);
    setSectionOrder(arrayMove(order, oldIndex, newIndex) as SectionId[]);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Urutan Section (drag)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
          <SortableContext items={order} strategy={verticalListSortingStrategy}>
            <div className="space-y-2">
              {order.map((id) => (
                <SortableRow key={id} id={id} title={label[id]} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </CardContent>
    </Card>
  );
}
