import { useCanvas } from '@/editor/stores/canvas.store';
import { refillShapesDisplayValue } from '@/editor/utils/shapes.util';
import { useEffectOnce, useUpdateEffect } from 'usehooks-ts';
import { useEditor } from './useEditor';
import { useExport } from './useExport';

export type EditorAPI = ReturnType<typeof useEditorAPI>;

export const useEditorAPI = () => {
  const { canvasSize, config } = useCanvas();
  const { editor } = useEditor();
  const exportOps = useExport();

  const { variablesConfig: varConf } = config;

  const syncShapesValue = () => {
    if (!varConf) return;

    const variables = [...varConf.imageVariables, ...varConf.textVariables];
    const syncedShapes = refillShapesDisplayValue(
      editor.getCurrentPageShapes(),
      variables,
      varConf.variableValueResolver,
    );

    editor.updateShapes(syncedShapes);
  };

  const api = {
    ...exportOps,
    syncShapesValue,
  };

  const remountEditor = () => {
    config.onMount?.(api);
  };

  useEffectOnce(() => {
    remountEditor();
  });

  useUpdateEffect(() => {
    syncShapesValue();
  }, [varConf?.variableValueResolver]);

  useUpdateEffect(() => remountEditor(), [canvasSize]);

  return api;
};
