import { CanvasSize } from '@/editor/stores/canvas.store';
import { cssScopeClassName } from 'config/styles.config';
import { getInlineStyles } from './dom.utils';
import { getFontFaceSetStyle } from './font.utils';

const getCanvasNode = () => {
  return document
    .querySelector('.tl-shapes')!
    .cloneNode(true) as HTMLDivElement;
};

export const generateCanvasHTML = (canvasSize: CanvasSize) => {
  const newDoc = document.implementation.createHTMLDocument();

  const fontStyle = getFontFaceSetStyle();
  const styles = getInlineStyles();

  newDoc.head.append(...styles, fontStyle);

  const canvasNode = getCanvasNode();
  transformCanvasToExport(canvasNode, canvasSize);

  newDoc.body.innerHTML = canvasNode.outerHTML;
  transformBodyToExport(newDoc.body);

  return newDoc;
};

export const updateElementsValue = <T extends { id: string }>(
  doc: Document,
  values: T[],
  valueTransform: (el: HTMLElement, v: T) => void,
) => {
  values.forEach((v) => {
    const el = doc.getElementById(v.id);
    if (!el) throw new Error(`Element not found for value with id ${v.id}`);
    valueTransform(el, v);
  });
  return doc;
};

export const getTextShapeElement = (el: HTMLElement) =>
  el.querySelector('.tl-text-content') as HTMLElement;

const transformCanvasToExport = (
  canvas: HTMLDivElement,
  { h, w }: CanvasSize,
) => {
  canvas.classList.remove('tl-html-layer');
  canvas.classList.add('tl-container');
  canvas.style.transform = 'none';
  canvas.style.clipPath = `polygon(0px 0px, ${w}px 0px, ${w}px ${h}px, 0px ${h}px)`;
  canvas.style.width = `${w}px`;
  canvas.style.height = `${h}px`;
};

const transformBodyToExport = (body: HTMLElement) => {
  body.style.width = 'min-content';
  body.style.height = 'min-content';
  body.style.margin = '0';
  body.style.padding = '0';
  body.style.background = 'none';
  body.classList.add(cssScopeClassName);
};
