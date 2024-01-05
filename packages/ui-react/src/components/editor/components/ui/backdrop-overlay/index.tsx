import { AnimatePresence, motion } from 'framer-motion';

type BackDropOverlayProps = {
  open: boolean;
  onClose: () => void;
};

export const BackDropOverlay = ({ open, onClose }: BackDropOverlayProps) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.span
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute left-0 top-0 h-full w-full bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}
    </AnimatePresence>
  );
};
