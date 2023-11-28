import { useEditor } from '@/editor/hooks/useEditor';
import {
  Frame,
  FrameHook,
  InitianFrameOptions,
  useFrame,
} from '@/editor/hooks/useFrame';
import { Editor, TLShape, track } from '@tldraw/tldraw';
import { PropsWithChildren, RefObject, createContext, useRef } from 'react';

export type CanvasSize = {
  w: number;
  h: number;
};

export type Animation = Parameters<Editor['zoomToBounds']>[2];

type SidebarRef = RefObject<HTMLElement>;

type RefitCanvasOptions = {
  moveCamera?: boolean;
};

type CanvasContext = {
  canvasSize: CanvasSize;
  canvas: Frame;
  zoomToFrame: (animation: Animation) => void;
  refitCanvas: (options?: RefitCanvasOptions) => void;
  changeSelectedOpacity: (opacity: number) => void;
  resizeCanvas: FrameHook['resizeFrame'];
  resetCanvas: FrameHook['initFrame'];
  changeCanvasColor: FrameHook['changeBackgroundColor'];
  canvasColor: FrameHook['backgroundColor'];
  sidebarRef: SidebarRef;
  selectedShapes: TLShape[];
};

export const StoreContext = createContext<CanvasContext>(null!);

export type CanvasProviderProps = {
  sidebarRef?: SidebarRef;
} & Partial<InitianFrameOptions>;

export const CanvasProvider = track(
  ({
    children,
    initialSize = { w: 1000, h: 1000 },
    initialBackground = '#ffffff',
  }: PropsWithChildren<CanvasProviderProps>) => {
    const sidebarRef: SidebarRef = useRef(null);

    const getCanvasShift = () => {
      const refWidth = sidebarRef?.current?.clientWidth || 0;
      return refWidth / 2;
    };

    const initCanvas = () => {
      editor.batch(() => {
        initFrame();
        editor.history.clear();
      });
    };

    const zoomToFrame = (animation: Animation) => {
      const frameBounds = editor.getShapeMaskedPageBounds(frame.id);
      if (!frameBounds) return;
      editor.zoomToBounds(frameBounds, 0.75, animation);
    };

    const refitCanvas = ({ moveCamera = true }: RefitCanvasOptions = {}) => {
      const canvasShift = getCanvasShift();
      if (canvasShift === 0 || !moveCamera) return;
      zoomToFrame({ duration: 0 });
      editor.pan({ x: -canvasShift, y: 0 }, { duration: 0 });
    };

    const onFrameChange = () => {
      refitCanvas();
    };

    const changeSelectedOpacity = (opacity: number) => {
      const newShapes = selectedChildren.map((shape) => ({
        ...shape,
        opacity,
      }));
      editor.updateShapes(newShapes);
    };

    const { editor } = useEditor({
      onMount: initCanvas,
    });

    const {
      frameSize,
      frame,
      selectedChildren,
      backgroundColor,
      initFrame,
      resizeFrame,
      changeBackgroundColor,
    } = useFrame({
      onChange: onFrameChange,
      initialSize,
      initialBackground,
    });

    return (
      <StoreContext.Provider
        value={{
          sidebarRef,
          canvasSize: frameSize,
          canvas: frame,
          canvasColor: backgroundColor,
          selectedShapes: selectedChildren,
          refitCanvas,
          resetCanvas: initFrame,
          resizeCanvas: resizeFrame,
          zoomToFrame,
          changeCanvasColor: changeBackgroundColor,
          changeSelectedOpacity,
        }}>
        {children}
      </StoreContext.Provider>
    );
  },
);
