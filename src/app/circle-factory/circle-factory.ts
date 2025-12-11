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

  constructor() {
    effect(() => {
      // Gets the seconds and the total
      this.cSeconds = this.timerService.seconds();
      this.cTotal = this.timerService.total();
      this.cBreak = this.timerService.isBreak();
      // Watch refresh trigger to force updates
      this.timerService.refreshTrigger();
      
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
      // Hide circles if hideCircles is set to "Hide"
      if (this.timerService.hideCircles() === "Hide") {
        // When circles are hidden, keep a single placeholder circle with 0 seconds
        return [{
          radius: this.baseRadius,
          seconds: 0,
          total: this.cTotal,
          stroke: this.baseStroke
        }];
      }
      if (circles.length === 0) return circles;
      
      // Expected number of circles based on current seconds
      const targetCount = Math.floor(this.cSeconds / this.cTotal) + 1;
      
      // Rebuild circles array from scratch if count changed significantly
      // Handles both adding and removing time properly
      //
      if (circles.length !== targetCount) {
        const newCircles: { radius: number; seconds: number; total: number; stroke: number; }[] = [];
        let currentRadius = this.baseRadius;
        let currentStroke = this.baseStroke;
        
        for (let i = 0; i < targetCount && i < 50; i++) {
          let circleSeconds: number;
          
          if (i < targetCount - 1) {
            // Completed circles get full time
            circleSeconds = this.cTotal;
          } else {
            // Last circle gets remainder
            circleSeconds = this.cSeconds % this.cTotal;
          }
          
          newCircles.push({
            radius: currentRadius,
            seconds: circleSeconds,
            total: this.cTotal,
            stroke: currentStroke
          });
          
          currentRadius *= 0.81;
          currentStroke *= 0.79;
        }
        
        return newCircles;
      }
      
      // If count is the same, just update the last circle's seconds
      const updated = [...circles];
      const lastIndex = updated.length - 1;
      updated[lastIndex] = { 
        ...updated[lastIndex], 
        seconds: this.cSeconds % this.cTotal 
      };
      
      return updated;
    })
  }
}
