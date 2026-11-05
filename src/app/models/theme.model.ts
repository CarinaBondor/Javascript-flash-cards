export type ThemeMode = "system" | "light" | "dark";

export const THEME_MODES: readonly ThemeMode[] = ["system", "light", "dark"];

// Also used by the inline script in src/index.html. Keep the two in sync.
export const THEME_STORAGE_KEY = "flashcard_theme";

// A type guard: if this returns true, TypeScript treats `value` as ThemeMode afterwards.
export function isThemeMode(value: unknown): value is ThemeMode {
  return typeof value === "string" && (THEME_MODES as readonly string[]).includes(value);
}
