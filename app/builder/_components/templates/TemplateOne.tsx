import type { ResumeData, SectionId } from "@/lib/resumeSchema";
import { formatRange } from "@/lib/formatDate";
import { normalizeLinkedIn } from "@/lib/linkedin";
import { Linkedin } from "lucide-react";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-sm font-semibold tracking-wide uppercase">{children}</h2>;
}

export default function TemplateOne({ data }: { data: ResumeData }) {
  const { basics, sectionOrder } = data;
  const li = normalizeLinkedIn(basics.linkedin);

  return (
    <div className="bg-background text-foreground border rounded-xl shadow-sm p-8 max-w-[850px] mx-auto">
      <header className="mb-6">
        <div className="flex items-start justify-between gap-4">
          {/* kiri: foto + nama */}
          <div className="flex items-start gap-4">
            {basics.photo ? (
              <img
                src={basics.photo}
                alt="Foto profil"
                className="h-16 w-16 rounded-lg object-cover border"
              />
            ) : null}

            <div>
              <h1 className="text-3xl font-bold">{basics.fullName}</h1>
              {basics.title ? <div className="text-neutral-600 mt-1">{basics.title}</div> : null}
            </div>
          </div>

          {/* kanan: kontak */}
          <div className="text-right text-sm text-neutral-600">
            {[basics.email, basics.phone, basics.location].filter(Boolean).map((x) => (
              <div key={x as string}>{x}</div>
            ))}

            {li.url ? (
              <div className="mt-2 flex items-center justify-end gap-1 text-xs text-neutral-600">
                <Linkedin className="h-4 w-4" />
                <a className="hover:underline" href={li.url} target="_blank" rel="noreferrer">
                  {li.label}
                </a>
              </div>
            ) : null}
          </div>
        </div>

        {/* legacy links array (kalau masih dipakai) */}
        {basics.links?.length ? (
          <div className="mt-3 text-sm text-neutral-600">
            {basics.links.map((l) => (
              <span key={l.url} className="mr-3">
                {l.label}: {l.url}
              </span>
            ))}
          </div>
        ) : null}
      </header>

      <main className="space-y-6">
        {sectionOrder.map((sec) => renderSection(sec, data))}
      </main>
    </div>
  );
}

function renderSection(sec: SectionId, data: ResumeData) {
  if (sec === "summary" && data.basics.summary) {
    return (
      <section key={sec} className="space-y-2">
        <SectionTitle>Summary</SectionTitle>
        <p className="text-sm leading-6 whitespace-pre-wrap">{data.basics.summary}</p>
      </section>
    );
  }

  if (sec === "experience" && data.experience.length) {
    return (
      <section key={sec} className="space-y-2">
        <SectionTitle>Experience</SectionTitle>
        <div className="space-y-4">
          {data.experience.map((x) => {
            const range = formatRange(x.start, x.end, "Sekarang");
            return (
              <div key={x.id}>
                <div className="flex items-baseline justify-between gap-3">
                  <div className="font-medium">
                    {x.role} — <span className="text-neutral-600">{x.company}</span>
                  </div>
                  {range ? <div className="text-xs text-neutral-600">{range}</div> : null}
                </div>
                {x.location ? <div className="text-xs text-neutral-600 mt-0.5">{x.location}</div> : null}
                {x.highlights?.filter(Boolean).length ? (
                  <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
                    {x.highlights.filter(Boolean).map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  if (sec === "education" && data.education.length) {
    return (
      <section key={sec} className="space-y-2">
        <SectionTitle>Education</SectionTitle>
        <div className="space-y-3">
          {data.education.map((x) => {
            const range = formatRange(x.start, x.end, "Sekarang");
            return (
              <div key={x.id}>
                <div className="flex items-baseline justify-between gap-3">
                  <div className="font-medium">
                    {x.school}
                    {x.degree ? <span className="text-neutral-600"> — {x.degree}</span> : null}
                  </div>
                  {range ? <div className="text-xs text-neutral-600">{range}</div> : null}
                </div>
                {x.location ? <div className="text-xs text-neutral-600 mt-0.5">{x.location}</div> : null}
                {x.details ? <div className="text-sm mt-1 whitespace-pre-wrap">{x.details}</div> : null}
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  if (sec === "skills" && data.skills.length) {
    return (
      <section key={sec} className="space-y-2">
        <SectionTitle>Skills</SectionTitle>
        <div className="text-sm">{data.skills.join(" • ")}</div>
      </section>
    );
  }

  return null;
}
