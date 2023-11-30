import { BRShape } from '@/editor/shapes/basic-rectangle/basic-rectangle.types';
import { CanvasSize } from '@/editor/stores/canvas.store';
import { BackgroundColor } from '@/editor/styles/background-color';
import {
  filterShapeInChanges,
  shapeLookup,
  updateShapesProp,
} from '@/editor/utils/editor.utils';
import {
  TLFrameShape,
  TLLineShape,
  TLRecord,
  TLShape,
  TLShapePartial,
  TLTextShape,
  createShapeId,
} from '@tldraw/tldraw';
import { useMemo, useState } from 'react';
import { useUpdateEffect } from 'usehooks-ts';
import { useEditor } from './useEditor';

export type Frame = TLShapePartial<TLFrameShape>;

type FrameOperationsOptions = {
  frame: Frame;
  restoreOp?: () => void;
};

export const useFrameOperations = ({
  frame,
  restoreOp,
}: FrameOperationsOptions) => {
  const { editor } = useEditor();

  const isFrameChild = (shape: TLShape) => {
    return shape.parentId === frame.id;
  };

  const preventFrameAlterations = () => {
    editor.cancel();
    editor.deselect(frame.id);
  };

  const exitEditingState = () => {
    if (!editor.editingShape) return;
    editor.cancel();
  };

  const defaultRestoreOp = () => {
    editor.createShape(frame);
  };

  const preventFrameDeletion = () => {
    restoreOp?.() ?? defaultRestoreOp();
  };

  function frameShapesOps(shapes: TLShape[]) {
    const [frameShapes, nonFrameShapes] = shapeLookup(shapes, ['frame']);

    let tempShapes = nonFrameShapes;

    return {
      exitEditingState() {
        exitEditingState();
        return this;
      },
      ofType<T extends TLShape>(type: T['type']) {
        tempShapes = tempShapes.filter((s) => s.type === type);
        return this;
      },
      notOfType<T extends TLShape>(type: T['type']) {
        tempShapes = tempShapes.filter((s) => s.type !== type);
        return this;
      },
      notEmpty() {
        return tempShapes.length > 0 ? this : undefined;
      },
      reset() {
        tempShapes = nonFrameShapes;
        return this;
      },
      resetInside() {
        return this.reset().insideFrame();
      },
      resetOutside() {
        return this.reset().outsideFrame();
      },
      isToolState(state: string) {
        return editor.isIn(state) ? this : undefined;
      },
      withEmptyProp(prop: string) {
        const shapeProp = prop as keyof TLShape['props'];
        tempShapes = tempShapes.filter((s) => !s.props[shapeProp]);
        return this;
      },
      filter(cb: (shape: TLShape) => boolean) {
        tempShapes = tempShapes.filter(cb);
        return this;
      },
      updateProp<V>(prop: string, value: V) {
        const partialShapes = updateShapesProp(tempShapes, { prop, value });
        return {
          run: () => {
            editor.updateShapes(partialShapes);
            return this;
          },
        };
      },
      cancel() {
        editor.cancel();
        return this;
      },
      cancelIfEmpty() {
        if (tempShapes.length === 0) editor.cancel();
        return this;
      },
      cancelIfNotEmpty() {
        if (tempShapes.length > 0) editor.cancel();
        return this;
      },
      insideFrame() {
        tempShapes = tempShapes.filter((s) => isFrameChild(s));
        return this;
      },
      outsideFrame() {
        tempShapes = tempShapes.filter((s) => !isFrameChild(s));
        return this;
      },
      delete() {
        editor.deleteShapes(tempShapes);
        return this;
      },
      do<T extends TLShape>(cb: (shapes: T[]) => void) {
        cb(tempShapes as T[]);
        return this;
      },
      isFrameAffected() {
        const isFrameAffected = frameShapes.some((s) => s.id === frame.id);
        if (!isFrameAffected) return;

        return {
          preventFrameDeletion() {
            preventFrameDeletion();
            return this;
          },
          preventFrameAlterations() {
            preventFrameAlterations();
            return this;
          },
        };
      },
    };
  }

  function filterShapes(records: TLRecord[]) {
    const shapes = filterShapeInChanges(records);
    return frameShapesOps(shapes);
  }

  return {
    filterShapes,
    frameShapesOps,
    isFrameChild,
    exitEditingState,
  };
};

