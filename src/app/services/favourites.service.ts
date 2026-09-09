import { Injectable, signal, computed } from '@angular/core';
import { Flashcard } from '../models/flashcard.model';

@Injectable({
  providedIn: 'root',
})
export class FavouritesService {
  private readonly STORAGE_KEY = 'flashcard_favourites';

  readonly favouriteIds = signal<number[]>(this.loadFromStorage());

  // computed value for the counted
  readonly favouriteCount = computed(() => this.favouriteIds().length);

  //get favourites from storage
  private loadFromStorage(): number[] {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Failed to load favourites from storage', error);
      return [];
    }
  }

  //add to favs storage
  private saveToStorage(ids: number[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(ids));
    } catch (error) {
      console.error('Failed to save favourites to storage', error);
    }
  }

  //helper
  isFavourited(id: number): boolean {
    return this.favouriteIds().includes(id);
  }

  // Add or remove the question id
  // Remove if already favourited
  // Add if not favourited
  toggleFavourite(id: number): void {
    this.favouriteIds.update((ids) => {
      const updated = ids.includes(id) ? ids.filter((cardId) => cardId !== id) : [...ids, id];

      this.saveToStorage(updated);
      return updated;
    });
  }

  //get all the favourited cards
  getFavouriteCards(allCards: Flashcard[]): Flashcard[] {
    const ids = this.favouriteIds();
    return allCards.filter((card) => ids.includes(card.id));
  }
}
