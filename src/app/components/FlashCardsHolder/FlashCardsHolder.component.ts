import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlashCard } from '../FlashCard/FlashCard.component';
import { flashcardsData } from '../../data/cards';

@Component({
  selector: 'flash-cards-holder',
  imports: [CommonModule, FlashCard],

  templateUrl: './FlashCardsHolder.component.html',
  styleUrls: ['./FlashCardsHolder.component.css'],
})
export class FlashCardsHolder {
  cards: typeof flashcardsData = flashcardsData;

  currentIndex = 0;

  get currentCard(): typeof flashcardsData[number] | undefined {
    return this.cards[this.currentIndex];
  }

  nextCard() {
    if (this.currentIndex < this.cards.length - 1) {
      this.currentIndex++;
    }
  }

  previousCard() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }
}
