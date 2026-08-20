import { Routes } from '@angular/router';
import { FlashCardsHolder } from './components/FlashCardsHolder/FlashCardsHolder.component';
import { AboutPage } from './components/AboutPage/AboutPage';
import { SearchPage } from './components/search-page/search-page';
import { FavouritesPage } from './components/favourites-page/favourites-page';

export const routes: Routes = [
  { path: '', component: FlashCardsHolder },
  { path: 'about', component: AboutPage },
  { path: 'search', component: SearchPage },
  { path: 'favourites', component: FavouritesPage },
];
