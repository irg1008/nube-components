import { useCanvas } from '@/editor/hooks/useCanvas';
import { Chip, Slider, Typography } from '@material-tailwind/react';

export const OpacitySlider = () => {
  const {
    selectedShapes: [firstShape],
    changeSelectedOpacity,
  } = useCanvas();

  const opacityPerc = firstShape.opacity * 100;

  return (
    <>
      <Typography variant="small" className="mb-3 font-bold">
        Opacidad
      </Typography>

      <div className="flex items-center gap-2">
        <Chip
          size="sm"
          variant="gradient"
          value={`${opacityPerc.toFixed(0)}%`}
        />
        <Slider
          size="sm"
          min={0.00001}
          max={100}
          value={opacityPerc}
          className="!min-w-0"
          onChange={(e) => {
            changeSelectedOpacity(e.target.valueAsNumber / 100);
          }}
        />
      </div>
    </>
  );
};
