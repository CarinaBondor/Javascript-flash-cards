import { Component, effect, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FavouriteButton } from '../favouriteButton/favouriteButton';

@Component({
  selector: 'flash-card',
  standalone: true,
  imports: [MatIconModule, FavouriteButton],
  templateUrl: './FlashCard.component.html',
  styleUrl: './FlashCard.component.scss',
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
