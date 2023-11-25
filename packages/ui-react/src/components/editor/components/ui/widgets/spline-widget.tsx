import { Tab, Tabs, TabsHeader, Typography } from '@material-tailwind/react';
import { Icon, TLUiIconType } from '@tldraw/tldraw';
import { createElement } from 'react';
import { Spline, Widget } from './widget.types';

const options = {
  line: 'Línea',
  cubic: 'Cúbico',
} satisfies Record<Spline, string>;

const icons: Record<string, TLUiIconType> = {
  line: 'spline-line',
  cubic: 'spline-cubic',
} satisfies Record<Spline, TLUiIconType>;

export const SplineWidget: Widget<Spline> = ({ onChange, initialValue }) => {
  return (
    <>
      <Typography variant="small" className="mb-3 font-bold">
        Tipo de curva
      </Typography>
      <Tabs value={initialValue}>
        <TabsHeader>
          {Object.entries(options).map(([splineType, label]) => (
            <Tab
              onClick={() => onChange(splineType as Spline)}
              className="p-0.5"
              key={splineType}
              value={splineType}
              defaultChecked={splineType === initialValue}>
              <div className="flex items-center gap-2">
                {createElement(Icon, {
                  className: 'h-4 w-4',
                  icon: icons[splineType],
                })}
                {label}
              </div>
            </Tab>
          ))}
        </TabsHeader>
      </Tabs>
    </>
  );
};
