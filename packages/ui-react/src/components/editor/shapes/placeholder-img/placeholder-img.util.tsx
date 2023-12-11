import { getCSSObjectPosition } from '@/editor/styles/object-position';
import { Chip } from '@material-tailwind/react';
import {
  Geometry2d,
  HTMLContainer,
  Rectangle2d,
  ShapeUtil,
  TLOnResizeHandler,
  resizeBox,
  toDomPrecision,
} from '@tldraw/tldraw';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { placeholderImage } from './placeholder-img.consts';
import { basicRectangleProps, defaultProps } from './placeholder-img.props';
import { PIShape } from './placeholder-img.types';

const getDataURIFromURL = async (url: string): Promise<string> => {
  const response = await fetch(url);
  const blob = await response.blob();

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

export class PlaceholderImgUtil extends ShapeUtil<PIShape> {
  static override type = placeholderImage;
  static override props = basicRectangleProps;

  override isAspectRatioLocked = () => false;
  override canResize = () => true;
  override canUnmount = () => false;

  getDefaultProps(): PIShape['props'] {
    return defaultProps;
  }

  getGeometry({ props }: PIShape): Geometry2d {
    return new Rectangle2d({
      width: props.w,
      height: props.h,
      isFilled: true,
    });
  }

  override onResize: TLOnResizeHandler<PIShape> = (shape, info) => {
    return resizeBox(shape, info);
  };

  override toSvg = async (shape: PIShape) => {
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    let src = shape.props.customUrl;

    if (src.startsWith('http')) {
      // If it's a remote image, we need to fetch it and convert it to a data URI
      src = await getDataURIFromURL(src);
    }

    const image = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'image',
    );
    image.setAttributeNS('http://www.w3.org/1999/xlink', 'href', src);
    image.setAttribute('width', shape.props.w.toString());
    image.setAttribute('height', shape.props.h.toString());
    g.appendChild(image);

    return g;
  };

  indicator(shape: PIShape) {
    const { w, h } = shape.props;
    return <rect width={toDomPrecision(w)} height={toDomPrecision(h)} />;
  }

  component(shape: PIShape) {
    const bounds = this.editor.getShapeGeometry(shape).bounds;

    const { customUrl, objectFit, objectPosition } = shape.props;
    const trimmedUrl = customUrl.trim();

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [validUrl, setValidUrl] = useState<boolean>(true);

    const isHovered = this.editor.hoveredShapeId === shape.id;
    const isSelected = this.editor.selectedShapeIds.includes(shape.id);
    const emptyUrl = !trimmedUrl;
    const showDimensions = isHovered || isSelected || emptyUrl || !validUrl;

    return (
      <HTMLContainer id={shape.id} className="relative">
        {trimmedUrl && (
          <img
            className={twMerge('h-full w-full object-contain')}
            src={trimmedUrl}
            onLoad={() => setValidUrl(true)}
            onError={() => setValidUrl(false)}
            alt={shape.id}
            style={{
              objectFit,
              objectPosition: getCSSObjectPosition(objectPosition),
            }}
          />
        )}
        <div
          className={twMerge(
            'absolute left-0 top-0 grid h-full w-full place-content-center font-sans text-xl font-bold',
            !trimmedUrl && 'bg-gray-200',
            !validUrl && 'bg-red-200',
          )}>
          <Chip
            data-exportable="false"
            className={twMerge(
              'bg-gray-800 px-4 py-3 text-white opacity-0 transition-opacity duration-200',
              showDimensions && 'opacity-100',
            )}
            size="lg"
            value={`${bounds.w.toFixed()}x${bounds.h.toFixed()}`}
          />
          {!validUrl && (
            <Chip
              size="md"
              color="red"
              value="Url mal formateada"
              className="absolute bottom-4 left-1/2 -translate-x-1/2"
            />
          )}
        </div>
      </HTMLContainer>
    );
  }
}
