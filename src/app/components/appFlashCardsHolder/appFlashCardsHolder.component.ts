import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  inject,
  input,
  linkedSignal,
  signal,
} from "@angular/core";
import { FlashCard } from "../appFlashCard/appFlashCard.component";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { CardsService, DeckKey } from "../../services/cardsService/cards.service";

@Component({
  selector: "app-flash-cards-holder",
  imports: [FlashCard, MatButtonModule, MatIconModule],
  templateUrl: "./appFlashCardsHolder.component.html",
  styleUrl: "./appFlashCardsHolder.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "(document:keydown.arrowright)": "onArrowKey($event, 1)",
    "(document:keydown.arrowleft)": "onArrowKey($event, -1)",
  },
})
export class FlashCardsHolder {
  private readonly cardsService = inject(CardsService);
  readonly deck = input<DeckKey>("all");
  readonly cards = computed(() => this.cardsService.getDeckCards(this.deck()));

  // Starts at the deck's saved position, re-syncs if the deck input changes, and can still be set locally.
  readonly currentIndex = linkedSignal(() => this.cardsService.getDeckIndex(this.deck()));
  readonly currentCard = computed(() => this.cards()[this.currentIndex()]);
  readonly cardsLeft = computed(() => this.cards().length - 1 - this.currentIndex());
  readonly isAnimating = signal(false);

  private animationTimer?: ReturnType<typeof setTimeout>;

  constructor() {
    inject(DestroyRef).onDestroy(() => clearTimeout(this.animationTimer));
  }

  nextCard() {
    if (this.currentIndex() < this.cards().length - 1 && !this.isAnimating()) {
      this.triggerCardChange(this.currentIndex() + 1);
    }
  }

  previousCard() {
    if (this.currentIndex() > 0 && !this.isAnimating()) {
      this.triggerCardChange(this.currentIndex() - 1);
    }
  }

  // Left and right arrow keys move through the deck, unless you're typing in a field.
  onArrowKey(event: Event, step: 1 | -1) {
    const target = event.target as HTMLElement | null;
    if (target?.closest("input, textarea, select, [contenteditable]")) {
      return;
    }
    if (step === 1) {
      this.nextCard();
    } else {
      this.previousCard();
    }
  }

  private triggerCardChange(index: number) {
    // Save the position straight away, so navigating away mid-animation can't lose it.
    this.cardsService.setDeckIndex(this.deck(), index);
    this.isAnimating.set(true);
    this.animationTimer = setTimeout(() => {
      this.currentIndex.set(index);
      this.animationTimer = setTimeout(() => this.isAnimating.set(false), 40);
    }, 100);
  }
}
