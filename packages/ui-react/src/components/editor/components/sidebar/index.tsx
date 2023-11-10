import { useCanvas } from '@/editor/hooks/useCanvas';
import { IconButton } from '@material-tailwind/react';
import { track } from '@tldraw/tldraw';
import { ArrowRightToLine } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { useToggle } from 'usehooks-ts';
import { SidebarContent } from './sidebar-content';

export const Sidebar = track(() => {
  const [open, toggleOpen] = useToggle(false);
  const { sidebarRef } = useCanvas();

  return (
    <aside
      ref={sidebarRef}
      className="tw-absolute tw-right-0 tw-h-full tw-w-0 tw-overflow-visible lg:tw-relative lg:tw-w-auto lg:tw-overflow-auto">
      <section
        className={twMerge(
          open ? 'tw--translate-x-full' : 'tw-translate-x-0',
          'tw-relative tw-h-full tw-gap-3 tw-border-l-2 tw-border-gray-900 tw-bg-gray-50 tw-px-6 tw-py-8 tw-shadow-xl tw-transition-transform tw-duration-300 lg:tw-translate-x-0 w-[calc(70vw)] max-w-[var(--sidebar-width)] lg:duration-0',
        )}>
        <span className="tw-bottom-0 tw-left-0 tw--translate-x-full tw-p-6 lg:tw-hidden !absolute">
          <IconButton onClick={toggleOpen}>
            <ArrowRightToLine
              className={twMerge(
                open ? '' : 'tw-rotate-180',
                'tw-transition-transform tw-duration-300',
              )}
            />
          </IconButton>
        </span>

        <SidebarContent />
      </section>
    </aside>
  );
});
