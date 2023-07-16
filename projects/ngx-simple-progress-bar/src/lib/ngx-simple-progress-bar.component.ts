import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { NgxSimpleProgressBarService, ProgressBarEvent } from './ngx-simple-progress-bar.service';

export enum ProgressBarType {
    CLASSIC = 'classic',
    ROUNDED = 'rounded',
    SQUARE = 'square'
}

@Component({
    selector: 'ngx-simple-progress-bar',
    template: `
        <div [ngClass]="progressBarType" class="outer-bar" [ngStyle]="{backgroundColor: backgroundColor, height: height}">
            <div class="inner-bar" [ngStyle]="{backgroundColor: color, width: width}"></div>
        </div>
    `,
    styleUrls: ['./ngx-simple-progress-bar.component.css']
})
export class NgxSimpleProgressBarComponent implements OnInit, OnDestroy {
    @Output() readonly percentChange = new EventEmitter<number>();
    @Input() progressBarType = ProgressBarType.CLASSIC;
    @Input() color = '#4d94f7';
    @Input() backgroundColor = '#efefef';
    @Input() height: string;
    @Input() percent = 0;
    @Input() isStatic = true;
    width: string;
    private readonly CLASSIC_HEIGHT = '22px';
    private readonly ROUND_HEIGHT = '12px';
    private readonly SQUARE_HEIGHT = '5px';
    private progressBarEvents: Observable<ProgressBarEvent> | null = null;
    private progressBarSubscription: Subscription | null = null;

    constructor(private readonly progressBarService: NgxSimpleProgressBarService) {
    }

    ngOnInit(): void {
        this.width = `${this.percent}%`;
        this.setHeight();

        if (!this.isStatic) {
            this.progressBarEvents = this.progressBarService.progressEvent.asObservable();
            this.progressBarSubscription = this.progressBarEvents.subscribe((event: ProgressBarEvent) => {
                this.percent = event.percent;
                this.width = `${this.percent}%`;
                this.percentChange.emit(this.percent);
            });
        }
    }

    ngOnDestroy(): void {
        if (this.progressBarSubscription) {
            this.progressBarSubscription.unsubscribe();
        }
    }

    private setHeight(): void {
        if (this.height) {
            return;
        } else if (ProgressBarType.CLASSIC === this.progressBarType) {
            this.height = this.CLASSIC_HEIGHT;
        } else if (ProgressBarType.ROUNDED === this.progressBarType) {
            this.height = this.ROUND_HEIGHT;
        } else {
            this.height = this.SQUARE_HEIGHT;
        }
    }

}
