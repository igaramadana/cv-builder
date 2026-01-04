"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/button";

export default function SortableRow({ id, title }: { id: string; title: string }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center justify-between rounded-lg border bg-card px-3 py-2"
    >
      <div className="text-sm">{title}</div>
      <Button size="sm" variant="outline" {...attributes} {...listeners}>
        Drag
      </Button>
    </div>
  );
}
