import React from 'react';

import { Tag } from '@rothko-ui/react';

const App = () => {
  return <Tag onClose={() => alert('Closed!')}>closeable tag</Tag>;
};

export default App;
