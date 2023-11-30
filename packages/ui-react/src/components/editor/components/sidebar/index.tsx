import { useCanvas } from '@/editor/hooks/useCanvas';
import { IconButton } from '@material-tailwind/react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRightToLine } from 'lucide-react';
import { useHotkeys } from 'react-hotkeys-hook';
import { twMerge } from 'tailwind-merge';
import { useBoolean } from 'usehooks-ts';
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
        ref={sidebarRef}
        className="absolute right-0 z-10 h-full w-0 overflow-visible lg:relative lg:w-auto">
        <section
          ref={scopeRef}
          className={twMerge(
            'relative h-full w-[calc(70vw)] max-w-xs gap-3 border-l-2 border-gray-900 bg-gray-50 shadow-xl transition-transform duration-300 lg:translate-x-0 lg:duration-0',
            open ? '-translate-x-full' : 'translate-x-0',
          )}>
          <span className="absolute bottom-10 left-0 -translate-x-full p-6 lg:hidden">
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
      <AnimatePresence>
        {open && (
          <motion.span
            onClick={close}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute left-0 top-0 h-full w-full bg-black/60 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
};
