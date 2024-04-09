import React, { useState } from 'react';

import { Toggle } from '@rothko-ui/ui';
import { Video, VideoOff } from '@rothko-ui/icons';

const App = () => {
  const [toggled, setToggled] = useState(false);

  return (
    <Toggle
      onIcon={<Video fill="#000" />}
      offIcon={<VideoOff fill="#000" />}
      toggled={toggled}
      onChange={v => setToggled(v)}
    />
  );
};

export default App;
