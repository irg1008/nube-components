import { BaseBoxShapeTool } from '@tldraw/tldraw';
import { placeholderImage } from './placeholder-img.consts';

export class PlaceholderImageTool extends BaseBoxShapeTool {
  static override id = placeholderImage;
  static override initial = 'idle';
  override shapeType = placeholderImage;
}
