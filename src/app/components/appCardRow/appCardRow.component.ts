import { ChangeDetectionStrategy, Component, computed, input } from "@angular/core";
import { TitleCasePipe } from "@angular/common";
import { RouterLink } from "@angular/router";
import { FavouriteButton } from "../appFavouriteButton/appFavouriteButton";
import { Flashcard } from "../../models/flashcard.model";
import { topicName } from "../../models/topics";

// One line in a list of cards (Search, Favourites). The whole text links to the full card.
@Component({
  selector: "app-card-row",
  imports: [RouterLink, TitleCasePipe, FavouriteButton],
  templateUrl: "./appCardRow.component.html",
  styleUrl: "./appCardRow.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[attr.data-topic]": "topic()",
  },
})
export class CardRow {
  readonly card = input.required<Flashcard>();

  readonly topic = computed(() => this.card().category ?? "all");
  readonly topicLabel = computed(() => topicName(this.topic()));
}
