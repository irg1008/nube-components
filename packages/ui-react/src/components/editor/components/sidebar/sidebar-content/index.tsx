import { useCanvas } from '@/editor/hooks/useCanvas';
import { Typography } from '@material-tailwind/react';
import { ViewportSelect } from '../viewport-select';

export const SidebarContent = () => {
  const { resizeCanvas, canvasSize } = useCanvas();

  return (
    <>
      <Typography variant="small" className="tw-mb-2">
        Tamaño de Canvas
      </Typography>
      <ViewportSelect canvasSize={canvasSize} onChange={resizeCanvas} />
    </>
  );
};
