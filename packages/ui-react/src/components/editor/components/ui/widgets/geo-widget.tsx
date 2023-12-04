import { FreeFormMenu } from '@/editor/components/ui/freeform-menu';
import { Geometry } from '@/editor/hooks/useEditor';
import { Widget } from '@/editor/utils/widget.utils';
import { Typography } from '@material-tailwind/react';
import { ChevronDown } from 'lucide-react';

export const GeoWidget: Widget<Geometry> = ({ onChange, initialValue }) => {
  return (
    <>
      <Typography variant="small" className="mb-3 font-bold">
        Formato de forma
      </Typography>
      <FreeFormMenu
        onFormPick={onChange}
        initialGeo={initialValue}
        fullWidth
        variant="gradient"
        size="sm"
        label={
          <span className="flex grow items-center justify-between">
            Cambiar forma
            <ChevronDown className="h-3 w-3 opacity-75" />
          </span>
        }
      />
    </>
  );
};
