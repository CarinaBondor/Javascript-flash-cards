import { Component, effect, input, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FavouriteButton } from '../favouriteButton/favouriteButton';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'flash-card',
  standalone: true,
  imports: [MatIconModule, FavouriteButton, MatCardModule, MatButtonModule, RouterLink],
  templateUrl: './FlashCard.component.html',
  styleUrl: './FlashCard.component.scss',
})
export class FlashCard {
  question = input('');
  answer = input('');
  cardId = input.required<number>();
  readonly showAnswer = signal(false);

  constructor() {
    effect(() => {
      this.question();
      this.answer();
      this.showAnswer.set(false);
    });
  }

  toggleAnswer() {
    this.showAnswer.update((v) => !v);
  }
}
