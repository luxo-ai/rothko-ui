import { Checkbox } from '@rothko-ui/react';
import React from 'react';

import { Flex } from '@/components/flex';

const App = () => {
  return (
    <Flex flexDirection="column" rowGap="1rem">
      <Checkbox disabled>Disabled</Checkbox>
      <Checkbox disabled checked>
        Disabled + Checked
      </Checkbox>
    </Flex>
  );
};

export default App;
