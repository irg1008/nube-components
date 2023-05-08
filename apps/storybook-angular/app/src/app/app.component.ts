import { CdkDropList } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { DropContainerDirective } from '@nubebytes/ui-angular';

type Example = {
  name: string;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends DropContainerDirective<Example> {
  title = 'storybook-angular';

  exampleData: Example[] = [
    {
      name: 'Example 1',
    },
    {
      name: 'Example 2',
    },
    {
      name: 'Example 3',
    },
    {
      name: 'Example 4',
    },
  ];

  constructor() {
    super('name');
  }

  override move(item: Example, position: number): void {}

  override copy(
    item: Example,
    position: number,
    newContainer: CdkDropList<Example[]>,
  ): void {}

  override transfer(
    item: Example,
    position: number,
    oldContainer?: CdkDropList<Example[]> | undefined,
    newContainer?: CdkDropList<Example[]> | undefined,
  ): void {}
}
