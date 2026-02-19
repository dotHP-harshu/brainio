export function extractJSON(text: string): unknown {
  try {
    return JSON.parse(
      text
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim(),
    );
  } catch {
    return null;
  }
}