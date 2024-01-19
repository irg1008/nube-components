import { CSSProperties, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type SelectionGridProps<T extends string> = {
  options: readonly T[];
  selected: T;
  label: string;
  getComputedStyle?: (value: T) => CSSProperties;
  onChange: (value: T) => void;
  children?: (value: T, selectionBtn: JSX.Element) => ReactNode;
  btnContent?: ReactNode | ((value: T) => ReactNode);
};

export const SelectionGrid = <T extends string>({
  options,
  selected,
  label,
  getComputedStyle,
  onChange,
  children,
  btnContent,
}: SelectionGridProps<T>) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(2rem,1fr))] place-items-center gap-2">
      {options.map((option) => {
        const btn = (
          <button
            key={option}
            type="button"
            aria-label={label}
            className={twMerge(
              'flex aspect-square h-8 w-8 items-center justify-center rounded-xl border-2 border-white shadow-md',
              selected === option ? 'ring-2 ring-blue-500 ring-offset-2' : '',
            )}
            style={getComputedStyle?.(option)}
            onClick={() => onChange(option)}>
            {typeof btnContent === 'function' ? btnContent(option) : btnContent}
          </button>
        );

        return children ? children(option, btn) : btn;
      })}
    </div>
  );
};
