import { useSetUp } from '@/editor/hooks/useSetUp';
import { EditorConfig } from '@/editor/stores/config.store';
import { Sidebar } from '../sidebar';
import { Toolbar } from '../toolbar';
import { ViewOptions } from '../view-options';

type CustomUIProps = {
  config: EditorConfig;
};

export const CustomUI = ({ config }: CustomUIProps) => {
  useSetUp(config);

  return (
    <div className="pointer-events-none absolute inset-0 z-[300] flex justify-between [&>*]:pointer-events-auto">
      <Toolbar />
      <ViewOptions />
      <Sidebar />
    </div>
  );
};
