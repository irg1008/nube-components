import { BaseBoxShapeTool, TLClickEvent } from '@tldraw/tldraw';

export class VariableShapeTool extends BaseBoxShapeTool {
  static override id = 'variable';
  static override initial = 'idle';
  override shapeType = 'variable';

  override onDoubleClick: TLClickEvent = (_info) => {
    // you can handle events in handlers like this one;
    // check the BaseBoxShapeTool source as an example
  };
}
