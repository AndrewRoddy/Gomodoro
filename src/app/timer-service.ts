import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
 
  // Seconds
  //
  constructor() {

    // Checks if we are in a browser and able to access local storage or not
    if (typeof window !== 'undefined' && window.localStorage) {

      // Load saved seconds from localStorage
      const savedSeconds = localStorage.getItem('seconds');

      // Only gets it if its already there
      if (savedSeconds !== null) {
        this.seconds.set(parseInt(savedSeconds, 10));
      }
    }
  }

  readonly seconds = signal(0);
  updateSeconds(value: number) {
    this.seconds.set(value);

    // Makes sure we are in a browser before tryinig to save seconds
    if (typeof window !== 'undefined' && window.localStorage) {
      // Save to localStorage whenever it updates
      localStorage.setItem('seconds', value.toString());
    }
  }

  // Minutes // 1 hour 60s*60m
  //
  readonly total = signal(60*60);
  updateTotal(value: number) {
    this.total.set(value);
  }

  // Break active or inactive
  //
  readonly isBreak = signal(false);
  updateBreak(value: boolean) {
    this.isBreak.set(value);
  }

  // Break active or inactive
  //
  readonly isPaused = signal(false);
  updatePause(value: boolean) {
    this.isPaused.set(value);
  }

}

