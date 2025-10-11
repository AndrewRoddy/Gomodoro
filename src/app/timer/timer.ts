import { effect, OnInit, OnDestroy, ChangeDetectionStrategy, Component, computed, DestroyRef, inject, signal, Injectable } from "@angular/core";
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
    // private cTotal = signal(this.timerService.total());

    // Boolean toggle to show dashes or hide dashes
    private readonly showDashes = signal(false);

    // Initializes the interval id that will be used to update every second
    private intervalId: any;
    
    constructor() {
        // Runs once every minute
        this.intervalId = setInterval(() => {
            // Adds one per second
            const newValue = this.cSeconds() + 1;
            this.cSeconds.set(newValue);
            // Updates the timer service seconds
            this.timerService.updateSeconds(newValue);
        // }, 1000); // Once per second
        }, 1); 
    }
        
    // Formats the remaining number of seconds
    readonly formattedRemaining = computed(() => {
        if (this.showDashes()) return '--:--';
        return this.formattedTime(this.cSeconds());
    });
    
    // Allows the user to click on the time to edit the dashes
    toggleDashes() {
        this.showDashes.update(v => !v);
    }
        
    // Formats the time to only show minutes
    private formattedTime(totalSeconds: number) {
        let date: string = new Date(totalSeconds * 1000).toISOString();
        if (this.cSeconds() < 10) return date.slice(18,19); // s
        if (this.cSeconds() < 60) return date.slice(17,19);; // ss
        if (this.cSeconds() < (60*60)) return date.slice(14,19) // mm:ss
        if (this.cSeconds() < 10*(60*60)) return date.slice(12,19); // h:mm:ss
        return date.slice(11,19); // hh:mm:ss
    }

}
