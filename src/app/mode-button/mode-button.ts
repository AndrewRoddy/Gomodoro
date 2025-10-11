import { Component, inject, signal, effect } from '@angular/core';
import { TimerService } from '../timer-service';

@Component({
  selector: 'app-mode-button',
  standalone: true,
  templateUrl: './mode-button.html',
  styleUrl: './mode-button.scss'
})
export class ModeButton {

  // Inject shared TimerService
  private timerService = inject(TimerService);

  // Local signal to track current break status
  public cBreak = signal(this.timerService.isBreak());

  constructor() {
    // Keep local signal in sync with the TimerService
    effect(() => {
      this.cBreak.set(this.timerService.isBreak());
    });
  }

  toggleMode() {
    const newValue = !this.cBreak();
    this.cBreak.set(newValue);
    this.timerService.updateBreak(newValue); // Tell the service too
  }
}
