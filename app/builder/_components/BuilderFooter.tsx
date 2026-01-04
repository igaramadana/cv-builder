"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function BuilderFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-4 py-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          {/* Left */}
          <div className="flex flex-col gap-2 md:flex-row md:items-center">
            <div className="flex items-center gap-2">
              <div className="font-semibold tracking-tight">Buat CV</div>
              <Badge variant="secondary" className="h-5 px-2 text-[11px]">
                Beta
              </Badge>
            </div>

            <div className="hidden md:block">
              <Separator orientation="vertical" className="h-4" />
            </div>

            <div className="text-xs text-muted-foreground flex flex-wrap items-center gap-x-2 gap-y-1">
              <span>© {year} Igaramadana</span>
              <span className="hidden sm:inline">•</span>
              <span>Autosave aktif</span>
              <span className="hidden sm:inline">•</span>
              <span>
                Shortcut: <span className="font-medium">Ctrl/Cmd + P</span> untuk print
              </span>
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <Link
              href="/builder"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Builder
            </Link>
            <Link
              href="/#features"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Fitur
            </Link>
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Landing
            </Link>

            <span className="text-muted-foreground/60">•</span>

            <a
              href="https://github.com/igaramadana"
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              title="CV-Builder"
            >
              Repo
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
