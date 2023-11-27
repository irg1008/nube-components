import { Canvas, Tldraw } from '@tldraw/tldraw';
import '@tldraw/tldraw/tldraw.css';
import { ComponentProps } from 'react';
import { CustomUI } from './components/custom-ui';
import { customShapeUtils, customTools } from './shapes';
import { CanvasProvider } from './stores/canvas.store';
import { EditorConfig } from './stores/config.store';

const externalAssetsConfig: Pick<
  ComponentProps<typeof Tldraw>,
  | 'acceptedImageMimeTypes'
  | 'acceptedVideoMimeTypes'
  | 'maxImageDimension'
  | 'maxAssetSize'
> = {
  acceptedImageMimeTypes: ['image/jpeg', 'image/png'],
  acceptedVideoMimeTypes: [],
  maxImageDimension: Infinity,
  maxAssetSize: 1 * 1024 * 1024, // 1MB
};

/* TODO: Hiding UI makes text blink and not work properly. Opened issue in repo */
/* When building the app, for some reason the provider it's not called on vite app. On dev works. */
//  For this we need to see how they did it in the repo.

// TODO: Also extending custom shapes does not work: https://github.com/tldraw/tldraw/issues/1942
// You need to use exploded editor but this brings tons of issues on asset loading as well as other bugs.
// For the moment we can't extend custom shpaes so we are stuck with base.

export const CustomEditor = (config: EditorConfig) => (
  <section className="h-full w-full overflow-visible">
    <Tldraw
      {...externalAssetsConfig}
      hideUi
      persistenceKey="editor"
      initialState="select"
      shapeUtils={customShapeUtils}
      tools={customTools}>
      <CanvasProvider>
        <CustomUI config={config} />
      </CanvasProvider>
      <Canvas />
    </Tldraw>
  </section>
);
