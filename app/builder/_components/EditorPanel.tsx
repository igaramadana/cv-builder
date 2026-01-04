"use client";

import SectionOrder from "./editors/SectionOrder";
import PhotoUploader from "./editors/PhotoUploader";
import BasicsEditor from "./editors/BasicsEditor";
import ExperienceEditor from "./editors/ExperienceEditor";
import EducationEditor from "./editors/EducationEditor";
import SkillsEditor from "./editors/SkillsEditor";

export default function EditorPanel() {
  return (
    <div className="space-y-4">
      <SectionOrder />
      <PhotoUploader />
      <BasicsEditor />
      <ExperienceEditor />
      <EducationEditor />
      <SkillsEditor />
    </div>
  );
}
