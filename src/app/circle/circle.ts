import { Component, Input, computed, inject } from '@angular/core';

@Component({
  selector: 'app-circle',
  templateUrl: './circle.html',
  styleUrl: './circle.scss',
  standalone: true
})

export class Circle {

  // Sets the base values for a circle
  @Input() radius = 100;
  @Input() seconds = 0;
  @Input() total = 100;
  @Input() stroke = 10;
  @Input() activeColor = 'var(--circle-active-color)';
  
  get circumference() {return 2 * Math.PI * this.radius; }

  get distance() {
    if (this.seconds>=this.total) return 0;
    return this.circumference-((this.seconds%(this.total))*(this.circumference/this.total));
  }
}
