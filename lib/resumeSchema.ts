import { z } from "zod";

export const SectionIdSchema = z.enum(["summary", "experience", "education", "skills"]);
export type SectionId = z.infer<typeof SectionIdSchema>;

export const ResumeSchema = z.object({
  basics: z.object({
    fullName: z.string().min(1),
    title: z.string().optional().default(""),
    email: z.string().optional().default(""),
    phone: z.string().optional().default(""),
    location: z.string().optional().default(""),
    summary: z.string().optional().default(""),
    links: z.array(z.object({ label: z.string(), url: z.string() })).default([]),

    // foto base64/dataURL
    photo: z.string().optional().default(""),
  }),

  experience: z
    .array(
      z.object({
        id: z.string(),
        company: z.string().default(""),
        role: z.string().default(""),
        start: z.string().optional().default(""), // ISO string
        end: z.string().optional().default(""),   // ISO string
        location: z.string().optional().default(""),
        highlights: z.array(z.string()).default([]),
      })
    )
    .default([]),

  education: z
    .array(
      z.object({
        id: z.string(),
        school: z.string().default(""),
        degree: z.string().optional().default(""),
        start: z.string().optional().default(""), // ISO string
        end: z.string().optional().default(""),   // ISO string
        location: z.string().optional().default(""),
        details: z.string().optional().default(""),
      })
    )
    .default([]),

  skills: z.array(z.string()).default([]),

  sectionOrder: z.array(SectionIdSchema).default(["summary", "experience", "education", "skills"]),
  template: z.enum(["one", "two"]).default("one"),

  // ✅ STEP 4: zoom untuk preview (60–140)
  zoom: z.number().min(60).max(140).default(100),
});

export type ResumeData = z.infer<typeof ResumeSchema>;

export const defaultResume: ResumeData = {
  basics: {
    fullName: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    summary: "",
    links: [],
    photo: "",
  },
  experience: [],
  education: [],
  skills: [],
  sectionOrder: ["summary", "experience", "education", "skills"],
  template: "one",

  // ✅ STEP 4 default zoom
  zoom: 100,
};
