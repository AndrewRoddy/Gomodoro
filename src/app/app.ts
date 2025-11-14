import { Component, signal, inject, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TimerService } from './timer-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  // Importing components into app.html
  imports: [
    RouterOutlet
  ],
  standalone: true
})
export class App {
  protected readonly title = signal('gomodoro');
  private timerService = inject(TimerService);

  constructor() {
    // Watch for theme changes and apply to body
    effect(() => {
      const theme = this.timerService.theme();
      // Remove all theme classes
      document.body.classList.remove('light', 'dark', 'midnight');
      // Add the current theme class
      document.body.classList.add(theme.toLowerCase());
    });
  }
}
