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
// import { NubeProvider } from '@nubebytes/ui-react';
import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import ReactDOM from 'react-dom/client';

const elementName = 'reactEditor';

@Component({
  standalone: true,
  selector: 'lib-react-test',
  template: `<span #${elementName}></span>`,
  styleUrls: ['./react-test.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ReactTestComponent implements OnChanges, OnDestroy, AfterViewInit {
  @ViewChild(elementName, { static: false }) containerRef: ElementRef;

  @Input({ required: true }) text: string;

  @Output() buttonClick: EventEmitter<void> = new EventEmitter();

  ngOnChanges(_: SimpleChanges): void {
    this.render();
  }

  ngAfterViewInit() {
    this.render();
  }

  ngOnDestroy() {
    unmountComponentAtNode(this.containerRef.nativeElement);
  }

  private render() {
    const { text, buttonClick, containerRef } = this;
    if (!containerRef) return;

    ReactDOM.createRoot(containerRef.nativeElement).render(
      <React.StrictMode>
        <button onClick={() => buttonClick.emit()}>{text}</button>
      </React.StrictMode>,
    );
  }
}
