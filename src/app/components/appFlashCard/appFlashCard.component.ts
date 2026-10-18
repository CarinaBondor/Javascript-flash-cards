import { Component, input, linkedSignal } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { FavouriteButton } from "../appFavouriteButton/appFavouriteButton";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-flash-card",
  standalone: true,
  imports: [MatIconModule, FavouriteButton, MatCardModule, MatButtonModule, RouterLink],
  templateUrl: "./appFlashCard.component.html",
  styleUrl: "./appFlashCard.component.scss",
})
export class FlashCard {
  question = input("");
  answer = input("");
  cardId = input.required<number>();

  // Hidden again whenever a different card is shown, but still toggleable locally.
  readonly showAnswer = linkedSignal({
    source: this.cardId,
    computation: () => false,
  });

  toggleAnswer() {
    this.showAnswer.update((v) => !v);
  }
}
