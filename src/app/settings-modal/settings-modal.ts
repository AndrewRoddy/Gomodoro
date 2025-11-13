import { Component, signal, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimerService } from "../timer-service";

@Component({
  selector: 'app-settings-modal',
  imports: [CommonModule],
  templateUrl: './settings-modal.html',
  styleUrl: './settings-modal.scss'
})
export class SettingsModal implements OnInit, OnDestroy {

  // Gets timer service
  private timerService = inject(TimerService);

  // Settings signals
  public notifications = signal(true);
  public patreonUsername = signal<string>('');
  
  // expose the ratio signal from the timer service so the template can read it
  public ratio = this.timerService.ratio;
  
  // options for ratio (work : break)
  public ratioOptions = [1, 2, 3, 4, 5];
  
  private messageListener?: (event: MessageEvent) => void;

  ngOnInit() {
    // Listen for messages from the OAuth callback popup
    this.messageListener = (event: MessageEvent) => {
      // Security check - only accept messages from your domain
      const allowedOrigins = [
        'https://gomodoro.andrewroddy.com',
        'https://gomodoro.drewgo.com',
        'http://localhost:4200'
      ];
      
      if (!allowedOrigins.includes(event.origin)) {
        return;
      }

      // Handle successful authentication
      if (event.data.type === 'PATREON_AUTH_SUCCESS') {
        const userName = event.data.data.user?.attributes?.full_name || 
                        event.data.data.user?.attributes?.first_name || 
                        'Unknown User';
        this.patreonUsername.set(userName);
        console.log('Signed in as:', userName);
      }
    };

    window.addEventListener('message', this.messageListener);
  }

  ngOnDestroy() {
    // Clean up the message listener when component is destroyed
    if (this.messageListener) {
      window.removeEventListener('message', this.messageListener);
    }
  }

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
    
    // Use current origin for redirect URI
    const origin = window.location.origin;
    const redirectUri = encodeURIComponent(`${origin}/patreon/callback`);
    const scope = encodeURIComponent('identity identity[email]');
    
    // Patreon OAuth URL
    const url = `https://www.patreon.com/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
    
    // Open in popup window
    const features = 'width=600,height=700,left=100,top=100';
    window.open(url, 'patreon-auth', features);
  }

}
