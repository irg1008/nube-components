import { TextEditor } from '@/text-editor';
import { SelectItem } from '@/text-editor/extensions/select.extension';
import {
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from '@material-tailwind/react';
import { Editor, JSONContent } from '@tiptap/react';
import { ListRestartIcon, PlusCircleIcon } from 'lucide-react';
import { useState } from 'react';
import { useUpdateEffect } from 'usehooks-ts';

export type Variable = SelectItem;

type VariableInputProps = {
  /**
   * Format used in `renderText` method. Include keyword # to replace with variable key.
   *
   * @type {string}
   */
  format?: string;
  variables: Variable[];
  content?: JSONContent | string;
  onChange?: (displayValue: string, content: JSONContent) => void;
};

export const VariableInput = ({
  variables,
  onChange,
  content,
  format,
}: VariableInputProps) => {
  const [editor, setEditor] = useState<Editor>();

  const addVariable = (item: Variable) => {
    editor
      ?.chain()

      .insertContent({
        type: 'select',
        attrs: {
          items: variables,
          selected: item,
          format,
        },
      })

      .run();

    syncVariables();
  };

  const isSameContent = () => {
    return JSON.stringify(editor?.getJSON()) === JSON.stringify(content);
  };

  const syncVariables = () => {
    if (!editor) return;
    editor.commands.focus('all');
    editor.commands.updateAttributes('select', { items: variables });
    editor.commands.focus('end');
  };

  const onEditorChange = () => {
    if (!editor || !onChange) return;
    const displayValue = editor.getText();
    const content = editor.getJSON();
    onChange(displayValue, content);
  };

  const setContent = () => {
    if (!editor || content === undefined || isSameContent()) return;
    queueMicrotask(() => {
      editor?.commands.setContent(content);
    });
  };

  useUpdateEffect(() => {
    if (!editor) return;

    setContent();

    editor.on('update', onEditorChange);

    return () => {
      editor.off('update', onEditorChange);
    };
  }, [editor]);

  useUpdateEffect(() => {
    setContent();
  }, [content]);

  return (
    <div className="flex gap-2">
      <div className="h-10 w-[80%] basis-10/12">
        <TextEditor
          onCreate={(editor) => {
            setEditor(editor);
            onEditorChange();
          }}
          content={content}
          autofocus={false}
        />
      </div>
      <Menu allowHover>
        <MenuHandler>
          <div className="basis-2/12">
            <IconButton size="md">
              <PlusCircleIcon className="h-4 w-4" />
            </IconButton>
          </div>
        </MenuHandler>
        <MenuList className="max-h-72">
          {variables.map((v, i) => (
            <MenuItem key={i} onClick={() => addVariable(v)}>
              {v.label}
            </MenuItem>
          ))}
          <hr className="pointer-events-none my-2" />
          <MenuItem className="flex gap-2" onClick={() => syncVariables()}>
            <ListRestartIcon className="h-4 w-4" />
            Refrescar opciones
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
};
