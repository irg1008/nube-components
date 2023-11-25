import { Button } from '@material-tailwind/react';
import { FoldHorizontalIcon } from 'lucide-react';
import { AutoSize, Widget } from './widget.types';

export const AutosizeWidget: Widget<AutoSize> = ({
  onChange,
  initialValue,
}) => {
  return (
    <Button
      fullWidth
      size="sm"
      variant="text"
      className="flex items-center gap-3"
      disabled={initialValue}
      onClick={() => onChange(true)}>
      <FoldHorizontalIcon className="h-4 w-4" />
      Ajustar ancho automático
    </Button>
  );
};
