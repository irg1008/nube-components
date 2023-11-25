import { CanvasSize } from '@/editor/stores/canvas.store';
import { getInlineHeadStyles } from './dom.utils';
import { getFontFaceSetStyle } from './font.utils';

const getCanvasNode = () => {
  return document.querySelector<HTMLDivElement>('.tl-shapes')!;
};

export const generateCanvasHTML = (canvasSize: CanvasSize) => {
  const newDoc = document.implementation.createHTMLDocument();

  const fontStyle = getFontFaceSetStyle();
  const styles = getInlineHeadStyles();
  newDoc.head.append(...styles, fontStyle);

  const canvasNode = getCanvasNode();
  transformCanvasToExport(canvasNode, canvasSize);

  // TODO: Swap temp values inside variables maybe identified somehow with a tag attributte???
  // Swap the value for scriban template variable
  // In this swap we could also receive the variable type from configuration and add the specific scriban syntax
  // Maybe bette rnot because in dates for example we need to add .Datetime (like in C#) and we don't want o miss c# syntax here.

  newDoc.body.innerHTML = canvasNode.outerHTML;
  transformBodyToExport(newDoc.body);

  return newDoc;
};

const transformCanvasToExport = (
  canvas: HTMLDivElement,
  { h, w }: CanvasSize,
) => {
  canvas.classList.remove('tl-html-layer');
  canvas.classList.add('transform-none', 'tl-container');
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
};
