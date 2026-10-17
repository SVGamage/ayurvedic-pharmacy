const SINHALA = /[\u0D80-\u0DFF]/;

/**
 * Brand names are often stored bilingually, e.g. "Siddhalepa (සිද්ධාලේප)".
 * Split them so each language gets its own line instead of truncating mid-word.
 */
export function splitBilingualName(name: string): {
  primary: string;
  sinhala?: string;
} {
  const match = name.match(/^(.*?)\s*\(([^)]*)\)\s*$/);
  if (match && SINHALA.test(match[2])) {
    return { primary: match[1].trim(), sinhala: match[2].trim() };
  }
  return { primary: name.trim() };
}

/** One or two initials for a typographic brand tile when there's no logo. */
export function brandInitials(name: string): string {
  const words = splitBilingualName(name)
    .primary.replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter(Boolean);
  return words
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}
