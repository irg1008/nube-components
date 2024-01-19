import { Icon as TLIcon, TLUiIconType } from '@tldraw/tldraw';
import { LucideIcon } from 'lucide-react';
import { createElement } from 'react';
import { twMerge } from 'tailwind-merge';

export const getIconElement = (
  icon: LucideIcon | TLUiIconType,
  additionalClassNames?: string,
) => {
  const className = twMerge('h-4 w-4', additionalClassNames);
  return typeof icon === 'string'
    ? createElement(TLIcon, { className, icon })
    : createElement(icon, { className });
};
