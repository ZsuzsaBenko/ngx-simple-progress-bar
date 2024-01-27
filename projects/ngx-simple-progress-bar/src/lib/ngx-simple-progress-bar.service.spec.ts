import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { NgxSimpleProgressBarService } from './ngx-simple-progress-bar.service';
import { ProgressBarEvent } from './models';

describe('NgxSimpleProgressBarService', () => {
    const minPercent = 0;
    const maxPercent = 100;
    const initialPercent = 80;
    const defaultSpeed = 50;
    const customSpeed = 100;
    let service: NgxSimpleProgressBarService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(NgxSimpleProgressBarService);
        spyOn(service.progressEvent, 'next');
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should increase percent on startProgress() call with default values', fakeAsync(() => {
        service.startProgress();
        tick(defaultSpeed * maxPercent);

        expect(service.progressEvent.next).toHaveBeenCalledWith(new ProgressBarEvent(maxPercent));
        expect(service.progressEvent.next).toHaveBeenCalledTimes(100);
    }));

    it('should increase given initial percent on startProgress() call with default speed', fakeAsync(() => {
        service.startProgress(initialPercent);
        tick(defaultSpeed * (maxPercent - initialPercent));

        expect(service.progressEvent.next).toHaveBeenCalledWith(new ProgressBarEvent(maxPercent));
        expect(service.progressEvent.next).toHaveBeenCalledTimes(20);
    }));

    it('should increase percent on startProgress() call with custom values', fakeAsync(() => {
        service.startProgress(initialPercent, customSpeed);
        tick(customSpeed * (maxPercent - initialPercent));

        expect(service.progressEvent.next).toHaveBeenCalledWith(new ProgressBarEvent(maxPercent));
        expect(service.progressEvent.next).toHaveBeenCalledTimes(20);
    }));

    it('should stop progress on stopProgress() call', fakeAsync(() => {
        const counterValueWhenStopped = 10;
        service.startProgress(initialPercent, customSpeed);
        tick(customSpeed * counterValueWhenStopped);
        service.stopProgress();

        expect(service.progressEvent.next).toHaveBeenCalledTimes(counterValueWhenStopped);
        expect(service.progressEvent.next)
            .toHaveBeenCalledWith(new ProgressBarEvent(initialPercent + counterValueWhenStopped));
    }));

    it('should reset percent to 0% on resetProgress() call', fakeAsync(() => {
        service.startProgress(initialPercent, customSpeed);
        tick(customSpeed * (maxPercent - initialPercent));
        expect(service.progressEvent.next).toHaveBeenCalledWith(new ProgressBarEvent(maxPercent));

        service.resetProgress();
        expect(service.progressEvent.next).toHaveBeenCalledWith(new ProgressBarEvent(minPercent));
    }));

    it('should complete progress to 100% on completeProgress call', fakeAsync(() => {
        const counterValueWhenStopped = 10;
        service.startProgress(initialPercent, customSpeed);
        tick(customSpeed * counterValueWhenStopped);

        expect(service.progressEvent.next)
            .toHaveBeenCalledWith(new ProgressBarEvent(initialPercent + counterValueWhenStopped));

        const completeSpeed = 50;
        service.completeProgress();
        tick(completeSpeed * (maxPercent - (initialPercent + counterValueWhenStopped)));

        expect(service.progressEvent.next).toHaveBeenCalledWith(new ProgressBarEvent(maxPercent));
        expect(service.progressEvent.next).toHaveBeenCalledTimes(maxPercent - initialPercent);
    }));
});
