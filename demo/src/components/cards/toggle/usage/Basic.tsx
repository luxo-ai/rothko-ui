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
