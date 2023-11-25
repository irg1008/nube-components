import {
  ObjectPosition,
  objectPositionPropName,
} from '@/editor/styles/object-position';
import { ObjectFit, objectFitPropName } from '@/editor/styles/objet-fit';
import { TLBaseShape } from '@tldraw/tldraw';
import { shapeName } from './placeholder-img.consts';

export type PIShape = TLBaseShape<
  typeof shapeName,
  {
    w: number;
    h: number;
    customUrl: string;
    [objectFitPropName]: ObjectFit;
    [objectPositionPropName]: ObjectPosition;
  }
>;
