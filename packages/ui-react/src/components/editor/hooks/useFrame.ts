import { BRShape } from '@/editor/shapes/basic-rectangle/basic-rectangle.types';
import { CanvasSize } from '@/editor/stores/canvas.store';
import { BackgroundColor } from '@/editor/styles/background-color';
import {
  filterShapeInChanges,
  shapeLookup,
  updateShapeProp,
  updateShapesProp,
} from '@/editor/utils/editor.utils';
import {
  TLArrowShape,
  TLFrameShape,
  TLImageShape,
  TLRecord,
  TLShape,
  TLShapePartial,
  TLTextShape,
  createShapeId,
} from '@tldraw/tldraw';
import { useMemo, useState } from 'react';
import { useUpdateEffect } from 'usehooks-ts';
import { toolLabels } from '../utils/i18n.utils';
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
    if (!editor.getEditingShape()) return;
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
      ofType<T extends TLShape>(...types: T['type'][]) {
        tempShapes = tempShapes.filter((s) => types.includes(s.type));
        return this;
      },
      notOfType<T extends TLShape>(...types: T['type'][]) {
        tempShapes = tempShapes.filter((s) => !types.includes(s.type));
        return this;
      },
      notEmpty() {
        return tempShapes.length > 0 ? this : undefined;
      },
      reset() {
        tempShapes = nonFrameShapes;
        return this;
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
        tempShapes = updateShapesProp(tempShapes, {
          prop: prop.toString(),
          value,
        });
        return this;
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
      centerToFrame() {
        tempShapes = tempShapes.map((shape) => ({
          ...shape,
          parentId: frame.id,
        }));
        return this;
      },
      sync() {
        if (tempShapes.length > 0) {
          editor.updateShapes(tempShapes);
        }
        return this;
      },
      syncAndReset() {
        return this.sync().reset();
      },
      do(cb: (shapes: TLShape[]) => TLShape[]) {
        tempShapes = cb(tempShapes);
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

export type InitialFrameOptions = {
  initialSize: CanvasSize;
  initialBackground: BackgroundColor;
};

export type FrameOptions = {
  id?: string;
  name?: string;
  onChange?: (frame: Frame) => void;
} & InitialFrameOptions;

export type FrameHook = ReturnType<typeof useFrame>;

export const useFrame = ({
  id = 'main-frame',
  name = 'Frame',
  initialSize,
  initialBackground,
  onChange,
}: FrameOptions) => {
  const frameId = createShapeId(id);
  const bgId = createShapeId(`${id}-background`);

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

  const invisibleUpdateShape = (shape: TLShapePartial<BRShape> | Frame) => {
    editor.updateShape(shape, { ephemeral: true });
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

  const getPageInstanceCountByType = () => {
    const { meta } = editor.getCurrentPageState();
    const instanceCountByType = meta['instanceCountByType']!;
    return instanceCountByType as Record<string, number>;
  };

  const increasePageInstanceCountByType = (type: TLShape['type']) => {
    const instanceCountByType = getPageInstanceCountByType() ?? {};
    const typeCount = instanceCountByType[type] ?? 0;
    const newTypeCount = typeCount + 1;

    editor.updateCurrentPageState({
      meta: {
        instanceCountByType: {
          [type]: newTypeCount,
        },
      },
    });

    return newTypeCount;
  };

  const addMetaName = (shapes: TLShape[]) => {
    return shapes.map((shape) => {
      const typeLabel = toolLabels[shape.type];
      if (!typeLabel) return shape;

      const instanceCount = increasePageInstanceCountByType(shape.type);
      return updateShapeProp(shape, {
        meta: {
          name: `${typeLabel} ${instanceCount}`,
        },
      });
    });
  };

  const onEditorMount = () => {
    editor.batch(() => {
      editor
        .updateInstanceState({
          canMoveCamera: true,
          isGridMode: true,
          exportBackground: false,
        })
        .updateViewportScreenBounds();

      initFrame();

      editor.history.clear();
    });
  };

  const { editor } = useEditor({
    onChange: ({ added, removed, updated }) => {
      filterShapes(added)
        .do(addMetaName)
        .sync()
        .ofType<TLTextShape>('text')
        .withEmptyProp('text')
        .updateProp('text', 'Texto')
        .syncAndReset()
        .outsideFrame()
        .ofType<TLImageShape | TLArrowShape>('image', 'arrow')
        .centerToFrame()
        .syncAndReset();

      filterShapes(updated).isFrameAffected()?.preventFrameAlterations();
      filterShapes(removed).isFrameAffected()?.preventFrameDeletion();

      filterShapes([...added, ...updated])
        .outsideFrame()
        .centerToFrame()
        .sync();
    },
    onMount: onEditorMount,
  });

  const selectedShapes = editor.getSelectedShapes();
  const sortedShapes = editor.getCurrentPageShapesSorted();

  const selectedChildren: TLShape[] = useMemo(
    () => selectedShapes.filter(isFrameChild),
    [selectedShapes, isFrameChild],
  );

  const sortedChildren = useMemo(
    () => sortedShapes.filter(isFrameChild).filter((s) => s.id !== bgId),
    [sortedShapes, isFrameChild, bgId],
  );

  useUpdateEffect(() => {
    // Prevents all shapes from being moved behind background layer
    editor.sendToBack([backgroundShape.id]);
  }, [sortedChildren]);

  useUpdateEffect(() => {
    invisibleUpdateShape(frame);
    onChange?.(frame);
  }, [frame]);

  useUpdateEffect(() => {
    invisibleUpdateShape(backgroundShape);
  }, [backgroundShape]);

  return {
    frameSize,
    resizeFrame,
    getFrameSize,
    initFrame,
    frame,
    selectedChildren,
    sortedChildren,
    backgroundColor,
    changeBackgroundColor,
  };
};
