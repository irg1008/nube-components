import { useEditor } from '@/editor/hooks/useEditor';
import {
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from '@material-tailwind/react';
import { TLShape } from '@tldraw/tldraw';
import { LockIcon, MoreVerticalIcon, UnlockIcon } from 'lucide-react';
import { PropsWithChildren } from 'react';

type LayerOptionsProps = {
  shape: TLShape;
};

export const LayerOptions = ({
  shape,
  children,
}: PropsWithChildren<LayerOptionsProps>) => {
  const { editor } = useEditor();

  const toggleLayerLock = (shape: TLShape) => {
    editor.toggleLock([shape]);
  };

  return (
    <Menu allowHover placement="right-start">
      <MenuHandler>
        <IconButton
          onClick={() => toggleLayerLock(shape)}
          className="ml-auto shrink-0"
          size="sm"
          variant="text">
          <MoreVerticalIcon className="h-3 w-3" />
        </IconButton>
      </MenuHandler>
      <MenuList onClick={(e) => e.stopPropagation()}>
        <MenuItem
          onClick={() => toggleLayerLock(shape)}
          className="flex items-center gap-2">
          {shape.isLocked ? (
            <>
              <UnlockIcon className="h-3 w-3" />
              Desbloquear
            </>
          ) : (
            <>
              <LockIcon className="h-3 w-3" />
              Bloquear
            </>
          )}
        </MenuItem>
        {children}
      </MenuList>
    </Menu>
  );
};
