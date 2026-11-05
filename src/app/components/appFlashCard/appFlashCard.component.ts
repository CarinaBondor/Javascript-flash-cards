import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Injector,
  afterNextRender,
  computed,
  inject,
  input,
  linkedSignal,
  viewChild,
} from "@angular/core";
import { NgTemplateOutlet, TitleCasePipe } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { RouterLink } from "@angular/router";
import { FavouriteButton } from "../appFavouriteButton/appFavouriteButton";
import { Flashcard } from "../../models/flashcard.model";
import { topicName } from "../../models/topics.model";

@Component({
  selector: "app-flash-card",
  imports: [
    MatIconModule,
    MatButtonModule,
    RouterLink,
    NgTemplateOutlet,
    TitleCasePipe,
    FavouriteButton,
  ],
  templateUrl: "./appFlashCard.component.html",
  styleUrl: "./appFlashCard.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[attr.data-topic]": "topic()",
  },
})
export class FlashCard {
  readonly card = input.required<Flashcard>();
  // The homepage sample card hides the favourite button and the "Read the full card" link.
  readonly showExtras = input(true);

  readonly topic = computed(() => this.card().category ?? "all");
  readonly topicLabel = computed(() => topicName(this.topic()));

  // Back to the question whenever a different card is shown, but still flippable locally.
  readonly showAnswer = linkedSignal({
    source: () => this.card().id,
    computation: () => false,
  });

  private readonly injector = inject(Injector);
  // `read: ElementRef` because the buttons are MatButton components: without it, viewChild
  // returns the component instance, which has no nativeElement.
  private readonly showAnswerButton = viewChild("showAnswerButton", {
    read: ElementRef<HTMLButtonElement>,
  });
  private readonly showQuestionButton = viewChild("showQuestionButton", {
    read: ElementRef<HTMLButtonElement>,
  });

  toggleAnswer() {
    this.showAnswer.update((shown) => !shown);

    // The face you were on is now hidden (inert), so move keyboard focus to the other side.
    afterNextRender(
      () => {
        const target = this.showAnswer() ? this.showQuestionButton() : this.showAnswerButton();
        target?.nativeElement.focus({ preventScroll: true });
      },
      { injector: this.injector },
    );
  }
}
