import { Routes } from '@angular/router';
import { FlashCardsHolder } from './components/FlashCardsHolder/FlashCardsHolder.component';
import { AboutPage } from './components/AboutPage/AboutPage';

export const routes: Routes = [
  { path: '', component: FlashCardsHolder },
  { path: 'about', component: AboutPage },
];
