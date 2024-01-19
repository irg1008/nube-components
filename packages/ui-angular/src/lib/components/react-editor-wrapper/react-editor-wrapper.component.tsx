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

  root: ReactDOM.Root;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['editorConfig'].isFirstChange()) return;
    this.render();
  }

  ngAfterViewInit() {
    if (!this.containerRef) return;
    this.root = ReactDOM.createRoot(this.containerRef.nativeElement);
    this.render();
  }

  ngOnDestroy() {
    this.root.unmount();
  }

  private render() {
    const { editorConfig, editorMount } = this;

    this.root?.render(
      <React.StrictMode>
        <NubeProvider>
          <Editor
            {...editorConfig}
            onMount={(editor) => {
              editorMount.emit(editor);
              editorConfig.onMount?.(editor);
            }}
          />
        </NubeProvider>
      </React.StrictMode>,
    );
  }
}
