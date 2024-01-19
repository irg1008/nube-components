import { StyleProp } from '@tldraw/tldraw';
import { CSSProperties } from 'react';

export type BackgroundColor = Exclude<
  CSSProperties['backgroundColor'],
  undefined
>;

export const backgroundColorPropName = 'backgroundColor';

export const BackgroundColorStyle = StyleProp.define<BackgroundColor>(
  backgroundColorPropName,
  { defaultValue: '#ffffff' },
);
