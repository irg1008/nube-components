import { TLUiOverrides, Tldraw } from '@tldraw/tldraw';
import { ComponentProps } from 'react';
import { CustomUI } from './components/custom-ui';
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
  acceptedImageMimeTypes: ['image/jpeg', 'image/png'],
  acceptedVideoMimeTypes: [],
  maxImageDimension: Infinity,
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
        persistenceKey="editor"
        initialState="select"
        shapeUtils={customShapeUtils}
        tools={customTools}
        overrides={overrides}>
        <CanvasProvider config={config}>
          <CustomUI />
        </CanvasProvider>
      </Tldraw>
    </section>
  );
};
