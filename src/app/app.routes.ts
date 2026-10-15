import { Routes } from '@angular/router';
import { FlashCardsHolder } from './components/FlashCardsHolder/FlashCardsHolder.component';
import { AboutPage } from './pages/AboutPage/AboutPage';
import { SearchPage } from './pages/search-page/search-page';
import { FavouritesPage } from './pages/favourites-page/favourites-page';
import { CardDetailPage } from './pages/card-detail-page/card-detail-page';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage/PrivacyPolicyPage';
import { CookiePolicyPage } from './pages/CookiePolicyPage/CookiePolicyPage';
import { Home } from './pages/home/home';
import { StudyTopicPage } from './pages/study-topic-page/study-topic-page';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'study/angular', component: StudyTopicPage, data: { category: 'angular' } },
  { path: 'study/javascript', component: StudyTopicPage, data: { category: 'javascript' } },
  { path: 'study/typescript', component: StudyTopicPage, data: { category: 'typescript' } },
  { path: 'study', component: FlashCardsHolder },
  { path: 'question/:id', component: CardDetailPage },
  { path: 'about', component: AboutPage },
  { path: 'search', component: SearchPage },
  { path: 'favourites', component: FavouritesPage },
  { path: 'privacy-policy', component: PrivacyPolicyPage },
  { path: 'cookie-policy', component: CookiePolicyPage },
  { path: '**', component: NotFoundPage },
];
