import { ChangeDetectionStrategy, Component, computed, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { RouterLink } from "@angular/router";
import { CardRow } from "../../components/appCardRow/appCardRow.component";
import { CardsService } from "../../services/cards.service";
import { FavouritesService } from "../../services/favourites.service";

@Component({
  selector: "app-favourites-page",
  imports: [MatButtonModule, MatIconModule, RouterLink, CardRow],
  templateUrl: "./favourites-page.html",
  styleUrl: "./favourites-page.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavouritesPage {
  private readonly cardsService = inject(CardsService);
  private readonly favouritesService = inject(FavouritesService);
  readonly favouritedCards = computed(() =>
    this.favouritesService.getFavouriteCards(this.cardsService.getAll()),
  );
}
