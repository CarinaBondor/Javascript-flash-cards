import { Routes } from '@angular/router';
import { FlashCardsHolder } from './components/FlashCardsHolder/FlashCardsHolder.component';
import { AboutPage } from './components/AboutPage/AboutPage';
import { SearchPage } from './components/search-page/search-page';
import { FavouritesPage } from './components/favourites-page/favourites-page';
import { CardDetailPage } from './components/card-detail-page/card-detail-page';

export const routes: Routes = [
  { path: '', component: FlashCardsHolder },
  { path: 'question/:id', component: CardDetailPage },
  { path: 'about', component: AboutPage },
  { path: 'search', component: SearchPage },
  { path: 'favourites', component: FavouritesPage },
];
