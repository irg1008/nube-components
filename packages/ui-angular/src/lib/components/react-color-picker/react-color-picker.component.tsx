import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import React from 'react';
import { HexColorPicker } from 'react-colorful';
import ReactDOM from 'react-dom/client';

const elementName = 'reactColorPicker';

@Component({
  selector: 'lib-react-color-picker',
  standalone: true,
  template: `<span #${elementName}></span>`,
  styleUrls: ['./react-color-picker.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ReactColorPickerComponent
  implements OnChanges, OnDestroy, AfterViewInit
{
  @ViewChild(elementName, { static: false }) containerRef: ElementRef;

  root: ReactDOM.Root;

  @Input() color: string;
  @Output() colorChange = new EventEmitter<string>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['color']?.isFirstChange()) return;
    this.render();
  }
  ngOnDestroy(): void {
    this.root.unmount();
  }
  ngAfterViewInit(): void {
    if (!this.containerRef) return;
    this.root = ReactDOM.createRoot(this.containerRef.nativeElement);
    this.render();
  }

  private render() {
    const { color, colorChange } = this;
    this.root?.render(
      <React.StrictMode>
        <HexColorPicker color={color} onChange={(c) => colorChange?.emit(c)} />
      </React.StrictMode>,
    );
  }
}
