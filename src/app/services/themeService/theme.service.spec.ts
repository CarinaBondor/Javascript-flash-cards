import { TestBed } from "@angular/core/testing";
import { ThemeService } from "./theme.service";
import { THEME_STORAGE_KEY } from "../../models/theme.model";

describe("ThemeService", () => {
  const html = document.documentElement;

  beforeEach(() => {
    localStorage.clear();
  });

  // jsdom is shared between spec files, so leave <html> and storage as you found them.
  afterEach(() => {
    localStorage.clear();
    html.removeAttribute("data-theme");
  });

  it("follows the system by default", () => {
    const service = TestBed.inject(ThemeService);
    TestBed.tick(); // runs pending effects

    expect(service.mode()).toBe("system");
    expect(html.hasAttribute("data-theme")).toBe(false);
  });

  it("applies and remembers a chosen mode", () => {
    const service = TestBed.inject(ThemeService);

    service.setMode("dark");
    TestBed.tick();

    expect(html.getAttribute("data-theme")).toBe("dark");
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("dark");
  });

  it("forgets the saved mode when switching back to system", () => {
    const service = TestBed.inject(ThemeService);
    service.setMode("light");
    TestBed.tick();

    service.setMode("system");
    TestBed.tick();

    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBeNull();
    expect(html.hasAttribute("data-theme")).toBe(false);
  });

  it("loads the saved mode on start", () => {
    localStorage.setItem(THEME_STORAGE_KEY, "light");

    const service = TestBed.inject(ThemeService);
    TestBed.tick();

    expect(service.mode()).toBe("light");
    expect(html.getAttribute("data-theme")).toBe("light");
  });

  it("ignores a stored value it doesn't recognise", () => {
    localStorage.setItem(THEME_STORAGE_KEY, "purple");

    expect(TestBed.inject(ThemeService).mode()).toBe("system");
  });

  describe("with View Transitions available", () => {
    // jsdom has no startViewTransition, so add a fake that runs the callback straight away.
    const startViewTransition = vi.fn((update: () => void) => {
      update();
      return {} as ViewTransition;
    });

    beforeEach(() => {
      startViewTransition.mockClear();
      document.startViewTransition =
        startViewTransition as unknown as Document["startViewTransition"];
    });

    afterEach(() => {
      delete (document as Partial<Document>).startViewTransition;
    });

    it("switches inside a view transition, so the change cross-fades", () => {
      const service = TestBed.inject(ThemeService);

      service.setMode("dark");

      expect(startViewTransition).toHaveBeenCalledTimes(1);
      // Applied synchronously inside the callback, before any effect runs.
      expect(html.getAttribute("data-theme")).toBe("dark");
    });

    it("doesn't start a transition when the mode is unchanged", () => {
      const service = TestBed.inject(ThemeService);

      service.setMode("system");

      expect(startViewTransition).not.toHaveBeenCalled();
    });
  });
});
