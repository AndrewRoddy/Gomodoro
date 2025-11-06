import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimerService {


  constructor() {

    // Checks if we are in a browser and able to access local storage or not
    if (typeof window !== 'undefined' && window.localStorage) {

      // Seconds //
      // Load saved seconds from localStorage
      const savedSeconds = localStorage.getItem('seconds');
      if (savedSeconds !== null) { // Only gets it if its already there
        this.seconds.set(parseInt(savedSeconds, 10));
      }

      // Ratio //
      // Load saved ratio from localStorage (work:break ratio)
      const savedRatio = localStorage.getItem('ratio');
      if (savedRatio !== null) {
        this.ratio.set(parseInt(savedRatio, 10));
      }

      // Break //
      // Load saved break from localStorage
      const savedBreak = localStorage.getItem('break');
      if (savedBreak !== null) {
        this.isBreak.set(savedBreak === 'true');
      }

      // Paused //
      // Load saved break from localStorage
      const isPaused = localStorage.getItem('paused');
      if (isPaused !== null) {
        this.isPaused.set(isPaused === 'true');
      }

    }
  }

  // Seconds
  readonly seconds = signal(0);
  updateSeconds(value: number) { this.seconds.set(value);

    // Makes sure we are in a browser before trying to save seconds
    if (typeof window !== 'undefined' && window.localStorage) {
      // Round the seconds before storing them
      const rounded = Math.round(value);
      // Save rounded value to localStorage whenever it updates
      localStorage.setItem('seconds', rounded.toString());
    }
  }

  // Ratio // X:1 X minutes of work vs break
  readonly ratio = signal(4);
  updateRatio(value: number) { this.ratio.set(value);

    // Makes sure we are in a browser before trying to save the ratio
    if (typeof window !== 'undefined' && window.localStorage) {
      // Save rounded value to localStorage whenever it updates
      localStorage.setItem('ratio', value.toString());
    }
  }

  // Total seconds per circle // 1 hour 60s*60m
  readonly total = signal(60*60);
  updateTotal(value: number) { this.total.set(value); }

  // Break active or inactive
  readonly isBreak = signal(false);
  updateBreak(value: boolean) { this.isBreak.set(value); 
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('break', value.toString());
    }
  }

  // Paused or not paused
  readonly isPaused = signal(false);
  updatePause(value: boolean) { this.isPaused.set(value);
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('paused', value.toString());
    }
  }

}

