import { Injectable, OnDestroy } from '@angular/core';
import { interval, Observable, Subject } from 'rxjs';

export class ProgressBarEvent {
    constructor(public percent: number) {
    }
}

@Injectable({
    providedIn: 'root'
})
export class NgxSimpleProgressBarService implements OnDestroy {
    readonly progressEvent = new Subject<ProgressBarEvent>();
    private readonly DEFAULT_SPEED = 50;
    private readonly COMPLETION_SPEED = 5;
    private readonly MAX_PERCENT = 100;
    private readonly MIN_PERCENT = 0;
    private percent: number;
    private speed: number;
    private counter: Observable<number>;
    private subscription = null;

    ngOnDestroy(): void {
        this.stopProgress();
    }

    /**
     * The method launches the progressbar from the specified (or default) initial percentage
     * at the specified (or default) rate.
     *
     * @param percent - the initial percentage value to start from; optional, default: 0
     * @param speed - the number of milliseconds at which rate our percent is increased by 1; optional, default: 50ms
     */
    startProgress(percent = this.MIN_PERCENT, speed = this.DEFAULT_SPEED): void {
        this.percent = this.percent ? this.percent : percent;
        this.speed = speed;
        this.increasePercent();
    }

    /**
     * The method stops the progress.
     */
    stopProgress(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = null;
        }
    }

    /**
     * The method resets the value of the progressbar to 0%.
     * (It does not stop the progress, it will restart from 0%.)
     */
    resetProgress(): void {
        this.percent = 0;
        this.progressEvent.next(new ProgressBarEvent(this.percent));
    }

    /**
     * The method speeds up the progress (1 percent increase every 5 milliseconds)
     * and the progress stops at 100%.
     */
    completeProgress(): void {
        this.speed = this.COMPLETION_SPEED;
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = null;
        }
        this.increasePercent();
    }

    private increasePercent(): Observable<void> {
        if (this.subscription || this.MAX_PERCENT === this.percent) {
            return;
        }
        this.counter = interval(this.speed);
        this.subscription = this.counter.subscribe(() => {
            this.percent++;
            this.progressEvent.next(new ProgressBarEvent(this.percent));
            if (this.MAX_PERCENT === this.percent) {
                this.stopProgress();
            }
        });
    }
}
