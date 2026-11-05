import { TestBed } from "@angular/core/testing";
import { provideRouter } from "@angular/router";
import { DecksPage } from "./decks-page";

describe("DecksPage", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DecksPage],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it("links to each topic deck and the shuffled deck", async () => {
    const fixture = TestBed.createComponent(DecksPage);
    await fixture.whenStable();
    const links = [...(fixture.nativeElement as HTMLElement).querySelectorAll("a.deck")];

    expect(links.map((link) => link.getAttribute("href"))).toEqual([
      "/study/angular",
      "/study/javascript",
      "/study/typescript",
      "/study",
    ]);
  });

  it("only lists the levels a deck actually has", () => {
    const fixture = TestBed.createComponent(DecksPage);
    const levels = fixture.componentInstance.decks.map((deck) => deck.levels);

    expect(levels.every((text) => !text.includes("0 "))).toBe(true);
    expect(levels.every((text) => !text.includes("advanced"))).toBe(true);
  });
});
