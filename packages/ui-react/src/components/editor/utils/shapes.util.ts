import { placeholderImage } from '@/editor/shapes/placeholder-img/placeholder-img.consts';
import { TLShape } from '@tldraw/tldraw';
import { Variable } from '../components/ui/variable-input';
import { updateShapeProp } from './editor.utils';
import { fillDisplayValue } from './variable.utils';
import { EditableProp } from './widget.utils';

export type ShapeWithValue = TLShape & {
  meta: { value: string };
};

export const getShapeMetaValue = (s: TLShape) =>
  (s as ShapeWithValue).meta.value;

export const filterShapesWithValue = (shapes: TLShape[]) =>
  shapes.filter(getShapeMetaValue);

const shapeDynamicProp: Record<string, EditableProp> = {
  [placeholderImage]: EditableProp.CustomUrl,
};

const defaultProp = EditableProp.Text;

export const getProp = ({ type }: TLShape) => {
  return shapeDynamicProp[type] ?? defaultProp;
};

export const refillShapesDisplayValue = (
  shapes: TLShape[],
  variables: Variable[],
  resolver: (key: Variable['key']) => string,
) => {
  return filterShapesWithValue(shapes).map((shape) => {
    const value = getShapeMetaValue(shape);
    const newValue = fillDisplayValue(value, variables, resolver);
    return updateShapeProp(shape, {
      prop: getProp(shape),
      value: newValue,
    });
  });
};
