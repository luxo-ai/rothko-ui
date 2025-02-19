import { Button } from '@rothko-ui/react';
import React, { useEffect, useState } from 'react';

const App = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loading) {
      const timeout = setTimeout(() => setLoading(false), 4000);
      return () => clearTimeout(timeout);
    }
  }, [loading]);

  return (
    <Button onClick={() => setLoading(true)} loading={loading}>
      Click to load...
    </Button>
  );
};

export default App;
