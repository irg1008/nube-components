import { useEditor } from '@/editor/hooks/useEditor';
import { Textarea, Typography } from '@material-tailwind/react';
import { track } from '@tldraw/tldraw';
import { Text, Widget } from './widget.types';

export const TextWidget: Widget<Text> = track(({ initialValue, onChange }) => {
  const { scapeEditingState } = useEditor();

  return (
    <>
      <Typography variant="small" className="mb-3 font-bold">
        Texto
      </Typography>
      <Textarea
        rows={2}
        label="Contenido"
        title="Texto"
        value={initialValue}
        className="custom-scrollbar-thin min-h-[50px]"
        onClick={() => scapeEditingState()}
        containerProps={{
          className: '!min-w-0',
        }}
        onChange={(e) => onChange(e.target.value)}
      />
    </>
  );
});
