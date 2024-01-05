import { useCanvas } from '@/editor/stores/canvas.store';
import { IconButton } from '@material-tailwind/react';
import { ArrowRightToLine } from 'lucide-react';
import { useHotkeys } from 'react-hotkeys-hook';
import { twMerge } from 'tailwind-merge';
import { useBoolean } from 'usehooks-ts';
import { BackDropOverlay } from '../ui/backdrop-overlay';
import { ReadonlyOverlay } from './readonly-overlay';
import { SidebarContent } from './sidebar-content';

export const Sidebar = () => {
  const {
    value: open,
    toggle: toggleOpen,
    setFalse: close,
  } = useBoolean(false);

  const { sidebarRef } = useCanvas();
  const scopeRef = useHotkeys('esc', close);

  return (
    <>
      <aside
        id="editor-sidebar"
        ref={sidebarRef}
        className="absolute right-0 z-10 h-full w-0 overflow-visible lg:relative lg:w-auto">
        <section
          ref={scopeRef}
          className={twMerge(
            'relative h-full w-[calc(70vw)] max-w-xs gap-3 border-l-2 border-gray-900 bg-gray-50 shadow-xl transition-transform duration-300 lg:translate-x-0 lg:duration-0',
            open ? '-translate-x-full' : 'translate-x-0',
          )}>
          <span className="absolute bottom-0 left-0 -translate-x-full p-4 lg:hidden">
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

      <BackDropOverlay open={open} onClose={close} />
    </>
  );
};
