import { TestBed } from '@angular/core/testing';
import { SearchService } from './search.service';

describe('SearchService', () => {
  let service: SearchService;

  beforeEach(() => {
    service = TestBed.inject(SearchService);
  });

  it('returns nothing for an empty or blank query', () => {
    expect(service.search('')).toEqual([]);
    expect(service.search('   ')).toEqual([]);
  });

  it('ignores case and surrounding spaces', () => {
    const lower = service.search('signal');
    expect(lower.length).toBeGreaterThan(0);
    expect(service.search('  SIGNAL  ')).toEqual(lower);
  });

  it('matches on category too', () => {
    const results = service.search('typescript');
    expect(results.some((card) => card.category === 'typescript')).toBe(true);
  });
});
