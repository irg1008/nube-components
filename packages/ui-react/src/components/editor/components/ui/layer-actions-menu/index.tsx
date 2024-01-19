import {
  CustomButton,
  CustomButtonProps,
} from '@/editor/components/ui/custom-btn';
import { Action } from '@/editor/hooks/useEditor';
import { getIconElement } from '@/editor/utils/icons.utils';
import { Button, Menu, MenuHandler, MenuList } from '@material-tailwind/react';
import { TLUiIconType } from '@tldraw/tldraw';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BringToFrontIcon,
  Grid3X3Icon,
  LucideIcon,
  MagnetIcon,
  SendToBackIcon,
} from 'lucide-react';
import { PropsWithChildren } from 'react';

type LayerActionsProps = {
  onAction: (action: Action) => void;
} & Omit<CustomButtonProps, 'children'>;

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
    action: 'duplicate',
    tooltip: 'Duplicar',
    icon: 'duplicate',
  },
  {
    action: 'toggle-grid',
    tooltip: 'Mostrar/esconder grid',
    icon: Grid3X3Icon,
  },
  {
    action: 'toggle-snap-mode',
    tooltip: 'Activar/desactivar detección de bordes',
    icon: MagnetIcon,
  },
];

export const LayerActionsMenu = ({
  onAction,
  children,
  ...props
}: PropsWithChildren<LayerActionsProps>) => {
  return (
    <Menu allowHover>
      <MenuHandler>
        <Button {...props}>{children}</Button>
      </MenuHandler>
      <MenuList className="grid grid-cols-3">
        {layerActions.map(({ tooltip, action, icon }) => (
          <div key={action} className="focus:outline-none">
            <CustomButton
              tooltip={tooltip}
              variant="text"
              size="sm"
              onClick={() => onAction(action)}>
              {getIconElement(icon)}
            </CustomButton>
          </div>
        ))}
      </MenuList>
    </Menu>
  );
};
