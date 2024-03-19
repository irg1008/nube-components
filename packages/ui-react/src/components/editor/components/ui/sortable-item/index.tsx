import { UniqueIdentifier } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  ComponentProps,
  HTMLAttributes,
  ReactNode,
  createElement,
} from 'react';

type BaseSortableItemProps = {
  id: UniqueIdentifier;
  children: ReactNode | ((handle?: ReactNode) => ReactNode);
};

type HandleProps<H = keyof JSX.IntrinsicElements> =
  | {
      handleAs: H;
      handleChildren: ReactNode;
      handleProps?: HTMLAttributes<H>;
    }
  | {
      handleAs?: undefined;
      handleChildren?: undefined;
      handleProps?: undefined;
    };

type SortableItemProps = BaseSortableItemProps &
  HandleProps &
  Omit<ComponentProps<'div'>, 'children'>;

export const SortableItem = ({
  id,
  children,
  handleAs,
  handleChildren,
  handleProps,
  ...props
}: SortableItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    setActivatorNodeRef: handleRef,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handle = handleAs
    ? createElement(
        handleAs,
        {
          ref: handleRef,
          ...handleProps,
          ...listeners,
        },
        handleChildren,
      )
    : null;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...props}
      {...attributes}
      {...(handle ? {} : listeners)}>
      {typeof children === 'function' ? children(handle) : children}
    </div>
  );
};
