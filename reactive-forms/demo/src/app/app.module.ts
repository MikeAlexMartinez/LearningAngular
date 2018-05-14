import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';

import { AppComponent } from './app.component';
import { CustomerComponent } from './customers/customer.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    CustomerComponent
  ],
  providers: [ FormBuilder ],
  bootstrap: [AppComponent]
})
export class AppModule { }
