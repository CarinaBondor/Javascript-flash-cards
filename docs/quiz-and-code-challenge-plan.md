# Build plan: Quiz and Code Challenge

Two features, built in small milestones. Each milestone names the **Angular concept it teaches**, what "done" looks like, and hints if you get stuck. There's no finished code in here on purpose: try it first, then read the hint.

Build the **Quiz first**. It reuses your existing cards, so you can focus on Angular. The Code Challenge comes second and adds new data, forms and timers on top of what you learned.

Before you start any milestone, ask yourself: _what is the state, where does it live, and what is derived from it?_ Most of the bugs we found in the grilling session came from skipping that question.

---

## Part 1: Quiz

**Goal:** a round of 10 multiple-choice questions built from your flash cards. Pick an answer, see if you were right, move on, and get a score at the end.

### Milestone 1: A route that lazy-loads

**Concept:** lazy loading with `loadComponent`

- Create `pages/quiz-page/` with the CLI: `npx ng generate component pages/quiz-page`
- Add a `quiz` route, but use `loadComponent: () => import(...)` instead of `component:`.
- Add a link in the menu.

**Done when:** you visit `/quiz`, see a heading, and the Network tab shows a separate JS chunk loading only when you open the quiz.

**Ask yourself:** why does this make the home page load faster? Should every route in the app be lazy?

---

### Milestone 2: Model the state before writing UI

**Concept:** designing state with `signal` and `computed`

On paper first, write down every piece of state a quiz round needs. Then sort each piece into one of two buckets:

| Source state (a `signal`, you `.set()` it) | Derived state (a `computed`, never set) |
| ------------------------------------------ | --------------------------------------- |
| ?                                          | ?                                       |

Things to think about: the list of questions, where you are, what the user picked, the score, whether the round is over, the progress %.

**Trap to avoid:** storing `score` as a signal you increment works, but could it be _derived_ instead? What would you need to store to compute it? Which version is harder to get out of sync?

**Done when:** you have a class with signals and computeds and no template yet, and you can explain why each one is in its bucket.

---

### Milestone 3: Pure logic in plain functions, with tests

**Concept:** keeping logic out of components so it's testable

Create `utils/quiz.ts` with plain functions (no Angular!):

- `pickQuestions(cards, count)`: returns `count` random cards. Use your `shuffled()` util.
- `buildChoices(question, allCards)`: returns 4 answers, including the right one, in random order.

Write `utils/quiz.spec.ts` **before or alongside** the code. Test cases to cover:

- `count` larger than the number of cards
- wrong answers come from the **same category** first (remember the TypeScript-question problem)
- no duplicate choices, and no wrong answer that equals the right answer (remember the `track` problem)

**Done when:** `npm test` passes and you never had to open a browser.

<details><summary>Hint: same category first</summary>

Build two lists: answers from the same category, and answers from other categories. Shuffle each and put same-category ones first. Then dedupe with a `Set`, remove the correct answer, and take the first 3.

</details>

---

### Milestone 4: The template

**Concept:** control flow (`@if`, `@for`, `track`), class bindings, OnPush

- Show the question, 4 answer buttons, a "Next" button that only appears after answering, and a result screen.
- Use `@for (choice of choices(); track ...)`. Decide what to track by and be ready to explain why.
- Disable the answer buttons once one is picked.
- Style correct and incorrect with `[class.is-correct]`.
- Set `changeDetection: ChangeDetectionStrategy.OnPush`.

**Ask yourself:** you're zoneless _and_ OnPush. Why does the screen still update when you click? (Hint: Round 1, question 4.)

---

### Milestone 5: Resetting state with `linkedSignal`

**Concept:** `linkedSignal`

When the question changes, the selected answer must reset to `null`. You've written this before with `effect`, and then fixed it in `FlashCard`.

Make `selectedAnswer` a `linkedSignal` whose source is the current question.

**Done when:** there's no manual `selectedAnswer.set(null)` in your "next question" method, and it still resets.

---

### Milestone 6: Quiz settings with a form

