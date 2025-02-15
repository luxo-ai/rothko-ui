export const BASIC = `
import React, { useState } from 'react';

import { Switch } from '@rothko-ui/react';

const App = () => {
  const [withoutLabelSelected, setWithoutLabelSelected] = useState(true);
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
import { Switch } from '@rothko-ui/react';

const App = () => {
  const [selected, setSelected] = useState(false);

  return <Switch disabled selected={selected} onChange={v => setSelected(v)} />;
};

export default App;
`;
export const WITH_ICON = `
import React, { useState } from 'react';
import { Switch } from '@rothko-ui/react';
import { Video, VideoOff } from '@rothko-ui/icons';

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
`;
export const WITH_KIND = `
import React, { useState } from 'react';
import { Switch } from '@rothko-ui/react';

const App = () => {
  const [selected, setSelected] = useState(true);

  return <Switch kind="info" selected={selected} onChange={v => setSelected(v)} />;
};

export default App;
`;
