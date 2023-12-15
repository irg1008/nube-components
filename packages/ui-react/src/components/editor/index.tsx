import { TLUiOverrides, Tldraw } from '@tldraw/tldraw';
import { ComponentProps } from 'react';
import { CustomUI } from './components/custom-ui';
import { LoadingScreen } from './components/ui/loading-screen';
import { customShapeUtils, customTools } from './shapes';
import { CanvasProvider, EditorConfig } from './stores/canvas.store';
import './styles.module.css';

const externalAssetsConfig: Pick<
  ComponentProps<typeof Tldraw>,
  | 'acceptedImageMimeTypes'
  | 'acceptedVideoMimeTypes'
  | 'maxImageDimension'
  | 'maxAssetSize'
> = {
  acceptedImageMimeTypes: ['image/jpeg', 'image/png', 'image/svg+xml'],
  acceptedVideoMimeTypes: [],
  maxImageDimension: 4_000,
  maxAssetSize: 1 * 1024 * 1024, // 1MB
};

const overrides: TLUiOverrides = {
  contextMenu: () => [],
};

export const CustomEditor = (config: EditorConfig) => {
  return (
    <section id="editor" className="h-full w-full overflow-visible">
      <Tldraw
        {...externalAssetsConfig}
        hideUi
        persistenceKey={config.disableLocalPersistance ? undefined : 'editor'}
        initialState="select"
        shapeUtils={customShapeUtils}
        snapshot={config.initialSnapshot}
        components={{ LoadingScreen }}
        tools={customTools}
        overrides={overrides}>
        <CanvasProvider config={config}>
          <CustomUI />
        </CanvasProvider>
      </Tldraw>
    </section>
  );
};
