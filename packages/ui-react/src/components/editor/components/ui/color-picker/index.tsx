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
import { useBoolean, useOnClickOutside } from 'usehooks-ts';

type ColorPickerProps = {
  initialColor: string;
  onChange: (color: string) => void;
};

const supportsEyeDropper = 'EyeDropper' in window;

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

  const copyToClipboard = () => {
    navigator.clipboard.writeText(initialColor);
  };

  const pickFromEyeDropper = async () => {
    if (!supportsEyeDropper) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const eyeDropper = new (window as any).EyeDropper();
    const color = await eyeDropper.open();
    onChange(color.sRGBHex);
  };

  return (
    <Popover placement="bottom" open={open} handler={setOpen}>
      <PopoverHandler onMouseOver={openPopUp} ref={handlerRef}>
        <IconButton
          variant="outlined"
          className="rounded-xl border-2 border-black shadow-md"
          size="sm"
          style={{
            backgroundColor: initialColor,
          }}>
          <></>
        </IconButton>
      </PopoverHandler>
      <PopoverContent
        onMouseLeave={closePopUp}
        className="z-[300] flex flex-col gap-3"
        ref={contentRef}>
        <HexColorPicker
          color={initialColor}
          onChange={onChange}
          className="cursor-pointer"
        />
        <div className="relative flex max-w-[200px] items-center gap-2">
          {supportsEyeDropper && (
            <Tooltip content="Seleccionar color">
              <IconButton
                onClick={() => pickFromEyeDropper()}
                color="gray"
                variant="gradient"
                className="shrink-0">
                <PipetteIcon className="h-4 w-4" />
              </IconButton>
            </Tooltip>
          )}
          <Input
            readOnly
            crossOrigin=""
            label="Hex"
            value={initialColor}
            containerProps={{
              className: '!min-w-0',
            }}
          />
          <Tooltip content="Copiar al portapapales">
            <IconButton
              onClick={() => copyToClipboard()}
              size="sm"
              variant="text"
              className="!absolute right-1 top-1">
              <CopyIcon className="h-4 w-4" />
            </IconButton>
          </Tooltip>
        </div>
      </PopoverContent>
    </Popover>
  );
};
