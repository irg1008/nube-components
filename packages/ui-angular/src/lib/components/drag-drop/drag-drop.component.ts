import { CdkDropList } from '@angular/cdk/drag-drop';
import { Component, Inject, Input, Optional } from '@angular/core';
import {
  DropContainerDirective,
  DropContainerOptions,
  IDropContainer,
} from '../../directives';

import { InjectionToken } from '@angular/core';

export type DragDropOptions<S = unknown, T = unknown> = IDropContainer<S, T> & {
  sourceKey: keyof S;
  targetKey?: keyof T;
  dropOptions?: DropContainerOptions<S, T>;
};

export const DROP_OPTIONS = new InjectionToken<DragDropOptions>('drop options');

@Component({
  standalone: true,
  selector: 'lib-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.scss'],
})
export class DragDropComponent<S, T> extends DropContainerDirective<S, T> {
  @Input()
  public options!: DragDropOptions<S, T>;

  /**
   *
   */
  constructor(
    @Optional() @Inject(DROP_OPTIONS) options: DragDropOptions<S, T>,
  ) {
    const { sourceKey, targetKey, dropOptions } = options;
    super(sourceKey, targetKey, dropOptions);
    this.options = options;
  }

  override move(item: T, position: number): void {
    this.options.move(item, position);
  }
  override copy(
    item: T,
    position: number,
    newContainer: CdkDropList<T[]>,
  ): void {
    this.options.copy(item, position, newContainer);
  }
  override transfer(
    item: T,
    position: number,
    oldContainer?: CdkDropList<S[]> | undefined,
    newContainer?: CdkDropList<T[]> | undefined,
  ): void {
    this.options.transfer(item, position, oldContainer, newContainer);
  }
}
