import { Component, inject } from '@angular/core';
import { flashcardsData } from '../../data/cards';
import { FavouritesService } from '../../services/favourites.service';

@Component({
  selector: 'app-favourites-page',
  imports: [],
  templateUrl: './favourites-page.html',
  styleUrl: './favourites-page.scss',
})
export class FavouritesPage {
  favouritedCards: typeof flashcardsData = [];
  favouritesService = inject(FavouritesService);
}
