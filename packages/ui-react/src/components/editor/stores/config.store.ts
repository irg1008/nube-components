import { Variable } from '@/editor/components/ui/variable-input';
import { useExport } from '@/editor/hooks/useExport';
import { atom, useAtomValue, useSetAtom } from 'jotai';

export type VariableConfig = {
  textLabel?: string;
  imageLabel?: string;
  textVariables: Variable[];
  imageVariables: Variable[];
  variableValueResolver: (key: Variable['key']) => string;
};

export type EditorAPI = ReturnType<typeof useExport>;

export type EditorConfig = {
  variablesConfig?: VariableConfig;
  onMount?: (api: EditorAPI) => void;
  hideExportUI?: boolean;
};

const configAtom = atom<EditorConfig>({});

export const useConfig = () => useAtomValue(configAtom);
export const useSetConfig = () => useSetAtom(configAtom);
