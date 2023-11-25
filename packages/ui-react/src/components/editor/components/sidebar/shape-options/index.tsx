import { WidgetForProp } from '@/editor/components/ui/widgets/widget-record';
import { EditableProp } from '@/editor/components/ui/widgets/widget.types';
import { useEditor } from '@/editor/hooks/useEditor';
import {
  getShapesSharedProps,
  updateShapesProp,
} from '@/editor/utils/editor.utils';
import { JsonObject } from '@tldraw/tldraw';
import { useCallback, useMemo } from 'react';
import { OpacitySlider } from '../opacity-slider';

export const ShapeOptions = () => {
  const { editor } = useEditor();
  const { selectedShapes: shapes } = editor;

  const props = useMemo(
    () => getShapesSharedProps<EditableProp>(shapes),
    [shapes],
  );

  const onChange = useCallback(
    (...values: [prop: EditableProp, newValue: unknown, meta?: JsonObject]) => {
      const updated = updateShapesProp(editor.selectedShapes, ...values);
      editor.updateShapes(updated);
    },
    [editor],
  );

  return (
    <ul className="flex flex-col gap-5">
      <li>
        <OpacitySlider />
      </li>
      {props.map((prop) => (
        <WidgetForProp
          key={prop}
          as="li"
          shapes={shapes}
          prop={prop}
          onChange={(...values) => onChange(prop, ...values)}
        />
      ))}
    </ul>
  );
};
