import { Checkbox } from '@rothko-ui/react';
import React, { useState } from 'react';

import { Flex } from '@/components/flex';

const App = () => {
  const [withoutLabelChecked, setWithoutLabelChecked] = useState(true);
  const [withLabelChecked, setWithLabelChecked] = useState(true);

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
