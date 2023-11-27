import './global.css';

export { CustomEditor as Editor } from '@/editor';
export { NubeProvider } from './provider';

export type { Variable } from '@/editor/components/ui/variable-input';
export type {
  EditorAPI,
  EditorConfig,
  VariableConfig,
} from '@/editor/stores/config.store';
