import {
  Geometry2d,
  HTMLContainer,
  Rectangle2d,
  ShapeUtil,
  TLOnClickHandler,
  TLOnDoubleClickHandler,
  TLOnResizeHandler,
  TLOnTranslateHandler,
  TLOnTranslateStartHandler,
} from '@tldraw/tldraw';
import { shapeName } from './basic-rectangle.consts';
import { basicRectangleProps, defaultProps } from './basic-rectangle.props';
import { BRShape } from './basic-rectangle.types';

export class BasicRectangleUtil extends ShapeUtil<BRShape> {
  static override type = shapeName;
  static override props = basicRectangleProps;

  override canResize = () => false;
  override canBind = () => false;
  override canEdit = () => false;
  override canSnap = () => false;
  override canUnmount = () => false;
  override canScroll = () => false;
  override hideResizeHandles = () => true;
  override hideRotateHandle = () => true;
  override hideSelectionBoundsBg = () => true;
  override hideSelectionBoundsFg = () => true;

  getDefaultProps(): BRShape['props'] {
    return defaultProps;
  }

  getGeometry({ props }: BRShape): Geometry2d {
    return new Rectangle2d({
      width: props.w,
      height: props.h,
      isFilled: true,
    });
  }

  override async toSvg(shape: BRShape) {
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

    rect.setAttribute('width', `${shape.props.w}`);
    rect.setAttribute('height', `${shape.props.h}`);
    rect.setAttribute('fill', `${shape.props.backgroundColor}`);

    g.appendChild(rect);

    return g;
  }

  override onResize: TLOnResizeHandler<BRShape> = () => {};

  override onClick?: TLOnClickHandler<BRShape> = () => {};

  override onDoubleClick?: TLOnDoubleClickHandler<BRShape> = () => {};

  override onTranslateStart?: TLOnTranslateStartHandler<BRShape> = () => {};

  override onTranslate?: TLOnTranslateHandler<BRShape> = () => {};

  indicator() {
    return <></>;
  }

  component(shape: BRShape) {
    const { backgroundColor } = shape.props;

    return (
      <HTMLContainer
        id={shape.id}
        style={{ backgroundColor }}
        className="pointer-events-none"></HTMLContainer>
    );
  }
}
