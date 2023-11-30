import {
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  Typography,
} from '@material-tailwind/react';
import { DefaultColorThemePalette } from '@tldraw/tldraw';
import { Color, Widget, colors } from './widget.types';

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
          <IconButton
            className="bg-unset rounded-xl border-2 border-white shadow-md"
            size="sm"
            style={{
              backgroundColor: getCss(initialValue),
            }}>
            <></>
          </IconButton>
        </MenuHandler>
        <MenuList className="grid min-w-0 grid-cols-4 place-content-center gap-2">
          {colors.map((color) => (
            <div key={color} className="focus:outline-none">
              <IconButton
                className="bg-unset rounded-xl border-2 border-white shadow-md"
                size="sm"
                onClick={() => onChange(color)}
                style={{
                  backgroundColor: getCss(color),
                }}>
                <></>
              </IconButton>
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
