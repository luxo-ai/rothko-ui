export const BASIC = `
import React, { useState } from 'react';

import { Switch } from '@rothko-ui/ui';

const App = () => {
  const [withoutLabelSelected, setWithoutLabelSelected] = useState(false);
  const [withLabelSelected, setWithLabelSelected] = useState(false);

  return (
    <>
      <Switch selected={withoutLabelSelected} onChange={v => setWithoutLabelSelected(v)} />
      <Switch
        selected={withLabelSelected}
        onChange={v => setWithLabelSelected(v)}
        style={{ marginTop: '0.5rem' }}
      >
        Switch with label
      </Switch>
    </>
  );
};

export default App;
`;
export const DISABLED = `
import React, { useState } from 'react';

import { Switch } from '@rothko-ui/ui';

const App = () => {
  const [selected, setSelected] = useState(false);

  return <Switch disabled selected={selected} onChange={v => setSelected(v)} />;
};

export default App;
`;
export const WITH_ICON = `
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
`;
export const WITH_KIND = `
import React, { useState } from 'react';

import { Switch } from '@rothko-ui/ui';

const App = () => {
  const [selected, setSelected] = useState(false);

  return <Switch kind="info" selected={selected} onChange={v => setSelected(v)} />;
};

export default App;
`;
