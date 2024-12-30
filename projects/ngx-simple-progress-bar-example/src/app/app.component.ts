import { Component } from '@angular/core';
import { NgxSimpleProgressBarService, ProgressBarType } from 'ngx-simple-progress-bar';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent {
    progressBarTypes: Array<ProgressBarType> = Object.values(ProgressBarType);
    progressBarType: ProgressBarType = ProgressBarType.SQUARE;
    color = '#9904c2';
    backgroundColor = '#dcdcdc';
    height = '3px';
    percent1 = 45;
    percent2 = 10;
    private readonly speed = 100;

    constructor(private readonly progressBarService: NgxSimpleProgressBarService) {
    }

    changeColor(color: string): void {
        this.color = color;
    }

    changeBackgroundColor(bgColor: string): void {
        this.backgroundColor = bgColor;
    }

    changeHeight(height: string): void {
        this.height = `${height}px`;
    }

    changeType(barType: string): void {
        this.progressBarType = this.progressBarTypes.find(type => type === barType) ?? ProgressBarType.CLASSIC;
    }

    start(): void {
        this.progressBarService.startProgress(this.percent2, this.speed);
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
        this.percent2 = changedPercent;
    }
}
