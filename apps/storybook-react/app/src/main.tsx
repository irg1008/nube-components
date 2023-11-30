import { NubeProvider } from '@nubebytes/ui-react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '~/app';
import './index.css';

import '@nubebytes/ui-react/index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <NubeProvider>
      <App />
    </NubeProvider>
  </React.StrictMode>,
);
