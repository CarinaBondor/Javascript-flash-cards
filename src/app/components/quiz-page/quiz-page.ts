import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardsService } from '../../services/cards.service';
import { Flashcard } from '../../models/flashcard.model';

function shuffled<T>(items: T[]): T[] {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index--) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    const currentItem = result[index]!;
    result[index] = result[swapIndex]!;
    result[swapIndex] = currentItem;
  }
  return result;
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
    const distractors = shuffled([
      ...new Set(this.cards.filter((card) => card.id !== question.id).map((card) => card.answer)),
    ]).slice(0, 3);
    this.choices.set(shuffled([question.answer, ...distractors]));
  }
}
