import {
  CdkDrag,
  CdkDragDrop,
  CdkDragEnter,
  CdkDragExit,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { AfterViewInit, Directive, ViewChild } from '@angular/core';
import { ContainerUtils } from './drop.utils';

export interface IDropContainer<S, T> {
  move: (item: T, position: number) => void;
  copy: (item: T, position: number, newContainer: CdkDropList<T[]>) => void;
  transfer: (
    item: T,
    position: number,
    oldContainer?: CdkDropList<S[]>,
    newContainer?: CdkDropList<T[]>,
  ) => void;
}

export type DropContainerOptions<S, T> = {
  /**
   * The function to check if the item is valid to be dropped in the container.
   *
   */
  validPredicate?: (drag: CdkDrag<S | T>, drop: CdkDropList<T[]>) => boolean;

  /**
   * The operation to perform when the item is dropped.
   * If not specified, the default is "transfer".
   * If the item is dropped in the same container, the default is "move".
   * If the item is dropped in a different container type, the default is "copy".
   *
   */
  copyPredicate?: (drag: CdkDragDrop<T[], S[], T>) => boolean;

  /**
   * The function to map the item when it is copied.
   *
   */
  copyMapFn?: (item: S) => T;
};

type ListOperation = 'move' | 'copy' | 'transfer';

// Type to partially match other object based on the type of the value.

export type KeyOfType<T, V> = keyof {
  [P in keyof T as T[P] extends V ? P : never]: never;
};

type Flag = boolean | undefined;
type FlagKey = Exclude<KeyOfType<DropContainerDirective, Flag>, 'targetKey'>;

/**
 * A directive that allows to create a unique drop container.
 * Important to implement "copy", "move" and "transfer" operations as needed.
 * If these are not implemented, only UI shifts will be performed.
 *
 * @export DropContainerDirective
 * @abstract DropContainerDirective
 * @class DropContainerDirective
 * @implements {IUniqueDropContainer<S, T>}
 * @template S The source type.
 * @template T The target type.
 */
@Directive()
export abstract class DropContainerDirective<S = unknown, T = S>
  implements IDropContainer<S, T>, AfterViewInit
{
  /**
   * We use this flag instead of using the class ".cdk-drop-list-dragging" and hiding the element.
   * Easier to use simple *ngIf than to use a class and a :not selector.
   *
   * @memberof DropContainerDirective
   */
  droppingNow: Flag;

  /**
   * The item being dragged is duplicated.
   *
   * @memberof DropContainerDirective
   */
  isDuplicated: Flag;

  /**
   * The item being dragged is valid.
   * Custom user Flag.
   *
   * @memberof DropContainerDirective
   */
  isCustomInvalid: Flag;

  /**
   * The key used to map and check duplicates target items.
   *
   * @memberof DropContainerDirective
   */
  targetKey: keyof T;

  /**
   * The reference to the unique droplist.
   *
   * @type {CdkDropList}
   * @memberof DropContainerDirective
   */
  @ViewChild(CdkDropList) dropList: CdkDropList<T[]> | undefined;

  /**
   * Creates an instance of DropContainerDirective.
   * @param {keyof S} sourceKey
   * @param {keyof T} targetKey
   * @memberof DropContainerDirective
   */
  constructor(
    private sourceKey: keyof S,
    targetKey?: keyof T,
    private dropOptions?: DropContainerOptions<S, T>, // Transfer is the default operation.
  ) {
    this.targetKey = targetKey ?? (sourceKey as string as keyof T);
  }
  ngAfterViewInit(): void {
    if (!this.dropList)
      throw new Error(
        'Drop list not found. Please create a cdkDrag droplist or remove implementation',
      );
    this.assignDropListEvents(this.dropList);
  }

  /**
   * Assign basic droplist events so we don't have to do on every component.
   *
   * @private
   * @param {typeof this.dropList} dropList
   * @memberof DropContainerDirective
   */
  private assignDropListEvents(dropList: NonNullable<typeof this.dropList>) {
    dropList.enterPredicate = this.isValid;

    dropList.entered.subscribe(($event) => this.enter($event));
    dropList.exited.subscribe(($event) => this.exit($event));
    dropList.dropped.subscribe(($event) => this.drop($event));
  }

  /**
   * Enter predicate.
   * We only check the first time the drag enters the container and not every pixel.
   *
   * @param {(CdkDrag<S | T>)} drag Item being dragged in.
   * @param {CdkDropList<T[]>} drop The container being dragged into.
   * @memberof DropContainerDirective
   */
  private isValid = (drag: CdkDrag<S | T>, drop: CdkDropList<T[]>) => {
    return (
      !this.isDuplicatedItem(drag, drop) &&
      this.isCustomPredicateValid(drag, drop)
    );
  };

  private isCustomPredicateValid(drag: CdkDrag<S | T>, drop: CdkDropList<T[]>) {
    if (this.isCustomInvalid !== undefined) return !this.isCustomInvalid;

    const isValid =
      !this.dropOptions?.validPredicate ||
      this.dropOptions.validPredicate(drag, drop);
    this.listenForDragRelease(drag, () => this.resetFlag('isCustomInvalid'));

    this.setFlag('isCustomInvalid', !isValid);
    return isValid;
  }

  private isDuplicatedItem(drag: CdkDrag<S | T>, drop: CdkDropList<T[]>) {
    if (this.isDuplicated !== undefined) return this.isDuplicated;

    const isSameContainer = drag.dropContainer === drop;
    const isInArray = ContainerUtils.isInArray(
      drag.data,
      drop.data,
      this.sourceKey,
      this.targetKey,
    );
    const isDuplicated = !isSameContainer && isInArray;
    this.listenForDragRelease(drag, () => this.resetFlag('isDuplicated'));

    this.setFlag('isDuplicated', isDuplicated);
    return isDuplicated;
  }

  /**
   * On element being dragged out of the container.
   *
   * @private
   * @param {(CdkDrag<S | T>)} drag Item being dragged out.
   * @param {() => void} [cb=() => (this.duplicated = false)] Callback, default to remove duplicated flag.
   * @memberof DropContainerDirective
   */
  private listenForDragRelease(drag: CdkDrag<S | T>, cb: () => void) {
    drag.released.subscribe(cb);
  }

  /**
   * Reset dirty flag.
   *
   * @private
   * @param {keyof this} flag
   * @memberof DropContainerDirective
   */
  // Pass the boolean only attributtes of this class as parameter.
  private resetFlag(flag: FlagKey) {
    this.setFlag(flag, undefined);
  }

  private setFlag(flag: FlagKey, value: Flag) {
    this[flag] = value;
  }

  /**
   * On *valid* item enters (showing placeholder).
   *
   * @param {CdkDragEnter<S>} _ Item being dragged in.
   * @memberof DropContainerDirective
   */
  private enter(event: CdkDragEnter<T[]>) {
    this.droppingNow = true;
    event.item.dropped.subscribe(() => (this.droppingNow = false));
  }

  /**
   * On *valid* item exit (moving out item).
   *
   * @param {CdkDragExit<S>} _ Item being dragged out.
   * @memberof DropContainerDirective
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private exit(_: CdkDragExit<T[]>) {
    this.droppingNow = false;
  }

  /**
   * On item moved.
   *
   * @abstract
   * @memberof DropContainerDirective
   */
  abstract move(item: T, position: number): void;

  /**
   * On item copied.
   *
   * @abstract
   * @memberof DropContainerDirective
   */
  abstract copy(
    item: T,
    position: number,
    newContainer: CdkDropList<T[]>,
  ): void;

  /**
   * On item transfered.
   *
   * @abstract
   * @memberof DropContainerDirective
   */
  abstract transfer(
    item: T,
    position: number,
    oldContainer?: CdkDropList<S[]>,
    newContainer?: CdkDropList<T[]>,
  ): void;

  /**
   * On drop, do something with source and destination draglists.
   * We can do copy/transfer/move from library or something custom with said lists.
   *
   * * Do not override this method, override the methods it calls instead. *
   *
   * @param {(CdkDragDrop<T[], (S | T)[], T>)} dragData Event with info about source (S) and destination (T).
   * @memberof DropContainerDirective
   */
  private drop(dragData: CdkDragDrop<T[], S[], T>) {
    const operation = this.getListOperation(dragData);
    const { currentIndex: index, container, previousContainer } = dragData;

    switch (operation) {
      case 'move': {
        const movedItem = this.moveInArray(dragData);
        this.move(movedItem, index);
        break;
      }
      case 'copy': {
        if (!this.dropOptions?.copyMapFn)
          throw new Error('CopyMapFn is required for copy operation.');
        const copiedItem = this.copyToArray(
          dragData,
          this.dropOptions.copyMapFn,
        );
        this.copy(copiedItem, index, container);
        break;
      }
      case 'transfer': {
        const transferedItem = this.transferToArray(dragData);
        this.transfer(transferedItem, index, previousContainer, container);
        break;
      }
    }
  }

  private getListOperation(
    dragData: CdkDragDrop<T[], S[], T>,
  ): ListOperation | undefined {
    const { previousContainer, container, currentIndex, previousIndex } =
      dragData;

    if (previousContainer.id !== container.id)
      return this.dropOptions?.copyPredicate?.(dragData) ? 'copy' : 'transfer';
    if (previousIndex !== currentIndex) return 'move';

    return;
  }

  //#region Array Operations

  private copyToArray(
    {
      container,
      previousContainer,
      previousIndex,
      currentIndex,
    }: CdkDragDrop<T[], S[], T>,
    mapFn: (item: S) => T,
  ) {
    return ContainerUtils.copyToArray(
      previousContainer.data,
      container.data,
      previousIndex,
      currentIndex,
      mapFn,
    );
  }

  private moveInArray({
    container,
    previousIndex,
    currentIndex,
  }: CdkDragDrop<T[], S[], T>) {
    return ContainerUtils.moveInArray(
      container.data,
      previousIndex,
      currentIndex,
    );
  }

  private transferToArray({
    container,
    previousContainer,
    previousIndex,
    currentIndex,
  }: CdkDragDrop<T[], S[], T>) {
    return ContainerUtils.transferToArray(
      previousContainer.data,
      container.data,
      previousIndex,
      currentIndex,
    );
  }
  //#enregion
}
