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

  toggleNotifications() {
    this.notifications.update(v => !v);
  }


  resetTimer() {
    this.timerService.updateSeconds(0);
  }
}
