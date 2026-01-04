"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type DatePickerProps = {
  value?: string;
  onChange: (value: string | undefined) => void;
  placeholder?: string;
};

export function DatePicker({
  value,
  onChange,
  placeholder = "Pilih bulan",
}: DatePickerProps) {
  const date = value ? new Date(value) : undefined;

  return (
    <div className="flex items-center gap-1">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "MMM yyyy") : placeholder}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(d) => {
                if (!d) return onChange(undefined);

                const y = d.getFullYear();
                const m = d.getMonth();

                const safeIso = new Date(Date.UTC(y, m, 1, 12, 0, 0)).toISOString();
                onChange(safeIso);
                }}
            initialFocus
            captionLayout="dropdown"
            fromYear={1980}
            toYear={new Date().getFullYear() + 5}
          />
        </PopoverContent>
      </Popover>

      {date ? (
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => onChange(undefined)}
          title="Hapus tanggal"
        >
          <X className="h-4 w-4" />
        </Button>
      ) : null}
    </div>
  );
}
