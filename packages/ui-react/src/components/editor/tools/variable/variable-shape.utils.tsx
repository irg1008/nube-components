import {
  BaseBoxShapeUtil,
  HTMLContainer,
  Rectangle2d,
  TLOnResizeHandler,
  getDefaultColorTheme,
  resizeBox,
} from '@tldraw/tldraw';
import { useState } from 'react';
import { variableShapeProps } from './variable-shape.props';
import { IVariableShape } from './variable-shape.types';

// A utility class for the card shape. This is where you define
// the shape's behavior, how it renders (its component and
// indicator), and how it handles different events.

export class VariableShapeUtil extends BaseBoxShapeUtil<IVariableShape> {
  static override type = 'variable' as const;
  // A validation schema for the shape's props (optional)
  static override props = variableShapeProps;

  // Flags
  override isAspectRatioLocked = (_shape: IVariableShape) => false;
  override canResize = (_shape: IVariableShape) => true;
  override canBind = (_shape: IVariableShape) => true;

  getDefaultProps(): IVariableShape['props'] {
    return {
      w: 300,
      h: 300,
      color: 'black',
      weight: 'regular',
      font: 'draw',
      custom: 'pepe',
    };
  }

  getGeometry(shape: IVariableShape) {
    return new Rectangle2d({
      width: shape.props.w,
      height: shape.props.h,
      isFilled: true,
    });
  }

  // Render method — the React component that will be rendered for the shape
  component(shape: IVariableShape) {
    const bounds = this.editor.getShapeGeometry(shape).bounds;
    const theme = getDefaultColorTheme({
      isDarkMode: this.editor.user.isDarkMode,
    });

    // Unfortunately eslint will think this is a class components
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [count, setCount] = useState(0);

    return (
      <HTMLContainer
        id={shape.id}
        className="tl-text-shape__wrapper"
        data-font={shape.props.font}
        style={{
          border: '1px solid black',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'all',
          backgroundColor: theme[shape.props.color].semi,
          fontWeight: shape.props.weight,
          color: theme[shape.props.color].solid,
        }}>
        <h2>Clicks: {count}</h2>
        <button
          onClick={() => setCount((count) => count + 1)}
          // You need to stop the pointer down event on buttons
          // that should prevent shape selection or click and drag
          onPointerDown={(e) => e.stopPropagation()}>
          {bounds.w.toFixed()}x{bounds.h.toFixed()}
        </button>
      </HTMLContainer>
    );
  }

  // Indicator — used when hovering over a shape or when it's selected; must return only SVG elements here
  indicator(shape: IVariableShape) {
    return <rect width={shape.props.w} height={shape.props.h} />;
  }

  // Events
  override onResize: TLOnResizeHandler<IVariableShape> = (shape, info) => {
    return resizeBox(shape, info);
  };
}
