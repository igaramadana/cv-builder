"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useResumeStore } from "@/lib/store/useResumeStore";

const ZOOMS = [80, 90, 100, 110, 120] as const;

export default function PreviewToolbar() {
  const zoom = useResumeStore((s) => s.data.zoom);
  const setZoom = useResumeStore((s) => s.setZoom);

  return (
    <div className="flex items-center justify-between gap-2">
      <div className="text-sm text-muted-foreground">Preview</div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setZoom(zoom - 10)}
          title="Perkecil"
        >
          −
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              {zoom}%
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {ZOOMS.map((z) => (
              <DropdownMenuItem key={z} onClick={() => setZoom(z)}>
                {z}%
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setZoom(zoom + 10)}
          title="Perbesar"
        >
          +
        </Button>
      </div>
    </div>
  );
}
