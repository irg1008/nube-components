import {
  CustomButton,
  CustomButtonProps,
} from '@/editor/components/ui/custom-btn';
import { Action } from '@/editor/hooks/useEditor';
import { useCanvas } from '@/editor/stores/canvas.store';
import { getIconElement } from '@/editor/utils/icons.utils';
import { Button, Menu, MenuHandler, MenuList } from '@material-tailwind/react';
import { TLUiIconType } from '@tldraw/tldraw';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BringToFrontIcon,
  FlipHorizontal2Icon,
  FlipVertical2Icon,
  Grid3X3Icon,
  ImageDownIcon,
  Layers3Icon,
  LucideIcon,
  MagnetIcon,
  SendToBackIcon,
} from 'lucide-react';
import { PropsWithChildren } from 'react';

type LayerAction = {
  action: Action;
  tooltip: string;
  icon: LucideIcon | TLUiIconType;
};

const layerActions: LayerAction[] = [
  {
    action: 'bring-forward',
    tooltip: 'Traer hacia delante',
    icon: ArrowUpIcon,
  },
  {
    action: 'bring-to-front',
    tooltip: 'Traer al frente',
    icon: BringToFrontIcon,
  },
  {
    action: 'duplicate',
    tooltip: 'Duplicar',
    icon: 'duplicate',
  },
  {
    action: 'send-backward',
    tooltip: 'Enviar hacia atrás',
    icon: ArrowDownIcon,
  },
  {
    action: 'send-to-back',
    tooltip: 'Enviar al fondo',
    icon: SendToBackIcon,
  },
  {
    action: 'pack',
    tooltip: 'Amontonar capas en orden',
    icon: Layers3Icon,
  },
  {
    action: 'flip-horizontal',
    tooltip: 'Voltear horizontal',
    icon: FlipHorizontal2Icon,
  },
  {
    action: 'flip-vertical',
    tooltip: 'Voltear vertical',
    icon: FlipVertical2Icon,
  },
  {
    action: 'export-as-png',
    tooltip: 'Exportar como PNG',
    icon: ImageDownIcon,
  },
];

const genericActions: LayerAction[] = [
  {
    action: 'toggle-grid',
    tooltip: 'Mostrar/esconder cuadrícula',
    icon: Grid3X3Icon,
  },
  {
    action: 'toggle-snap-mode',
    tooltip: 'Activar/desactivar bordes inteligentes',
    icon: MagnetIcon,
  },
];

type ActionBtnProps = {
  disabled?: boolean;
};

type LayerActionsProps = {
  onAction: (action: Action) => void;
} & Omit<CustomButtonProps, 'children'>;

export const ActionsMenu = ({
  onAction,
  children,
  ...props
}: PropsWithChildren<LayerActionsProps>) => {
  const { selectedShapes } = useCanvas();

  const actionBtn = ({
    action,
    tooltip,
    icon,
    disabled,
  }: LayerAction & ActionBtnProps) => (
    <CustomButton
      key={action}
      tooltip={tooltip}
      variant="text"
      size="sm"
      disabled={disabled}
      onClick={() => onAction(action)}>
      {getIconElement(icon)}
    </CustomButton>
  );

  return (
    <Menu allowHover>
      <MenuHandler>
        <Button {...props}>{children}</Button>
      </MenuHandler>
      <MenuList>
        <div className="grid grid-cols-3 focus:outline-none">
          {layerActions.map((a) =>
            actionBtn({ ...a, disabled: !selectedShapes.length }),
          )}
        </div>
        <hr className="my-3" />
        <div className="grid grid-cols-3 focus:outline-none">
          {genericActions.map(actionBtn)}
        </div>
      </MenuList>
    </Menu>
  );
};
