import { TestBed } from '@angular/core/testing';
import { FavouritesService } from './favourites.service';
import { Flashcard } from '../models/flashcard.model';

const STORAGE_KEY = 'flashcard_favourites';

describe('FavouritesService', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('adds and removes a favourite', () => {
    const service = TestBed.inject(FavouritesService);

    service.toggleFavourite(7);
    expect(service.isFavourited(7)).toBe(true);
    expect(service.favouriteCount()).toBe(1);

    service.toggleFavourite(7);
    expect(service.isFavourited(7)).toBe(false);
    expect(service.favouriteCount()).toBe(0);
  });

  it('saves favourites to localStorage', () => {
    const service = TestBed.inject(FavouritesService);
    service.toggleFavourite(2);
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!)).toEqual([2]);
  });

  it('loads saved favourites on start', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([4, 5]));
    const service = TestBed.inject(FavouritesService);
    expect(service.favouriteIds()).toEqual([4, 5]);
  });

  it('falls back to no favourites when storage holds bad JSON', () => {
    localStorage.setItem(STORAGE_KEY, '{not json');
    vi.spyOn(console, 'error').mockImplementation(() => {});
    const service = TestBed.inject(FavouritesService);
    expect(service.favouriteIds()).toEqual([]);
  });

  it('returns only the favourited cards', () => {
    const service = TestBed.inject(FavouritesService);
    const cards = [1, 2, 3].map((id) => ({ id, question: '', answer: '', level: 'beginner' }) as Flashcard);

    service.toggleFavourite(2);
    expect(service.getFavouriteCards(cards).map((card) => card.id)).toEqual([2]);
  });
});
