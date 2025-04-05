import { Switch } from '@rothko-ui/react';
import React, { useState } from 'react';

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
