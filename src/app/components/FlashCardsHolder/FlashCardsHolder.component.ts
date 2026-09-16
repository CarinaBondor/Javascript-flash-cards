import { Component, inject, signal } from '@angular/core';
import { FlashCard } from '../FlashCard/FlashCard.component';
import { Flashcard } from '../../models/flashcard.model';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CardsService } from '../../services/cards.service';

@Component({
  selector: 'flash-cards-holder',
  imports: [FlashCard, MatButtonModule, MatIconModule],
  templateUrl: './FlashCardsHolder.component.html',
  styleUrl: './FlashCardsHolder.component.scss',
})
export class FlashCardsHolder {
  private readonly cardsService = inject(CardsService);
  cards: Flashcard[] = this.cardsService.getAll({ randomize: true });

  currentIndex = 0;
  isAnimating = signal(false);

  get currentCard(): Flashcard | undefined {
    return this.cards[this.currentIndex];
  }

  nextCard() {
    if (this.currentIndex < this.cards.length - 1 && !this.isAnimating()) {
      this.triggerCardChange(() => this.currentIndex++);
    }
  }

  previousCard() {
    if (this.currentIndex > 0 && !this.isAnimating()) {
      this.triggerCardChange(() => this.currentIndex--);
    }
  }

  private triggerCardChange(updateIndex: () => void) {
    this.isAnimating.set(true);
    setTimeout(() => {
      updateIndex();
      setTimeout(() => {
        this.isAnimating.set(false);
      }, 40);
    }, 100);
  }
}
