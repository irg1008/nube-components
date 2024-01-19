import './global.css';

export { CustomEditor as Editor } from '@/editor';
export { NubeProvider } from './provider';

export type { Variable } from '@/editor/components/ui/variable-input';
export type {
  EditorConfig,
  VariableConfig,
} from '@/editor/stores/canvas.store';

export type { EditorAPI } from '@/editor/hooks/useEditorAPI';
