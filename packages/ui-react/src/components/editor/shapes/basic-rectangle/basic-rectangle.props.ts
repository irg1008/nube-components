import {
  BackgroundColorStyle,
  backgroundColorPropName,
} from '@/editor/styles/background-color';
import { ShapeProps, T } from '@tldraw/tldraw';
import { BRShape } from './basic-rectangle.types';

export const basicRectangleProps: ShapeProps<BRShape> = {
  w: T.number,
  h: T.number,
  [backgroundColorPropName]: BackgroundColorStyle,
};

export const defaultProps: BRShape['props'] = {
  w: 200,
  h: 200,
  [backgroundColorPropName]: BackgroundColorStyle.defaultValue,
};
