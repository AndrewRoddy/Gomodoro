import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from "@angular/core";
import { Title } from '@angular/platform-browser';
import { TimerService } from "../timer-service";

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
    private titleService = inject(Title);

    // Sets seconds to the signal seconds
    private cSeconds = signal(this.timerService.seconds());
    public cRatio = signal(this.timerService.ratio());

    // Gets break and pause mode
    public cBreak = this.timerService.isBreak();
    public cPause = this.timerService.isPaused();
    // Tracks whether we've already shown the end-of-break notification
    private breakNotified = false;

    // Boolean toggle to show dashes or hide dashes
    private readonly showDashes = signal(false);

    // Initializes the interval id that will be used to update every second
    private intervalId: any;

    // The last time
    private lastUpdate = Date.now();

    constructor() {
        // Ask for notification permission immediately
        void this.requestNotificationPermission();

        // Sync with timer service when it changes externally
        effect(() => {
            const serviceSeconds = this.timerService.seconds();
            // Only update if there's a significant difference (external update like reset)
            if (Math.abs(serviceSeconds - this.cSeconds()) > 1) {
                this.cSeconds.set(serviceSeconds);
                this.lastUpdate = Date.now();
            }
        
            const serviceRatio = this.timerService.ratio();
            this.cRatio.set(serviceRatio);
        });

        // Runs once per 10th of a second.
        // Timer jumps forward is out of focus
        this.intervalId = setInterval(() => {
            
            // Refresh break/pause flags from the service
            this.cBreak = this.timerService.isBreak();
            this.cPause = this.timerService.isPaused();
            
            // Sets the title to the seconds
            if (this.showDashes() || this.cSeconds() <= 0) {
                // if timer hidden show Gomodoro
                this.titleService.setTitle("Gomodoro");
            } else {
                // Shows seconds
                this.titleService.setTitle(this.formattedRemaining());
            }

            // Make sure we don't send two notifications
            if (this.breakNotified && !this.cBreak) {
                this.breakNotified = false;
            }

            const now = Date.now();
            const elapsedMs = now - this.lastUpdate;

            // Only update when at least one 1/10th of a second has passed to
            // avoid excessive updates while still being responsive.
            if (elapsedMs >= 100) {
                const deltaSeconds = elapsedMs / 1000; // fractional seconds

                // Compute per-second delta according to existing logic
                let perSecond = 0;
                if (this.cPause) { perSecond = 0; }
                else { 
                    // If in break mode uses the break to get the ratio
                    if (this.cBreak){ perSecond = (-1 * this.cRatio()); } 
                    else {  perSecond = 1;  }
                }
                let newValue = this.cSeconds() + (perSecond * deltaSeconds);

                // Prevent negative numbers
                if (newValue < 0) newValue = 0;

                // Update the signal & service
                this.cSeconds.set(newValue);
                this.timerService.updateSeconds(newValue);

                // Send notification if it makes sense
                if (this.cBreak && this.cSeconds() === 0 && !this.breakNotified) {
                    this.breakNotified = true;
                    // Fire-and-forget the async permission + notification flow
                    void this.notifyBreakEnd();
                }
                // Consume the elapsed time
                this.lastUpdate = now;
            }
        }, 100); // Every 100ms (1/10th sec)

    }

    // Request permission to show notifications
    private async requestNotificationPermission() {
        if (typeof window === 'undefined') return;
        const w = window as any;
        if (!('Notification' in w)) return;
        try {
            if (w.Notification.permission === 'default') {
                await w.Notification.requestPermission();
            }
        } catch {
            // ignore
        }
    }

    // Show notification when break ends
    private async notifyBreakEnd() {
        // Makes sure we are in the browser
        if (typeof window === 'undefined') return;
        const w = window as any;

        // Checks if notifications are not supported
        if (!('Notification' in w)) return;

        try {
            // Sends notification
            new w.Notification(
                '🟠Break over',
                { body: 'Get back to studying or whatever you were doing!' });
        } catch (err) {
            // Just ignore any notification errors they don't matter
        }
    }

    // Clean up the interval when the component is destroyed
    ngOnDestroy(): void {
        if (this.intervalId) clearInterval(this.intervalId);
    }

    // Formats the remaining number of seconds
    readonly formattedRemaining = computed(() => {
        let sec = this.cSeconds();
        if (this.cBreak) sec = Math.ceil(sec/this.cRatio());

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
