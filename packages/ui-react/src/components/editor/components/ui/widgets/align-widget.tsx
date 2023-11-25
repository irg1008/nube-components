import { Tab, Tabs, TabsHeader, Tooltip } from '@material-tailwind/react';
import {
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  AlignVerticalJustifyCenterIcon,
  AlignVerticalJustifyEndIcon,
  AlignVerticalJustifyStartIcon,
  LucideIcon,
} from 'lucide-react';
import { createElement } from 'react';
import { Align, Widget } from './widget.types';

type WidgetIcon = LucideIcon;

type AlignWidgetProps = {
  options: Record<string, string>;
  icons: Record<string, WidgetIcon>;
};

export const AlignWidget: Widget<Align, AlignWidgetProps> = ({
  onChange,
  initialValue,
  options,
  icons,
}) => {
  return (
    <>
      <Tabs value={initialValue}>
        <TabsHeader className="w-min">
          {Object.entries(options).map(([splineType, label]) => (
            <Tab
              onClick={() => onChange(splineType as Align)}
              className="flex w-min items-center justify-center p-0.5 [&>div]:px-3"
              key={splineType}
              value={splineType}
              defaultChecked={splineType === initialValue}>
              <Tooltip content={label}>
                <span className="flex items-center justify-center">
                  {createElement(icons[splineType], {
                    className: 'h-4 w-4',
                  })}
                </span>
              </Tooltip>
            </Tab>
          ))}
        </TabsHeader>
      </Tabs>
    </>
  );
};

const horizontalOptions = {
  start: 'Alinear a la izquierda',
  middle: 'Centrar',
  end: 'Alinear a la derecha',
} satisfies Record<Align, string>;

const horizontalIcons = {
  start: AlignLeftIcon,
  middle: AlignCenterIcon,
  end: AlignRightIcon,
} satisfies Record<Align, LucideIcon>;

export const HorizontalAlignWidget: Widget<Align> = (props) => (
  <AlignWidget {...props} options={horizontalOptions} icons={horizontalIcons} />
);

const verticalOptions = {
  start: 'Alinear arriba',
  middle: 'Centrar',
  end: 'Alinear abajo',
} satisfies Record<Align, string>;

const verticalIcons = {
  start: AlignVerticalJustifyStartIcon,
  middle: AlignVerticalJustifyCenterIcon,
  end: AlignVerticalJustifyEndIcon,
} satisfies Record<Align, LucideIcon>;

export const VerticalAlignWidget: Widget<Align> = (props) => (
  <AlignWidget {...props} options={verticalOptions} icons={verticalIcons} />
);
