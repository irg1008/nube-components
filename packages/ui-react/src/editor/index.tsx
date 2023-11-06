import { Editor, Tldraw } from '@tldraw/tldraw';
import '@tldraw/tldraw/tldraw.css';
import { VariableShapeTool } from './components/variable/variable-shape.tool';
import { VariableShapeUtil } from './components/variable/variable-shape.utils';
import styles from './editor.module.css';
import { uiOverrides } from './ui-overrides';

const customShapeUtils = [VariableShapeUtil];
const customTools = [VariableShapeTool];

export function CustomEditor() {
  const handleMount = (editor: Editor) => {
    console.log(editor);
  };

  return (
    <div className={styles.editor}>
      <Tldraw
        onMount={handleMount}
        shapeUtils={customShapeUtils}
        tools={customTools}
        overrides={uiOverrides}
      />
    </div>
  );
}
