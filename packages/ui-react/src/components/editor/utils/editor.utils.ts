import {
  JsonObject,
  JsonPrimitive,
  RecordsDiff,
  TLRecord,
  TLShape,
  TLShapePartial,
} from '@tldraw/tldraw';
import intersect from 'just-intersect';

export const shapeLookup = <S extends TLShape = TLShape>(
  shapes: TLShape[],
  types: string[],
): [S[], TLShape[]] => {
  const lookup = (shape: TLShape) => types.includes(shape.type);
  const positive = shapes.filter(lookup);
  const negative = shapes.filter((shape) => !lookup(shape));
  return [positive as S[], negative];
};

export const filterShapeInChanges = (changes: TLRecord[]) => {
  return changes.filter(({ typeName }) => typeName === 'shape') as TLShape[];
};

export const getShapesInChange = ({
  added,
  updated,
  removed,
}: RecordsDiff<TLRecord>) => {
  return {
    added: Object.values(added),
    removed: Object.values(removed),
    updated: Object.values(updated).map((s) => s[1]),
  };
};

export const getShapesSharedProps = <T>(shapes: TLShape[]): T[] => {
  const shapePropsKeys = shapes.map((shape) => Object.keys(shape.props));
  return shapePropsKeys.reduce(intersect, shapePropsKeys[0]) as T[];
};

export const updateShape = <T extends string, V>(
  shape: TLShape,
  prop: T,
  value: V,
): TLShapePartial => {
  return {
    id: shape.id,
    type: shape.type,
    props: {
      ...shape.props,
      [prop]: value,
    },
  };
};

export type UpdatePropCb<V> = (shape: TLShape) => V;

export type UpdatePropsParams<V = JsonPrimitive> = {
  prop: string;
  value: V;
  meta?: Partial<JsonObject>;
};

export const updateShapeProp = <V = JsonPrimitive>(
  shape: TLShape,
  { prop, value, meta }: UpdatePropsParams<V>,
): TLShapePartial => {
  return {
    id: shape.id,
    type: shape.type,
    meta,
    props: {
      [prop]: value,
    },
  };
};

export const updateShapesProp = <V = JsonPrimitive>(
  shapes: TLShape[],
  options: UpdatePropsParams<V>,
) => {
  return shapes.map((shape) => updateShapeProp(shape, options));
};
