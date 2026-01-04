"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MobileTabs({
  editor,
  preview,
}: {
  editor: React.ReactNode;
  preview: React.ReactNode;
}) {
  return (
    <div className="h-[calc(100vh-56px)]">
      <Tabs defaultValue="editor" className="h-full">
        <div className="sticky top-[56px] z-10 border-b bg-background/80 backdrop-blur">
          <div className="p-3">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="editor">Editor</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
          </div>
        </div>

        <TabsContent value="editor" className="h-[calc(100vh-56px-56px)] overflow-y-auto p-4 m-0">
          {editor}
        </TabsContent>

        <TabsContent value="preview" className="h-[calc(100vh-56px-56px)] overflow-y-auto p-4 m-0 bg-muted/30">
          {preview}
        </TabsContent>
      </Tabs>
    </div>
  );
}
