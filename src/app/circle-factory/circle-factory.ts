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
  // readonly colors = [
  //   '#e0e0e0', '#ff922f', '#ff6e2e', '#ff4a2e', '#ffb32e', '#ffcc2e', '#ffbf83', '#ffe833'
  // ];

  // Creates array of circles
  // public circles = signal<{ radius: number; seconds: number; total: number }[]>([]);
  public circles = signal<{ radius: number; seconds: number; total: number; stroke: number; }[]>([]);
  
  
  private baseRadius = 100; // Starting radius
  private baseStroke = 20;

  private cSeconds: number = 0; // Initializes seconds
  private cTotal: number = 0; // Initializes total
  private cBreak: boolean = false; // Initializes total

  private firstCircle: boolean = false;

  public readonly showCircles = signal(true);

  constructor() {
    effect(() => {
      // Gets the seconds and the total
      this.cSeconds = this.timerService.seconds();
      this.cTotal = this.timerService.total();
      this.cBreak = this.timerService.isBreak();
      
      // Creates the first circle only once
      if (!this.firstCircle) { 
        this.circles.update(circles => [
          ...circles,
          {
            radius: this.baseRadius,
            seconds: 0,
            total: this.cTotal,
            stroke: this.baseStroke
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
      if (this.showCircles() === false) {
        // When circles are hidden, keep a single placeholder circle with 0 seconds
        return [{
          radius: this.baseRadius,
          seconds: 0,
          total: this.cTotal,
          stroke: this.baseStroke
        }];
      }
      if (circles.length === 0) return circles;
      
      // Puts all of the circles in circles array into updated
      const updated = [...circles];
      
      // Expected number of circles
      const targetCount = Math.floor(this.cSeconds / this.cTotal) + 1;
      
      if (updated.length < targetCount) {
        while (updated.length < targetCount) {
          
          // Updates the first circle after it is re added by constructor
          if (targetCount > 1) {
            updated[0] = { ...updated[0], seconds: (this.cTotal) };
          }

          // Gets the last index in the circles array
          const lastIndex = updated.length - 1; 
          const last = updated[lastIndex]; // Puts the last circle into last

          // circleSeconds is max unless last circle to be added
          let circleSeconds = 0;
          if (updated.length < targetCount-1) circleSeconds = this.cTotal;
          else circleSeconds = this.cSeconds%this.cTotal;

          // Adds a circle to the circle array
          updated.push({
            radius: last.radius * 0.81,
            seconds: circleSeconds,
            total: this.cTotal,
            stroke: last.stroke * 0.79
          });
        }
        // Returns updated to update circled before the following code us run
        return updated;
      }

      // Gets the last index in the circles array
      const lastIndex = circles.length - 1; 
      const last = updated[lastIndex]; // Puts the last circle into last

      // Updates the seconds of the last folder
      updated[lastIndex] = { ...last, seconds: (this.cSeconds%this.cTotal) };
  
      
      // Removes a circle if there are too many
      if (updated.length > targetCount) {
        // remove extra circles from the end
        updated.splice(targetCount, updated.length - targetCount);
      }

      return updated;

    })
  }

  // Allows the user to click on the time to edit the dashes
  toggleCircles() {
      this.showCircles.update(v => !v);
  }
}
