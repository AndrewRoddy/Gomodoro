import { Component, effect, inject } from '@angular/core';
import { TimerService } from '../timer-service';

@Component({
  selector: 'app-favicon-manager',
  imports: [],
  templateUrl: './favicon-manager.html',
  styleUrl: './favicon-manager.scss'
})
export class FaviconManager {
  private timerService = inject(TimerService);

  constructor() {

    // Watches for changes to isPaused or isBreak and update favicon
    effect(() => {
      this.updateFavicon();
    });
  }

  private updateFavicon() {
    // Only run in browser environment
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    let faviconPath: string;

    // Priority: paused > break > default
    if (this.timerService.isPaused())     { faviconPath = 'gray-favicon.ico';   } 
    else if (this.timerService.isBreak()) { faviconPath = 'purple-favicon.ico'; } 
    else                                  { faviconPath = 'orange-favicon.ico'; }

    // Find existing favicon link element
    let link = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
    
    if (!link) {
      // Create new link element if none exists
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }

    link.href = faviconPath;
  }
}
