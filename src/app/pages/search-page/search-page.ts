import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Flashcard } from '../../models/flashcard.model';
import { SearchService } from '../../services/search.service';
import { FlashCard } from '../../components/FlashCard/FlashCard.component';

@Component({
  selector: 'app-search-page',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatCardModule, FlashCard],
  templateUrl: './search-page.html',
  styleUrl: './search-page.scss',
})
export class SearchPage {
  searchQuery = '';
  results: Flashcard[] = [];
  private readonly searchService = inject(SearchService);

  searchFlashcards(query = this.searchQuery): void {
    this.searchQuery = query;
    this.results = this.searchService.search(query);
  }
}
