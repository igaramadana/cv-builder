import { create } from "zustand";
import { ResumeData, ResumeSchema, defaultResume, SectionId } from "../resumeSchema";

const STORAGE_KEY = "cv_builder_resume_v1";

function safeId() {
  return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

function clampZoom(z: number) {
  const rounded = Math.round(z);
  return Math.max(60, Math.min(140, rounded));
}

type ResumeState = {
  data: ResumeData;
  hydrated: boolean;

  hydrate: () => void;
  setData: (updater: (prev: ResumeData) => ResumeData) => void;

  loadFromJson: (raw: unknown) => { ok: true } | { ok: false; error: string };
  reset: () => void;

  addExperience: () => void;
  updateExperience: (id: string, patch: Partial<ResumeData["experience"][number]>) => void;
  removeExperience: (id: string) => void;

  addEducation: () => void;
  updateEducation: (id: string, patch: Partial<ResumeData["education"][number]>) => void;
  removeEducation: (id: string) => void;

  addSkill: (skill: string) => { ok: true } | { ok: false; error: string };
  removeSkill: (skill: string) => void;

  setSectionOrder: (order: SectionId[]) => void;
  setTemplate: (t: "one" | "two") => void;

  // ✅ STEP 4: zoom setter
  setZoom: (z: number) => void;
};

export const useResumeStore = create<ResumeState>((set, get) => ({
  data: defaultResume,
  hydrated: false,

  hydrate: () => {
    if (get().hydrated) return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        set({ hydrated: true });
        return;
      }
      const parsedJson = JSON.parse(raw);
      const parsed = ResumeSchema.safeParse(parsedJson);
      if (parsed.success) set({ data: parsed.data, hydrated: true });
      else set({ hydrated: true });
    } catch {
      set({ hydrated: true });
    }
  },

  setData: (updater) => {
    set((s) => {
      const next = updater(s.data);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return { data: next };
    });
  },

  loadFromJson: (raw) => {
    const parsed = ResumeSchema.safeParse(raw);
    if (!parsed.success) {
      return { ok: false, error: parsed.error.issues.map((i) => i.message).join(", ") };
    }
    set({ data: parsed.data });
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed.data));
    } catch {}
    return { ok: true };
  },

  reset: () => {
    set({ data: defaultResume });
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultResume));
    } catch {}
  },

  addExperience: () => {
    get().setData((prev) => ({
      ...prev,
      experience: [
        {
          id: safeId(),
          company: "PT Maju Jaya",
          role: "Software Engineer",
          start: "",
          end: "",
          location: "",
          highlights: [""],
        },
        ...prev.experience,
      ],
    }));
  },

  updateExperience: (id, patch) => {
    get().setData((prev) => ({
      ...prev,
      experience: prev.experience.map((x) => (x.id === id ? { ...x, ...patch } : x)),
    }));
  },

  removeExperience: (id) => {
    get().setData((prev) => ({
      ...prev,
      experience: prev.experience.filter((x) => x.id !== id),
    }));
  },

  addEducation: () => {
    get().setData((prev) => ({
      ...prev,
      education: [
        {
          id: safeId(),
          school: "Universitas Indonesia",
          degree: "S1 Teknik Informatika",
          start: "",
          end: "",
          location: "",
          details: "",
        },
        ...prev.education,
      ],
    }));
  },

  updateEducation: (id, patch) => {
    get().setData((prev) => ({
      ...prev,
      education: prev.education.map((x) => (x.id === id ? { ...x, ...patch } : x)),
    }));
  },

  removeEducation: (id) => {
    get().setData((prev) => ({
      ...prev,
      education: prev.education.filter((x) => x.id !== id),
    }));
  },

  addSkill: (skill) => {
    const cleaned = skill.trim();
    if (!cleaned) return { ok: false, error: "Skill kosong." };
    const exists = get().data.skills.some((s) => s.toLowerCase() === cleaned.toLowerCase());
    if (exists) return { ok: false, error: "Skill sudah ada." };

    get().setData((prev) => ({ ...prev, skills: [...prev.skills, cleaned] }));
    return { ok: true };
  },

  removeSkill: (skill) => {
    get().setData((prev) => ({ ...prev, skills: prev.skills.filter((s) => s !== skill) }));
  },

  setSectionOrder: (order) => {
    get().setData((prev) => ({ ...prev, sectionOrder: order }));
  },

  setTemplate: (t) => {
    get().setData((prev) => ({ ...prev, template: t }));
  },

  // ✅ STEP 4: implement zoom
  setZoom: (z) => {
    const clamped = clampZoom(z);
    get().setData((prev) => ({ ...prev, zoom: clamped }));
  },
}));
