import {
  BackgroundColor,
  backgroundColorPropName,
} from '@/editor/styles/background-color';
import { TLBaseShape } from '@tldraw/tldraw';
import { shapeName } from './basic-rectangle.consts';

export type BRShape = TLBaseShape<
  typeof shapeName,
  {
    w: number;
    h: number;
    [backgroundColorPropName]: BackgroundColor;
  }
>;
