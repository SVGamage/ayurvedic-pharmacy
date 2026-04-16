import sanitizeHtml from "sanitize-html";

const ALLOWED_RICH_TEXT_TAGS = [
  "p",
  "br",
  "strong",
  "em",
  "b",
  "i",
  "h2",
  "h3",
  "ul",
  "ol",
  "li",
  "blockquote",
] as const;

export function sanitizeRichText(html?: string): string {
  if (!html) {
    return "";
  }

  return sanitizeHtml(html, {
    allowedTags: [...ALLOWED_RICH_TEXT_TAGS],
    allowedAttributes: {},
    disallowedTagsMode: "discard",
    transformTags: {
      b: "strong",
      i: "em",
    },
  });
}

export function hasVisibleRichTextContent(html?: string): boolean {
  if (!html) {
    return false;
  }

  return html.replace(/<[^>]*>/g, "").trim().length > 0;
}

export function getRichTextPreview(
  html?: string,
  maxLength = 120,
  suffix = "....",
): string {
  const sanitized = sanitizeRichText(html);
  if (!sanitized) {
    return "";
  }

  const plainText = sanitized
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!plainText) {
    return "";
  }

  if (plainText.length <= maxLength) {
    return plainText;
  }

  return `${plainText.slice(0, maxLength).trimEnd()}${suffix}`;
}
