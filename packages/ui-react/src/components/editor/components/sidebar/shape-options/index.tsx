import { WidgetForProp } from '@/editor/components/ui/widgets/widget-record';
import { useEditor } from '@/editor/hooks/useEditor';
import { useCanvas } from '@/editor/stores/canvas.store';
import {
  getShapesSharedProps,
  updateShapesProp,
} from '@/editor/utils/editor.utils';
import { EditableProp } from '@/editor/utils/widget.utils';
import { useMemo } from 'react';
import { OpacitySlider } from '../opacity-slider';

export const ShapeOptions = () => {
  const { editor } = useEditor();
  const { selectedShapes: shapes } = useCanvas();

  const props = useMemo(
    () => getShapesSharedProps<EditableProp>(shapes),
    [shapes],
  );

  return (
    <ul className="flex flex-col gap-8">
      <li>
        <OpacitySlider />
      </li>
      {props.map((prop) => (
        <WidgetForProp
          key={prop}
          as="li"
          shapes={shapes}
          prop={prop}
          onChange={(value, meta) => {
            const updated = updateShapesProp(editor.getSelectedShapes(), {
              prop,
              value,
              meta,
            });
            editor.updateShapes(updated);
          }}
        />
      ))}
    </ul>
  );
};
