import { createStyleWithContent } from './dom.utils';

type Font = {
  name: string;
  weights?: number[];
};

const fonts: Font[] = [
  {
    name: 'IBM Plex Mono',
  },
  {
    name: 'IBM Plex Sans',
  },
  {
    name: 'IBM Plex Serif',
  },
  {
    name: 'Shantell Sans',
    weights: [500, 600],
  },
];

const encodeFontName = (font: Font) => {
  const { name, weights } = font;
  const encodedWeights = weights ? `:wght@${weights.join(';')}` : '';
  const encodedName = name.replaceAll(' ', '+');
  return `${encodedName}${encodedWeights}`;
};

export const getFontsCdnSource = () => {
  const cdn = 'https://fonts.googleapis.com/css2';
  const fontsEncodedStrings = fonts.map(encodeFontName);
  return `${cdn}?family=${fontsEncodedStrings.join('&family=')}&display=swap`;
};

export const getFontsStyle = () => {
  const fontSource = getFontsCdnSource();
  const importStr = `@import url('${fontSource}');`;
  return createStyleWithContent(importStr);
};

export const getFontFaceSetString = () => {
  let fontStyleString = '';
  document.fonts.forEach((font) => {
    if (!('$$_fontface' in font)) return;
    fontStyleString += (font as FontFace & { $$_fontface: string })[
      '$$_fontface'
    ];
  });
  return fontStyleString;
};

export const getFontFaceSetStyle = () => {
  const fontStyleString = getFontFaceSetString();
  return createStyleWithContent(fontStyleString);
};
