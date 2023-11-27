import {
  generateCanvasHTML,
  getTextShapeElement,
  updateElementsValue,
} from '@/editor/utils/canvas-html.utils';
import { updateShapeProp } from '@/editor/utils/editor.utils';
import {
  getObjectFromFile,
  saveHTMLDoc,
  saveObjectAsFile,
} from '@/editor/utils/files.utils';
import { StoreSnapshot, TLRecord, TLShape, useExportAs } from '@tldraw/tldraw';
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

  const exportCanvas = () => {
    return exportAs([canvas.id], 'png');
  };

  const exportCanvasImg = async (name?: string) => {
    if (!name) return exportCanvas();
    const shapes = updateShapeProp(canvas as TLShape, 'name', name);

    editor.updateShape(shapes, { ephemeral: true });
    await exportCanvas();
  };

  const saveSnapshot = (fileName: string) => {
    const snapshot = editor.store.getSnapshot('all');
    saveObjectAsFile(snapshot, `${fileName}${exportExtension}`);
  };

  const loadSnapshot = async (file: File) => {
    const snapshot: StoreSnapshot<TLRecord> = await getObjectFromFile(file);
    editor.batch(() => {
      editor.store.loadSnapshot(snapshot);
      resetCanvas();
    });
  };

  const getShapeMetaValue = (s: TLShape) => (s as ShapeWithValue).meta.value;
  const getShapesWithMetaValues = () => {
    const shapes = editor.currentPageShapes;
    return shapes.filter(getShapeMetaValue);
  };

  const exportHTML = (fileName: string) => {
    const withMetaValue = getShapesWithMetaValues();

    const canvasHTML = updateElementsValue(
      generateCanvasHTML(canvasSize),
      withMetaValue,
      getShapeMetaValue,
      (el) => getTextShapeElement(el)!,
    );

    saveHTMLDoc(canvasHTML, `${fileName}.html`);
  };

  return {
    exportExtension,
    exportCanvasImg,
    exportHTML,
    saveSnapshot,
    loadSnapshot,
  };
};
