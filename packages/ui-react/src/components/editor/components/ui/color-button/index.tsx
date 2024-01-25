import { IconButton } from '@material-tailwind/react';
import Color from 'color';
import { twMerge } from 'tailwind-merge';

type ColorButtonProps = {
  hex: string;
  onClick?: () => void;
};

export const ColorButton = ({ hex, onClick }: ColorButtonProps) => {
  return (
    <IconButton
      variant="outlined"
      onClick={onClick}
      className={twMerge(
        `rounded-xl border-2 border-inherit shadow-md transition-all duration-200`,
        Color(hex).isLight() ? 'border-gray-900' : 'border-white',
      )}
      size="sm"
      style={{ backgroundColor: hex }}>
      <></>
    </IconButton>
  );
};
