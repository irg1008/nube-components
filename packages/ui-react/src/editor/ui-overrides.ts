import {
  TLUiMenuGroup,
  TLUiOverrides,
  menuItem,
  toolbarItem,
} from '@tldraw/tldraw';

// In order to see select our custom shape tool, we need to add it to the ui.

export const uiOverrides: TLUiOverrides = {
  tools(editor, tools) {
    // Create a tool item in the ui's context.
    tools['variable'] = {
      id: 'variable',
      icon: 'tool-embed',
      label: 'Variable' as any,
      kbd: 'v',
      readonlyOk: false,
      onSelect: () => {
        editor.setCurrentTool('variable');
      },
    };
    return tools;
  },
  toolbar(_app, toolbar, { tools }) {
    // Add the tool item from the context to the toolbar.
    toolbar.splice(4, 0, toolbarItem(tools['variable']));
    return toolbar;
  },
  keyboardShortcutsMenu(_app, keyboardShortcutsMenu, { tools }) {
    // Add the tool item from the context to the keyboard shortcuts dialog.
    const toolsGroup = keyboardShortcutsMenu.find(
      (group) => group.id === 'shortcuts-dialog.tools',
    ) as TLUiMenuGroup;
    toolsGroup.children.push(menuItem(tools['variable']));
    return keyboardShortcutsMenu;
  },
  actionsMenu(editor, schema, helpers) {
    console.log('menu', { editor, schema, helpers });
    return schema;
  },
  actions(editor, schema, helpers) {
    console.log('actions', { editor, schema, helpers });
    return schema;
  },
};
