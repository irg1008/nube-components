import { useCanvas } from '@/editor/hooks/useCanvas';
import { IconButton } from '@material-tailwind/react';
import { track } from '@tldraw/tldraw';
import { ArrowRightToLine } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { useToggle } from 'usehooks-ts';
import { ReadonlyOverlay } from './readonly-overlay';
import { SidebarContent } from './sidebar-content';

export const Sidebar = track(() => {
  const [open, toggleOpen] = useToggle(false);
  const { sidebarRef } = useCanvas();

  return (
    <aside
      ref={sidebarRef}
      className="absolute right-0 h-full w-0 overflow-visible lg:relative lg:w-auto">
      <section
        className={twMerge(
          'relative h-full w-[calc(70vw)] max-w-[var(--sidebar-width)] gap-3 border-l-2 border-gray-900 bg-gray-50 shadow-xl transition-transform duration-300 lg:translate-x-0 lg:duration-0',
          open ? '-translate-x-full' : 'translate-x-0',
        )}>
        <span className="!absolute bottom-10 left-0 -translate-x-full p-6 lg:hidden">
          <IconButton onClick={toggleOpen}>
            <ArrowRightToLine
              className={twMerge(
                open ? '' : 'rotate-180',
                'transition-transform duration-300',
              )}
            />
          </IconButton>
        </span>

        <ReadonlyOverlay />
        <SidebarContent />
      </section>
    </aside>
  );
});
