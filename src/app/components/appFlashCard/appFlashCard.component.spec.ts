import { TestBed } from "@angular/core/testing";
import { provideRouter } from "@angular/router";
import { FlashCard } from "./appFlashCard.component";
import { Flashcard } from "../../models/flashcard.model";

const closure: Flashcard = {
  id: 25,
  question: "What is a closure?",
  answer: "A function together with access to variables in its surrounding lexical scope.",
  category: "javascript",
  level: "intermediate",
};

const promise: Flashcard = {
  id: 24,
  question: "What does a Promise represent?",
  answer: "The eventual completion or failure of an asynchronous operation.",
  category: "javascript",
  level: "intermediate",
};

describe("FlashCard", () => {
  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [FlashCard],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  afterEach(() => {
    localStorage.clear();
  });

  async function render(card: Flashcard) {
    const fixture = TestBed.createComponent(FlashCard);
    fixture.componentRef.setInput("card", card);
    await fixture.whenStable();
    return fixture;
  }

  function faces(element: HTMLElement) {
    return {
      front: element.querySelector<HTMLElement>(".front")!,
      back: element.querySelector<HTMLElement>(".back")!,
    };
  }

  it("starts on the question, with the answer side hidden from keyboard and screen readers", async () => {
    const fixture = await render(closure);
    const { front, back } = faces(fixture.nativeElement);

    expect(front.hasAttribute("inert")).toBe(false);
    expect(back.hasAttribute("inert")).toBe(true);
    expect(fixture.nativeElement.getAttribute("data-topic")).toBe("javascript");
  });

  it("flips to the answer and back", async () => {
    const fixture = await render(closure);
    const element = fixture.nativeElement as HTMLElement;

    element.querySelector<HTMLButtonElement>(".front .flip-button")!.click();
    await fixture.whenStable();
    expect(faces(element).front.hasAttribute("inert")).toBe(true);
    expect(faces(element).back.hasAttribute("inert")).toBe(false);

    // Keyboard focus follows to the side that's now showing.
    expect(document.activeElement?.textContent).toContain("Show question");

    element.querySelector<HTMLButtonElement>(".back .flip-button")!.click();
    await fixture.whenStable();
    expect(faces(element).front.hasAttribute("inert")).toBe(false);
    expect(document.activeElement?.textContent).toContain("Show answer");
  });

  it("goes back to the question when a different card is shown", async () => {
    const fixture = await render(closure);
    fixture.componentInstance.toggleAnswer();
    await fixture.whenStable();
    expect(fixture.componentInstance.showAnswer()).toBe(true);

    fixture.componentRef.setInput("card", promise);
    await fixture.whenStable();
    expect(fixture.componentInstance.showAnswer()).toBe(false);
  });

  it("can hide the favourite button and full-card link", async () => {
    const fixture = TestBed.createComponent(FlashCard);
    fixture.componentRef.setInput("card", closure);
    fixture.componentRef.setInput("showExtras", false);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector("app-favourite-button")).toBeNull();
    expect(element.querySelector("a")).toBeNull();
  });
});
