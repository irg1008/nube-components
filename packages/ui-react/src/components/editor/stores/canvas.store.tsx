import { Variable } from '@/editor/components/ui/variable-input';
import { useEditor } from '@/editor/hooks/useEditor';
import { EditorAPI } from '@/editor/hooks/useEditorAPI';
import {
  Frame,
  FrameHook,
  InitialFrameOptions,
  useFrame,
} from '@/editor/hooks/useFrame';
import {
  Editor,
  StoreSnapshot,
  TLRecord,
  TLShape,
  track,
} from '@tldraw/tldraw';
import {
  PropsWithChildren,
  RefObject,
  createContext,
  useContext,
  useRef,
} from 'react';

export type CanvasSize = {
  w: number;
  h: number;
};

export type Animation = Parameters<Editor['zoomToBounds']>[2];

type SidebarRef = RefObject<HTMLElement>;

type RefitCanvasOptions = {
  moveCamera?: boolean;
};

export type VariableConfig = {
  textLabel?: string;
  imageLabel?: string;
  textVariables: Variable[];
  imageVariables: Variable[];
  variableValueResolver: (key: Variable['key']) => string;
};

export type EditorConfig = {
  variablesConfig?: VariableConfig;
  initialSnapshot?: StoreSnapshot<TLRecord>;
  onMount?: (api: EditorAPI) => void;
  hideExportUI?: boolean;
  disableLocalPersistance?: boolean;
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
  config: EditorConfig;
};

export const StoreContext = createContext<CanvasContext>(null!);

export type CanvasProviderProps = {
  sidebarRef?: SidebarRef;
  config?: EditorConfig;
} & Partial<InitialFrameOptions>;

export const CanvasProvider = track(
  ({
    children,
    initialSize = { w: 1000, h: 1000 },
    initialBackground = '#ffffff',
    config = {},
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
          config,
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

export const useCanvas = () => useContext(StoreContext);
export const useConfig = () => useCanvas().config;
