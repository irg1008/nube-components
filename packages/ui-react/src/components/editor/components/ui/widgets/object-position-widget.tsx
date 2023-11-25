import { getIconElement } from '@/editor/utils/icons.utils';
import {
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  Tooltip,
  Typography,
} from '@material-tailwind/react';
import {
  ArrowDownIcon,
  ArrowDownLeftIcon,
  ArrowDownRightIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  ArrowUpLeftIcon,
  ArrowUpRightIcon,
  DotIcon,
  ExpandIcon,
  LucideIcon,
} from 'lucide-react';
import { ObjectPosition, Widget } from './widget.types';

type OptionInfo = {
  icon: LucideIcon;
  tooltip: string;
};

const options: Record<string, OptionInfo> = {
  'top-left': { icon: ArrowUpLeftIcon, tooltip: 'Arriba izquierda' },
  'top-center': { icon: ArrowUpIcon, tooltip: 'Arriba centro' },
  'top-right': { icon: ArrowUpRightIcon, tooltip: 'Arriba derecha' },
  'center-left': { icon: ArrowLeftIcon, tooltip: 'Centro izquierda' },
  'center-center': { icon: DotIcon, tooltip: 'Centro centro' },
  'center-right': { icon: ArrowRightIcon, tooltip: 'Centro derecha' },
  'bottom-left': { icon: ArrowDownLeftIcon, tooltip: 'Abajo izquierda' },
  'bottom-center': { icon: ArrowDownIcon, tooltip: 'Abajo centro' },
  'bottom-right': { icon: ArrowDownRightIcon, tooltip: 'Abajo derecha' },
} satisfies Record<ObjectPosition, OptionInfo>;

export const ObjectPositionWidget: Widget<ObjectPosition> = ({
  initialValue,
  onChange,
}) => {
  return (
    <div className="flex flex-row-reverse items-center justify-end gap-3">
      <Typography variant="small" className="font-bold">
        Alinear
      </Typography>
      <Menu allowHover>
        <MenuHandler>
          <IconButton
            variant="outlined"
            className="rounded-xl border-2 border-white shadow-md"
            size="sm">
            {getIconElement(ExpandIcon)}
          </IconButton>
        </MenuHandler>
        <MenuList className="grid !min-w-0 grid-cols-3 grid-rows-3 place-content-center gap-2">
          {Object.keys(options).map((option) => (
            <div key={option} className="focus:outline-none">
              <Tooltip key={option} content={options[option].tooltip}>
                <IconButton
                  variant="text"
                  disabled={option === initialValue}
                  className="rounded-xl shadow-md"
                  size="sm"
                  onClick={() => onChange(option as ObjectPosition)}>
                  {getIconElement(options[option].icon)}
                </IconButton>
              </Tooltip>
            </div>
          ))}
        </MenuList>
      </Menu>
    </div>
  );
};
