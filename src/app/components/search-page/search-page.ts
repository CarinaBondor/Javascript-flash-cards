import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-search-page',
  imports: [FormsModule, MatFormFieldModule, FormsModule, MatInputModule, MatCardModule],
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
