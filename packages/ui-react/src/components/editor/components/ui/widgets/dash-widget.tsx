import { Tooltip, Typography } from '@material-tailwind/react';
import { Icon } from '@tldraw/tldraw';
import { SelectionGrid } from './selection-grid';
import { Dash, Widget, dashValues } from './widget.types';

const tooltips = {
  dashed: 'Líneas',
  dotted: 'Puntos',
  draw: 'Dibujo',
  solid: 'Sólido',
} satisfies Record<Dash, string>;

export const DashWidget: Widget<Dash> = ({ onChange, initialValue }) => {
  return (
    <>
      <Typography variant="small" className="mb-3 font-bold">
        Formato de borde
      </Typography>
      <SelectionGrid
        label="dash"
        options={dashValues}
        selected={initialValue}
        onChange={onChange}
        btnContent={(prop) => (
          <Icon icon={`dash-${prop}`} className="h-4 w-4" />
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
