import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CardsService } from '../../services/cards.service';
import { FavouriteButton } from '../favouriteButton/favouriteButton';

@Component({
  selector: 'app-card-detail-page',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatIconModule, RouterLink, FavouriteButton],
  templateUrl: './card-detail-page.html',
  styleUrl: './card-detail-page.scss',
})
export class CardDetailPage {
  private readonly route = inject(ActivatedRoute);
  private readonly cardsService = inject(CardsService);
  private readonly routeParams = toSignal(this.route.paramMap, {
    initialValue: this.route.snapshot.paramMap,
  });

  readonly card = computed(() => {
    const id = Number(this.routeParams().get('id'));
    return this.cardsService.getById(id);
  });
}
