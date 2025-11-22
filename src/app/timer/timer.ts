import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from "@angular/core";
import { Title } from '@angular/platform-browser';
import { TimerService } from "../timer-service";
import { zip } from "rxjs";

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
    public cBreak = signal(this.timerService.isBreak());
    public cPause = signal(this.timerService.isPaused());
    // Tracks whether we've already shown the end-of-break notification
    private breakNotified = false;

    // Boolean toggle to show dashes or hide dashes
    private readonly showDashes = signal(false);

    // Initializes the interval id that will be used to update every second
    private intervalId: any;

    // The last time
    private lastUpdate = Date.now();

    constructor() {
        // Request notification permission on page load
        // Note: This must be triggered by user gesture in most browsers
        // If denied, user can manually enable in browser settings
        if (typeof window !== 'undefined' && 'Notification' in window) {
            if (Notification.permission === 'default') {
                // Use setTimeout to defer until after first render/user interaction
                setTimeout(() => {
                    Notification.requestPermission().catch(() => {
                        // Permission denied or error - user can enable in settings
                    });
                }, 1000);
            }
        }
        
        // Calculate elapsed time since last session if timer was running
        if (!this.timerService.isPaused()) {
            const savedTime = this.timerService.lastTimestamp();

            // Allows to revert to previous timestamp
            // this.timerService.updateUndoTimestamp(savedTime);

            const now = Date.now();
            const elapsedSeconds = (now - savedTime) / 1000;
            
            // Add elapsed time to current seconds
            const currentSeconds = this.timerService.seconds();
            let newSeconds = currentSeconds;
            
            if (this.timerService.isBreak()) {
                // If in break mode, subtract time
                newSeconds = currentSeconds - (elapsedSeconds * this.timerService.ratio());

                // Make sure seconds don't go below zero
                if (newSeconds < 0) newSeconds = 0;
            } else {
                // If in work mode, add time
                newSeconds = currentSeconds + elapsedSeconds;
            }
            
            this.timerService.updateSeconds(newSeconds);
        }

        

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
            
            // Sync break and pause states
            this.cBreak.set(this.timerService.isBreak());
            this.cPause.set(this.timerService.isPaused());
        });

        // Runs once per 10th of a second.
        // Timer jumps forward is out of focus
        this.intervalId = setInterval(() => {
            
            // Sets the title to the seconds
            if (this.showDashes() || this.cSeconds() <= 0) {
                // if timer hidden show Gomodoro
                this.titleService.setTitle("Gomodoro");
            } else {
                // Shows seconds
                this.titleService.setTitle(this.formattedRemaining());
            }

            // Make sure we don't send two notifications
            if (this.breakNotified && !this.cBreak()) {
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
                if (this.cPause()) { perSecond = 0; }
                else { 
                    // If in break mode uses the break to get the ratio
                    if (this.cBreak()){ perSecond = (-1 * this.cRatio()); } 
                    else {  perSecond = 1;  }
                }
                let newValue = this.cSeconds() + (perSecond * deltaSeconds);

                // Prevent negative numbers
                if (newValue < 0) newValue = 0;

                // Update the signal & service
                this.cSeconds.set(newValue);
                this.timerService.updateSeconds(newValue);
                
                // Update the timestamp for elapsed time tracking
                if (!this.cPause()) { this.timerService.updateLastTimestamp(now); }

                // Send notification if it makes sense
                if (this.cBreak() && this.cSeconds() === 0 && !this.breakNotified) {
                    this.breakNotified = true;
                    // Fire-and-forget the async permission + notification flow
                    void this.notifyBreakEnd();
                }
                // Consume the elapsed time
                this.lastUpdate = now;
            }
        }, 1); // Every 100ms (1/10th sec)

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
        if (this.cBreak()) sec = Math.ceil(sec/this.cRatio());

        if (this.showDashes()) return '--:--';
        return this.formattedTime(sec);
    });

    // Allows the user to click on the time to edit the dashes
    toggleDashes() {
        this.showDashes.update(v => !v);
    }

    // Formats the time to only show minutes
    private formattedTime(totalSeconds: number) {
        const seconds = Math.floor(totalSeconds);
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        if (seconds < 10) return secs.toString(); // s
        if (seconds < 60) return secs.toString().padStart(2, '0'); // ss
        if (seconds < (60*60)) return `${minutes}:${secs.toString().padStart(2, '0')}`; // mm:ss
        if (seconds < 10*(60*60)) return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`; // h:mm:ss
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`; // hh:mm:ss
    }

}
