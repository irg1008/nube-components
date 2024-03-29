import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DragDropModule } from '@angular/cdk/drag-drop';
import {
  ReactColorPickerComponent,
  ReactEditorWrapperComponent,
} from '@nubebytes/ui-angular';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    ReactEditorWrapperComponent,
    ReactColorPickerComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