**Concept:** forms (try **Signal Forms** if you're on a recent enough Angular 21, otherwise Reactive Forms)

Before the round starts, show a small form with:

- topic: all / angular / javascript / typescript
- number of questions: 5 / 10 / 20
- difficulty: uses the `level` field you've never used 👀

**Done when:** the settings change which questions you get, and you can't start a round with 0 matching cards. Show a message instead.

---

### Milestone 7: A legit use of `effect` (high score)

**Concept:** when `effect()` _is_ the right tool

Save the best score per topic to `localStorage`. This is a **side effect** (syncing to a browser API), which is exactly what `effect()` is for.

- Put it in a `QuizStatsService`, the same pattern as `FavouritesService`.
- Show "Best: 8/10" on the result screen.

**Ask yourself:** why is `effect` right here when it was wrong for `showAnswer`?

---

### Milestone 8: Don't lose progress by accident

**Concept:** route guards (`canDeactivate`)

If the user is halfway through a round and clicks a menu link, ask "Leave quiz? Your progress will be lost."

**Done when:** leaving mid-round asks first, and leaving on the result screen doesn't.

---

### Quiz stretch goals

- Keyboard shortcuts: press 1–4 to answer and Enter for next (`host: { '(document:keydown)': ... }`).
- After the round, show which ones you got wrong, with a link to `/question/:id`.
- "Retry wrong answers only" mode.
- Animate between questions with `@angular/animations`, or CSS-only with `@starting-style`.

---

## Part 2: Code Challenge

**Goal:** read a code snippet and answer what it does. Start with multiple choice, then add typed answers and a timer.

### Milestone 1: A data model that can grow

**Concept:** TypeScript modelling with discriminated unions

You'll want more than one kind of challenge later. Design `models/code-challenge.model.ts` so it supports, for example:

- `'multiple-choice'`: has `choices` and `answer`
- `'type-the-output'`: has `answer`, and the user types it

Use a `type` field so TypeScript knows which properties exist:

```ts
type CodeChallenge = MultipleChoiceChallenge | TypeOutputChallenge;
```

Also give every challenge: `id`, `title`, `snippet`, `explanation`, `category`, `level`.

**Done when:** TypeScript errors if you try to read `.choices` on a `type-the-output` challenge without checking `type` first.

---

### Milestone 2: Load the challenges over HTTP

**Concept:** `httpResource` / `HttpClient`, and loading and error states

Instead of a TS file, put the challenges in `public/data/code-challenges.json` and load them with `httpResource`. (Add `provideHttpClient()` to `app.config.ts`.)

Your template must handle three states: **loading**, **error**, and **loaded**.

**Done when:** renaming the JSON file shows your error state, not a blank page.

**Ask yourself:** what's the difference between data in a `.ts` file and data in a `.json` file in `public/`? Which one ends up in your JS bundle?

---

### Milestone 3: One challenge per URL

**Concept:** route params as component inputs

Use `/code-challenge/:id`. Turn on `withComponentInputBinding()` in `provideRouter`, then read the id with `id = input.required<string>()`. No `ActivatedRoute` this time.

Compare it to how `CardDetailPage` does it. Which do you prefer, and why?

**Done when:** you can refresh on challenge 3 and stay on challenge 3, and Previous/Next change the URL.

---

### Milestone 4: Render the snippet nicely

**Concept:** content projection and reusable components

Build a reusable `<app-code-block>` component that takes the code as an input and shows it in `<pre><code>`, with a copy-to-clipboard button.

- Line numbers are optional (CSS counters work well).
- **Don't** reach for `innerHTML` to add colours. Ask yourself why that's risky, and how Angular protects you from it.

---

### Milestone 5: Two answer types, one page

**Concept:** `@switch` and type narrowing in templates

- `@switch (challenge.type)` renders either the choice buttons or a text input.
- For typed answers, normalise before comparing: trim, and treat quote styles and spacing loosely. Put that compare function in `utils/` and **test it**.

**Done when:** `"Hi, there!"` and `'Hi, there!'` both count as correct.

---

### Milestone 6: Timed mode

**Concept:** timers in zoneless Angular, and cleanup with `DestroyRef`

Add an optional 30-second countdown per challenge.

- Use `setInterval` and a `signal` for the remaining seconds.
- Clear it in `DestroyRef.onDestroy`, and also when the user answers. This time an uncleared interval really _is_ a leak (Round 1, question 5).
- When it hits 0, count the answer as wrong and show the explanation.

**Done when:** navigating away mid-countdown leaves no interval running. Prove it with a `console.log` inside the interval.

<details><summary>Hint: the RxJS route</summary>

`interval(1000)` from RxJS plus `toSignal()` gives you automatic cleanup when the component is destroyed. Try both versions and compare.

</details>

---

### Milestone 7: Never `eval` user code

**Concept:** security thinking

You might be tempted to _run_ the snippet to check the answer. Write down, in a comment or in your notes, why running `eval()` or `new Function()` on content is dangerous. Then decide: are your snippets trusted? What changes if users can submit their own challenges later?

You don't have to build anything here. The point is being able to answer that question in an interview.

---

### Code Challenge stretch goals

- A "spot the bug" challenge type: click the line that's wrong.
- Syntax highlighting with a library like Shiki or Prism, done safely.
- Share the quiz's result screen as a shared component, since both features have one. Do this _after_ both work, not before.

---

## Definition of done (both features)

- [ ] Routes are lazy-loaded and linked from the menu.
- [ ] Pure logic lives in `utils/` and has tests. `npm test` is green.
- [ ] No `effect()` that only sets other signals.
- [ ] Every `setTimeout` and `setInterval` is cleaned up.
- [ ] Keyboard-only users can complete a round. Feedback uses `aria-live`. There is one `<main>` per page.
- [ ] Empty states are handled: no cards, no challenges, failed load.

## Concepts checklist

Tick these off as you go:

- [ ] `loadComponent` lazy routes
- [ ] `signal` vs `computed` vs `linkedSignal` vs `effect`
- [ ] Pure functions + Vitest
- [ ] `@if` / `@for` + `track` / `@switch`
- [ ] OnPush + zoneless change detection
- [ ] Forms (Signal Forms or Reactive Forms)
- [ ] `canDeactivate` guard
- [ ] `httpResource` with loading and error states
- [ ] `withComponentInputBinding` route inputs
- [ ] Discriminated unions in TypeScript
- [ ] Timer cleanup with `DestroyRef` (or RxJS `toSignal`)
- [ ] Why `innerHTML` and `eval` are dangerous
