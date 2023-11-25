import { Variable } from '@/editor/components/ui/variable-input';
import { atom, useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';

export type VariableConfig = {
  textLabel?: string;
  imageLabel?: string;
  textVariables: Variable[];
  imageVariables: Variable[];
  variableValueResolver: (key: Variable['key']) => string;
};

export type EditorConfig = {
  variablesConfig?: VariableConfig;
};

const configAtom = atom<EditorConfig>({});

export const useConfig = () => useAtomValue(configAtom);
export const useSetConfig = () => useSetAtom(configAtom);

export const useInitialConfig = (config: EditorConfig) => {
  const setConfig = useSetConfig();

  useEffect(() => {
    setConfig(config);
  }, [config, setConfig]);
};
