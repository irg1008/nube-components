import { BaseBoxShapeTool } from '@tldraw/tldraw';
import { shapeName } from './placeholder-img.consts';

export class PlaceholderImageTool extends BaseBoxShapeTool {
  static override id = shapeName;
  static override initial = 'idle';
  override shapeType = shapeName;
}
