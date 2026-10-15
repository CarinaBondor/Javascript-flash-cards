import { TestBed } from '@angular/core/testing';
import { CardsService } from './cards.service';

describe('CardsService', () => {
  let service: CardsService;

  beforeEach(() => {
    service = TestBed.inject(CardsService);
  });

  it('finds a card by id', () => {
    const first = service.getAll()[0]!;
    expect(service.getById(first.id)).toEqual(first);
    expect(service.getById(-1)).toBeUndefined();
  });

  it('keeps the same deck order between calls', () => {
    expect(service.getDeckCards('all')).toBe(service.getDeckCards('all'));
  });

  it('only puts cards from the category in a topic deck', () => {
    const deck = service.getDeckCards('typescript');
    expect(deck.length).toBeGreaterThan(0);
    expect(deck.every((card) => card.category === 'typescript')).toBe(true);
  });

  it('remembers each deck position separately', () => {
    service.setDeckIndex('angular', 3);
    service.setDeckIndex('all', 1);

    expect(service.getDeckIndex('angular')).toBe(3);
    expect(service.getDeckIndex('all')).toBe(1);
    expect(service.getDeckIndex('javascript')).toBe(0);
  });

  it('starts a deck over after a reset', () => {
    service.setDeckIndex('angular', 3);
    service.resetDeck('angular');
    expect(service.getDeckIndex('angular')).toBe(0);
  });
});
