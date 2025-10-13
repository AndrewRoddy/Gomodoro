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

    // Gets break mode dat
    public cBreak = this.timerService.isBreak();
    
    // Boolean toggle to show dashes or hide dashes
    private readonly showDashes = signal(false);

    // Initializes the interval id that will be used to update every second
    private intervalId: any;
    
    constructor() {
        // Runs once every minute
        this.intervalId = setInterval(() => {
            // Adds one per second
                        // Gets the break data
            this.cBreak = this.timerService.isBreak();

            // Adds or subtracts if on break
            let val = 0;
            if (!this.cBreak) val = 1;
            if (this.cBreak) val = -4;

            let newValue = this.cSeconds() + val;

            // Prevents negative numbers
            if (newValue < 0) newValue = 0;
            
            // Adds or subtracts 1 second from cSeconds
            this.cSeconds.set(newValue);
            // Updates the timer service seconds
            this.timerService.updateSeconds(newValue);
        }, 1000); // Once per second
 
    }
        
    // Formats the remaining number of seconds
    readonly formattedRemaining = computed(() => {
        let sec = this.cSeconds();
        if (this.cBreak) sec = sec/4;

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

        let sec = totalSeconds;
        if (this.cBreak) sec = sec/4;

        if (sec < 10) return date.slice(18,19); // s
        if (sec < 60) return date.slice(17,19);; // ss
        if (sec < (60*60)) return date.slice(14,19) // mm:ss
        if (sec < 10*(60*60)) return date.slice(12,19); // h:mm:ss
        return date.slice(11,19); // hh:mm:ss
    }

}
