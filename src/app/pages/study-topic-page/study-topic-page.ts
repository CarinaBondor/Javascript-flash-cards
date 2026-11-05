import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { FlashCardsHolder } from "../../components/appFlashCardsHolder/appFlashCardsHolder.component";
import { Flashcard } from "../../models/flashcard.model";
import { DeckTopic, topicName } from "../../models/topics";
import { CardsService } from "../../services/cards.service";

interface DeckLink {
  topic: DeckTopic;
  label: string;
  path: string;
  count: number;
}

@Component({
  selector: "app-study-topic-page",
  imports: [FlashCardsHolder, RouterLink],
  templateUrl: "./study-topic-page.html",
  styleUrl: "./study-topic-page.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudyTopicPage {
  private readonly cardsService = inject(CardsService);
  readonly category = inject(ActivatedRoute).snapshot.data["category"] as DeckTopic;

  readonly title = topicName(this.category);
  readonly cards: Flashcard[] = this.cardsService.getDeckCards(this.category);

  readonly deckLinks: DeckLink[] = (["all", "angular", "javascript", "typescript"] as const).map(
    (topic) => ({
      topic,
      label: topic === "all" ? "All" : topicName(topic),
      path: topic === "all" ? "/study" : `/study/${topic}`,
      count: this.cardsService.getDeckCards(topic).length,
    }),
  );
}
