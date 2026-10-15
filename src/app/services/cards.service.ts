import { Injectable } from '@angular/core';
import { flashcardsData } from '../data/cards';
import { Flashcard } from '../models/flashcard.model';
import { shuffled } from '../utils/shuffle';

// 'all' is the full /study deck; any other key is a card category.
export type DeckKey = 'all' | string;

interface StudyDeck {
  cards: Flashcard[];
  index: number;
}

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  private readonly cards: Flashcard[] = flashcardsData;

  // Keeps each deck's order and position alive across navigation, since components are recreated on route change.
  private readonly decks = new Map<DeckKey, StudyDeck>();

  getAll(options?: { randomize?: boolean }): Flashcard[] {
    return options?.randomize ? shuffled(this.cards) : [...this.cards];
  }

  getById(id: number): Flashcard | undefined {
    return this.cards.find((card) => card.id === id);
  }

  getDeckCards(key: DeckKey): Flashcard[] {
    return this.getDeck(key).cards;
  }

  getDeckIndex(key: DeckKey): number {
    return this.getDeck(key).index;
  }

  setDeckIndex(key: DeckKey, index: number): void {
    this.getDeck(key).index = index;
  }

  resetDeck(key: DeckKey): void {
    this.decks.delete(key);
  }

  private getDeck(key: DeckKey): StudyDeck {
    let deck = this.decks.get(key);
    if (!deck) {
      const source = key === 'all' ? this.cards : this.cards.filter((card) => card.category === key);
      deck = { cards: shuffled(source), index: 0 };
      this.decks.set(key, deck);
    }
    return deck;
  }
}
