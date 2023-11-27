import { Geometry } from '@/editor/hooks/useEditor';
import { PIShape } from '@/editor/shapes/placeholder-img/placeholder-img.types';
import { ObjectPosition } from '@/editor/styles/object-position';
import { ObjectFit } from '@/editor/styles/objet-fit';
import type {
  TLDefaultVerticalAlignStyle as Align,
  TLArrowShapeArrowheadStyle as ArrowHead,
  TLDefaultColorStyle as Color,
  TLDefaultDashStyle as Dash,
  TLDefaultFillStyle as Fill,
  TLDefaultFontStyle as Font,
  TLDefaultSizeStyle as Size,
  TLTextShape,
} from '@tldraw/tldraw';
import {
  DefaultColorStyle,
  DefaultDashStyle,
  DefaultFillStyle,
  DefaultFontStyle,
  DefaultHorizontalAlignStyle,
  DefaultSizeStyle,
  DefaultVerticalAlignStyle,
  TLDefaultShape,
  TLLineShape,
} from '@tldraw/tldraw';
import { MemoExoticComponent } from 'react';
export type {
  Align,
  ArrowHead,
  Color,
  Dash,
  Fill,
  Font,
  ObjectFit,
  ObjectPosition,
  Size,
};

//#region Editor Prop Types

export enum EditableProp {
  Text = 'text',
  Color = 'color',
  Font = 'font',
  LabelColor = 'labelColor',
  Fill = 'fill',
  Dash = 'dash',
  Size = 'size',
  Align = 'align',
  VerticalAlign = 'verticalAlign',
  Spline = 'spline',
  ArrowHeadStart = 'arrowheadStart',
  ArrowHeadEnd = 'arrowheadEnd',
  Geo = 'geo',
  AutoSize = 'autoSize',
  CustomUrl = 'customUrl',
  ObjectFit = 'objectFit',
  ObjectPosition = 'objectPosition',
}

export const fonts = DefaultFontStyle.values;

export const colors = DefaultColorStyle.values;

export const sizes = DefaultSizeStyle.values;

export const fillValues = DefaultFillStyle.values;

export const dashValues = DefaultDashStyle.values;

export const alignValues = DefaultHorizontalAlignStyle.values;

export const verticalAlignValues = DefaultVerticalAlignStyle.values;

export type Spline = TLLineShape['props'][EditableProp.Spline];

export type Text = TLTextShape['props'][EditableProp.Text];

export type Url = PIShape['props'][EditableProp.CustomUrl];

export type AutoSize = TLTextShape['props'][EditableProp.AutoSize];

export type TypeForProp =
  | {
      prop: EditableProp.Text;
      type: Text;
    }
  | {
      prop: EditableProp.CustomUrl;
      type: Url;
    }
  | {
      prop: EditableProp.Color;
      type: Color;
    }
  | {
      prop: EditableProp.LabelColor;
      type: Color;
    }
  | {
      prop: EditableProp.Font;
      type: Font;
    }
  | {
      prop: EditableProp.Align;
      type: Align;
    }
  | {
      prop: EditableProp.VerticalAlign;
      type: Align;
    }
  | {
      prop: EditableProp.Size;
      type: Size;
    }
  | {
      prop: EditableProp.Dash;
      type: Dash;
    }
  | {
      prop: EditableProp.Fill;
      type: Fill;
    }
  | {
      prop: EditableProp.Spline;
      type: Spline;
    }
  | {
      prop: EditableProp.ArrowHeadStart;
      type: ArrowHead;
    }
  | {
      prop: EditableProp.ArrowHeadEnd;
      type: ArrowHead;
    }
  | {
      prop: EditableProp.Geo;
      type: Geometry;
    }
  | {
      prop: EditableProp.AutoSize;
      type: AutoSize;
    }
  | {
      prop: EditableProp.ObjectFit;
      type: ObjectFit;
    }
  | {
      prop: EditableProp.ObjectPosition;
      type: ObjectPosition;
    };

export type ExtractForProp<K extends EditableProp> = Extract<
  TypeForProp,
  { prop: K }
>;

export type ExtractTypeForProp<K extends EditableProp> =
  ExtractForProp<K>['type'];

//#endregion

//#region Widgets

export type Props = TLDefaultShape['props'];
export type PropsKey = keyof Props;

export type WidgetProps<T, M = object> = {
  initialValue: T;
  onChange: (newValue: T, meta?: M) => void;
  meta: M;
};

type WidgetFC<T, P, M> = (props: WidgetProps<T, M> & P) => JSX.Element;

export type Widget<T, P = unknown, M = object> =
  | MemoExoticComponent<WidgetFC<T, P, M>>
  | WidgetFC<T, P, M>;

export type WidgetRecord = {
  [K in EditableProp]: Widget<ExtractTypeForProp<K>>;
};

//#endregion
