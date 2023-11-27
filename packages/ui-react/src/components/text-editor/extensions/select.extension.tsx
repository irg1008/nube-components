import {
  Chip,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from '@material-tailwind/react';
import {
  Attribute,
  Node,
  NodeViewProps,
  NodeViewWrapper,
  ReactNodeViewRenderer,
  mergeAttributes,
} from '@tiptap/react';
import { GripVerticalIcon } from 'lucide-react';

const SELECT_NAME_TAG = 'select-component';
const SELECT_TYPE = 'select';
const SELECT_KEY_REPLACER = '#';

export type SelectItem = {
  label: string;
  key: string | number;
};

export type SelectProps<T extends SelectItem> = {
  /**
   * Format used in `renderText` method. Include keyword # to replace with item key.
   *
   * @type {string}
   */
  format?: string;
  items: T[];
  selected?: T;
};

type SelectAttribute<T> = Omit<Attribute, 'default'> & {
  default: T;
};

type SelectAttributes<T extends SelectItem> = {
  [K in keyof SelectProps<T>]: SelectAttribute<SelectProps<T>[K]>;
};

type SelectRenderProps<
  T extends SelectItem,
  P = SelectProps<T>,
> = NodeViewProps & {
  node: { attrs: P };
  updateAttributes: (attrs: P) => void;
};

export function Select<T extends SelectItem>({
  updateAttributes,
  node: { attrs },
  deleteNode,
}: SelectRenderProps<T>) {
  const { items, selected } = attrs;

  const setSelected = (item: T) => {
    updateAttributes({
      selected: item,
    });
  };

  return (
    <NodeViewWrapper className={SELECT_NAME_TAG} as="div">
      <Menu allowHover offset={10}>
        <MenuHandler>
          <Chip
            variant="outlined"
            animate={{
              mount: {
                transition: { duration: 0 },
              },
            }}
            icon={
              <div
                data-drag-handle
                className="!flex h-full w-full cursor-move items-center justify-center">
                <GripVerticalIcon className="h-3 w-3 opacity-75" />
              </div>
            }
            onClose={() => deleteNode()}
            value={(selected ?? items[0]).label}
            className="w-min cursor-pointer rounded-xl"
          />
        </MenuHandler>
        <MenuList className="max-h-72">
          {items.map((item, i) => (
            <MenuItem key={i} onClick={() => setSelected(item)}>
              {item.label}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </NodeViewWrapper>
  );
}

export const SelectExtension = Node.create({
  name: SELECT_TYPE,
  group: 'inline',
  inline: true,
  atom: true,
  selectable: false,
  draggable: true,
  topNode: true,
  addAttributes(): SelectAttributes<SelectItem> {
    return {
      items: {
        default: [],
        keepOnSplit: true,
      },
      selected: undefined,
      format: undefined,
    };
  },
  parseHTML() {
    return [
      {
        tag: SELECT_NAME_TAG,
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [SELECT_NAME_TAG, mergeAttributes(HTMLAttributes)];
  },

  renderText({ node }) {
    const { selected, format } = node.attrs as SelectProps<SelectItem>;
    const selectedKey = selected!.key.toString();
    if (!format) return selectedKey;
    return format.replaceAll(SELECT_KEY_REPLACER, selectedKey);
  },

  addNodeView() {
    return ReactNodeViewRenderer(Select, {
      as: 'div',
    });
  },
});
