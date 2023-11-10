import {
  DefaultColorStyle,
  DefaultFontStyle,
  ShapeProps,
  StyleProp,
  T,
} from '@tldraw/tldraw';
import { IVariableShape } from './variable-shape.types';

export const WeightStyle = StyleProp.defineEnum('myApp:weight', {
  defaultValue: 'regular',
  values: ['regular', 'bold'],
});

export const CustomStyle = StyleProp.define('myApp:custom', {
  defaultValue: 'pepe',
  type: T.string,
});

// Validation for our custom card shape's props, using our custom style + one of tldraw's default styles
export const variableShapeProps: ShapeProps<IVariableShape> = {
  w: T.number,
  h: T.number,
  color: DefaultColorStyle,
  font: DefaultFontStyle,
  weight: WeightStyle,
  custom: CustomStyle,
};
