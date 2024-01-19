import {
  CustomButton,
  CustomButtonProps,
} from '@/editor/components/ui/custom-btn';
import { useEditorHotkey } from '@/editor/hooks/useEditorHotkey';
import { Chip } from '@material-tailwind/react';
import { CommandIcon } from 'lucide-react';
import { Keys } from 'react-hotkeys-hook';

export type ActionProps = {
  hotkey: Keys;
  action: () => void;
  tooltip: string;
};

export const Action = ({
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
        <div className="relative">
          <span className="text-center">{tooltip ?? ''} </span>
          <div className="top-100 w-100 absolute left-1/2 flex -translate-x-1/2 translate-y-0.5 justify-center">
            <Chip
              variant="outlined"
              icon={<CommandIcon className="h-4 w-4" />}
              size="sm"
              value={
                <code className="text-inherit">
                  {typeof hotkey === 'string' ? hotkey : hotkey.join(' / ')}
                </code>
              }
            />
          </div>
        </div>
      }
    />
  );
};
