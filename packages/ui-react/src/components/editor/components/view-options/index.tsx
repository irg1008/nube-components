import { useEditor } from '@/editor/hooks/useEditor';
import { useCanvas } from '@/editor/stores/canvas.store';
import { getIconElement } from '@/editor/utils/icons.utils';
import {
  ButtonGroup,
  ButtonProps,
  IconButton,
  Tooltip,
} from '@material-tailwind/react';
import {
  FullscreenIcon,
  LucideIcon,
  PencilIcon,
  ViewIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from 'lucide-react';
import { toast } from 'sonner';
import { useUpdateEffect } from 'usehooks-ts';

type ActionProps = {
  action: () => void;
  icon: LucideIcon;
  tooltip: string;
};

export const Action = ({
  tooltip,
  icon,
  action,
  ...props
}: ActionProps & Omit<ButtonProps, 'children' | 'ref'>) => {
  return (
    <Tooltip content={tooltip}>
      <IconButton onClick={action} {...props}>
        {getIconElement(icon)}
      </IconButton>
    </Tooltip>
  );
};

export const ViewOptions = () => {
  const { refitCanvas } = useCanvas();
  const { performAction, toggleReadonly, isReadonly } = useEditor();

  useUpdateEffect(() => {
    toast.info(`Modo solo lectura ${isReadonly ? 'activado' : 'desactivado'}`, {
      id: 'isReadonly',
      duration: 1000,
    });
  }, [isReadonly]);

  const actions: ActionProps[] = [
    {
      action: () => performAction('zoom-out'),
      icon: ZoomOutIcon,
      tooltip: 'Alejar',
    },
    {
      action: () => refitCanvas(),
      icon: FullscreenIcon,
      tooltip: 'Ajustar a pantalla',
    },
    {
      action: () => performAction('zoom-in'),
      icon: ZoomInIcon,
      tooltip: 'Acercar',
    },
    {
      action: () => toggleReadonly(),
      icon: isReadonly ? PencilIcon : ViewIcon,
      tooltip: isReadonly ? 'Modo edición' : 'Modo lectura',
    },
  ];

  return (
    <div
      id="editor-view-options"
      className="absolute bottom-0 left-1/2 flex -translate-x-1/2 items-start justify-center gap-4 p-4 sm:left-0 sm:translate-x-0">
      <ButtonGroup size="sm" variant="filled" color="white">
        {actions.map((props) => (
          <Action key={props.tooltip} {...props} />
        ))}
      </ButtonGroup>
    </div>
  );
};
