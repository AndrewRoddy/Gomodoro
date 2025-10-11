import { inject, Component, signal, effect } from '@angular/core';
import { Circle } from '../circle/circle';
import { TimerService } from "../timer-service"

// Allows the user of ngContainer (the signal container)
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-circle-factory',
  imports: [Circle, CommonModule],
  templateUrl: './circle-factory.html',
  styleUrl: './circle-factory.scss',
  standalone: true
})
export class CircleFactory {
  
  // Allows getting variables from timerService that can be updated
  private timerService = inject(TimerService);
  
  // Gets list of all colors 
  readonly colors = [
    '#e0e0e0', '#ff922f', '#ff6e2e', '#ff4a2e', '#ffb32e', '#ffcc2e', '#ffbf83', '#ffe833'
  ];

  // Creates array of circles
  public circles = signal<{ radius: number; seconds: number; total: number }[]>([]);
  
  
  private baseRadius = 100; // Starting radius
  private radiusStep = 21; // Amount the next radius decreases
  private cSeconds: number = 0; // Initializes seconds
  private cTotal: number = 0; // Initializes total

  private firstCircle: boolean = false;

  constructor() {
    effect(() => {
      // Gets the seconds and the total
      this.cSeconds = this.timerService.seconds();
      this.cTotal = this.timerService.total();

      // Creates the first circle only once
      if (!this.firstCircle) { 
        this.circles.update(circles => [
          ...circles,
          {
            radius: this.baseRadius,
            seconds: 0,
            total: this.cTotal
          }
        ]);
        this.firstCircle = true;
      }

      // Updates the circles
      this.updateCircles(); // Updates the circle
    });
  };
  

  // Updates the circles with secons being updated
  private updateCircles(): void {
    this.circles.update(circles => {
      
      // Makes sure that we don't add a new circle
      if (circles.length === 0) return circles;

      // Gets the last index in the circles array
      const lastIndex = circles.length - 1; 

      // Puts all of the circles in circles array into updated
      const updated = [...circles];

      const last = updated[lastIndex]; // Puts the last circle into lat
    
      // Updates the seconds of the last folder
      updated[lastIndex] = { ...last, seconds: (this.cSeconds%this.cTotal) };
      
      // Add a new circle when the last one completes
      if (this.cSeconds >= last.total && (this.cSeconds % last.total === 0)) {

        // Makes sure the last circle is full after editing it with push
        updated[lastIndex] = { ...last, seconds: (this.cSeconds) };
        
        // Adds a circle to the circle array
        updated.push({
          radius: last.radius - this.radiusStep,
          seconds: 0,
          total: this.cTotal
        });
      }
      return updated;
;
    })
  }
}
