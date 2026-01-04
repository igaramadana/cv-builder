// app/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/mode-toggle";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Top Nav */}
      <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <Link href="/" className="font-semibold tracking-tight">
            Buat CV
          </Link>

          <nav className="flex items-center gap-2">
            <ModeToggle />
            <Link href="/builder">
              <Button size="sm">Open Builder</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pt-14 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">Next.js 16</Badge>
              <Badge variant="secondary">shadcn/ui</Badge>
              <Badge variant="secondary">Live Preview</Badge>
              <Badge variant="secondary">Export PDF</Badge>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
              Buat yang gabisa ngedit CV bisa pake ini
            </h1>

            <p className="text-muted-foreground text-base md:text-lg leading-7">
              Edit data di sisi kiri, lihat hasilnya langsung di sisi kanan. Susun ulang section dengan drag & drop,
              simpan sebagai JSON, lalu export ke PDF via print-to-PDF.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link href="/builder">
                <Button size="lg">Mulai Buat CV</Button>
              </Link>
              <a href="#features">
                <Button size="lg" variant="outline">
                  Lihat Fitur
                </Button>
              </a>
            </div>

            <div className="text-sm text-muted-foreground">
              Tanpa login untuk MVP • Autosave ke browser (localStorage)
            </div>
          </div>

          {/* Mock Preview */}
          <Card className="rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>Contoh tampilan CV (mock)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-xl border bg-muted/30 p-6 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2">
                    <div className="h-5 w-56 bg-foreground/10 rounded" />
                    <div className="h-4 w-40 bg-foreground/10 rounded" />
                  </div>
                  <div className="space-y-2 text-right">
                    <div className="h-3 w-28 bg-foreground/10 rounded ml-auto" />
                    <div className="h-3 w-32 bg-foreground/10 rounded ml-auto" />
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="h-3 w-24 bg-foreground/10 rounded" />
                  <div className="h-3 w-full bg-foreground/10 rounded" />
                  <div className="h-3 w-11/12 bg-foreground/10 rounded" />
                  <div className="h-3 w-10/12 bg-foreground/10 rounded" />
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="rounded-lg border bg-background p-3 space-y-2">
                    <div className="h-3 w-20 bg-foreground/10 rounded" />
                    <div className="h-3 w-full bg-foreground/10 rounded" />
                    <div className="h-3 w-10/12 bg-foreground/10 rounded" />
                  </div>
                  <div className="rounded-lg border bg-background p-3 space-y-2">
                    <div className="h-3 w-20 bg-foreground/10 rounded" />
                    <div className="h-3 w-full bg-foreground/10 rounded" />
                    <div className="h-3 w-10/12 bg-foreground/10 rounded" />
                  </div>
                </div>

                <div className="pt-2">
                  <Link href="/builder">
                    <Button className="w-full" variant="secondary">
                      Open Builder
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Fitur utama</h2>
            <p className="text-muted-foreground">
              Fokus ke yang penting: nulis konten dan hasil yang terlihat profesional.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {[
            {
              title: "Live preview",
              desc: "Perubahan langsung terlihat. Nggak perlu bolak-balik render.",
            },
            {
              title: "Drag & drop section",
              desc: "Atur urutan Summary/Experience/Education/Skills sesuai kebutuhan.",
            },
            {
              title: "Autosave di browser",
              desc: "Data tersimpan otomatis ke localStorage tiap perubahan.",
            },
            {
              title: "Template 1 & 2",
              desc: "Pilih gaya klasik atau modern dua kolom.",
            },
            {
              title: "Import/Export JSON",
              desc: "Simpan versi CV kamu sebagai file, lalu load kapan saja.",
            },
            {
              title: "Export PDF",
              desc: "Gunakan Print-to-PDF untuk hasil teks tetap selectable.",
            },
          ].map((f) => (
            <Card key={f.title} className="rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg">{f.title}</CardTitle>
                <CardDescription>{f.desc}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Cara pakai</CardTitle>
            <CardDescription>3 langkah simpel</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  step: "1",
                  title: "Isi data",
                  desc: "Tambahkan pengalaman, pendidikan, dan skills.",
                },
                {
                  step: "2",
                  title: "Atur layout",
                  desc: "Drag & drop urutan section, pilih template.",
                },
                {
                  step: "3",
                  title: "Export",
                  desc: "Download JSON untuk backup atau export PDF.",
                },
              ].map((s) => (
                <div key={s.step} className="rounded-xl border p-4 bg-muted/20">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-foreground text-background flex items-center justify-center text-sm font-semibold">
                      {s.step}
                    </div>
                    <div className="font-medium">{s.title}</div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2 leading-6">{s.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/builder">
                <Button size="lg">Coba Sekarang</Button>
              </Link>
              <Link href="/builder">
                <Button size="lg" variant="outline">
                  Lihat Template
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Templates teaser */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Template</h2>
            <p className="text-muted-foreground">Dua gaya yang berbeda untuk kebutuhan berbeda.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Template 1</CardTitle>
              <CardDescription>Klasik, bersih, cocok untuk hampir semua role.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="rounded-xl border bg-muted/30 p-4 space-y-2">
                <div className="h-3 w-40 bg-foreground/10 rounded" />
                <div className="h-3 w-64 bg-foreground/10 rounded" />
                <div className="h-3 w-52 bg-foreground/10 rounded" />
              </div>
              <Link href="/builder">
                <Button variant="outline" className="w-full">Pakai Template 1</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Template 2</CardTitle>
              <CardDescription>Modern dua kolom, rapi untuk skills + summary.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="rounded-xl border bg-muted/30 p-4 grid grid-cols-3 gap-3">
                <div className="col-span-1 space-y-2">
                  <div className="h-3 w-full bg-foreground/10 rounded" />
                  <div className="h-3 w-10/12 bg-foreground/10 rounded" />
                  <div className="h-3 w-11/12 bg-foreground/10 rounded" />
                </div>
                <div className="col-span-2 space-y-2">
                  <div className="h-3 w-3/4 bg-foreground/10 rounded" />
                  <div className="h-3 w-full bg-foreground/10 rounded" />
                  <div className="h-3 w-11/12 bg-foreground/10 rounded" />
                </div>
              </div>
              <Link href="/builder">
                <Button variant="outline" className="w-full">Pakai Template 2</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>FAQ</CardTitle>
            <CardDescription>Yang sering ditanyain</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="font-medium">PDF-nya bisa selectable text?</div>
              <p className="text-sm text-muted-foreground mt-1 leading-6">
                Ya. Export PDF menggunakan Print-to-PDF dari browser, jadi teks tetap bisa di-copy.
              </p>
            </div>
            <Separator />
            <div>
              <div className="font-medium">Data CV disimpan di mana?</div>
              <p className="text-sm text-muted-foreground mt-1 leading-6">
                Untuk MVP, autosave ke localStorage di browser kamu. Kamu juga bisa download/upload JSON.
              </p>
            </div>
            <Separator />
            <div>
              <div className="font-medium">Bisa share link CV?</div>
              <p className="text-sm text-muted-foreground mt-1 leading-6">
                Belum di MVP. Kalau mau, next step-nya: simpan JSON ke DB + generate public share URL.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 pt-2 pb-14">
        <Card className="rounded-2xl bg-muted/30">
          <CardContent className="p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-xl font-semibold">Siap bikin CV kamu sekarang?</div>
              <div className="text-sm text-muted-foreground">
                Mulai dari template, isi data, lalu export.
              </div>
            </div>
            <Link href="/builder">
              <Button size="lg">Open Builder</Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-muted-foreground flex flex-col md:flex-row gap-2 md:items-center md:justify-between">
          <div>© {new Date().getFullYear()} Igaramadana</div>
          <div className="flex gap-3">
            <Link className="hover:underline" href="/builder">
              Builder
            </Link>
            <a className="hover:underline" href="#features">
              Fitur
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
