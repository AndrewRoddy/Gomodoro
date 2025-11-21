import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimerService {


  constructor() {

    // Checks if we are in a browser and able to access local storage or not
    if (typeof window !== 'undefined' && window.localStorage) {

      // Seconds //
      // Load saved seconds from localStorage
      const savedSeconds = localStorage.getItem('seconds');
      if (savedSeconds !== null) { // Only gets it if its already there
        const parsedSeconds = parseInt(savedSeconds, 10);
        // Validate: seconds should be a valid safe integer
        if (!isNaN(parsedSeconds) && parsedSeconds >= 0 && parsedSeconds <= Number.MAX_SAFE_INTEGER) {
          this.seconds.set(parsedSeconds);
        } else {
          // Clear invalid value
          localStorage.removeItem('seconds');
        }
      }

      // Ratio //
      // Load saved ratio from localStorage (work:break ratio)
      const savedRatio = localStorage.getItem('ratio');
      if (savedRatio !== null) {
        this.ratio.set(parseInt(savedRatio, 10));
      }

      // Theme //
      // Load saved ratio from localStorage (work:break ratio)
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme !== null) {
        this.theme.set(savedTheme);
      }

      // Break //
      // Load saved break from localStorage
      const savedBreak = localStorage.getItem('break');
      if (savedBreak !== null) {
        this.isBreak.set(savedBreak === 'true');
      }

      // Hidden Circles //
      // Load saved break from localStorage
      const hiddenCircles = localStorage.getItem('hideCircles');
      if (hiddenCircles !== null) {
        this.hideCircles.set(hiddenCircles);
      }

      // Paused //
      // Load saved break from localStorage
      const isPaused = localStorage.getItem('paused');
      if (isPaused !== null) {
        this.isPaused.set(isPaused === 'true');
      }

      // Last Timestamp //
      // Load saved timestamp from localStorage
      const lastTimestamp = localStorage.getItem('lastTimestamp');
      if (lastTimestamp !== null) {
        this.lastTimestamp.set(parseInt(lastTimestamp, 10));
      }

      // Undo Timestamp //
      // Load saved undo timestamp from local storage
      // const undoTimestamp = localStorage.getItem('undoTimestamp');
      // if (undoTimestamp !== null) {
      //   this.undoTimestamp.set(parseInt(undoTimestamp, 10));
      // }

    }
  }

  // Seconds
  readonly seconds = signal(0);
  updateSeconds(value: number) { this.seconds.set(value);

    // Makes sure we are in a browser before trying to save seconds
    if (typeof window !== 'undefined' && window.localStorage) {
      // Round the seconds before storing them
      const rounded = Math.round(value);
      // Save rounded value to localStorage whenever it updates
      localStorage.setItem('seconds', rounded.toString());
    }
  }

  // Ratio // X:1 X minutes of work vs break
  readonly ratio = signal(4);
  updateRatio(value: number) { this.ratio.set(value);

    // Makes sure we are in a browser before trying to save the ratio
    if (typeof window !== 'undefined' && window.localStorage) {
      // Save rounded value to localStorage whenever it updates
      localStorage.setItem('ratio', value.toString());
    }
  }

  // Ratio // X:1 X minutes of work vs break
  readonly theme = signal("Light");
  updateTheme(value: string) { this.theme.set(value);

    // Makes sure we are in a browser before trying to save the ratio
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('theme', value.toString());
    }
  }

  // Total seconds per circle // 1 hour 60s*60m
  readonly total = signal(60*60);
  updateTotal(value: number) { this.total.set(value); }

  // Break active or inactive
  readonly isBreak = signal(false);
  updateBreak(value: boolean) { this.isBreak.set(value); 
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('break', value.toString());
    }
  }

  // Break active or inactive
  readonly hideCircles = signal("Show");
  updateHiddenCircles(value: string) { this.hideCircles.set(value); 
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('hideCircles', value.toString());
    }
  }



  // Paused or not paused
  readonly isPaused = signal(false);
  updatePause(value: boolean) { this.isPaused.set(value);
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('paused', value.toString());
    }
  }

  // Last timestamp when timer was active
  readonly lastTimestamp = signal(Date.now());
  updateLastTimestamp(value: number) { this.lastTimestamp.set(value);
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('lastTimestamp', value.toString());
    }
  }

  // Allows user to revert before new timestamp was added
  // readonly undoTimestamp = signal(0);
  // updateUndoTimestamp(value: number) { this.lastTimestamp.set(value);
  //   if (typeof window !== 'undefined' && window.localStorage) {
  //     localStorage.setItem('undoTimestamp', value.toString());
  //   }
  // }

}

