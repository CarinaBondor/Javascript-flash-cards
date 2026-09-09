import { Component } from '@angular/core';
import { flashcardsData } from '../../data/cards';

@Component({
  selector: 'app-favourites-page',
  imports: [],
  templateUrl: './favourites-page.html',
  styleUrl: './favourites-page.css',
})
export class FavouritesPage {
  favouritedCards: typeof flashcardsData = [];
}
