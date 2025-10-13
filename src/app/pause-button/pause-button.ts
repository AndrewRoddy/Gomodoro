import { Component, inject, signal, effect } from '@angular/core';
import { TimerService } from '../timer-service';

@Component({
  selector: 'app-pause-button',
  imports: [],
  templateUrl: './pause-button.html',
  styleUrl: './pause-button.scss',
  standalone: true
})
export class PauseButton {

  // Inject shared TimerService
  private timerService = inject(TimerService);

  // Local signal to track current break status
  public cPause = signal(this.timerService.isPaused());

  constructor() {
    // Keep local signal in sync with the TimerService
    effect(() => {
      this.cPause.set(this.timerService.isPaused());
    });
  }

  togglePause() {
    const newValue = !this.cPause();
    this.cPause.set(newValue);
    this.timerService.updatePause(newValue); // Tell the service too
  }
}
