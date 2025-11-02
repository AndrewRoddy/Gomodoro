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


  signInWithPatreon() {
    const clientId = 'xQeaKLua6MiZLsGQPTHFqRdPji9OBmruyxxrd34eSgxFLljMr2ujADK31gmMJ_kp';
    const redirectUri = encodeURIComponent('https://gomodoro.drewgo.com/patreon/callback');
    const scope = encodeURIComponent('identity identity[email]');
    
    // Patreon OAuth URL
    const url = `https://www.patreon.com/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
    
    // Open in popup window
    const features = 'noopener,noreferrer,width=600,height=700';
    window.open(url, '_blank', features);
  }


}
