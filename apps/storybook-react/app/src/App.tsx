import { useEffect, useState } from 'react';
import { Button } from 'ui-react';

function App() {
  const [a, setA] = useState('1');

  useEffect(() => {
    console.log(a);
  }, []);

  return (
    <>
      <Button />
    </>
  );
}

export default App;
