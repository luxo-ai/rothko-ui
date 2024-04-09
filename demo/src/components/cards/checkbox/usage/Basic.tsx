import React, { useState } from 'react';

import { Checkbox, Flex } from '@rothko-ui/ui';

const App = () => {
  const [withoutLabelChecked, setWithoutLabelChecked] = useState(false);
  const [withLabelChecked, setWithLabelChecked] = useState(false);
  return (
    <Flex flexDirection="column" rowGap="1rem">
      <Checkbox checked={withoutLabelChecked} onChange={v => setWithoutLabelChecked(v)} />
      <Checkbox checked={withLabelChecked} onChange={v => setWithLabelChecked(v)}>
        Label
      </Checkbox>
    </Flex>
  );
};

export default App;
