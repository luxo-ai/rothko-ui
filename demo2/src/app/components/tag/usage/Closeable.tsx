import { Tag } from '@rothko-ui/react';
import React from 'react';

const App = () => {
  return <Tag onClose={() => alert('Closed!')}>closeable tag</Tag>;
};

export default App;
