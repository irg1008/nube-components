import { useEditorAPI } from '@/editor/hooks/useEditorAPI';
import { LayerDrawer } from '../layer-drawer';
import { Sidebar } from '../sidebar';
import { Toolbar } from '../toolbar';
import { ViewOptions } from '../view-options';

export const CustomUI = () => {
  useEditorAPI();
  return (
    <div className="pointer-events-none absolute inset-0 z-[300] flex justify-between [&>*]:pointer-events-auto">
      <Toolbar />
      <ViewOptions />
      <LayerDrawer />
      <Sidebar />
    </div>
  );
};
