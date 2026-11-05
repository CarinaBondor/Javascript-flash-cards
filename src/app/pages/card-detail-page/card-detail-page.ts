import { ChangeDetectionStrategy, Component, computed, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { Location, TitleCasePipe } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { CardsService } from "../../services/cardsService/cards.service";
import { FavouriteButton } from "../../components/appFavouriteButton/appFavouriteButton";
import { topicName } from "../../models/topics.model";

@Component({
  selector: "app-card-detail-page",
  imports: [MatButtonModule, MatIconModule, RouterLink, TitleCasePipe, FavouriteButton],
  templateUrl: "./card-detail-page.html",
  styleUrl: "./card-detail-page.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardDetailPage {
  private readonly route = inject(ActivatedRoute);
  private readonly cardsService = inject(CardsService);
  private readonly location = inject(Location);
  private readonly routeParams = toSignal(this.route.paramMap, {
    initialValue: this.route.snapshot.paramMap,
  });

  readonly card = computed(() => {
    const id = Number(this.routeParams().get("id"));
    return this.cardsService.getById(id);
  });

  readonly topic = computed(() => this.card()?.category ?? "all");
  readonly topicLabel = computed(() => topicName(this.topic()));
  readonly studyPath = computed(() =>
    this.topic() === "all" ? "/study" : `/study/${this.topic()}`,
  );

  goBack(): void {
    this.location.back();
  }
}
