import { Injectable, inject } from '@angular/core';
import { Flashcard } from '../models/flashcard.model';
import { CardsService } from './cards.service';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private readonly cardsService = inject(CardsService);

  search(query: string): Flashcard[] {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return [];
    }

    return this.cardsService.getAll().filter((card) => {
      const searchableText = [card.question, card.answer, card.category]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return searchableText.includes(normalizedQuery);
    });
  }
}
