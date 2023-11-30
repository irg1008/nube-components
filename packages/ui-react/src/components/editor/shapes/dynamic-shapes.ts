import { TLShape } from '@tldraw/tldraw';
import { placeholderImage } from './placeholder-img/placeholder-img.consts';

export type ShapeWithValue = TLShape & {
  meta: { value: string };
};

export const getShapeMetaValue = (s: TLShape) =>
  (s as ShapeWithValue).meta.value;

export const filterShapesWithValue = (shapes: TLShape[]) => {
  return shapes.filter(getShapeMetaValue);
};

export const getDynamicElement = (el: HTMLElement, shape: TLShape) => {
  const {
    type,
    meta: { value },
  } = shape as ShapeWithValue;
  if (!value) return;

  switch (type) {
    case placeholderImage: {
      const imgEl = el.querySelector('img')!;
      imgEl!.src = value;
      return;
    }

    default: {
      const textEl = el.querySelector<HTMLDivElement>('.tl-text-content');
      textEl!.textContent = value;
      return;
    }
  }
};
