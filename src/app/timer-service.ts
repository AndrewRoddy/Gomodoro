import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
 
  // Seconds
  readonly seconds = signal(0);
  updateSeconds(value: number) {
    this.seconds.set(value);
  }

  
  // Minutes // 1 hour 60s*60m
  readonly total = signal(60*60);
  updateTotal(value: number) {
    this.total.set(value);
  }

  // Break active or inactive
  readonly isBreak = signal(false);
  updateBreak(value: boolean) {
    this.isBreak.set(value);
  }

  // Break active or inactive
  readonly isPaused = signal(false);
  updatePause(value: boolean) {
    this.isPaused.set(value);
  }

}

