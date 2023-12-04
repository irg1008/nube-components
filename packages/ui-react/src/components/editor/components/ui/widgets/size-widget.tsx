import { Size, Widget, sizes } from '@/editor/utils/widget.utils';
import { Typography } from '@material-tailwind/react';
import { SelectionGrid } from './selection-grid';

export const SizeWidget: Widget<Size> = ({ onChange, initialValue }) => {
  return (
    <>
      <Typography variant="small" className="mb-3 font-bold">
        Tamaño de trazo
      </Typography>
      <SelectionGrid
        label="size"
        options={sizes}
        selected={initialValue}
        onChange={onChange}
        btnContent={(prop) => (
          <Typography variant="small" className="font-bold uppercase">
            {prop}
          </Typography>
        )}
      />
    </>
  );
};
