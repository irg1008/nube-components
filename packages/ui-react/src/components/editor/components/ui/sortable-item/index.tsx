import { UniqueIdentifier } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ReactNode, createElement } from 'react';

type BaseSortableItemProps = {
  id: UniqueIdentifier;
  children: ReactNode | ((handle?: ReactNode) => ReactNode);
};

type HandleProps =
  | {
      handleAs: keyof JSX.IntrinsicElements;
      handleChildren: ReactNode;
    }
  | {
      handleAs?: undefined;
      handleChildren?: undefined;
    };

type SortableItemProps = BaseSortableItemProps & HandleProps;

export const SortableItem = ({
  id,
  children,
  handleAs,
  handleChildren,
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
          ...listeners,
        },
        handleChildren,
      )
    : null;

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      {typeof children === 'function' ? children(handle) : children}
    </div>
  );
};
