import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FlashCard } from './components/FlashCard/FlashCard.component';
import { Menu } from './components/menu/menu.component';
import { flashcardsData } from './data/cards';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, FlashCard, Menu],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('javascript-flash-cards');
  cards = flashcardsData;
}
