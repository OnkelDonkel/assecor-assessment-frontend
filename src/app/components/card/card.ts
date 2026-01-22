import {Component, EventEmitter, Input, Output} from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardImage,
  MatCardTitle
} from '@angular/material/card';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-card',
  imports: [
    MatCardActions,
    MatCardContent,
    MatCardTitle,
    MatCard,
    MatButton,
    MatCardImage
  ],
  templateUrl: './card.html',
  styleUrl: './card.scss'
})

export class MyCardComponent {
  @Input() title: string = '';
  @Input() image: string = '';
  @Input() content: string = '';
  @Input() linkText: string = '';
  @Output() cardClick = new EventEmitter<void>();
  @Output() buttonClick = new EventEmitter<void>();

  onCardClick() {
    this.cardClick.emit();
  }

  onButtonClick(event: Event) {
    event.stopPropagation();
    this.buttonClick.emit();
  }
}
