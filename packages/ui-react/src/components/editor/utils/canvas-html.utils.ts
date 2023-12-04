import { placeholderImage } from '@/editor/shapes/placeholder-img/placeholder-img.consts';
import { CanvasSize } from '@/editor/stores/canvas.store';
import { TLShape } from '@tldraw/tldraw';
import { cssScopeClassName } from 'config/styles.config';
import { getInlineStyles } from './dom.utils';
import { getFontFaceSetStyle } from './font.utils';
import { getShapeMetaValue } from './shapes.util';

const getCanvasNode = () => {
  return document
    .querySelector('.tl-shapes')!
    .cloneNode(true) as HTMLDivElement;
};

const removeFrameNode = (canvas: HTMLDivElement) => {
  const frame = canvas.querySelector('[data-shape-type="frame"]');
  if (!frame) return;
  frame.remove();
};

export const generateCanvasHTML = (canvasSize: CanvasSize) => {
  const newDoc = document.implementation.createHTMLDocument();

  const fontStyle = getFontFaceSetStyle();
  const styles = getInlineStyles();

  newDoc.head.append(...styles, fontStyle);

  const canvasNode = getCanvasNode();
  removeFrameNode(canvasNode);
  transformCanvasToExport(canvasNode, canvasSize);
  newDoc.body.innerHTML = canvasNode.outerHTML;

  transformBodyToExport(newDoc.body);
  transformHeadToExport(newDoc.head);

  return newDoc;
};

export const updateElementsValue = <T extends { id: string }>(
  doc: Document,
  values: T[],
  valueTransform: (el: HTMLElement, v: T) => void,
) => {
  values.forEach((v) => {
    const el = doc.getElementById(v.id);
    if (!el) return;
    valueTransform(el, v);
  });
  return doc;
};

export const getTextShapeElement = (el: HTMLElement) =>
  el.querySelector('.tl-text-content') as HTMLElement;

const transformCanvasToExport = (canvas: HTMLDivElement, size: CanvasSize) => {
  canvas.classList.remove('tl-html-layer');
  canvas.classList.add('tl-container');
  canvas.style.transform = 'none';
  canvas.style.width = `${size.w}px`;
  canvas.style.height = `${size.h}px`;
};

const transformBodyToExport = (body: HTMLElement) => {
  body.style.width = 'min-content';
  body.style.height = 'min-content';
  body.style.margin = '0';
  body.style.overflow = 'visible';
  body.classList.add(cssScopeClassName);
};

const transformHeadToExport = (head: HTMLElement) => {
  const meta = document.createElement('meta');
  meta.setAttribute('charset', 'utf-8');
  head.appendChild(meta);
};

type ElementResolver = (el: HTMLElement, value: string) => void;

const elementsResolvers: Record<string, ElementResolver> = {
  [placeholderImage]: (el, value) => {
    const imgEl = el.querySelector('img')!;
    imgEl!.src = value;
  },
};

const defaultResolver: ElementResolver = (el, value) => {
  const textEl = el.querySelector<HTMLDivElement>('.tl-text-content');
  textEl!.textContent = value;
};

export const getDynamicElement = (el: HTMLElement, shape: TLShape) => {
  const value = getShapeMetaValue(shape);
  if (!value) return;
  const resolver = elementsResolvers[shape.type] || defaultResolver;
  return resolver(el, value);
};
