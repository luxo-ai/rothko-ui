import React, { useState } from 'react';

import { Switch } from '@rothko-ui/ui';
import { Video, VideoOff } from '@rothko-ui/icons';

const App = () => {
  const [selected, setSelected] = useState(false);

  return (
    <Switch
      onIcon={<Video fill="#000" />}
      offIcon={<VideoOff fill="#000" />}
      selected={selected}
      onChange={v => setSelected(v)}
    />
  );
};

export default App;
