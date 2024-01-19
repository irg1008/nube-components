import { BaseBoxShapeTool } from '@tldraw/tldraw';
import { basicRectangle } from './basic-rectangle.consts';

export class BasicRectangleTool extends BaseBoxShapeTool {
  static override id = basicRectangle;
  static override initial = 'idle';
  override shapeType = basicRectangle;
}
