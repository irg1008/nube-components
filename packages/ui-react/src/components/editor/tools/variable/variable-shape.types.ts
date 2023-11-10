import {
  TLBaseShape,
  TLDefaultColorStyle,
  TLTextShapeProps,
} from '@tldraw/tldraw';

// We'll have a custom style called weight
export type IWeightStyle = 'regular' | 'bold';

// A type for our custom card shape.
// TODO: Add custom prop on side styles card?? O maybe use shared zone??
export type IVariableShape = TLBaseShape<
  'variable',
  {
    w: number;
    h: number;
    color: TLDefaultColorStyle;
    weight: IWeightStyle;
    custom: string;
  } & Pick<TLTextShapeProps, 'font'>
>;
