import { Card, CardContent, CardHeader } from "@/components/ui/card";

function SkeletonLine({ w = "w-full" }: { w?: string }) {
  return <div className={`h-3 ${w} rounded bg-foreground/10`} />;
}

export default function LoadingBuilder() {
  return (
    <div className="min-h-screen">
      {/* Fake TopBar */}
      <div className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur">
        <div className="p-3 flex items-center justify-between gap-2">
          <div className="h-4 w-28 rounded bg-foreground/10" />
          <div className="flex gap-2">
            <div className="h-8 w-32 rounded bg-foreground/10" />
            <div className="h-8 w-28 rounded bg-foreground/10" />
            <div className="h-8 w-24 rounded bg-foreground/10" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        {/* Editor skeleton */}
        <div className="border-r p-4 space-y-4">
          {[0, 1, 2].map((i) => (
            <Card key={i} className="rounded-2xl">
              <CardHeader>
                <div className="h-4 w-36 rounded bg-foreground/10" />
              </CardHeader>
              <CardContent className="space-y-3">
                <SkeletonLine />
                <SkeletonLine w="w-11/12" />
                <SkeletonLine w="w-10/12" />
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <SkeletonLine />
                  <SkeletonLine />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Preview skeleton */}
        <div className="p-4 bg-muted/30">
          <Card className="rounded-2xl">
            <CardHeader>
              <div className="h-4 w-40 rounded bg-foreground/10" />
            </CardHeader>
            <CardContent className="space-y-3">
              <SkeletonLine w="w-2/3" />
              <SkeletonLine />
              <SkeletonLine w="w-11/12" />
              <SkeletonLine w="w-10/12" />
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="rounded-xl border bg-background p-3 space-y-2">
                  <SkeletonLine w="w-1/2" />
                  <SkeletonLine />
                  <SkeletonLine w="w-10/12" />
                </div>
                <div className="rounded-xl border bg-background p-3 space-y-2">
                  <SkeletonLine w="w-1/2" />
                  <SkeletonLine />
                  <SkeletonLine w="w-10/12" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
