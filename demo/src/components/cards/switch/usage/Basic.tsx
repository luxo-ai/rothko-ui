import React, { useState } from 'react';

import { Switch } from '@rothko-ui/ui';

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
