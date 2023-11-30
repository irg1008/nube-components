import {
  filterShapesWithValue,
  getDynamicElement,
} from '@/editor/shapes/dynamic-shapes';
import {
  generateCanvasHTML,
  updateElementsValue,
} from '@/editor/utils/canvas-html.utils';
import { updateShapeProp } from '@/editor/utils/editor.utils';
import {
  getObjectFromFile,
  saveHTMLFile,
  saveObjectAsFile,
} from '@/editor/utils/files.utils';
import {
  StoreSnapshot,
  TLRecord,
  TLShape,
  TLStoreSnapshot,
  useCopyAs,
  useExportAs,
} from '@tldraw/tldraw';
import { useCanvas } from './useCanvas';
import { useEditor } from './useEditor';

type ExportOptions = {
  exportExtension?: string;
};

export const useExport = ({ exportExtension = '.nbs' }: ExportOptions = {}) => {
  const { editor } = useEditor();
  const { canvas, canvasSize, resetCanvas } = useCanvas();
  const exportAs = useExportAs();
  const copyAs = useCopyAs();

  const exportCanvas = () => {
    return exportAs([canvas.id], 'png');
  };

  const copyCanvas = () => {
    return copyAs([canvas.id], 'png');
  };

  const exportCanvasImg = async (name?: string) => {
    if (!name) return exportCanvas();

    const shapes = updateShapeProp(canvas as TLShape, {
      prop: 'name',
      value: name,
    });

    editor.updateShape(shapes, { ephemeral: true });
    await exportCanvas();
  };

  const getSnapshot = () => {
    return editor.store.getSnapshot('all');
  };

  const setSnapshot = (snapshot: TLStoreSnapshot) => {
    editor.batch(() => {
      editor.store.loadSnapshot(snapshot);
      resetCanvas();
    });
  };

  const saveSnapshot = (fileName: string) => {
    const snapshot = getSnapshot();
    saveObjectAsFile(snapshot, `${fileName}${exportExtension}`);
  };

  const loadSnapshot = async (file: File) => {
    const snapshot: StoreSnapshot<TLRecord> = await getObjectFromFile(file);
    setSnapshot(snapshot);
  };

  const getCanvasHTML = () => {
    return generateCanvasHTML(canvasSize);
  };

  const exportHTML = (fileName: string) => {
    const canvasHTML = getCanvasHTML();
    saveHTMLFile(canvasHTML, fileName);
  };

  const getTemplateCanvasHTML = () => {
    const canvasHTML = getCanvasHTML();
    const withMetaValue = filterShapesWithValue(editor.currentPageShapes);
    return updateElementsValue(canvasHTML, withMetaValue, getDynamicElement);
  };

  const exportTemplateHTML = (fileName: string) => {
    const canvasHTML = getTemplateCanvasHTML();
    saveHTMLFile(canvasHTML, fileName);
  };

  return {
    exportExtension,
    exportCanvasImg,
    exportTemplateHTML,
    exportHTML,
    saveSnapshot,
    loadSnapshot,
    setSnapshot,
    getSnapshot,
    getCanvasHTML,
    copyCanvas,
    getTemplateCanvasHTML,
  };
};
