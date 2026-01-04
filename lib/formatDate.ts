const MONTHS = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

export function formatMonth(date?: string) {
  if (!date) return "";
  try {
    const d = new Date(date);
    const m = d.getUTCMonth();
    const y = d.getUTCFullYear();
    return `${MONTHS[m]} ${y}`;
  } catch {
    return "";
  }
}

export function formatRange(start?: string, end?: string, presentLabel = "Sekarang") {
  const s = formatMonth(start);
  const e = end ? formatMonth(end) : "";
  const right = e || (s ? presentLabel : "");
  return [s, right].filter(Boolean).join(" - ");
}

