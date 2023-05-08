import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { ButtonComponent, DragDropComponent } from '@nubebytes/ui-angular';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonComponent,
    DragDropModule,
    DragDropComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
