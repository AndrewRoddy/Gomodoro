import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimerService } from "../timer-service";

@Component({
  selector: 'app-settings-modal',
  imports: [CommonModule],
  templateUrl: './settings-modal.html',
  styleUrl: './settings-modal.scss'
})
export class SettingsModal {

  // Gets timer service
  private timerService = inject(TimerService);
  // Settings signals
  public notifications = signal(true);
  // expose the ratio signal from the timer service so the template can read it
  public ratio = this.timerService.ratio;

  // options for ratio (work : break)
  public ratioOptions = [1, 2, 3, 4, 5];

  toggleNotifications() {
    this.notifications.update(v => !v);
  }

  setRatio(value: number) {
    this.timerService.updateRatio(value);
  }

  resetTimer() {
    this.timerService.updateSeconds(0);
  }


}
