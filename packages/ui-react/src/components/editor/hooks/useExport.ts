import { StoreSnapshot, TLRecord, TLShape, useExportAs } from '@tldraw/tldraw';
import { generateCanvasHTML } from '../utils/canvas-html.utils';
import { updateShapeProp } from '../utils/editor.utils';
import {
  getObjectFromFile,
  saveHTMLDoc,
  saveObjectAsFile,
} from '../utils/files.utils';
import { useCanvas } from './useCanvas';
import { useEditor } from './useEditor';

type ExportOptions = {
  exportExtension?: string;
};

export const useExport = ({ exportExtension = '.nbs' }: ExportOptions = {}) => {
  const { editor, runTransientAction } = useEditor();
  const { canvas, canvasSize, resetCanvas } = useCanvas();
  const exportAs = useExportAs();

  const exportCanvas = () => {
    return exportAs([canvas.id], 'png');
  };

  const exportCanvasImg = async (name?: string) => {
    if (!name) return exportCanvas();
    const withNewName = updateShapeProp(canvas as TLShape, 'name', name);
    runTransientAction(async () => {
      editor.updateShape(withNewName);
      await exportCanvas();
    });
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

  const exportHTML = (fileName: string) => {
    const canvasHTML = generateCanvasHTML(canvasSize);
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