export type InitianFrameOptions = {
  initialSize: CanvasSize;
  initialBackground: BackgroundColor;
};

export type FrameOptions = {
  id?: string;
  name?: string;
  onChange?: (frame: Frame) => void;
  epheremeralChanges?: boolean;
} & InitianFrameOptions;

export type FrameHook = ReturnType<typeof useFrame>;

export const useFrame = ({
  id = 'main-frame',
  name = 'Frame',
  epheremeralChanges = true,
  initialSize,
  initialBackground,
  onChange,
}: FrameOptions) => {
  const frameId = createShapeId(id);
  const bgId = createShapeId(`${id}-background`);

  const [frameSize, resizeFrame] = useState<CanvasSize>(initialSize);
  const [backgroundColor, changeBackgroundColor] =
    useState<BackgroundColor>(initialBackground);

  const frame: Frame = useMemo(
    () => ({
      id: frameId,
      type: 'frame',
      props: {
        name,
        w: frameSize.w,
        h: frameSize.h,
      },
    }),
    [frameSize, name, frameId],
  );

  const backgroundShape: TLShapePartial<BRShape> = useMemo(
    () => ({
      id: bgId,
      type: 'basic-rectangle',
      parentId: frameId,
      isLocked: true,
      props: {
        w: frameSize.w,
        h: frameSize.h,
        backgroundColor,
      },
    }),
    [bgId, frameId, backgroundColor, frameSize],
  );

  const updateShape = (shape: TLShapePartial<BRShape> | Frame) => {
    editor.updateShape(shape, { ephemeral: epheremeralChanges });
  };

  const getFrameSize = (): CanvasSize | undefined => {
    const shapeBounds = editor.getShapePageBounds(frameId);
    if (!shapeBounds) return;
    return { w: shapeBounds.width, h: shapeBounds.height };
  };

  const getFrameColor = (): BackgroundColor | undefined => {
    const shape = editor.getShape<BRShape>(bgId);
    if (!shape) return;
    return shape.props.backgroundColor;
  };

  const createFrame = () => {
    editor.createShape(frame);
    editor.createShape(backgroundShape);
    onChange?.(frame);
  };

  const initFrame = () => {
    const currentSize = getFrameSize();
    const bgColor = getFrameColor();

    if (!currentSize || !bgColor) {
      createFrame();
      return;
    }

    // Restore
    resizeFrame(currentSize);
    changeBackgroundColor(bgColor);
  };

  const { filterShapes, isFrameChild } = useFrameOperations({
    frame,
    restoreOp: createFrame,
  });

  const { editor } = useEditor({
    onChange: ({ added, removed, updated }) => {
      filterShapes(added)
        .insideFrame()
        .ofType<TLTextShape>('text')
        .withEmptyProp('text')
        .updateProp('text', 'Texto')
        .run();

      filterShapes(updated).isFrameAffected()?.preventFrameAlterations();
      filterShapes(removed).isFrameAffected()?.preventFrameDeletion();

      filterShapes([...added, ...updated])
        .outsideFrame()
        .ofType<TLLineShape>('line')
        .cancelIfNotEmpty()
        .resetOutside()
        .notOfType<TLLineShape>('line')
        .delete();
    },
  });

  useUpdateEffect(() => {
    // Prevent all shapes from being moved behind background layer
    editor.sendToBack([backgroundShape.id]);
  }, [editor.currentPageShapesSorted]);

  useUpdateEffect(() => {
    updateShape(frame);
    onChange?.(frame);
  }, [frame]);

  useUpdateEffect(() => {
    updateShape(backgroundShape);
  }, [backgroundShape]);

  const selectedChildren = useMemo(() => {
    return editor.selectedShapes.filter(isFrameChild);
  }, [editor.selectedShapes, isFrameChild]);

  return {
    frameSize,
    resizeFrame,
    getFrameSize,
    initFrame,
    frame,
    selectedChildren,
    backgroundColor,
    changeBackgroundColor,
  };
};
