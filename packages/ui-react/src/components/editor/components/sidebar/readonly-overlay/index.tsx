import { useEditor } from '@/editor/hooks/useEditor';
import { Button, Typography } from '@material-tailwind/react';
import { AnimatePresence, motion } from 'framer-motion';
import { ViewIcon } from 'lucide-react';
import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

export const ReadonlyOverlay = ({
  className,
  ...props
}: ComponentProps<typeof motion.div>) => {
  const { isReadonly, setReadonly } = useEditor();

  return (
    <AnimatePresence initial={false}>
      {isReadonly && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={twMerge(
            'absolute left-0 top-0 z-30 grid h-full w-full place-content-center bg-gray-50/50 backdrop-blur-md',
            className,
          )}
          {...props}>
          <motion.div
            initial={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center gap-2">
            <ViewIcon size={48} />
            <Typography>Modo solo lectura activado</Typography>
            <Button variant="gradient" onClick={() => setReadonly(false)}>
              Desactivar
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
