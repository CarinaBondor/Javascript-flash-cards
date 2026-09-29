import { Component, computed, effect, inject, input, signal } from '@angular/core';
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
  readonly cardsOverride = input<Flashcard[] | null>(null);
  readonly cards = computed(() => this.cardsOverride() ?? this.cardsService.getStudyCards());

  currentIndex = signal(this.cardsService.getStudyIndex());
  isAnimating = signal(false);

  constructor() {
    effect(() => {
      if (this.cardsOverride() !== null) this.currentIndex.set(0);
    });
  }

  get currentCard(): Flashcard | undefined {
    return this.cards()[this.currentIndex()];
  }

  nextCard() {
    if (this.currentIndex() < this.cards().length - 1 && !this.isAnimating()) {
      this.triggerCardChange(() => this.setIndex(this.currentIndex() + 1));
    }
  }

  previousCard() {
    if (this.currentIndex() > 0 && !this.isAnimating()) {
      this.triggerCardChange(() => this.setIndex(this.currentIndex() - 1));
    }
  }

  private setIndex(index: number) {
    this.currentIndex.set(index);
    if (this.cardsOverride() === null) this.cardsService.setStudyIndex(index);
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
