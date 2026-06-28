import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FlashCardsHolder } from './components/FlashCardsHolder/FlashCardsHolder.component';
import { Menu } from './components/menu/menu.component';
import { flashcardsData } from './data/cards';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, Menu, FlashCardsHolder],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('javascript-flash-cards');
  cards = flashcardsData;
}
