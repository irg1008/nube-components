import { HotkeyCallback, Keys, useHotkeys } from 'react-hotkeys-hook';
import { useEditor } from './useEditor';

export const useEditorHotkey = (keys: Keys, action: HotkeyCallback) => {
  const { editor } = useEditor();
  useHotkeys(keys, action, [editor], {
    preventDefault: true,
  });
};
