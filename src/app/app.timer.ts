import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, signal } from "@angular/core";

@Component({
    selector: 'app-timer',
    template: '<div class="timer">{{ formattedRemaining() }}</div>',
    styleUrls: ['./app.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})

export class Timer {
    readonly total = 15;

    readonly secondsRemaining = signal(this.total);
    readonly formattedRemaining = computed(() => 
        this.formattedTime(this.secondsRemaining()));

    constructor() {
        const timerId = setInterval(() => {
            this.secondsRemaining.update(v => Math.max(v - 1, 0));
        }, 1000);

        const destroyRef = inject(DestroyRef);
        destroyRef.onDestroy(() => clearInterval(timerId));
    }

    private formattedTime(totalSeconds: number) {
        return new Date(totalSeconds * 1000).toISOString().slice(14,19);
    }
}
