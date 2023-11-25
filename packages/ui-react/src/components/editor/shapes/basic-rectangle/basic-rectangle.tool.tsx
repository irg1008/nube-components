import { BaseBoxShapeTool } from '@tldraw/tldraw';
import { shapeName } from './basic-rectangle.consts';

export class BasicRectangleTool extends BaseBoxShapeTool {
  static override id = shapeName;
  static override initial = 'idle';
  override shapeType = shapeName;
}
