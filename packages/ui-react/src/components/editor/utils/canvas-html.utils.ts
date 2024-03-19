import { placeholderImage } from '@/editor/shapes/placeholder-img/placeholder-img.consts';
import { CanvasSize } from '@/editor/stores/canvas.store';
import { TLShape } from '@tldraw/tldraw';
import { cssScopeClassName } from 'config/styles.config';
import { getInlineStyles } from './dom.utils';
import { getFontFaceSetStyle } from './font.utils';
import { getShapeMetaValue } from './shapes.util';

export const generateCanvasHTML = (canvasSize: CanvasSize) => {
  // Canvas
  const canvasNode = getCanvasNode();
  removeFrameNode(canvasNode);
  removeNonExportableNodes(canvasNode);
  transformCanvasToExport(canvasNode, canvasSize);

  // Styles
  const fontStyle = getFontFaceSetStyle();
  const styles = getScopedStyleSheet();

  const newDoc = document.implementation.createHTMLDocument();
  newDoc.head.append(styles, fontStyle);
  newDoc.body.innerHTML = canvasNode.outerHTML;

  transformHeadToExport(newDoc.head);
  transformBodyToExport(newDoc.body);

  return newDoc;
};

const getScopedStyleSheet = () => {
  const styles = getInlineStyles();
  return styles.find((style) => style.innerText.includes(cssScopeClassName))!;
};

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

const removeNonExportableNodes = (canvas: HTMLDivElement) => {
  const nonExportable = canvas.querySelectorAll('[data-exportable="false"]');
  nonExportable.forEach((el) => el.remove());
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

const transformCanvasToExport = (canvas: HTMLDivElement, size: CanvasSize) => {
  canvas.classList.remove('tl-html-layer');

  const containerClassList = document.querySelector('.tl-container')!.classList;
  canvas.classList.value = containerClassList.value;

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

export const transformElement = (el: HTMLElement, shape: TLShape) => {
  const value = getShapeMetaValue(shape);
  if (!value) return;

  switch (shape.type) {
    case placeholderImage: {
      const imgEl = el.querySelector('img')!;
      if (!imgEl) return;
      imgEl.src = value;
      break;
    }
    default: {
      const textEl = el.querySelector<HTMLDivElement>('.tl-text-content');
      textEl!.textContent = value;
      break;
    }
  }
};
