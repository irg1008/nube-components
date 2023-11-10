import { Canvas, Tldraw } from '@tldraw/tldraw';
import '@tldraw/tldraw/tldraw.css';
import { Sidebar } from './components/sidebar';
import { Toolbar } from './components/toolbar';
import { CanvasProvider } from './stores/canvas.store';

export function CustomEditor() {
  return (
    <section className="tw-h-full tw-w-full tw-overflow-visible">
      <Tldraw hideUi>
        <div className="tw-pointer-events-none tw-absolute tw-inset-0 tw-flex tw-justify-between [&>*]:tw-pointer-events-auto tw-z-[300]">
          <CanvasProvider>
            <Toolbar />
            <Sidebar />
          </CanvasProvider>
        </div>

        {/* TODO: Using canvas makes text blink and not work properly */}

        <Canvas key="canvas" />
      </Tldraw>
    </section>
  );
}
