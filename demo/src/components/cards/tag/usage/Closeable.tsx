import React from 'react';

import { Tag } from '@rothko-ui/ui';

const App = () => {
  return <Tag onClose={() => alert('Closed!')}>closeable tag</Tag>;
};

export default App;
