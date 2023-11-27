import { EditorConfig, useSetConfig } from '@/editor/stores/config.store';
import { useEffect } from 'react';
import { useEffectOnce } from 'usehooks-ts';
import { useExport } from './useExport';

export const useSetUp = (config: EditorConfig) => {
  const setConfig = useSetConfig();
  const exportApi = useExport();

  useEffect(() => {
    setConfig(config);
  }, [config, setConfig]);

  useEffectOnce(() => {
    config.onMount?.({
      ...exportApi,
    });
  });
};
