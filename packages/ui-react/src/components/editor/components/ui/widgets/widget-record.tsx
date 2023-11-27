import { TLShape } from '@tldraw/tldraw';
import { HTMLAttributes, createElement } from 'react';
import { HorizontalAlignWidget, VerticalAlignWidget } from './align-widget';
import { AutosizeWidget } from './autosize-widget';
import { BaseColorWidget, LabelColorWidget } from './color-widget';
import { DashWidget } from './dash-widget';
import { FillWidget } from './fill-widget';
import { FontWidget } from './font-widget';
import { GeoWidget } from './geo-widget';
import { ObjectFitWidget } from './object-fit.widget';
import { ObjectPositionWidget } from './object-position-widget';
import { SizeWidget } from './size-widget';
import { SplineWidget } from './spline-widget';
import { TextVariableWidget, UrlVariableWidget } from './text-variable-widget';
import {
  EditableProp,
  ExtractMetaForProp,
  ExtractTypeForProp,
  PropsKey,
  WidgetForKey,
  WidgetProps,
  WidgetRecord,
} from './widget.types';

const propWidgets: Partial<WidgetRecord> = {
  [EditableProp.Text]: TextVariableWidget,
  [EditableProp.CustomUrl]: UrlVariableWidget,
  [EditableProp.ObjectFit]: ObjectFitWidget,
  [EditableProp.ObjectPosition]: ObjectPositionWidget,

  [EditableProp.LabelColor]: LabelColorWidget,
  [EditableProp.Font]: FontWidget,
  [EditableProp.AutoSize]: AutosizeWidget,
  [EditableProp.Align]: HorizontalAlignWidget,
  [EditableProp.VerticalAlign]: VerticalAlignWidget,

  [EditableProp.Size]: SizeWidget,

  [EditableProp.Geo]: GeoWidget,
  [EditableProp.Color]: BaseColorWidget,
  [EditableProp.Fill]: FillWidget,
  [EditableProp.Dash]: DashWidget,

  [EditableProp.Spline]: SplineWidget,
};

export type WidgetForProps<
  K extends keyof WidgetRecord,
  C = keyof JSX.IntrinsicElements,
> = {
  shapes: TLShape[];
  prop: K;
  as?: C;
  containerProps?: HTMLAttributes<C>;
  onChange: WidgetProps<ExtractTypeForProp<K>>['onChange'];
};

export const WidgetForProp = <
  K extends keyof WidgetRecord,
  C extends keyof HTMLElementTagNameMap,
>({
  shapes,
  onChange,
  prop,
  as,
  containerProps,
}: WidgetForProps<K, C>) => {
  if (!Object.keys(propWidgets).includes(prop)) return;

  const PropWidget = propWidgets[prop] as WidgetForKey<K>;
  if (!PropWidget) return null;

  const [firstShape] = shapes;

  return createElement(as ?? 'div', {
    ...containerProps,
    children: (
      <PropWidget
        initialValue={firstShape.props[prop as PropsKey]}
        meta={firstShape.meta as ExtractMetaForProp<K>}
        onChange={onChange}
      />
    ),
  });
};
