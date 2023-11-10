import { useEditor } from '@/editor/hooks/useEditor';
import { useEditorHotkey } from '@/editor/hooks/useEditorHotkey';
import { track } from '@tldraw/tldraw';
import {
  CommandIcon,
  EraserIcon,
  MousePointer2Icon,
  PencilIcon,
  RedoIcon,
  TypeIcon,
  UndoIcon,
} from 'lucide-react';
import { ReactNode } from 'react';
import { Keys } from 'react-hotkeys-hook';

import {
  Button,
  ButtonGroup,
  ButtonProps,
  Chip,
  Tooltip,
} from '@material-tailwind/react';

type CustomButtonProps = Omit<ButtonProps, 'ref'> & { tooltip?: ReactNode };

const CustomButton = ({
  children,
  tooltip,
  variant = 'filled',
  ...props
}: CustomButtonProps) => {
  const btn = (
    <Button
      size="sm"
      className="shrink tw-flex tw-items-center tw-justify-center tw-gap-2"
      variant={variant}
      {...props}>
      {children}
    </Button>
  );

  if (!tooltip) return btn;

  return (
    <Tooltip placement="bottom" content={tooltip}>
      {btn}
    </Tooltip>
  );
};

type ActionProps = {
  hotkey: Keys;
  action: () => void;
  tooltip: string;
};

const Action = ({
  hotkey,
  action,
  tooltip,
  ...props
}: ActionProps & CustomButtonProps) => {
  useEditorHotkey(hotkey, action);

  return (
    <CustomButton
      {...props}
      onClick={() => action()}
      tooltip={
        <div className="tw-relative">
          <span className="tw-text-center">{tooltip ?? ''} </span>
          <div className="tw-top-100 tw-w-100 tw-absolute tw-left-1/2 tw-flex tw--translate-x-1/2 tw-translate-y-0.5 tw-justify-center">
            <Chip
              variant="outlined"
              icon={<CommandIcon className="tw-h-4 tw-w-4" />}
              size="sm"
              value={<code>{hotkey}</code>}
            />
          </div>
        </div>
      }
    />
  );
};

export const Toolbar = track(() => {
  const { setTool, editor, deleteSelected } = useEditor();
  useEditorHotkey(['delete', 'backspace'], deleteSelected);

  return (
    <div className="h-[min-content] grow tw-flex tw-flex-col tw-items-center tw-justify-start tw-gap-4 tw-p-4 sm:tw-flex-row-reverse sm:tw-items-start sm:tw-justify-center">
      <ButtonGroup>
        <Action
          hotkey="shift+s"
          action={() => setTool('select')}
          tooltip="Selección">
          <MousePointer2Icon className="tw-h-4 tw-w-4" />
        </Action>
        <Action
          hotkey="shift+d"
          action={() => setTool('draw')}
          tooltip="Dibujar">
          <PencilIcon className="tw-h-4 tw-w-4" />
        </Action>
        <Action hotkey="shift+t" action={() => setTool('text')} tooltip="Texto">
          <TypeIcon className="tw-h-4 tw-w-4" />
        </Action>
        <Action
          hotkey="shift+b"
          action={() => setTool('eraser')}
          tooltip="Borrar">
          <EraserIcon className="tw-h-4 tw-w-4" />
        </Action>
      </ButtonGroup>

      <ButtonGroup variant="outlined">
        <Action
          hotkey="ctrl+z"
          action={() => editor.undo()}
          disabled={!editor.canUndo || editor.history.numUndos === 1}
          tooltip="Deshacer">
          <UndoIcon className="tw-h-4 tw-w-4" />
        </Action>
        <Action
          hotkey="ctrl+shift+z"
          action={() => editor.redo()}
          disabled={!editor.canRedo}
          tooltip="Rehacer">
          <RedoIcon className="tw-h-4 tw-w-4" />
        </Action>
      </ButtonGroup>
    </div>
  );
});
