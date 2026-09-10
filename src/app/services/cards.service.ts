import { Injectable } from '@angular/core';
import { flashcardsData } from '../data/cards';
import { Flashcard } from '../models/flashcard.model';

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  private readonly cards: Flashcard[] = flashcardsData;

  getAll(): Flashcard[] {
    return this.cards;
  }

  getById(id: number): Flashcard | undefined {
    return this.cards.find((card) => card.id === id);
  }
}
