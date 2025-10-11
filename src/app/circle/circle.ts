import { Component, Input, computed, inject } from '@angular/core';
import { Timer } from "../timer/timer"

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
  @Input() stroke = 20;


  get circumference() {return 2 * Math.PI * this.radius; }

  get distance() {
    if (this.seconds>=this.total) return 0;
    return this.circumference-((this.seconds%(this.total))*(this.circumference/this.total));
  }

  get rad() {
    return this.radius;
  }


}
