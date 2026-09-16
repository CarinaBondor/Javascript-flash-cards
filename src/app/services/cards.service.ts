import { Injectable } from '@angular/core';
import { flashcardsData } from '../data/cards';
import { Flashcard } from '../models/flashcard.model';

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  private readonly cards: Flashcard[] = flashcardsData;

  // Keeps the study order and position alive across navigation, since components are recreated on route change.
  private studyCards: Flashcard[] | null = null;
  private studyIndex = 0;

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

  getStudyCards(): Flashcard[] {
    if (!this.studyCards) {
      this.studyCards = this.getAll({ randomize: true });
    }
    return this.studyCards;
  }

  getStudyIndex(): number {
    return this.studyIndex;
  }

  setStudyIndex(index: number): void {
    this.studyIndex = index;
  }

  resetStudySession(): void {
    this.studyCards = null;
    this.studyIndex = 0;
  }
}
