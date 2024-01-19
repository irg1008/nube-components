import {
  TLAnyShapeUtilConstructor,
  TLStateNodeConstructor,
} from '@tldraw/tldraw';
import { basicRectangle } from './basic-rectangle/basic-rectangle.consts';
import { BasicRectangleTool } from './basic-rectangle/basic-rectangle.tool';
import { BasicRectangleUtil } from './basic-rectangle/basic-rectangle.util';
import { placeholderImage } from './placeholder-img/placeholder-img.consts';
import { PlaceholderImageTool } from './placeholder-img/placeholder-img.tool';
import { PlaceholderImgUtil } from './placeholder-img/placeholder-img.util';

export const customShapeUtils: TLAnyShapeUtilConstructor[] = [
  BasicRectangleUtil,
  PlaceholderImgUtil,
];

export const customTools: TLStateNodeConstructor[] = [
  BasicRectangleTool,
  PlaceholderImageTool,
];

export const customToolsNames = [basicRectangle, placeholderImage] as const;
