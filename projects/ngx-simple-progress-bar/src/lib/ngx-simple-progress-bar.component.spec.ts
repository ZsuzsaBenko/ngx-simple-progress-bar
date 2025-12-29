import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ProgressBarEvent, ProgressBarType } from './models';
import { NgxSimpleProgressBarComponent } from './ngx-simple-progress-bar.component';
import { NgxSimpleProgressBarService } from './ngx-simple-progress-bar.service';

describe('NgxSimpleProgressBarComponent', () => {
    let component: NgxSimpleProgressBarComponent;
    let fixture: ComponentFixture<NgxSimpleProgressBarComponent>;
    let template: any;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [NgxSimpleProgressBarComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(NgxSimpleProgressBarComponent);
        component = fixture.componentInstance;
        template = fixture.debugElement.nativeElement;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should be initialized with default progressBarType', async () => {
        await fixture.whenStable();
        expect(component.progressBarType()).toBe(ProgressBarType.CLASSIC);
    });

    it('should be initialized with custom progressBarType', async () => {
        fixture.componentRef.setInput('progressBarType', ProgressBarType.SQUARE);
        await fixture.whenStable();

        expect(component.progressBarType()).toBe(ProgressBarType.SQUARE);
    });

    it('should be initialized with default color', async () => {
        const defaultColor = '#4d94f7';
        const defaultColorAsRgb = 'rgb(77, 148, 247)';
        await fixture.whenStable();

        expect(component.color()).toBe(defaultColor);
        expect(template.querySelector('.inner-bar').style.backgroundColor).toBe(defaultColorAsRgb);
    });

    it('should be initialized with custom color', async () => {
        const customColor = 'green';
        fixture.componentRef.setInput('color', customColor);
        await fixture.whenStable();

        expect(component.color()).toBe(customColor);
        expect(template.querySelector('.inner-bar').style.backgroundColor).toBe(customColor);
    });

    it('should be initialized with default background color', async () => {
        const defaultBackgroundColor = '#efefef';
        const defaultBackgroundColorAsRgb = 'rgb(239, 239, 239)';
        await fixture.whenStable();

        expect(component.backgroundColor()).toBe(defaultBackgroundColor);
        expect(template.querySelector('.outer-bar').style.backgroundColor).toBe(defaultBackgroundColorAsRgb);
    });

    it('should be initialized with custom background color', async () => {
        const customBackgroundColor = 'transparent';
        fixture.componentRef.setInput('backgroundColor', customBackgroundColor);
        await fixture.whenStable();

        expect(component.backgroundColor()).toBe(customBackgroundColor);
        expect(template.querySelector('.outer-bar').style.backgroundColor).toBe(customBackgroundColor);
    });

    it('should be initialized with default height', async () => {
        const defaultHeight = '22px';
        await fixture.whenStable();

        expect(component.resolvedHeight()).toBe(defaultHeight);
        expect(template.querySelector('.outer-bar').style.height).toBe(defaultHeight);
    });

    it('should be initialized with custom height', async () => {
        const customHeight = '10px';
        fixture.componentRef.setInput('height', customHeight);
        await fixture.whenStable();

        expect(component.height()).toBe(customHeight);
        expect(template.querySelector('.outer-bar').style.height).toBe(customHeight);
    });

    it('should be initialized with classic-type height', async () => {
        const classicTypeHeight = '22px';
        fixture.componentRef.setInput('progressBarType', ProgressBarType.CLASSIC);
        await fixture.whenStable();

        expect(component.resolvedHeight()).toBe(classicTypeHeight);
        expect(template.querySelector('.outer-bar').style.height).toBe(classicTypeHeight);
    });

    it('should be initialized with rounded-type height', async () => {
        const roundedTypeHeight = '12px';
        fixture.componentRef.setInput('progressBarType', ProgressBarType.ROUNDED);
        await fixture.whenStable();

        expect(component.resolvedHeight()).toBe(roundedTypeHeight);
        expect(template.querySelector('.outer-bar').style.height).toBe(roundedTypeHeight);
    });

    it('should be initialized with square-type height', async () => {
        const squareTypeHeight = '5px';
        fixture.componentRef.setInput('progressBarType', ProgressBarType.SQUARE);
        await fixture.whenStable();

        expect(component.resolvedHeight()).toBe(squareTypeHeight);
        expect(template.querySelector('.outer-bar').style.height).toBe(squareTypeHeight);
    });

    it('should be initialized with default width', async () => {
        const defaultWidth = '0%';
        await fixture.whenStable();

        expect(component.width()).toBe(defaultWidth);
        expect(template.querySelector('.inner-bar').style.width).toBe(defaultWidth);
    });

    it('should be initialized with width based on given percent', async () => {
        const customPercent = 67;
        fixture.componentRef.setInput('percent', customPercent);
        await fixture.whenStable();

        expect(component.width()).toBe(`${customPercent}%`);
        expect(template.querySelector('.inner-bar').style.width).toBe(`${customPercent}%`);
    });

    it('should be initialized as static by default', async () => {
        await fixture.whenStable();
        expect(component.isStatic()).toBe(true);
    });

    it('should not update percent if static', async () => {
        const initialPercent = 10;
        fixture.componentRef.setInput('percent', initialPercent);
        const updatedPercent = 15;
        const service = fixture.debugElement.injector.get(NgxSimpleProgressBarService);
        vi.spyOn(service, 'startProgress').mockImplementation(() => service.progressEvent.next(new ProgressBarEvent(updatedPercent)));
        await fixture.whenStable();

        service.startProgress();
        await fixture.whenStable();

        expect(service.startProgress).toHaveBeenCalled();
        expect(component.percent()).toBe(initialPercent);
    });

    it('should update percent if it is not static', async () => {
        fixture.componentRef.setInput('isStatic', false);
        fixture.componentRef.setInput('percent', 10);
        const updatedPercent = 15;
        const service = fixture.debugElement.injector.get(NgxSimpleProgressBarService);
        vi.spyOn(service, 'startProgress').mockImplementation(() => service.progressEvent.next(new ProgressBarEvent(updatedPercent)));
        await fixture.whenStable();

        service.startProgress();
        await fixture.whenStable();

        expect(service.startProgress).toHaveBeenCalled();
        expect(component.percent()).toBe(updatedPercent);
    });
});
