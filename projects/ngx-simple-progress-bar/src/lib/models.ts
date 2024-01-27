export enum ProgressBarType {
    CLASSIC = 'classic',
    ROUNDED = 'rounded',
    SQUARE = 'square'
}

export class ProgressBarEvent {
    constructor(public percent: number) {
    }
}
