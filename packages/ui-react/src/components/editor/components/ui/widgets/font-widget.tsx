import { Font, Widget, fonts } from '@/editor/utils/widget.utils';
import { Tooltip, Typography } from '@material-tailwind/react';
import { DefaultFontFamilies, track } from '@tldraw/tldraw';
import { SelectionGrid } from './selection-grid';

export const FontWidget: Widget<Font> = track(({ initialValue, onChange }) => {
  const getCss = (font: Font) => DefaultFontFamilies[font];

  return (
    <>
      <Typography variant="small" className="mb-3 font-bold">
        Fuente
      </Typography>
      <SelectionGrid
        label="font"
        options={fonts}
        selected={initialValue}
        onChange={onChange}
        getComputedStyle={(font) => ({ fontFamily: getCss(font) })}
        btnContent={
          <Typography variant="small" className="font-family-inherit">
            Aa
          </Typography>
        }>
        {(font, btn) => (
          <Tooltip key={font} content={font}>
            {btn}
          </Tooltip>
        )}
      </SelectionGrid>
    </>
  );
});
