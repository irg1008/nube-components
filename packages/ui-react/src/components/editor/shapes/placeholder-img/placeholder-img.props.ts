import {
  ObjectPositionStyle,
  objectPositionPropName,
} from '@/editor/styles/object-position';
import { ObjectFitStyle, objectFitPropName } from '@/editor/styles/objet-fit';
import { ShapeProps, T } from '@tldraw/tldraw';
import { PIShape } from './placeholder-img.types';

export const basicRectangleProps: ShapeProps<PIShape> = {
  w: T.number,
  h: T.number,
  customUrl: T.string,
  [objectFitPropName]: ObjectFitStyle,
  [objectPositionPropName]: ObjectPositionStyle,
};

export const defaultProps: PIShape['props'] = {
  w: 200,
  h: 200,
  customUrl: '',
  [objectFitPropName]: ObjectFitStyle.defaultValue,
  [objectPositionPropName]: ObjectPositionStyle.defaultValue,
};
