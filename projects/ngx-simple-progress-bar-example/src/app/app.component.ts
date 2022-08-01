import { Component, OnInit } from '@angular/core';
import { NgxSimpleProgressBarService, ProgressBarType } from 'ngx-simple-progress-bar';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    progressBarTypes: ProgressBarType[];
    progressBarType: ProgressBarType;
    color: string;
    backgroundColor: string;
    height: string;
    percent1: number;
    percent2: number;
    private speed: number;

    constructor(private readonly progressBarService: NgxSimpleProgressBarService) {
    }

    ngOnInit(): void {
        this.progressBarTypes = Object.values(ProgressBarType);
        this.progressBarType = ProgressBarType.SQUARE;
        this.percent1 = 45;
        this.percent2 = 10;
        this.color = '#9904c2';
        this.backgroundColor = '#dcdcdc';
        this.height = '3px';
        this.speed = 100;
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
        this.progressBarType = this.progressBarTypes.find(type => type === barType);
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
