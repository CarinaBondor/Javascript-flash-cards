import { Routes } from '@angular/router';
import { FlashCardsHolder } from './components/FlashCardsHolder/FlashCardsHolder.component';
import { AboutPage } from './components/AboutPage/AboutPage';
import { SearchPage } from './components/search-page/search-page';
import { FavouritesPage } from './components/favourites-page/favourites-page';
import { CardDetailPage } from './components/card-detail-page/card-detail-page';
import { PrivacyPolicyPage } from './components/PrivacyPolicyPage/PrivacyPolicyPage';
import { CookiePolicyPage } from './components/CookiePolicyPage/CookiePolicyPage';
import { Home } from './components/home/home';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'study', component: FlashCardsHolder },
  { path: 'question/:id', component: CardDetailPage },
  { path: 'about', component: AboutPage },
  { path: 'search', component: SearchPage },
  { path: 'favourites', component: FavouritesPage },
  { path: 'privacy-policy', component: PrivacyPolicyPage },
  { path: 'cookie-policy', component: CookiePolicyPage },
];
