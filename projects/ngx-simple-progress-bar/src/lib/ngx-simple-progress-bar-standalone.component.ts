import { NgClass, NgStyle } from '@angular/common';
import { Component, DestroyRef, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProgressBarEvent, ProgressBarType } from './models';
import { NgxSimpleProgressBarService } from './ngx-simple-progress-bar.service';

@Component({
    selector: 'ngx-simple-progress-bar-standalone',
    imports: [NgClass, NgStyle],
    template: `
        <div [ngClass]="progressBarType" class="outer-bar" [ngStyle]="{backgroundColor: backgroundColor, height: height}">
            <div class="inner-bar" [ngStyle]="{backgroundColor: color, width: width}"></div>
        </div>
    `,
    styleUrl: './ngx-simple-progress-bar.component.css'
})
export class NgxSimpleProgressBarStandaloneComponent implements OnInit {
    @Output() readonly percentChange = new EventEmitter<number>();
    @Input() progressBarType = ProgressBarType.CLASSIC;
    @Input() color = '#4d94f7';
    @Input() backgroundColor = '#efefef';
    @Input() height!: string;
    @Input() percent = 0;
    @Input() isStatic = true;
    width!: string;
    private readonly CLASSIC_HEIGHT = '22px';
    private readonly ROUND_HEIGHT = '12px';
    private readonly SQUARE_HEIGHT = '5px';
    private readonly progressBarService: NgxSimpleProgressBarService = inject(NgxSimpleProgressBarService);
    private readonly destroyRef: DestroyRef = inject(DestroyRef);

    ngOnInit(): void {
        this.width = `${this.percent}%`;
        this.setHeight();
        if (!this.isStatic) {
            this.observeProgressBarEvents();
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

    private observeProgressBarEvents(): void {
        this.progressBarService.progressEvent.asObservable()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((event: ProgressBarEvent) => {
                this.percent = event.percent;
                this.width = `${this.percent}%`;
                this.percentChange.emit(this.percent);
            });
    }
}
