import {
  BackgroundColor,
  backgroundColorPropName,
} from '@/editor/styles/background-color';
import { TLBaseShape } from '@tldraw/tldraw';
import { basicRectangle } from './basic-rectangle.consts';

export type BRShape = TLBaseShape<
  typeof basicRectangle,
  {
    w: number;
    h: number;
    [backgroundColorPropName]: BackgroundColor;
  }
>;
