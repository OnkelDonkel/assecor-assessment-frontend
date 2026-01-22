import {Component, Input} from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-carousel',
  imports: [
    NgClass
  ],
  templateUrl: './carousel.html',
  styleUrl: './carousel.scss'
})
export class Carousel {
  @Input() images: string[] = [];
  currentIndex = 0;

  goToSlide(index: number) {
    this.currentIndex = index;
  }
}
