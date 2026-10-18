import { Component, computed, inject } from "@angular/core";
import { CardsService } from "../../services/cards.service";
import { FavouritesService } from "../../services/favourites.service";
import { MatCardModule } from "@angular/material/card";
import { FlashCard } from "../../components/FlashCard/FlashCard.component";

@Component({
  selector: "app-favourites-page",
  imports: [MatCardModule, FlashCard],
  templateUrl: "./favourites-page.html",
  styleUrl: "./favourites-page.scss",
})
export class FavouritesPage {
  private readonly cardsService = inject(CardsService);
  private readonly favouritesService = inject(FavouritesService);
  readonly favouritedCards = computed(() =>
    this.favouritesService.getFavouriteCards(this.cardsService.getAll()),
  );
}
