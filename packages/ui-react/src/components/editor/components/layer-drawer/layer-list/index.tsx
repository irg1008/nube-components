import { VerticalSortableContext } from '@/editor/components/ui/sortable-context';
import { ShapeType, useEditor } from '@/editor/hooks/useEditor';
import { useCanvas } from '@/editor/stores/canvas.store';
import { getIconElement } from '@/editor/utils/icons.utils';
import { DragEndEvent } from '@dnd-kit/core';
import { List, Typography } from '@material-tailwind/react';
import { TLUiIconType } from '@tldraw/tldraw';
import {
  CopyPlusIcon,
  HighlighterIcon,
  ImageIcon,
  Layers2Icon,
  LucideArrowUpRight,
  LucideIcon,
  PencilIcon,
  ReplaceIcon,
  ShapesIcon,
  SlashIcon,
  TypeIcon,
} from 'lucide-react';
import { LayerItem } from '../layer-item';

const iconList: Record<string, LucideIcon | TLUiIconType> = {
  arrow: LucideArrowUpRight,
  highlight: HighlighterIcon,
  line: SlashIcon,
  draw: PencilIcon,
  text: TypeIcon,
  image: ImageIcon,
  geo: ShapesIcon,
  'placeholder-img': ReplaceIcon,
} satisfies Record<ShapeType, LucideIcon | TLUiIconType>;

export const Layerlist = () => {
  const { editor } = useEditor();
  const { sortedShapes } = useCanvas();

  const selectedShape = editor.getOnlySelectedShape();

  const reorderLayers = (fromIndex: number, toIndex: number) => {
    const item = sortedShapes.splice(fromIndex, 1)[0];
    sortedShapes.splice(toIndex, 0, item);

    const sliceFrom = Math.min(fromIndex, toIndex);
    const sliceTo = Math.max(fromIndex, toIndex);

    if (fromIndex < toIndex) {
      editor.sendBackward(sortedShapes.slice(sliceFrom, sliceTo));
    } else {
      editor.bringForward(sortedShapes.slice(sliceFrom + 1, sliceTo + 1));
    }
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    const fromIndex = sortedShapes.findIndex((s) => s.id === active.id);
    const toIndex = sortedShapes.findIndex((s) => s.id === over?.id);
    if (fromIndex === toIndex) return;
    reorderLayers(fromIndex, toIndex);
  };

  return (
    <VerticalSortableContext items={sortedShapes} onDragEnd={handleDragEnd}>
      <List className="custom-scrollbar-thin w-full min-w-0 overflow-y-auto overflow-x-hidden">
        {sortedShapes.toReversed().map((shape) => (
          <LayerItem
            key={shape.id}
            icon={getIconElement(
              iconList[shape.type] ?? Layers2Icon,
              'h-3 w-3 opacity-75',
            )}
            isSelected={selectedShape?.id === shape.id}
            shape={shape}
          />
        ))}
      </List>
      {sortedShapes.length === 0 && (
        <div className="flex h-full flex-col items-center justify-center gap-3">
          <CopyPlusIcon className="h-16 w-16 opacity-25" />
          <Typography variant="small" className="text-center text-gray-400">
            Añade una capa para empezar
          </Typography>
        </div>
      )}
    </VerticalSortableContext>
  );
};
