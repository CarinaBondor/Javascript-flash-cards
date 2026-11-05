import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { RouterLink } from "@angular/router";
import { FlashCard } from "../../components/appFlashCard/appFlashCard.component";
import { TOPICS } from "../../models/topics";
import { CardsService } from "../../services/cards.service";

// The card shown in the hero for visitors to try. "What is a closure?"
const SAMPLE_CARD_ID = 25;

@Component({
  selector: "app-home",
  imports: [MatButtonModule, MatIconModule, RouterLink, FlashCard],
  templateUrl: "./home.html",
  styleUrl: "./home.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  private readonly cardsService = inject(CardsService);

  readonly cardCount = this.cardsService.getAll().length;
  readonly sampleCard = this.cardsService.getById(SAMPLE_CARD_ID) ?? this.cardsService.getAll()[0];

  readonly topicCounts = TOPICS.map((topic) => ({
    topic,
    count: this.cardsService.getDeckCards(topic).length,
  }));

  readonly upcomingTopics = ["RxJS", "Testing", "CSS", "Node.js"];
}
