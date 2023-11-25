import { useContext } from 'react';
import { StoreContext } from '../stores/canvas.store';

export const useCanvas = () => {
  const canvasCtx = useContext(StoreContext);
  if (!canvasCtx) throw new Error('Please use within CanvasProvider');
  return canvasCtx;
};
