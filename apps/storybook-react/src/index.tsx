import { createRoot } from 'react-dom/client';

const App = () => {
  return <h1>Hola que pasa</h1>;
};

const domRoot = document.getElementById('root');
const root = createRoot(domRoot!);

root.render(<App />);
