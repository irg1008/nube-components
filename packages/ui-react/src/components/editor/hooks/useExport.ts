import { useCanvas } from '@/editor/stores/canvas.store';
import {
  generateCanvasHTML,
  transformElement,
  updateElementsValue,
} from '@/editor/utils/canvas-html.utils';
import { updateShapeProp } from '@/editor/utils/editor.utils';
import {
  getObjectFromFile,
  saveHTMLFile,
  saveObjectAsFile,
} from '@/editor/utils/files.utils';
import { filterShapesWithValue } from '@/editor/utils/shapes.util';
import {
  SerializedStore,
  StoreSnapshot,
  TLRecord,
  TLShape,
  TLStoreSnapshot,
  getSvgAsImage,
  useCopyAs,
  useExportAs,
} from '@tldraw/tldraw';
import { useEditor } from './useEditor';

type ExportOptions = {
  exportExtension?: string;
};

const purgeUnusedAssets = (snapshot: StoreSnapshot<TLRecord>) => {
  const isAsset = (k: string) => k.startsWith('asset');

  const assetsKeys = Object.keys(snapshot.store).filter(isAsset);
  const nonAssets = Object.entries(snapshot.store).filter(([k]) => !isAsset(k));
  const nonAssetsString = JSON.stringify(nonAssets);
  const unusedAssets = assetsKeys.filter((k) => !nonAssetsString.includes(k));

  unusedAssets.forEach((asset) => {
    delete snapshot.store[asset as keyof SerializedStore<TLRecord>];
  });
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

  const getCanvasImg = async ({
    quality = 1,
    scale = 2,
  }): Promise<Blob | null> => {
    const svg = await editor.getSvg([canvas.id]);
    if (!svg) throw new Error('Could not get canvas svg');

    return getSvgAsImage(svg, editor.environment.isSafari, {
      type: 'png',
      scale,
      quality,
    });
  };

  const exportCanvasImg = (name?: string) => {
    if (!name) return exportCanvas();

    const shapes = updateShapeProp(canvas as TLShape, {
      prop: 'name',
      value: name,
    });

    editor.updateShape(shapes, { ephemeral: true });
    exportCanvas();
  };

  const getSnapshot = () => {
    const snapshot = editor.store.getSnapshot('all');
    purgeUnusedAssets(snapshot);
    return snapshot;
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
    const allShapes = editor.getCurrentPageShapes();
    const withMetaValue = filterShapesWithValue(allShapes);
    return updateElementsValue(canvasHTML, withMetaValue, transformElement);
  };

  const exportTemplateHTML = (fileName: string) => {
    const canvasHTML = getTemplateCanvasHTML();
    saveHTMLFile(canvasHTML, fileName);
  };

  return {
    exportExtension,
    exportCanvasImg,
    getCanvasImg,
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
