import { getIconElement } from '@/editor/utils/icons.utils';
import { ObjectFit, Widget } from '@/editor/utils/widget.utils';
import { Tooltip, Typography } from '@material-tailwind/react';
import { FullscreenIcon, LucideIcon, MaximizeIcon } from 'lucide-react';
import { SelectionGrid } from './selection-grid';

const options: ObjectFit[] = ['cover', 'contain'];

const tooltips = {
  cover: 'Cubrir',
  contain: 'Encajar',
} satisfies Record<ObjectFit, string>;

const icons: Record<ObjectFit, LucideIcon> = {
  cover: MaximizeIcon,
  contain: FullscreenIcon,
};

export const ObjectFitWidget: Widget<ObjectFit> = ({
  initialValue,
  onChange,
}) => {
  return (
    <>
      <Typography variant="small" className="mb-3 font-bold">
        Encaje de imagen
      </Typography>
      <SelectionGrid
        label="fill"
        options={options}
        selected={initialValue}
        onChange={onChange}
        btnContent={(prop) => getIconElement(icons[prop])}>
        {(prop, btn) => (
          <Tooltip key={prop} content={tooltips[prop]}>
            {btn}
          </Tooltip>
        )}
      </SelectionGrid>
    </>
  );
};
