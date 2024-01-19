import { Geometry } from '@/editor/hooks/useEditor';
import { getIconElement } from '@/editor/utils/icons.utils';
import { Button, Menu, MenuHandler, MenuList } from '@material-tailwind/react';
import { TLUiIconType } from '@tldraw/tldraw';
import {
  ArrowBigDownIcon,
  ArrowBigLeftIcon,
  ArrowBigRightIcon,
  ArrowBigUpIcon,
  CheckSquareIcon,
  CircleIcon,
  CloudIcon,
  DiamondIcon,
  HexagonIcon,
  LucideIcon,
  OctagonIcon,
  PentagonIcon,
  RectangleVerticalIcon,
  StarIcon,
  TriangleIcon,
  XSquareIcon,
} from 'lucide-react';
import { PropsWithChildren, ReactNode } from 'react';
import { CustomButton, CustomButtonProps } from '../custom-btn';

type FreeForm = {
  geo: Geometry;
  tooltip: string;
  icon: LucideIcon | TLUiIconType;
};

const freeForms: FreeForm[] = [
  {
    geo: 'cloud',
    icon: CloudIcon,
    tooltip: 'Nube',
  },
  {
    geo: 'rectangle',
    icon: RectangleVerticalIcon,
    tooltip: 'Rectangulo',
  },
  {
    geo: 'ellipse',
    icon: CircleIcon,
    tooltip: 'Elipse',
  },
  {
    geo: 'triangle',
    icon: TriangleIcon,
    tooltip: 'Triángulo',
  },
  {
    geo: 'diamond',
    icon: DiamondIcon,
    tooltip: 'Diamante',
  },
  {
    geo: 'pentagon',
    icon: PentagonIcon,
    tooltip: 'Pentágono',
  },
  {
    geo: 'hexagon',
    icon: HexagonIcon,
    tooltip: 'Hexágono',
  },
  {
    geo: 'octagon',
    icon: OctagonIcon,
    tooltip: 'Octágono',
  },
  {
    geo: 'star',
    icon: StarIcon,
    tooltip: 'Estrella',
  },
  {
    geo: 'rhombus',
    icon: 'geo-rhombus',
    tooltip: 'Romboide',
  },
  {
    geo: 'oval',
    icon: 'geo-oval',
    tooltip: 'Óvalo',
  },
  {
    geo: 'trapezoid',
    icon: 'geo-trapezoid',
    tooltip: 'Trapecio',
  },
  {
    geo: 'arrow-right',
    icon: ArrowBigRightIcon,
    tooltip: 'Flecha derecha',
  },
  {
    geo: 'arrow-left',
    icon: ArrowBigLeftIcon,
    tooltip: 'Flecha izquierda',
  },
  {
    geo: 'arrow-up',
    icon: ArrowBigUpIcon,
    tooltip: 'Flecha arriba',
  },
  {
    geo: 'arrow-down',
    icon: ArrowBigDownIcon,
    tooltip: 'Flecha abajo',
  },
  {
    geo: 'x-box',
    icon: XSquareIcon,
    tooltip: 'Caja X',
  },
  {
    geo: 'check-box',
    icon: CheckSquareIcon,
    tooltip: 'Caja check',
  },
];

type FreeFormMenuProps = {
  onFormPick: (geo: Geometry) => void;
  skipGeo?: Geometry[];
  initialGeo?: Geometry;
  label?: ReactNode;
} & Omit<CustomButtonProps, 'children'>;

export const FreeFormMenu = ({
  onFormPick,
  skipGeo,
  initialGeo,
  children,
  label,
  ...props
}: PropsWithChildren<FreeFormMenuProps>) => {
  const initialGeoIcon = freeForms.find((f) => f.geo === initialGeo)?.icon;
  const filteredFreeForms = freeForms.filter((f) => !skipGeo?.includes(f.geo));

  return (
    <Menu allowHover>
      <MenuHandler>
        <Button {...props}>
          <div className="flex gap-2">
            {initialGeoIcon ? getIconElement(initialGeoIcon) : children}
            {label}
          </div>
        </Button>
      </MenuHandler>
      <MenuList>
        <div className="grid grid-cols-3 focus:outline-none">
          {filteredFreeForms.map(({ tooltip, geo, icon }) => (
            <div key={geo} className="focus:outline-none">
              <CustomButton
                tooltip={tooltip}
                variant="text"
                size="sm"
                onClick={() => onFormPick(geo)}>
                {getIconElement(icon)}
              </CustomButton>
            </div>
          ))}
        </div>
      </MenuList>
    </Menu>
  );
};
