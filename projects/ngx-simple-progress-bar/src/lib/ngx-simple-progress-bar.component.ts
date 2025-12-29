import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, input, model, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProgressBarEvent, ProgressBarType } from './models';
import { NgxSimpleProgressBarService } from './ngx-simple-progress-bar.service';

@Component({
    selector: 'ngx-simple-progress-bar',
    template: `
        <div [class]="progressBarType()" class="outer-bar" [style]="{backgroundColor: backgroundColor(), height: resolvedHeight()}">
            <div class="inner-bar" [style]="{backgroundColor: color(), width: width()}"></div>
        </div>
    `,
    styleUrls: ['./ngx-simple-progress-bar.component.css'],
    standalone: false,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxSimpleProgressBarComponent implements OnInit {
    progressBarType = input<ProgressBarType>(ProgressBarType.CLASSIC);
    color = input<string>('#4d94f7');
    backgroundColor = input<string>('#efefef');
    height = input<string>('');
    percent = model<number>(0);
    isStatic = input<boolean>(true);
    width = computed<string>(() => `${this.percent()}%`);
    resolvedHeight = computed<string>(() => this.setHeight());
    private readonly CLASSIC_HEIGHT = '22px';
    private readonly ROUND_HEIGHT = '12px';
    private readonly SQUARE_HEIGHT = '5px';
    private readonly progressBarService: NgxSimpleProgressBarService = inject(NgxSimpleProgressBarService);
    private readonly destroyRef: DestroyRef = inject(DestroyRef);

    ngOnInit(): void {
        if (!this.isStatic()) {
            this.observeProgressBarEvents();
        }
    }

    private setHeight(): string {
        if (this.height()) {
            return this.height();
        } else if (ProgressBarType.CLASSIC === this.progressBarType()) {
            return this.CLASSIC_HEIGHT;
        } else if (ProgressBarType.ROUNDED === this.progressBarType()) {
            return this.ROUND_HEIGHT;
        } else {
            return this.SQUARE_HEIGHT;
        }
    }

    private observeProgressBarEvents(): void {
        this.progressBarService.progressEvent.asObservable()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((event: ProgressBarEvent) => {
                this.percent.set(event.percent);
            });
    }
}
