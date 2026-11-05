import { Routes } from "@angular/router";
import { AboutPage } from "./pages/AboutPage/AboutPage";
import { SearchPage } from "./pages/search-page/search-page";
import { FavouritesPage } from "./pages/favourites-page/favourites-page";
import { CardDetailPage } from "./pages/card-detail-page/card-detail-page";
import { PrivacyPolicyPage } from "./pages/PrivacyPolicyPage/PrivacyPolicyPage";
import { CookiePolicyPage } from "./pages/CookiePolicyPage/CookiePolicyPage";
import { Home } from "./pages/home/home";
import { DecksPage } from "./pages/decks-page/decks-page";
import { StudyTopicPage } from "./pages/study-topic-page/study-topic-page";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";

export const routes: Routes = [
  { path: "", component: Home, title: "Flash Cards" },
  { path: "decks", component: DecksPage, title: "Decks | Flash Cards" },
  {
    path: "study",
    component: StudyTopicPage,
    data: { category: "all" },
    title: "Study | Flash Cards",
  },
  {
    path: "study/angular",
    component: StudyTopicPage,
    data: { category: "angular" },
    title: "Study Angular | Flash Cards",
  },
  {
    path: "study/javascript",
    component: StudyTopicPage,
    data: { category: "javascript" },
    title: "Study JavaScript | Flash Cards",
  },
  {
    path: "study/typescript",
    component: StudyTopicPage,
    data: { category: "typescript" },
    title: "Study TypeScript | Flash Cards",
  },
  { path: "question/:id", component: CardDetailPage, title: "Card | Flash Cards" },
  { path: "about", component: AboutPage, title: "About | Flash Cards" },
  { path: "search", component: SearchPage, title: "Search | Flash Cards" },
  { path: "favourites", component: FavouritesPage, title: "Favourites | Flash Cards" },
  { path: "privacy-policy", component: PrivacyPolicyPage },
  { path: "cookie-policy", component: CookiePolicyPage },
  { path: "**", component: NotFoundPage, title: "Page not found | Flash Cards" },
];
