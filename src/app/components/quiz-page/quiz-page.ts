import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardsService } from '../../services/cards.service';
import { Flashcard } from '../../models/flashcard.model';
import { shuffled } from '../../utils/shuffle';

const DISTRACTOR_COUNT = 3;

// Picks wrong answers from the same category first, so the right answer can't be guessed by topic alone.
// Answers are unique and never equal the correct one, so they're safe to track by text.
export function pickDistractors(question: Flashcard, cards: readonly Flashcard[]): string[] {
  const otherAnswers = (sameCategory: boolean) =>
    shuffled(
      cards
        .filter((card) => card.id !== question.id)
        .filter((card) => (card.category === question.category) === sameCategory)
        .map((card) => card.answer),
    );

  const unique = new Set([...otherAnswers(true), ...otherAnswers(false)]);
  unique.delete(question.answer);
  return [...unique].slice(0, DISTRACTOR_COUNT);
}

@Component({
  selector: 'app-quiz-page',
  imports: [RouterLink],
  templateUrl: './quiz-page.html',
  styleUrl: './quiz-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuizPage {
  private readonly cards = inject(CardsService).getAll();

  readonly questions = signal<Flashcard[]>([]);
  readonly choices = signal<string[]>([]);
  readonly currentIndex = signal(0);
  readonly score = signal(0);
  readonly selectedAnswer = signal<string | null>(null);
  readonly currentQuestion = computed(() => this.questions()[this.currentIndex()] ?? null);
  readonly isComplete = computed(
    () => this.questions().length > 0 && this.currentIndex() >= this.questions().length,
  );
  readonly progressPercent = computed(() =>
    this.questions().length === 0
      ? 0
      : this.isComplete()
        ? 100
        : ((this.currentIndex() + 1) / this.questions().length) * 100,
  );
  readonly isCorrect = computed(
    () =>
      this.selectedAnswer() !== null && this.selectedAnswer() === this.currentQuestion()?.answer,
  );

  constructor() {
    this.startQuiz();
  }

  startQuiz(): void {
    const questions = shuffled(this.cards).slice(0, Math.min(10, this.cards.length));
    this.questions.set(questions);
    this.currentIndex.set(0);
    this.score.set(0);
    this.selectedAnswer.set(null);
    this.setChoices(questions[0]);
  }

  selectAnswer(answer: string): void {
    if (this.selectedAnswer() !== null) return;
    this.selectedAnswer.set(answer);
    if (answer === this.currentQuestion()?.answer) this.score.update((score) => score + 1);
  }

  nextQuestion(): void {
    if (this.selectedAnswer() === null) return;
    const nextIndex = this.currentIndex() + 1;
    this.currentIndex.set(nextIndex);
    this.selectedAnswer.set(null);
    if (nextIndex < this.questions().length) this.setChoices(this.questions()[nextIndex]);
  }

  private setChoices(question: Flashcard | undefined): void {
    if (!question) {
      this.choices.set([]);
      return;
    }
    this.choices.set(shuffled([question.answer, ...pickDistractors(question, this.cards)]));
  }
}
