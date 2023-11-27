import { ExportSection } from '@/editor/components/sidebar/export-section';
import { ShapeOptions } from '@/editor/components/sidebar/shape-options';
import { ViewportSelect } from '@/editor/components/sidebar/viewport-select';
import { Collapse } from '@/editor/components/ui/collapse';
import { ColorPicker } from '@/editor/components/ui/color-picker';
import { useCanvas } from '@/editor/hooks/useCanvas';
import { useConfig } from '@/editor/stores/config.store';
import { Typography } from '@material-tailwind/react';
import { track } from '@tldraw/tldraw';
import { useToggle } from 'usehooks-ts';

export const SidebarContent = track(() => {
  const {
    resizeCanvas,
    canvasSize,
    selectedShapes,
    changeCanvasColor,
    canvasColor,
  } = useCanvas();

  const [canvasSizeOpen, toggleCanvasSizeOpen] = useToggle(true);
  const [shapeOptionsOpen, toggleShapeOptionsOpen] = useToggle(true);

  const { hideExportUI } = useConfig();

  return (
    <div className="custom-scrollbar-thin relative flex h-full flex-col gap-5 overflow-auto px-6 py-8">
      <section className="flex flex-row-reverse items-center justify-end gap-3">
        <Typography variant="h6">Color de fondo</Typography>
        <ColorPicker initialColor={canvasColor} onChange={changeCanvasColor} />
      </section>

      <Collapse
        as="section"
        open={canvasSizeOpen}
        toggleOpen={toggleCanvasSizeOpen}
        label="Tamaño de Canvas">
        <ViewportSelect canvasSize={canvasSize} onChange={resizeCanvas} />
      </Collapse>

      {selectedShapes.length > 0 && (
        <Collapse
          as="section"
          collapseProps={{ className: 'px-1' }}
          open={shapeOptionsOpen}
          toggleOpen={toggleShapeOptionsOpen}
          label="Opciones de selección">
          <ShapeOptions />
        </Collapse>
      )}

      {!hideExportUI && (
        <section className="fixed bottom-0 left-0 z-30 h-min w-full px-4 py-2">
          <ExportSection />
        </section>
      )}
    </div>
  );
});
