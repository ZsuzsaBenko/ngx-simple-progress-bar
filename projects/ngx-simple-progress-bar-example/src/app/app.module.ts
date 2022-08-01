import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxSimpleProgressBarModule } from 'ngx-simple-progress-bar';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        NgxSimpleProgressBarModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
