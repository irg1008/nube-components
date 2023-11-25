import { useEditor } from '@/editor/hooks/useEditor';
import { ButtonGroup } from '@material-tailwind/react';
import { track, useNativeClipboardEvents } from '@tldraw/tldraw';
import { motion } from 'framer-motion';
import {
  EraserIcon,
  HighlighterIcon,
  ImageIcon,
  MoreVerticalIcon,
  MousePointer2Icon,
  PencilIcon,
  Redo2Icon,
  ReplaceIcon,
  ShapesIcon,
  SlashIcon,
  Trash2Icon,
  TypeIcon,
  Undo2Icon,
} from 'lucide-react';
import { FreeFormMenu } from '../ui/freeform-menu';
import { LayerActionsMenu } from '../ui/layer-actions-menu';
import { Action } from './action';

export const Toolbar = track(() => {
  const {
    editor,
    setTool,
    setCustomTool,
    performAction,
    deleteSelected,
    isReadonly,
  } = useEditor();
  useNativeClipboardEvents();

  return (
    <motion.div
      animate={{ translateY: isReadonly ? '-100%' : 0 }}
      className="flex h-[min-content] grow flex-col flex-wrap items-center justify-start gap-2 p-4 ease-in-out sm:flex-row sm:items-start sm:justify-center sm:gap-4">
      <ButtonGroup size="sm" className="order-2">
        <Action
          hotkey="alt+s"
          action={() => setTool('select')}
          tooltip="Selección">
          <MousePointer2Icon className="h-4 w-4" />
        </Action>
        <Action hotkey="alt+d" action={() => setTool('draw')} tooltip="Dibujar">
          <PencilIcon className="h-4 w-4" />
        </Action>
        <Action
          hotkey={'alt+l'}
          variant="text"
          action={() => setTool('line')}
          tooltip="Línea">
          <SlashIcon className="h-4 w-4" />
        </Action>
        <Action hotkey="alt+t" action={() => setTool('text')} tooltip="Texto">
          <TypeIcon className="h-4 w-4" />
        </Action>
        <Action
          hotkey="alt+b"
          action={() => setTool('eraser')}
          tooltip="Borrar">
          <EraserIcon className="h-4 w-4" />
        </Action>
      </ButtonGroup>

      <ButtonGroup size="sm" className="order-2">
        <Action
          hotkey="alt+i"
          action={() => setTool('asset')}
          tooltip="Subir archivo">
          <ImageIcon className="h-4 w-4" />
        </Action>
        <Action
          hotkey="alt+p"
          action={() => setCustomTool('placeholder-img')}
          tooltip="Imagen de catálogo">
          <ReplaceIcon className="h-4 w-4" />
        </Action>
        <Action
          hotkey="alt+s"
          action={() => setTool('highlight')}
          tooltip="Subrayador">
          <HighlighterIcon className="h-4 w-4" />
        </Action>
        <FreeFormMenu onFormPick={setTool}>
          <ShapesIcon className="h-4 w-4" />
        </FreeFormMenu>
      </ButtonGroup>

      <ButtonGroup variant="outlined" size="sm" className="order-3 sm:order-1">
        <Action
          hotkey="ctrl+z"
          action={() => editor.undo()}
          disabled={!editor.canUndo || editor.history.numUndos === 1}
          tooltip="Deshacer">
          <Undo2Icon className="h-4 w-4" />
        </Action>
        <Action
          hotkey="ctrl+shift+z"
          action={() => editor.redo()}
          disabled={!editor.canRedo}
          tooltip="Rehacer">
          <Redo2Icon className="h-4 w-4" />
        </Action>
        <Action
          hotkey={['delete', 'backspace']}
          disabled={editor.selectedShapes.length === 0}
          action={() => deleteSelected()}
          tooltip="Borrar">
          <Trash2Icon className="h-4 w-4" />
        </Action>
        <LayerActionsMenu onAction={performAction}>
          <MoreVerticalIcon className="h-4 w-4" />
        </LayerActionsMenu>
      </ButtonGroup>
    </motion.div>
  );
});
