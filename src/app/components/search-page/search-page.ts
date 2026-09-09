import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-page',
  imports: [FormsModule],
  templateUrl: './search-page.html',
  styleUrl: './search-page.scss',
})
export class SearchPage {
  searchQuery = '';

  searchFlashcards() {
    // TODO: implement search logic
    console.log('Searching for:', this.searchQuery);
  }
}
