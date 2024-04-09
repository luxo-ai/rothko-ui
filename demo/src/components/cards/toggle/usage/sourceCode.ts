export const BASIC = `
import React, { useState } from 'react';

import { Toggle } from '@rothko-ui/ui';

const App = () => {
  const [withoutLabelToggled, setWithoutLabelToggled] = useState(false);
  const [withLabelToggled, setWithLabelToggled] = useState(false);

  return (
    <>
      <Toggle toggled={withoutLabelToggled} onChange={v => setWithoutLabelToggled(v)} />
      <Toggle
        toggled={withLabelToggled}
        onChange={v => setWithLabelToggled(v)}
        style={{ marginTop: '0.5rem' }}
      >
        toggle with label
      </Toggle>
    </>
  );
};

export default App;
`;
export const DISABLED = `
import React, { useState } from 'react';

import { Toggle } from '@rothko-ui/ui';

const App = () => {
  const [toggled, setToggled] = useState(false);

  return <Toggle disabled toggled={toggled} onChange={v => setToggled(v)} />;
};

export default App;
`;
export const WITH_ICON = `
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
`;
export const WITH_KIND = `
import React, { useState } from 'react';

import { Toggle } from '@rothko-ui/ui';

const App = () => {
  const [toggled, setToggled] = useState(false);

  return <Toggle kind="info" toggled={toggled} onChange={v => setToggled(v)} />;
};

export default App;
`;
