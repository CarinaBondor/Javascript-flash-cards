import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'flash-card',
  imports: [CommonModule],

  templateUrl: './FlashCard.component.html',
  styleUrls: ['./FlashCard.component.css'],
})
export class FlashCard {
  @Input() question = '';
  @Input() answer = '';
  showAnswer = false;

  toggleAnswer() {
    this.showAnswer = !this.showAnswer;
  }
}
