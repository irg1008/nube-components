import { useEditor } from '@/editor/hooks/useEditor';
import { Text, Widget } from '@/editor/utils/widget.utils';
import { Textarea, Typography } from '@material-tailwind/react';
import { track } from '@tldraw/tldraw';

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
        onChange={(e) => onChange(e.target.value)}
      />
    </>
  );
});
