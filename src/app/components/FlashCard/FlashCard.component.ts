import { Component, effect, input } from '@angular/core';
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
  showAnswer = false;

  constructor() {
    effect(() => {
      this.question();
      this.answer();
      this.showAnswer = false;
    });
  }

  toggleAnswer() {
    this.showAnswer = !this.showAnswer;
  }
}
