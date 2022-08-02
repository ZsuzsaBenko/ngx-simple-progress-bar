import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxSimpleProgressBarComponent, ProgressBarType } from './ngx-simple-progress-bar.component';
import { NgxSimpleProgressBarService, ProgressBarEvent } from './ngx-simple-progress-bar.service';

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

    it('should be initialized with default progressBarType', () => {
        fixture.detectChanges();
        expect(component.progressBarType).toBe(ProgressBarType.CLASSIC);
    });

    it('should be initialized with custom progressBarType', () => {
        component.progressBarType = ProgressBarType.SQUARE;
        expect(component.progressBarType).toBe(ProgressBarType.SQUARE);
    });

    it('should be initialized with default color', () => {
        const defaultColor = '#4d94f7';
        const defaultColorAsRgb = 'rgb(77, 148, 247)';
        fixture.detectChanges();

        expect(component.color).toBe(defaultColor);
        expect(template.querySelector('.inner-bar').style.backgroundColor).toBe(defaultColorAsRgb);
    });

    it('should be initialized with custom color', () => {
        const customColor = 'green';
        component.color = customColor;
        fixture.detectChanges();

        expect(component.color).toBe(customColor);
        expect(template.querySelector('.inner-bar').style.backgroundColor).toBe(customColor);
    });

    it('should be initialized with default background color', () => {
        const defaultBackgroundColor = '#efefef';
        const defaultBackgroundColorAsRgb = 'rgb(239, 239, 239)';
        fixture.detectChanges();

        expect(component.backgroundColor).toBe(defaultBackgroundColor);
        expect(template.querySelector('.outer-bar').style.backgroundColor).toBe(defaultBackgroundColorAsRgb);
    });

    it('should be initialized with custom background color', () => {
        const customBackgroundColor = 'transparent';
        component.backgroundColor = customBackgroundColor;
        fixture.detectChanges();

        expect(component.backgroundColor).toBe(customBackgroundColor);
        expect(template.querySelector('.outer-bar').style.backgroundColor).toBe(customBackgroundColor);
    });

    it('should be initialized with default height', () => {
        const defaultHeight = '22px';
        fixture.detectChanges();

        expect(component.height).toBe(defaultHeight);
        expect(template.querySelector('.outer-bar').style.height).toBe(defaultHeight);
    });

    it('should be initialized with custom height', () => {
        const customHeight = '10px';
        component.height = customHeight;
        fixture.detectChanges();

        expect(component.height).toBe(customHeight);
        expect(template.querySelector('.outer-bar').style.height).toBe(customHeight);
    });

    it('should be initialized with classic-type height', () => {
        const classicTypeHeight = '22px';
        component.progressBarType = ProgressBarType.CLASSIC;
        fixture.detectChanges();

        expect(component.height).toBe(classicTypeHeight);
        expect(template.querySelector('.outer-bar').style.height).toBe(classicTypeHeight);
    });

    it('should be initialized with rounded-type height', () => {
        const roundedTypeHeight = '12px';
        component.progressBarType = ProgressBarType.ROUNDED;
        fixture.detectChanges();

        expect(component.height).toBe(roundedTypeHeight);
        expect(template.querySelector('.outer-bar').style.height).toBe(roundedTypeHeight);
    });

    it('should be initialized with square-type height', () => {
        const squareTypeHeight = '5px';
        component.progressBarType = ProgressBarType.SQUARE;
        fixture.detectChanges();
        expect(component.height).toBe(squareTypeHeight);
        expect(template.querySelector('.outer-bar').style.height).toBe(squareTypeHeight);
    });

    it('should be initialized with default width', () => {
        const defaultWidth = '0%';
        fixture.detectChanges();

        expect(component.width).toBe(defaultWidth);
        expect(template.querySelector('.inner-bar').style.width).toBe(defaultWidth);
    });

    it('should be initialized with width based on given percent', () => {
        const customPercent = 67;
        component.percent = customPercent;
        fixture.detectChanges();

        expect(component.width).toBe(`${customPercent}%`);
        expect(template.querySelector('.inner-bar').style.width).toBe(`${customPercent}%`);
    });

    it('should be initialized as static by default', () => {
        fixture.detectChanges();
        expect(component.isStatic).toBeTrue();
    });

    it('should not emit percentChange event if static', () => {
        const initialPercent = 10;
        component.percent = initialPercent;
        const updatedPercent = 15;
        const service = fixture.debugElement.injector.get(NgxSimpleProgressBarService);
        spyOn(service, 'startProgress').and
            .callFake(() => service.progressEvent.next(new ProgressBarEvent(updatedPercent)));
        spyOn(component.percentChange, 'emit');
        fixture.detectChanges();

        service.startProgress();
        fixture.detectChanges();

        expect(service.startProgress).toHaveBeenCalled();
        expect(component.percentChange.emit).not.toHaveBeenCalled();
        expect(component.percent).toBe(initialPercent);
    });

    it('should emit percentChange event if it is not static', () => {
        component.isStatic = false;
        component.percent = 10;
        const updatedPercent = 15;
        const service = fixture.debugElement.injector.get(NgxSimpleProgressBarService);
        spyOn(service, 'startProgress').and
            .callFake(() => service.progressEvent.next(new ProgressBarEvent(updatedPercent)));
        spyOn(component.percentChange, 'emit');
        fixture.detectChanges();

        service.startProgress();
        fixture.detectChanges();

        expect(service.startProgress).toHaveBeenCalled();
        expect(component.percentChange.emit).toHaveBeenCalled();
        expect(component.percent).toBe(updatedPercent);
    });
});
