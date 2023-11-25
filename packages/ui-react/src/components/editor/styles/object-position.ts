import { StyleProp } from '@tldraw/tldraw';
import { CSSProperties } from 'react';

export const objectPositionPropName = 'objectPosition';

export type ObjectPosition = `${'bottom' | 'top' | 'center'}-${
  | 'left'
  | 'right'
  | 'center'}`;

export const ObjectPositionStyle = StyleProp.define<ObjectPosition>(
  objectPositionPropName,
  { defaultValue: 'center-center' },
);

export const getCSSObjectPosition = (
  objectPos: ObjectPosition,
): CSSProperties['objectPosition'] => {
  return objectPos.split('-').reverse().join(' ');
};
