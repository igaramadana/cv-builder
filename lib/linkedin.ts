export function normalizeLinkedIn(input?: string) {
  const raw = (input ?? "").trim();
  if (!raw) return { url: "", label: "" };

  // URL lengkap
  if (raw.startsWith("http://") || raw.startsWith("https://")) {
    const label = raw.replace(/^https?:\/\//, "").replace(/^www\./, "");
    return { url: raw, label };
  }

  // user isi linkedin.com/...
  if (raw.startsWith("linkedin.com/") || raw.startsWith("www.linkedin.com/")) {
    const url = raw.startsWith("www.") ? `https://${raw}` : `https://www.${raw}`;
    const label = url.replace(/^https?:\/\//, "").replace(/^www\./, "");
    return { url, label };
  }

  // user isi cuma slug/username (mis: "igarama" atau "@igarama")
  const slug = raw.replace(/^@/, "");
  const url = `https://www.linkedin.com/in/${slug}`;
  const label = `linkedin.com/in/${slug}`;
  return { url, label };
}
