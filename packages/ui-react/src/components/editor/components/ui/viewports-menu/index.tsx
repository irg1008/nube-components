import { SocialViewports, Viewport } from '@/editor/utils/viewport.utils';
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
} & SocialViewports;

export const ViewportsMenu = forwardRef<HTMLButtonElement, ViewportsMenuProps>(
  ({ name, viewports, onChange, icon: Icon }, ref) => {
    const [openMenu, setOpenMenu] = useState(false);

    return (
      <Menu
        ref={ref}
        placement="right-start"
        open={openMenu}
        handler={setOpenMenu}
        allowHover
        offset={15}>
        <MenuHandler className="tw-flex tw-items-center tw-justify-start tw-gap-3">
          <MenuItem>
            <ChevronUpIcon
              strokeWidth={2.5}
              className={twMerge(
                'tw-h-3.5 tw-w-3.5 tw-opacity-50 tw-transition-transform',
                openMenu ? 'tw--rotate-90' : '',
              )}
            />

            <span className="tw-flex tw-items-center tw-gap-2">
              <Icon className="tw-h-4 tw-w-4" />
              {name}
            </span>
          </MenuItem>
        </MenuHandler>

        <MenuList>
          {Object.entries(viewports).map(([detail, size]) => (
            <MenuItem
              key={detail}
              className="tw-flex tw-items-center tw-justify-between tw-gap-10"
              onClick={() => {
                setOpenMenu(false);
                onChange({
                  social: name,
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

type SocialViewportsMenuProps = {
  socialViewports: SocialViewports[];
} & Pick<ViewportsMenuProps, 'onChange'>;

export const SocialViewportsMenu = ({
  socialViewports,
  onChange,
}: SocialViewportsMenuProps) => {
  return (
    <Menu allowHover>
      <MenuHandler>
        <Button
          fullWidth
          variant="gradient"
          className="tw-flex tw-items-center tw-justify-center tw-gap-3">
          <Ratio size={16} />
          Selecciona preset
        </Button>
      </MenuHandler>
      <MenuList>
        {socialViewports.map((social) => (
          <ViewportsMenu key={social.name} onChange={onChange} {...social} />
        ))}
      </MenuList>
    </Menu>
  );
};
