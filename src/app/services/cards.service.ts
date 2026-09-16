import { Injectable } from '@angular/core';
import { flashcardsData } from '../data/cards';
import { Flashcard } from '../models/flashcard.model';

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  private readonly cards: Flashcard[] = flashcardsData;

  getAll(options?: { randomize?: boolean }): Flashcard[] {
    // return this.cards;

    const result = [...this.cards];
    if (options?.randomize) {
      result.sort(() => Math.random() - 0.5);
    }
    return result;
  }

  getById(id: number): Flashcard | undefined {
    return this.cards.find((card) => card.id === id);
  }
}
