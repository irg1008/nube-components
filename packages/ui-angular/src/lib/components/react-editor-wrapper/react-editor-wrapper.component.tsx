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
import {
  Editor,
  EditorAPI,
  EditorConfig,
  NubeProvider,
} from '@nubebytes/ui-react';
import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import ReactDOM from 'react-dom/client';

const elementName = 'reactEditor';

@Component({
  standalone: true,
  selector: 'lib-react-editor',
  template: `<span #${elementName}></span>`,
  styleUrls: ['./react-editor-wrapper.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ReactEditorWrapperComponent
  implements OnChanges, OnDestroy, AfterViewInit
{
  @ViewChild(elementName, { static: false }) containerRef: ElementRef;

  @Input() editorConfig: EditorConfig;

  @Output() editorMount: EventEmitter<EditorAPI> = new EventEmitter();

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
    const { editorConfig, editorMount, containerRef } = this;
    if (!containerRef) return;

    ReactDOM.createRoot(containerRef.nativeElement).render(
      <React.StrictMode>
        <NubeProvider>
          <Editor
            {...editorConfig}
            onMount={(editor) => editorMount.emit(editor)}
          />
        </NubeProvider>
      </React.StrictMode>,
    );
  }
}
