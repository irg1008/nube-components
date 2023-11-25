import { Button, ButtonProps, Tooltip } from '@material-tailwind/react';
import { ReactNode } from 'react';

export type CustomButtonProps = Omit<ButtonProps, 'ref'> & {
  tooltip?: ReactNode;
};

export const CustomButton = ({
  children,
  tooltip,
  variant = 'filled',
  ...props
}: CustomButtonProps) => {
  const btn = (
    <Button
      className="flex shrink items-center justify-center gap-2"
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
