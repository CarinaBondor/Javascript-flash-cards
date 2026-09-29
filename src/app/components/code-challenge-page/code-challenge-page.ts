import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

interface CodeChallenge {
  title: string;
  prompt: string;
  snippet: string;
  choices: string[];
  answer: string;
  explanation: string;
}

@Component({
  selector: 'app-code-challenge-page',
  imports: [RouterLink],
  templateUrl: './code-challenge-page.html',
  styleUrl: './code-challenge-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeChallengePage {
  readonly challenges: CodeChallenge[] = [
    {
      title: 'Transform an array',
      prompt: 'What value is logged?',
      snippet:
        'const values = [2, 4, 6];\nconst doubled = values.map((value) => value * 2);\nconsole.log(doubled);',
      choices: ['[2, 4, 6]', '[4, 8, 12]', '24', 'undefined'],
      answer: '[4, 8, 12]',
      explanation: 'map() returns a new array with each value multiplied by two.',
    },
    {
      title: 'Follow the loop',
      prompt: 'What value is logged?',
      snippet:
        'let total = 0;\nfor (const value of [1, 2, 3]) {\n  total += value;\n}\nconsole.log(total);',
      choices: ['123', '5', '6', '0'],
      answer: '6',
      explanation: 'The loop adds 1, then 2, then 3 to total.',
    },
    {
      title: 'Use a default parameter',
      prompt: 'What string is logged?',
      snippet: "const greet = (name = 'there') => `Hi, ${name}!`;\nconsole.log(greet());",
      choices: ['Hi, undefined!', 'Hi, there!', 'Hi!', 'there'],
      answer: 'Hi, there!',
      explanation: 'Calling greet() without an argument uses the default value for name.',
    },
  ];

  readonly currentIndex = signal(0);
  readonly selectedAnswer = signal<string | null>(null);
  readonly score = signal(0);
  readonly currentChallenge = computed(() => this.challenges[this.currentIndex()] ?? null);
  readonly isComplete = computed(() => this.currentIndex() >= this.challenges.length);
  readonly isCorrect = computed(
    () =>
      this.selectedAnswer() !== null && this.selectedAnswer() === this.currentChallenge()?.answer,
  );

  selectAnswer(answer: string): void {
    if (this.selectedAnswer() !== null) return;
    this.selectedAnswer.set(answer);
    if (answer === this.currentChallenge()?.answer) this.score.update((score) => score + 1);
  }

  nextChallenge(): void {
    if (this.selectedAnswer() === null) return;
    this.currentIndex.update((index) => index + 1);
    this.selectedAnswer.set(null);
  }

  restart(): void {
    this.currentIndex.set(0);
    this.selectedAnswer.set(null);
    this.score.set(0);
  }
}
