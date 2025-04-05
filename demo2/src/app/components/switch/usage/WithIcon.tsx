import { Video, VideoOff } from '@rothko-ui/icons';
import { Switch } from '@rothko-ui/react';
import React, { useState } from 'react';

const App = () => {
  const [selected, setSelected] = useState(true);

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
