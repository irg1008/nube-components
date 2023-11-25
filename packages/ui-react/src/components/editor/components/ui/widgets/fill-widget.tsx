import { Tooltip, Typography } from '@material-tailwind/react';
import { Icon } from '@tldraw/tldraw';
import { SelectionGrid } from './selection-grid';
import { Fill, Widget, fillValues } from './widget.types';

const tooltips = {
  none: 'Ninguno',
  pattern: 'Textura',
  semi: 'Sin color',
  solid: 'Sólido',
} satisfies Record<Fill, string>;

export const FillWidget: Widget<Fill> = ({ onChange, initialValue }) => {
  return (
    <>
      <Typography variant="small" className="mb-3 font-bold">
        Relleno
      </Typography>
      <SelectionGrid
        label="fill"
        options={fillValues}
        selected={initialValue}
        onChange={onChange}
        btnContent={(prop) => (
          <Icon icon={`fill-${prop}`} className="h-4 w-4" />
        )}>
        {(prop, btn) => (
          <Tooltip key={prop} content={tooltips[prop]}>
            {btn}
          </Tooltip>
        )}
      </SelectionGrid>
    </>
  );
};
