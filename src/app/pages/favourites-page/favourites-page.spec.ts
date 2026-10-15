import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { FavouritesPage } from './favourites-page';

const STORAGE_KEY = 'flashcard_favourites';

describe('FavouritesPage', () => {
  beforeEach(async () => {
    localStorage.clear();

    await TestBed.configureTestingModule({
      imports: [FavouritesPage],
      // Each rendered flash card has a "Read full card" routerLink, which needs the router.
      providers: [provideRouter([])],
    }).compileComponents();
  });

  afterEach(() => {
    localStorage.clear();
  });

  async function createPage() {
    const fixture = TestBed.createComponent(FavouritesPage);
    await fixture.whenStable();
    return fixture.nativeElement as HTMLElement;
  }

  it('shows an empty message when nothing is favourited', async () => {
    const page = await createPage();

    expect(page.textContent).toContain('You have no favourited cards.');
    expect(page.querySelectorAll('flash-card').length).toBe(0);
  });

  it('renders a card for each saved favourite', async () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([1, 2]));

    const page = await createPage();

    expect(page.textContent).toContain('Total favourites: 2');
    expect(page.querySelectorAll('flash-card').length).toBe(2);
  });
});
