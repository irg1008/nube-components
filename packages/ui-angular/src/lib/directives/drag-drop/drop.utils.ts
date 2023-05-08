import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

export class ContainerUtils {
  static isInArray<O, A>(
    obj: O | A,
    arr: A[],
    objKey: keyof O,
    arrKey: keyof A,
  ) {
    const objAValue = (obj as A)[arrKey];
    const value = objAValue ?? (obj as O)[objKey];
    return arr.some((item) => item[arrKey] == value);
  }

  static copyToArray<T, P>(
    previousData: P[],
    currentData: T[],
    previousIndex: number,
    currentIndex: number,
    mapFn: (item: P) => T,
  ): T {
    const previousItem = previousData[previousIndex];
    const newItem = mapFn(previousItem);
    currentData.splice(currentIndex, 0, newItem);
    return newItem;
  }

  static moveInArray<T>(
    array: T[],
    previousIndex: number,
    currentIndex: number,
  ): T {
    moveItemInArray(array, previousIndex, currentIndex);
    return array[currentIndex];
  }

  static transferToArray<T, P>(
    previousData: P[],
    currentData: T[],
    previousIndex: number,
    currentIndex: number,
  ): T {
    transferArrayItem<T | P>(
      previousData,
      currentData,
      previousIndex,
      currentIndex,
    );
    return currentData[currentIndex];
  }
}
