import { Viewport, ViewportCategory } from '@/editor/utils/viewport.utils';
import {
  Button,
  Chip,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from '@material-tailwind/react';
import { ChevronUpIcon, Ratio } from 'lucide-react';
import { forwardRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

type ViewportsMenuProps = {
  onChange: (size: Viewport) => void;
} & ViewportCategory;

export const ViewportsMenu = forwardRef<HTMLButtonElement, ViewportsMenuProps>(
  ({ name, viewports, onChange, icon: Icon }, ref) => {
    const [openMenu, setOpenMenu] = useState(false);

    return (
      <Menu
        open={openMenu}
        handler={setOpenMenu}
        ref={ref}
        allowHover
        placement="left-start"
        offset={15}>
        <MenuHandler className="flex items-center justify-start gap-3">
          <MenuItem>
            <ChevronUpIcon
              strokeWidth={2.5}
              className={twMerge(
                'h-3.5 w-3.5 opacity-50 transition-transform',
                openMenu ? '-rotate-90' : '',
              )}
            />

            <span className="flex items-center gap-2">
              <Icon className="h-4 w-4" />
              {name}
            </span>
          </MenuItem>
        </MenuHandler>

        <MenuList>
          {Object.entries(viewports).map(([detail, size]) => (
            <MenuItem
              key={detail}
              className="flex items-center justify-between gap-10"
              onClick={() => {
                setOpenMenu(false);
                onChange({
                  name,
                  detail,
                  canvasSize: size,
                });
              }}>
              {detail}
              <Chip size="sm" value={`${size.w}x${size.h}`} />
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    );
  },
);

type ViewportCategoryMenuProps = {
  categories: ViewportCategory[];
} & Pick<ViewportsMenuProps, 'onChange'>;

export const ViewportsCategoriesMenu = ({
  categories,
  onChange,
}: ViewportCategoryMenuProps) => {
  return (
    <Menu allowHover>
      <MenuHandler>
        <Button
          fullWidth
          variant="gradient"
          className="flex items-center justify-center gap-3">
          <Ratio size={16} />
          Selecciona preset
        </Button>
      </MenuHandler>
      <MenuList>
        {categories.map((c) => (
          <ViewportsMenu key={c.name} onChange={onChange} {...c} />
        ))}
      </MenuList>
    </Menu>
  );
};
