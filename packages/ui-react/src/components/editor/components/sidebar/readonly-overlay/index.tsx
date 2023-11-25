import { useEditor } from '@/editor/hooks/useEditor';
import { Button, Typography } from '@material-tailwind/react';
import { AnimatePresence, motion } from 'framer-motion';
import { ViewIcon } from 'lucide-react';

export const ReadonlyOverlay = () => {
  const { isReadonly, setReadonly } = useEditor();

  return (
    <AnimatePresence>
      {isReadonly && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute left-0 top-0 z-30 grid h-full w-full place-content-center backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center gap-2">
            <ViewIcon size={48} />
            <Typography>Modo solo lectura activo</Typography>
            <Button variant="gradient" onClick={() => setReadonly(false)}>
              Desactivar
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
