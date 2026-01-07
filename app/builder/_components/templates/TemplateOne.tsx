import type { ResumeData, SectionId } from "@/lib/resumeSchema";
import { formatRange } from "@/lib/formatDate";
import { normalizeLinkedIn } from "@/lib/linkedin";

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-5">
      <div className="flex items-end gap-3">
        <h2 className="text-[14px] font-bold text-black">{children}</h2>
        <div className="flex-1 border-b border-black/60 mb-[2px]" />
      </div>
    </div>
  );
}

function ContactLine({ basics }: { basics: ResumeData["basics"] }) {
  const li = normalizeLinkedIn(basics.linkedin);

  const parts: Array<{ label: string; url?: string }> = [];

  if (basics.phone) parts.push({ label: basics.phone });
  if (basics.email) parts.push({ label: basics.email });
  if (li.url) parts.push({ label: li.label, url: li.url });

  return (
    <div className="text-[11px] leading-4 text-black/80">
      {parts.map((p, idx) => (
        <span key={`${p.label}-${idx}`}>
          {p.url ? (
            <a href={p.url} target="_blank" rel="noreferrer" className="underline underline-offset-2">
              {p.label}
            </a>
          ) : (
            p.label
          )}
          {idx < parts.length - 1 ? <span className="mx-2">|</span> : null}
        </span>
      ))}
    </div>
  );
}

export default function TemplateOne({ data }: { data: ResumeData }) {
  const { basics, sectionOrder } = data;

  return (
    <div className="resume-page bg-white text-black max-w-[900px] mx-auto p-8">
      {/* HEADER */}
      <header className="flex gap-4 items-start">
        {/* FOTO */}
        <div className="shrink-0">
          {basics.photo ? (
            <img
              src={basics.photo}
              alt="Foto profil"
              className="w-[92px] h-[112px] object-cover border border-black/30"
            />
          ) : (
            <div className="w-[92px] h-[112px] border border-black/30" />
          )}
        </div>

        {/* IDENTITAS */}
        <div className="flex-1">
          <h1 className="text-[22px] font-extrabold tracking-wide uppercase leading-tight">
            {basics.fullName}
          </h1>

          <div className="mt-1">
            <ContactLine basics={basics} />
          </div>

          {/* baris alamat / link tambahan (seperti contoh ada alamat panjang) */}
          {(basics.location || basics.title) ? (
            <div className="mt-1 text-[11px] leading-4 text-black/75">
              {[basics.title, basics.location].filter(Boolean).join(" • ")}
            </div>
          ) : null}

          {/* SUMMARY (paragraf di bawah identitas) */}
          {basics.summary ? (
            <p className="mt-2 text-[11px] leading-[16px] text-black/85 whitespace-pre-wrap">
              {basics.summary}
            </p>
          ) : null}
        </div>
      </header>

      {/* SECTIONS */}
      <main className="mt-4">
        {sectionOrder.map((sec) => renderSection(sec, data))}
      </main>
    </div>
  );
}

function renderSection(sec: SectionId, data: ResumeData) {
  if (sec === "experience" && data.experience.length) {
    return (
      <section key={sec}>
        <SectionHeading>Work Experiences</SectionHeading>

        <div className="mt-2 space-y-3">
          {data.experience.map((x) => {
            const range = formatRange(x.start, x.end, "Present");
            return (
              <div key={x.id}>
                {/* baris 1: company + location (kiri), range (kanan) */}
                <div className="flex items-baseline justify-between gap-4">
                  <div className="text-[12px] leading-4">
                    <span className="font-bold">{x.company}</span>
                    {x.location ? <span className="text-black/60"> · {x.location}</span> : null}
                  </div>
                  {range ? <div className="text-[11px] text-black/70">{range}</div> : null}
                </div>

                {/* baris 2: role italic */}
                {x.role ? (
                  <div className="text-[11px] italic text-black/70 mt-0.5">{x.role}</div>
                ) : null}

                {/* deskripsi / highlights */}
                {x.highlights?.filter(Boolean).length ? (
                  <div className="mt-1 text-[11px] leading-[16px] text-black/75">
                    {/* di contoh, experience deskripsi berupa paragraf bukan bullet */}
                    {x.highlights.filter(Boolean).slice(0, 1).map((h, i) => (
                      <p key={i} className="whitespace-pre-wrap">{h}</p>
                    ))}
                  </div>
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
      <section key={sec}>
        <SectionHeading>Education Level</SectionHeading>

        <div className="mt-2 space-y-3">
          {data.education.map((x) => {
            const range = formatRange(x.start, x.end, "Present");
            return (
              <div key={x.id}>
                <div className="flex items-baseline justify-between gap-4">
                  <div className="text-[12px] leading-4">
                    <span className="font-bold">{x.school}</span>
                    {x.location ? <span className="text-black/60"> · {x.location}</span> : null}
                  </div>
                  {range ? <div className="text-[11px] text-black/70">{range}</div> : null}
                </div>

                {x.degree ? (
                  <div className="text-[11px] italic text-black/70 mt-0.5">{x.degree}</div>
                ) : null}

                {x.details ? (
                  <div className="mt-1 text-[11px] leading-[16px] text-black/75 whitespace-pre-wrap">
                    {x.details}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  if (sec === "skills" && data.skills.length) {
    return (
      <section key={sec}>
        <SectionHeading>Skills, Achievements &amp; Other Experience</SectionHeading>

        <ul className="mt-2 list-disc pl-5 space-y-1">
          {data.skills.map((s) => {
            // support format: "Judul: deskripsi...."
            const [head, ...rest] = s.split(":");
            const tail = rest.join(":").trim();

            return (
              <li key={s} className="text-[11px] leading-[16px] text-black/85">
                {tail ? (
                  <>
                    <span className="font-bold">{head.trim()}</span>
                    <span>: {tail}</span>
                  </>
                ) : (
                  <span className="font-bold">{head.trim()}</span>
                )}
              </li>
            );
          })}
        </ul>
      </section>
    );
  }

  // summary udah ditaruh di header biar mirip contoh gambar
  return null;
}
