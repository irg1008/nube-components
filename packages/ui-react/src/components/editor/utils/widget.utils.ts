import { Geometry } from '@/editor/hooks/useEditor';
import { PIShape } from '@/editor/shapes/placeholder-img/placeholder-img.types';
import { ObjectPosition } from '@/editor/styles/object-position';
import { ObjectFit } from '@/editor/styles/objet-fit';
import { JSONContent } from '@tiptap/core';
import type {
  TLDefaultVerticalAlignStyle as Align,
  TLArrowShapeArrowheadStyle as ArrowHead,
  TLDefaultColorStyle as Color,
  TLDefaultDashStyle as Dash,
  TLDefaultFillStyle as Fill,
  TLDefaultFontStyle as Font,
  JsonObject,
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

export type VariableMeta = {
  content: JSONContent;
  value: string;
};

export type TypeForProp =
  | {
      prop: EditableProp.Text;
      type: Text;
      meta: VariableMeta;
    }
  | {
      prop: EditableProp.CustomUrl;
      type: Url;
      meta: VariableMeta;
    }
  | {
      prop: EditableProp.Color;
      type: Color;
      meta: never;
    }
  | {
      prop: EditableProp.LabelColor;
      type: Color;
      meta: never;
    }
  | {
      prop: EditableProp.Font;
      type: Font;
      meta: never;
    }
  | {
      prop: EditableProp.Align;
      type: Align;
      meta: never;
    }
  | {
      prop: EditableProp.VerticalAlign;
      type: Align;
      meta: never;
    }
  | {
      prop: EditableProp.Size;
      type: Size;
      meta: never;
    }
  | {
      prop: EditableProp.Dash;
      type: Dash;
      meta: never;
    }
  | {
      prop: EditableProp.Fill;
      type: Fill;
      meta: never;
    }
  | {
      prop: EditableProp.Spline;
      type: Spline;
      meta: never;
    }
  | {
      prop: EditableProp.ArrowHeadStart;
      type: ArrowHead;
      meta: never;
    }
  | {
      prop: EditableProp.ArrowHeadEnd;
      type: ArrowHead;
      meta: never;
    }
  | {
      prop: EditableProp.Geo;
      type: Geometry;
      meta: never;
    }
  | {
      prop: EditableProp.AutoSize;
      type: AutoSize;
      meta: never;
    }
  | {
      prop: EditableProp.ObjectFit;
      type: ObjectFit;
      meta: never;
    }
  | {
      prop: EditableProp.ObjectPosition;
      type: ObjectPosition;
      meta: never;
    };

export type ExtractForProp<K extends EditableProp> = Extract<
  TypeForProp,
  { prop: K }
>;

export type ExtractTypeForProp<K extends EditableProp> =
  ExtractForProp<K>['type'];

export type ExtractMetaForProp<K extends EditableProp> =
  ExtractForProp<K>['meta'];

//#endregion

//#region Widgets

export type Props = TLDefaultShape['props'];
export type PropsKey = keyof Props;

export type WidgetProps<T, M = Partial<JsonObject>> = {
  initialValue: T;
  onChange: (value: T, meta?: M) => void;
  meta: M;
};

type WidgetFC<T, P, M> = (props: WidgetProps<T, M> & P) => JSX.Element;

export type Widget<T, P = unknown, M = never> =
  | MemoExoticComponent<WidgetFC<T, P, M>>
  | WidgetFC<T, P, M>;

export type WidgetForKey<K extends EditableProp, P = unknown> = Widget<
  ExtractTypeForProp<K>,
  P,
  ExtractMetaForProp<K>
>;

export type WidgetRecord<P = unknown> = {
  [K in EditableProp]: WidgetForKey<K, P>;
};

//#endregion
