import { Component, inject, signal } from '@angular/core';
import { NgxSimpleProgressBarService, NgxSimpleProgressBarStandaloneComponent, ProgressBarType } from 'ngx-simple-progress-bar';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [
        NgxSimpleProgressBarStandaloneComponent
    ]
})
export class AppComponent {
    readonly progressBarTypes: Array<ProgressBarType> = Object.values(ProgressBarType);
    readonly progressBarType = signal(ProgressBarType.SQUARE);
    readonly color = signal('#9904c2');
    readonly backgroundColor = signal('#dcdcdc');
    readonly height = signal('3px');
    readonly percent = signal(10);
    readonly constantPercent = 45;
    private readonly speed = 100;
    private readonly progressBarService = inject(NgxSimpleProgressBarService);

    changeColor(color: string): void {
        this.color.set(color);
    }

    changeBackgroundColor(bgColor: string): void {
        this.backgroundColor.set(bgColor);
    }

    changeHeight(height: string): void {
        this.height.set(`${height}px`);
    }

    changeType(barType: string): void {
        const updatedType = this.progressBarTypes.find(type => type === barType) ?? ProgressBarType.CLASSIC;
        this.progressBarType.set(updatedType);
    }

    start(): void {
        this.progressBarService.startProgress(this.percent(), this.speed);
    }

    stop(): void {
        this.progressBarService.stopProgress();
    }

    reset(): void {
        this.progressBarService.resetProgress();
    }

    complete(): void {
        this.progressBarService.completeProgress();
    }

    onPercentChange(changedPercent: number): void {
        this.percent.set(changedPercent);
    }
}
