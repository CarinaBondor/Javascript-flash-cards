import { DOCUMENT, Injectable, effect, inject, signal } from "@angular/core";
import { THEME_STORAGE_KEY, ThemeMode, isThemeMode } from "../../models/theme.model";

@Injectable({ providedIn: "root" })
export class ThemeService {
  private readonly document = inject(DOCUMENT);

  // Private and writable: only this service can change the mode.
  private readonly modeState = signal<ThemeMode>(this.loadFromStorage());

  // Public and read-only: components can read mode() but can't call .set() on it.
  readonly mode = this.modeState.asReadonly();

  setMode(mode: ThemeMode): void {
    if (mode === this.modeState()) {
      return;
    }

    // Without View Transitions (older browsers, tests) or with reduced motion: switch instantly.
    if (!this.document.startViewTransition || this.prefersReducedMotion()) {
      this.modeState.set(mode);
      return;
    }

    // The browser snapshots the page, runs this callback, then cross-fades old to new.
    // The callback must change the DOM synchronously, so apply the attribute here rather
    // than waiting for the effect (which runs later). The effect then re-applies the same
    // value and saves it, which is harmless.
    this.document.startViewTransition(() => {
      this.modeState.set(mode);
      this.applyToPage(mode);
    });
  }

  private prefersReducedMotion(): boolean {
    // matchMedia is missing in some environments (like the jsdom used by tests), hence `?.`.
    return (
      this.document.defaultView?.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false
    );
  }

  private loadFromStorage(): ThemeMode {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      return isThemeMode(saved) ? saved : "system";
    } catch {
      // Storage can be blocked (private windows, strict browser settings). Fall back quietly.
      return "system";
    }
  }

  constructor() {
    // Runs once at startup, then again every time mode() changes.
    effect(() => {
      const mode = this.mode();
      this.applyToPage(mode);
      this.saveToStorage(mode);
    });
  }

  private applyToPage(mode: ThemeMode): void {
    const html = this.document.documentElement;
    if (mode === "system") {
      html.removeAttribute("data-theme");
    } else {
      html.setAttribute("data-theme", mode);
    }
  }

  private saveToStorage(mode: ThemeMode): void {
    try {
      // "system" is the default, so there's nothing to remember.
      if (mode === "system") {
        localStorage.removeItem(THEME_STORAGE_KEY);
      } else {
        localStorage.setItem(THEME_STORAGE_KEY, mode);
      }
    } catch {
      // Not being able to save a preference isn't worth breaking the app over.
    }
  }
}
