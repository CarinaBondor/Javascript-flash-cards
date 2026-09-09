import { Component, effect, input } from '@angular/core';

@Component({
  selector: 'flash-card',
  imports: [],
  templateUrl: './FlashCard.component.html',
  styleUrl: './FlashCard.component.css',
})
export class FlashCard {
  question = input('');
  answer = input('');
  showAnswer = false;

  constructor() {
    effect(() => {
      // Reading question() and answer() registers them as dependencies.
      // Whenever either changes, showAnswer resets to false.
      this.question();
      this.answer();
      this.showAnswer = false;
    });
  }

  toggleAnswer() {
    this.showAnswer = !this.showAnswer;
  }
}
