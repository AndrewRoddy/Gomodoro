import { ChangeDetectionStrategy, Component, computed, inject, signal } from "@angular/core";
import { TimerService } from "../timer-service"

@Component({
    selector: 'app-timer',
    templateUrl: './timer.html',
    styleUrls: ['./timer.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})

export class Timer {

    // Allows getting variables from timerService that can be updated
    private timerService = inject(TimerService);

    // Sets seconds to the signal seconds
    private cSeconds = signal(this.timerService.seconds());

    // Gets break and pause mode
    public cBreak = this.timerService.isBreak();
    public cPause = this.timerService.isPaused();
    
    // Boolean toggle to show dashes or hide dashes
    private readonly showDashes = signal(false);

    // Initializes the interval id that will be used to update every second
    private intervalId: any;

    // The last time
    private lastUpdate = Date.now();
    
    constructor() {
        // Runs once per 10th of a second. 
        // Timer will jump forward by the real elapsed time instead of falling behind.
        this.intervalId = setInterval(() => {

            // Refresh break/pause flags from the service
            this.cBreak = this.timerService.isBreak();
            this.cPause = this.timerService.isPaused();

            const now = Date.now();
            const elapsedMs = now - this.lastUpdate;

            // Only update when at least one 1/10th of a second has passed to
            // avoid excessive updates while still being responsive.
            if (elapsedMs >= 100) {
                const deltaSeconds = elapsedMs / 1000; // fractional seconds

                // Compute per-second delta according to existing logic
                let perSecond = 0;
                if (this.cPause) { perSecond = 0; } 
                else { perSecond = this.cBreak ? -4 : 1; }

                let newValue = this.cSeconds() + (perSecond * deltaSeconds);

                // Prevent negative numbers
                if (newValue < 0) newValue = 0;

                // Update the signal & service
                this.cSeconds.set(newValue);
                this.timerService.updateSeconds(newValue);

                // Consume the elapsed time
                this.lastUpdate = now;
            }
        }, 100); // Every 100ms (1/10th sec)

    }

    // Clean up the interval when the component is destroyed
    ngOnDestroy(): void {
        if (this.intervalId) clearInterval(this.intervalId);
    }
        
    // Formats the remaining number of seconds
    readonly formattedRemaining = computed(() => {
        let sec = this.cSeconds();
        if (this.cBreak) sec = Math.ceil(sec/4);

        if (this.showDashes()) return '--:--';
        return this.formattedTime(sec);
    });
    
    // Allows the user to click on the time to edit the dashes
    toggleDashes() {
        this.showDashes.update(v => !v);
    }
        
    // Formats the time to only show minutes
    private formattedTime(totalSeconds: number) {
        let date: string = new Date(totalSeconds * 1000).toISOString();

        if (totalSeconds < 10) return date.slice(18,19); // s
        if (totalSeconds < 60) return date.slice(17,19);; // ss
        if (totalSeconds < (60*60)) return date.slice(14,19) // mm:ss
        if (totalSeconds < 10*(60*60)) return date.slice(12,19); // h:mm:ss
        return date.slice(11,19); // hh:mm:ss
    }

}
