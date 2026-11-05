import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { Flashcard } from "../../models/flashcard.model";
import { DeckTopic, topicName } from "../../models/topics";
import { CardsService } from "../../services/cards.service";

interface DeckSummary {
  topic: DeckTopic;
  name: string;
  path: string;
  count: number;
  levels: string;
  sampleQuestion: string;
}

const LEVEL_ORDER: Flashcard["level"][] = ["beginner", "intermediate", "advanced"];

// "18 beginner, 2 intermediate": only the levels that have cards.
function describeLevels(cards: Flashcard[]): string {
  return LEVEL_ORDER.map((level) => ({
    level,
    count: cards.filter((card) => card.level === level).length,
  }))
    .filter(({ count }) => count > 0)
    .map(({ level, count }) => `${count} ${level}`)
    .join(", ");
}

@Component({
  selector: "app-decks-page",
  imports: [RouterLink],
  templateUrl: "./decks-page.html",
  styleUrl: "./decks-page.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DecksPage {
  private readonly cardsService = inject(CardsService);

  readonly cardCount = this.cardsService.getAll().length;

  readonly decks: DeckSummary[] = (["angular", "javascript", "typescript", "all"] as const).map(
    (topic) => {
      // getAll() keeps the original order, so the sample question doesn't change on reload.
      const cards =
        topic === "all"
          ? this.cardsService.getAll()
          : this.cardsService.getAll().filter((card) => card.category === topic);

      return {
        topic,
        name: topic === "all" ? "Everything, shuffled" : topicName(topic),
        path: topic === "all" ? "/study" : `/study/${topic}`,
        count: cards.length,
        levels: describeLevels(cards),
        sampleQuestion: cards[0]?.question ?? "",
      };
    },
  );
}
