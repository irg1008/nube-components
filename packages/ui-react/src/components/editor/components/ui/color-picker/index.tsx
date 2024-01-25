import {
  pickFromEyeDropper,
  supportsEyeDropper,
} from '@/editor/utils/browser.utils';
import {
  IconButton,
  Input,
  Popover,
  PopoverContent,
  PopoverHandler,
  Tooltip,
} from '@material-tailwind/react';
import { CopyIcon, PipetteIcon } from 'lucide-react';
import { useRef } from 'react';
import { HexColorPicker } from 'react-colorful';
import { toast } from 'sonner';
import { useBoolean, useOnClickOutside } from 'usehooks-ts';
import { ColorButton } from '../color-button';

type ColorPickerProps = {
  initialColor: string;
  onChange: (color: string) => void;
};

export const ColorPicker = ({ initialColor, onChange }: ColorPickerProps) => {
  const {
    value: open,
    setFalse: closePopUp,
    setTrue: openPopUp,
    setValue: setOpen,
  } = useBoolean(false);
  const handlerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(handlerRef, ({ target }) => {
    const isContentChild = contentRef.current?.contains(target as Node);
    if (!isContentChild) closePopUp();
  });

  const hexInputRef = useRef<HTMLInputElement>(null);
  const setManualHex = (hex: string) => {
    const hexRegex = /^#([0-9A-F]{3}){1,2}$/i;
    const isValid = hexRegex.test(hex);
    if (!isValid) return;
    onChange(hex);
  };

  const setPickerColor = (color: string) => {
    onChange(color);
    if (!hexInputRef.current) return;
    hexInputRef.current.value = color;
  };

  const setEyeDropperColor = async () => {
    const color = await pickFromEyeDropper();
    if (!color) return;
    onChange(color);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(initialColor);
  };

  return (
    <Popover placement="bottom" open={open} handler={setOpen}>
      <PopoverHandler onMouseOver={openPopUp} ref={handlerRef}>
        <span>
          <ColorButton hex={initialColor} />
        </span>
      </PopoverHandler>
      <PopoverContent
        onMouseLeave={closePopUp}
        className="z-[300] flex flex-col gap-3"
        ref={contentRef}>
        <HexColorPicker
          color={initialColor}
          onChange={setPickerColor}
          className="cursor-pointer"
        />
        <div className="relative flex max-w-[200px] items-center gap-2">
          {supportsEyeDropper && (
            <Tooltip content="Seleccionar color">
              <IconButton
                onClick={setEyeDropperColor}
                color="gray"
                variant="gradient"
                className="shrink-0">
                <PipetteIcon className="h-4 w-4" />
              </IconButton>
            </Tooltip>
          )}
          <Input
            inputRef={hexInputRef}
            className="flex-grow"
            crossOrigin=""
            label="Hex"
            defaultValue={initialColor}
            onChange={(e) => setManualHex(e.target.value)}
          />
          <Tooltip content="Copiar al portapapales">
            <IconButton
              onClick={() => {
                copyToClipboard();
                toast.success('Color copiado al portapapeles', {
                  id: 'copyColor',
                  duration: 1000,
                });
              }}
              size="sm"
              variant="text"
              className="absolute right-1 top-1">
              <CopyIcon className="h-4 w-4" />
            </IconButton>
          </Tooltip>
        </div>
      </PopoverContent>
    </Popover>
  );
};
