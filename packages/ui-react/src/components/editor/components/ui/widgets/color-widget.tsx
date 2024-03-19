import { Color, Widget, colors } from '@/editor/utils/widget.utils';
import {
  Menu,
  MenuHandler,
  MenuList,
  Typography,
} from '@material-tailwind/react';
import { DefaultColorThemePalette } from '@tldraw/tldraw';
import { ColorButton } from '../color-button';

type ColorWidgetProps = {
  label: string;
};

export const ColorWidget: Widget<Color, ColorWidgetProps> = ({
  initialValue,
  onChange,
  label,
}) => {
  const getCss = (color: Color) =>
    DefaultColorThemePalette.lightMode[color].solid;

  return (
    <div className="flex flex-row-reverse items-center justify-end gap-3">
      <Typography variant="small" className="font-bold">
        {label}
      </Typography>
      <Menu allowHover>
        <MenuHandler>
          <span>
            <ColorButton hex={getCss(initialValue)} />
          </span>
        </MenuHandler>
        <MenuList className="grid min-w-0 grid-cols-4 place-content-center gap-2">
          {colors.map((color) => (
            <div key={color} className="focus:outline-none">
              <ColorButton
                onClick={() => {
                  onChange(color);
                }}
                hex={getCss(color)}
              />
            </div>
          ))}
        </MenuList>
      </Menu>
    </div>
  );
};

export const LabelColorWidget: Widget<Color> = (props) => (
  <ColorWidget {...props} label="Color del texto" />
);

export const BaseColorWidget: Widget<Color> = (props) => (
  <ColorWidget {...props} label="Color" />
);
