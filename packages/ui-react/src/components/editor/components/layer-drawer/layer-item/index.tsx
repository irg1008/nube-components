import { useEditor } from '@/editor/hooks/useEditor';
import {
  IconButton,
  ListItem,
  MenuItem,
  Tooltip,
} from '@material-tailwind/react';
import { TLShape } from '@tldraw/tldraw';
import {
  CheckIcon,
  GripHorizontalIcon,
  LockIcon,
  PencilLineIcon,
} from 'lucide-react';
import { KeyboardEventHandler, ReactNode, useRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { useBoolean, useOnClickOutside } from 'usehooks-ts';
import { SortableItem } from '../../ui/sortable-item';
import { LayerOptions } from '../layer-options';

type LayerItemProps = {
  shape: TLShape;
  isSelected: boolean;
  icon: ReactNode;
};

export const LayerItem = ({ shape, isSelected, icon }: LayerItemProps) => {
  const { editor } = useEditor();
  const {
    value: editing,
    setTrue: startEditing,
    setFalse: scapeEditing,
  } = useBoolean(false);

  const itemRef = useRef<HTMLElement>(null);

  const saveName = () => {
    scapeEditing();
    const value = itemRef.current?.innerText;
    if (!value) return;

    editor.updateShape({
      id: shape.id,
      type: shape.type,
      meta: {
        name: value,
      },
    });
  };

  const onKeyDown: KeyboardEventHandler<HTMLSpanElement> = (e) => {
    const isEnter = e.key === 'Enter';
    if (!isEnter) return;
    e.preventDefault();
    saveName();
  };

  useOnClickOutside(itemRef, () => editing && saveName());

  return (
    <SortableItem
      key={shape.id}
      id={shape.id}
      handleAs="div"
      handleChildren={
        <IconButton size="sm" variant="text">
          <GripHorizontalIcon className="h-3 w-3" />
        </IconButton>
      }>
      {(handle) => (
        <ListItem
          selected={isSelected}
          onClick={() => editor.select(shape)}
          className={'flex items-center gap-1 p-1 ps-3'}>
          <span>{icon}</span>
          <span
            ref={itemRef}
            onKeyDown={onKeyDown}
            suppressContentEditableWarning
            contentEditable={editing}
            onClick={(e) => editing && e.stopPropagation()}
            className={twMerge(
              'line-clamp-1 grow px-1 text-sm',
              editing && 'rounded-md outline outline-2 outline-gray-900',
            )}>
            {shape.meta['name']?.toString() ?? shape.id}
          </span>
          {editing ? (
            <IconButton size="sm" variant="text" onClick={saveName}>
              <CheckIcon className="h-3 w-3" />
            </IconButton>
          ) : (
            <>
              {shape.isLocked && (
                <Tooltip content="Capa bloqueada">
                  <LockIcon className="h-2 w-2 opacity-50" />
                </Tooltip>
              )}
              <LayerOptions shape={shape}>
                <MenuItem
                  className="flex items-center gap-2"
                  onClick={startEditing}>
                  <PencilLineIcon className="h-3 w-3" />
                  Renombrar
                </MenuItem>
              </LayerOptions>
              <span>{handle}</span>
            </>
          )}
        </ListItem>
      )}
    </SortableItem>
  );
};
