import { useEditor } from '@/editor/hooks/useEditor';
import { Card, IconButton, Tooltip } from '@material-tailwind/react';
import { AnimatePresence, motion } from 'framer-motion';
import { LayersIcon, XIcon } from 'lucide-react';
import { useToggle } from 'usehooks-ts';
import { Layerlist } from './layer-list';

export const LayerDrawer = () => {
  const [open, toggle] = useToggle(false);
  const { isReadonly } = useEditor();

  return (
    <div>
      <AnimatePresence initial={false}>
        {!isReadonly && (
          <motion.aside
            className="pointer-events-none absolute left-0 top-0 z-10 flex h-full w-72 max-w-[calc(100%-72px)] flex-col justify-center"
            initial={{ x: '-100%' }}
            animate={{ x: open ? 0 : '-100%' }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.2 }}>
            <div className="pointer-events-auto relative flex flex-grow p-4 pe-0 sm:max-h-96">
              <Card className="shadow-blue-gray-900/5 w-full border-2 border-gray-900">
                <Layerlist />
              </Card>

              <motion.span
                initial={{ x: 0 }}
                animate={{ x: '100%' }}
                exit={{ x: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-0 right-0 p-4 sm:bottom-0">
                <Tooltip content={open ? 'Esconder capas' : 'Mostrar capas'}>
                  <IconButton onClick={toggle} variant="filled">
                    {open ? <XIcon /> : <LayersIcon className="p-0.5" />}
                  </IconButton>
                </Tooltip>
              </motion.span>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
};
