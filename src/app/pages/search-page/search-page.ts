import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SearchService } from '../../services/search.service';
import { FlashCard } from '../../components/FlashCard/FlashCard.component';

@Component({
  selector: 'app-search-page',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatCardModule, FlashCard],
  templateUrl: './search-page.html',
  styleUrl: './search-page.scss',
})
export class SearchPage {
  private readonly searchService = inject(SearchService);

  // Signals tell zoneless Angular when to re-render, however the query gets updated.
  readonly searchQuery = signal('');
  readonly hasQuery = computed(() => this.searchQuery().trim().length > 0);
  readonly results = computed(() => this.searchService.search(this.searchQuery()));
}
