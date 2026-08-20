import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'flash-card',
  imports: [CommonModule],
  templateUrl: './FlashCard.component.html',
  styleUrl: './FlashCard.component.css', // Adds the stylesheet reference
})
export class FlashCard implements OnChanges {
  @Input() question = '';
  @Input() answer = '';
  showAnswer = false;

  // This hook triggers automatically whenever any @Input() properties change
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['question'] || changes['answer']) {
      this.showAnswer = false;
    }
  }

  toggleAnswer() {
    this.showAnswer = !this.showAnswer;
  }
}
