import {
  generateCanvasHTML,
  getTextShapeElement,
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

type ShapeWithValue = TLShape & { meta: { value: string } };

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

  const getShapeMetaValue = (s: TLShape) => (s as ShapeWithValue).meta.value;
  const getShapesWithMetaValues = () => {
    const shapes = editor.currentPageShapes;
    return shapes.filter(getShapeMetaValue);
  };

  const exportHTML = (fileName: string) => {
    const canvasHTML = getCanvasHTML();
    saveHTMLFile(canvasHTML, fileName);
  };

  const exportTemplateHTML = (fileName: string) => {
    const canvasHTML = getTemplateCanvasHTML();
    saveHTMLFile(canvasHTML, fileName);
  };

  const getCanvasHTML = () => {
    return generateCanvasHTML(canvasSize);
  };

  const getTemplateCanvasHTML = () => {
    const withMetaValue = getShapesWithMetaValues();
    return updateElementsValue(
      getCanvasHTML(),
      withMetaValue,
      getShapeMetaValue,
      (el) => getTextShapeElement(el)!,
    );
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
