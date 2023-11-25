import { ViewportsCategoriesMenu } from '@/editor/components/ui/viewports-menu';
import { CanvasSize } from '@/editor/stores/canvas.store';
import { viewportCats } from '@/editor/utils/viewport.utils';
import { Input } from '@material-tailwind/react';
import { RectangleHorizontal, RectangleVertical } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useDebouncedCallback } from 'use-debounce';

type ViewportSelectProps = {
  minCanvasWidth?: number;
  minCanvasHeight?: number;
  canvasSize: CanvasSize;
  onChange: (size: CanvasSize) => void;
};

export const ViewportSelect = ({
  onChange,
  canvasSize,
  minCanvasWidth = 10,
  minCanvasHeight = 10,
}: ViewportSelectProps) => {
  const {
    register,
    reset,
    getValues,
    formState: { errors, isValid },
  } = useForm<CanvasSize>({
    values: canvasSize,
    mode: 'onChange',
  });

  const debounceOnChange = useDebouncedCallback(() => {
    const v = getValues();
    isValid && onChange(v);
  }, 800);

  return (
    <section className="flex flex-col gap-3">
      <fieldset className="flex flex-col gap-3 md:flex-row">
        <Input
          type="number"
          min={minCanvasWidth}
          crossOrigin={''}
          containerProps={{
            className: 'basis-1/2 !min-w-0',
          }}
          label="Ancho"
          icon={<RectangleHorizontal size={16} />}
          error={!!errors.w}
          {...register('w', {
            min: minCanvasWidth,
            required: true,
            valueAsNumber: true,
            onChange: debounceOnChange,
          })}
        />

        <Input
          type="number"
          min={minCanvasHeight}
          crossOrigin={''}
          containerProps={{
            className: 'basis-1/2 !min-w-0',
          }}
          label="Alto"
          icon={<RectangleVertical size={16} />}
          error={!!errors.h}
          {...register('h', {
            min: minCanvasHeight,
            required: true,
            valueAsNumber: true,
            onChange: debounceOnChange,
          })}
        />
      </fieldset>

      <ViewportsCategoriesMenu
        categories={viewportCats}
        onChange={({ canvasSize }) => {
          onChange(canvasSize);
          reset(canvasSize);
        }}
      />
    </section>
  );
};
