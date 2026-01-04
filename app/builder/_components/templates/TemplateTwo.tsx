import type { ResumeData, SectionId } from "@/lib/resumeSchema";
import { formatRange } from "@/lib/formatDate";

export default function TemplateTwo({ data }: { data: ResumeData }) {
  const { basics, sectionOrder } = data;

  return (
    <div className="bg-background text-foreground border rounded-xl shadow-sm p-8 max-w-[900px] mx-auto">
      <header className="mb-6">
  <div className="flex items-start gap-4">
    {basics.photo ? (
      <img
        src={basics.photo}
        alt="Profile"
        className="h-14 w-14 rounded-lg object-cover border"
      />
    ) : null}

    <div className="min-w-0">
      <h1 className="text-3xl font-bold">{basics.fullName}</h1>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground mt-1">
        {basics.title ? <span>{basics.title}</span> : null}
        {[basics.location, basics.email, basics.phone].filter(Boolean).map((x) => (
          <span key={x as string}>{x}</span>
        ))}
      </div>
    </div>
  </div>
</header>


      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <aside className="md:col-span-1 space-y-5">
          {data.skills.length ? (
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide mb-2">Skills</div>
              <div className="text-sm leading-6">{data.skills.join(", ")}</div>
            </div>
          ) : null}

          {basics.summary ? (
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide mb-2">Summary</div>
              <div className="text-sm leading-6 whitespace-pre-wrap">{basics.summary}</div>
            </div>
          ) : null}
        </aside>

        <main className="md:col-span-2 space-y-6">
          {sectionOrder
            .filter((s) => s !== "skills" && s !== "summary")
            .map((sec) => renderMain(sec, data))}
        </main>
      </div>
    </div>
  );
}

function renderMain(sec: SectionId, data: ResumeData) {
  if (sec === "experience" && data.experience.length) {
    return (
      <section key={sec} className="space-y-3">
        <div className="text-xs font-semibold uppercase tracking-wide">Experience</div>

        {data.experience.map((x) => {
          const range = formatRange(x.start, x.end);

          return (
            <div key={x.id} className="border-l pl-4">
              <div className="flex items-baseline justify-between gap-3">
                <div className="font-medium">{x.role}</div>
                {range ? <div className="text-xs text-muted-foreground">{range}</div> : null}
              </div>

              <div className="text-sm text-muted-foreground">
                {x.company}
                {x.location ? ` • ${x.location}` : ""}
              </div>

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
      </section>
    );
  }

  if (sec === "education" && data.education.length) {
    return (
      <section key={sec} className="space-y-3">
        <div className="text-xs font-semibold uppercase tracking-wide">Education</div>

        {data.education.map((x) => {
          const range = formatRange(x.start, x.end);

          return (
            <div key={x.id} className="border-l pl-4">
              <div className="flex items-baseline justify-between gap-3">
                <div className="font-medium">{x.school}</div>
                {range ? <div className="text-xs text-muted-foreground">{range}</div> : null}
              </div>

              <div className="text-sm text-muted-foreground">
                {x.degree ?? ""}
                {x.location ? ` • ${x.location}` : ""}
              </div>

              {x.details ? <div className="text-sm mt-2 whitespace-pre-wrap">{x.details}</div> : null}
            </div>
          );
        })}
      </section>
    );
  }

  return null;
}
