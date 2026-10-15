import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlashCardsHolder } from '../../components/FlashCardsHolder/FlashCardsHolder.component';
import { Flashcard } from '../../models/flashcard.model';
import { CardsService } from '../../services/cards.service';

type StudyCategory = 'angular' | 'javascript' | 'typescript';

const categoryTitles: Record<StudyCategory, string> = {
  angular: 'Angular',
  javascript: 'JavaScript',
  typescript: 'TypeScript',
};

@Component({
  selector: 'app-study-topic-page',
  imports: [FlashCardsHolder],
  templateUrl: './study-topic-page.html',
  styleUrl: './study-topic-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudyTopicPage {
  private readonly cardsService = inject(CardsService);
  readonly category = inject(ActivatedRoute).snapshot.data['category'] as StudyCategory;

  readonly title = categoryTitles[this.category];
  readonly cards: Flashcard[] = this.cardsService.getDeckCards(this.category);
}
