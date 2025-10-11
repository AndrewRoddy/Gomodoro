import { OnInit, OnDestroy, ChangeDetectionStrategy, Component, computed, DestroyRef, inject, signal, Injectable } from "@angular/core";
import { TimerService } from "../timer-service"

@Component({
    selector: 'app-timer',
    templateUrl: './timer.html',
    styleUrls: ['./timer.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})

export class Timer {

    // Starting number on the clock
    readonly start = 0;
    // readonly total = 60*60;
    
    // Boolean toggle to show dashes or hide dashes
    private readonly showDashes = signal(false);
    
    readonly total = signal(6); // This one is just one minute for now
    readonly seconds = signal(this.start);

    private intervalId: any;
    private timerService = inject(TimerService);
    
    constructor() {
        this.intervalId = setInterval(() => {
            const newValue: number = this.seconds() + 1;
            this.seconds.set(newValue);
            // console.log("timer.ts seconds", newValue);
            this.timerService.updateSeconds(newValue);
        }, 1000);
    }
        
        // const timerId = setInterval(() => {
        //         // Adds one second per second
        //         console.log("timer.ts-seconds.update()")
        //         this.seconds.update(v => Math.max(v + 1, 0));
        //     }, 1000);
            
        //     const destroyRef = inject(DestroyRef);
        //     destroyRef.onDestroy(() => clearInterval(timerId));
        // }
        
        // ngOnDestroy() {clearInterval(this.intervalId);}
        
        readonly formattedRemaining = computed(() => {
            if (this.showDashes()) { return '--:--'; }
            return this.formattedTime(this.seconds());
        });
        
        toggleDashes() {
            this.showDashes.update(v => !v);
        }
        
    private formattedTime(totalSeconds: number) {
        return new Date(totalSeconds * 1000).toISOString().slice(14,19);
    }
}

