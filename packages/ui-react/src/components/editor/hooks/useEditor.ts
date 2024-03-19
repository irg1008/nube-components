import {
  HistoryEntry,
  TLEventInfo,
  TLRecord,
  VecLike,
  useActions,
  useReadonly,
  useEditor as useTlEditor,
  useTools,
} from '@tldraw/tldraw';
import { useEffectOnce, useUpdateEffect } from 'usehooks-ts';
import { customToolsNames } from '../shapes';
import { placeholderImage } from '../shapes/placeholder-img/placeholder-img.consts';
import { getShapesInChange } from '../utils/editor.utils';

const geometry = [
  'cloud',
  'rectangle',
  'ellipse',
  'triangle',
  'diamond',
  'pentagon',
  'hexagon',
  'octagon',
  'star',
  'rhombus',
  'rhombus-2',
  'oval',
  'trapezoid',
  'arrow-right',
  'arrow-left',
  'arrow-up',
  'arrow-down',
  'x-box',
  'check-box',
] as const;

const tools = [
  'select',
  'hand',
  'eraser',
  'draw',
  'text',
  'asset',
  'note',
  'laser',
  'highlight',
  'line',
  'arrow',
  // 'frame', // Not allowed
  // 'embed', // Not implemented
] as const;

const actions = [
  'edit-link',
  'insert-embed',
  'insert-media',
  'undo',
  'redo',
  'export-as-svg',
  'export-as-png',
  'export-as-json',
  'copy-as-svg',
  'copy-as-png',
  'copy-as-json',
  'toggle-auto-size',
  'open-embed-link',
  'select-zoom-tool',
  'convert-to-bookmark',
  'convert-to-embed',
  'duplicate',
  'ungroup',
  'group',
  'align-left',
  'align-center-horizontal',
  'align-right',
  'align-center-vertical',
  'align-top',
  'align-bottom',
  'distribute-horizontal',
  'distribute-vertical',
  'stretch-horizontal',
  'stretch-vertical',
  'flip-horizontal',
  'flip-vertical',
  'pack',
  'stack-vertical',
  'stack-horizontal',
  'bring-to-front',
  'bring-forward',
  'send-backward',
  'send-to-back',
  'cut',
  'copy',
  'paste',
  'select-all',
  'select-none',
  'delete',
  'rotate-cw',
  'rotate-ccw',
  'zoom-in',
  'zoom-out',
  'zoom-to-100',
  'zoom-to-fit',
  'zoom-to-selection',
  'toggle-snap-mode',
  'toggle-dark-mode',
  'toggle-reduce-motion',
  'toggle-transparent',
  'toggle-tool-lock',
  'unlock-all',
  'toggle-focus-mode',
  'toggle-grid',
  'toggle-debug-mode',
  'print',
  'exit-pen-mode',
  'stop-following',
  'back-to-content',
  'toggle-lock',
] as const;

const shapeTypes = [
  'geo',
  'image',
  'text',
  'line',
  'draw',
  'highlight',
  'arrow',
  placeholderImage,
] as const;

export type Geometry = (typeof geometry)[number];
export type EditorTool = (typeof tools)[number];
export type CustomTool = (typeof customToolsNames)[number];
export type ShapeType = (typeof shapeTypes)[number];

export type Tool = Geometry | EditorTool;
export type Action = (typeof actions)[number];

type EditorOptions = {
  onMount?: () => void;
  onChange?: (changes: ReturnType<typeof getShapesInChange>) => void;
  onDoubleClick?: (point: VecLike) => void;
  onClick?: (point: VecLike) => void;
};

export const useEditor = ({
  onMount,
  onChange,
  onDoubleClick,
  onClick,
}: EditorOptions = {}) => {
  const editor = useTlEditor();
  const tools = useTools();
  const actions = useActions();
  const isReadonly = useReadonly();

  const setTool = (tool: Tool) => {
    tools[tool]?.onSelect('toolbar');
  };

  const setCustomTool = (tool: CustomTool) => {
    editor.setCurrentTool(tool);
  };

  const performAction = (action: Action) => {
    actions[action]?.onSelect('actions-menu');
  };

  const deleteSelected = () => {
    editor.deleteShapes(editor.getSelectedShapes());
  };

  const scapeEditingState = () => {
    const shape = editor.getEditingShape();
    if (!shape) return;

    // Find a better way
    editor.batch(() => {
      editor.setCurrentTool('select.idle');
      editor.complete();
      if ('text' in shape.props && shape.props['text']) editor.select(shape);
    });
  };

  const setReadonly = (isReadonly: boolean) => {
    editor.updateInstanceState({ isReadonly });
  };

  const toggleReadonly = () => {
    editor.updateInstanceState({ isReadonly: !isReadonly });
  };

  const runTransientAction = async (action: () => void | Promise<void>) => {
    const mark = 'transient';
    editor.mark(mark);
    await action();
    editor.bailToMark(mark);
  };

  const onEditorMount = () => {
    onMount?.();
  };

  const onEditorChange = (h: HistoryEntry<TLRecord>) => {
    if (onChange) onChange(getShapesInChange(h.changes));
  };

  const onEditorEvent = (e: TLEventInfo) => {
    switch (e.name) {
      case 'double_click': {
        onDoubleClick?.(e.point);
        break;
      }
      case 'pointer_down': {
        onClick?.(e.point);
        break;
      }
    }
  };

  useEffectOnce(() => {
    onEditorMount();
  });

  useUpdateEffect(() => {
    editor.on('change', onEditorChange);
    return () => {
      editor.off('change', onEditorChange);
    };
  }, [onChange]);

  useUpdateEffect(() => {
    editor.on('event', onEditorEvent);
    return () => {
      editor.off('event', onEditorEvent);
    };
  }, [onClick, onDoubleClick]);

  return {
    editor,
    isReadonly,
    setTool,
    setCustomTool,
    scapeEditingState,
    performAction,
    deleteSelected,
    setReadonly,
    toggleReadonly,
    runTransientAction,
  };
};
