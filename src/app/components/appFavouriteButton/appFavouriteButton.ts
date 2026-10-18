import { Component, computed, inject, input } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { FavouritesService } from "../../services/favourites.service";

@Component({
  selector: "app-favourite-button",
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: "./appFavouriteButton.html",
})
export class FavouriteButton {
  readonly cardId = input.required<number>();
  private readonly favouritesService = inject(FavouritesService);
  readonly isFavourite = computed(() => this.favouritesService.isFavourited(this.cardId()));

  toggleFavourite(): void {
    this.favouritesService.toggleFavourite(this.cardId());
  }
}
