import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NgxSimpleProgressBarService, ProgressBarEvent } from './ngx-simple-progress-bar.service';
import { Observable, Subscription } from 'rxjs';

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
    readonly DEFAULT_COLOR = '#4d94f7';
    readonly DEFAULT_BACKGROUND_COLOR = '#efefef';
    @Input() progressBarType = ProgressBarType.CLASSIC;
    @Input() color = this.DEFAULT_COLOR;
    @Input() backgroundColor = this.DEFAULT_BACKGROUND_COLOR;
    @Input() height: string;
    @Input() percent = 0;
    @Input() isStatic = true;
    @Output() percentChange = new EventEmitter<number>();
    width: string;
    private readonly CLASSIC_HEIGHT = '22px';
    private readonly ROUND_HEIGHT = '12px';
    private readonly SQUARE_HEIGHT = '5px';
    private progressBarEvents: Observable<ProgressBarEvent> = null;
    private progressBarSubscription: Subscription = null;

    constructor(private progressBarService: NgxSimpleProgressBarService) {
    }

    ngOnInit(): void {
        this.width = `${this.percent}%`;
        this.setHeight();

        if (!this.isStatic) {
            this.progressBarEvents = this.progressBarService.progressEvent.asObservable();
            this.progressBarSubscription = this.progressBarEvents.subscribe((event) => {
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