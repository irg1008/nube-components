import {
  Button,
  ButtonProps,
  Collapse as MTCollapse,
  CollapseProps as MTCollapseProps,
} from '@material-tailwind/react';
import { ChevronDownIcon } from 'lucide-react';
import {
  HTMLAttributes,
  PropsWithChildren,
  ReactNode,
  createElement,
} from 'react';
import { twMerge } from 'tailwind-merge';
import { useIsFirstRender } from 'usehooks-ts';

type CollapseProps<C = keyof JSX.IntrinsicElements> = {
  label: ReactNode;
  open: boolean;
  toggleOpen: () => void;
  as?: keyof JSX.IntrinsicElements;
  containerProps?: HTMLAttributes<C>;
  collapseProps?: Omit<MTCollapseProps, 'open' | 'children'>;
  size?: ButtonProps['size'];
};

export const Collapse = ({
  label,
  children,
  open,
  toggleOpen,
  as,
  containerProps,
  collapseProps,
  size = 'sm',
}: PropsWithChildren<CollapseProps>) => {
  const isFirstRender = useIsFirstRender();
  return createElement(as ?? 'div', {
    ...containerProps,
    children: (
      <>
        <Button
          size={size}
          variant="text"
          fullWidth
          className="flex cursor-pointer items-center justify-between py-2"
          onClick={() => toggleOpen()}>
          {label}
          <ChevronDownIcon
            className={twMerge(
              'transition-transform duration-200',
              open ? 'rotate-180' : '',
            )}
          />
        </Button>
        <MTCollapse
          open={open}
          animate={{
            mount: {
              opacity: 1,
              scale: 1,
              translateY: 0,
              transition: {
                duration: isFirstRender ? 0 : 0.2,
              },
            },
            unmount: {
              opacity: 0,
              scale: 0.95,
              translateY: -10,
              transition: {
                duration: 0.2,
              },
            },
          }}
          {...collapseProps}>
          <div className="py-4">{children}</div>
        </MTCollapse>
      </>
    ),
  });
};
