import Document from '@tiptap/extension-document';
import History from '@tiptap/extension-history';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import {
  Content,
  Editor,
  EditorContent,
  mergeAttributes,
  useEditor,
} from '@tiptap/react';
import { SelectExtension } from './extensions/select.extension';

export type TextEditorProps = {
  content?: Content;
  onCreate?: (editor: Editor) => void;
  autofocus?: boolean;
};

const InlineDocument = Document.extend({
  content: 'block',
});

const ParagraphWithDiv = Paragraph.extend({
  parseHTML() {
    return [{ tag: 'div' }];
  },
  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },
});

export function TextEditor({ content, onCreate, autofocus }: TextEditorProps) {
  const editor = useEditor({
    extensions: [
      InlineDocument,
      ParagraphWithDiv,
      Text,
      SelectExtension,
      History,
    ],
    autofocus,
    onCreate: ({ editor }) => onCreate?.(editor as Editor),
    content,
    editorProps: {
      attributes: {
        class:
          'h-full flex items-center grow overflow-x-auto scrollbar-none !whitespace-nowrap leading-[100%] p-2 font-sans text-sm [&>*]:min-w-full [&_*]:inline [&_*]:!whitespace-nowrap',
      },
    },
  });

  return (
    <EditorContent
      editor={editor}
      className="focus:bg-blue-gray-8900 flex h-full w-full items-center justify-start rounded-lg border border-blue-gray-200 focus-within:border-2 focus-within:border-blue-gray-900"
    />
  );
}
