import {
  ObjectPosition,
  objectPositionPropName,
} from '@/editor/styles/object-position';
import { ObjectFit, objectFitPropName } from '@/editor/styles/objet-fit';
import { TLBaseShape } from '@tldraw/tldraw';
import { placeholderImage } from './placeholder-img.consts';

export type PIShape = TLBaseShape<
  typeof placeholderImage,
  {
    w: number;
    h: number;
    customUrl: string;
    [objectFitPropName]: ObjectFit;
    [objectPositionPropName]: ObjectPosition;
  }
>;
