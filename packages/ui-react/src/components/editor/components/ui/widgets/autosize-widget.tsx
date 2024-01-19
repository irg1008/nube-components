import { AutoSize, Widget } from '@/editor/utils/widget.utils';
import { Button } from '@material-tailwind/react';
import { FoldHorizontalIcon } from 'lucide-react';

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
