import { TestBed } from "@angular/core/testing";
import { provideRouter } from "@angular/router";

import { FavouritesPage } from "./favourites-page";

const STORAGE_KEY = "flashcard_favourites";

describe("FavouritesPage", () => {
  beforeEach(async () => {
    localStorage.clear();

    await TestBed.configureTestingModule({
      imports: [FavouritesPage],
      // Each card row links to the full card, and the empty state links to Study.
      providers: [provideRouter([])],
    }).compileComponents();
  });

  afterEach(() => {
    localStorage.clear();
  });

  async function createPage() {
    const fixture = TestBed.createComponent(FavouritesPage);
    await fixture.whenStable();
    return fixture.nativeElement as HTMLElement;
  }

  it("shows an empty state when nothing is favourited", async () => {
    const page = await createPage();

    expect(page.textContent).toContain("No favourites yet");
    expect(page.querySelectorAll("app-card-row").length).toBe(0);
  });

  it("lists a row for each saved favourite", async () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([1, 2]));

    const page = await createPage();

    expect(page.textContent).toContain("2 cards saved");
    expect(page.querySelectorAll("app-card-row").length).toBe(2);
  });
});
