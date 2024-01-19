import { StyleProp } from '@tldraw/tldraw';
import { CSSProperties } from 'react';

export const objectFitPropName = 'objectFit';

export type CSSObjectFit = Exclude<CSSProperties['objectFit'], undefined>;
export type ObjectFit = Extract<CSSObjectFit, 'contain' | 'cover'>;

export const ObjectFitStyle = StyleProp.define<ObjectFit>(objectFitPropName, {
  defaultValue: 'contain',
});
