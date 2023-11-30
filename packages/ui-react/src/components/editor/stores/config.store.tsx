import { Variable } from '@/editor/components/ui/variable-input';
import { useCanvas } from '@/editor/hooks/useCanvas';
import { useExport } from '@/editor/hooks/useExport';
import { PropsWithChildren } from 'react';
import { useEffectOnce, useUpdateEffect } from 'usehooks-ts';

export type VariableConfig = {
  textLabel?: string;
  imageLabel?: string;
  textVariables: Variable[];
  imageVariables: Variable[];
  variableValueResolver: (key: Variable['key']) => string;
};

export type EditorConfig = {
  variablesConfig?: VariableConfig;
  onMount?: (api: EditorAPI) => void;
  hideExportUI?: boolean;
};

export type EditorAPI = ReturnType<typeof useEditorAPI>;

const useEditorAPI = () => {
  const exportOps = useExport();
  return exportOps;
};

export const useConfig = () => useCanvas().config;

export const SetUp = ({ children }: PropsWithChildren) => {
  const { config, canvasSize } = useCanvas();
  const editorAPI = useEditorAPI();

  const remountEditor = () => {
    config.onMount?.(editorAPI);
  };

  useEffectOnce(() => remountEditor());
  useUpdateEffect(() => remountEditor(), [canvasSize]);

  return <>{children}</>;
};
